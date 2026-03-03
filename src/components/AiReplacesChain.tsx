"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  Handshake,
  BadgeDollarSign,
  MessageSquareText,
  ClipboardCheck,
  ScanSearch,
  BrainCircuit,
  Lightbulb,
  Network,
  FileText,
  Route,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Slide } from "./Slide";
import { usePresentationStep } from "./PresentationController";

const engineCapabilities: { label: string; icon: LucideIcon }[] = [
  { label: "System scanning", icon: ScanSearch },
  { label: "Business logic inference", icon: BrainCircuit },
  { label: "Strategy generation", icon: Lightbulb },
  { label: "Data mapping & discovery", icon: Network },
  { label: "BRD generation", icon: FileText },
  { label: "Migration plan", icon: Route },
  { label: "Implementation & config", icon: Wrench },
  { label: "Testing & QA", icon: ShieldCheck },
  { label: "Validation & proof", icon: CheckCircle2 },
  { label: "Go-live execution", icon: Rocket },
];

const oldChainSteps = [
  { label: "End Client", emoji: "🏢" },
  { label: "Sales", emoji: "💼" },
  { label: "Solutions Architect", emoji: "🏗️", crossedOut: true },
  { label: "Offshoring", emoji: "👥", crossedOut: true },
  { label: "Migration Complete", emoji: "🚀" },
];

const consultantRoles = [
  { label: "Relationship", icon: Handshake },
  { label: "Sales & scoping", icon: BadgeDollarSign },
  { label: "Provides context", icon: MessageSquareText },
  { label: "Reviews outputs", icon: ClipboardCheck },
];

// Steps: 1=header, 2-6=before chain (5 items, crossouts animate on next click), 7=after+client, 8=consultant, 9=engine, 10=live, 11=timeline
const TOTAL_STEPS = 11;

