"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [activeItem, setActiveItem] = useState("Swap");

  const navItems = [
    "Swap",
    "Launchpad",
    "Farms",
    "Pool",
    "Earn",
    "Partners",
    "Dragons Lair",
  ];

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <nav>
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className={`hover:text-blue-400 ${
                      activeItem === item ? "text-blue-400" : ""
                    }`}
                    onClick={() => setActiveItem(item)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-700 rounded-full p-1">
            <Image
              src="/profile-icon.png"
              alt="Profile"
              width={24}
              height={24}
              className="rounded-full"
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
