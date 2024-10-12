import React from "react";
import Image from "next/image";
import Button from "components/common/Button";

const HeroSection: React.FC = () => {
  return (
    <section className="relative mb-7 p-20 text-left">
      <div className="z-10 relative max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 text-white">
          Stay ahead of the curve with exclusive early access
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Highly-vetted Web3 projects you can trust. Supported by
          industry-leading creators and funds.
        </p>
        <Button variant="primary" size="large">
          Open QuickLaunch Dashboard
        </Button>
        <div className="mt-8 text-gray-400 flex items-center">
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
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/banner.webp"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
      </div>
    </section>
  );
};

export default HeroSection;
