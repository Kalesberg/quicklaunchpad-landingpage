import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import Button from "./Button";
import { TelegramIcon } from "../../../public/assets/images/social-icons";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { isValidEmail } from "utils";

const SignUpModal: React.FC<{ openModal?: boolean; setOpenModal?: any }> = ({
  openModal,
  setOpenModal,
}) => {
  const [email, setEmail] = useState("");
  const [noValidEmail, setNoValidEmail] = useState(false);
  const [noValidText, setNoValidText] = useState("");
  const [confirm, setConfirm] = useState(false);
  const handleModal = (isClose: boolean = false) => {
    if (!isClose) {
      setConfirm(!confirm);
    }
    setOpenModal(!openModal);
    setEmail("");
  };

  const handleOnChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (!email) {
      setNoValidEmail(true);
      setNoValidText("Please fill out all the required fields.");
    } else if (isValidEmail(email)) {
      setNoValidEmail(false);
      setConfirm(true);
    } else {
      setNoValidEmail(true);
      setNoValidText("Email invalid.");
    }
  };

  return (
    openModal && (
      <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#1b1e298c] flex justify-center items-center">
        {confirm ? (
          <div className="max-w-[480px] bg-[#1B1E29] shadow-lg p-6 rounded-2xl">
            <div className="flex justify-end mb-4">
              <XMarkIcon
                className="w-[18px] h-[18px] text-[#919EAB] cursor-pointer"
                onClick={() => handleModal(true)}
              />
            </div>
            <div className="pb-4">
              <Image
                src="/assets/images/confirm-email.png"
                alt="comfirm email"
                width={242}
                height={242}
                className="mx-auto"
              />
              <h2 className="text-lg text-center font-bold leading-7 text-[#EBECF2] mb-6">
                Thank you for your interest in QuickLaunch
              </h2>
              <p className="text-sm text-[#C7CAD9] mb-6 text-center">
                We&apos;ve received your request and will be in touch shortly at{" "}
                <span className="font-semibold">{email}</span>.
              </p>
              <Button
                variant="primary"
                size="large"
                className="w-full !text-[15px] font-bold capitalize leading-6 hover:text-[#696C8080] hover:!bg-[#919EAB33]"
                onClick={() => handleModal()}
              >
                Back to site
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-[480px] bg-[#1B1E29] shadow-lg p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold leading-7 text-[#EBECF2]">
                Sign up for updates
              </h2>
              <XMarkIcon
                className="w-[18px] h-[18px] text-[#919EAB] cursor-pointer"
                onClick={() => handleModal(true)}
              />
            </div>
            <div className="pb-4">
              <p className="text-sm text-[#C7CAD9] mb-6 text-justify">
                Drop your email here, and we&apos;ll keep you in the loop with
                all the exciting updates about QuickSwap Launches!
              </p>
              <div className="mb-6">
                <div
                  className={`w-full h-[54px] bg-[#1B1E29] flex items-center gap-2 border border-solid border-[#919EAB33] rounded-lg text-white px-3 py-2 ${
                    noValidEmail && "border-[#FF5C5C7A]"
                  }`}
                >
                  {noValidEmail && (
                    <ExclamationCircleIcon className="w-6 h-6 text-[#FF5C5C]" />
                  )}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleOnChange(e)}
                    placeholder="Enter email"
                    className="w-full h-auto bg-transparent text-white"
                  />
                </div>
                {noValidEmail && (
                  <p className="text-xs text-[#FF5C5C] leading-5 px-2 mt-2">
                    {noValidText}
                  </p>
                )}
              </div>

              <Button
                variant="primary"
                size="large"
                className="w-full !text-[15px] font-bold capitalize leading-6 hover:text-[#696C8080] hover:!bg-[#919EAB33]"
                onClick={handleSubmit}
              >
                Get in touch
              </Button>
              <div className="relative text-center my-3 py-4 before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[45%] before:h-[1px] before:block before:bg-[#FFFFFF99] before:-translate-y-[50%] after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[45%] after:h-[1px] after:block after:bg-[#FFFFFF99] after:-translate-y-[50%]">
                <p className="text-sm font-normal leading-6 text-[#C7CAD9] ">
                  and
                </p>
              </div>
              <h3 className="text-[#EBECF2] leading-6 font-semibold text-center mb-4">
                Join us on Telegram
              </h3>
              <p className="text-sm text-[#C7CAD9] mb-4 text-center">
              Join our Telegram channel for exclusive updates on upcoming crypto launches, industry insights, and real-time discussions
              </p>
              <Button
                variant="secondary"
                size="large"
                className="w-full !text-[15px] font-bold capitalize leading-6"
                onClick={(event) => {
                  event.preventDefault();
                  window.open("https://t.me/QuickLaunchOfficial");
                }}
              >
                <TelegramIcon className="w-[18px] h-[18px] text-[#448AFF] hover:text-white cursor-pointer" />
                Join us on Telegram
              </Button>
            </div>
            <div className="px-4 pt-2">
              <div className="text-xs font-normal leading-5 text-[#696C80] text-center">
                <p>By sending this form, you agree to the</p>{" "}
                <a
                  href="#"
                  className="text-xs font-normal leading-5 text-[#448AFF] underline"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-xs font-normal leading-5 text-[#448AFF] underline"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default SignUpModal;
