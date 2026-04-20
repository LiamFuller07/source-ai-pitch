"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Fragment, useRef } from "react";
import {
  FileText,
  Scan,
  DollarSign,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Check,
  Mic,
  ClipboardList,
  Mail,
  NotebookPen,
  type LucideIcon,
} from "lucide-react";
import { Slide } from "./Slide";

type StepViz = "sow" | "quote" | "margin";

const steps: {
  Icon: typeof FileText;
  num: string;
  title: string;
  body: string;
  viz: StepViz;
}[] = [
  {
    Icon: FileText,
    num: "01",
    title: "You send requirements",
    body: "Whatever you have — SOW, requirements doc, call transcript, email thread, or notes. Source AI parses it all.",
    viz: "sow",
  },
  {
    Icon: Scan,
    num: "02",
    title: "Get AI price",
    body: "Source AI reads what you sent, scans the client's live systems, and returns a fixed, locked-in price within 24 hours — no scoping calls, no T&M guesswork.",
    viz: "quote",
  },
  {
    Icon: DollarSign,
    num: "03",
    title: "You charge the client",
    body: "You mark up, invoice your client directly, and keep the margin. Source is your back-office engine.",
    viz: "margin",
  },
];

// ─── Step visualizations ─────────────────────────────────────────────────────

