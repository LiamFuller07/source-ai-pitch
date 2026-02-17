"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Database,
  Search,
  MessageSquareText,
  FileText,
  UserCheck,
  CheckCircle2,
  Rocket,
} from "lucide-react";
import { Slide } from "./Slide";

const columns = [
  {
    title: "Source AI",
    subtitle: "Handled Autonomously",
    items: [
      "System scanning & schema analysis",
      "Business logic inference",
      "Strategy & pain point identification",
      "Questionnaire generation",
      "Draft BRD (AS-IS to TO-BE)",
      "Migration plan generation",
      "Implementation & configuration",
      "Data migration execution",
      "Validation & proof artifacts",
    ],
    highlight: true,
  },
  {
    title: "Consultant",
    subtitle: "Review & Confirm",
    items: [
      "Provides initial context",
      "Reviews Source AI outputs",
      "Delivers questions to end user",
      "Confirms BRD with end user",
      "Signs off on migration plan",
    ],
    highlight: false,
  },
  {
    title: "End User",
    subtitle: "Answer & Approve",
    items: [
      "Answers questionnaires",
      "Confirms business requirements",
      "Signs off on TO-BE state",
      "Accepts final migration",
    ],
    highlight: false,
  },
];

function FlowArrow({ delay, inView }: { delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay }}
      className="flex justify-center py-1"
    >
      <svg width="2" height="20" viewBox="0 0 2 20">
        <line x1="1" y1="0" x2="1" y2="14" stroke="black" strokeOpacity="0.2" strokeWidth="1.5" />
        <polygon points="0,14 2,14 1,19" fill="black" fillOpacity="0.2" />
      </svg>
    </motion.div>
  );
}

function FlowBox({
  label,
  sublabel,
  icon: Icon,
  tag,
  tagColor = "black",
  delay,
  inView,
  className = "",
}: {
  label: string;
  sublabel?: string;
  icon: React.ElementType;
  tag: string;
  tagColor?: string;
  delay: number;
  inView: boolean;
  className?: string;
}) {
  const tagColors: Record<string, string> = {
    black: "bg-black text-white",
    blue: "bg-blue-100 text-blue-700 border border-blue-200",
    green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay }}
      className={`bg-white border border-black/10 px-5 py-3.5 flex items-center gap-3.5 ${className}`}
    >
      <Icon size={18} className="text-black/30 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-black leading-tight">{label}</p>
        {sublabel && (
          <p className="text-[11px] text-black/35 mt-0.5">{sublabel}</p>
        )}
      </div>
      <span className={`text-[9px] font-mono uppercase tracking-[0.08em] px-2 py-1 shrink-0 font-medium ${tagColors[tagColor]}`}>
        {tag}
      </span>
    </motion.div>
  );
}

export function WhoDoesWhat() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col justify-center px-[80px]"
    >
      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-5"
        >
          <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-2">
            Responsibility Matrix
          </p>
          <h2 className="text-[52px] font-semibold tracking-[-0.03em] text-black mb-3">
            Who Does What
          </h2>
          <p className="text-[20px] text-black/45 leading-relaxed">
            <span className="font-semibold text-black">Source AI</span> does the
            technical execution end-to-end.{" "}
            <span className="font-semibold text-black">The consultant</span> keeps
            the client relationship, domain expertise, and commercial ownership.
          </p>
        </motion.div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-[420px_1fr] gap-10">
          {/* LEFT: Flow diagram */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-black/25 mb-3">
              How It Works
            </p>

            {/* Step 1: Consultant inputs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="bg-blue-50 border border-blue-200 px-5 py-3.5 flex items-center gap-3"
            >
              <FileText size={18} className="text-blue-400 shrink-0" />
              <div>
                <p className="text-[15px] font-semibold text-black leading-tight">Consultant Inputs</p>
                <p className="text-[11px] text-black/35 mt-0.5">Call transcript & notes</p>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-[0.08em] px-2 py-1 shrink-0 font-medium bg-blue-100 text-blue-700 border border-blue-200 ml-auto">
                Consultant
              </span>
            </motion.div>

            <FlowArrow delay={0.3} inView={inView} />

            {/* Step 2: Access & Scan */}
            <FlowBox
              icon={Database}
              label="Access QuickBooks"
              sublabel="Connect to source system"
              tag="Source AI"
              delay={0.35}
              inView={inView}
            />

            <FlowArrow delay={0.4} inView={inView} />

            {/* Step 3: System Scan */}
            <FlowBox
              icon={Search}
              label="Initial System Scan"
              sublabel="Infer workflows & pain points"
              tag="Source AI"
              delay={0.45}
              inView={inView}
            />

            <FlowArrow delay={0.5} inView={inView} />

            {/* Step 4: AI Questionnaire */}
            <FlowBox
              icon={MessageSquareText}
              label="Dynamic AI Questionnaire"
              sublabel="AI-generated, adapts to responses"
              tag="Source AI"
              delay={0.55}
              inView={inView}
            />

            <FlowArrow delay={0.6} inView={inView} />

            {/* Step 5: Draft BRD */}
            <FlowBox
              icon={FileText}
              label="AI Draft BRD"
              sublabel="AS-IS → TO-BE mapping"
              tag="Source AI"
              delay={0.65}
              inView={inView}
            />

            <FlowArrow delay={0.7} inView={inView} />

            {/* Step 6: Consultant Review */}
            <FlowBox
              icon={UserCheck}
              label="Consultant Review"
              tag="Consultant"
              tagColor="blue"
              delay={0.75}
              inView={inView}
            />

            <FlowArrow delay={0.8} inView={inView} />

            {/* Step 7: Customer Sign-Off */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.85 }}
              className="bg-emerald-50 border border-emerald-200 px-5 py-3.5 flex items-center gap-3.5"
            >
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <p className="text-[15px] font-semibold text-black leading-tight">Customer Sign-Off</p>
              <span className="text-[9px] font-mono uppercase tracking-[0.08em] px-2 py-1 shrink-0 font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 ml-auto">
                Customer
              </span>
            </motion.div>

            <FlowArrow delay={0.9} inView={inView} />

            {/* Step 8: Full Migration */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.95 }}
              className="bg-black px-5 py-3.5 flex items-center gap-3.5"
            >
              <Rocket size={18} className="text-white/60 shrink-0" />
              <p className="text-[15px] font-semibold text-white leading-tight">Full Scale AI Migration</p>
              <span className="text-[9px] font-mono uppercase tracking-[0.08em] px-2 py-1 shrink-0 font-medium bg-white text-black ml-auto">
                Source AI
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT: Responsibility matrix */}
          <div className="grid grid-cols-3 gap-[1px]">
            {columns.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className={`bg-white p-6 ${
                  col.highlight
                    ? "border-t-2 border-t-black"
                    : "border-t border-t-black/10"
                }`}
              >
                <p className="text-[20px] font-bold tracking-[-0.01em] text-black mb-0.5">
                  {col.title}
                </p>
                <p className="text-[11px] font-mono text-black/30 uppercase tracking-[0.1em] mb-5">
                  {col.subtitle}
                </p>
                <div className="space-y-3">
                  {col.items.map((item, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-2 text-[14px] text-black/50"
                    >
                      <span className="text-black/20 mt-0.5 shrink-0">—</span>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
