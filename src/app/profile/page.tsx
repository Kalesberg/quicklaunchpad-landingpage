"use client";
import React, { useCallback, useEffect } from "react";
import EmailNotVerify from "components/ui/profile/EmailNotVerify";
import EmptyProfile from "components/ui/profile/Empty";
import ChangeEmailModal from "components/common/ChangeEmailModal";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { User } from "state/type";
import { useDispatch } from 'react-redux';
import { updateUser } from "reduxStore/rootReducer";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { signInWithWallet } from "app/service/userService";
import { useParams } from "next/navigation";
import { emailVerify } from "app/api";
import { removeToken } from "app/service/tokenService";

export default function Page() {

  const params = useParams();
  const verifyCode = params["slug"] || ""
  const [openModal, setOpenModal] = useState(false);

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
    if (verifyCode) {
      const res1 = await emailVerify(verifyCode as string)
      if (res1) {
        dispatch(updateUser(res1));
      }
    }
  }, []);

  useEffect(() => {
    signIn();
  }, [signIn, address, user]);

  useEffect(() => {
    if (!address) {
      console.log('disconnected');
      removeToken();
      dispatch(updateUser(null));
    }
  }, [address]);


  return (
    <div className="container-dashboard mx-auto px-4 md:px-14 xl:px-24">
      <p className="flex items-center text-lg font-bold">My Profile</p>
      {!user ? <EmptyProfile /> : <EmailNotVerify openModal={openModal} setOpenModal={setOpenModal} user={user}/>}
      <ChangeEmailModal openModal={openModal} setOpenModal={setOpenModal} user={user} />
    </div>
  );
}
