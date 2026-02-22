"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  Bot,
  User,
  Building2,
  Check,
  ArrowRight,
  FileText,
  Search,
  Brain,
  MessageSquare,
  ClipboardCheck,
  Rocket,
} from "lucide-react";
import { Slide } from "./Slide";
import { usePresentationStep } from "./PresentationController";

const TOTAL_STEPS = 5;

const flowSteps = [
  { owner: "consultant", label: "Client Call & Notes", icon: FileText },
  { owner: "source", label: "Access QuickBooks", icon: Search },
  { owner: "source", label: "System Scan", icon: Search },
  { owner: "source", label: "Infer Workflows", icon: Brain },
  { owner: "source", label: "AI Questionnaire", icon: MessageSquare },
  { owner: "source", label: "Draft BRD", icon: FileText },
  { owner: "consultant", label: "Consultant Review", icon: ClipboardCheck },
  { owner: "customer", label: "Customer Sign-Off", icon: Check },
  { owner: "source", label: "AI Migration", icon: Rocket },
];

const ownerColors = {
  source: {
    bg: "bg-black",
    text: "text-white",
    icon: "text-white/40",
    tag: "SOURCE",
    tagStyle: "text-white/40 bg-white/10",
  },
  consultant: {
    bg: "bg-white border border-black/12",
    text: "text-black",
    icon: "text-black/25",
    tag: "CONSULTANT",
    tagStyle: "text-black/30 bg-black/[0.04]",
  },
  customer: {
    bg: "bg-white border border-black/12",
    text: "text-black",
    icon: "text-black/25",
    tag: "CLIENT",
    tagStyle: "text-black/30 bg-black/[0.04]",
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
      className="flex flex-col px-[80px] py-[50px]"
    >
      {/* Header — full width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isStepVisible(1) ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-[14px] font-mono uppercase tracking-[0.2em] text-black/30 mb-2">
          Responsibility Matrix
        </p>
        <h2 className="text-[48px] font-semibold tracking-[-0.03em] text-black mb-3">
          Who Does What
        </h2>
        <p className="text-[18px] text-black/45 leading-relaxed max-w-[900px]">
          <span className="font-semibold text-black">Source AI</span> does the
          technical execution end-to-end.{" "}
          <span className="font-semibold text-black">The consultant</span> keeps
          the client relationship and commercial ownership.
        </p>
      </motion.div>

      {/* Main content — workflow left, roles right */}
      <div className="flex-1 grid grid-cols-[340px_1fr] gap-8">
        {/* LEFT: Workflow */}
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isStepVisible(2) ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
            className="text-[10px] font-mono uppercase tracking-[0.15em] text-black/25 mb-3"
          >
            Workflow
          </motion.p>

          <div className="flex flex-col">
            {flowSteps.map((step, i) => {
              const style = ownerColors[step.owner as keyof typeof ownerColors];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isStepVisible(2) ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <div
                    className={`${style.bg} px-4 py-[9px] flex items-center gap-3`}
                  >
                    <step.icon
                      size={14}
                      className={`${style.icon} shrink-0`}
                    />
                    <p
                      className={`text-[13px] font-medium ${style.text} leading-tight flex-1`}
                    >
                      {step.label}
                    </p>
                    <span
                      className={`text-[7px] font-mono uppercase tracking-[0.1em] px-1.5 py-0.5 shrink-0 ${style.tagStyle}`}
                    >
                      {style.tag}
                    </span>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="flex justify-center py-[2px]">
                      <div className="w-[1px] h-[8px] bg-black/10" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Three role columns */}
        <div className="grid grid-cols-3 gap-[1px] self-start">
          {/* Source AI */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isStepVisible(3) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="bg-black text-white p-5"
          >
            <div className="flex items-center gap-2 mb-1">
              <Bot size={16} className="text-white/50" />
              <p className="text-[18px] font-bold tracking-[-0.01em]">
                Source AI
              </p>
            </div>
            <p className="text-[9px] font-mono uppercase tracking-[0.12em] text-white/25 mb-4">
              Handled Autonomously
            </p>
            <div className="space-y-2">
              {sourceItems.map((item, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0 }}
                  animate={isStepVisible(3) ? { opacity: 1 } : {}}
                  transition={{ duration: 0.2, delay: j * 0.03 }}
                  className="flex items-start gap-2"
                >
                  <Check
                    size={11}
                    className="text-white/25 shrink-0 mt-[3px]"
                  />
                  <span className="text-[12px] text-white/60 leading-tight">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Consultant */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isStepVisible(4) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="bg-white border-t-2 border-t-black/15 p-5"
          >
            <div className="flex items-center gap-2 mb-1">
              <User size={16} className="text-black/35" />
              <p className="text-[18px] font-bold tracking-[-0.01em] text-black">
                Consultant
              </p>
            </div>
            <p className="text-[9px] font-mono uppercase tracking-[0.12em] text-black/25 mb-4">
              Review & Confirm
            </p>
            <div className="space-y-2.5">
              {consultantItems.map((item, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0 }}
                  animate={isStepVisible(4) ? { opacity: 1 } : {}}
                  transition={{ duration: 0.2, delay: j * 0.04 }}
                  className="flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black/15 shrink-0 mt-[5px]" />
                  <span className="text-[12px] text-black/50 leading-tight">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* End User */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isStepVisible(4) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white border-t border-t-black/8 p-5"
          >
            <div className="flex items-center gap-2 mb-1">
              <Building2 size={16} className="text-black/35" />
              <p className="text-[18px] font-bold tracking-[-0.01em] text-black">
                End User
              </p>
            </div>
            <p className="text-[9px] font-mono uppercase tracking-[0.12em] text-black/25 mb-4">
              Answer & Approve
            </p>
            <div className="space-y-2.5">
              {endUserItems.map((item, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0 }}
                  animate={isStepVisible(4) ? { opacity: 1 } : {}}
                  transition={{ duration: 0.2, delay: j * 0.04 }}
                  className="flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black/10 shrink-0 mt-[5px]" />
                  <span className="text-[12px] text-black/50 leading-tight">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Summary bar — full width bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isStepVisible(5) ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-5 pt-4 border-t border-black/8 flex items-center gap-6"
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-black" />
          <span className="text-[11px] font-mono text-black/35">
            9 automated by Source AI
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 border-2 border-black/15" />
          <span className="text-[11px] font-mono text-black/35">
            5 consultant review
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 border border-black/8" />
          <span className="text-[11px] font-mono text-black/35">
            4 client approval
          </span>
        </div>
      </motion.div>
    </Slide>
  );
}
