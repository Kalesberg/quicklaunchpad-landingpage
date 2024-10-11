import LaunchNotice from "components/ui/home/LaunchNotice";
import StepsToJoin from "components/ui/home/StepsToJoin";
import LiveUpcomingLaunches from "components/ui/home/LiveUpcomingLaunches";
import JoinTelegram from "components/ui/home/JoinTelegram";
import PreviousLaunches from "components/ui/home/PreviousLaunches";
import FAQ from "components/ui/home/FAQ";
import CTA from "components/ui/home/CTA";
import HeroSection from "components/ui/home/HeroSection";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <HeroSection />
      <LaunchNotice />
      <StepsToJoin />
      <LiveUpcomingLaunches />
      <JoinTelegram />
      <PreviousLaunches />
      <FAQ />
      <CTA />
    </div>
  );
}
