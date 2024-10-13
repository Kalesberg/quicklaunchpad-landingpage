"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItem & { isOpen: boolean; toggle: () => void }> = ({
  question,
  answer,
  isOpen,
  toggle,
}) => (
  <div className="mb-4">
    <button
      className="w-full text-left bg-[#1B1E29] p-4 rounded-t-lg flex justify-between items-center"
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
      <div className="p-4 bg-[#1B1E29] rounded-b-lg">
        <p className="text-gray-300">{answer}</p>
      </div>
    </div>
  </div>
);

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems: FAQItem[] = [
    {
      question: "What is the QuickLaunch Launchpad?",
      answer:
        "This is a Web3 Launchpad by QuickSwap (powered by TrustSwap) that facilitates a token sale and helps blockchain-based projects raise capital.",
    },
    {
      question: "What is the process for participating in a QuickLaunch?",
      answer:
        "The QuickLaunch Launchpad uses a Lottery system where a certain amount of whitelisted users are randomly selected to participate in a project launch. There are three simple steps: First, you sign into the dashboard and then KYC with our KYC provider. Once you are successfully KYC'd, you are eligible to participate in a QuickLaunch. Next, you find a project you would like to participate in and register to be whitelisted for the project's launch. This means you are expressing interest in participating and are participating in the lottery. Then, once the lottery is run, if you are selected, you will receive a notification that you can contribute your allocated amount to the project via the dashboard. When the project launch is completed, you will be notified via the dashboard about where and how to claim your tokens.",
    },
    {
      question: "Do I have to KYC to access QuickLaunch?",
      answer:
        "Yes. KYC is required for participating in any project on QuickLaunch. Our partnership with Blockpass has simplified the KYC process. You can register via the QuickLaunch dashboard.",
    },
    {
      question: "What if I am already currently KYC’ed by BlockPass?",
      answer: `That makes the process easier. Connect to the QuickLaunch dashboard, register to KYC, and when prompted to start KYC, make sure you use the previously KYC’d email address.
You should see a prompt from BlockPass saying, “If you have previously created a Blockpass Identity, you should use that email address here.” Once you use your KYC’d email address, you will not need to repeat the KYC process.`,
    },
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
      answer: `Our Lottery works completely off-chain, it shuffles the participants using the Fisher-Yates algorithm to randomize their order, then selects the first maxWinners as the random winners. This way we ensure a fair and unbiased selection by leveraging Math.random() for randomness.`,
    },
    {
      question: "How can I contact QuickLaunch for questions or problems?",
      answer: `You can contact us directly through our Telegram channel, where our moderators will be available to assist you with any questions or issues you may have.`,
    },
    {
      question: "What is the PIN number in the emails I get from QuickLaunch?",
      answer: `The PIN number included in the emails you receive from QuickLaunch is a personal and unique identifier assigned to each registered user. This helps verify that the email is from us, not a scammer. If you ever receive an email without your unique PIN or notice any discrepancies, please reach out to our Telegram support team for assistance. 
`,
    },
    {
      question:
        "How can I verify that emails I receive from QuickLaunch are legitimate?",
      answer: `We always send our emails from the address no-reply@mail.quicklaunchpad.io, and they will include your personal unique PIN number. The legitimacy of our emails is confirmed by both the sender’s address and the presence of your PIN. To ensure your safety, please do not engage with or provide any information in response to suspicious emails. Always double-check both the sender’s address and your PIN number to verify authenticity.`,
    },
    {
      question:
        "I received an email about QuickLaunch with a link. What should I do? ",
      answer: `Except for verifying your email, we never include links in our emails. This is to protect your security and prevent phishing attempts. If you are in doubt, please reach out to our support team. Always prioritize your online safety!`,
    },
    {
      question:
        "I received a direct message (DM) on Telegram claiming to be from QuickLaunch. How do I check if this is legitimate?",
      answer: `We never initiate direct messages (DMs) on Telegram. If you receive a message from someone claiming to be from us, it is a scammer. Always use our official Telegram channel for support, and avoid engaging with any direct messages that are sent to you.`,
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(index)
        ? prevOpenItems.filter((i) => i !== index)
        : [...prevOpenItems, index]
    );
  };

  return (
    <section className="py-12 max-w-[712px] mx-auto">
      <h2 className="text-[32px] text-center font-bold mb-16">
        Frequently Asked Questions
      </h2>
      <div>
        {faqItems.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openItems.includes(index)}
            toggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
