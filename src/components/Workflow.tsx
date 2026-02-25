"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "DISCOVERY",
    owner: "SOURCE AI",
    description:
      "Transcript + document intake. Builds a profile: systems, goals, employees, growth, pain points.",
  },
  {
    num: "02",
    title: "INITIAL SYSTEM SCAN",
    owner: "SOURCE AI",
    description:
      "Confirms access (e.g. QBO). Generic understanding + context from consultant. Backs up or challenges what the customer said.",
  },
  {
    num: "03",
    title: "DEEP RESCAN",
    owner: "SOURCE AI",
    description:
      "Establishes ground truth. Infers business logic, identifies what's actually happening in the data vs. what was described.",
  },
  {
    num: "04",
    title: "STRATEGY & PAIN POINTS",
    owner: "SOURCE AI",
    description:
      "Identifies pain points, business workflows, and improvement opportunities. Generates strategic recommendations.",
  },
  {
    num: "05",
    title: "QUESTIONNAIRES",
    owner: "AI → CONSULTANT → USER",
    description:
      "Source AI generates targeted questions. Consultant delivers to end user. Practical decisions: what changes, what stays.",
  },
  {
    num: "06",
    title: "BRD GENERATION",
    owner: "SOURCE AI",
    description:
      "Full Business Requirements Document. AS-IS documented. Hard questions generated. Edited BRD confirms AS-IS → TO-BE.",
  },
  {
    num: "07",
    title: "MIGRATION EXECUTION",
    owner: "SOURCE AI",
    description:
      "Implementation plan generated. Source executes: implementation, configuration, data migration. Done.",
  },
];

export function Workflow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="h-screen flex flex-col justify-center px-6 bg-white">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/40 mb-3">
            The Process
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold font-[family-name:var(--font-display)] tracking-[-0.03em]">
            The Source AI Workflow
          </h2>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
              className="border-t border-black/5 py-4 grid grid-cols-[50px_160px_1fr] gap-4 items-baseline group hover:bg-black/[0.01] transition-colors px-2"
            >
              <span className="text-[28px] font-extralight text-black/10 group-hover:text-black/25 transition-colors">
                {step.num}
              </span>
              <div>
                <p className="text-[10px] font-mono font-medium uppercase tracking-[0.05em]">
                  {step.title}
                </p>
                <p className="text-[9px] font-mono uppercase tracking-[0.08em] text-black/30">
                  {step.owner}
                </p>
              </div>
              <p className="text-[12px] text-black/60 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
          <div className="border-t border-black/5" />
        </div>
      </div>
    </section>
  );
}
