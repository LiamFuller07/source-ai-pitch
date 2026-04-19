"use client";

import { Hero } from "@/components/Hero";
import { ProblemToday } from "@/components/ProblemToday";
import { Solution } from "@/components/Solution";
import { AiReplacesChain } from "@/components/AiReplacesChain";
import { SupportedSystems } from "@/components/SupportedSystems";
import { WhoDoesWhat } from "@/components/WhoDoesWhat";
import { DemoVideo } from "@/components/DemoVideo";
import { WhiteLabel } from "@/components/WhiteLabel";
import { WhyPartner } from "@/components/WhyPartner";
import { HowWePartner } from "@/components/HowWePartner";
import { Pricing } from "@/components/Pricing";
import { Landscape } from "@/components/Landscape";
import { Scale } from "@/components/Scale";
import { Partners } from "@/components/Partners";
import { CaseStudy } from "@/components/CaseStudy";
import { Team } from "@/components/Team";
import { Cta } from "@/components/Cta";
import { Nav } from "@/components/Nav";
import { PresentationProvider } from "@/components/PresentationController";

export default function Home() {
  return (
    <PresentationProvider>
      <Nav />
      <main>
        <ProblemToday />
        <Solution />
        <AiReplacesChain />
        <WhoDoesWhat />
        {/* <WhiteLabel /> */}
        {/* <CaseStudy /> */}
        <SupportedSystems />
        <WhyPartner />
        {/* <HowWePartner /> — hidden for now */}
        <Pricing />
        <Landscape />
        <Scale />
        <Team />
        <Cta />
      </main>
    </PresentationProvider>
  );
}
