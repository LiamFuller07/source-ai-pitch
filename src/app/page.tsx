"use client";

import { Hero } from "@/components/Hero";
import { ProblemToday } from "@/components/ProblemToday";
import { Solution } from "@/components/Solution";
import { AiReplacesChain } from "@/components/AiReplacesChain";
import { WhoDoesWhat } from "@/components/WhoDoesWhat";
import { DemoVideo } from "@/components/DemoVideo";
import { WhiteLabel } from "@/components/WhiteLabel";
import { WhyPartner } from "@/components/WhyPartner";
import { Pricing } from "@/components/Pricing";
import { Partners } from "@/components/Partners";
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
        <DemoVideo />
        {/* <WhiteLabel /> */}
        <WhyPartner />
        <Pricing />
        <Partners />
        <Team />
        <Cta />
      </main>
    </PresentationProvider>
  );
}
