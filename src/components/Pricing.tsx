"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Fragment, useRef } from "react";
import { FileText, Scan, DollarSign, ArrowRight, Sparkles, TrendingUp, Check } from "lucide-react";
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
    title: "You send the SOW",
    body: "Drop in the client's scope, requirements, or existing SOW — however detailed or rough.",
    viz: "sow",
  },
  {
    Icon: Scan,
    num: "02",
    title: "Get AI price",
    body: "Source AI reads the SOW, scans the client's live systems, and returns a fixed, locked-in price within 24 hours — no scoping calls, no T&M guesswork.",
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
  const scopeItems: string[] = [
    "Migrate 94,127 transactions · QuickBooks → NetSuite OneWorld",
    "Rebuild Chart of Accounts · 247 GL · 6 subsidiaries",
    "Re-point 4 integrations · Shopify, Stripe, Avalara, HubSpot",
  ];
  const fees: { label: string; value: string }[] = [
    { label: "Fixed fee", value: "$32,500" },
    { label: "Payment terms", value: "50 / 50" },
  ];
  return (
    <div
      className="relative bg-white border border-black/10 rounded-md overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03),0_10px_22px_-14px_rgba(0,0,0,0.15)] min-h-[200px] flex flex-col"
    >
      {/* Paper top strip */}
      <div className="h-[2px] bg-black/80" />

      {/* Document header */}
      <div className="px-4 pt-2.5 pb-2 border-b border-black/[0.08]">
        <div className="flex items-center justify-between leading-none">
          <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-black/35">
            Statement of Work
          </span>
          <span className="text-[8px] font-mono tracking-[0.08em] text-black/30 tabular-nums">
            v2 · 14 Apr 2026
          </span>
        </div>
        <p className="text-[12px] font-semibold text-black leading-tight tracking-[-0.01em] mt-1.5">
          Acme Corp · QB → NetSuite
        </p>
      </div>

      {/* Body sections */}
      <div className="px-4 py-2.5 flex-1 flex flex-col gap-2">
        {/* Scope */}
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-black/55 mb-1">
            Scope
          </p>
          <ul className="space-y-[2px]">
            {scopeItems.map((t, i) => (
              <li
                key={i}
                className="text-[8px] leading-[1.4] text-black/65 pl-2 relative before:content-['·'] before:absolute before:left-0 before:text-black/30"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Fees */}
        <div className="mt-auto">
          <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-black/55 mb-1">
            Fees &amp; terms
          </p>
          <div className="border border-black/[0.08] rounded-[3px] overflow-hidden">
            {fees.map((f, i) => (
              <div
                key={f.label}
                className={`flex items-center justify-between px-2 py-1 ${
                  i === 0 ? "border-b border-black/[0.06] bg-black/[0.015]" : ""
                }`}
              >
                <span className="text-[8px] text-black/55">{f.label}</span>
                <span className="text-[9px] font-mono font-semibold text-black/85 tabular-nums">
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="px-4 py-1.5 border-t border-black/[0.08] bg-black/[0.02] flex items-center justify-between">
        <span className="text-[8px] font-mono tracking-[0.06em] text-black/40 truncate">
          client-sow.pdf
        </span>
        <span className="inline-flex items-center gap-1 text-[8px] font-mono font-bold tracking-[0.1em] text-black/70 shrink-0">
          <Check size={8} strokeWidth={2.75} className="text-black/70" />
          UPLOADED
        </span>
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
            Send SOW. Get Price. Charge Client.
          </h2>
          <p className="text-[20px] text-black/45 leading-relaxed max-w-[900px]">
            No quoting calls, no scoping workshops, no T&amp;M surprises. Three steps from SOW to invoice.
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
                className="bg-white border border-black/10 rounded-md p-8 flex flex-col min-h-[440px]"
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
