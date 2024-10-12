"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

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
      {isOpen ? (
        <ChevronUpIcon className="w-5 h-5 transition-transform duration-300" />
      ) : (
        <ChevronDownIcon className="w-5 h-5 transition-transform duration-300" />
      )}
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
  ];

  const toggleItem = (index: number) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(index)
        ? prevOpenItems.filter((i) => i !== index)
        : [...prevOpenItems, index]
    );
  };

  return (
    <section className="mb-12">
      <h2 className="text-3xl text-center font-bold mb-6">Frequently Asked Questions</h2>
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
