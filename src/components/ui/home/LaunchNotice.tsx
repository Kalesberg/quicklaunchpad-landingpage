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

const LaunchNotice: React.FC<{ status?: string }> = ({ status }) => {
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const fetchLaunches = useCallback(async () => {
    try {
      const p = await getUpcomingProject();
      setProject(p)
    } catch (err) {
      console.log("[LiveUpcomingLaunches] projects Club error: ", err);
    }
  }, []);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);


  return (
    project && <div className="rounded-2xl p-8 mt-[30px] mb-[25px] relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center mb-2">
          <Image
            src="/assets/images/project-logo.png"
            alt="Launch Name"
            width={32}
            height={32}
            className="rounded-full mr-2"
          />
          <h2 className="text-xl font-bold">{project.projectName}</h2>
        </div>

        <div className="flex space-x-5 mt-2 mb-4">
          {project.socials?.telegram && (<a href={project.socials.telegram} target="_blank">
            <TelegramIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </a>)}
          {project.socials?.youtube && (<a href={project.socials.youtube} target="_blank">
            <YoutubeIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </a>)}
          {project.socials?.discord && (<a href={project.socials.discord} target="_blank">
            <DiscordIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </a>)}
          {project.socials?.github && (<a href={project.socials.github} target="_blank">
            <GithubIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </a>)}
          {project.socials?.twitter && (<a href={project.socials.twitter} target="_blank">
            <TwitterIcon className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </a>)}
        </div>
        <p className="text-xl font-bold text-white mb-2">
          {project.projectName} is now live on QuickSwap Launchpad
        </p>

        <p className="text-sm text-[#EBECF2] mb-4">
          {project.description}
        </p>

        <div className="flex flex-col gap-2 justify-start text-[#EBECF2] items-start text-sm mb-4">
          <p>Total raise: ${project.totalPoolAmount}</p>
          <p>Initial price: ${project.initialPrice}</p>
          <p>Launch date: {project.pledgeStartDate}</p>
        </div>

        <Button
          onClick={() =>
            router.push(`/dashboard/launch-info/${project.pid}?status=${project.status}`)
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

      <div className="absolute top-8 right-8 flex justify-between items-center text-sm z-10">
        <span
          className={`text-black font-bold px-2 py-1 rounded-md text-xs ${
            project.status === "pledging"
              ? "bg-[#0FC679]"
              : project.status === "upcoming"
                ? "bg-[#FDD835]"
                : "bg-[#C684FF]"
          }`}
        >
          {project.status === "pledging"
            ? "Open"
            : project.status === "upcoming"
              ? "Upcoming"
              : "Closed"}
        </span>
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
