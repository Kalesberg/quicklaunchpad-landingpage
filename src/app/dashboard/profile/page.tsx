"use client";

import EmailNotVerify from "components/ui/profile/EmailNotVerify";
import EmptyProfile from "components/ui/profile/Empty";
import { useAppKitAccount } from "@reown/appkit/react";

export default function Page() {
  const { address } = useAppKitAccount();
  return (
    <div className="container-dashboard mx-auto px-4 md:px-14 xl:px-24">
      <p className="flex items-center text-lg font-bold">My Profile</p>
      {!address ? <EmptyProfile /> : <EmailNotVerify />}
    </div>
  );
}
