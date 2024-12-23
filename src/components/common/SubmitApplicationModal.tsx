import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import Button from "./Button";
import Image from "next/image";
import { Project } from "state/type";

const SubmitApplicationModal: React.FC<{
  openModal: boolean | undefined;
  setOpenModal: (arg: boolean) => void;
  project: Project
}> = ({ openModal, setOpenModal, project }) => {
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState(false);

  
  const handleModal = () => {
    setConfirm(false);
    setOpenModal(!openModal);
  };

  const handleSubmit = () => {
    setConfirm(true);
  };

  return (
    openModal && (
      <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#1b1e298c] flex justify-center items-center">
        {confirm ? (
          <div className="max-w-[480px] bg-[#1B1E29] shadow-sm shadow-slate-800 p-6 rounded-2xl">
            <div className="flex justify-end mb-4">
              <XMarkIcon
                className="w-[18px] h-[18px] text-[#919EAB] cursor-pointer"
                onClick={handleModal}
              />
            </div>
            <div>
              <Image
                src="/assets/images/confirm-email.png"
                alt="comfirm email"
                width={242}
                height={242}
                className="mx-auto"
              />
              <h2 className="text-lg text-center font-bold leading-7 text-[#EBECF2] mb-2">
                You are whitelisted for this project!
              </h2>
              <p className="text-sm text-[#C7CAD9] mb-6 text-center">
                The winners will be announced on{" "}
                <span className="font-semibold">{project.pledgeEndDate}</span>.
                If successful, you’ll be notified via email with further
                instructions.
              </p>
              <Button
                variant="primary"
                size="large"
                className="w-full !text-[15px] font-bold capitalize leading-6 hover:!bg-blue-600"
                onClick={handleModal}
              >
                Got it!
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-[480px] bg-[#1B1E29] shadow-sm shadow-slate-800 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold leading-7 text-[#EBECF2]">
                Participate in Launch
              </h2>
              <XMarkIcon
                className="w-[18px] h-[18px] text-[#919EAB] cursor-pointer"
                onClick={handleModal}
              />
            </div>
            <div>
              <p className="text-sm text-[#C7CAD9] mb-4">
                Welcome aboard! Submit application to participate in upcoming
                lottery. During the lottery, participants will be randomly
                selected to participate.
              </p>
              <div className="mb-4">
                <h2 className="text-lg font-bold leading-7 text-[#EBECF2] mb-4">
                  {project.projectName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#C7CAD9] text-sm leading-5">
                      Blockchain
                    </p>
                    <div className="flex item-center gap-1">
                      <Image
                        src="/assets/images/4dee09caf5949d0260bcdbb0b8e9a52a.png"
                        alt="polygon"
                        width={24}
                        height={24}
                      />
                      <p className="text-[#EBECF2] text-lg font-bold leading-7">
                        Polygon
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[#C7CAD9] text-sm leading-5">
                      Contribution
                    </p>
                    <p className="text-[#EBECF2] text-lg font-bold leading-7">
                      $2,000
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[#C7CAD9] text-sm leading-5">
                      Lottery Date & Time
                    </p>
                    <p className="text-[#EBECF2] text-lg font-bold leading-7">
                      {project.pledgeEndDate}
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-[#412127] flex items-center gap-2 p-2 rounded-lg mb-4">
                  <Image
                    src="/assets/images/ic-danger.png"
                    alt="danger icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <p className="text-[#FFD6D6] text-sm leading-5">
                    Something went wrong! Please try again.
                  </p>
                </div>
              )}

              <Button
                variant="primary"
                size="large"
                className="w-full !text-[15px] font-bold capitalize leading-6 hover:!bg-blue-600"
                onClick={handleSubmit}
              >
                {error ? 'Re-Submit application' : 'Submit application'}
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default SubmitApplicationModal;
