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
    time: "2–4 wks",
  },
  {
    label: "Sales & Scoping",
    emoji: "💼",
    detail: "Discovery calls, needs analysis, proposal writing, SOW negotiation",
    time: "3–6 wks",
  },
  {
    label: "Solutions Architecture",
    emoji: "🏗️",
    detail: "Schema analysis, gap assessment, AS-IS → TO-BE mapping, BRD creation",
    time: "4–8 wks",
  },
  {
    label: "Resource & Team Build",
    emoji: "👥",
    detail: "Find offshore/onshore devs, onboard, ramp up on client systems",
    time: "2–6 wks",
  },
  {
    label: "Implementation & Config",
    emoji: "⚙️",
    detail: "Data migration, custom development, integrations, UAT, bug fixing",
    time: "6–12 wks",
  },
  {
    label: "Go-Live & Handover",
    emoji: "🚀",
    detail: "Cutover planning, validation, training, hypercare, documentation",
    time: "2–4 wks",
  },
];

export function ProblemToday() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { setMaxSteps, resetSteps, isStepVisible } = usePresentationStep();

  useEffect(() => {
    if (inView) {
      setMaxSteps(steps.length);
      resetSteps();
    }
  }, [inView, setMaxSteps, resetSteps]);

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
          <h2 className="text-[56px] font-semibold tracking-[-0.03em] mb-5">
            How Migrations Work Today
          </h2>
          <p className="text-[24px] text-black/50 max-w-[900px] leading-relaxed">
            Every ERP migration follows the same painful playbook — months of
            scoping, offshoring, rework, and budget overruns before a single
            system goes live.
          </p>
        </motion.div>

        <div className="relative space-y-[-1px]">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="relative flex items-center"
              style={{ paddingLeft: `${i * 6}%` }}
            >
              {i > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isStepVisible(i + 1) ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-2 bg-black/10"
                  style={{
                    left: `calc(${i * 6}% + 32px)`,
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
                className="flex-1 max-w-[800px]"
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
                  <div className="pr-4 shrink-0">
                    <p className="text-[16px] font-mono font-bold text-black/40">
                      {step.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
