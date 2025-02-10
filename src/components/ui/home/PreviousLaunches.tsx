"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { getProjectsByStatus } from "app/api";
import { Project, ProjectStatus, ChainIdToName } from "state/type";
import Button from "components/common/Button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedProject } from "state/projectSlice";
import { updatePreviousProjects } from "../../../reduxStore/rootReducer";
import TablePagination2 from "components/common/TablePagination2";
import { getPaginatedList } from "utils/array";
import EmptyImage from "../../../../public/assets/images/stack.png";

const LaunchRow: React.FC<Project> = (p: Project) => {
  const router = useRouter();
  const dispatch = useDispatch();
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
        <div className="flex-1 md:flex-initial flex flex-col h-[50px] justify-between">
          <span className="text-[#C7CAD9] text-xs leading-4">Blockchain</span>
          <div className="flex items-center">
            <Image
              src={
                p?.network?.nativeCurrencyImage
                  ? p?.network?.nativeCurrencyImage
                  : "https://beta.quickswap.exchange/static/media/quickIcon.aa0f5ef593b1a9f00bab835581e318f3.svg"
              }
              alt=""
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="text-base leading-6 font-normal text-[#EBECF2] px-4">
              {p?.network?.networkName}
            </span>
          </div>
        </div>
        <div className="flex-1 md:flex-initial flex flex-col h-[50px] justify-between">
          <p className="text-xs text-[#C7CAD9]">Total Raise</p>
          <p className="text-base leading-6 font-normal text-[#EBECF2]">
            {p.totalPoolAmount}
          </p>
        </div>
        <div className="hidden md:flex flex-col h-[50px] justify-between">
          <p className="text-xs text-[#C7CAD9]">Participants</p>
          <p className="text-base leading-6 font-normal text-[#EBECF2]">
            {p.allocation?.participants?.length || 0}
          </p>
        </div>
        <div className="hidden md:flex flex-col h-[50px] justify-between">
          <p className="text-xs text-[#C7CAD9]">Initial Price</p>
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
  const dispatch = useDispatch();
  const [launches, setLaunches] = useState<Project[]>([]);
  const { previousProjects } = useSelector(
    (state: { previousProjects: any[] }) => state || [],
  );
  const [page, setPage] = useState(1);
  const perPage = 5;

  const fetchLaunches = useCallback(async () => {
    try {
      const projects = await getProjectsByStatus(ProjectStatus.Completed);
      dispatch(updatePreviousProjects(projects));
    } catch (err) {
      console.log("[PreviousLaunches] projects Club error: ", err);
    }
  }, []);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  useEffect(() => {
    const paginatedList = getPaginatedList(previousProjects, page, perPage);
    setLaunches(paginatedList);
    const element = document.getElementById("launches-section");
    if (element) {
      // Fix scrolling issue on mobile
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 30;
      window.scrollTo({ top: offsetPosition });
    }

  }, [previousProjects, page]);

  return (
    <section id="launches-section" className="mb-[88px] px-4">
      <h2 className="text-[32px] text-left md:text-center font-semibold mb-4">
        Previous Launches
      </h2>
      <p className="text-gray-400 text-left md:text-center text-base mb-6">
        Previous launches on QuickSwap Launchpad.
      </p>
      {previousProjects.length > 0 ? (<>
        <div className="flex flex-col gap-[18px]">
          {launches.map((launch, index) => (
            <LaunchRow key={index} {...launch} />
          ))}
        </div>
        <TablePagination2
          count={previousProjects.length}
          page={page}
          perPage={perPage}
          setPage={setPage}
        ></TablePagination2>
      </>) : (
        <div className="mx-6 my-24 flex flex-col items-center justify-center">
          <Image
            src={EmptyImage.src}
            alt="empty"
            className=""
            width={128}
            height={128}
          />
        </div>
      )}
    </section>
  );
};

export default PreviousLaunches;
