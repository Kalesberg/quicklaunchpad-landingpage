import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import LaunchNotice from "components/ui/home/LaunchNotice";
import LiveUpcomingLaunches from "components/ui/home/LiveUpcomingLaunches";
import PreviousLaunches from "components/ui/home/PreviousLaunches";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container-dashboard mx-auto px-4 md:px-14 xl:px-24">
      <Link href={"/"} className="flex items-center">
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        Back
      </Link>
      <div className="mx-6">
        <LaunchNotice isDashboard={true} />
        <LiveUpcomingLaunches />
        <PreviousLaunches />
      </div>
    </div>
  );
}
