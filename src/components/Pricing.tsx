"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Slide } from "./Slide";

const comparisonRows = [
  {
    label: "Timeline",
    traditional: "6–12+ months",
    source: "< 14 days",
  },
  {
    label: "Typical Cost to Client",
    traditional: "$150K–$350K+",
    source: "$30K–$80K",
  },
  {
    label: "BRD Revisions",
    traditional: "3–5 cycles, weeks of delay",
    source: "AI-generated, instant updates",
  },
  {
    label: "Scope Creep Risk",
    traditional: "High — discovered mid-build",
    source: "Low — system scan upfront",
  },
  {
    label: "Offshore Team Ramp-up",
    traditional: "2–6 weeks onboarding",
    source: "No team needed",
  },
  {
    label: "Client Satisfaction",
    traditional: "Frustrated by delays & overruns",
    source: "Fast, transparent, fewer surprises",
  },
  {
    label: "Pricing Model",
    traditional: "T&M — unpredictable bills",
    source: "Fixed price — locked quote upfront",
  },
];

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col justify-center px-[120px]"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-[18px] font-mono uppercase tracking-[0.2em] text-black/30 mb-4">
            Pricing
          </p>
          <h2 className="text-[72px] font-semibold tracking-[-0.03em] text-black mb-4">
            Simple Revenue Share
          </h2>
          <p className="text-[24px] text-black/45 max-w-[900px] leading-relaxed">
            First migration free. After that, pricing is negotiated as a revenue
            share. No subscriptions, no per-seat fees.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="bg-white border border-black/15 mb-8"
        >
          <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-black/15">
            <div className="p-6">
              <p className="text-[14px] font-mono uppercase tracking-[0.1em] text-black/30">
                &nbsp;
              </p>
            </div>
            <div className="p-6 border-l border-black/8">
              <p className="text-[14px] font-mono uppercase tracking-[0.12em] text-black/35 font-medium">
                Traditional
              </p>
            </div>
            <div className="p-6 border-l border-black/8 bg-black/[0.03]">
              <p className="text-[14px] font-mono uppercase tracking-[0.12em] text-black/70 font-medium">
                With Source AI
              </p>
            </div>
          </div>

          {comparisonRows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-black/8 last:border-b-0"
            >
              <div className="px-6 py-4">
                <p className="text-[18px] font-semibold text-black/80">
                  {row.label}
                </p>
              </div>
              <div className="px-6 py-4 border-l border-black/8">
                <p className="text-[18px] text-black/30 line-through decoration-black/15">
                  {row.traditional}
                </p>
              </div>
              <div className="px-6 py-4 border-l border-black/8 bg-black/[0.03]">
                <p className="text-[18px] text-black font-semibold">
                  {row.source}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Design Partner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="bg-black text-white p-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-12">
            <div>
              <p className="text-[64px] font-bold tracking-[-0.04em] leading-none">
                $0
              </p>
              <p className="text-[14px] font-mono uppercase tracking-[0.1em] text-white/30 mt-2">
                First migration
              </p>
            </div>
            <div className="w-[1px] h-20 bg-white/10" />
            <div>
              <p className="text-[28px] font-semibold tracking-[-0.02em] mb-3">
                We&apos;re looking for design partners.
              </p>
              <p className="text-[18px] text-white/45 leading-relaxed max-w-[600px]">
                Your first migration is completely free — see the full output
                before any commitment. After that, pricing is negotiated as a
                revenue share.
              </p>
            </div>
          </div>
          <div className="shrink-0 ml-10">
            <div className="border border-white/20 px-6 py-4">
              <p className="text-[14px] font-mono uppercase tracking-[0.12em] text-white/60">
                Design Partner
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
