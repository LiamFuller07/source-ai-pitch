"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Bot,
  User,
  Building2,
  Check,
  FileText,
  Search,
  Brain,
  MessageSquare,
  ClipboardCheck,
  Rocket,
} from "lucide-react";
import { Slide } from "./Slide";

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

// Stagger timing (seconds)
const T = {
  header: 0,
  workflowLabel: 0.3,
  workflowStart: 0.4,
  workflowGap: 0.07,
  sourceCol: 1.1,
  sourceItemStart: 1.3,
  sourceItemGap: 0.04,
  consultantCol: 1.6,
  consultantItemStart: 1.75,
  consultantItemGap: 0.05,
  endUserCol: 1.9,
  endUserItemStart: 2.05,
  endUserItemGap: 0.05,
  summary: 2.5,
};

export function WhoDoesWhat() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col px-[80px] py-[50px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: T.header }}
        className="mb-6"
      >
        <p className="text-[14px] font-mono uppercase tracking-[0.2em] text-black/30 mb-2">
          Responsibility Matrix
        </p>
        <h2 className="text-[48px] font-semibold tracking-[-0.03em] text-black mb-2">
          Who Does What
        </h2>
        <p className="text-[18px] text-black/45 leading-relaxed max-w-[900px]">
          <span className="font-semibold text-black">Source AI</span> does the
          technical execution end-to-end.{" "}
          <span className="font-semibold text-black">The consultant</span> keeps
          the client relationship and commercial ownership.
        </p>
      </motion.div>

      {/* Main content — workflow left, role breakdown right */}
      <div className="flex-1 grid grid-cols-[300px_1fr] gap-10">
        {/* LEFT: Workflow */}
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: T.workflowLabel }}
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
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.35,
                    delay: T.workflowStart + i * T.workflowGap,
                    ease: "easeOut",
                  }}
                >
                  <div
                    className={`${style.bg} px-4 py-[10px] flex items-center gap-3`}
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

          {/* Legend under workflow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: T.summary }}
            className="mt-5 pt-4 border-t border-black/8 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-black" />
              <span className="text-[10px] font-mono text-black/35">
                6 steps automated by Source AI
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 border-2 border-black/15" />
              <span className="text-[10px] font-mono text-black/35">
                2 consultant review points
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 border border-black/8" />
              <span className="text-[10px] font-mono text-black/35">
                1 client approval
              </span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Source AI (large) + Consultant & End User (side by side) */}
        <div className="flex flex-col gap-[1px]">
          {/* Source AI — full width, dominant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: T.sourceCol, ease: "easeOut" }}
            className="bg-black text-white p-8 flex-1"
          >
            <div className="flex items-center gap-3 mb-1">
              <Bot size={20} className="text-white/50" />
              <p className="text-[24px] font-bold tracking-[-0.02em]">
                Source AI
              </p>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/25 mb-5">
              Handled Autonomously &mdash; 85% of the work
            </p>
            <div className="grid grid-cols-3 gap-x-8 gap-y-3">
              {sourceItems.map((item, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, x: -5 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.25,
                    delay: T.sourceItemStart + j * T.sourceItemGap,
                  }}
                  className="flex items-start gap-2"
                >
                  <Check
                    size={12}
                    className="text-white/25 shrink-0 mt-[3px]"
                  />
                  <span className="text-[13px] text-white/60 leading-tight">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Consultant + End User — side by side */}
          <div className="grid grid-cols-2 gap-[1px]">
            {/* Consultant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: T.consultantCol, ease: "easeOut" }}
              className="bg-white p-7"
            >
              <div className="flex items-center gap-2 mb-1">
                <User size={18} className="text-black/35" />
                <p className="text-[20px] font-bold tracking-[-0.01em] text-black">
                  Consultant
                </p>
              </div>
              <p className="text-[9px] font-mono uppercase tracking-[0.12em] text-black/25 mb-4">
                Review &amp; Confirm
              </p>
              <div className="space-y-3">
                {consultantItems.map((item, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -5 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.25,
                      delay: T.consultantItemStart + j * T.consultantItemGap,
                    }}
                    className="flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black/15 shrink-0 mt-[6px]" />
                    <span className="text-[13px] text-black/50 leading-tight">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* End User */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: T.endUserCol, ease: "easeOut" }}
              className="bg-white p-7"
            >
              <div className="flex items-center gap-2 mb-1">
                <Building2 size={18} className="text-black/35" />
                <p className="text-[20px] font-bold tracking-[-0.01em] text-black">
                  End User
                </p>
              </div>
              <p className="text-[9px] font-mono uppercase tracking-[0.12em] text-black/25 mb-4">
                Answer &amp; Approve
              </p>
              <div className="space-y-3">
                {endUserItems.map((item, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -5 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.25,
                      delay: T.endUserItemStart + j * T.endUserItemGap,
                    }}
                    className="flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black/10 shrink-0 mt-[6px]" />
                    <span className="text-[13px] text-black/50 leading-tight">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
