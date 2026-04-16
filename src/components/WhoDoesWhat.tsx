"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Check,
  FileText,
  Search,
  MessageSquare,
  ClipboardCheck,
  Rocket,
  ShieldCheck,
  FileSpreadsheet,
  Mic,
  type LucideIcon,
} from "lucide-react";
import { Slide } from "./Slide";

// ─── Data ────────────────────────────────────────────────────────────────────

type FlowStep = {
  owner: "consultant" | "source" | "customer";
  label: string;
  icon: LucideIcon | null;
  emoji?: string;
};

const flowSteps: FlowStep[] = [
  { owner: "consultant", label: "Discovery Call", icon: FileText },
  { owner: "source", label: "AI System Scan", icon: Search },
  { owner: "source", label: "BRD Draft", icon: FileText },
  { owner: "source", label: "AI Revisions", icon: MessageSquare },
  { owner: "source", label: "BRD Final", icon: ClipboardCheck },
  { owner: "consultant", label: "Consultant Review", icon: ClipboardCheck },
  { owner: "customer", label: "Customer Sign-Off", icon: Check },
  { owner: "source", label: "AI Migration", icon: Rocket },
  { owner: "source", label: "Testing & QA", icon: ShieldCheck },
  { owner: "customer", label: "Happy Customer", icon: null, emoji: "🎉" },
];

// Row layout: 5 + 5
const flowRow1 = flowSteps.slice(0, 5);
const flowRow2 = flowSteps.slice(5);

const stages = ["Scope", "Discovery", "Scan", "Deliver", "Review"];

// ─── Stage cards ─────────────────────────────────────────────────────────────

function ScopeCard() {
  return (
    <div className="bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_-4px_rgba(0,0,0,0.07)] px-6 py-5 min-h-[220px]">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/[0.06]">
        <span className="text-[15px] font-medium text-black">Partner SOW</span>
        <span className="text-[10px] font-mono tracking-[0.12em] text-black/35">DRAFT</span>
      </div>
      <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/40 mb-2">
        Target ERP
      </div>
      <div className="bg-black text-white text-[14px] font-medium px-3.5 py-2 rounded-md mb-3">
        NetSuite OneWorld
      </div>
      <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/40 mb-2">
        Source Quote
      </div>
      <div className="bg-black text-white text-[14px] font-medium px-3.5 py-2 rounded-md">
        $12,500 · fixed
      </div>
    </div>
  );
}

