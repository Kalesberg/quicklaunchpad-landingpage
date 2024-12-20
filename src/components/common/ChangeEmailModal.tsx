import React, { useState } from "react";
import Button from "./Button";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { isValidEmail } from "utils";

const ChangeEmailModal: React.FC<{
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
}> = ({ openModal, setOpenModal }) => {
  const [email, setEmail] = useState("");
  const [noValidEmail, setNoValidEmail] = useState(false);
  const [noValidText, setNoValidText] = useState("");
  const handleModal = () => {
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
    } else {
      setNoValidEmail(true);
      setNoValidText("Email invalid.");
    }
  };

  return (
    openModal && (
      <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#1b1e298c] flex justify-center items-center">
        <div className="max-w-[480px] bg-[#1B1E29] shadow-sm shadow-slate-800 p-6 rounded-2xl">
          <div className="flex flex-col gap-2 mb-4">
            <h2 className="text-lg font-bold leading-7 text-[#EBECF2]">
              Change email address
            </h2>
            <p className="text-base text-[#EBECF2] leading-6">
              Please enter your email address here. We will send updates
              occasionally.
            </p>
          </div>
          <div className="mb-4">
            <div className="mb-6">
              <div
                className={`relative z-0 w-full h-[54px] bg-[#1B1E29] flex items-center gap-2 border border-solid border-[#919EAB33] rounded-lg text-white px-3 py-2 ${
                  noValidEmail && "border-[#FF5C5C7A]"
                }`}
              >
                <label className="absolute -top-2 left-4 text-xs text-[#C7CAD9] font-semibold bg-[#1B1E29] px-1">
                  Email
                </label>
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

            <div className="flex items-center justify-end gap-3">
              <Button
                variant="primary"
                size="large"
                className="!h-9 !text-sm font-bold capitalize leading-6 !bg-[#919EAB14] hover:!bg-[#919EAB33]"
                onClick={handleModal}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="large"
                className="!h-9 !text-[15px] font-bold capitalize leading-6 hover:!bg-blue-600"
                onClick={handleSubmit}
              >
                Save & verify email
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ChangeEmailModal;
