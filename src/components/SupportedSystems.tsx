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

export function SupportedSystems() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-white"
      className="flex flex-col items-center justify-center px-[120px]"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[18px] font-mono uppercase tracking-[0.2em] text-black/30 mb-4">
            Supported Systems
          </p>
          <h2 className="text-[64px] font-semibold tracking-[-0.03em] text-black mb-4">
            Migration paths we cover.
          </h2>
          <p className="text-[22px] text-black/40 max-w-[700px] mx-auto leading-relaxed">
            Source AI handles the full migration between these platforms — end to end.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 max-w-[1100px] mx-auto">
          {migrations.map((m, i) => (
            <motion.div
              key={`${m.from}-${m.to}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="border-2 border-black/10 p-10 flex items-center justify-between hover:border-black/25 transition-colors"
            >
              <div className="flex-1">
                <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-black/25 mb-2">
                  From
                </p>
                <p className="text-[32px] font-bold tracking-[-0.02em] text-black">
                  {m.from}
                </p>
              </div>

              <div className="mx-8 flex flex-col items-center gap-1">
                <ArrowRight size={28} className="text-black/20" />
                <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-black/15">
                  Source AI
                </p>
              </div>

              <div className="flex-1 text-right">
                <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-black/25 mb-2">
                  To
                </p>
                <p className="text-[32px] font-bold tracking-[-0.02em] text-black">
                  {m.to}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
