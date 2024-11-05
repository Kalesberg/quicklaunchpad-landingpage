"use client";
import React from "react";
import Image from "next/image";
import Button from "components/common/Button";
import { useRouter } from "next/navigation";

const HeroSection: React.FC<{
  caseLaunch: number;
  openModal?: boolean;
  setOpenModal?: any;
}> = ({ caseLaunch, openModal, setOpenModal }) => {
  const router = useRouter();
  const handleClick = () => {
    if (caseLaunch !== 0) {
      router.push("/dashboard");
    } else {
      setOpenModal(!openModal);
    }
  };
  return (
    <section className="relative flex items-end justify-start mb-8 px-20 py-16 text-left min-h-[650px]">
      <div className="z-10 relative max-w-[520px]">
        {caseLaunch === 0 && (
          <span className="bg-[#448AFF29] inline-block mb-6 px-4 py-[2px] rounded-2xl text-[#61F3F3] text-lg font-bold leading-7">
            Coming Soon
          </span>
        )}

        <h1 className="text-5xl leading-[1.2] font-bold mb-5 text-white">
          Get exclusive early access to new project IDOs on Polygon
        </h1>
        <p className="mb-10 text-[#C7CAD9] leading-6">
          Highly-vetted Web3 projects you can trust, supported by
          industry-leading creators and funds.
        </p>

        <Button
          variant="primary"
          size="large"
          className="min-w-[275px] !text-base leading-6"
          onClick={handleClick}
        >
          {caseLaunch !== 0
            ? " Open QuickLaunch Dashboard"
            : "Join the QuickLaunch Waitlist"}
        </Button>

        <div className="mt-16 text-gray-400 flex items-center">
          Powered by
          <Image
            src="/assets/images/trustswap_logo_white.png"
            alt="TrustSwap"
            width={160}
            height={40}
            className="ml-2"
          />
        </div>
      </div>
      <div className="absolute w-full h-full left-0 top-0 inset-0 z-0">
        <Image
          src="/assets/images/Background.png"
          alt="Hero Background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-80 w-full h-full object-cover fill"
        />
      </div>
    </section>
  );
};

export default HeroSection;
