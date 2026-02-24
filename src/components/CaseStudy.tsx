"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Clock,
  DollarSign,
  TrendingDown,
  ShieldCheck,
  Quote,
} from "lucide-react";
import { Slide } from "./Slide";

const heroMetrics = [
  { value: "18", unit: "days", label: "Migration Time", icon: Clock },
  { value: "€11K", unit: "", label: "Total Cost", icon: DollarSign },
  { value: "67%", unit: "", label: "Cost Savings", icon: TrendingDown },
  { value: "0", unit: "", label: "Data Loss", icon: ShieldCheck },
];

const timelinePhases = [
  { name: "Scan", days: 2, color: "bg-black/70" },
  { name: "Analysis", days: 3, color: "bg-black/55" },
  { name: "BRD", days: 2, color: "bg-black/45" },
  { name: "Config", days: 5, color: "bg-black" },
  { name: "Migration", days: 3, color: "bg-black/70" },
  { name: "QA", days: 2, color: "bg-black/45" },
  { name: "Go-live", days: 1, color: "bg-emerald-600" },
];

const totalDays = timelinePhases.reduce((sum, p) => sum + p.days, 0);

const beforeAfter = [
  { label: "Month-end Close", before: "12 days", after: "3 days" },
  { label: "Inventory Sync", before: "Manual / daily", after: "Real-time" },
  { label: "Channel Visibility", before: "Spreadsheets", after: "Unified dashboard" },
  { label: "Intl. Support", before: "Not possible", after: "Multi-currency ready" },
];

const T = {
  header: 0.1,
  metricsStart: 0.3,
  metricsGap: 0.08,
  timelineLabel: 0.65,
  timelineBar: 0.75,
  beforeAfterLabel: 1.0,
  beforeAfterStart: 1.1,
  beforeAfterGap: 0.05,
  quote: 1.0,
};

export function CaseStudy() {
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
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: T.header }}
        className="mb-8"
      >
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-black/30 mb-2">
          Partner Case Study
        </p>
        <h2 className="text-[44px] font-semibold tracking-[-0.03em] text-black mb-1.5">
          QuickBooks → NetSuite
        </h2>
        <p className="text-[16px] text-black/40">
          Altius Group used Source AI to deliver a mid-market migration for their client in 18 days — not 4 months.
        </p>
      </motion.div>

      {/* Hero Metric Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {heroMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: T.metricsStart + i * T.metricsGap,
              ease: "easeOut",
            }}
            className="bg-black text-white flex flex-col overflow-hidden relative"
          >
            {/* Thin emerald accent strip on top */}
            <div className="h-[3px] w-full bg-emerald-500/70 shrink-0" />
            <div className="p-5 flex flex-col flex-1">
              <metric.icon size={14} className="text-white/25 mb-3" />
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[38px] font-light tracking-[-0.04em] leading-none">
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-[15px] font-light text-white/40">
                    {metric.unit}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-white/30">
                {metric.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 18-Day Timeline Bar */}
      <div className="mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: T.timelineLabel }}
          className="text-[9px] font-mono uppercase tracking-[0.18em] text-black/25 mb-2"
        >
          18-Day Timeline
        </motion.p>
        <div className="flex h-[46px] gap-[2px]">
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

      {/* Bottom Row: Before/After Table | Quote Card */}
      <div className="flex-1 grid grid-cols-[1fr_1fr] gap-8 items-stretch min-h-0">

        {/* Before / After Table */}
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: T.beforeAfterLabel }}
            className="text-[9px] font-mono uppercase tracking-[0.15em] text-black/25 mb-3"
          >
            End Client Outcomes
          </motion.p>

          <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 mb-1.5 px-1">
            <span className="text-[8px] font-mono uppercase tracking-[0.1em] text-black/20" />
            <span className="text-[8px] font-mono uppercase tracking-[0.1em] text-black/20">
              Before
            </span>
            <span className="text-[8px] font-mono uppercase tracking-[0.1em] text-black/20">
              After
            </span>
          </div>

          <div className="space-y-0">
            {beforeAfter.map((row, j) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -6 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.25,
                  delay: T.beforeAfterStart + j * T.beforeAfterGap,
                }}
                className="grid grid-cols-[1fr_1fr_1fr] gap-3 py-3 border-b border-black/6 px-1"
              >
                <span className="text-[12px] font-medium text-black/55">
                  {row.label}
                </span>
                <span className="text-[12px] text-black/25 line-through decoration-black/15">
                  {row.before}
                </span>
                <span className="text-[12px] text-black/65 font-medium">
                  {row.after}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote Card — dark, visually rich */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: T.quote }}
          className="bg-black relative overflow-hidden flex flex-col justify-between"
        >
          {/* Emerald top accent bar */}
          <div className="h-[3px] w-full bg-emerald-500 shrink-0" />

          {/* Decorative geometric pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.045] pointer-events-none"
            viewBox="0 0 600 300"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <rect
                key={i}
                x={60 + i * 22}
                y={30 + i * 18}
                width={480 - i * 44}
                height={240 - i * 36}
                stroke="white"
                strokeWidth="1"
                fill="none"
              />
            ))}
            {/* Diagonal accent lines */}
            <line x1="0" y1="300" x2="300" y2="0" stroke="white" strokeWidth="0.5" />
            <line x1="100" y1="300" x2="400" y2="0" stroke="white" strokeWidth="0.5" />
            <line x1="300" y1="300" x2="600" y2="0" stroke="white" strokeWidth="0.5" />
          </svg>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-black to-black/90 pointer-events-none" />

          {/* Quote content */}
          <div className="relative z-10 flex flex-col flex-1 justify-center p-8">
            <Quote size={22} className="text-white/10 mb-5 scale-x-[-1]" />
            <p className="text-[15px] text-white/75 leading-relaxed mb-6 italic">
              &ldquo;We quoted €14K fixed-price and delivered in under three weeks.
              Our old model would have been €35K over four months with an offshore
              team. Source handled the technical execution — we kept the client
              relationship and made 50%+ margins.&rdquo;
            </p>
            <div className="border-t border-white/10 pt-4">
              <p className="text-[13px] font-semibold text-white/80">
                Managing Director
              </p>
              <p className="text-[9px] font-mono uppercase tracking-[0.12em] text-white/30 mt-0.5">
                Altius Group
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </Slide>
  );
}
