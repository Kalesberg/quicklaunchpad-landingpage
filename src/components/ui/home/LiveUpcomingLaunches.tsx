"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Button from "components/common/Button";
import { useRouter } from "next/navigation";

import { getProjectsByStatus } from "app/api";
import { Project, ProStatus, User, ProjectStatus } from "state/type";
import { getReminderTimeStampString, getReminderDate } from "utils/time";
import { getProjectStatus } from "utils/project";
import { useSelector, useDispatch } from "react-redux";
import { updateLiveProjects } from "../../../reduxStore/rootReducer";

const LaunchCard: React.FC<{p: Project, user: User}> = ({p, user}) => {
  
  const router = useRouter();
  const [proStatus, setProStatus] = useState<ProStatus>(ProStatus.TBA);

  useEffect(() => {
    if (!p) {
      return;
    }
    const status = getProjectStatus(p, user?.uid);
    setProStatus(status);
  }, [user, p]);

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
            (proStatus === "pledging" || proStatus === "participated")
              ? "bg-[#0FC679]"
              : (proStatus !== "tba")
                ? "bg-blue-500"
                : "bg-[#FDD835]"
          }`}
        >
          { (proStatus === "pledging" || proStatus === "participated")
            ? `${p.reminderLaunchTime} left`
            : proStatus === "upcoming"
              ? `In ${p.reminderDay} days` :
              (proStatus !== "tba") ? "Live"
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
          variant={(proStatus === "pledging" || proStatus === "win") ? "primary" : "secondary"}
          size="medium"
          fullWidth
        >
          {proStatus === "pledging" ? "Participate Now" : proStatus === "win" ? "Contribute" : "More Details"}
        </Button>
      </div>
    </div>
  );
};

const LiveUpcomingLaunches: React.FC = () => {
  const dispatch = useDispatch();
  const [startTimer, setStartTimer] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { liveProjects } = useSelector((state: { liveProjects: any[] }) => state || []);
  const { user } = useSelector((state: { user: User }) => state || null);

  const fetchLaunches = useCallback(async () => {
    try {
      const projects = await getProjectsByStatus(ProjectStatus.Live);
      dispatch(updateLiveProjects(projects));
      setStartTimer(true);
    } catch (err) {
      console.log("[LiveUpcomingLaunches] projects Club error: ", err);
    }
  }, []);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  useEffect(() => {
    if (!startTimer || timerRef.current) {
      return;
    }
    timerRef.current = setInterval(() => {
      const updated = liveProjects.map(item => {
        return {
          ...item,
          reminderLaunchTime: getReminderTimeStampString(item.pledgeEndDate),
          reminderDay: getReminderDate(item.pledgeStartDate)       
        }
      });
      dispatch(updateLiveProjects(updated));
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  return (
    <section className="mb-12">
      <h2 className="text-[32px] text-center font-semibold mb-5">
        Live & Upcoming Launches
      </h2>
      <p className="text-[#C7CAD9] text-center mb-10">
        Get early access to the hottest new projects.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveProjects.map((launch, index) => (
          <LaunchCard key={index} p={launch} user={user} />
        ))}
      </div>
    </section>
  );
};

export default LiveUpcomingLaunches;