export function AiReplacesChain() {
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
      className="flex flex-col justify-center px-[120px]"
    >
      <div className="w-full">
        {/* Step 1: Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isStepVisible(1) ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-[18px] font-mono uppercase tracking-[0.2em] text-black/40 mb-3">
            The Solution
          </p>
          <h2 className="text-[56px] font-semibold tracking-[-0.03em]">
            Source AI Replaces the Delivery Chain
          </h2>
        </motion.div>

        {/* Steps 2-6: BEFORE — each chain step appears, crossouts happen on next click */}
        <div className="mb-8">
          {/* "Before" label appears with first chain step */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isStepVisible(2) ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
            className="text-[14px] font-mono uppercase tracking-[0.15em] text-black/30 mb-4"
          >
            Before
          </motion.p>

          <div className="flex items-center gap-3">
            {oldChainSteps.map((step, i) => {
              const stepNum = 2 + i; // steps 2,3,4,5,6
              const isVisible = isStepVisible(stepNum);
              // Cross out only after the "After" row appears (step 7)
              const isCrossed = step.crossedOut && isStepVisible(7);

              return (
                <div key={step.label} className="flex items-center gap-3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={
                      isVisible
                        ? {
                            opacity: isCrossed ? 0.3 : 1,
                            scale: isCrossed ? 0.95 : 1,
                            y: 0,
                          }
                        : {}
                    }
                    transition={{ duration: 0.4 }}
                    className="border border-black/20 bg-black/[0.02] px-6 py-4 min-w-[180px] relative"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[20px]">{step.emoji}</span>
                      <p
                        className={`text-[15px] text-center transition-all duration-300 ${
                          isCrossed
                            ? "line-through decoration-red-400 decoration-2 text-black/20"
                            : "text-black/40"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  </motion.div>

                  {i < 4 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={
                        isVisible
                          ? { opacity: isCrossed ? 0.05 : 0.15 }
                          : {}
                      }
                      transition={{ duration: 0.3 }}
                      className="text-black/15 text-[26px]"
                    >
                      →
                    </motion.span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Steps 7-11: AFTER */}
        <div>
          {/* Step 7: After label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isStepVisible(7) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <p className="text-[14px] font-mono uppercase tracking-[0.15em] text-black/30">
              After
            </p>
          </motion.div>

          <div className="grid grid-cols-[0.8fr_auto_1.2fr_auto_2.5fr_auto_0.8fr] gap-4 items-stretch">
            {/* Step 7: End Client */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={
                isStepVisible(7) ? { opacity: 1, scale: 1, y: 0 } : {}
              }
              transition={{ duration: 0.4 }}
              className="border border-black/10 p-6 flex flex-col justify-center"
            >
              <p className="text-[14px] font-mono uppercase tracking-[0.1em] text-black/40 mb-3">
                End Client
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/quickbooks-logo.svg"
                alt="QuickBooks"
                className="h-[48px] w-auto max-w-full"
              />
            </motion.div>

            {/* Step 8: Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isStepVisible(8) ? { opacity: 1 } : {}}
              transition={{ duration: 0.3 }}
              className="flex items-center text-black/20 text-[24px]"
            >
              →
            </motion.div>

            {/* Step 8: Consultant */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={
                isStepVisible(8) ? { opacity: 1, scale: 1, y: 0 } : {}
              }
              transition={{ duration: 0.4 }}
              className="border-2 border-black/20 bg-black/[0.02] p-6 flex flex-col justify-center"
            >
              <p className="text-[15px] font-mono font-bold uppercase tracking-[0.1em] text-black/60 mb-5">
                Your Consultant
              </p>
              <div className="space-y-4">
                {consultantRoles.map((role, i) => (
                  <motion.div
                    key={role.label}
                    initial={{ opacity: 0 }}
                    animate={isStepVisible(8) ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <role.icon
                      size={20}
                      className="text-black/30 shrink-0"
                    />
                    <p className="text-[17px] text-black/50 leading-snug">
                      {role.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Step 9: Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isStepVisible(9) ? { opacity: 1 } : {}}
              transition={{ duration: 0.3 }}
              className="flex items-center text-black/20 text-[24px]"
            >
              →
            </motion.div>

            {/* Step 9: Source AI Engine */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={
                isStepVisible(9) ? { opacity: 1, scale: 1, y: 0 } : {}
              }
              transition={{ duration: 0.5 }}
              className="bg-black p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-[15px] font-mono font-medium uppercase tracking-[0.1em] text-white">
                  Source AI Engine
                </p>
                <span className="text-[13px] font-mono uppercase tracking-[0.1em] text-black bg-white px-4 py-2 font-bold">
                  Sub 21 Days
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3.5">
                {engineCapabilities.map((cap, i) => (
                  <motion.div
                    key={cap.label}
                    initial={{ opacity: 0 }}
                    animate={isStepVisible(9) ? { opacity: 1 } : {}}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <cap.icon size={15} className="text-white/35 shrink-0" />
                    <span className="text-[16px] font-medium text-white">{cap.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Step 10: Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isStepVisible(10) ? { opacity: 1 } : {}}
              transition={{ duration: 0.3 }}
              className="flex items-center text-black/20 text-[24px]"
            >
              →
            </motion.div>

            {/* Step 10: Live System */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={
                isStepVisible(10) ? { opacity: 1, scale: 1, y: 0 } : {}
              }
              transition={{ duration: 0.4 }}
              className="border border-black/10 p-6 flex flex-col justify-center"
            >
              <p className="text-[14px] font-mono uppercase tracking-[0.1em] text-black/40 mb-3">
                Live System
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/netsuite-logo.svg"
                alt="NetSuite"
                className="h-[48px] w-auto max-w-full"
              />
            </motion.div>
          </div>

          {/* Step 11: Timeline comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isStepVisible(11) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mt-10 pt-6 border-t border-black/10 space-y-3"
          >
            <div className="flex items-center gap-5">
              <p className="text-[16px] font-mono uppercase tracking-[0.12em] text-black/30 w-[140px] shrink-0 text-right">
                Without
              </p>
              <div className="flex-1 relative h-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isStepVisible(11) ? { width: "100%" } : {}}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="absolute inset-y-0 left-0 flex items-center"
                >
                  <div className="h-[10px] bg-black/20 w-full" />
                </motion.div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isStepVisible(11) ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="text-[18px] font-mono text-black/30 w-[150px] shrink-0"
              >
                3–6+ months
              </motion.p>
            </div>

            <div className="flex items-center gap-5">
              <p className="text-[16px] font-mono uppercase tracking-[0.12em] text-black w-[140px] shrink-0 text-right font-medium">
                With Source
              </p>
              <div className="flex-1 relative h-6">
                <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                  <div className="h-[10px] bg-black/[0.04] w-full" />
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isStepVisible(11) ? { width: "8%" } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: "easeOut",
                  }}
                  className="absolute inset-y-0 left-0 flex items-center"
                >
                  <div className="h-[10px] bg-black w-full" />
                </motion.div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isStepVisible(11) ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="text-[18px] font-mono text-black font-bold w-[150px] shrink-0"
              >
                Under 21 days
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
}
