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
import { caseLaunch } from "config";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="container mx-auto">
      <HeroSection
        caseLaunch={caseLaunch}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <div className="max-w-[1248px] mx-auto px-4 lg:px-2">
        {caseLaunch !== 0 && <LaunchNotice status="upcoming" />}
        <StepsToJoin
          caseLaunch={caseLaunch}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
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
