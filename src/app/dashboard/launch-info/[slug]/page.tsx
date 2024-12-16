"use client";
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
import { useState } from "react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useSelector } from 'react-redux';
import { convertDateTime } from 'utils';
import { Project } from "state/type";

export default function LaunchInfoDetailPage() {
  const { project } = useSelector((state: {project: Project}) => state || {});
  console.log('getting the project detail', project);
  const [selectedTab, setSelectedTab] = useState<string>("about");
  const status = project.status;
  const KYCStatus = !!project.kycProvider;
  const tabs = [{ label: "About the Launch", value: "about" }].concat(
    status === "upcoming"
      ? []
      : [
          { label: "My Contribution", value: "contribution" },
          { label: "Claim", value: "claim" },
        ],
  );

  return (
    <div className="container-dashboard mx-auto px-4">
      <Link href={"/dashboard"} className="flex items-center mb-6">
        <ChevronLeftIcon className="w-5 h-5 mr-2" />
        Back to Launchpads
      </Link>
      <div className="flex gap-5">
        <div className="flex-[70%] flex-grow-[2] flex-shrink">
          <div className="bg-[#1B1E29] p-5 rounded-xl mb-5">
            <div className="flex gap-5">
              <div className="relative min-w-[128px] h-[128px]">
                <Image
                  src={"/assets/images/launch-info-img.png"}
                  alt="Logo"
                  width={128}
                  height={128}
                  className="min-w-[128px] min-h-[128px] rounded-full"
                />
                <Image
                  src={"/MATIC.png"}
                  alt="Logo"
                  width={32}
                  height={32}
                  className="absolute bottom-0 right-0 rounded-full"
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between mb-4">
                  <h1 className="text-[#EBECF2] text-[32px] font-bold leading-[48px]">
                    {project.projectName}
                  </h1>
                  <div className="flex justify-between gap-2">
                    <span
                      className={`min-w-24 h-[24px] px-2 py-1 rounded-md text-xs text-center font-bold ${
                        status === "live"
                          ? "bg-[#0FC67929] text-[#0FC679]"
                          : status === "upcoming"
                            ? "bg-[#FDD83529] text-[#FDD835]"
                            : "bg-[#8E33FF29] text-[#C684FF]"
                      }`}
                    >
                      {status === "live"
                        ? "Open"
                        : status === "upcoming"
                          ? "Upcoming"
                          : "Closed"}
                    </span>
                    <span
                      className={`min-w-24 h-[24px] px-2 py-1 rounded-md text-xs text-center font-bold ${
                        KYCStatus === true
                          ? "bg-[#FF5C5C29] text-[#FF5C5C]"
                          : ""
                      }`}
                    >
                      {KYCStatus === true ? "KYC Required" : ""}
                    </span>
                  </div>
                </div>
                <p className="max-w-[500px] w-3/4 leading-6 text-[#EBECF2] whitespace-nowrap overflow-hidden text-ellipsis mb-4">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Link
                    href={project.websiteUrl}
                    className="min-w-[80px] h-9 bg-[#448AFF14] text-[#448AFF] text-center text-sm font-bold leading-9 rounded-lg px-3"
                  >
                    Website
                  </Link>
                  <Link
                    href={project.whitepaperUrl}
                    className="min-w-[80px] h-9 bg-[#448AFF14] text-[#448AFF] text-center text-sm font-bold leading-9 rounded-lg px-3"
                  >
                    Whitepaper
                  </Link>
                  <Link
                    href={project.blogUrl}
                    className="min-w-[80px] h-9 bg-[#448AFF14] text-[#448AFF] text-center text-sm font-bold leading-9 rounded-lg px-3"
                  >
                    Blog
                  </Link>
                </div>
                <div className="flex space-x-5 mt-2 mb-4">
                  <TelegramIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                  <YoutubeIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                  <DiscordIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                  <GithubIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                  <TwitterIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-[#282D3D] min-w-[158px] h-[106px] p-4 rounded-2xl flex flex-col">
                <h3 className="text-[#EBECF2] text-sm font-semibold mb-2">
                  Total Raise
                </h3>
                <p className="text-[#EBECF2] text-2xl font-bold flex-grow">
                  ${project.totalPoolAmount}
                </p>
              </div>
              <div className="bg-[#282D3D] min-w-[158px] h-[106px] p-4 rounded-2xl flex flex-col">
                <h3 className="text-[#EBECF2] text-sm font-semibold mb-2">
                  Token Price
                </h3>
                <p className="text-[#EBECF2] text-2xl font-bold flex-grow">
                  ${project.initialPrice}
                </p>
              </div>
              <div className="bg-[#282D3D] min-w-[158px] h-[106px] p-4 rounded-2xl flex flex-col">
                <h3 className="text-[#EBECF2] text-sm font-semibold mb-2">
                  Number of Winners
                </h3>
                <p className="text-[#EBECF2] text-2xl font-bold flex-grow">
                  ${project.numberLotteryWinners || 0}
                </p>
              </div>
              <div className="bg-[#282D3D] min-w-[158px] h-[106px] p-4 rounded-2xl flex flex-col">
                <h3 className="text-[#EBECF2] text-sm font-semibold mb-2">
                  Allocation
                </h3>
                <p className="text-[#EBECF2] text-2xl font-bold flex-grow">
                  ${project.maxUserPledgeSize}
                </p>
              </div>
            </div>
          </div>
          {status === "upcoming" && (
            <div className="bg-[#00B8D933] flex justify-between items-center gap-4 rounded-2xl p-6 mb-5">
              <p className="text-[#CAFDF5] text-lg font-bold leading-7">
                Connect your wallet to participate in QuickSwap launches
              </p>
              <Button
                variant="primary"
                className="bg-[#00B8D914] text-[#61F3F3] !text-sm text-center !font-bold leading-6 rounded-lg px-3 hover:bg-[#00B8D966]"
              >
                Connect Wallet
              </Button>
            </div>
          )}
          <div className="bg-[#1B1E29] rounded-2xl">
            <div className="relative min-h-12 flex justify-start px-6 gap-8 text-sm after:content-[''] after:w-full after:h-[2px] after:absolute after:bottom-0 after:left-0 after:bg-[#919EAB14]">
              {tabs.map((t: any) => (
                <button
                  key={t.value}
                  className={clsx({
                    ["transition-all duration-100 ease-in-out"]: true,
                    ["text-[#C7CAD9] text-sm leading-6 font-semibold"]:
                      selectedTab !== t.value,
                    ["text-[#EBECF2] text-sm leading-6 font-semibold border-b-2 border-[#EBECF2]"]:
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
                <div className="text-[#EBECF2] text-sm leading-6">
                  <h2 className="text-lg font-bold leading-7 mb-2">
                    Introducing [Launch Name]
                  </h2>
                  <p className="mb-2">
                    YakDAO&apos;s approach is innovative in several ways. By
                    utilizing a deflationary token model that mimics strategies
                    employed in private equity funds, they are overcoming the
                    barriers that typically prevent individual investors from
                    accessing this lucrative market.
                  </p>
                  <p className="mb-2">
                    The yields from YakDAO&apos;s properties are used to create
                    consistent buy pressure on the $YAKS token, offering rewards
                    for those who choose to stake it. This strategy leverages
                    decentralized finance (DeFi) mechanisms to create a form of
                    monetary democracy, allowing retail investment in an asset
                    class that has been largely controlled by the world&apos;s
                    wealthiest investors
                  </p>
                </div>
              )}
              {selectedTab === "contribution" && (
                <div className="min-w-[440px] w-full rounded-xl mx-auto px-6 text-center text-[#696C80]">
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
                    lottery. If you would like to participate, you must complete
                    KYC.
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
                <div className="min-w-[440px] w-full rounded-xl mx-auto px-6 text-center text-[#696C80]">
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
        <div className="flex-[30%] h-full bg-[#1B1E29] py-6 rounded-xl">
          {status === "upcoming" ? (
            <>
              <h2 className="text-[#EBECF2] text-2xl leading-9 text-center font-bold border-b-2 border-[#919EAB14] pb-4">
                Comming Soon
              </h2>
              <div className="flex flex-col px-6 pt-4">
                <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['1'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                  <h3 className="text-[#696C80] text-base leading-6 font-semibold">
                    Whitelist
                  </h3>
                  <p className="text-[#696C80] text-xs leading-4">TBA</p>
                </div>
                <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['2'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                  <h3 className="text-[#696C80] text-base leading-6 font-semibold">
                    Lottery
                  </h3>
                </div>
                <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['3'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                  <h3 className="text-[#696C80] text-base leading-6 font-semibold">
                    Contribution
                  </h3>
                </div>
                <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['4'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                  <h3 className="text-[#696C80] text-base leading-6 font-semibold">
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
          ) : status === "live" ? (
            <>
              <div className="border-b-2 border-[#919EAB14] pb-4">
                <h2 className="text-[#EBECF2] text-2xl leading-9 text-center font-bold">
                  Whitelist Is Open
                </h2>
                <p className="text-[#C7CAD9] text-center">
                  Participation time remaining
                </p>
                <div className="w-full flex items-center justify-center gap-2">
                  <span className="text-[#EBECF2] text-[32px] leading-[48px] font-bold">
                    36 :
                  </span>
                  <span className="text-[#EBECF2] text-[32px] leading-[48px] font-bold">
                    09 :
                  </span>
                  <span className="text-[#EBECF2] text-[32px] leading-[48px] font-bold">
                    06 :
                  </span>
                  <span className="text-[#EBECF2] text-[32px] leading-[48px] font-bold">
                    04
                  </span>
                </div>
              </div>
              <div className="flex flex-col px-6 pt-4">
                <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['1'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#448AFF] after:text-[#EBECF2] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                  <h3 className="text-[#EBECF2] text-base leading-6 font-semibold">
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
                  >
                    Connect wallet to participate
                  </Button>
                </div>
                <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['2'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                  <h3 className="text-[#696C80] text-base leading-6 font-semibold">
                    Lottery
                  </h3>
                  <p className="text-[#696C80] text-xs leading-4">
                    Winners will be announced {project.pledgeEndDate}
                  </p>
                </div>
                <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['3'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                  <h3 className="text-[#696C80] text-base leading-6 font-semibold">
                    Contribution
                  </h3>
                  <p className="text-[#696C80] text-xs leading-4">
                    Expires on 18 Mar 04:00 AM
                  </p>
                </div>
                <div className="relative left-7 w-fit min-h-12 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80] after:content-['4'] after:absolute after:top-1/2 after:-left-8 after:w-6 after:h-6 after:rounded-full after:bg-[#DFE3E8] after:text-[#919EAB] after:text-sm after:font-semibold after:leading-6 after:text-center after:translate-y-[-50%]">
                  <h3 className="text-[#696C80] text-base leading-6 font-semibold">
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
                <h2 className="text-[#EBECF2] text-2xl leading-9 text-center font-bold">
                  Launch Timeline
                </h2>
              </div>
              <div className="flex flex-col px-6 pt-4">
                <div className="relative left-7 w-fit min-h-12 pb-4 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80]">
                  <Image
                    src="/assets/icons/ic-checkmark.svg"
                    alt="icon"
                    width={24}
                    height={24}
                    className="block absolute top-[10px] -left-[30px]"
                  />
                  <h3 className="text-[#EBECF2] text-base leading-6 font-semibold">
                    Whitelist
                  </h3>
                  <p className="text-[#C7CAD9] text-xs leading-4">
                    Application period:
                  </p>
                  <p className="text-[#C7CAD9] text-xs leading-4 font-semibold">
                    {project.pledgeStartDate} – {project.pledgeEndDate}
                  </p>
                </div>
                <div className="relative left-7 w-fit min-h-12 p-2 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80]">
                  <Image
                    src="/assets/icons/ic-checkmark.svg"
                    alt="icon"
                    width={24}
                    height={24}
                    className="block absolute top-[10px] -left-[30px]"
                  />
                  <h3 className="text-[#EBECF2] text-base leading-6 font-semibold">
                    Lottery
                  </h3>
                  <p className="text-[#696C80] text-xs leading-4">
                    Winners have been announced on {project.pledgeEndDate}
                  </p>
                </div>
                <div className="relative left-7 w-fit min-h-12 p-2 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80]">
                  <Image
                    src="/assets/icons/ic-checkmark.svg"
                    alt="icon"
                    width={24}
                    height={24}
                    className="block absolute top-[10px] -left-[30px]"
                  />
                  <h3 className="text-[#EBECF2] text-base leading-6 font-semibold">
                    Contribution
                  </h3>
                  <p className="text-[#696C80] text-xs leading-4">
                    Expires on {project.contributionEndDate}
                  </p>
                </div>
                <div className="relative left-7 w-fit min-h-12 p-2 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80]">
                  <Image
                    src="/assets/icons/ic-checkmark.svg"
                    alt="icon"
                    width={24}
                    height={24}
                    className="block absolute top-[10px] -left-[30px]"
                  />
                  <h3 className="text-[#EBECF2] text-base leading-6 font-semibold">
                    Completed
                  </h3>
                </div>
                <div className="relative left-7 w-fit min-h-12 p-2 flex flex-col justify-center gap-2 before:content-[''] before:absolute before:-left-5 before:top-full before:translate-y-[-50%] before:w-[1px] before:h-full before:inline-block before:bg-[#282D3D80]">
                  <Image
                    src="/assets/icons/ic-checkmark.svg"
                    alt="icon"
                    width={24}
                    height={24}
                    className="block absolute top-[10px] -left-[30px]"
                  />
                  <h3 className="text-[#EBECF2] text-base leading-6 font-semibold">
                    Claim
                  </h3>
                </div>
              </div>
            </>
          )
        }
        </div>
      </div>
    </div>
  );
}
