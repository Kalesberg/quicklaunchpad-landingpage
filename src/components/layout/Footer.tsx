import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">Products</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/swap">Swap</Link>
            </li>
            <li>
              <Link href="/perps-v1">Perps V1</Link>
            </li>
            <li>
              <Link href="/perps-faktor">
                Perps: Faktor{" "}
                <span className="bg-blue-500 text-xs px-1 rounded">New</span>
              </Link>
            </li>
            <li>
              <Link href="/pool">Pool</Link>
            </li>
            <li>
              <Link href="/farm">Farm</Link>
            </li>
            <li>
              <Link href="/bonds">Bonds</Link>
            </li>
            <li>
              <Link href="/launchpad">
                Launchpad{" "}
                <span className="bg-blue-500 text-xs px-1 rounded">New</span>
              </Link>
            </li>
            <li>
              <Link href="/dragons-lair">Dragons Lair</Link>
            </li>
            <li>
              <Link href="/gaming-hub">Gaming Hub</Link>
            </li>
            <li>
              <Link href="/leaderboard">Leaderboard</Link>
            </li>
            <li>
              <Link href="/convert-quick">Convert QUICK</Link>
            </li>
            <li>
              <Link href="/dapp-os">dappOS</Link>
            </li>
            <li>
              <Link href="/analytics">Analytics</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Developers</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/QuickSwap"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://gitbook.io/quickswap"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitBook
              </a>
            </li>
            <li>
              <a
                href="https://docs.quickswap.exchange"
                target="_blank"
                rel="noopener noreferrer"
              >
                Docs
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Governance</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/proposals">Proposals</Link>
            </li>
            <li>
              <Link href="/vote">Vote</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="flex items-center mb-4">
            <img
              src="/quickswap-logo.png"
              alt="QuickSwap"
              className="h-6 w-6 mr-2"
            />
            <span className="font-bold">QUICKSWAP</span>
          </div>
          <p className="mb-4 text-sm">
            QuickSwap's community is building a comprehensive decentralized
            trading platform on the Polygon ecosystem for the future of finance.
            Join the dragon army!
          </p>
          <h4 className="font-bold mb-2">QuickSwap's Email Newsletter</h4>
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
      <div className="container mx-auto mt-8 flex justify-between items-center text-sm">
        <span>© 2024 QuickSwap</span>
        <Link href="/terms">Terms of Use</Link>
      </div>
    </footer>
  );
};

export default Footer;
