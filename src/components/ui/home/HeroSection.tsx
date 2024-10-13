import React from "react";
import Image from "next/image";
import Button from "components/common/Button";

const HeroSection: React.FC = () => {
  return (
    <section className="relative flex items-end justify-start mb-12 p-20 text-left min-h-[735px]">
      <div className="z-10 relative max-w-[520px]">
        <h1 className="text-5xl leading-[1.2] font-bold mb-5 text-white">
          Stay ahead of the curve with exclusive early access
        </h1>
        <p className="text-xl mb-10 text-gray-300">
          Highly-vetted Web3 projects you can trust. Supported by
          industry-leading creators and funds.
        </p>

        <Button variant="primary" size="large">
          Open QuickLaunch Dashboard
        </Button>

        <div className="mt-16 text-gray-400 flex items-center">
          Powered by
          <Image
            src="/assets/images/trustswap_logo_white.png"
            alt="TrustSwap"
            width={150}
            height={50}
            className="ml-2"
          />
        </div>
      </div>
      <div className="absolute w-full h-full left-0 top-0 inset-0 z-0">
        <Image
          src="/assets/images/banner.webp"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="opacity-80 w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
