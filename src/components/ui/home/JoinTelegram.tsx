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
          <svg
            width="18"
            height="15"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.5278 6.46993C6.17891 4.44352 9.28038 3.10758 10.8322 2.46212C15.263 0.619208 16.1837 0.299075 16.7838 0.288504C16.9157 0.286179 17.2108 0.318888 17.402 0.473998C17.5634 0.60497 17.6078 0.781894 17.6291 0.90607C17.6503 1.03025 17.6768 1.31312 17.6558 1.53415C17.4156 4.05696 16.3767 10.1792 15.8482 13.0047C15.6245 14.2004 15.1841 14.6012 14.7578 14.6405C13.8313 14.7257 13.1277 14.0282 12.2304 13.4399C10.8261 12.5194 10.0328 11.9464 8.6698 11.0482C7.09458 10.0102 8.11573 9.43963 9.01345 8.50723C9.24838 8.26321 13.3306 4.55009 13.4097 4.21325C13.4195 4.17112 13.4287 4.01409 13.3354 3.93117C13.2421 3.84825 13.1044 3.87661 13.0051 3.89916C12.8642 3.93112 10.621 5.41383 6.27531 8.34729C5.63857 8.78452 5.06183 8.99756 4.54508 8.98639C3.97542 8.97408 2.87961 8.6643 2.065 8.3995C1.06583 8.07471 0.271718 7.90299 0.340867 7.3514C0.376885 7.0641 0.772528 6.77027 1.5278 6.46993Z"
              fill="#448AFF"
            />
          </svg>
          Join Us On Telegram
        </Button>
      </div>
      <div className="absolute bottom-0 right-0 z-0">
        <Image
          src={TelegramIcon.src}
          alt="Telegram Background"
          width={251}
          height={251}
          style={{objectFit:"contain"}}
        />
      </div>
    </section>
  );
};

export default JoinTelegram;
