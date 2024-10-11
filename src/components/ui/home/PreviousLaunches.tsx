import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LaunchProps {
  name: string;
  logo: string;
  blockchain: string;
  totalRaise: string;
  participants: number;
  initialPrice: string;
}

const LaunchRow: React.FC<LaunchProps> = ({
  name,
  logo,
  blockchain,
  totalRaise,
  participants,
  initialPrice,
}) => (
  <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between mb-2">
    <div className="flex items-center space-x-4">
      <Image
        src={logo}
        alt={name}
        width={40}
        height={40}
        className="rounded-full"
      />
      <span className="font-semibold">{name}</span>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Image
          src={`/${blockchain.toLowerCase()}-logo.png`}
          alt={blockchain}
          width={20}
          height={20}
        />
        <span>{blockchain}</span>
      </div>
      <div>
        <p className="text-sm text-gray-400">Total Raise</p>
        <p>{totalRaise}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Participants</p>
        <p>{participants}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Initial Price</p>
        <p>{initialPrice}</p>
      </div>
      <Link href="#" className="text-blue-500 hover:text-blue-400">
        Details
      </Link>
    </div>
  </div>
);

const PreviousLaunches: React.FC = () => {
  const launches: LaunchProps[] = [
    {
      name: "[Launch Name]",
      logo: "/launch-logo.png",
      blockchain: "Polygon",
      totalRaise: "$200,000",
      participants: 6987,
      initialPrice: "$0.10",
    },
    // Add more launch objects here...
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Previous Launches</h2>
      <p className="text-gray-400 mb-6">
        Previous launches on QuickSwap Launchpad.
      </p>
      <div className="space-y-2">
        {launches.map((launch, index) => (
          <LaunchRow key={index} {...launch} />
        ))}
      </div>
      <div className="text-center mt-6">
        <Link href="#" className="text-blue-500 hover:text-blue-400">
          See All Previous Launches
        </Link>
      </div>
    </section>
  );
};

export default PreviousLaunches;
