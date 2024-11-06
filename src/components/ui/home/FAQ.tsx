"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQList {
  id: string;
  name: string;
  logo: string;
  faq: FAQItem[];
}

const FAQItem: React.FC<FAQItem & { isOpen: boolean; toggle: () => void }> = ({
  question,
  answer,
  isOpen,
  toggle,
}) => (
  <div>
    <button
      className="w-full text-left pl-4 pr-2 py-3 flex justify-between items-center border-t border-[#282D3D80]"
      onClick={toggle}
    >
      <span className="text-lg font-semibold">{question}</span>
      <ChevronDownIcon
        className={clsx({
          ["w-5 h-5 transition-transform duration-300"]: true,
          ["rotate-180"]: isOpen,
        })}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="p-4">
        <p
          className="text-gray-300"
          dangerouslySetInnerHTML={{ __html: answer }}
        ></p>
      </div>
    </div>
  </div>
);

const FAQ: React.FC = () => {
  const faqList: FAQList[] = [
    {
      id: "getting-started",
      name: "Getting Started",
      logo: "start-icon.svg",
      faq: [
        {
          question: "What is the QuickLaunch Launchpad?",
          answer:
            "This is a Web3 Launchpad by QuickSwap (powered by TrustSwap) that facilitates a token sale and helps blockchain-based projects raise capital.",
        },
        {
          question: "What is the process for participating in a QuickLaunch?",
          answer:
            "The QuickLaunch Launchpad uses a Lottery system where a certain amount of whitelisted users are randomly selected to participate in a project launch.There are three simple steps. First, you sign into the dashboard and then KYC with our KYC provider. Once you are successfully KYC’d, you are eligible to participate in a QuickLaunch. Next, you find a project you would like to participate in and register to be whitelisted for the project’s launch. This means you are expressing interest in participating and are participating in the lottery. Then, once the lottery is run, if you are selected, you will receive a notification that you can contribute your allocated amount to the project via the dashboard. When the project launch is completed, you will be notified via the dashboard about where and how to claim your tokens.",
        },
        {
          question: "Do I have access to KYC to access QuickLaunch?",
          answer:
            "Yes. KYC is required for all users participating in any project on QuickLaunch. Through a partnership with Blockpass, the KYC process has been simplified and allows you to register via the QuickLaunch dashboard.",
        },
        {
          question: "What if I am already currently KYC’ed by BlockPass?",
          answer: `That makes the process easier. Connect to the QuickLaunch dashboard, register to KYC, and when prompted to start KYC, make sure you use the previously KYC’d email address.
You should see a prompt from BlockPass saying, “If you have previously created a Blockpass Identity, you should use that email address here.” Once you use your KYC’d email address, you will not need to repeat the KYC process.`,
        },
      ],
    },
    {
      id: "fees-eligibility",
      name: "Fees & Eligibility",
      logo: "fees-eligibility-icon.svg",
      faq: [
        {
          question: "Is there a fee to participate in a QuickLaunch?",
          answer: `There are no fees to opt in and no token staking requirements.`,
        },
        {
          question: "What crypto tokens can be used to participate in IDOs?",
          answer: `Stablecoins: USDT or USDC on Polygon.`,
        },
        {
          question: "How can I increase my odds of winning the lottery?",
          answer: `This is a system-generated lottery that is automatically calculated.`,
        },
        {
          question: "Is the QuickLaunch lottery provably fair?",
          answer: `The Lottery system works completely off-chain, shuffling the participants using the Fisher-Yates algorithm to randomise their order. It then selects the first maxWinners as the random winners. This is to ensure a fair and unbiased selection by leveraging Math.random() for randomness.`,
        },
      ],
    },
    {
      id: "security",
      name: "Security",
      logo: "security-icon.svg",
      faq: [
        {
          question:
            "How can I verify that emails I receive from QuickLaunch are legitimate?",
          answer: `Emails are always sent from no-reply@mail.quicklaunchpad.io, and they will include your personal unique PIN number. The legitimacy of these emails is confirmed by both the sender’s address and the presence of your PIN. To ensure your safety, please do not engage with or provide any information in response to suspicious emails. Always double-check both the sender’s address and your PIN number to verify authenticity.`,
        },
        {
          question:
            "I received an email about QuickLaunch with a link. What should I do?",
          answer: `Except for verifying your email, links are never included in emails from QuickLaunch. This is to protect your security and prevent phishing attempts. If you are in doubt, please reach out to support/moderators on official social media channels. Always prioritise your online safety!`,
        },
        {
          question:
            "I received a DM (direct message) on Telegram claiming to be from QuickLaunch. How do I check if this is legitimate?",
          answer: `QuickLaunch support moderators never initiate DMs (direct messages) on Telegram. If you receive a message from someone claiming to be from QuickLaunch, it is a scammer. Always use the official Telegram channel for support, and avoid engaging with any direct messages that are sent to you.`,
        },
        {
          question:
            "What is the PIN number in the emails I get from QuickLaunch?",
    answer:`The PIN number included in the emails you receive from QuickLaunch is a personal and unique identifier assigned to each registered user. This helps verify that the email is from us, not a scammer. If you ever receive an email without your unique PIN or notice any discrepancies, please reach out to our <a href="https://t.me/QuickLaunchOfficial" target="_blank" class="text-[#448AFF] leading-6 border-b border-[#448AFF]">Telegram support</a> team for assistance.`
        },
      ],
    },
    {
      id: "troubleshooting",
      name: "Troubleshooting",
      logo: "troubleshooting-icon.svg",
      faq: [
        {
          question:
            "Why didn’t I receive an email announcing the new launchpad?",
          answer: `Connect your wallet and go to the profile page, then make sure that email notifications are enabled. If they are enabled and you still don't receive new announcement emails, please reach out on official social media channels for further assistance.`,
        },
        {
          question: "How can I contact QuickLaunch for questions or issues?",
          answer: `You can contact QuickLaunch directly through the official <a href="https://t.me/QuickLaunchOfficial"  target="_blank" class="text-[#448AFF] leading-6 border-b border-[#448AFF]">Telegram channel</a>, where moderators will be available to assist you with any questions or issues you may have.`,
        },
      ],
    },
  ];

  const [openItems, setOpenItems] = useState<number[]>([]);
  const [tabActive, setTabActive] = useState<string>(faqList[0].id);

  const toggleItem = (index: number) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(index)
        ? prevOpenItems.filter((i) => i !== index)
        : [...prevOpenItems, index]
    );
  };

  const handleSelectTab = (tabId: string) => {
    setOpenItems([]);
    setTabActive(tabId);
  };

  return (
    <section className="max-w-[1000px] mx-auto mb-[120px] px-4 md:px-0">
      <h2 className="text-[20px] md:text-[32px] text-center leading-[30px] md:leading-8 font-bold mb-8">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col md:flex-row gap-4 md:gap-10">
        <div className="flex-[40%]">
          <div className="grid grid-cols-2 md:grid-cols-1 items-center gap-2">
            {faqList.map((faq) => (
              <div
                key={faq.id}
                className={`flex flex-col md:flex-row items-center gap-4 text-[#282D3D] p-4 cursor-pointer text-[17px] md:text-2xl text-center font-bold leading-[26px] md:leading-9 hover:text-[#EBECF2] transition-all ${
                  tabActive === faq.id && "text-[#EBECF2]"
                }`}
                onClick={() => handleSelectTab(faq.id)}
              >
                <div
                  className={`w-9 h-9 md:w-12 md:h-12 p-[9px] md:p-3 mx-auto md:mx-0 mb-2 rounded-[9px] md:rounded-xl bg-[#282D3D99] border border-[#282D3D] border-1 ${
                    faq.id === tabActive && "bg-[#40455799] border-[#404557]"
                  }`}
                >
                  <Image
                    src={`/assets/images/${faq.logo}`}
                    alt={faq.name}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                    style={{
                      filter: `${
                        tabActive === faq.id
                          ? "invert(54%) sepia(30%) saturate(6598%) hue-rotate(200deg) brightness(100%) contrast(103%)"
                          : ""
                      }`,
                    }}
                  />
                </div>
                {faq.name}
                {tabActive === faq.id && (
                  <svg
                    width="79"
                    height="14"
                    viewBox="0 0 79 14"
                    fill="none"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="hidden md:block text-[#4d5d7994] ml-auto"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M1 7H78M78 7L72 1M78 7L72 13"
                        stroke="#4d5d7994"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-[60%] md:mt-4">
          {faqList
            .find((faq) => faq.id === tabActive)
            ?.faq?.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openItems.includes(index)}
                toggle={() => toggleItem(index)}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
