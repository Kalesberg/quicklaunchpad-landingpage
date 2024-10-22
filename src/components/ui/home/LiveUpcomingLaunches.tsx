import React from "react";
import Image from "next/image";
import Button from "components/common/Button";

interface LaunchProps {
  image: string;
  name: string;
  description: string;
  totalRaise: string;
  initialPrice: string;
  launchDate: string;
  status: "live" | "upcoming" | "tba";
}

const LaunchCard: React.FC<LaunchProps> = ({
  image,
  name,
  description,
  totalRaise,
  initialPrice,
  launchDate,
  status,
}) => (
  <div className="bg-[#1B1E29] rounded-2xl overflow-hidden">
    <div className="relative h-48 py-4">
      <Image
        src={image}
        alt={name}
        fill
        style={{objectFit:"cover"}}
        className="rounded-t-2xl"
      />
      <span
        className={`absolute top-4 right-4 px-2 py-1 rounded-md text-xs ${
          status === "live"
            ? "bg-green-500"
            : status === "upcoming"
            ? "bg-blue-500"
            : "bg-yellow-500"
        }`}
      >
        {status === "live"
          ? "00:25:78 left"
          : status === "upcoming"
          ? "In 2 days"
          : "TBA"}
      </span>
    </div>

    <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
      <div className="flex justify-between items-center">
        <div className="flex items-center mb-2">
          <Image
            src="/assets/images/project-logo.png"
            alt={name}
            width={24}
            height={24}
            className="rounded-full mr-2"
          />
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
        <Image
          src="/assets/images/chain-avatar.png"
          alt="chain avatar"
          width={24}
          height={24}
        />
      </div>

      <p className="text-sm text-[#EBECF2] mb-4">{description}</p>

      <div className="grid grid-cols-1 gap-2 text-sm mb-4">
        <div className="w-full flex justify-between items-center gap-3">
          <p className="text-[#C7CAD9]">Total raise</p>
          <p>{totalRaise}</p>
        </div>
        <div className="w-full flex justify-between items-center gap-3">
          <p className="text-[#C7CAD9]">Initial price</p>
          <p>{initialPrice}</p>
        </div>
        <div className="w-full flex justify-between items-center gap-3">
          <p className="text-[#C7CAD9]">Launch date</p>
          <p>{launchDate}</p>
        </div>
      </div>
      <div className="flex-grow"></div>
      <Button
        variant={status === "live" ? "primary" : "secondary"}
        size="medium"
        fullWidth
      >
        {status === "live" ? "Participate Now" : "More Details"}
      </Button>
    </div>
  </div>
);

const LiveUpcomingLaunches: React.FC = () => {
  const launches: LaunchProps[] = [
    {
      image: "/assets/images/launch-image.png",
      name: "Launch Name",
      description:
        "The Most Specialized Blockchain Network for AI Data Monetization & GPU Training",
      totalRaise: "$150,000",
      initialPrice: "$0.10",
      launchDate: "13 Mar 2024",
      status: "live",
    },
    {
      image: "/assets/images/launch-image-1.png",
      name: "Launch Name",
      description:
        "The Most Specialized Blockchain Network for AI Data Monetization & GPU Training",
      totalRaise: "$150,000",
      initialPrice: "$0.10",
      launchDate: "13 Mar 2024",
      status: "upcoming",
    },
    {
      image: "/assets/images/launch-image-2.png",
      name: "Launch Name",
      description: "Web3 skill-based gaming project",
      totalRaise: "TBA",
      initialPrice: "TBA",
      launchDate: "TBA",
      status: "tba",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-[32px] text-center font-bold mb-5">
        Live & Upcoming Launches
      </h2>
      <p className="text-[#C7CAD9] text-center mb-10">
        Get early access to the hottest new projects.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {launches.map((launch, index) => (
          <LaunchCard key={index} {...launch} />
        ))}
      </div>
    </section>
  );
};

export default LiveUpcomingLaunches;
