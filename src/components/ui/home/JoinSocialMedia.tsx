import React from "react";
import Image from "next/image";
import SocialMediaIcon from "../../../../public/assets/images/home/social-media-bg.png";
import {
  TwitterIcon,
  TelegramIcon,
} from "../../../../public/assets/images/social-icons";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

const JoinSocialMedia: React.FC = () => {
  return (
    <section className="bg-[#1C1E29] rounded-3xl my-[120px] px-6 py-6 lg:p-8 mx-4 lg:mx-0 mb-[88px] relative overflow-hidden">
      <div className="max-w-[1064px] relative z-10 flex gap-16 items-center">
        <div className="max-w-[734px]">
          <h2 className="text-[32px] leading-[48px] font-semibold mb-3">
            Follow on Social Media
          </h2>
          <p className="text-[#C7CAD9] text-base leading-6 mb-6">
            Follow QuickLaunch on social media channels for exclusive updates on
            upcoming crypto launches, industry insights, and real-time
            discussions. Connect with like-minded individuals and be the first
            to know about the latest opportunities for IDOs on Polygon.
          </p>
          <div className="flex space-x-5 mt-2 mb-4">
            <a href="https://t.me/QuickLaunchOfficial" target="_blank">
              <TelegramIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            </a>

            <a
              href="https://x.com/quickswapdex?s=21&t=nQjWO49uC8GB7M59QlcWjQ"
              target="_blank"
            >
              <TwitterIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 z-0">
        <Image
          src={SocialMediaIcon.src}
          alt="Telegram Background"
          width={251}
          height={251}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default JoinSocialMedia;
