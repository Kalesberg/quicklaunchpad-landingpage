"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Button from "components/common/Button";
import { useRouter } from "next/navigation";

import { getProjectsByStatus } from "app/api";
import { Project, ProjectStatus, ChainIdToName } from "state/type";

const LaunchCard: React.FC<Project> = (p: Project) => {
  const router = useRouter();
  return (
    <div className="bg-[#1B1E29] rounded-2xl overflow-hidden">
      <div className="relative h-48 py-4">
        <Image
          src="/assets/images/launch-image.png"
          alt={p.projectName}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-t-2xl"
        />
        <span
          className={`absolute top-4 right-4 px-2 py-1 rounded-md text-xs ${
            p.status === "upcoming"
              ? "bg-[#0FC679]"
              : p.status === "pledging"
                ? "bg-blue-500"
                : "bg-[#FDD835]"
          }`}
        >
          {p.status === "upcoming"
            ? `${p.reminderLaunchTime} left`
            : p.status === "pledging"
              ? `In ${p.reminderDay} days`
              : "TBA"}
        </span>
      </div>

      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <div className="flex justify-between items-center">
          <div className="flex items-center mb-2">
            <Image
              src="/assets/images/project-logo.png"
              alt={p.projectName}
              width={24}
              height={24}
              className="rounded-full mr-2"
            />
            <h3 className="text-xl font-semibold">{p.projectName}</h3>
          </div>
          <Image
            src="/assets/images/chain-avatar.png"
            alt="chain avatar"
            width={24}
            height={24}
          />
        </div>

        <p className="text-sm text-[#EBECF2] mb-4">{p.description}</p>

        <div className="grid grid-cols-1 gap-2 text-sm mb-4">
          <div className="w-full flex justify-between items-center gap-3">
            <p className="text-[#C7CAD9]">Total raise</p>
            <p>{p.totalPoolAmount}</p>
          </div>
          <div className="w-full flex justify-between items-center gap-3">
            <p className="text-[#C7CAD9]">Initial price</p>
            <p>{p.initialPrice}</p>
          </div>
          <div className="w-full flex justify-between items-center gap-3">
            <p className="text-[#C7CAD9]">Launch date</p>
            <p>{p.pledgeStartDate}</p>
          </div>
        </div>
        <div className="flex-grow"></div>
        <Button
          onClick={() =>
            router.push(`/dashboard/launch-info/${p.pid}?status=${p.status}`)
          }
          variant={p.status === "upcoming" ? "primary" : "secondary"}
          size="medium"
          fullWidth
        >
          {p.status === "upcoming" ? "Participate Now" : "More Details"}
        </Button>
      </div>
    </div>
  );
};

const LiveUpcomingLaunches: React.FC = () => {
  const [launches, setLaunches] = useState<Project[]>([]);
  const fetchLaunches = useCallback(async () => {
    try {
      const projects = await getProjectsByStatus(ProjectStatus.Live);
      setLaunches(projects)
    } catch (err) {
      console.log("[LiveUpcomingLaunches] projects Club error: ", err);
    }
  }, []);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  // const launches: LaunchProps[] = [
  //   {
  //     image: "/assets/images/launch-image.png",
  //     name: "Launch Name",
  //     description:
  //       "The Most Specialized Blockchain Network for AI Data Monetization & GPU Training",
  //     totalRaise: "$150,000",
  //     initialPrice: "$0.10",
  //     launchDate: "13 Mar 2024",
  //     status: "live",
  //   },
  //   {
  //     image: "/assets/images/launch-image-1.png",
  //     name: "Launch Name",
  //     description:
  //       "The Most Specialized Blockchain Network for AI Data Monetization & GPU Training",
  //     totalRaise: "$150,000",
  //     initialPrice: "$0.10",
  //     launchDate: "13 Mar 2024",
  //     status: "upcoming",
  //   },
  //   {
  //     image: "/assets/images/launch-image-2.png",
  //     name: "Launch Name",
  //     description: "Web3 skill-based gaming project",
  //     totalRaise: "TBA",
  //     initialPrice: "TBA",
  //     launchDate: "TBA",
  //     status: "tba",
  //   },
  // ];

  return (
    <section className="mb-12">
      <h2 className="text-[32px] text-center font-semibold mb-5">
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
