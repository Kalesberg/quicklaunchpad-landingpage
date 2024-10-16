import React from "react";
import Image from "next/image";
import Button from "components/common/Button";
import {
  TelegramIcon,
  YoutubeIcon,
  DiscordIcon,
  GithubIcon,
  TwitterIcon,
} from "../../../../public/assets/images/social-icons";

const LaunchNotice: React.FC = () => {
  return (
    <section className="mb-12 overflow-hidden">
      <div className="rounded-lg p-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center mb-2">
            <Image
              src="/assets/images/project-logo.png"
              alt="Launch Name"
              width={32}
              height={32}
              className="rounded-full mr-2"
            />
            <h2 className="text-xl font-bold">Launch Name</h2>
          </div>

          <div className="flex space-x-5 mt-2 mb-4">
            <TelegramIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
            <YoutubeIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
            <DiscordIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
            <GithubIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
            <TwitterIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </div>

          <p className="text-xl font-bold text-white mb-2">
            [Launch Name] is now live on QuickSwap Launchpad
          </p>

          <p className="text-sm text-gray-400 mb-4">
            This project is lorem ipsum dolor sit amet...
          </p>

          <div className="flex flex-col gap-2 justify-start text-gray-400 items-start text-sm mb-4">
            <p>Total raise: $150,000</p>
            <p>Initial price: $0.10</p>
            <p>Launch date: 24 Jan 2024 2:00 AM UTC +3</p>
          </div>

          <Button variant="primary" size="medium">
            Participate Now
          </Button>
        </div>
        <div className="absolute top-8 right-8 flex justify-between items-center text-sm z-10">
          <span className="bg-green-500 text-black font-semibold px-2 py-1 rounded-md text-xs">
            00:39:78 left
          </span>
        </div>
        <div className="absolute top-0 right-0 bottom-0 w-full z-0 rounded-lg bg-cover bg-[url('/assets/images/launch-bg.png')] before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:bg-gradient-to-r
            before:from-[#000]
            before: from-0%
            before:to-100%
            before:opacity-100
            before:z-[-1]"
        ></div>
      </div>
    </section>
  );
};

export default LaunchNotice;
