"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjectsByStatus } from "app/api";
import { Project, ProjectStatus, ChainIdToName } from "state/type";
import { previousProjects } from "state/projects_temp";
import Button from "components/common/Button";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { updateSelectedProject } from "state/projectSlice";

interface LaunchProps {
  pid: string;
  name: string;
  avatar: string;
  logo: string;
  blockchain: string;
  totalRaise: string;
  participants: number;
  initialPrice: string;
}

const LaunchRow: React.FC<Project> = (p: Project) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const blockchain = ChainIdToName[p.chainId] || '';
  return (
  <div className="bg-[#1B1E29] rounded-lg p-5 flex items-center justify-between">
    <div className="flex items-center gap-6">
      <Image
        src="/assets/images/launch-info-img.png"
        alt={p.projectName}
        width={64}
        height={64}
        className="w-16 h-16 rounded-full"
      />
      <span>{p.projectName}</span>
    </div>
    <div>
      <span className="text-[#C7CAD9] text-xs leading-4">Blockchain</span>
      <div className="flex items-center space-x-2">
        <Image src="/assets/images/project-logo.png" alt={blockchain} width={20} height={20} />
        <span>{blockchain}</span>
      </div>
    </div>
    <div>
      <p className="text-xs text-[#C7CAD9] ">Total Raise</p>
      <p>{p.totalPoolAmount}</p>
    </div>
    <div>
      <p className="text-xs text-[#C7CAD9] ">Participants</p>
      <p>{ p.allocation?.participants?.length || 0}</p>
    </div>
    <div>
      <p className="text-xs text-[#C7CAD9] ">Initial Price</p>
      <p>{ p.initialPrice}</p>
    </div>
    <Button
      className="text-blue-500 text-sm font-bold hover:text-blue-400"
      onClick={() =>{
        dispatch(updateSelectedProject(p))
        router.push(`/dashboard/launch-info/${p.pid}?status=${status}`)
      }}
    >
      Details
    </Button>
  </div>)
}

const PreviousLaunches: React.FC = () => {
  const [launches, setLaunches] = useState<Project[]>([]);
  const [allLaunches, setAllLaunches] = useState<Project[]>([]);

  const fetchLaunches = useCallback(async () => {
    try {
      // console.log("fetching completed projects");
      // const response = await getProjectsByStatus(ProjectStatus.Completed);
      // console.log(response)
      const res = previousProjects;
      setAllLaunches(res);
      setLaunches(res.slice(0, 5));
    } catch (err) {
      console.log("[PreviousLaunches] projects Club error: ", err);
    }
  }, []);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  return (
    <section className="mb-12">
      <h2 className="text-[32px] text-center font-semibold mb-4">
        Previous Launches
      </h2>
      <p className="text-gray-400 text-center text-base mb-6">
        Previous launches on QuickSwap Launchpad.
      </p>
      <div className="space-y-2">
        {launches.map((launch, index) => (
          <LaunchRow key={index} {...launch} />
        ))}
      </div>
      <div className="text-center mt-6">
        <Button
          href="#"
          className="text-blue-500 text-sm hover:text-blue-400 font-bold"
          onClick={() => setLaunches(allLaunches)}
        >
          See All Previous Launches
        </Button>
      </div>
    </section>
  );
};

export default PreviousLaunches;
