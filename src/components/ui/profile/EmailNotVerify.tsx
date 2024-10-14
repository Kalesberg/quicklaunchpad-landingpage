"use client";

import Image from "next/image";
import Button from "components/common/Button";
import PowderIcon from "../../../../public/assets/images/powder.png";
import MetaMaskIcon from "../../../../public/assets/images/metamask.png";
import clsx from "clsx";
import { useState } from "react";
import { PencilIcon } from "@heroicons/react/16/solid";

export default function EmailNotVerify() {
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  return (
    <div className="my-6 grid md:grid-cols-2 grid-cols-1 gap-6">
      <div className="bg-[#1B1E29] rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4 text-[#EBECF2]">
          Account Details
        </h2>

        <div className="flex items-center gap-3 mb-4 text-base">
          <span className="text-[#C7CAD9]">Wallet:</span>
          <div className="flex items-center gap-3">
            <Image
              src={MetaMaskIcon.src}
              alt="Metamask"
              width={24}
              height={24}
            />
            <span className="">0x21C9eC.....0BdEbD93</span>
          </div>
        </div>

        <div className="flex flex-wrap w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-base">
            <span className="text-[#C7CAD9]">Email:</span>
            <span>—</span>
          </div>

          <p className="text-[#448AFF] text-sm font-bold flex items-center gap-2 cursor-pointer">
            <PencilIcon className="text-[#448AFF] w-5 h-5" />
            Change email
          </p>
        </div>
      </div>

      <div className="bg-[#1B1E29] rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#EBECF2] flex items-center gap-2">
            KYC Status{" "}
            <span className="text-xs text-[#FF5C5C] bg-[#ff5c5c2e] px-2 py-1 rounded-lg">
              Required
            </span>
          </h2>

          <div className="flex items-center">
            <Image src={PowderIcon.src} alt="..." width={20} height={20} />
            <span className="text-xs text-[#919EAB] ml-1">
              Powered by BlockPass
            </span>
          </div>
        </div>
        <p className="text-base text-[#EBECF2] mb-4">
          Register your wallet and upload KYC documents for Launchpad
          participation. KYC is mandatory to participate in launchpad projects.
        </p>
        <div className="flex justify-end gap-3 items-center">
          <span className="text-sm text-[#919EAB]">Takes about 15 minutes</span>
          <Button variant="primary" size="small" className="px-3 h-[36px]">
            Complete KYC
          </Button>
        </div>
      </div>

      <div className="bg-[#1B1E29] rounded-xl p-6 col-span-2">
        <h2 className="text-lg font-bold text-[#EBECF2] mb-4">
          Notification Preferences
        </h2>
        <div className="space-y-6">
          <Checkbox
            label="Receive email notifications about my active launches [Mandatory]."
            id="1"
            disabled
          />

          <Checkbox
            label="Receive emails about upcoming launchpads, whitelist announcements and open dates."
            id="2"
          />
        </div>
      </div>
    </div>
  );
}

export const Checkbox = ({ label, id, disabled }: any) => {
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
          value=""
          className="sr-only peer"
          disabled={disabled}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0FC679]"></div>
      </label>

      <span
        className={clsx({
          ["text-[#EBECF2]"]: true,
          ["text-[#919EAB]"]: disabled,
        })}
      >
        {label}
      </span>
    </div>
  );
};
