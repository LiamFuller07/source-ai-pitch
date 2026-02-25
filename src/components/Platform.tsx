"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const capabilities = [
  { num: "01", title: "SYSTEM SCANNING", description: "Connects to QBO, NetSuite, MySQL — reads everything" },
  { num: "02", title: "BUSINESS LOGIC INFERENCE", description: "Understands what's happening vs. what was described" },
  { num: "03", title: "STRATEGY GENERATION", description: "Pain points, workflows, improvement opportunities" },
  { num: "04", title: "QUESTIONNAIRE ENGINE", description: "Generates targeted questions for consultant → end user" },
  { num: "05", title: "BRD GENERATION", description: "Full AS-IS → TO-BE document with hard questions" },
  { num: "06", title: "MIGRATION EXECUTION", description: "Plan, implementation, configuration, data migration" },
];

const badges = [
  { value: "100%", label: "Auditable" },
  { value: "0", label: "Manual Mapping" },
  { value: "Full", label: "Lineage" },
  { value: "Auto", label: "Validation" },
];

export function Platform() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="h-screen flex flex-col justify-center px-6 bg-black">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/30 mb-3">
            Source AI
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-3">
            Migration Intelligence Platform
          </h2>
          <p className="text-white/40 text-sm max-w-2xl mx-auto leading-relaxed">
            Connects directly to your client&apos;s system, reads the structure, infers
            business logic, and generates everything needed — strategy, BRD,
            migration plan, and the migration itself.
          </p>
        </motion.div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-3 gap-px bg-white/5 mt-10 mb-10">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.num}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              className="bg-black p-6 group hover:bg-white/[0.03] transition-colors"
            >
              <span className="text-[24px] font-extralight text-white/8 group-hover:text-white/15 transition-colors">
                {cap.num}
              </span>
              <p className="text-[10px] font-mono font-medium uppercase tracking-[0.08em] text-white mt-3 mb-1.5">
                {cap.title}
              </p>
              <p className="text-[12px] text-white/40 leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Badge strip */}
        <div className="grid grid-cols-4 gap-px bg-white/5">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
              className="bg-black p-5 text-center"
            >
              <p className="text-2xl font-light tracking-[-0.03em] text-white mb-0.5">
                {badge.value}
              </p>
              <p className="text-[9px] font-mono uppercase tracking-[0.1em] text-white/30">
                {badge.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
