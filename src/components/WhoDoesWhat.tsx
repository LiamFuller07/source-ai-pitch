"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  User,
  Building2,
  Check,
  FileText,
  Search,
  MessageSquare,
  ClipboardCheck,
  Rocket,
} from "lucide-react";
import { Slide } from "./Slide";

const flowSteps = [
  { owner: "consultant", label: "Client Call & Notes", icon: FileText },
  { owner: "source", label: "Connect & Scan", icon: Search },
  { owner: "source", label: "AI Questionnaire", icon: MessageSquare },
  { owner: "source", label: "Draft BRD", icon: FileText },
  { owner: "consultant", label: "Consultant Review", icon: ClipboardCheck },
  { owner: "customer", label: "Customer Sign-Off", icon: Check },
  { owner: "source", label: "AI Migration", icon: Rocket },
];

const STAIRCASE_INDENT = 32; // px per step

const ownerStyles = {
  source: {
    bar: "bg-black",
    text: "text-white",
    icon: "text-white/40",
    tag: "SOURCE",
    tagStyle: "text-white/50 bg-white/10",
    dot: "bg-white",
  },
  consultant: {
    bar: "bg-white border border-black/10",
    text: "text-black",
    icon: "text-black/20",
    tag: "YOU",
    tagStyle: "text-black/30 bg-black/[0.04]",
    dot: "bg-black/20",
  },
  customer: {
    bar: "bg-white border border-black/8",
    text: "text-black/70",
    icon: "text-black/15",
    tag: "CLIENT",
    tagStyle: "text-black/25 bg-black/[0.03]",
    dot: "bg-black/15",
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

const timelinePhases = [
  { name: "Scan", days: 2, color: "bg-black/70" },
  { name: "Analysis", days: 3, color: "bg-black/55" },
  { name: "BRD", days: 2, color: "bg-black/45" },
  { name: "Config", days: 5, color: "bg-black" },
  { name: "Migration", days: 3, color: "bg-black/70" },
  { name: "QA", days: 2, color: "bg-black/45" },
  { name: "Go-live", days: 1, color: "bg-black" },
];

const totalDays = timelinePhases.reduce((sum, p) => sum + p.days, 0);

const T = {
  header: 0,
  workflowLabel: 0.3,
  workflowStart: 0.4,
  workflowGap: 0.08,
  sourceCol: 1.0,
  sourceItemStart: 1.2,
  sourceItemGap: 0.04,
  consultantCol: 1.5,
  consultantItemStart: 1.65,
  consultantItemGap: 0.05,
  endUserCol: 1.8,
  endUserItemStart: 1.95,
  endUserItemGap: 0.05,
  timelineLabel: 1.2,
  timelineBar: 1.3,
  legend: 1.7,
};

export function WhoDoesWhat() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col px-[100px] py-[50px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: T.header }}
        className="mb-5"
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

      {/* Main content — staircase left, role breakdown right */}
      <div className="flex-1 grid grid-cols-[450px_1fr] gap-10 min-h-0">
        {/* LEFT: Staircase Workflow */}
        <div className="flex flex-col min-h-0">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: T.workflowLabel }}
            className="text-[11px] font-mono uppercase tracking-[0.15em] text-black/30 mb-3"
          >
            Workflow
          </motion.p>

          <div className="flex flex-col flex-1 justify-between">
            {flowSteps.map((step, i) => {
              const style = ownerStyles[step.owner as keyof typeof ownerStyles];
              const isSource = step.owner === "source";
              const indentPx = i * STAIRCASE_INDENT;

              return (
                <div key={i} className="flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.35,
                      delay: T.workflowStart + i * T.workflowGap,
                      ease: "easeOut",
                    }}
                    style={{ marginLeft: `${indentPx}px` }}
                  >
                    <div
                      className={`${style.bar} px-4 py-[9px] flex items-center gap-3`}
                    >
                      {isSource ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src="/source-logo.svg"
                          alt=""
                          className="w-[14px] h-[14px] shrink-0 invert opacity-40"
                        />
                      ) : (
                        <step.icon
                          size={14}
                          className={`${style.icon} shrink-0`}
                        />
                      )}
                      <p
                        className={`text-[13px] font-semibold ${style.text} leading-tight flex-1`}
                      >
                        {step.label}
                      </p>
                      <span
                        className={`text-[8px] font-mono uppercase tracking-[0.1em] px-2 py-0.5 shrink-0 ${style.tagStyle}`}
                      >
                        {style.tag}
                      </span>
                    </div>
                  </motion.div>

                  {/* Diagonal connector between steps */}
                  {i < flowSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{
                        duration: 0.2,
                        delay: T.workflowStart + i * T.workflowGap + 0.1,
                      }}
                      style={{ marginLeft: `${indentPx + 2}px` }}
                      className="relative h-[10px]"
                    >
                      <svg
                        width={STAIRCASE_INDENT + 4}
                        height={10}
                        className="absolute left-0 top-0"
                        viewBox={`0 0 ${STAIRCASE_INDENT + 4} 10`}
                        fill="none"
                      >
                        <line
                          x1="2"
                          y1="0"
                          x2={STAIRCASE_INDENT + 2}
                          y2="10"
                          stroke="rgba(0,0,0,0.12)"
                          strokeWidth="1"
                        />
                      </svg>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: T.legend }}
            className="mt-3 pt-3 border-t border-black/8 flex items-center gap-5"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-black" />
              <span className="text-[10px] font-mono text-black/35">
                Source AI
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-black/15" />
              <span className="text-[10px] font-mono text-black/35">
                Consultant
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-black/8" />
              <span className="text-[10px] font-mono text-black/35">
                Client
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
            className="bg-black text-white p-7 flex-1"
          >
            <div className="flex items-center gap-3 mb-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/source-logo.svg"
                alt="Source AI"
                className="w-[20px] h-[20px] invert opacity-50"
              />
              <p className="text-[22px] font-bold tracking-[-0.02em]">
                Source AI
              </p>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/25 mb-4">
              Handled Autonomously &mdash; 85% of the work
            </p>
            <div className="grid grid-cols-3 gap-x-8 gap-y-2.5">
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

          {/* Consultant + End User — side by side */}
          <div className="grid grid-cols-2 gap-[1px]">
            {/* Consultant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: T.consultantCol, ease: "easeOut" }}
              className="bg-white p-6"
            >
              <div className="flex items-center gap-2 mb-1">
                <User size={16} className="text-black/35" />
                <p className="text-[18px] font-bold tracking-[-0.01em] text-black">
                  Consultant
                </p>
              </div>
              <p className="text-[9px] font-mono uppercase tracking-[0.12em] text-black/25 mb-3">
                Review &amp; Confirm
              </p>
              <div className="space-y-2.5">
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
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: T.endUserCol, ease: "easeOut" }}
              className="bg-white p-6"
            >
              <div className="flex items-center gap-2 mb-1">
                <Building2 size={16} className="text-black/35" />
                <p className="text-[18px] font-bold tracking-[-0.01em] text-black">
                  End User
                </p>
              </div>
              <p className="text-[9px] font-mono uppercase tracking-[0.12em] text-black/25 mb-3">
                Answer &amp; Approve
              </p>
              <div className="space-y-2.5">
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
      </div>

      {/* 18-Day Timeline — full width */}
      <div className="mt-5">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: T.timelineLabel }}
          className="text-[9px] font-mono uppercase tracking-[0.15em] text-black/25 mb-2"
        >
          18-Day Timeline
        </motion.p>
        <div className="flex h-[44px] gap-[2px]">
          {timelinePhases.map((phase, i) => (
            <motion.div
              key={phase.name}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{
                duration: 0.35,
                delay: T.timelineBar + i * 0.05,
                ease: "easeOut",
              }}
              style={{
                width: `${(phase.days / totalDays) * 100}%`,
                transformOrigin: "left",
              }}
              className={`${phase.color} flex flex-col items-center justify-center text-white`}
            >
              <span className="text-[10px] font-medium leading-none">
                {phase.name}
              </span>
              <span className="text-[8px] font-mono text-white/45 mt-0.5">
                {phase.days}d
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