function StepSowViz() {
  const inputs: { Icon: LucideIcon; label: string; meta: string; uploaded: boolean }[] = [
    { Icon: FileText, label: "client-sow.pdf", meta: "12p", uploaded: true },
    { Icon: Mic, label: "discovery-call.m4a", meta: "42m", uploaded: true },
    { Icon: ClipboardList, label: "Requirements doc", meta: ".docx", uploaded: false },
    { Icon: Mail, label: "Email thread", meta: ".eml", uploaded: false },
    { Icon: NotebookPen, label: "Scoping notes", meta: ".txt", uploaded: false },
  ];

  return (
    <div className="grid grid-cols-[1fr_0.9fr] gap-2 min-h-[200px]">
      {/* Accepted inputs */}
      <div className="bg-black/[0.02] border border-black/[0.08] rounded-md p-3 flex flex-col">
        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-black/[0.06]">
          <div className="flex items-center gap-1.5">
            <FileText size={11} className="text-black/55" strokeWidth={1.75} />
            <span className="text-[10.5px] font-semibold text-black">Inputs</span>
          </div>
          <span className="text-[8.5px] font-mono tracking-[0.08em] text-black/45">
            Any format
          </span>
        </div>

        <ul className="space-y-1 flex-1">
          {inputs.map((it) => (
            <li
              key={it.label}
              className="flex items-center justify-between text-[10px] gap-1.5"
            >
              <span className="flex items-center gap-1.5 min-w-0 text-black/65">
                <it.Icon
                  size={9}
                  strokeWidth={1.75}
                  className={`shrink-0 ${it.uploaded ? "text-black/70" : "text-black/30"}`}
                />
                <span className="truncate">{it.label}</span>
              </span>
              <span className="flex items-center gap-1 shrink-0">
                <span className="text-[8.5px] font-mono text-black/35 tabular-nums">
                  {it.meta}
                </span>
                {it.uploaded && (
                  <Check size={8} strokeWidth={2.75} className="text-black/70" />
                )}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-2 pt-2 border-t border-black/[0.06] text-[8.5px] font-mono uppercase tracking-[0.1em] text-black/45 text-center">
          Any input accepted
        </p>
      </div>

      {/* Document preview — a peek at what Source parses */}
      <div className="bg-white border border-black/[0.10] rounded-md p-3 flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.03)] relative overflow-hidden">
        {/* Paper top strip */}
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-black/70" />

        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-black/[0.06]">
          <span className="text-[8.5px] font-mono uppercase tracking-[0.12em] text-black/40">
            client-sow.pdf
          </span>
          <span className="text-[8px] font-mono tracking-[0.08em] text-black/30">
            p.1
          </span>
        </div>

        {/* Skeleton doc lines with highlighted extracted entities */}
        <div className="flex-1 flex flex-col gap-[5px]">
          <div className="flex items-center gap-1">
            <div className="h-[4px] bg-black/70 rounded-[1px] w-[35%]" />
            <div className="h-[4px] bg-black/15 rounded-[1px] flex-1" />
          </div>
          <div className="h-[3px] bg-black/10 rounded-[1px] w-[92%]" />
          <div className="h-[3px] bg-black/10 rounded-[1px] w-[78%]" />
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[8px] font-mono font-semibold bg-black text-white px-1.5 py-[1px] rounded-[2px] tracking-tight">
              NetSuite
            </span>
            <div className="h-[3px] bg-black/10 rounded-[1px] flex-1" />
          </div>
          <div className="h-[3px] bg-black/10 rounded-[1px] w-[85%]" />
          <div className="flex items-center gap-1 mt-0.5">
            <div className="h-[3px] bg-black/10 rounded-[1px] w-[22%]" />
            <span className="text-[8px] font-mono font-semibold bg-black text-white px-1.5 py-[1px] rounded-[2px] tracking-tight">
              21 days
            </span>
            <div className="h-[3px] bg-black/10 rounded-[1px] flex-1" />
          </div>
          <div className="h-[3px] bg-black/10 rounded-[1px] w-[68%]" />
          <div className="flex items-center gap-1">
            <div className="h-[3px] bg-black/10 rounded-[1px] w-[40%]" />
            <span className="text-[8px] font-mono font-semibold bg-black text-white px-1.5 py-[1px] rounded-[2px] tracking-tight">
              $32.5K
            </span>
          </div>
          <div className="h-[3px] bg-black/10 rounded-[1px] w-[80%]" />
        </div>

        <div className="mt-2 pt-2 border-t border-black/[0.06] flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[8.5px] font-mono uppercase tracking-[0.1em] text-black/55 font-bold">
            <Sparkles size={8} strokeWidth={2.25} className="text-black/70" />
            Parsed
          </span>
          <span className="text-[8.5px] font-mono tracking-[0.08em] text-black/45 tabular-nums">
            12 fields
          </span>
        </div>
      </div>
    </div>
  );
}

function StepQuoteViz() {
  const items: { label: string; value: string }[] = [
    { label: "Data migration", value: "$4,200" },
    { label: "Config & COA", value: "$2,800" },
    { label: "Testing & QA", value: "$1,500" },
  ];
  return (
    <div className="bg-black/[0.02] border border-black/[0.08] rounded-md p-4 min-h-[200px] flex flex-col">
      <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-black/55" strokeWidth={1.75} />
          <span className="text-[12px] font-semibold text-black">AI quote</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-[0.08em] text-black/70">
          <span className="w-1.5 h-1.5 rounded-full bg-black/70" />
          18h · LOCKED
        </span>
      </div>
      <div className="space-y-1.5 mb-3 flex-1">
        {items.map((it) => (
          <div key={it.label} className="flex items-center justify-between text-[12px]">
            <span className="text-black/60">{it.label}</span>
            <span className="font-mono text-black/85">{it.value}</span>
          </div>
        ))}
      </div>
      <div className="bg-black text-white px-3 py-2 flex items-center justify-between rounded-sm">
        <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/55">
          Fixed fee
        </span>
        <span className="text-[15px] font-semibold">$8,500</span>
      </div>
    </div>
  );
}

function StepMarginViz() {
  // Economics · $8.5K cost, $30–45K invoice → $21.5K–$36.5K kept (71–81% margin)
  return (
    <div className="bg-black/[0.02] border border-black/[0.08] rounded-md p-4 min-h-[200px] flex flex-col">
      <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <TrendingUp size={13} className="text-black/70" strokeWidth={1.75} />
          <span className="text-[12px] font-semibold text-black">
            Your economics
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold tracking-[0.08em] text-black/70">
          71–81% margin
        </span>
      </div>

      {/* Flow: pay Source → charge client */}
      <div className="space-y-2.5 flex-1">
        <div>
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-black/55">Source charges you</span>
            <span className="font-mono text-black/80">$8.5K</span>
          </div>
          <div className="w-full h-2 bg-black/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-black/70" style={{ width: "22%" }} />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-black/55">You charge client</span>
            <span className="font-mono text-black/80">$30–45K</span>
          </div>
          <div className="w-full h-2 bg-black/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-black" style={{ width: "100%" }} />
          </div>
          <p className="text-[9px] text-black/35 mt-1 leading-tight">
            Market rate for equivalent QB → NetSuite migration
          </p>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-black/[0.06] flex items-center justify-between">
        <span className="text-[11px] text-black/55">You keep</span>
        <span className="font-mono text-[13px] font-semibold text-black">
          $21.5K – $36.5K
        </span>
      </div>
    </div>
  );
}

const vizMap: Record<StepViz, () => React.ReactNode> = {
  sow: StepSowViz,
  quote: StepQuoteViz,
  margin: StepMarginViz,
};

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col justify-center px-[120px]"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
            Pricing
          </p>
          <h2 className="text-[56px] font-semibold tracking-[-0.03em] text-black mb-3">
            Send Requirements. Get Price. Charge Client.
          </h2>
          <p className="text-[20px] text-black/45 leading-relaxed max-w-[900px]">
            No quoting calls, no scoping workshops, no T&amp;M surprises. Three steps from requirements to invoice.
          </p>
        </motion.div>

        {/* Three step flow */}
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-0 mb-8">
          {steps.map((step, i) => {
            const Viz = vizMap[step.viz];
            return (
            <Fragment key={step.num}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="bg-white border border-black/15 p-8 flex flex-col min-h-[440px]"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-black rounded-md flex items-center justify-center">
                    <step.Icon size={24} strokeWidth={1.75} className="text-white" />
                  </div>
                  <span className="text-[13px] font-mono tracking-[0.15em] text-black/25 font-medium">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-black leading-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-[14.5px] text-black/55 leading-relaxed mb-5">
                  {step.body}
                </p>
                <div className="mt-auto">
                  <Viz />
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-center justify-center px-4"
                >
                  <ArrowRight size={32} strokeWidth={1.5} className="text-black/20" />
                </motion.div>
              )}
            </Fragment>
          );
          })}
        </div>

        {/* Free first migration block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75 }}
          className="bg-black text-white p-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-10">
            <div>
              <p className="text-[48px] font-bold tracking-[-0.04em] leading-none">
                FREE
              </p>
              <p className="text-[12px] font-mono uppercase tracking-[0.1em] text-white/30 mt-2">
                Pilot
              </p>
            </div>
            <div className="w-[1px] h-16 bg-white/10" />
            <div>
              <p className="text-[24px] font-semibold tracking-[-0.02em] mb-2">
                First Pilot on us.
              </p>
              <p className="text-[16px] text-white/45 leading-relaxed max-w-[520px]">
                Send us your first SOW — Source AI will scope it, scan the client&apos;s systems, and ship a working pilot. No cost, no commitment.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.85 }}
          className="mt-4 text-[12px] text-black/25 leading-relaxed"
        >
          Fixed price, locked quote upfront — returned within 24 hours of SOW submission.
        </motion.p>
      </div>
    </Slide>
  );
}
