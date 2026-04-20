"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";
import { Slide } from "./Slide";

const rows: { tool: string; source: string }[] = [
  {
    tool: "Assists on narrow tasks",
    source: "Owns the full engagement, end to end",
  },
  {
    tool: "Breaks on edge cases and judgment",
    source: "Does the consultant's work — not just assists",
  },
  {
    tool: "No direct impact on margin",
    source: "Direct AI lift on margin every engagement",
  },
  {
    tool: "Leaves timelines untouched",
    source: "Collapses timelines from weeks to days",
  },
  {
    tool: "Billed hourly / T&M — scope creep risk",
    source: "Fixed fee, locked in 24h",
  },
];

export function Landscape() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide ref={ref} bg="bg-[#f8f8f8]" className="flex flex-col justify-center px-[120px]">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
            Landscape
          </p>
          <h2 className="text-[56px] font-semibold tracking-[-0.03em] text-black">
            Source is an AI partner, not a tool.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black text-white rounded-md p-10"
        >
          {/* Column headers */}
          <div className="grid grid-cols-2 gap-12 mb-6 pb-5 border-b border-white/[0.10]">
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] font-mono uppercase tracking-[0.18em] text-white/45 font-bold">
                Tool
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-white/30">
                Productivity add-on
              </span>
            </div>
            <div className="flex items-baseline justify-between pl-12">
              <span className="text-[13px] font-mono uppercase tracking-[0.18em] text-emerald-400 font-bold">
                Source — AI partner
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-white/30">
                Owns the engagement
              </span>
            </div>
          </div>

          {/* Comparison rows */}
          <div className="grid grid-cols-2 gap-12">
            {/* Tool column */}
            <ul className="space-y-4">
              {rows.map((r) => (
                <li
                  key={r.tool}
                  className="flex items-start gap-3 text-[17px] text-white/55 leading-[1.4]"
                >
                  <X size={18} strokeWidth={2.5} className="mt-[4px] shrink-0 text-white/30" />
                  <span>{r.tool}</span>
                </li>
              ))}
            </ul>

            {/* Source column */}
            <ul className="space-y-4 border-l border-white/[0.10] pl-12">
              {rows.map((r) => (
                <li
                  key={r.source}
                  className="flex items-start gap-3 text-[17px] text-white leading-[1.4] font-medium"
                >
                  <Check size={18} strokeWidth={2.5} className="mt-[4px] shrink-0 text-emerald-400" />
                  <span>{r.source}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
