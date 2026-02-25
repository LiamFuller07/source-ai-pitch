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

// ─── Data ────────────────────────────────────────────────────────────────────

const flowSteps = [
  { owner: "consultant", label: "Client Call & Notes", icon: FileText },
  { owner: "source", label: "Connect & Scan", icon: Search },
  { owner: "source", label: "AI Questionnaire", icon: MessageSquare },
  { owner: "source", label: "Draft BRD", icon: FileText },
  { owner: "consultant", label: "Consultant Review", icon: ClipboardCheck },
  { owner: "customer", label: "Customer Sign-Off", icon: Check },
  { owner: "source", label: "AI Migration", icon: Rocket },
];

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
  { name: "Scan", days: 1, color: "bg-black/70" },
  { name: "Analysis", days: 2, color: "bg-black/55" },
  { name: "BRD", days: 2, color: "bg-black/45" },
  { name: "Config", days: 4, color: "bg-black" },
  { name: "Migration & QA", days: 3, color: "bg-black/70" },
  { name: "Go-live", days: 1, color: "bg-black" },
];

const totalDays = timelinePhases.reduce((sum, p) => sum + p.days, 0);

// ─── Styling maps ─────────────────────────────────────────────────────────────

const ownerStyles = {
  source: {
    card: "bg-black",
    text: "text-white",
    subtext: "text-white/50",
    icon: "text-white/35",
    tag: "SOURCE",
    tagStyle: "bg-white/10 text-white/50 border border-white/10",
    numberBg: "bg-white/15 text-white/60",
    connector: "bg-white/20",
  },
  consultant: {
    card: "bg-white border border-black/10",
    text: "text-black",
    subtext: "text-black/40",
    icon: "text-black/25",
    tag: "YOU",
    tagStyle: "bg-black/[0.05] text-black/35 border border-black/10",
    numberBg: "bg-black/[0.06] text-black/40",
    connector: "bg-black/15",
  },
  customer: {
    card: "bg-white/60 border border-black/8",
    text: "text-black/70",
    subtext: "text-black/30",
    icon: "text-black/20",
    tag: "CLIENT",
    tagStyle: "bg-black/[0.03] text-black/30 border border-black/8",
    numberBg: "bg-black/[0.04] text-black/30",
    connector: "bg-black/10",
  },
};

// ─── Animation timing ─────────────────────────────────────────────────────────

const T = {
  header: 0,
  workflowLabel: 0.25,
  workflowStart: 0.35,
  workflowGap: 0.07,
  sourceCol: 0.9,
  sourceItemStart: 1.05,
  sourceItemGap: 0.04,
  consultantCol: 1.1,
  consultantItemStart: 1.25,
  consultantItemGap: 0.05,
  endUserCol: 1.15,
  endUserItemStart: 1.3,
  endUserItemGap: 0.05,
  timelineLabel: 1.0,
  timelineBar: 1.1,
};

// ─── Row layout: first 5 steps, then 2 steps ─────────────────────────────────

