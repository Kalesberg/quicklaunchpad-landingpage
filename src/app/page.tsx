"use client";
import LaunchNotice from "components/ui/home/LaunchNotice";
import StepsToJoin from "components/ui/home/StepsToJoin";
import LiveUpcomingLaunches from "components/ui/home/LiveUpcomingLaunches";
import JoinTelegram from "components/ui/home/JoinTelegram";
import PreviousLaunches from "components/ui/home/PreviousLaunches";
import FAQ from "components/ui/home/FAQ";
import CTA from "components/ui/home/CTA";
import HeroSection from "components/ui/home/HeroSection";
import { useState } from "react";
import SignUpModal from "components/common/SignUpModal";

export default function Home() {
  // 0: no launches
  // 1: The only launch
  // 2: multiple live launches
  // 3: multiple live & previous launches
  const caseLaunch = 0;
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
        <StepsToJoin openModal={openModal} setOpenModal={setOpenModal} />
        {caseLaunch > 1 && <LiveUpcomingLaunches />}
        <JoinTelegram />
        {caseLaunch > 2 && <PreviousLaunches />}
        <FAQ />
        <CTA />
      </div>
      <SignUpModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
