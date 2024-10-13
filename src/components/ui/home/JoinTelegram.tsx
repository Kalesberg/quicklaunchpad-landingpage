import React from "react";
import Image from "next/image";
import Button from "components/common/Button";
import TelegramIcon from "../../../../public/assets/images/home/tele-bg.png";

const JoinTelegram: React.FC = () => {
  return (
    <section className="bg-[#1C1E29] rounded-lg mt-24 mb-36 p-16 relative overflow-hidden">
      <div className="max-w-[1064px] relative z-10 flex gap-16 items-center">
        <div className="max-w-[734px]">
          <h2 className="text-[32px] font-bold mb-4">Join us on Telegram</h2>
          <p className="text-gray-300 mb-6">
            Join our Telegram channel for exclusive updates on upcoming crypto
            launches, industry insights, and real-time discussions. Connect with
            like-minded individuals and be the first to know about the latest
            opportunities in the blockchain space.
          </p>
        </div>

        <Button variant="secondary" size="large" as="button" className="px-9">
          Join Us On Telegram
        </Button>
      </div>
      <div className="absolute bottom-0 right-0 z-0">
        <Image
          src={TelegramIcon.src}
          alt="Telegram Background"
          width={251}
          height={251}
          objectFit="contain"
          className=""
        />
      </div>
    </section>
  );
};

export default JoinTelegram;
