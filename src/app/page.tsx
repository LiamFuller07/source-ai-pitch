"use client";

import { Hero } from "@/components/Hero";
import { ProblemToday } from "@/components/ProblemToday";
import { Solution } from "@/components/Solution";
import { AiReplacesChain } from "@/components/AiReplacesChain";
import { WhoDoesWhat } from "@/components/WhoDoesWhat";
import { WhiteLabel } from "@/components/WhiteLabel";
import { WhyPartner } from "@/components/WhyPartner";
import { Pricing } from "@/components/Pricing";
import { Team } from "@/components/Team";
import { Cta } from "@/components/Cta";
import { Nav } from "@/components/Nav";
import { PresentationProvider } from "@/components/PresentationController";

export default function Home() {
  return (
    <PresentationProvider>
      <Nav />
      <main>
        <Hero />
        <ProblemToday />
        <Solution />
        <AiReplacesChain />
        <WhoDoesWhat />
        {/* <WhiteLabel /> */}
        <WhyPartner />
        <Pricing />
        <Team />
        <Cta />
      </main>
    </PresentationProvider>
  );
}
