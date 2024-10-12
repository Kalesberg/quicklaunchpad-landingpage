"use client";

import {
  ChevronDownIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { getConfig } from "config";

interface Network {
  chainId: number;
  name?: string;
  logo?: string;
  url?: string;
}

enum ChainId {
  MUMBAI = 80001,
  MATIC = 137,
  DOEGCHAIN_TESTNET = 568,
  DOGECHAIN = 2000,
  ZKTESTNET = 1442,
  ZKEVM = 1101,
  KAVA = 2222,
  MANTA = 169,
  ZKATANA = 1261120,
  BTTC = 199,
  X1 = 195,
  TIMX = 13473,
  IMX = 13371,
  ASTARZKEVM = 3776,
  LAYERX = 196,
}

const Header = () => {
  const [activeItem, setActiveItem] = useState("Launchpad");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [moreLinksOpen, setMoreLinksOpen] = useState(false);
  const [isOpenNetwork, setIsOpenNetwork] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("mainnets");
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>({
    chainId: ChainId.MATIC,
  });

  const navItems = [
    { name: "Swap", href: "/swap" },
    {
      name: "Launchpad",
      children: [
        { name: "Launchpad Homepage", href: "/launchpad-homepage" },
        { name: "QuickLaunch Dashboard", href: "/quicklaunch-dashboard" },
      ],
      isNew: true,
    },
    { name: "Farms", href: "/farms" },
    { name: "Pool", href: "/pool" },
    {
      name: "Earn",
      children: [
        { name: "Staking", href: "/earn/staking" },
        { name: "Yield Farming", href: "/earn/yield-farming" },
      ],
    },
    {
      name: "Partners",
      children: [
        { name: "Ecosystem", href: "/partners/ecosystem" },
        { name: "Integrations", href: "/partners/integrations" },
      ],
    },
    { name: "Dragons Lair", href: "/dragons-lair" },
  ];

  const moreLinks = [
    { name: "Gaming Hub", href: "/gaming-hub" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Convert", href: "/convert" },
    { name: "Analytics", href: "/analytics" },
  ];

  const networkInfo = [
    {
      label: "Mainnets",
      value: "mainnets",
      data: [
        { chainId: ChainId.MATIC },
        { chainId: ChainId.ZKEVM },
        { chainId: ChainId.MANTA, url: "/" },
        { chainId: ChainId.IMX, url: "/" },
        { chainId: ChainId.ASTARZKEVM, url: "/" },
        { chainId: ChainId.DOGECHAIN, url: "/" },
        { chainId: ChainId.LAYERX, url: "/" },
        {
          chainId: null,
          name: "Kava - Kinetix",
          logo: "/KAVA.png",
          url: "https://kinetix.finance/home",
        },
        {
          chainId: null,
          name: "Flare - SparkDex",
          logo: "/flare.webp",
          url: "https://sparkdex.ai/apps/swap",
        },
      ],
    },
    {
      label: "Testnets",
      value: "testnets",
      data: [
        { chainId: ChainId.X1, url: "/" },
        { chainId: ChainId.TIMX, url: "/" },
      ],
    },
  ];

  const tabs = [
    { label: "Mainnets", value: "mainnets" },
    { label: "Testnets", value: "testnets" },
  ];

  const handleNetworkSelect = (network: Network) => {
    setSelectedNetwork(network);
    setIsOpenNetwork(false);
  };

  const handleDropdown = (itemName: string) => {
    if (openDropdown === itemName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(itemName);
    }
  };

  return (
    <header className="bg-[#12131A]">
      <div className="container w-full mx-auto flex items-center justify-between text-white py-4 px-4 md:px-14 xl:px-24">
        <div className="flex items-center space-x-4">
          <Image
            src="https://beta.quickswap.exchange/static/media/quickIcon.aa0f5ef593b1a9f00bab835581e318f3.svg"
            alt="Logo"
            width={32}
            height={32}
          />
          <nav>
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.name} className="relative">
                  {item.children ? (
                    <div>
                      <div className="flex gap-1 items-center">
                        <button
                          onClick={() => handleDropdown(item.name)}
                          className={`relative hover:text-blue-400 ${
                            activeItem === item.name
                              ? "text-[#D9D9D9] after:absolute after:-bottom-4 after:left-0 after:block after:bg-[#448AFF] after:w-full after:h-[2px]"
                              : "text-[#7c7c81]"
                          } flex items-center`}
                        >
                          {item.name}
                          <ChevronDownIcon className="w-4 h-4 ml-1" />
                        </button>
                        {item?.isNew && (
                          <span className="flex px-1 py-[0.5px] h-4 text-[0.625rem] text-white rounded-xl bg-[#233455]">
                            <Image
                              src="/assets/images/fire.png"
                              alt="fire"
                              width={10}
                              height={12}
                              className="mr-1"
                            />
                            New
                          </span>
                        )}
                      </div>
                      {openDropdown === item.name && (
                        <ul className="absolute left-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-[#1B1E29] ring-1 ring-black ring-opacity-5">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                className="block px-4 py-2 text-sm text-[#696C80] hover:bg-gray-700"
                                onClick={() => setActiveItem(child.name)}
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center">
                      <Link
                        href={item.href}
                        className={`relative hover:text-blue-400 ${
                          activeItem === item.name
                            ? "text-[#D9D9D9] after:absolute after:-bottom-4 after:left-0 after:bg-[#448AFF] after:w-full after:h-[2px]"
                            : "text-[#7c7c81]"
                        }`}
                        onClick={() => setActiveItem(item.name)}
                      >
                        {item.name}
                      </Link>
                      {item?.isNew && (
                        <span className="flex px-1 py-[0.5px] h-4 text-[0.625rem] text-white rounded-xl bg-[#233455]">
                          <Image
                            src="/assets/images/fire.png"
                            alt="fire"
                            width={10}
                            height={12}
                            className="mr-1"
                          />
                          New
                        </span>
                      )}
                    </div>
                  )}
                </li>
              ))}
              <li
                className="relative text-[#696C80] w-9 h-9 cursor-pointer hover:bg-[#252833] hover:rounded-[10px]"
                onMouseEnter={() => setMoreLinksOpen(true)}
                onMouseLeave={() => setMoreLinksOpen(false)}
              >
                <EllipsisHorizontalIcon className="w-4 h-full m-auto" />
                {moreLinksOpen && (
                  <ul className="absolute left-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-[#1B1E29] ring-1 ring-black ring-opacity-5 before:absolute before:-top-5 before:left-2 before:w-full before:h-5">
                    {moreLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="block px-4 py-2 text-sm text-[#696C80] hover:bg-gray-700"
                          onClick={() => setActiveItem(link.name)}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
        <div className="w-auto flex gap-6 items-center justify-end">
          <ChainSelected
            networkInfo={networkInfo}
            isOpenNetwork={isOpenNetwork}
            setIsOpenNetwork={setIsOpenNetwork}
            selectedNetwork={selectedNetwork}
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            handleNetworkSelect={(n: any) => {
              handleNetworkSelect(n);
            }}
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-base h-[44px] text-white font-semibold py-2 px-3 rounded-lg">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

export const ChainSelected = ({
  networkInfo,
  isOpenNetwork,
  setIsOpenNetwork,
  selectedNetwork,
  tabs,
  selectedTab,
  setSelectedTab,
  handleNetworkSelect,
}: any) => {
  const networkActive = getConfig(selectedNetwork.chainId);
  return (
    <div className="relative">
      <button
        className="px-2 py-2 text-white bg-[#161B28] rounded-lg flex items-center text-sm font-semibold transition-all duration-300 ease-in-out"
        onClick={() => setIsOpenNetwork(!isOpenNetwork)}
      >
        <div className="relative">
          <img
            src={
              networkActive["nativeCurrencyImage"]
                ? networkActive["nativeCurrencyImage"]
                : "https://beta.quickswap.exchange/static/media/quickIcon.aa0f5ef593b1a9f00bab835581e318f3.svg"
            }
            alt={networkActive["networkName"]}
            className="w-5 h-5 mr-1"
          />
        </div>
        <span>
          <ChevronDownIcon className="w-4 h-4" />
        </span>
      </button>

      {/* Dropdown */}
      {isOpenNetwork && (
        <div className="absolute bg-[#1b1e29] -left-[35%] top-[45px] z-10 min-w-[320px] text-white rounded-2xl mt-2 shadow-lg">
          <p className="p-4 pb-2 text-base font-medium">Select Network</p>
          <div className="relative flex justify-start p-3 gap-8 text-sm border-b border-[#1e263d80]">
            {tabs.map((t: any) => (
              <button
                key={t.value}
                className={clsx({
                  ["transition-all duration-300 ease-in-out"]: true,
                  ["text-[#6880a3]"]: selectedTab !== t.value,
                })}
                onClick={() => setSelectedTab(t.value)}
              >
                {t.label}
              </button>
            ))}

            <div
              className={clsx({
                [`w-[70px] ml-2 absolute -bottom-px border-b-2 border-blue-500 transition-all duration-300 ease-in-out`]:
                  true,
                ["left-0"]: selectedTab === "mainnets",
                ["left-[92px]"]: selectedTab === "testnets",
              })}
            />
          </div>

          {/* List of networks */}
          <div className="py-4 flex flex-col w-full justify-start items-start gap-2">
            {networkInfo
              ?.find((chainId: any) => selectedTab === chainId.value)
              ?.data?.map((network: any, index: number) => {
                const config = getConfig(network.chainId);
                return (
                  <button
                    key={index}
                    className="flex items-center justify-start text-left w-full px-4 py-2 hover:bg-[#1e263d52] rounded-lg"
                    onClick={() =>
                      network.chainId
                        ? handleNetworkSelect(network)
                        : window.open(network.url, "_blank")
                    }
                  >
                    <div className="flex items-center justify-start text-left w-full text-sm font-semibold">
                      <img
                        src={
                          network.chainId
                            ? config["nativeCurrencyImage"]
                            : network.logo
                        }
                        alt={
                          network.chainId ? config["networkName"] : network.name
                        }
                        className="w-6 h-6 mr-2 rounded-xl"
                      />
                      {network.chainId ? config["networkName"] : network.name}
                    </div>
                    {network.chainId &&
                      selectedNetwork?.chainId === config["chainId"] && (
                        <div className="min-w-3 min-h-3 bg-[#1e4843] flex items-center justify-center rounded-full">
                          <div className="bg-[#27a17b] w-1.5 h-1.5 rounded-full" />
                        </div>
                      )}
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
