import React from "react";
import Image from "next/image";
import Button from "components/common/Button";

const LaunchNotice: React.FC = () => {
  return (
    <section className="relative px-[100px] pt-[50px] pb-7 mb-12 overflow-hidden border-l-2 border-r border-black">
      <Image
        src="/assets/images/layer3.efd5ebb41e66314edb53.png"
        alt="layer"
        width={0}
        height={0}
        className="absolute top-[-70%] left-[-30%]"
        style={{ width: "100%", height: "auto" }} // optional
      />
      <div className="rounded-lg p-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center mb-2">
            <Image
              src="/assets/images/project-logo.png"
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
        <div className="absolute top-0 right-0 bottom-0 w-full z-0">
          <Image
            src="/assets/images/launch-bg.png"
            alt="Launch Background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
      </div>
      <Image
        src="/assets/images/layer3.efd5ebb41e66314edb53.png"
        alt="layer"
        width={0}
        height={0}
        className="absolute bottom-[-70%] right-[-30%] rotate-180"
        style={{ width: "100%", height: "auto" }} // optional
      />
    </section>
  );
};

export default LaunchNotice;
