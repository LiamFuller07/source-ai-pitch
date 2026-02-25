"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Slide } from "./Slide";

const migrations = [
  { from: "QuickBooks", to: "NetSuite" },
  { from: "Xero", to: "NetSuite" },
  { from: "QuickBooks", to: "Dynamics 365" },
  { from: "Xero", to: "Dynamics 365" },
];

const comparisonRows = [
  {
    label: "Timeline",
    traditional: "6–12+ months",
    source: "< 21 days",
  },
  {
    label: "Typical Cost to Client",
    traditional: "$30K–$40K",
    source: "$8K–$15K",
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
          className="mb-8"
        >
          <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
            Pricing
          </p>
          <h2 className="text-[56px] font-semibold tracking-[-0.03em] text-black mb-3">
            Simple Revenue Share
          </h2>
          <p className="text-[20px] text-black/45 max-w-[900px] leading-relaxed">
            Source takes just 30% — you keep 70% with zero delivery cost.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="bg-white border border-black/15 mb-6"
        >
          <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-black/15">
            <div className="px-5 py-3">
              <p className="text-[13px] font-mono uppercase tracking-[0.1em] text-black/30">
                &nbsp;
              </p>
            </div>
            <div className="px-5 py-3 border-l border-black/8">
              <p className="text-[13px] font-mono uppercase tracking-[0.12em] text-black/35 font-medium">
                Traditional
              </p>
            </div>
            <div className="px-5 py-3 border-l border-black/8 bg-black/[0.03]">
              <p className="text-[13px] font-mono uppercase tracking-[0.12em] text-black/70 font-medium">
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
              <div className="px-5 py-3">
                <p className="text-[16px] font-semibold text-black/80">
                  {row.label}
                </p>
              </div>
              <div className="px-5 py-3 border-l border-black/8">
                <p className="text-[16px] text-black/30 line-through decoration-black/15">
                  {row.traditional}
                </p>
              </div>
              <div className="px-5 py-3 border-l border-black/8 bg-black/[0.03]">
                <p className="text-[16px] text-black font-semibold">
                  {row.source}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Supported migration paths */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.22 }}
          className="mb-6 flex items-center gap-6"
        >
          <p className="text-[12px] font-mono uppercase tracking-[0.12em] text-black/35 shrink-0">
            &lt; 21 Day Migrations
          </p>
          <div className="h-[1px] w-6 bg-black/15" />
          <div className="flex items-center gap-2">
            {migrations.map((m, i) => (
              <div key={`${m.from}-${m.to}`} className="flex items-center gap-2">
                <span className="text-[13px] font-mono text-black/50 bg-black/[0.04] px-3 py-1">
                  {m.from} → {m.to}
                </span>
                {i < migrations.length - 1 && (
                  <div className="w-[1px] h-4 bg-black/10" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Revenue split breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="bg-black text-white p-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-10">
            <div>
              <p className="text-[48px] font-bold tracking-[-0.04em] leading-none">
                FREE
              </p>
              <p className="text-[12px] font-mono uppercase tracking-[0.1em] text-white/30 mt-2">
                First migration
              </p>
            </div>
            <div className="w-[1px] h-16 bg-white/10" />
            <div>
              <p className="text-[48px] font-bold tracking-[-0.04em] leading-none">
                30%
              </p>
              <p className="text-[12px] font-mono uppercase tracking-[0.1em] text-white/30 mt-2">
                Source AI fee after
              </p>
            </div>
            <div className="w-[1px] h-16 bg-white/10" />
            <div>
              <p className="text-[48px] font-bold tracking-[-0.04em] leading-none">
                70%
              </p>
              <p className="text-[12px] font-mono uppercase tracking-[0.1em] text-white/30 mt-2">
                You keep
              </p>
            </div>
            <div className="w-[1px] h-16 bg-white/10" />
            <div>
              <p className="text-[24px] font-semibold tracking-[-0.02em] mb-2">
                Try it risk-free.
              </p>
              <p className="text-[16px] text-white/45 leading-relaxed max-w-[500px]">
                Your first migration is on us. After that, Source&apos;s 30% is
                built into the project fee — you keep 70% with zero delivery
                overhead.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
