"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "components/common/Button";
import PowderIcon from "../../../../public/assets/images/powder.png";
import MetaMaskIcon from "../../../../public/assets/images/metamask.png";
import clsx from "clsx";
import { ArrowPathIcon, PencilIcon } from "@heroicons/react/16/solid";
import { useAppKitAccount } from "@reown/appkit/react";
import { shortenAddress } from "utils";
import { User } from "state/type";
import { updateUser } from "../../../reduxStore/rootReducer";
import { updateUser as updateUserApi } from "app/api";
import { useDispatch } from 'react-redux';
import { kycStatuses, KycStatus } from "state/type";

declare const BlockpassKYCConnect: any

const EmailNotVerify : React.FC<{ openModal?: boolean; setOpenModal?: any, user: User }> = ({
  openModal,
  setOpenModal,
  user
}) => {

  const dispatch = useDispatch();
  const [upcomingNotify, setUpcomingNotify] = useState(!!user?.notifConfig?.emailNotifications);
  const [kycStatus, setKycStatus] = useState<{msg?: string, btn?: string, icon?: string, iconBg?:string, iconColor?: string, isCheck?: boolean} | null>(null);

  const handleResendLink = async () => {
    await updateUser({ email: user.email }); // TODO - add resend verification link api
  }

  const handleUpcomingCheckboxChange = async (event: any) => {
    console.log('00000', event.target.checked)
    setUpcomingNotify(event.target.checked)
    const payload = {
      notifConfig: {emailNotifications: event.target.checked}
    }
    const res = await updateUserApi(payload);
    if (res) {
      dispatch(updateUser(res))
    }
  }

  useEffect(() => {
    const blockpass = new BlockpassKYCConnect("quicklaunchpad_04b2e");
    blockpass.startKYCConnect();  
  }, []);

  useEffect(() => {
    if (!user) {
      return
    }
    const s = kycStatuses[user.kycStatus];
    if (s) {
      setKycStatus(s)
    } else {
      setKycStatus(kycStatuses[KycStatus.NOT_STARTED])
    }
  }, [user]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      <div className="w-full bg-[#1B1E29] rounded-xl p-4 md:p-6">
        <h2 className="text-lg font-bold mb-4 text-[#EBECF2]">
          Account Details
        </h2>

        <div className="w-full flex items-center gap-3 mb-4 text-base">
          <span className="text-[#C7CAD9]">Wallet:</span>
          <div className="flex items-center gap-3">
            <Image
              src={MetaMaskIcon.src}
              alt="Metamask"
              width={24}
              height={24}
            />
            <span className="">{shortenAddress(user?.uid ?? "")}</span>
          </div>
        </div>

        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-base">
            <span className="text-[#C7CAD9]">Email:</span>
            <span>{user ? user.email:'-'}</span>
            {(user.email!==''&&!user.isEmailVerified)&&<span className="text-[#61F3F3] bg-[#00B8D929] text-sm font-bold pt-1 pb-1 pl-2 pr-2 rounded-lg">Pending Verification</span>}
          </div>
          <div className="w-full flex items-center gap-1 md:gap-2 justify-between md:justify-end flex-wrap">
            <Button
              className="bg-transparent !text-[#448AFF] text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer !px-2 md:px-3 group hover:!text-white"
              icon={<PencilIcon className="text-[#448AFF] w-3 md:w-5 h-3 md:h-5 group-hover:text-white" />}
              onClick={() => setOpenModal(!openModal)}
            >
              Change email
            </Button>

            {(user.email!==''&&!user.isEmailVerified) && <Button
              variant="secondary"
              size="small"
              className="h-[36px] text-xs md:text-sm !px-2 md:px-3"
              onClick={() => handleResendLink()}
              icon={<ArrowPathIcon className="text-[#448AFF] w-3 md:w-5 h-3 md:h-5" />}
            >
              Resend verification link
            </Button>}
          </div>
        </div>
      </div>

      <div className="w-full bg-[#1B1E29] rounded-xl p-4 md:p-6">
        <div className="flex justify-between items-center flex-wrap gap-2 md:gap-1 mb-4">
          <h2 className="text-lg font-bold text-[#EBECF2] flex items-center gap-2">
            KYC Status{" "}
            <span className={`text-xs text-[${kycStatus?.iconColor}] bg-[${kycStatus?.iconBg}] px-2 py-1 rounded-lg`}>
              {kycStatus?.icon}
            </span>
          </h2>

          <div className="flex items-center">
            <Image src={PowderIcon.src} alt="..." width={20} height={20} />
            <span className="text-xs text-[#919EAB] ml-1">
              Powered by BlockPass
            </span>
          </div>
        </div>
        <p className="text-sm md:text-base text-[#EBECF2] mb-4">
          {kycStatus?.msg}
        </p>
        <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
          {!kycStatus?.isCheck&&<span className="text-sm text-[#919EAB]">Takes about 15 minutes</span>}
          <Button id="blockpass-kyc-connect" variant={kycStatus?.isCheck ? "secondary": "primary"} size="small" className="px-3 h-[36px]">
            {kycStatus?.btn}
            {kycStatus?.isCheck && <Image src={"/assets/icons/ic-external-link.png"}
              alt="external link"
              width={20}
              height={20}
            />}
          </Button>
        </div>
      </div>

      <div className="w-full bg-[#1B1E29] rounded-xl p-4 md:p-6 col-span-1 md:col-span-2">
        <h2 className="text-lg font-bold text-[#EBECF2] mb-4">
          Notification Preferences
        </h2>
        <div className="space-y-6">
          <Checkbox
            label="Receive email notifications about my active launches [Mandatory]."
            id="1"
            disabled
            checked
          />

          <Checkbox
            label="Receive emails about upcoming launchpads, whitelist announcements and open dates."
            id="2"
            checked={upcomingNotify}
            handleCheckboxChange = {handleUpcomingCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
}

export default EmailNotVerify;

export const Checkbox = ({ label, id, disabled, checked, handleCheckboxChange }: any) => {
  return (
    <div className="flex items-center justify-start gap-2">
      <label
        className={clsx({
          ["relative inline-flex items-center cursor-pointer"]: true,
          ["cursor-not-allowed brightness-75"]: disabled,
        })}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          className="sr-only peer"
          disabled={disabled}
          onChange={handleCheckboxChange}

        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0FC679]"></div>
      </label>

      <span
        className={clsx({
          ["text-[#EBECF2] text-sm md:text-base"]: true,
          ["text-[#919EAB]"]: disabled,
        })}
      >
        {label}
      </span>
    </div>
  );
};