function DiscoveryCard() {
  const items = [
    { name: "CFO · Jane", state: "emerald" },
    { name: "Ops lead · Mark", state: "emerald" },
    { name: "IT lead · Priya", state: "amber" },
  ];
  return (
    <div className="bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_-4px_rgba(0,0,0,0.07)] px-6 py-5 min-h-[220px]">
      <div className="flex items-center gap-2 mb-4">
        <Mic size={14} className="text-black/40" strokeWidth={1.75} />
        <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/40">
          Transcripts · 3
        </span>
      </div>
      <div className="space-y-2.5">
        {items.map((it) => (
          <div key={it.name} className="flex items-center gap-2.5">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                it.state === "emerald" ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span className="text-[14px] text-black/80">{it.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-black/[0.06]">
        <span className="text-[12px] text-black/55 leading-relaxed">
          Source AI summarised &amp; extracted requirements
        </span>
      </div>
    </div>
  );
}

function ScanCard() {
  const rows = [
    ["Records", "94,127"],
    ["GL accounts", "247"],
    ["Ghost system", "Shopify"],
    ["Integrations", "4"],
  ];
  return (
    <div className="bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_-4px_rgba(0,0,0,0.07)] px-6 py-5 min-h-[220px]">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[15px] font-medium text-black">QuickBooks</span>
        </div>
        <span className="text-[10px] font-mono tracking-[0.12em] text-black/35">READ-ONLY</span>
      </div>
      <div className="space-y-2.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between text-[14px]">
            <span className="text-black/50">{k}</span>
            <span className="text-black font-medium">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeliverCard() {
  return (
    <div className="bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_-4px_rgba(0,0,0,0.07)] px-6 py-5 min-h-[220px]">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/[0.06]">
        <span className="text-[15px] font-medium text-black">Deliverables</span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-mono font-bold tracking-[0.08em]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          READY
        </span>
      </div>
      <div className="space-y-2.5">
        <div className="flex items-center gap-2.5 text-[14px]">
          <FileText size={16} className="text-black/40" strokeWidth={1.75} />
          <span className="text-black">BRD.docx</span>
        </div>
        <div className="flex items-center gap-2.5 text-[14px]">
          <FileSpreadsheet size={16} className="text-black/40" strokeWidth={1.75} />
          <span className="text-black">COA Mapping.xlsx</span>
        </div>
        <div className="flex items-center gap-2.5 text-[14px]">
          <Rocket size={16} className="text-black/40" strokeWidth={1.75} />
          <span className="text-black">NetSuite · implemented</span>
        </div>
      </div>
    </div>
  );
}

function ReviewCard() {
  return (
    <div className="bg-white rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_-4px_rgba(0,0,0,0.07)] px-6 py-5 min-h-[220px]">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/[0.06]">
        <span className="text-[14px] text-black">
          <span className="font-semibold">Source</span> made an edit
        </span>
        <span className="text-[11px] text-black/30">3:14pm</span>
      </div>
      <p className="text-[13px] text-black/60 mb-4 leading-relaxed">
        Merged GL 4100 &amp; 4110 in NetSuite subsidiaries.
      </p>
      <button className="w-full bg-black text-white text-[13px] font-medium py-2 rounded-md mb-2">
        Accept
      </button>
      <button className="w-full bg-white border border-black/15 text-black/70 text-[13px] font-medium py-2 rounded-md">
        Reject
      </button>
    </div>
  );
}

const stageCards: Record<string, () => React.ReactNode> = {
  Scope: ScopeCard,
  Discovery: DiscoveryCard,
  Scan: ScanCard,
  Deliver: DeliverCard,
  Review: ReviewCard,
};

// ─── Main component ───────────────────────────────────────────────────────────

export function WhoDoesWhat() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const slideVisible = useInView(ref, { margin: "-40%" });
  const [activeStep, setActiveStep] = useState(-1);

  const maxStep = flowSteps.length + stages.length - 1;

  // Keyboard navigation — only when slide is visible
  useEffect(() => {
    if (!slideVisible) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (activeStep < maxStep) {
          e.preventDefault();
          e.stopPropagation();
          setActiveStep((prev) => prev + 1);
        }
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (activeStep > 0) {
          e.preventDefault();
          e.stopPropagation();
          setActiveStep((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, [slideVisible, activeStep, maxStep]);

  // Start at step 0 when slide first enters view
  useEffect(() => {
    if (inView && activeStep === -1) {
      setActiveStep(0);
    }
  }, [inView, activeStep]);

  const renderStepRow = (row: typeof flowSteps, rowOffset: number) => (
    <div className="flex items-stretch gap-3">
      {row.map((step, i) => {
        const globalIndex = rowOffset + i;
        const isVisible = globalIndex <= activeStep;
        const isActive = globalIndex === activeStep;
        const isAI = step.owner === "source";
        const isLast = i === row.length - 1;
        const isFinalStep = globalIndex === flowSteps.length - 1;

        return (
          <div key={step.label} className={`flex items-center min-w-0 ${isFinalStep ? "flex-[0.8]" : "flex-1"}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={
                isVisible
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.85, y: 10 }
              }
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => setActiveStep(globalIndex)}
              className={`flex-1 min-w-0 px-5 py-6 cursor-pointer transition-colors duration-200 relative ${
                isActive
                  ? "bg-black text-white"
                  : isVisible
                  ? "bg-white border border-black/15 text-black"
                  : "bg-transparent border border-transparent"
              }`}
            >
              {/* Role badge */}
              {!step.emoji && (
                <span className={`absolute top-2 right-3 text-[9px] font-mono font-bold tracking-[0.08em] ${
                  isActive
                    ? "text-white/50"
                    : isAI ? "text-black/40" : "text-black/25"
                }`}>
                  {isAI ? "AI" : "Consultant"}
                </span>
              )}
              {/* Icon + label */}
              <div className="flex items-center gap-3">
                {step.emoji ? (
                  <span className="text-[18px] shrink-0">{step.emoji}</span>
                ) : step.icon ? (
                  <step.icon
                    size={18}
                    className={`shrink-0 ${
                      isActive ? "text-white/50" : "text-black/25"
                    }`}
                  />
                ) : null}
                <p
                  className={`text-[17px] font-semibold leading-tight ${
                    isActive ? "text-white" : "text-black"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </motion.div>

            {/* Arrow connector */}
            {!isLast && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="shrink-0 px-2 text-[22px] font-bold text-black/20"
              >
                →
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col px-[100px] py-[60px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <p className="text-[14px] font-mono uppercase tracking-[0.2em] text-black/30 mb-2">
          Responsibility Matrix
        </p>
        <h2 className="text-[48px] font-semibold tracking-[-0.03em] text-black mb-2">
          Who Does What
        </h2>
        <p className="text-[22px] text-black/45 leading-relaxed max-w-[900px]">
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
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-[12px] font-mono uppercase tracking-[0.18em] text-black/25 mb-3"
      >
        Workflow
      </motion.p>

      {/* Workflow rows — 5+5 */}
      <div className="flex flex-col gap-3 mb-6">
        {renderStepRow(flowRow1, 0)}
        {renderStepRow(flowRow2, 5)}
      </div>

      {/* Horizontal separator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={activeStep >= flowSteps.length ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="border-t border-black/10 mb-8"
      />

      {/* Agentic flow timeline */}
      <div className="flex-1 min-h-0 flex flex-col">
        {/* Pill labels on a horizontal line */}
        <div className="relative mb-5">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={activeStep >= flowSteps.length ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
            className="absolute top-1/2 left-0 right-0 h-px bg-black/15 -translate-y-1/2"
          />
          <div className="relative flex justify-between items-center">
            {stages.map((label, i) => {
              const visible = activeStep >= flowSteps.length + i;
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`relative z-10 px-5 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                    visible
                      ? "bg-white border border-black/15 text-black"
                      : "bg-white/50 border border-black/8 text-black/40"
                  }`}
                >
                  {label}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stage cards */}
        <div className="grid grid-cols-5 gap-5 mt-4">
          {stages.map((label, i) => {
            const visible = activeStep >= flowSteps.length + i;
            const Card = stageCards[label];
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                <Card />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Slide>
  );
}
