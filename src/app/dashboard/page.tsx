"use client";
import React, { useCallback, useEffect } from "react";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import Footer from "components/layout/Footer";
import LaunchNotice from "components/ui/home/LaunchNotice";
import LiveUpcomingLaunches from "components/ui/home/LiveUpcomingLaunches";
import PreviousLaunches from "components/ui/home/PreviousLaunches";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { getToken, removeToken, setToken } from "app/service/tokenService";
import { getAuthCode, getUser, logIn } from "app/api";
import { updateUser } from "../../redux/rootReducer";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';
export default function DashboardPage() {
  // 0: no launches
  // 1: The only launch
  // 2: multiple live launches
  // 3: multiple live & previous launches
  const caseLaunch: number = 3;
  const dispatch = useDispatch();
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  const signInWithWallet = useCallback(async () => {
    if (!address) {
      return
    }
    let token = getToken()
    if (!token) {
      const nonce = await getAuthCode();
      const provider = new ethers.providers.Web3Provider(window.ethereum || {});
      const signer = provider.getSigner();
      const message = new SiweMessage({
        domain: window.location.host,
        address: ethers.utils.getAddress(address),
        statement:
          'Please sign this message via your web3 wallet to connect to SparkDEX Launchpad Dashboard.',
        uri: window.location.origin,
        version: '1',
        chainId: chainId as number,
        nonce,
      })
      const siweMsg = message.prepareMessage()
      const signature = await signer.signMessage(siweMsg);
      token = await logIn(message, signature);
    }
    if (token) {
      setToken(token)
      const user = await getUser();
      dispatch(updateUser(user));
    }
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
