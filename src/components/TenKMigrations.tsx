"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Slide } from "./Slide";

const stats = [
  {
    value: "$10K",
    label: "Fixed price",
    description: "No hourly surprises. One quote, one invoice.",
  },
  {
    value: "10 Days",
    label: "Start to live",
    description: "Not months. Not quarters. Days.",
  },
  {
    value: "80%",
    label: "AI-automated",
    description: "Source handles migration, config, and testing.",
  },
];

const beforeItems = [
  "$30K–$50K",
  "3–6 months",
  "Scope creep",
  "T&M billing",
];

const afterItems = [
  "$10K fixed",
  "10 days",
  "AI-validated",
  "Predictable",
];

export function TenKMigrations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-white"
      className="flex flex-col justify-center px-[120px]"
    >
      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[14px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
            The Offer
          </p>
          <h2 className="text-[72px] font-semibold tracking-[-0.04em] leading-tight mb-3">
            $10K. 10 Days. Done.
          </h2>
          <p className="text-[20px] text-black/45 max-w-[900px] leading-relaxed">
            QuickBooks to NetSuite — fully migrated, configured, and live.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              className="border border-black/10 p-8 hover:border-black/25 transition-colors"
            >
              <p className="text-[48px] font-bold tracking-[-0.03em] text-black leading-none mb-1">
                {stat.value}
              </p>
              <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/30 mb-4">
                {stat.label}
              </p>
              <p className="text-[15px] text-black/50 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Before vs After bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="bg-black text-white p-8 flex items-center justify-between"
        >
          {/* Before */}
          <div className="flex items-center gap-8">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/30 mb-2">
                Before Source
              </p>
              <div className="flex items-center gap-4">
                {beforeItems.map((item) => (
                  <span
                    key={item}
                    className="text-[15px] text-white/30 line-through decoration-white/15"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="text-[20px] text-white/20 px-6">→</div>

          {/* After */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/50 mb-2">
              After Source
            </p>
            <div className="flex items-center gap-4">
              {afterItems.map((item) => (
                <span
                  key={item}
                  className="text-[15px] text-white font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
