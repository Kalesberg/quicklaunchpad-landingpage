"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Button from "components/common/Button";
import {
  TelegramIcon,
  YoutubeIcon,
  DiscordIcon,
  GithubIcon,
  TwitterIcon,
} from "../../../../public/assets/images/social-icons";
import { useRouter } from "next/navigation";
import { getUpcomingProject } from "app/api";
import { Project } from "state/type";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateUpcomingProject } from "../../../reduxStore/rootReducer";

const LaunchNotice: React.FC<{ status?: string }> = ({ status }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { upcomingProject } = useSelector((state: { upcomingProject: Project }) => state || {});

  // const [project, setProject] = useState<Project | null>(null);
  const fetchLaunches = useCallback(async () => {
    try {
      const p = await getUpcomingProject();
      dispatch(updateUpcomingProject(p));
    } catch (err) {
      console.log("[LiveUpcomingLaunches] projects Club error: ", err);
    }
  }, []);
  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  return (
    upcomingProject && <div className="rounded-2xl p-8 mt-[30px] mb-[25px] relative overflow-hidden">
      <div className="relative z-10">
        <div className="relative flex items-center flex-wrap justify-start sm:justify-between md:flex-nowrap gap-1 md:gap-0">
          <div className="flex items-center mb-2">
            <Image
              src="/assets/images/project-logo.png"
              alt="Launch Name"
              width={32}
              height={32}
              className="rounded-full mr-2"
            />
            <h2 className="text-xl font-bold">{upcomingProject.projectName}</h2>
          </div>
          <div className="relative flex items-center text-sm z-10">
            <span
              className={`text-black font-bold px-2 py-1 rounded-md text-xs ${
                upcomingProject.status === "pledging"
                  ? "bg-[#0FC679]"
                  : upcomingProject.status === "upcoming"
                    ? "bg-[#FDD835]"
                    : "bg-[#C684FF]"
              }`}
            >
              {upcomingProject.status === "pledging"
                ? "Open"
                : upcomingProject.status === "upcoming"
                  ? "Upcoming"
                  : "Closed"}
            </span>
          </div>
        </div>

        <div className="flex space-x-5 mt-2 mb-4">
          {upcomingProject.socials?.telegram && (<a href={upcomingProject.socials.telegram} target="_blank">
          <TelegramIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </a>)}
          {upcomingProject.socials?.youtube && (<a href={upcomingProject.socials.youtube} target="_blank">
            <YoutubeIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </a>)}
          {upcomingProject.socials?.discord && (<a href={upcomingProject.socials.discord} target="_blank">
            <DiscordIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </a>)}
          {upcomingProject.socials?.github && (<a href={upcomingProject.socials.github} target="_blank">
            <GithubIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </a>)}
          {upcomingProject.socials?.twitter && (<a href={upcomingProject.socials.twitter} target="_blank">
            <TwitterIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </a>)}
        </div>
        <p className="text-xl font-bold text-white mb-2">
          {upcomingProject.projectName} is now live on QuickSwap Launchpad
        </p>
        <p className="text-sm text-[#EBECF2] mb-4">
          {upcomingProject.description}
        </p>
        <div className="flex flex-col gap-2 justify-start text-[#EBECF2] items-start text-sm mb-4">
          <p>Total raise: ${upcomingProject.totalPoolAmount}</p>
          <p>Initial price: ${upcomingProject.initialPrice}</p>
          <p>Launch date: {upcomingProject.pledgeStartDate}</p>
        </div>
        <Button
          onClick={() =>
            router.push(`/dashboard/launch-info/${upcomingProject.pid}?status=${upcomingProject.status}`)
          }
          variant="secondary"
          size="medium"
          className="min-w-16 h-9 rounded-lg bg-[#EBECF2] px-3"
        >
          <span className="text-[#282D3D] font-bold text-sm leading-6">
            More Details
          </span>
        </Button>
      </div>

      <div
        className="absolute top-0 right-0 bottom-0 w-full z-0 rounded-lg bg-cover bg-[url('/assets/images/launch-bg.png')] before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:bg-gradient-to-r
            before:from-[#000]
            before: from-0%
            before:to-100%
            before:opacity-100
            before:z-[-1]"
      ></div>
    </div>
  );
};

export default LaunchNotice;
