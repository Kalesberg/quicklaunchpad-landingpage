import React from "react";
import Image from "next/image";
import Button from "components/common/Button";

const StepsToJoin: React.FC = () => {
  const steps = [
    {
      title: "Connect Wallet",
      description:
        "Connect your Web3 wallet to the launchpad and switch to the Polygon PoS network.",
      icon: "/icons/wallet.svg",
    },
    {
      title: "Complete KYC",
      description:
        "To confirm eligibility to invest in launchpad projects, get whitelisted by completing the KYC.",
      icon: "/icons/kyc.svg",
    },
    {
      title: "Participate in lottery",
      description:
        "Once eligible, users will be randomly selected via a lottery system to participate in the launch.",
      icon: "/icons/lottery.svg",
    },
    {
      title: "Contribute funds",
      description:
        "Selected users can then contribute their funds to the launchpad project and await the IDO date to receive tokens.",
      icon: "/icons/funds.svg",
    },
  ];

  return (
    <section className="mb-12 bg-gray-900 p-8 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Steps to join launchpad</h2>
        <Button variant="primary" size="medium">
          Get Started
        </Button>
      </div>
      <p className="text-gray-400 mb-8">
        Participate in your first sale in just 4 steps.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg flex flex-col">
            <Image
              src={step.icon}
              alt={step.title}
              width={40}
              height={40}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-400 text-sm flex-grow">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepsToJoin;
