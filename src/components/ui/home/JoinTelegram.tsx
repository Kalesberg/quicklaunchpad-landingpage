import React from "react";
import Image from "next/image";
import Button from "components/common/Button";

const JoinTelegram: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 mb-12 relative overflow-hidden">
      <div className="relative z-10 flex justify-between items-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Join us on Telegram</h2>
          <p className="text-gray-300 mb-6">
            Join our Telegram channel for exclusive updates on upcoming crypto
            launches, industry insights, and real-time discussions. Connect with
            like-minded individuals and be the first to know about the latest
            opportunities in the blockchain space.
          </p>
          <Button variant="primary" size="large" as="button">
            Join Us On Telegram
          </Button>
        </div>
        <div className="hidden lg:block">
          <Image
            src="/telegram-icon.png"
            alt="Telegram"
            width={150}
            height={150}
            className="opacity-50"
          />
        </div>
      </div>
      <div className="absolute top-0 right-0 bottom-0 left-1/2 z-0">
        <Image
          src="/telegram-background.jpg"
          alt="Telegram Background"
          layout="fill"
          objectFit="cover"
          className="opacity-10"
        />
      </div>
    </section>
  );
};

export default JoinTelegram;
