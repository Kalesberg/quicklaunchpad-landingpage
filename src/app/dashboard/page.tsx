"use client";
import React, { useCallback, useEffect } from "react";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import Footer from "components/layout/Footer";
import LaunchNotice from "components/ui/home/LaunchNotice";
import LiveUpcomingLaunches from "components/ui/home/LiveUpcomingLaunches";
import PreviousLaunches from "components/ui/home/PreviousLaunches";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { User } from "state/type";
import { getToken } from "app/service/tokenService";
import { getAuthCode, getUser, logIn } from "app/api";
import { updateUser } from "../../redux/rootReducer";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { ethers } from 'ethers';

export default function DashboardPage() {
  // 0: no launches
  // 1: The only launch
  // 2: multiple live launches
  // 3: multiple live & previous launches
  const caseLaunch: number = 3;
  const { user } = useSelector((state: { user: User }) => state || {});
  const dispatch = useDispatch();
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  // const fetchUser = useCallback(async () => {
  //   if (user) {
  //     return
  //   }
  //   const token = getToken();
  //   if (token) {
  //     const user = await getUser();
  //     dispatch(updateUser(user));
  //   }
  // }, [user, dispatch]);

  const signInWithWallet = useCallback(async () => {
    if (!address) {
      return
    }
    const nonce = await getAuthCode();
    const provider = new ethers.providers.Web3Provider(window.ethereum || {});
    const signer = provider.getSigner();
    const signature = await signer.signMessage(nonce);
    const res = await logIn(address, nonce, signature, chainId || 0);
    console.log('logged in', res)
  }, [address]);

  useEffect(() => {
    signInWithWallet();
  }, [signInWithWallet]);


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
