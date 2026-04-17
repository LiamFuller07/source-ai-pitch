"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Activity,
  TrendingUp,
  Headphones,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Slide } from "./Slide";

// ─── Visualizations ──────────────────────────────────────────────────────────

// Shared size so all three viz cards line up at exactly the same height.
const VIZ_WRAPPER_CLASSES =
  "bg-black/[0.02] border border-black/[0.08] rounded-md p-4 mb-5 min-h-[210px] flex flex-col";

function HealthcheckViz({ animate }: { animate: boolean }) {
  const dims: { label: string; score: number; flag: "green" | "amber" | "red" }[] = [
    { label: "Architecture", score: 78, flag: "green" },
    { label: "Data quality", score: 42, flag: "amber" },
    { label: "Process", score: 61, flag: "green" },
    { label: "Security", score: 33, flag: "red" },
    { label: "Integrations", score: 55, flag: "amber" },
    { label: "Reporting", score: 71, flag: "green" },
  ];
  const flagColor: Record<string, string> = {
    green: "bg-emerald-500",
    amber: "bg-amber-500",
    red: "bg-rose-500",
  };
  return (
    <div className={VIZ_WRAPPER_CLASSES}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/50 font-bold">
          6-dimension scan
        </span>
        <span className="text-[10px] font-mono text-black/35">24h turnaround</span>
      </div>
      <div className="space-y-1.5 flex-1 flex flex-col justify-center">
        {dims.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2.5">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${flagColor[d.flag]}`} />
            <span className="text-[12.5px] text-black/70 w-[100px] shrink-0">{d.label}</span>
            <div className="flex-1 h-1 bg-black/[0.06] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={animate ? { width: `${d.score}%` } : { width: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.08, ease: "easeOut" }}
                className="h-full bg-black/70"
              />
            </div>
            <span className="text-[11px] font-mono text-black/50 w-8 text-right shrink-0">
              {d.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThroughputViz({ animate }: { animate: boolean }) {
  // Parallel swim lanes — 6 concurrent implementations, 4 pipeline phases each.
  const phases = ["Scope", "Scan", "Deliver", "Confirm"];
  const lanes: { client: string; pct: number }[] = [
    { client: "Acme Corp",      pct: 100 },
    { client: "BetaCo",         pct: 85  },
    { client: "Cirra Labs",     pct: 68  },
    { client: "Delta Partners", pct: 54  },
    { client: "Evergreen",      pct: 32  },
    { client: "Forge Systems",  pct: 12  },
  ];

  // For each lane, map pct → 4 phase states: "done" | "active" | "idle"
  const phaseState = (pct: number, i: number): "done" | "active" | "idle" => {
    const threshold = (i + 1) * 25;
    if (pct >= threshold) return "done";
    if (pct > i * 25) return "active";
    return "idle";
  };

  return (
    <div className={VIZ_WRAPPER_CLASSES}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/50 font-bold">
          6 in flight · same team
        </span>
        <span className="text-[10px] font-mono text-black/35">Pipeline</span>
      </div>

      {/* Phase column headers */}
      <div className="flex items-center gap-1.5 mb-1.5 pl-[92px] pr-[28px]">
        {phases.map((p) => (
          <span
            key={p}
            className="flex-1 text-[8px] font-mono uppercase tracking-[0.1em] text-black/30 text-center"
          >
            {p}
          </span>
        ))}
      </div>

      <div className="space-y-1 flex-1 flex flex-col justify-center">
        {lanes.map((l, rowIdx) => (
          <div key={l.client} className="flex items-center gap-1.5">
            <span className="text-[10px] text-black/65 w-[88px] shrink-0 truncate font-medium">
              {l.client}
            </span>

            {/* 4 phase cells */}
            {phases.map((_, i) => {
              const state = phaseState(l.pct, i);
              const delay = 0.25 + rowIdx * 0.07 + i * 0.05;
              return (
                <div
                  key={i}
                  className="flex-1 relative h-2.5 rounded-[2px] bg-black/[0.06] overflow-hidden"
                >
                  {state !== "idle" && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={animate ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.5, delay, ease: "easeOut" }}
                      style={{ transformOrigin: "left" }}
                      className={`absolute inset-0 ${
                        state === "done"
                          ? "bg-black"
                          : "bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.55)_0_3px,rgba(0,0,0,0.18)_3px_6px)]"
                      }`}
                    />
                  )}
                </div>
              );
            })}

            <span className="text-[9.5px] font-mono w-7 text-right shrink-0 text-black/55 tabular-nums">
              {l.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MrrViz({ animate }: { animate: boolean }) {
  // 6-month revenue: one-time implementation fee (M1 only) + compounding MRR.
  // Totals ($K): M1=82, M2=22, M3=32, M4=42, M5=52, M6=62 — max=82 → scale to chart height.
  const months = ["M1", "M2", "M3", "M4", "M5", "M6"];
  const oneTime = [70, 0, 0, 0, 0, 0];
  const mrr =     [12, 22, 32, 42, 52, 62];
  const max = 82;
  const CHART_H = 120; // px

  return (
    <div className={VIZ_WRAPPER_CLASSES}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/50 font-bold">
          Revenue stack · 6 mo
        </span>
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <span className="flex items-center gap-1 text-black/55">
            <span className="w-2 h-2 bg-black/30 rounded-[1px]" /> Impl.
          </span>
          <span className="flex items-center gap-1 text-black">
            <span className="w-2 h-2 bg-emerald-500 rounded-[1px]" /> MRR
          </span>
        </div>
      </div>

      {/* Chart — fixed pixel height so the % bar heights resolve correctly */}
      <div className="flex-1 flex flex-col justify-end">
        <div
          className="flex items-end justify-between gap-2"
          style={{ height: CHART_H }}
        >
          {months.map((m, i) => {
            const otPx = (oneTime[i] / max) * CHART_H;
            const mrrPx = (mrr[i] / max) * CHART_H;
            return (
              <div
                key={m}
                className="flex-1 flex flex-col justify-end items-stretch"
                style={{ height: CHART_H }}
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={animate ? { height: otPx } : { height: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.06, ease: "easeOut" }}
                  className="w-full bg-black/30"
                  style={{ borderRadius: otPx > 0 ? "2px 2px 0 0" : 0 }}
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={animate ? { height: mrrPx } : { height: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 + i * 0.06, ease: "easeOut" }}
                  className="w-full bg-emerald-500"
                  style={{ borderRadius: otPx > 0 ? 0 : "2px 2px 0 0" }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-1.5">
          {months.map((m) => (
            <span
              key={m}
              className="flex-1 text-center text-[9px] font-mono text-black/35"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

type Tab = {
  Icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  stat: { value: string; label: string };
  Viz: (props: { animate: boolean }) => React.ReactNode;
};

const tabs: Tab[] = [
  {
    Icon: Activity,
    eyebrow: "New Revenue Line",
    title: "AI Healthchecks",
    body: "Source Healthcheck is a 5-hour engagement that returns an evidence-backed assessment in 24 hours — white-labelled under your brand.",
    bullets: [
      "6-dimension AI scan: architecture, data, process, security, integrations, reporting",
      "Green flags, red flags, dollar-quantified cost impact",
      "Every finding maps to a billable SOW line",
    ],
    stat: { value: "$25K–$65K", label: "addressable work surfaced per healthcheck" },
    Viz: HealthcheckViz,
  },
  {
    Icon: TrendingUp,
    eyebrow: "Throughput",
    title: "Scale Implementations",
    body: "Run more implementations in parallel without growing headcount. Source handles the execution so your team can focus on client relationships, not config grunt work.",
    bullets: [
      "10× parallel implementations with the same team",
      "Fixed-fee quotes in 24h regardless of deal size",
      "Junior-friendly execution, senior-quality output",
    ],
    stat: { value: "10×", label: "more implementations without new hires" },
    Viz: ThroughputViz,
  },
  {
    Icon: Headphones,
    eyebrow: "Recurring Revenue",
    title: "Managed Services at Scale",
    body: "Keep clients on the hook after go-live. Source runs the continuous integrations, reconciliations, and admin — you own the relationship and the invoice.",
    bullets: [
      "Ongoing integration monitoring + reconciliation",
      "Month-end, period-close and reporting automation",
      "Tier-up to full managed-services margins without ops headcount",
    ],
    stat: { value: "MRR", label: "on top of every implementation you ship" },
    Viz: MrrViz,
  },
];

export function Scale() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col justify-center px-[120px] py-[60px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
          Scale
        </p>
        <h2 className="text-[56px] font-semibold tracking-[-0.03em] text-black mb-3 leading-[1.05]">
          Do more. Win more. Scale up.
        </h2>
        <p className="text-[20px] text-black/45 leading-relaxed max-w-[1100px]">
          Source doesn&apos;t just make your current implementations cheaper —
          it unlocks new lines of revenue, opens up smaller deals that used to
          be unprofitable, and turns every project into recurring managed
          services.
        </p>
      </motion.div>

      {/* Three tabs */}
      <div className="grid grid-cols-3 gap-6">
        {tabs.map((tab, i) => (
          <motion.div
            key={tab.title}
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.12, ease: "easeOut" }}
            className="bg-white border border-black/10 rounded-md p-10 flex flex-col min-h-[520px]"
          >
            {/* Icon + eyebrow */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-black rounded-md flex items-center justify-center">
                <tab.Icon size={24} strokeWidth={1.75} className="text-white" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/35 font-bold">
                {tab.eyebrow}
              </span>
            </div>

            {/* Title + body */}
            <h3 className="text-[30px] font-semibold tracking-[-0.02em] text-black leading-tight mb-4">
              {tab.title}
            </h3>
            <p className="text-[17px] text-black/60 leading-relaxed mb-5">
              {tab.body}
            </p>

            {/* Visualization */}
            <div className="mb-auto">
              <tab.Viz animate={inView} />
            </div>

            {/* Stat footer */}
            <div className="mt-6 pt-6 border-t border-black/[0.08] flex items-center justify-between">
              <div>
                <div className="text-[28px] font-semibold tracking-[-0.02em] text-black leading-none">
                  {tab.stat.value}
                </div>
                <div className="text-[12px] font-mono uppercase tracking-[0.1em] text-black/40 mt-2">
                  {tab.stat.label}
                </div>
              </div>
              <ArrowUpRight size={22} strokeWidth={1.75} className="text-black/25" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footnote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.85 }}
        className="mt-6 text-[13px] text-black/30 leading-relaxed"
      >
        Three more ways Source helps your firm scale — beyond faster migrations.
      </motion.p>
    </Slide>
  );
}
