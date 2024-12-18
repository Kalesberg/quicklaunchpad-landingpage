"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { getProjectsByStatus } from "app/api";
import { Project, ProjectStatus, ChainIdToName } from "state/type";
import Button from "components/common/Button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateSelectedProject } from "state/projectSlice";

const LaunchRow: React.FC<Project> = (p: Project) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const blockchain = ChainIdToName[p.chainId] || "";
  return (
    <div className="bg-[#1B1E29] rounded-2xl p-6 flex flex-col gap-[10px] md:gap-0 md:flex-row items-start md:items-center justify-between">
      <div className="max-w-64 md:min-w-64 flex items-center gap-4 md:gap-6">
        <Image
          src="/assets/images/launch-info-img.png"
          alt={p.projectName}
          width={64}
          height={64}
          className="w-9 md:w-16 h-9 md:h-16 rounded-full"
        />
        <span className="text-base leading-6 font-normal text-[#EBECF2]">
          {p.projectName}
        </span>
      </div>
      <div className="w-full flex items-baseline gap-x-2 md:gap-0 md:flex-row md:justify-around px-2 md:px-0">
        <div className="flex-1 md:flex-initial">
          <span className="text-[#C7CAD9] text-xs leading-4">Blockchain</span>
          <div className="flex items-center">
            <Image
              src="/assets/images/chain-avatar.png"
              alt={blockchain}
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="text-base leading-6 font-normal text-[#EBECF2] px-4">
              {blockchain}
            </span>
          </div>
        </div>
        <div className="flex-1 md:flex-initial">
          <p className="text-xs text-[#C7CAD9] ">Total Raise</p>
          <p className="text-base leading-6 font-normal text-[#EBECF2]">
            {p.totalPoolAmount}
          </p>
        </div>
        <div className="hidden md:block">
          <p className="text-xs text-[#C7CAD9] ">Participants</p>
          <p className="text-base leading-6 font-normal text-[#EBECF2]">
            {p.allocation?.participants?.length || 0}
          </p>
        </div>
        <div className="hidden md:block">
          <p className="text-xs text-[#C7CAD9] ">Initial Price</p>
          <p className="text-base leading-6 font-normal text-[#EBECF2]">
            {p.initialPrice}
          </p>
        </div>
      </div>
      <Button
        className="w-full md:w-auto max-h-9 !text-[#448AFF] md:!text-white !bg-[#448AFF14] md:!bg-blue-500 text-sm !font-bold leading-6 hover:text-blue-400 rounded-lg mt-[6px]"
        onClick={() => {
          dispatch(updateSelectedProject(p));
          router.push(`/dashboard/launch-info/${p.pid}?status=${p.status}`);
        }}
      >
        <span className="hidden md:block">Details</span>
        <span className="block md:hidden">More Details</span>
      </Button>
    </div>
  );
};

const PreviousLaunches: React.FC = () => {
  const [launches, setLaunches] = useState<Project[]>([]);
  const [allLaunches, setAllLaunches] = useState<Project[]>([]);

  const fetchLaunches = useCallback(async () => {
    try {
      const projects = await getProjectsByStatus(ProjectStatus.Completed);
      setAllLaunches(projects);
      setLaunches(projects.slice(0, 5));
    } catch (err) {
      console.log("[PreviousLaunches] projects Club error: ", err);
    }
  }, []);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  return (
    <section className="mb-12 px-4">
      <h2 className="text-[32px] text-left md:text-center font-semibold mb-4">
        Previous Launches
      </h2>
      <p className="text-gray-400 text-left md:text-center text-base mb-6">
        Previous launches on QuickSwap Launchpad.
      </p>
      <div className="flex flex-col gap-[18px]">
        {launches.map((launch, index) => (
          <LaunchRow key={index} {...launch} />
        ))}
      </div>
      <div className="text-center mt-6">
        <Button
          className="bg-transparent md:!bg-blue-500 !text-[#448AFF] md:!text-white text-sm !font-bold hover:text-blue-400 hover:bg-transparent m-auto"
          onClick={() => setLaunches(allLaunches)}
        >
          See All Previous Launches
        </Button>
      </div>
    </section>
  );
};

export default PreviousLaunches;
