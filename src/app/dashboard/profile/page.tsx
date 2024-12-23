"use client";

import EmailNotVerify from "components/ui/profile/EmailNotVerify";
import EmptyProfile from "components/ui/profile/Empty";
import ChangeEmailModal from "components/common/ChangeEmailModal";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { User } from "state/type";

export default function Page() {
  const { user } = useSelector((state: { user: User }) => state || {});
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="container-dashboard mx-auto px-4 md:px-14 xl:px-24">
      <p className="flex items-center text-lg font-bold">My Profile</p>
      {!user ? <EmptyProfile /> : <EmailNotVerify openModal={openModal} setOpenModal={setOpenModal} user={user}/>}
      <ChangeEmailModal openModal={openModal} setOpenModal={setOpenModal} user={user} />
    </div>
  );
}
