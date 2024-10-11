import React from "react";
import Image from "next/image";
import Button from "components/common/Button";

const LaunchNotice: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg p-6 mb-12 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center mb-2">
          <Image
            src="/project-logo.png"
            alt="Launch Name"
            width={24}
            height={24}
            className="rounded-full mr-2"
          />
          <h2 className="text-xl font-bold">Launch Name</h2>
        </div>
        <p className="text-sm text-gray-300 mb-2">
          [Launch Name] is now live on QuickSwap Launchpad
        </p>
        <p className="text-xs text-gray-400 mb-4">
          This project is lorem ipsum dolor sit amet...
        </p>
        <div className="flex justify-between items-center text-sm mb-4">
          <span>Total raise: $150,000</span>
          <span>Initial price: $0.10</span>
        </div>
        <div className="flex justify-between items-center text-sm mb-4">
          <span>Launch date: 24 Jan 2024 2:00 AM UTC +3</span>
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
            00:39:78 left
          </span>
        </div>
        <Button variant="primary" size="medium">
          Participate Now
        </Button>
      </div>
      <div className="absolute top-0 right-0 bottom-0 w-1/2 z-0">
        <Image
          src="/launch-background.jpg"
          alt="Launch Background"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>
    </section>
  );
};

export default LaunchNotice;
