"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Bot, User, Building2, Check, ArrowDown, FileText, Search, Brain, MessageSquare, ClipboardCheck, Rocket } from "lucide-react";
import { Slide } from "./Slide";
import { usePresentationStep } from "./PresentationController";

const TOTAL_STEPS = 6;

/* Flow diagram steps — recreated from original eraser.io diagram */
const flowSteps = [
  {
    owner: "consultant",
    label: "Client Call Transcript & Notes",
    detail: "Consultant provides context",
    icon: FileText,
  },
  {
    owner: "source",
    label: "Access QuickBooks",
    detail: "Connect to source system",
    icon: Search,
  },
  {
    owner: "source",
    label: "Initial System Scan",
    detail: "Schema, data, config analysis",
    icon: Search,
  },
  {
    owner: "source",
    label: "Infer Workflows & Pain Points",
    detail: "AI business logic inference",
    icon: Brain,
  },
  {
    owner: "source",
    label: "Dynamic AI Questionnaire",
    detail: "Generated from scan results",
    icon: MessageSquare,
  },
  {
    owner: "source",
    label: "AI Draft BRD",
    detail: "AS-IS → TO-BE mapping",
    icon: FileText,
  },
  {
    owner: "consultant",
    label: "Consultant Review",
    detail: "Reviews & refines outputs",
    icon: ClipboardCheck,
  },
  {
    owner: "customer",
    label: "Customer Sign-Off",
    detail: "Approves requirements",
    icon: Check,
  },
  {
    owner: "source",
    label: "Full Scale AI Migration",
    detail: "Implementation, config & go-live",
    icon: Rocket,
  },
];

const ownerStyles = {
  source: {
    bg: "bg-black",
    text: "text-white",
    detail: "text-white/50",
    icon: "text-white/40",
    tag: "SOURCE AI",
    tagColor: "text-white/30 bg-white/10",
  },
  consultant: {
    bg: "bg-white border border-black/15",
    text: "text-black",
    detail: "text-black/40",
    icon: "text-black/30",
    tag: "CONSULTANT",
    tagColor: "text-black/30 bg-black/[0.04]",
  },
  customer: {
    bg: "bg-white border border-black/15",
    text: "text-black",
    detail: "text-black/40",
    icon: "text-black/30",
    tag: "CUSTOMER",
    tagColor: "text-black/30 bg-black/[0.04]",
  },
};

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
      bg="bg-[#f8f8f8]"
      className="flex items-stretch px-[60px] py-[40px]"
    >
      <div className="w-full h-full grid grid-cols-[400px_1fr] gap-10">
        {/* LEFT: Flow Diagram */}
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isStepVisible(1) ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
            className="text-[11px] font-mono uppercase tracking-[0.15em] text-black/25 mb-4"
          >
            Workflow
          </motion.p>

          <div className="flex-1 flex flex-col gap-0">
            {flowSteps.map((step, i) => {
              const style = ownerStyles[step.owner as keyof typeof ownerStyles];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isStepVisible(2) ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <div className={`${style.bg} px-4 py-2.5 flex items-center gap-3`}>
                    <step.icon size={15} className={`${style.icon} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-[13px] font-semibold ${style.text} leading-tight`}>
                        {step.label}
                      </p>
                    </div>
                    <span className={`text-[8px] font-mono uppercase tracking-[0.1em] px-2 py-0.5 shrink-0 ${style.tagColor}`}>
                      {style.tag}
                    </span>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <ArrowDown size={12} className="text-black/15" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Header + Responsibility Matrix */}
        <div className="flex flex-col justify-center min-w-0">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isStepVisible(1) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
              Responsibility Matrix
            </p>
            <h2 className="text-[56px] font-semibold tracking-[-0.03em] text-black mb-4">
              Who Does What
            </h2>
            <p className="text-[20px] text-black/45 leading-relaxed">
              <span className="font-semibold text-black">Source AI</span> does the
              technical execution end-to-end.{" "}
              <span className="font-semibold text-black">The consultant</span> keeps
              the client relationship and commercial ownership.
            </p>
          </motion.div>

          {/* Three columns */}
          <div className="grid grid-cols-3 gap-[1px]">
            {/* Source AI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isStepVisible(3) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-black text-white p-6"
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <Bot size={18} className="text-white/50" />
                <p className="text-[20px] font-bold tracking-[-0.01em]">Source AI</p>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/25 mb-5">
                Handled Autonomously
              </p>
              <div className="space-y-2.5">
                {sourceItems.map((item, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0 }}
                    animate={isStepVisible(3) ? { opacity: 1 } : {}}
                    transition={{ duration: 0.25, delay: j * 0.04 }}
                    className="flex items-center gap-2.5"
                  >
                    <Check size={12} className="text-white/25 shrink-0" />
                    <span className="text-[13px] text-white/65">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Consultant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isStepVisible(4) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-white border-t-2 border-t-black/15 p-6"
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <User size={18} className="text-black/35" />
                <p className="text-[20px] font-bold tracking-[-0.01em] text-black">Consultant</p>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/25 mb-5">
                Review & Confirm
              </p>
              <div className="space-y-3">
                {consultantItems.map((item, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0 }}
                    animate={isStepVisible(4) ? { opacity: 1 } : {}}
                    transition={{ duration: 0.25, delay: j * 0.05 }}
                    className="flex items-center gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black/15 shrink-0" />
                    <span className="text-[13px] text-black/50">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* End User */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isStepVisible(5) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-white border-t border-t-black/8 p-6"
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <Building2 size={18} className="text-black/35" />
                <p className="text-[20px] font-bold tracking-[-0.01em] text-black">End User</p>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/25 mb-5">
                Answer & Approve
              </p>
              <div className="space-y-3">
                {endUserItems.map((item, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0 }}
                    animate={isStepVisible(5) ? { opacity: 1 } : {}}
                    transition={{ duration: 0.25, delay: j * 0.05 }}
                    className="flex items-center gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black/10 shrink-0" />
                    <span className="text-[13px] text-black/50">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Summary bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isStepVisible(6) ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 flex items-center gap-5"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-black" />
              <span className="text-[11px] font-mono text-black/35">9 automated</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-black/15" />
              <span className="text-[11px] font-mono text-black/35">5 review</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-black/8" />
              <span className="text-[11px] font-mono text-black/35">4 approve</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
}
