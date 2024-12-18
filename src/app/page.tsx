"use client";
import LaunchNotice from "components/ui/home/LaunchNotice";
import StepsToJoin from "components/ui/home/StepsToJoin";
import LiveUpcomingLaunches from "components/ui/home/LiveUpcomingLaunches";
import JoinSocialMedia from "components/ui/home/JoinSocialMedia";
import PreviousLaunches from "components/ui/home/PreviousLaunches";
import FAQ from "components/ui/home/FAQ";
import CTA from "components/ui/home/CTA";
import HeroSection from "components/ui/home/HeroSection";
import { useState } from "react";
import SignUpModal from "components/common/SignUpModal";
import Footer from "components/layout/Footer";

export default function Home() {
  // 0: no launches
  // 1: The only launch
  // 2: multiple live launches
  // 3: multiple live & previous launches
  const caseLaunch: number = 0;
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="container mx-auto">
      <HeroSection
        caseLaunch={caseLaunch}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <div className="max-w-[1248px] mx-auto">
        {caseLaunch !== 0 && <LaunchNotice status="upcoming" />}
        <StepsToJoin />
        {caseLaunch > 1 && <LiveUpcomingLaunches />}
        <JoinSocialMedia />
        {caseLaunch > 2 && <PreviousLaunches />}
        <FAQ />
        <CTA />
        <Footer />
      </div>
      <SignUpModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
