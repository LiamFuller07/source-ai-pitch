"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
  Sparkles,
  Lightbulb,
  Settings,
  Database,
  Route,
  type LucideIcon,
} from "lucide-react";
import { Slide } from "./Slide";

// ─── Data ────────────────────────────────────────────────────────────────────

const flowSteps = [
  { owner: "consultant" as const, label: "Client Call & Notes", icon: FileText },
  { owner: "source" as const, label: "Connect & Scan", icon: Search },
  { owner: "source" as const, label: "AI Questionnaire", icon: MessageSquare },
  { owner: "source" as const, label: "Draft BRD", icon: FileText },
  { owner: "consultant" as const, label: "Consultant Review", icon: ClipboardCheck },
  { owner: "customer" as const, label: "Customer Sign-Off", icon: Check },
  { owner: "source" as const, label: "AI Migration", icon: Rocket },
  { owner: "source" as const, label: "Testing & QA", icon: ShieldCheck },
  { owner: "source" as const, label: "Training Docs", icon: GraduationCap },
  { owner: "consultant" as const, label: "Go-Live & Handover", icon: HeartHandshake },
];

const sourceItems: { label: string; icon: LucideIcon }[] = [
  { label: "System scanning & schema analysis", icon: Search },
  { label: "Business logic inference", icon: Lightbulb },
  { label: "Strategy & pain point identification", icon: MessageSquare },
  { label: "Questionnaire generation", icon: FileText },
  { label: "Draft BRD (AS-IS to TO-BE)", icon: ClipboardCheck },
  { label: "Migration plan generation", icon: Route },
  { label: "Implementation & configuration", icon: Settings },
  { label: "Data migration execution", icon: Database },
  { label: "Validation & proof artifacts", icon: ShieldCheck },
];

const consultantItems: { label: string; icon: LucideIcon }[] = [
  { label: "Provides initial context", icon: FileText },
  { label: "Reviews Source AI outputs", icon: ClipboardCheck },
  { label: "Delivers questions to end user", icon: MessageSquare },
  { label: "Confirms BRD with end user", icon: Check },
  { label: "Signs off on migration plan", icon: Check },
];

const endUserItems: { label: string; icon: LucideIcon }[] = [
  { label: "Answers questionnaires", icon: MessageSquare },
  { label: "Confirms business requirements", icon: Check },
  { label: "Signs off on TO-BE state", icon: Check },
  { label: "Accepts final migration", icon: Check },
];

// Row layout: 5 + 5
const flowRow1 = flowSteps.slice(0, 5);
const flowRow2 = flowSteps.slice(5);

// ─── Main component ───────────────────────────────────────────────────────────

export function WhoDoesWhat() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const slideVisible = useInView(ref, { margin: "-40%" });
  const [activeStep, setActiveStep] = useState(-1);

  // Keyboard navigation — only when slide is visible
  useEffect(() => {
    if (!slideVisible) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (activeStep < flowSteps.length - 1) {
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
  }, [slideVisible, activeStep]);

  // Start at step 0 when slide first enters view
  useEffect(() => {
    if (inView && activeStep === -1) {
      setActiveStep(0);
    }
  }, [inView, activeStep]);

  const renderStepRow = (row: typeof flowSteps, rowOffset: number) => (
    <div className="flex items-stretch gap-2">
      {row.map((step, i) => {
        const globalIndex = rowOffset + i;
        const isVisible = globalIndex <= activeStep;
        const isActive = globalIndex === activeStep;
        const isAI = step.owner === "source";
        const isLast = i === row.length - 1;

        return (
          <div key={step.label} className="flex items-center min-w-0 flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={
                isVisible
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.85, y: 10 }
              }
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => setActiveStep(globalIndex)}
              className={`flex-1 min-w-0 px-5 py-6 cursor-pointer transition-colors duration-200 ${
                isActive
                  ? "bg-black text-white"
                  : isVisible
                  ? "bg-white border border-black/15 text-black"
                  : "bg-transparent border border-transparent"
              }`}
            >
              {/* Icon + label */}
              <div className="flex items-center gap-3">
                <step.icon
                  size={18}
                  className={`shrink-0 ${
                    isActive ? "text-white/50" : "text-black/25"
                  }`}
                />
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
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-[12px] font-mono uppercase tracking-[0.18em] text-black/25 mb-3"
      >
        Workflow
      </motion.p>

      {/* Workflow rows — 5+5 */}
      <div className="flex flex-col gap-3 mb-0">
        {renderStepRow(flowRow1, 0)}
        {renderStepRow(flowRow2, 5)}
      </div>

      {/* Horizontal separator — only after all steps revealed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={activeStep >= flowSteps.length - 1 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="border-t border-black/10 my-6"
      />

      {/* Responsibility cards — only after all steps revealed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={activeStep >= flowSteps.length - 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 grid grid-cols-[1.2fr_1fr_1fr] gap-[4px] min-h-0"
      >
        {/* Source AI */}
        <div
          className="bg-black text-white px-8 py-5 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-1">
            <Sparkles size={20} className="text-white/45" />
            <p className="text-[22px] font-bold tracking-[-0.02em]">Source AI</p>
          </div>
          <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/25 mb-4">
            Handled Autonomously &mdash; 85% of the work
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 flex-1 content-start">
            {sourceItems.map((item, j) => (
              <div key={j} className="flex items-start gap-2.5">
                <item.icon size={14} className="text-white/25 shrink-0 mt-[3px]" />
                <span className="text-[16px] text-white/60 leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Consultant */}
        <div
          className="bg-white border border-black/10 px-8 py-5 flex flex-col"
        >
          <div className="flex items-center gap-2.5 mb-1">
            <User size={18} className="text-black/30" />
            <p className="text-[20px] font-bold tracking-[-0.01em] text-black">
              Consultant
            </p>
          </div>
          <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/25 mb-4">
            Review &amp; Confirm
          </p>
          <div className="space-y-3">
            {consultantItems.map((item, j) => (
              <div key={j} className="flex items-start gap-2.5">
                <item.icon size={14} className="text-black/20 shrink-0 mt-[3px]" />
                <span className="text-[16px] text-black/55 leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* End User */}
        <div
          className="bg-white border border-black/10 px-8 py-5 flex flex-col"
        >
          <div className="flex items-center gap-2.5 mb-1">
            <Building2 size={18} className="text-black/30" />
            <p className="text-[20px] font-bold tracking-[-0.01em] text-black">
              End User
            </p>
          </div>
          <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/25 mb-4">
            Answer &amp; Approve
          </p>
          <div className="space-y-3">
            {endUserItems.map((item, j) => (
              <div key={j} className="flex items-start gap-2.5">
                <item.icon size={14} className="text-black/15 shrink-0 mt-[3px]" />
                <span className="text-[16px] text-black/50 leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Slide>
  );
}
