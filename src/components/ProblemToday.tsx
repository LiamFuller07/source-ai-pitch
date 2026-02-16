"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { icon: "📋", label: "End Client Identifies Need", time: "2–4 wks" },
  { icon: "📞", label: "Scoping & Proposal Writing", time: "3–6 wks" },
  { icon: "🏗", label: "Architecture & Solution Design", time: "4–8 wks" },
  { icon: "🌍", label: "Outsource & Onboard Teams", time: "2–6 wks" },
  { icon: "⚙️", label: "Implementation & Go-Live", time: "8–16 wks" },
];

const painPoints = [
  { icon: "🔄", text: "BRD goes through 3–5 revision cycles" },
  { icon: "🔒", text: "Architecture review requires senior sign-off" },
  { icon: "📈", text: "Scope creep discovered mid-implementation" },
  { icon: "⏳", text: "Outsourced team needs ramp-up time" },
  { icon: "🐛", text: "Data mapping errors found during testing" },
  { icon: "🔀", text: "Client changes requirements after BRD sign-off" },
  { icon: "🚫", text: "Go-live delayed by failed validation" },
  { icon: "💸", text: "Knowledge lost between project phases" },
];

export function ProblemToday() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="h-screen flex flex-col justify-center px-6 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/40 mb-3">
            The Problem
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em]">
            How Migrations Work Today
          </h2>
        </motion.div>

        {/* Horizontal step bars */}
        <div className="space-y-2 mb-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className="flex items-center border-2 border-black/12 hover:border-black/25 transition-colors"
            >
              <div className="flex items-center gap-4 px-5 py-4 flex-1">
                <span className="text-xl">{step.icon}</span>
                <span className="text-[15px] font-semibold tracking-[-0.01em] text-black/80">
                  {step.label}
                </span>
              </div>
              <div className="px-5 py-4 border-l-2 border-black/8 min-w-[120px] text-right">
                <span className="text-[16px] font-bold text-black">{step.time}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total cost + time - larger paragraph */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mb-8 py-5 border-y-2 border-black/10"
        >
          <p className="text-3xl font-bold tracking-[-0.02em]">
            6–12+ months end-to-end.{" "}
            <span className="text-red-500">$150K–$350K+</span>
          </p>
          <p className="text-[15px] text-black/40 mt-2">
            And that&apos;s the optimistic version. Most ERP migrations blow past timelines and budgets.
          </p>
        </motion.div>

        {/* Pain points */}
        <div className="grid grid-cols-4 gap-2">
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.7 + i * 0.04 }}
              className="flex items-start gap-2.5 py-3 px-3.5 border border-red-200 bg-red-50/50"
            >
              <span className="text-[14px] shrink-0">{point.icon}</span>
              <span className="text-[11px] text-black/60 leading-snug font-medium">
                {point.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
