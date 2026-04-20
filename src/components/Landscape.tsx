"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";
import { Slide } from "./Slide";

const sourcePros = [
  "Owns the full engagement, end to end",
  "Does the consultant's work — not just assists",
  "Direct AI lift on margin every engagement",
  "Collapses timelines from weeks to days",
  "Fixed fee, locked in 24h",
];

const sourceCons = [
  "Not a shelf-bought SaaS tool",
  "Scoped per engagement, not self-serve",
  "Requires partner-level buy-in, not a vendor checklist",
  "ERP / migration domain first (other workflows later)",
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
            Everything else is a productivity tool.
          </h2>
        </motion.div>

        {/* Source pros / trade-offs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black text-white rounded-md p-10"
        >
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-[13px] font-mono uppercase tracking-[0.18em] text-white/45 font-bold">
                Source
              </span>
              <p className="text-[28px] font-semibold tracking-[-0.02em] mt-1 text-white">
                Partner-class agent — not a tool.
              </p>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-white/35 shrink-0 ml-8">
              What changes when you bring on a partner
            </span>
          </div>

          <div className="grid grid-cols-2 gap-12">
            {/* Pros */}
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/55 font-bold mb-4">
                Pros
              </p>
              <ul className="space-y-3">
                {sourcePros.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-[17px] text-white leading-[1.4]"
                  >
                    <Check
                      size={18}
                      strokeWidth={2.5}
                      className="mt-[4px] shrink-0 text-emerald-400"
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trade-offs */}
            <div className="border-l border-white/[0.10] pl-12">
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/55 font-bold mb-4">
                Trade-offs
              </p>
              <ul className="space-y-3">
                {sourceCons.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-[17px] text-white/70 leading-[1.4]"
                  >
                    <X
                      size={18}
                      strokeWidth={2.5}
                      className="mt-[4px] shrink-0 text-white/35"
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
