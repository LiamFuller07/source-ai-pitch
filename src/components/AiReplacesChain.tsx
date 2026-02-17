"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Handshake,
  BadgeDollarSign,
  MessageSquareText,
  ClipboardCheck,
} from "lucide-react";
import { Slide } from "./Slide";

const engineCapabilities = [
  "System scanning",
  "Business logic inference",
  "Strategy generation",
  "Data mapping & discovery",
  "BRD generation",
  "Migration plan",
  "Implementation & config",
  "Testing & QA",
  "Validation & proof",
  "Go-live execution",
];

export function AiReplacesChain() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [currentStep, setCurrentStep] = useState(0);
  const maxSteps = 12;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentStep((prev) => Math.min(prev + 1, maxSteps));
      } else if (e.key === "ArrowLeft") {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const oldChainSteps = [
    { label: "End Client", emoji: "🏢" },
    { label: "Sales", emoji: "💼" },
    { label: "Solutions Architect", emoji: "🏗️" },
    { label: "Offshoring", emoji: "👥" },
    { label: "Migration Complete", emoji: "🚀" },
  ];

  const isBoxVisible = (index: number) => currentStep >= index + 1;

  const isCrossedOut = (index: number) => {
    if (index === 2) return currentStep >= 6;
    if (index === 3) return currentStep >= 7;
    return false;
  };

  const showAfter = currentStep >= 8;

  return (
    <Slide
      ref={ref}
      bg="bg-white"
      className="flex flex-col justify-center px-[100px]"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-5"
        >
          <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/40 mb-2">
            The Solution
          </p>
          <h2 className="text-[42px] font-semibold tracking-[-0.03em]">
            Source AI Replaces the Delivery Chain
          </h2>
        </motion.div>

        {/* BEFORE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="mb-5"
        >
          <p className="text-[14px] font-mono uppercase tracking-[0.15em] text-black/30 mb-4">
            Before
          </p>

          <div className="flex items-center gap-4">
            {oldChainSteps.map((step, i) => {
              const crossed = isCrossedOut(i);
              return (
                <div key={step.label} className="flex items-center gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{
                      opacity: isBoxVisible(i) ? (crossed ? 0.3 : 1) : 0,
                      scale: isBoxVisible(i) ? (crossed ? 0.95 : 1) : 0.8,
                      y: isBoxVisible(i) ? 0 : 20,
                    }}
                    transition={{ duration: 0.4 }}
                    className="border border-black/20 bg-black/[0.02] px-7 py-4 min-w-[200px] relative"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-[24px]">{step.emoji}</span>
                      <p
                        className={`text-[18px] text-center ${crossed ? "line-through decoration-red-400 decoration-2 text-black/20" : "text-black/40"}`}
                      >
                        {step.label}
                      </p>
                    </div>
                  </motion.div>

                  {i < 4 && (
                    <motion.span
                      animate={{
                        opacity: isBoxVisible(i)
                          ? crossed
                            ? 0.05
                            : 0.15
                          : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-black/15 text-[28px]"
                    >
                      →
                    </motion.span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* AFTER */}
        <AnimatePresence>
          {showAfter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-4">
                <p className="text-[14px] font-mono uppercase tracking-[0.15em] text-black/30">
                  After
                </p>
              </div>

              <div className="grid grid-cols-[1fr_auto_1.4fr_auto_2.5fr_auto_1fr] gap-5 items-stretch">
                {/* End Client */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="border border-black/10 p-8 flex flex-col justify-center min-h-[240px]"
                >
                  <p className="text-[16px] font-mono uppercase tracking-[0.1em] text-black/40 mb-3">
                    End Client
                  </p>
                  <p className="text-[28px] font-bold text-black leading-relaxed">
                    QuickBooks
                  </p>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentStep >= 9 ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center text-black/20 text-[28px]"
                >
                  →
                </motion.div>

                {/* Consultant */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{
                    opacity: currentStep >= 9 ? 1 : 0,
                    scale: currentStep >= 9 ? 1 : 0.8,
                    y: currentStep >= 9 ? 0 : 20,
                  }}
                  transition={{ duration: 0.4 }}
                  className="border-2 border-black/20 bg-black/[0.02] p-8 flex flex-col justify-center min-h-[240px]"
                >
                  <p className="text-[18px] font-mono font-bold uppercase tracking-[0.1em] text-black/60 mb-6">
                    Your Consultant
                  </p>
                  <div className="space-y-5">
                    {[
                      { label: "Relationship", icon: Handshake },
                      { label: "Sales & scoping", icon: BadgeDollarSign },
                      { label: "Provides context", icon: MessageSquareText },
                      { label: "Reviews outputs", icon: ClipboardCheck },
                    ].map((role, i) => (
                      <motion.div
                        key={role.label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentStep >= 9 ? 1 : 0 }}
                        transition={{
                          duration: 0.3,
                          delay: currentStep >= 9 ? i * 0.1 : 0,
                        }}
                        className="flex items-center gap-4"
                      >
                        <role.icon
                          size={22}
                          className="text-black/30 shrink-0"
                        />
                        <p className="text-[20px] text-black/50 leading-snug">
                          {role.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentStep >= 10 ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center text-black/20 text-[28px]"
                >
                  →
                </motion.div>

                {/* Source AI Engine */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{
                    opacity: currentStep >= 10 ? 1 : 0,
                    scale: currentStep >= 10 ? 1 : 0.8,
                    y: currentStep >= 10 ? 0 : 20,
                  }}
                  transition={{ duration: 0.5 }}
                  className="bg-black p-8 min-h-[240px]"
                >
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[18px] font-mono font-medium uppercase tracking-[0.1em] text-white">
                      Source AI Engine
                    </p>
                    <span className="text-[14px] font-mono uppercase tracking-[0.1em] text-black bg-white px-5 py-2.5 font-bold">
                      &lt; 14 Days
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {engineCapabilities.map((cap, i) => (
                      <motion.div
                        key={cap}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentStep >= 10 ? 1 : 0 }}
                        transition={{
                          delay: currentStep >= 10 ? i * 0.05 : 0,
                        }}
                        className="flex items-center gap-3 whitespace-nowrap"
                      >
                        <div className="w-3 h-3 bg-white shrink-0" />
                        <span className="text-[18px] text-white/70">
                          {cap}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentStep >= 11 ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center text-black/20 text-[28px]"
                >
                  →
                </motion.div>

                {/* Live System */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{
                    opacity: currentStep >= 11 ? 1 : 0,
                    scale: currentStep >= 11 ? 1 : 0.8,
                    y: currentStep >= 11 ? 0 : 20,
                  }}
                  transition={{ duration: 0.4 }}
                  className="border border-black/10 p-8 flex flex-col justify-center min-h-[240px]"
                >
                  <p className="text-[16px] font-mono uppercase tracking-[0.1em] text-black/40 mb-3">
                    Live System
                  </p>
                  <p className="text-[28px] font-bold text-black leading-relaxed">
                    NetSuite
                  </p>
                </motion.div>
              </div>

              {/* Timeline comparison */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: currentStep >= 12 ? 1 : 0,
                  y: currentStep >= 12 ? 0 : 20,
                }}
                transition={{ duration: 0.5 }}
                className="mt-8 pt-6 border-t border-black/10 space-y-3"
              >
                <div className="flex items-center gap-5">
                  <p className="text-[14px] font-mono uppercase tracking-[0.12em] text-black/30 w-[120px] shrink-0 text-right">
                    Without
                  </p>
                  <div className="flex-1 relative h-5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: currentStep >= 12 ? "100%" : 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 flex items-center"
                    >
                      <div className="h-[8px] bg-black/20 w-full" />
                    </motion.div>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: currentStep >= 12 ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="text-[16px] font-mono text-black/30 w-[140px] shrink-0"
                  >
                    3–6+ months
                  </motion.p>
                </div>

                <div className="flex items-center gap-5">
                  <p className="text-[14px] font-mono uppercase tracking-[0.12em] text-black w-[120px] shrink-0 text-right font-medium">
                    With Source
                  </p>
                  <div className="flex-1 relative h-5">
                    <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                      <div className="h-[8px] bg-black/[0.04] w-full" />
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: currentStep >= 12 ? "8%" : 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.3,
                        ease: "easeOut",
                      }}
                      className="absolute inset-y-0 left-0 flex items-center"
                    >
                      <div className="h-[8px] bg-black w-full" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: currentStep >= 12 ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                      className="absolute top-0 bottom-0 flex items-center"
                      style={{ left: "8%" }}
                    >
                      <div className="w-3 h-3 rounded-full bg-black" />
                    </motion.div>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: currentStep >= 12 ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="text-[16px] font-mono text-black font-bold w-[140px] shrink-0"
                  >
                    &lt; 14 days
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Slide>
  );
}
