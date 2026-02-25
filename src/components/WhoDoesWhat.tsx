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
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
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
  { owner: "source", label: "Testing & QA", icon: ShieldCheck },
  { owner: "source", label: "Training Docs", icon: GraduationCap },
  { owner: "consultant", label: "Go-Live & Handover", icon: HeartHandshake },
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
    icon: "text-white/35",
    tag: "SOURCE",
    tagStyle: "bg-white/10 text-white/50",
    numberBg: "bg-white/15 text-white/60",
    connector: "bg-white/25",
  },
  consultant: {
    card: "bg-white border border-black/15",
    text: "text-black",
    icon: "text-black/25",
    tag: "YOU",
    tagStyle: "bg-black/[0.05] text-black/35",
    numberBg: "bg-black/[0.06] text-black/40",
    connector: "bg-black/20",
  },
  customer: {
    card: "bg-white border border-black/10",
    text: "text-black/70",
    icon: "text-black/20",
    tag: "CLIENT",
    tagStyle: "bg-black/[0.03] text-black/25",
    numberBg: "bg-black/[0.04] text-black/30",
    connector: "bg-black/15",
  },
};

// ─── Animation timing ─────────────────────────────────────────────────────────

const T = {
  header: 0,
  workflowLabel: 0.2,
  workflowStart: 0.3,
  workflowGap: 0.06,
  cardsStart: 1.0,
  cardsGap: 0.08,
  sourceItemStart: 1.1,
  sourceItemGap: 0.03,
  consultantItemStart: 1.2,
  consultantItemGap: 0.04,
  endUserItemStart: 1.25,
  endUserItemGap: 0.04,
  timelineLabel: 1.0,
  timelineBar: 1.1,
};

// Row layout: 5 + 5
const flowRow1 = flowSteps.slice(0, 5);
const flowRow2 = flowSteps.slice(5);

// ─── Step card (matches solution page style) ─────────────────────────────────

function StepCard({
  step,
  globalIndex,
  inView,
  isLast,
}: {
  step: (typeof flowSteps)[0];
  globalIndex: number;
  inView: boolean;
  isLast: boolean;
}) {
  const style = ownerStyles[step.owner as keyof typeof ownerStyles];
  const isSource = step.owner === "source";

  return (
    <div className="flex items-center min-w-0 flex-1">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{
          duration: 0.35,
          delay: T.workflowStart + globalIndex * T.workflowGap,
          ease: "easeOut",
        }}
        className={`${style.card} flex-1 min-w-0 px-5 py-4`}
      >
        {/* Top: number + tag */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-[12px] font-mono font-medium w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0 ${style.numberBg}`}
          >
            {globalIndex + 1}
          </span>
          <span
            className={`text-[10px] font-mono uppercase tracking-[0.1em] px-2.5 py-1 shrink-0 ${style.tagStyle}`}
          >
            {style.tag}
          </span>
        </div>

        {/* Icon + label */}
        <div className="flex items-center gap-3">
          {isSource ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="/source-logo.svg"
              alt=""
              className="w-[16px] h-[16px] shrink-0 invert opacity-35"
            />
          ) : (
            <step.icon size={16} className={`${style.icon} shrink-0`} />
          )}
          <p className={`text-[16px] font-semibold leading-tight ${style.text}`}>
            {step.label}
          </p>
        </div>
      </motion.div>

      {/* Arrow connector */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.3 } : {}}
          transition={{
            duration: 0.2,
            delay: T.workflowStart + globalIndex * T.workflowGap + 0.12,
          }}
          className="shrink-0 px-1 text-[20px] text-black/20"
        >
          →
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

      {/* Workflow label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: T.workflowLabel }}
        className="text-[12px] font-mono uppercase tracking-[0.18em] text-black/25 mb-3"
      >
        Workflow
      </motion.p>

      {/* Workflow rows — 5+5 */}
      <div className="flex flex-col gap-[6px] mb-6">
        {/* Row 1: steps 1–5 */}
        <div className="flex items-stretch gap-0">
          {flowRow1.map((step, i) => (
            <StepCard
              key={step.label}
              step={step}
              globalIndex={i}
              inView={inView}
              isLast={i === flowRow1.length - 1}
            />
          ))}
        </div>

        {/* Row 2: steps 6–10 */}
        <div className="flex items-stretch gap-0">
          {flowRow2.map((step, i) => (
            <StepCard
              key={step.label}
              step={step}
              globalIndex={flowRow1.length + i}
              inView={inView}
              isLast={i === flowRow2.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Responsibility cards — Source AI dominant, Consultant + End User beside */}
      <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-[4px] mb-4">
        {/* Source AI */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: T.cardsStart }}
          className="bg-black text-white p-7"
        >
          <div className="flex items-center gap-3 mb-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/source-logo.svg"
              alt="Source AI"
              className="w-[20px] h-[20px] invert opacity-45"
            />
            <p className="text-[22px] font-bold tracking-[-0.02em]">Source AI</p>
          </div>
          <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/25 mb-5">
            Handled Autonomously &mdash; 85% of the work
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {sourceItems.map((item, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, x: -5 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.2,
                  delay: T.sourceItemStart + j * T.sourceItemGap,
                }}
                className="flex items-start gap-2.5"
              >
                <Check size={13} className="text-white/25 shrink-0 mt-[3px]" />
                <span className="text-[15px] text-white/60 leading-tight">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Consultant */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: T.cardsStart + T.cardsGap }}
          className="bg-white border border-black/10 p-7"
        >
          <div className="flex items-center gap-2.5 mb-1">
            <User size={18} className="text-black/30" />
            <p className="text-[20px] font-bold tracking-[-0.01em] text-black">
              Consultant
            </p>
          </div>
          <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/25 mb-5">
            Review &amp; Confirm
          </p>
          <div className="space-y-3.5">
            {consultantItems.map((item, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, x: -5 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.2,
                  delay: T.consultantItemStart + j * T.consultantItemGap,
                }}
                className="flex items-start gap-2.5"
              >
                <span className="w-[6px] h-[6px] rounded-full bg-black/15 shrink-0 mt-[6px]" />
                <span className="text-[15px] text-black/55 leading-tight">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* End User */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: T.cardsStart + T.cardsGap * 2 }}
          className="bg-white border border-black/10 p-7"
        >
          <div className="flex items-center gap-2.5 mb-1">
            <Building2 size={18} className="text-black/30" />
            <p className="text-[20px] font-bold tracking-[-0.01em] text-black">
              End User
            </p>
          </div>
          <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/25 mb-5">
            Answer &amp; Approve
          </p>
          <div className="space-y-3.5">
            {endUserItems.map((item, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, x: -5 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.2,
                  delay: T.endUserItemStart + j * T.endUserItemGap,
                }}
                className="flex items-start gap-2.5"
              >
                <span className="w-[6px] h-[6px] rounded-full bg-black/10 shrink-0 mt-[6px]" />
                <span className="text-[15px] text-black/50 leading-tight">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 13-Day Timeline */}
      <div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: T.timelineLabel }}
          className="text-[12px] font-mono uppercase tracking-[0.18em] text-black/25 mb-2"
        >
          13-Day Timeline
        </motion.p>
        <div className="flex h-[48px] gap-[2px]">
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
              <span className="text-[13px] font-medium leading-none">
                {phase.name}
              </span>
              <span className="text-[10px] font-mono text-white/45 mt-0.5">
                {phase.days}d
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
