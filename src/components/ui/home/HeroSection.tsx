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
    <section className="relative flex flex-col-reverse lg:flex-row items-end justify-start mb-[88px] lg:mb-8 px-0 lg:px-20 py-0 lg:py-16 text-left min-h-0 lg:min-h-[600px]">
      <div className="z-10 relative max-w-full w-full lg:max-w-[520px] px-4 lg:px-0">
        {caseLaunch === 0 && (
          <span className="hidden lg:inline-block bg-[#448AFF29] mb-6 px-4 py-[2px] rounded-2xl text-[#61F3F3] text-lg font-bold leading-7">
            Coming Soon
          </span>
        )}

        <h1 className="text-[32px] lg:text-5xl leading-10 lg:leading-[1.2] font-extrabold lg:font-bold text-[#EBECF2] mb-5">
          Get exclusive early access to new project IDOs on Polygon
        </h1>
        <p className="mb-10 text-[#C7CAD9] text-base leading-6">
          Web3 projects you can trust, supported by industry-leading creators and funds.
        </p>

        <Button
          variant="primary"
          size="large"
          className="min-w-[250px] bg-[#448AFF] !text-base leading-6 mt-8 lg:mt-0"
          onClick={handleClick}
        >
          {caseLaunch !== 0 ? " Get started" : "Join The QuickLaunch Waitlist"}
        </Button>

        <div className="mt-10 lg:mt-16 text-[#637381] text-sm flex items-center">
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
      <div className="relative lg:absolute w-full h-[350px] lg:h-full left-0 top-0 inset-0 z-0">
        <Image
          src="/assets/images/Background.png"
          alt="Hero Background"
          fill
          className="hidden lg:block opacity-80 w-full h-full object-cover fill"
        />
        <Image
          src="/assets/images/Hero-image-mobile.png"
          alt="Hero Background"
          fill
          className="block lg:hidden w-full h-full object-cover fill"
        />
      </div>
    </section>
  );
};

export default HeroSection;
