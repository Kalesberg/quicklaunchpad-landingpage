"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [activeItem, setActiveItem] = useState("Launchpad");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    { name: "Swap", href: "/swap" },
    { name: "Launchpad", href: "/launchpad" },
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

  const handleDropdown = (itemName: string) => {
    if (openDropdown === itemName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(itemName);
    }
  };

  return (
    <header className="bg-gray-900">
      <div className="container w-full mx-auto flex items-center justify-between text-white py-4 px-4 md:px-14 xl:px-24">
        <div className="flex items-center space-x-4">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <nav>
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                <li key={item.name} className="relative">
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => handleDropdown(item.name)}
                        className={`hover:text-blue-400 ${
                          activeItem === item.name ? "text-blue-400" : ""
                        } flex items-center`}
                      >
                        {item.name}
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                      </button>
                      {openDropdown === item.name && (
                        <ul className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
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
                    <Link
                      href={item.href}
                      className={`hover:text-blue-400 ${
                        activeItem === item.name ? "text-blue-400" : ""
                      }`}
                      onClick={() => setActiveItem(item.name)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-base h-[44px] text-white font-semibold py-2 px-3 rounded-lg">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
