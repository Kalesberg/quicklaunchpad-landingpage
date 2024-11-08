"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { FireIcon } from "@heroicons/react/16/solid";
import { usePathname } from "next/navigation";
import { TelegramIcon } from "../../../public/assets/images/social-icons";

const FooterSection: React.FC<{
  title: string;
  links: { href: string; text: string; isNew?: boolean }[];
  className?: string;
}> = ({ title, links, className }) => (
  <div className={className}>
    <h3
      className={clsx({
        ["font-bold mb-6 text-base h-6"]: true,
        ["xl:block hidden"]: !title,
      })}
    >
      {title}
    </h3>
    <ul className="space-y-[21px]">
      {links.map(({ href, text, isNew }) => (
        <li key={href}>
          <Link
            href={href}
            className="flex items-center gap-x-2 whitespace-nowrap text-[#FFFFFFA3]"
          >
            {text}
            {isNew && (
              <div className="flex items-center w-max bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                <FireIcon className="text-red-500 mr-1 w-4 h-4" />
                New
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({
//   href,
//   children,
// }) => (
//   <a href={href} target="_blank" rel="noopener noreferrer">
//     {children}
//   </a>
// );

const Footer: React.FC = () => {
  const pathname = usePathname();

  const checkIsDashboardPage = () => {
    return pathname?.includes("/dashboard");
  };

  const productLinks = [
    { href: "/swap", text: "Swap" },
    { href: "/perps-v1", text: "Perps V1" },
    { href: "/perps-faktor", text: "Perps: Faktor", isNew: true },
    { href: "/pool", text: "Pool" },
    { href: "/farm", text: "Farm" },
    { href: "/bonds", text: "Bonds" },
    { href: "/quicklaunch", text: "QuickLaunch", isNew: true },
    { href: "/dragons-lair", text: "Dragons Lair" },
    { href: "/gaming-hub", text: "Gaming Hub" },
    { href: "/leaderboard", text: "Leaderboard" },
    { href: "/convert-quick", text: "Convert QUICK" },
    { href: "/dapp0s", text: "dapp0s" },
    { href: "/analytics", text: "Analytics" },
  ];

  const developerLinks = [
    { href: "https://github.com/QuickSwap", text: "GitHub" },
    { href: "https://docs.quickswap.exchange", text: "Docs" },
    { href: "https://quickswap.gitbook.io", text: "GitBook" },
  ];

  const governanceLinks = [
    { href: "/proposals", text: "Proposals" },
    { href: "/vote", text: "Vote" },
  ];

  return (
    <footer className={`bg-[#12131A] text-white py-0 lg:py-8 px-0`}>
      {!checkIsDashboardPage() ? (
        <>
          <div className="container mx-auto px-3 lg:px-0 flex justify-between items-start flex-col lg:flex-row gap-x-[100px] 2xl:gap-x-[120px] gap-y-10 lg:gap-y-16">
            <div className="w-full grid grid-cols-5 md:grid-cols-3 lg:flex lg:items-start lg:flex-wrap gap-10 lg:gap-[100px]">
              <div className="flex col-span-2 gap-x-10 gap-y-[21px] md:row-start-1">
                <FooterSection
                  title="Products"
                  links={productLinks?.slice(0, 6)}
                  className="hidden lg:block"
                />
                <FooterSection
                  title="Products"
                  links={productLinks?.slice(0, 7)}
                  className="block lg:hidden"
                />
                <FooterSection
                  title=""
                  links={productLinks?.slice(6)}
                  className="hidden lg:block"
                />
                <FooterSection
                  title=""
                  links={productLinks?.slice(7)}
                  className="block lg:hidden mt-12"
                />
              </div>
              <FooterSection title="Developers" links={developerLinks} className="row-start-2 md:row-start-1" />
              <FooterSection title="Governance" links={governanceLinks} className="col-start-3 md:col-start-1 row-start-2 lg:row-start-1 " />
            </div>

            <div className="max-w-[310px]">
              <Image
                src="/assets/images/quicklaunch-logo-footer.png"
                alt="QuickSwap"
                width={120}
                height={20}
              />
              <p className="my-[22px] lg:my-4 text-sm font-medium leading-5 text-[#FFFFFFA3]">
                QuickSwap&apos;s community is building a comprehensive
                decentralised trading platform in the Polygon ecosystem to
                accelerate the future of finance. Join the dragon army!
              </p>
              <p className="font-semibold lg:font-bold mb-[22px] text-sm">
                QuickSwap&apos;s Email Newsletter
              </p>

              <form className="relative flex">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="bg-gray-800 text-white px-3 py-2 rounded-lg flex-grow"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="container w-full h-[1.5px] mx-auto mt-10 lg:mt-0 px-3 lg:px-0 after:content-[''] after:block after:w-full after:h-full after:bg-[#FFFFFF0A]"></div>
          <div className="container mx-auto mt-8 px-3 lg:px-0 flex justify-between items-center text-sm">
            <span className="text-[#FFFFFFA3]">
              © {new Date().getFullYear()} QuickSwap
            </span>
            <Link className="text-[#FFFFFFA3]" href="/terms">
              Terms of use
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="container w-full h-[1.5px] mx-auto px-0 after:content-[''] after:block after:w-full after:h-full after:bg-[#FFFFFF0A]"></div>
          <div className="container mx-auto mt-8 mb-6 px-10 flex justify-between items-center text-sm">
            <div className="flex items-center gap-8">
              <Link className="text-[#FFFFFFA3]" href="/terms">
                Terms of use
              </Link>
              <Link
                className="text-[#FFFFFFA3] flex items-center gap-1"
                href="https://web.telegram.org/"
              >
                <TelegramIcon className="w-[18px] h-[18px]" />
                Telegram Support
              </Link>
            </div>
            <span className="text-xs leading-5 text-[#FFFFFFA3]">
              © {new Date().getFullYear()} QuickLaunch powered by TrustSwap. All
              rights reserved.
            </span>
          </div>
        </>
      )}
    </footer>
  );
};

export default Footer;
