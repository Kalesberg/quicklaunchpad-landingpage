"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import {
  DiscordIcon,
  GithubIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../../../../../public/assets/images/social-icons";
import Button from "components/common/Button";
import clsx from "clsx";
import { getProjectsById, getProjectsContent } from "app/api";
import { useSearchParams, useParams } from "next/navigation";
import { ProjectStatus } from "state/type";
import { getReminderTimeStampString, getReminderDate } from "utils/time";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import SubmitApplicationModal from "components/common/SubmitApplicationModal";
import ContributionModal from "components/common/ContributionModal";

export default function LaunchInfoDetailPage() {
  // const { project } = useSelector((state: { project: Project }) => state || {});
  const { open } = useAppKit();
  const { address } = useAppKitAccount();

  const [project, setProject] = useState<any>(null);
  const [openSubmitApplicationModal, setOpenSubmitApplicationModal] =
    useState(false);
  const [openContributionModal, setOpenContributionModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("about");
  const tabs = [{ label: "About the Launch", value: "about" }];
  // .concat(
  //   status === "upcoming"
  //     ? []
  //     : [
  //         { label: "My Contribution", value: "contribution" },
  //         { label: "Claim", value: "claim" },
  //       ],
  // );

  const searchParams = useSearchParams();
  const params = useParams();

  const status = searchParams.get("status") || "";
  const projectId = params["slug"] || "";

  const [startTimer, setStartTimer] = useState(false);

  const [content, setConent] = useState<any>(null);

  const fetchProjectById = useCallback(async () => {
    try {
      const res = await getProjectsById(projectId as string, status);
      if (res.status === ProjectStatus.Pledging) {
        setStartTimer(true);
      }
      setProject(res);
      const res1 = await getProjectsContent(res.contentUrl);
      setConent(res1?.data?.attributes?.content);
    } catch (err) {
      console.log("[PreviousLaunches] projects Club error: ", err);
    }
  }, []);

  useEffect(() => {
    fetchProjectById();
  }, [fetchProjectById]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!startTimer || timerRef.current) {
      return;
    }
    timerRef.current = setInterval(() => {
      const updated = {
        ...project,
        reminderLaunchTimeBig: getReminderTimeStampString(
          project.pledgeEndDate,
          true
        ),
        reminderDay: getReminderDate(project.pledgeStartDate),
      };
      setProject(updated);
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  const handleParticipate = () => {
    setOpenSubmitApplicationModal(!openSubmitApplicationModal);
  };

  const handleContribute = () => {
    setOpenContributionModal(!openContributionModal);
  };

  return (
    project && (
      <>
        <div className="container-dashboard mx-auto px-4">
          <Link href={"/dashboard"} className="flex items-center mb-6">
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Back to Launchpads
          </Link>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-[70%] flex-grow-[2] flex-shrink">
              <div className="bg-[#1B1E29] p-5 rounded-xl mb-5">
                <div className="w-full overflow-hidden md:flex md:gap-5">
                  <div className="relative max-w-16 h-fit md:min-w-[128px] md:min-h-[128px] float-left md:float-none mr-4 md:mr-0">
                    <Image
                      src={"/assets/images/launch-info-img.png"}
                      alt="Logo"
                      width={128}
                      height={128}
                      className="min-w-16 min-h-16 md:min-w-[128px] md:min-h-[128px] rounded-full"
                    />
                    <Image
                      src={"/MATIC.png"}
                      alt="Logo"
                      width={32}
                      height={32}
                      className="absolute bottom-0 right-0 rounded-full hidden md:block"
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <h1 className="text-[#EBECF2] text-xl md:text-[32px] font-bold leading-6 md:leading-[48px] mb-3 md:mb-0">
                        {project.projectName}
                      </h1>
                      <div className="flex justify-start md:justify-between gap-2">
                        <span
                          className={`max-w-20 md:max-w-full md:min-w-24 h-[24px] px-2 py-1 rounded-md text-xs text-center font-bold ${
                            project.status === "pledging"
                              ? "bg-[#0FC67929] text-[#0FC679]"
                              : project.status === "upcoming"
                                ? "bg-[#FDD83529] text-[#FDD835]"
                                : "bg-[#8E33FF29] text-[#C684FF]"
                          }`}
                        >
                          {project.status === "pledging"
                            ? "Open"
                            : project.status === "upcoming"
                              ? "Upcoming"
                              : "Closed"}
                        </span>
                        <span
                          className={`min-w-24 h-[24px] px-2 py-1 rounded-md text-xs text-center font-bold ${
                            !!project.kycProvider
                              ? "bg-[#FF5C5C29] text-[#FF5C5C]"
                              : ""
                          }`}
                        >
                          {!!project.kycProvider ? "KYC Required" : ""}
                        </span>
                      </div>
                    </div>
                    <p className="max-w-[500px] w-full md:w-3/4 leading-6 text-sm md:text-base font-medium text-[#EBECF2] md:whitespace-nowrap md:overflow-hidden md:text-ellipsis mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <Link
                        href={project.websiteUrl}
                        className="max-w-[80px] md:max-w-full md:min-w-[80px] h-6 md:h-9 bg-[#448AFF14] text-[#448AFF] text-center text-xs md:text-sm font-bold leading-6 md:leading-9 rounded-lg px-2 md:px-3"
                      >
                        Website
                      </Link>
                      <Link
                        href={project.whitepaperUrl}
                        className="max-w-[80px] md:max-w-full md:min-w-[80px] h-6 md:h-9 bg-[#448AFF14] text-[#448AFF] text-center text-xs md:text-sm font-bold leading-6 md:leading-9 rounded-lg px-2 md:px-3"
                      >
                        Whitepaper
                      </Link>
                      <Link
                        href={project.blogUrl}
                        className="max-w-[80px] md:max-w-full md:min-w-[80px] h-6 md:h-9 bg-[#448AFF14] text-[#448AFF] text-center text-xs md:text-sm font-bold leading-6 md:leading-9 rounded-lg px-2 md:px-3"
                      >
                        Blog
                      </Link>
                    </div>
                    <div className="flex space-x-5 mt-2 mb-4">
                      {project.socials?.telegram && (
                        <Link
                          href={project.socials.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <TelegramIcon className="w-5 md:w-6 h-5 md:h-6 text-gray-400 hover:text-white cursor-pointer" />
                        </Link>
                      )}
                      {project.socials?.youtube && (
                        <Link
                          href={project.socials.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <YoutubeIcon className="w-5 md:w-6 h-5 md:h-6 text-gray-400 hover:text-white cursor-pointer" />
                        </Link>
                      )}
                      {project.socials?.discord && (
                        <Link
                          href={project.socials.discord}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <DiscordIcon className="w-5 md:w-6 h-5 md:h-6 text-gray-400 hover:text-white cursor-pointer" />
                        </Link>
                      )}
                      {project.socials?.github && (
                        <Link
                          href={project.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GithubIcon className="w-5 md:w-6 h-5 md:h-6 text-gray-400 hover:text-white cursor-pointer" />
                        </Link>
                      )}
                      {project.socials?.twitter && (
                        <Link
                          href={project.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <TwitterIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-auto-fit-100 lg:grid-cols-4 gap-2 md:gap-4">
                  <div className="bg-[#282D3D] min-w-0 md:min-w-[158px] h-[106px] p-4 rounded-2xl flex flex-col">
                    <h3 className="text-[#EBECF2] text-xs md:text-sm font-semibold mb-2">
                      Total Raise
                    </h3>
                    <p className="text-[#EBECF2] text-xl md:text-2xl font-bold flex-grow">
                      ${project.totalPoolAmount}
                    </p>
                  </div>
                  <div className="bg-[#282D3D] min-w-0 md:min-w-[158px] h-[106px] p-4 rounded-2xl flex flex-col">
                    <h3 className="text-[#EBECF2] text-xs md:text-sm font-semibold mb-2">
                      Token Price
                    </h3>
                    <p className="text-[#EBECF2] text-xl md:text-2xl font-bold flex-grow">
                      ${project.initialPrice}
                    </p>
                  </div>
                  <div className="bg-[#282D3D] min-w-0 md:min-w-[158px] h-[106px] p-4 rounded-2xl flex flex-col">
                    <h3 className="text-[#EBECF2] text-xs md:text-sm font-semibold mb-2">
                      Number of Winners
                    </h3>
                    <p className="text-[#EBECF2] text-xl md:text-2xl font-bold flex-grow">
                      ${project.numberLotteryWinners || 0}
                    </p>
                  </div>
                  <div className="bg-[#282D3D] min-w-0 md:min-w-[158px] h-[106px] p-4 rounded-2xl flex flex-col">
                    <h3 className="text-[#EBECF2] text-xs md:text-sm font-semibold mb-2">
                      Allocation
                    </h3>
                    <p className="text-[#EBECF2] text-xl md:text-2xl font-bold flex-grow">
                      ${project.maxUserPledgeSize}
                    </p>
                  </div>
                </div>
              </div>
              {status === "upcoming" && !address && (
                <div className="bg-[#00B8D933] flex justify-between items-center gap-4 rounded-2xl p-6 mb-5">
                  <p className="flex-1 md:flex-none text-[#CAFDF5] text-lg font-bold leading-7">
                    Connect your wallet to participate in QuickSwap launches
                  </p>
                  <Button
                    variant="primary"
                    className="flex-1 md:flex-none bg-[#00B8D914] text-[#61F3F3] !text-sm text-center !font-bold leading-6 rounded-lg px-3 hover:bg-[#00B8D966]"
                    onClick={() => open()}
                  >
                    Connect Wallet
                  </Button>
                </div>
              )}
              <div className="bg-[#1B1E29] w-full rounded-2xl">
                <div className="relative min-h-12 flex justify-start px-6 gap-8 text-sm after:content-[''] after:w-full after:h-[2px] after:absolute after:bottom-0 after:left-0 after:bg-[#919EAB14]">
                  {tabs.map((t: any) => (
                    <button
                      key={t.value}
                      className={clsx({
                        ["transition-all duration-100 ease-in-out"]: true,
                        ["text-[#C7CAD9] text-xs md:text-sm leading-6 font-semibold"]:
                          selectedTab !== t.value,
                        ["text-[#EBECF2] text-xs md:text-sm leading-6 font-semibold border-b-2 border-[#EBECF2]"]:
                          selectedTab === t.value,
                      })}
                      onClick={() => setSelectedTab(t.value)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="p-6 flex flex-col w-full justify-start items-start gap-2">
                  {selectedTab === "about" && (
                    <div className="w-full text-[#EBECF2] text-sm leading-6">
                      {content &&
                        content.map((c: any) =>
                          c.type === "paragraph" ? (
                            <p className="pb-2 break-words">
                              {c.children.map((ch: any) =>
                                ch.type === "text" ? (
                                  ch.bold ? (
                                    <strong>{ch.text}</strong>
                                  ) : (
                                    <span>{ch.text}</span>
                                  )
                                ) : ch.type === "link" ? (
                                  <a
                                    href={ch.url}
                                    target="_blank"
                                    className="text-[#448AFF]"
                                  >
                                    {ch.url}
                                  </a>
                                ) : null
                              )}
                            </p>
                          ) : c.type === "image" ? (
                            <Image
                              src={c.image.url}
                              alt={c.image.alternativeText}
                              width={c.image.width}
                              height={c.image.height}
                              className="mx-auto pb-2"
                            />
                          ) : null
                        )}
                    </div>
                  )}
                  {selectedTab === "contribution" && (
                    <div className="min-w-0 md:min-w-[440px] w-full rounded-xl mx-auto px-6 text-center text-[#696C80]">
                      <Image
                        src="/assets/images/ic-mail.png"
                        alt="ic-mail"
                        width={160}
                        height={160}
                        className="mx-auto"
                      />
                      <h2 className="text-lg leading-7 font-bold">
                        Contributions Have Not Started For This Launch
                      </h2>
                      <p className="text-sm leading-6">
                        Contributions will be available to those who win the
                        lottery. If you would like to participate, you must
                        complete KYC.
                      </p>
                      <Button
                        variant="primary"
                        size="small"
                        className="!h-9 mx-auto mt-4"
                      >
                        Check your KYC status
                      </Button>
                    </div>
                  )}
                  {selectedTab === "claim" && (
                    <div className="min-w-0 md:min-w-[440px] w-full rounded-xl mx-auto px-6 text-center text-[#696C80]">
                      <Image
                        src="/assets/images/ic-content.png"
                        alt="ic-mail"
                        width={160}
                        height={160}
                        className="mx-auto"
                      />
                      <h2 className="text-lg leading-7 font-bold">
                        Claim Isn&apos;t Available At The Moment
                      </h2>
                      <p className="text-sm leading-6">
                        Tokens are not claimable yet. If you would like to
                        participate, you must complete KYC.
                      </p>
                      <Button
                        variant="primary"
                        size="small"
                        className="!h-9 mx-auto mt-4"
                      >
                        Check your KYC status
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-[30%] h-full bg-[#1B1E29] py-6 rounded-xl mb-5 md:mb-0">
              {status === "upcoming" ? (
                <>
                  <h2 className="text-[#EBECF2] text-2xl leading-9 text-center font-bold border-b-2 border-[#919EAB14] pb-4">
                    Comming Soon
                  </h2>
                  <div className="flex flex-col px-6 pt-4">
                    <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['1'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                      <h3 className="text-[#696C80] text-sm md:text-base leading-6 font-semibold">
                        Whitelist
                      </h3>
                      <p className="text-[#696C80] text-xs leading-4">TBA</p>
                    </div>
                    <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['2'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                      <h3 className="text-[#696C80] text-sm md:text-base leading-6 font-semibold">
                        Lottery
                      </h3>
                    </div>
                    <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['3'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                      <h3 className="text-[#696C80] text-sm md:text-base leading-6 font-semibold">
                        Contribution
                      </h3>
                    </div>
                    <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['4'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                      <h3 className="text-[#696C80] text-sm md:text-base leading-6 font-semibold">
                        Completed
                      </h3>
                    </div>
                    <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 after:content-['5'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                      <h3 className="text-[#696C80] text-sm md:text-base leading-6 font-semibold">
                        Claim
                      </h3>
                    </div>
                  </div>
                </>
              ) : status === "pledging" ? (
                <>
                  <div className="border-b-2 border-[#919EAB14] pb-4">
                    <h2 className="text-[#EBECF2] text-xl md:text-2xl leading-9 text-center font-bold">
                      Whitelist Is Open
                    </h2>
                    <p className="text-[#C7CAD9] text-center">
                      Participation time remaining
                    </p>
                    <div className="w-full flex items-center justify-center gap-2">
                      <span className="text-[#EBECF2] text-[32px] font-bold">
                        {project.reminderLaunchTimeBig}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col px-6 pt-4">
                    <div className="mb-2 relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['1'] after:absolute after:top-1/4 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#448AFF] after:text-[#EBECF2] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                      <h3 className="text-[#EBECF2] text-sm md:text-base leading-6 font-semibold">
                        Whitelist
                      </h3>
                      <p className="text-[#C7CAD9] text-xs leading-4">
                        Application period:
                      </p>
                      <p className="text-[#C7CAD9] text-xs leading-4 font-semibold">
                        {project.pledgeStartDate} – {project.pledgeEndDate}
                      </p>
                      <Button
                        variant="primary"
                        className="!min-w-16 !h-9 capitalize"
                        onClick={() =>
                          !address ? open() : handleParticipate()
                        }
                      >
                        {!address
                          ? "Connect wallet to participate"
                          : "Participate now"}
                      </Button>
                    </div>
                    <div className="mb-2 relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['2'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                      <h3 className="text-[#696C80] text-sm md:text-base leading-6 font-semibold">
                        Lottery
                      </h3>
                      <p className="text-[#696C80] text-xs leading-4">
                        Winners will be announced {project.pledgeEndDate}
                      </p>
                    </div>
                    <div className="mb-2 relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['3'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                      <h3 className="text-[#696C80] text-sm md:text-base leading-6 font-semibold">
                        Contribution
                      </h3>
                      <p className="text-[#696C80] text-xs leading-4">
                        Expires on 18 Mar 04:00 AM
                      </p>
                    </div>
                    <div className="mb-2 relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['4'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                      <h3 className="text-[#696C80] text-sm md:text-base leading-6 font-semibold">
                        Completed
                      </h3>
                    </div>
                    <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 after:content-['5'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                      <h3 className="text-[#696C80] text-base leading-6 font-semibold">
                        Claim
                      </h3>
                    </div>
                  </div>
                </>
              ) : status === "contribute" ? (
                <>
                  <div className="border-b-2 border-[#919EAB14] pb-4">
                    <h2 className="text-[#EBECF2] text-xl md:text-2xl leading-9 text-center font-bold">
                      Contributions Are Open
                    </h2>
                    <p className="text-[#C7CAD9] text-center">
                      Time remaining to send funds
                    </p>
                    <div className="w-full flex items-center justify-center gap-2">
                      <span className="text-[#EBECF2] text-[32px] font-bold">
                        {project.reminderLaunchTimeBig}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col px-6 pt-4">
                    <div className="relative left-7 w-fit min-h-12 px-1 py-2 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-[18px] before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80]">
                      <Image
                        src="/assets/icons/ic-checkmark.svg"
                        alt="icon"
                        width={24}
                        height={24}
                        className="block absolute top-1/2 -left-[30px] -translate-y-1/2"
                      />
                      <h3 className="text-[#EBECF2] text-sm md:text-base leading-6 font-semibold">
                        Whitelist
                      </h3>
                      <p className="text-[#C7CAD9] text-xs leading-4">
                        You have been successfully whitelisted
                      </p>
                    </div>
                    <div className="relative left-7 w-fit min-h-12 px-1 py-2 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-[18px] before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80]">
                      <Image
                        src="/assets/icons/ic-checkmark.svg"
                        alt="icon"
                        width={24}
                        height={24}
                        className="block absolute top-1/2 -left-[30px] -translate-y-1/2"
                      />
                      <h3 className="text-[#EBECF2] text-sm md:text-base leading-6 font-semibold">
                        Lottery
                      </h3>
                      <p className="text-[#C7CAD9] text-xs leading-4">
                        Congratulations, your entry was randomly selected to
                        participate in this launch!
                      </p>
                    </div>
                    <div className="mb-2 relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['3'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#448AFF] after:text-[#EBECF2] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                      <h3 className="text-[#EBECF2] text-sm md:text-base leading-6 font-semibold">
                        Contribution
                      </h3>
                      <p className="text-[#C7CAD9] text-xs leading-4">
                        Contribution period:
                      </p>
                      <p className="text-[#C7CAD9] text-xs font-semibold leading-4">
                        17 Mar 2024 04:00 AM – 18 Mar 2024 04:00 AM
                      </p>
                      <Button
                        variant="primary"
                        className="!min-w-16 !h-9 capitalize"
                        onClick={() => handleContribute()}
                      >
                        Contribute
                      </Button>
                    </div>
                    <div className="mb-2 relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['4'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                      <h3 className="text-[#696C80] text-sm md:text-base leading-6 font-semibold">
                        Completed
                      </h3>
                    </div>
                    <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 after:content-['5'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                      <h3 className="text-[#696C80] text-base leading-6 font-semibold">
                        Claim
                      </h3>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-b-2 border-[#919EAB14] pb-4">
                    <h2 className="text-[#EBECF2] text-xl md:text-2xl leading-9 text-center font-bold">
                      Launch Timeline
                    </h2>
                  </div>
                  <div className="flex flex-col px-6 pt-4">
                    <div className="relative left-7 w-fit min-h-12 px-1 py-2 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-[18px] before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80]">
                      <Image
                        src="/assets/icons/ic-checkmark.svg"
                        alt="icon"
                        width={24}
                        height={24}
                        className="block absolute top-1/2 -left-[30px] -translate-y-1/2"
                      />
                      <h3 className="text-[#EBECF2] text-sm md:text-base leading-6 font-semibold">
                        Whitelist
                      </h3>
                      <p className="text-[#C7CAD9] text-xs leading-4">
                        Application period:
                      </p>
                      <p className="text-[#C7CAD9] text-xs leading-4 font-semibold">
                        {project.pledgeStartDate} – {project.pledgeEndDate}
                      </p>
                    </div>
                    <div className="relative left-7 w-fit min-h-12 px-1 py-2 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-[18px] before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80]">
                      <Image
                        src="/assets/icons/ic-checkmark.svg"
                        alt="icon"
                        width={24}
                        height={24}
                        className="block absolute top-1/2 -left-[30px] -translate-y-1/2"
                      />
                      <h3 className="text-[#EBECF2] text-sm md:text-base leading-6 font-semibold">
                        Lottery
                      </h3>
                      <p className="text-[#C7CAD9] text-xs leading-4">
                        Winners have been announced on {project.pledgeEndDate}
                      </p>
                    </div>
                    <div className="relative left-7 w-fit min-h-12 px-1 py-2 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-[18px] before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80]">
                      <Image
                        src="/assets/icons/ic-checkmark.svg"
                        alt="icon"
                        width={24}
                        height={24}
                        className="block absolute top-1/2 -left-[30px] -translate-y-1/2"
                      />
                      <h3 className="text-[#EBECF2] text-sm md:text-base leading-6 font-semibold">
                        Contribution
                      </h3>
                      <p className="text-[#cCAD9] text-xs leading-4">
                        Expires on {project.contributionEndDate}
                      </p>
                    </div>
                    <div className="relative left-7 w-fit min-h-12 px-1 py-2 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-[18px] before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80]">
                      <Image
                        src="/assets/icons/ic-checkmark.svg"
                        alt="icon"
                        width={24}
                        height={24}
                        className="block absolute top-1/2 -left-[30px] -translate-y-1/2"
                      />
                      <h3 className="text-[#EBECF2] text-sm md:text-base leading-6 font-semibold">
                        Completed
                      </h3>
                    </div>
                    <div className="relative left-7 w-fit min-h-12 px-1 py-2 flex flex-col justify-center gap-2">
                      <Image
                        src="/assets/icons/ic-checkmark.svg"
                        alt="icon"
                        width={24}
                        height={24}
                        className="block absolute top-1/2 -left-[30px] -translate-y-1/2"
                      />
                      <h3 className="text-[#EBECF2] text-sm md:text-base leading-6 font-semibold">
                        Claim
                      </h3>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <SubmitApplicationModal
          openModal={openSubmitApplicationModal}
          setOpenModal={setOpenSubmitApplicationModal}
        />
        <ContributionModal
          openModal={openContributionModal}
          setOpenModal={setOpenContributionModal}
        />
      </>
    )
  );
}
