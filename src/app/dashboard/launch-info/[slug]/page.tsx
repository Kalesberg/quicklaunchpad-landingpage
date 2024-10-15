import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";

export default function LaunchInfoDetailPage() {
  let status = "upcoming";
  return (
    <div className="container-dashboard mx-auto px-4 md:px-14 xl:px-24">
      <Link href={"/dashboard"} className="flex items-center">
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        Back to Launchpads
      </Link>
      <div className="flex gap-5">
        <div className="flex-[70%] flex-grow-[2] flex-shrink bg-[#1B1E29] p-5 rounded-xl">
          <div className="flex gap-5">
            <div className="relative w-[128px] h-[128px]">
              <Image
                src={"/assets/images/launch-info-img.png"}
                alt="Logo"
                width={128}
                height={128}
                className="w-full h-full rounded-full"
              />
              <Image
                src={"/MATIC.png"}
                alt="Logo"
                width={32}
                height={32}
                className="absolute bottom-0 right-0 rounded-full"
              />
            </div>
            <div className="w-full h-auto">
              <div className="flex">
                <h1 className="text-[#EBECF2] text-[32px] font-bold leading-[48px]">
                  Launch Name Launch Name Launch Name Launch Name{" "}
                </h1>
                <span
                  className={`w-full h-auto px-2 py-1 rounded-md text-xs ${
                    status === "live"
                      ? "bg-green-500"
                      : status === "upcoming"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                >
                  {status === "live"
                    ? "Open"
                    : status === "upcoming"
                    ? "Upcoming"
                    : "Closed"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[30%] bg-[#1B1E29] p-5"></div>
      </div>
    </div>
  );
}
