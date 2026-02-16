"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const columns = [
  {
    title: "SOURCE AI",
    count: "9",
    subtitle: "HANDLED AUTONOMOUSLY",
    items: [
      "System scanning & schema analysis",
      "Business logic inference",
      "Strategy & pain point identification",
      "Questionnaire generation",
      "Draft BRD (AS-IS → TO-BE)",
      "Migration plan generation",
      "Implementation & configuration",
      "Data migration execution",
      "Validation & proof artifacts",
    ],
    highlight: true,
  },
  {
    title: "CONSULTANT",
    count: "5",
    subtitle: "REVIEW & CONFIRM",
    items: [
      "Provides initial context",
      "Reviews Source AI outputs",
      "Delivers questions to end user",
      "Confirms BRD with end user",
      "Signs off on migration plan",
    ],
    highlight: false,
  },
  {
    title: "END USER",
    count: "4",
    subtitle: "ANSWER & APPROVE",
    items: [
      "Answers questionnaires",
      "Confirms business requirements",
      "Signs off on TO-BE state",
      "Accepts final migration",
    ],
    highlight: false,
  },
];

export function WhoDoesWhat() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="h-screen flex flex-col justify-center px-6 bg-[#f8f8f8]">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
            Responsibility Matrix
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-black">
            Who Does What
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-[1px]">
          {columns.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className={`bg-white p-8 ${
                col.highlight ? "border-t-2 border-t-black" : "border-t border-t-black/10"
              }`}
            >
              <p className="text-[11px] font-mono font-medium uppercase tracking-[0.15em] text-black/80 mb-5">
                {col.title}
              </p>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-[56px] font-extralight leading-none tracking-[-0.04em] text-black">
                  {col.count}
                </span>
                <span className="text-[10px] font-mono text-black/30 uppercase tracking-[0.1em]">
                  {col.subtitle}
                </span>
              </div>
              <div className="space-y-2.5">
                {col.items.map((item, j) => (
                  <div
                    key={j}
                    className="flex items-start gap-2.5 text-[13px] text-black/50"
                  >
                    <span className="text-black/20 mt-0.5 shrink-0">—</span>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-[13px] text-black/50 mt-8"
        >
          Source AI does the technical execution end-to-end. The consultant keeps
          the client relationship, domain expertise, and commercial ownership.
        </motion.p>
      </div>
    </section>
  );
}