const flowRow1 = flowSteps.slice(0, 5);
const flowRow2 = flowSteps.slice(5);

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepCard({
  step,
  index,
  globalIndex,
  inView,
  isLast,
}: {
  step: (typeof flowSteps)[0];
  index: number;
  globalIndex: number;
  inView: boolean;
  isLast: boolean;
}) {
  const style = ownerStyles[step.owner as keyof typeof ownerStyles];
  const isSource = step.owner === "source";

  return (
    <div className="flex items-center min-w-0 flex-1">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.35,
          delay: T.workflowStart + globalIndex * T.workflowGap,
          ease: "easeOut",
        }}
        className={`${style.card} flex-1 min-w-0 px-5 py-4 flex flex-col gap-2.5`}
      >
        {/* Top row: step number + owner tag */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-[11px] font-mono font-medium w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 ${style.numberBg}`}
          >
            {globalIndex + 1}
          </span>
          <span
            className={`text-[9px] font-mono uppercase tracking-[0.12em] px-2 py-0.5 rounded-full shrink-0 ${style.tagStyle}`}
          >
            {style.tag}
          </span>
        </div>

        {/* Icon + label */}
        <div className="flex items-start gap-2.5">
          {isSource ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="/source-logo.svg"
              alt=""
              className={`w-[13px] h-[13px] shrink-0 mt-[3px] ${
                step.owner === "source" ? "invert opacity-30" : "opacity-20"
              }`}
            />
          ) : (
            <step.icon size={13} className={`${style.icon} shrink-0 mt-[2px]`} />
          )}
          <p className={`text-[14px] font-semibold leading-tight ${style.text}`}>
            {step.label}
          </p>
        </div>
      </motion.div>

      {/* Connector line + dot */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{
            duration: 0.25,
            delay: T.workflowStart + globalIndex * T.workflowGap + 0.15,
            ease: "easeOut",
          }}
          style={{ transformOrigin: "left" }}
          className="flex items-center shrink-0 w-[20px]"
        >
          <div className={`flex-1 h-px ${style.connector}`} />
          <div className={`w-[5px] h-[5px] rounded-full shrink-0 ${style.connector}`} />
        </motion.div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function WhoDoesWhat() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col px-[100px] py-[48px]"
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: T.header }}
        className="mb-6"
      >
        <p className="text-[13px] font-mono uppercase tracking-[0.2em] text-black/30 mb-1.5">
          Responsibility Matrix
        </p>
        <div className="flex items-end gap-6">
          <h2 className="text-[46px] font-semibold tracking-[-0.03em] text-black leading-none">
            Who Does What
          </h2>
          <p className="text-[16px] text-black/40 leading-relaxed mb-[2px]">
            <span className="font-semibold text-black">Source AI</span> does the
            technical execution end-to-end.{" "}
            <span className="font-semibold text-black">The consultant</span> keeps
            the client relationship and commercial ownership.
          </p>
        </div>
      </motion.div>

      {/* ── Workflow label ──────────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: T.workflowLabel }}
        className="text-[11px] font-mono uppercase tracking-[0.18em] text-black/25 mb-3"
      >
        Workflow
      </motion.p>

      {/* ── Workflow rows ───────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-[6px] mb-6">
        {/* Row 1: steps 1–5 */}
        <div className="flex items-stretch gap-0">
          {flowRow1.map((step, i) => (
            <StepCard
              key={step.label}
              step={step}
              index={i}
              globalIndex={i}
              inView={inView}
              isLast={i === flowRow1.length - 1}
            />
          ))}
        </div>

        {/* Row 2: steps 6–7, left-aligned (no flex-1 stretching to right) */}
        <div className="flex items-stretch gap-0">
          {flowRow2.map((step, i) => {
            const globalIndex = flowRow1.length + i;
            const isLast = i === flowRow2.length - 1;
            const style = ownerStyles[step.owner as keyof typeof ownerStyles];
            const isSource = step.owner === "source";

            return (
              <div
                key={step.label}
                className="flex items-center"
                // Each card in row 2 matches the proportional width of row 1 cards
                style={{ width: `calc((100% - ${(flowRow1.length - 1) * 20}px) / ${flowRow1.length})` }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.35,
                    delay: T.workflowStart + globalIndex * T.workflowGap,
                    ease: "easeOut",
                  }}
                  className={`${style.card} flex-1 min-w-0 px-5 py-4 flex flex-col gap-2.5 h-full`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-mono font-medium w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 ${style.numberBg}`}
                    >
                      {globalIndex + 1}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase tracking-[0.12em] px-2 py-0.5 rounded-full shrink-0 ${style.tagStyle}`}
                    >
                      {style.tag}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    {isSource ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src="/source-logo.svg"
                        alt=""
                        className="w-[13px] h-[13px] shrink-0 mt-[3px] invert opacity-30"
                      />
                    ) : (
                      <step.icon size={13} className={`${style.icon} shrink-0 mt-[2px]`} />
                    )}
                    <p className={`text-[14px] font-semibold leading-tight ${style.text}`}>
                      {step.label}
                    </p>
                  </div>
                </motion.div>

                {!isLast && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{
                      duration: 0.25,
                      delay: T.workflowStart + globalIndex * T.workflowGap + 0.15,
                    }}
                    style={{ transformOrigin: "left" }}
                    className="flex items-center shrink-0 w-[20px]"
                  >
                    <div className={`flex-1 h-px ${style.connector}`} />
                    <div className={`w-[5px] h-[5px] rounded-full shrink-0 ${style.connector}`} />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Responsibility cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-[1fr_340px_280px] gap-[4px] flex-1 min-h-0">
        {/* Source AI — dominant, black */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: T.sourceCol, ease: "easeOut" }}
          className="bg-black text-white p-6 flex flex-col min-h-0"
        >
          <div className="flex items-center gap-3 mb-0.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/source-logo.svg"
              alt="Source AI"
              className="w-[18px] h-[18px] invert opacity-40"
            />
            <p className="text-[20px] font-bold tracking-[-0.02em]">Source AI</p>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/25 mb-4">
            Handled Autonomously &mdash; 85% of the work
          </p>
          <div className="grid grid-cols-3 gap-x-8 gap-y-3 flex-1 content-start">
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
                <Check size={11} className="text-white/20 shrink-0 mt-[3px]" />
                <span className="text-[13px] text-white/55 leading-tight">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Consultant — white */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: T.consultantCol, ease: "easeOut" }}
          className="bg-white border border-black/8 p-5 flex flex-col min-h-0"
        >
          <div className="flex items-center gap-2.5 mb-0.5">
            <User size={15} className="text-black/30" />
            <p className="text-[17px] font-bold tracking-[-0.01em] text-black">Consultant</p>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/25 mb-4">
            Review &amp; Confirm
          </p>
          <div className="space-y-3 flex-1 content-start">
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
                <span className="w-[5px] h-[5px] rounded-full bg-black/15 shrink-0 mt-[5px]" />
                <span className="text-[13px] text-black/50 leading-tight">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* End User — white, lighter */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: T.endUserCol, ease: "easeOut" }}
          className="bg-white border border-black/8 p-5 flex flex-col min-h-0"
        >
          <div className="flex items-center gap-2.5 mb-0.5">
            <Building2 size={15} className="text-black/30" />
            <p className="text-[17px] font-bold tracking-[-0.01em] text-black">End User</p>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-black/25 mb-4">
            Answer &amp; Approve
          </p>
          <div className="space-y-3 flex-1 content-start">
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
                <span className="w-[5px] h-[5px] rounded-full bg-black/10 shrink-0 mt-[5px]" />
                <span className="text-[13px] text-black/45 leading-tight">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── 13-Day Timeline ─────────────────────────────────────────────────── */}
      <div className="mt-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: T.timelineLabel }}
          className="text-[11px] font-mono uppercase tracking-[0.18em] text-black/25 mb-2"
        >
          13-Day Timeline
        </motion.p>
        <div className="flex h-[42px] gap-[2px]">
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
              <span className="text-[11px] font-medium leading-none">{phase.name}</span>
              <span className="text-[9px] font-mono text-white/45 mt-0.5">{phase.days}d</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
