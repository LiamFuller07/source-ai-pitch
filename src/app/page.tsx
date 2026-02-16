"use client";

import { Hero } from "@/components/Hero";
import { ProblemToday } from "@/components/ProblemToday";
import { Frustration } from "@/components/Frustration";
import { AiReplacesChain } from "@/components/AiReplacesChain";
import { Workflow } from "@/components/Workflow";
import { WhoDoesWhat } from "@/components/WhoDoesWhat";
import { Platform } from "@/components/Platform";
import { WhiteLabel } from "@/components/WhiteLabel";
import { WhyPartner } from "@/components/WhyPartner";
import { Cta } from "@/components/Cta";
import { Nav } from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemToday />
        <Frustration />
        <AiReplacesChain />
        <Workflow />
        <WhoDoesWhat />
        <Platform />
        <WhiteLabel />
        <WhyPartner />
        <Cta />
      </main>
    </>
  );
}
