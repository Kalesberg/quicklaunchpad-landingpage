"use client";
import React, { useCallback, useEffect } from "react";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import Footer from "components/layout/Footer";
import LaunchNotice from "components/ui/home/LaunchNotice";
import LiveUpcomingLaunches from "components/ui/home/LiveUpcomingLaunches";
import PreviousLaunches from "components/ui/home/PreviousLaunches";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { updateUser } from "../../reduxStore/rootReducer";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { signInWithWallet } from "app/service/userService";
import { useSelector } from 'react-redux';
import { User } from "state/type";

export default function DashboardPage() {
  // 0: no launches
  // 1: The only launch
  // 2: multiple live launches
  // 3: multiple live & previous launches
  const caseLaunch: number = 3;
  const dispatch = useDispatch();
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const { user } = useSelector((state: { user: User }) => state || {});

  const signIn = useCallback(async () => {
    if (user || !address || !chainId) {
      return
    }
    const res = await signInWithWallet(address, chainId as number)
    if (res) {
      dispatch(updateUser(res));
    }
  }, [address, user]);

  useEffect(() => {
    signIn();
  }, [signIn]);

  return (
    <div className="container-dashboard mx-auto px-4">
      <Link href={"/"} className="flex items-center">
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        Back
      </Link>
      <div className="mx-6">
        {caseLaunch !== 0 && <LaunchNotice status="upcoming" />}
        {caseLaunch > 1 && <LiveUpcomingLaunches />}
        {caseLaunch > 2 && <PreviousLaunches />}
      </div>
      {caseLaunch !== 0 && <Footer />}
    </div>
  );
}
