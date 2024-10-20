import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { FireIcon } from "@heroicons/react/16/solid";

const FooterSection: React.FC<{
  title: string;
  links: { href: string; text: string; isNew?: boolean }[];
}> = ({ title, links }) => (
  <div>
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

const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const Footer: React.FC = () => {
  const productLinks = [
    { href: "/swap", text: "Swap" },
    { href: "/perps-v1", text: "Perps V1" },
    { href: "/perps-faktor", text: "Perps: Faktor", isNew: true },
    { href: "/pool", text: "Pool" },
    { href: "/farm", text: "Farm" },
    { href: "/bonds", text: "Bonds" },
    { href: "/launchpad", text: "Launchpad", isNew: true },
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
    <footer className="bg-[#12131A] text-white py-8 px-4">
      <div className="container mx-auto px-12 flex justify-between items-start lg:flex-row flex-col gap-x-[100px] 2xl:gap-x-[200px] gap-y-16">
        <div className="w-full flex items-start justify-between gap-[100px]">
          <div className="flex gap-x-20 gap-y-[21px] xl:flex-row flex-col">
            <FooterSection title="Products" links={productLinks?.slice(0, 6)} />
            <FooterSection title="" links={productLinks?.slice(6)} />
          </div>

          <div>
            <h3 className="font-bold mb-6 text-base">Developers</h3>
            <ul className="space-y-[21px]">
              {developerLinks.map(({ href, text }) => (
                <li key={href} className="text-[#FFFFFFA3]">
                  <ExternalLink href={href}>{text}</ExternalLink>
                </li>
              ))}
            </ul>
          </div>

          <FooterSection title="Governance" links={governanceLinks} />
        </div>

        <div className="max-w-[310px]">
          <Image
            src="/assets/images/quicklaunch-logo-footer.png"
            alt="QuickSwap"
            width={150}
            height={30}
          />
          <p className="my-4 text-sm text-[#FFFFFFA3]">
            QuickSwap&apos;s community is building a comprehensive decentralized
            trading platform in the Polygon ecosystem for the future of finance.
            Join the dragon army!
          </p>
          <p className="font-bold mb-5 text-sm">QuickSwap&apos;s Email Newsletter</p>

          <form className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="bg-gray-800 text-white px-3 py-2 rounded-l-md flex-grow"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-r-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="container w-full h-[1.5px] mx-auto px-12 after:content-[''] after:block after:w-full after:h-full after:bg-[#FFFFFF0A]"></div>
      <div className="container mx-auto mt-8 px-12 flex justify-between items-center text-sm">
        <span className="text-[#FFFFFFA3]">
          © {new Date().getFullYear()} QuickSwap
        </span>
        <Link className="text-[#FFFFFFA3]" href="/terms">
          Terms of use
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
