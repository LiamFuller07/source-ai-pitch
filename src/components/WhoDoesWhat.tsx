"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Bot, User, Building2, ArrowDown, Check } from "lucide-react";
import { Slide } from "./Slide";
import { usePresentationStep } from "./PresentationController";

const TOTAL_STEPS = 4;

const sourceItems = [
  "System scanning & schema analysis",
  "Business logic inference",
  "Strategy & pain point identification",
  "Questionnaire generation",
  "Draft BRD (AS-IS to TO-BE)",
  "Migration plan generation",
  "Implementation & configuration",
  "Data migration execution",
  "Validation & proof artifacts",
];

const consultantItems = [
  "Provides initial context",
  "Reviews Source AI outputs",
  "Delivers questions to end user",
  "Confirms BRD with end user",
  "Signs off on migration plan",
];

const endUserItems = [
  "Answers questionnaires",
  "Confirms business requirements",
  "Signs off on TO-BE state",
  "Accepts final migration",
];

export function WhoDoesWhat() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { setMaxSteps, resetSteps, isStepVisible } = usePresentationStep();

  useEffect(() => {
    if (inView) {
      setMaxSteps(TOTAL_STEPS);
      resetSteps();
    }
  }, [inView, setMaxSteps, resetSteps]);

  return (
    <Slide
      ref={ref}
      bg="bg-white"
      className="flex flex-col justify-center px-[100px]"
    >
      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isStepVisible(1) ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[18px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
            Responsibility Matrix
          </p>
          <h2 className="text-[60px] font-semibold tracking-[-0.03em] text-black mb-4">
            Who Does What
          </h2>
          <p className="text-[22px] text-black/45 leading-relaxed max-w-[900px]">
            <span className="font-semibold text-black">Source AI</span> does the
            technical execution end-to-end.{" "}
            <span className="font-semibold text-black">The consultant</span> keeps
            the client relationship, domain expertise, and commercial ownership.
          </p>
        </motion.div>

        {/* Three columns */}
        <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-5">
          {/* Source AI — primary column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isStepVisible(2) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-black text-white p-8 relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-2">
              <Bot size={22} className="text-white/60" />
              <p className="text-[24px] font-bold tracking-[-0.01em]">
                Source AI
              </p>
            </div>
            <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/30 mb-6">
              Handled Autonomously
            </p>
            <div className="space-y-3.5">
              {sourceItems.map((item, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isStepVisible(2) ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: j * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <Check size={14} className="text-white/30 shrink-0" />
                  <span className="text-[15px] text-white/70">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Item count badge */}
            <div className="absolute top-8 right-8">
              <span className="text-[48px] font-bold text-white/[0.06] leading-none">
                {sourceItems.length}
              </span>
            </div>
          </motion.div>

          {/* Consultant */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isStepVisible(3) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="border-2 border-black/12 p-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <User size={22} className="text-black/40" />
              <p className="text-[24px] font-bold tracking-[-0.01em] text-black">
                Consultant
              </p>
            </div>
            <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/25 mb-6">
              Review & Confirm
            </p>
            <div className="space-y-4">
              {consultantItems.map((item, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0 }}
                  animate={isStepVisible(3) ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: j * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black/15 shrink-0" />
                  <span className="text-[15px] text-black/50">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* End User */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isStepVisible(4) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="border border-black/8 p-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Building2 size={22} className="text-black/40" />
              <p className="text-[24px] font-bold tracking-[-0.01em] text-black">
                End User
              </p>
            </div>
            <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/25 mb-6">
              Answer & Approve
            </p>
            <div className="space-y-4">
              {endUserItems.map((item, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0 }}
                  animate={isStepVisible(4) ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: j * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black/10 shrink-0" />
                  <span className="text-[15px] text-black/50">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Flow summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isStepVisible(4) ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-6 py-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-black" />
            <span className="text-[13px] font-mono text-black/40">
              9 tasks automated
            </span>
          </div>
          <span className="text-black/15">|</span>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-black/15" />
            <span className="text-[13px] font-mono text-black/40">
              5 tasks review only
            </span>
          </div>
          <span className="text-black/15">|</span>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border border-black/8" />
            <span className="text-[13px] font-mono text-black/40">
              4 tasks approve only
            </span>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
