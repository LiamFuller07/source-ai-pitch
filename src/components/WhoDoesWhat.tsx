"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Slide } from "./Slide";
import { usePresentationStep } from "./PresentationController";

const columns = [
  {
    title: "Source AI",
    subtitle: "Handled Autonomously",
    items: [
      "System scanning & schema analysis",
      "Business logic inference",
      "Strategy & pain point identification",
      "Questionnaire generation",
      "Draft BRD (AS-IS to TO-BE)",
      "Migration plan generation",
      "Implementation & configuration",
      "Data migration execution",
      "Validation & proof artifacts",
    ],
    highlight: true,
  },
  {
    title: "Consultant",
    subtitle: "Review & Confirm",
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
    title: "End User",
    subtitle: "Answer & Approve",
    items: [
      "Answers questionnaires",
      "Confirms business requirements",
      "Signs off on TO-BE state",
      "Accepts final migration",
    ],
    highlight: false,
  },
];

const TOTAL_STEPS = 5;

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
      bg="bg-[#f8f8f8]"
      className="flex items-stretch px-[60px] py-[50px]"
    >
      <div className="w-full h-full grid grid-cols-[420px_1fr] gap-10">
        {/* Step 2: SVG Flowchart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isStepVisible(2) ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="overflow-hidden flex items-center justify-center"
        >
          <img
            src="/who-does-what-diagram.svg"
            alt="Who Does What — Flowchart"
            className="w-full h-full"
            style={{ objectFit: "contain", objectPosition: "center center" }}
          />
        </motion.div>

        {/* RIGHT: Header + Responsibility Matrix */}
        <div className="flex flex-col justify-center min-w-0">
          {/* Step 1: Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isStepVisible(1) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
              Responsibility Matrix
            </p>
            <h2 className="text-[60px] font-semibold tracking-[-0.03em] text-black mb-5">
              Who Does What
            </h2>
            <p className="text-[22px] text-black/45 leading-relaxed">
              <span className="font-semibold text-black">Source AI</span> does the
              technical execution end-to-end.{" "}
              <span className="font-semibold text-black">The consultant</span> keeps
              the client relationship, domain expertise, and commercial ownership.
            </p>
          </motion.div>

          {/* Steps 3-5: Three columns */}
          <div className="grid grid-cols-3 gap-[1px]">
            {columns.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isStepVisible(3 + i) ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className={`bg-white p-8 ${
                  col.highlight
                    ? "border-t-2 border-t-black"
                    : "border-t border-t-black/10"
                }`}
              >
                <p className="text-[24px] font-bold tracking-[-0.01em] text-black mb-1">
                  {col.title}
                </p>
                <p className="text-[12px] font-mono text-black/30 uppercase tracking-[0.1em] mb-6">
                  {col.subtitle}
                </p>
                <div className="space-y-4">
                  {col.items.map((item, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0 }}
                      animate={isStepVisible(3 + i) ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: j * 0.06 }}
                      className="flex items-start gap-2.5 text-[16px] text-black/50"
                    >
                      <span className="text-black/20 mt-0.5 shrink-0">—</span>
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
