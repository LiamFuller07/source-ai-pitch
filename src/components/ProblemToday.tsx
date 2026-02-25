"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { usePresentationStep } from "./PresentationController";
import { Slide } from "./Slide";

const steps = [
  {
    label: "End Client",
    emoji: "🏢",
    detail: "Identifies need, issues RFP, evaluates vendors",
  },
  {
    label: "Sales & Scoping",
    emoji: "💼",
    detail: "Discovery calls, needs analysis, proposal writing, SOW negotiation",
  },
  {
    label: "Solutions Architecture",
    emoji: "🏗️",
    detail: "Schema analysis, gap assessment, AS-IS → TO-BE mapping, BRD creation",
  },
  {
    label: "Resource & Team Build",
    emoji: "👥",
    detail: "Find offshore/onshore devs, onboard, ramp up on client systems",
  },
  {
    label: "Implementation & Config",
    emoji: "⚙️",
    detail: "Data migration, custom development, integrations, UAT, bug fixing",
  },
  {
    label: "Go-Live & Handover",
    emoji: "🚀",
    detail: "Cutover planning, validation, training, hypercare, documentation",
  },
];

export function ProblemToday() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { setMaxSteps, resetSteps, isStepVisible } = usePresentationStep();

  useEffect(() => {
    if (inView) {
      setMaxSteps(steps.length + 1); // +1 for the timeline bar
      resetSteps();
    }
  }, [inView, setMaxSteps, resetSteps]);

  const allStepsVisible = isStepVisible(steps.length + 1);

  return (
    <Slide ref={ref} bg="bg-white" className="flex flex-col justify-center px-[120px]">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[18px] font-mono uppercase tracking-[0.2em] text-black/40 mb-3">
            The Problem
          </p>
          <h2 className="text-[56px] font-semibold font-[family-name:var(--font-display)] tracking-[-0.03em] mb-0">
            How Migrations Work Today
          </h2>
          <div className="w-[120px] h-[2px] bg-black/10 mt-4" />
        </motion.div>

        <div className="relative space-y-[-1px]">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="relative flex items-center"
              style={{ paddingLeft: `${i * 10}%` }}
            >
              {i > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isStepVisible(i + 1) ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-2 bg-black/10"
                  style={{
                    left: `calc(${i * 10}% + 32px)`,
                    width: "1px",
                    height: "8px",
                  }}
                />
              )}

              <motion.div
                initial={{ opacity: 0, x: -10, y: 8 }}
                animate={
                  isStepVisible(i + 1)
                    ? { opacity: 1, x: 0, y: 0 }
                    : { opacity: 0, x: -10, y: 8 }
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex-1 max-w-[700px]"
              >
                <div className="border border-black/10 bg-white flex items-center">
                  <div className="w-14 shrink-0 flex items-center justify-center border-r border-black/8 self-stretch bg-black/[0.02]">
                    <span className="text-[14px] font-mono font-bold text-black/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3.5 flex-1 min-w-0">
                    <span className="text-[24px] shrink-0">{step.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[20px] font-semibold tracking-[-0.01em] text-black leading-tight">
                        {step.label}
                      </p>
                      <p className="text-[15px] text-black/35 leading-snug">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Timeline bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={allStepsVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <div className="relative h-[6px] bg-black/[0.06] w-full">
            <motion.div
              initial={{ width: 0 }}
              animate={allStepsVisible ? { width: "100%" } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="absolute inset-y-0 left-0 bg-black/30"
            />
          </div>
          <div className="flex justify-between mt-3">
            <p className="text-[14px] font-mono text-black/25">Month 0</p>
            <p className="text-[20px] font-mono font-bold text-black/60 tracking-[-0.02em]">
              2 – 6+ months typical
            </p>
            <p className="text-[14px] font-mono text-black/25">Month 6+</p>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
