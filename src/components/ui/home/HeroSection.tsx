import React from "react";
import Image from "next/image";
import Button from "components/common/Button";

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 text-left">
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
            src="/trustswap-logo.png"
            alt="TrustSwap"
            width={100}
            height={20}
            className="ml-2"
          />
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-background.jpg"
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
