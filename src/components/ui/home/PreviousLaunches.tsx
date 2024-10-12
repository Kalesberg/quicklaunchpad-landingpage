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
  <div className="bg-gray-800 rounded-lg p-5 flex items-center justify-between mb-2">
    <div className="flex items-center gap-6">
    <Image
      src={logo}
      alt={name}
      width={40}
      height={40}
      className="rounded-full"
    />
    <span className="font-semibold">{name}</span>
    </div>
    <div>
      <span className="text-[#C7CAD9] text-xs leading-4">Blockchain</span>
      <div className="flex items-center space-x-2">
        <Image src={logo} alt={blockchain} width={20} height={20} />
        <span>{blockchain}</span>
      </div>
    </div>
    <div>
      <p className="text-xs text-[#C7CAD9] ">Total Raise</p>
      <p>{totalRaise}</p>
    </div>
    <div>
      <p className="text-xs text-[#C7CAD9] ">Participants</p>
      <p>{participants}</p>
    </div>
    <div>
      <p className="text-xs text-[#C7CAD9] ">Initial Price</p>
      <p>{initialPrice}</p>
    </div>
    <Link href="#" className="text-blue-500 hover:text-blue-400">
      Details
    </Link>
  </div>
);

const PreviousLaunches: React.FC = () => {
  const launches: LaunchProps[] = [
    {
      name: "[Launch Name]",
      logo: "/assets/images/project-logo.png",
      blockchain: "Polygon",
      totalRaise: "$200,000",
      participants: 6987,
      initialPrice: "$0.10",
    },
    {
      name: "[Launch Name]",
      logo: "/assets/images/project-logo.png",
      blockchain: "Polygon",
      totalRaise: "$200,000",
      participants: 6987,
      initialPrice: "$0.10",
    },
    {
      name: "[Launch Name]",
      logo: "/assets/images/project-logo.png",
      blockchain: "Polygon",
      totalRaise: "$200,000",
      participants: 6987,
      initialPrice: "$0.10",
    },
    {
      name: "[Launch Name]",
      logo: "/assets/images/project-logo.png",
      blockchain: "Polygon",
      totalRaise: "$200,000",
      participants: 6987,
      initialPrice: "$0.10",
    },
    {
      name: "[Launch Name]",
      logo: "/assets/images/project-logo.png",
      blockchain: "Polygon",
      totalRaise: "$200,000",
      participants: 6987,
      initialPrice: "$0.10",
    },
    // Add more launch objects here...
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl text-center font-bold mb-4">Previous Launches</h2>
      <p className="text-gray-400 text-center mb-6">
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
