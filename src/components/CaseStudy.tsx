"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Clock,
  DollarSign,
  TrendingDown,
  Quote,
  Building2,
} from "lucide-react";
import { Slide } from "./Slide";

const heroMetrics = [
  { value: "18", unit: "days", label: "Migration Time", icon: Clock },
  { value: "€11K", unit: "", label: "Total Cost", icon: DollarSign },
  { value: "67%", unit: "", label: "Cost Savings", icon: TrendingDown },
];

const timelinePhases = [
  { name: "Scan", days: 2, color: "bg-black/60" },
  { name: "Analysis", days: 3, color: "bg-black/45" },
  { name: "BRD", days: 2, color: "bg-black/35" },
  { name: "Config", days: 5, color: "bg-black" },
  { name: "Migration", days: 3, color: "bg-black/60" },
  { name: "QA", days: 2, color: "bg-black/35" },
  { name: "Go-live", days: 1, color: "bg-black" },
];

const totalDays = timelinePhases.reduce((sum, p) => sum + p.days, 0);

const beforeAfter = [
  { label: "Month-end Close", before: "12 days", after: "3 days" },
  { label: "Inventory Sync", before: "Manual / daily", after: "Real-time" },
  { label: "Channel Visibility", before: "Spreadsheets", after: "Unified dashboard" },
  { label: "Intl. Support", before: "Not possible", after: "Multi-currency ready" },
  { label: "Reporting", before: "48hr manual exports", after: "Live dashboards" },
  { label: "Audit Trail", before: "Fragmented", after: "Fully automated" },
];

const T = {
  header: 0.1,
  metricsStart: 0.3,
  metricsGap: 0.1,
  timelineLabel: 0.65,
  timelineBar: 0.75,
  bottomRow: 1.0,
  beforeAfterStart: 1.1,
  beforeAfterGap: 0.04,
  profile: 1.0,
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
        className="mb-5"
      >
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-black/30 mb-2">
          Partner Case Study
        </p>
        <h2 className="text-[42px] font-semibold tracking-[-0.03em] text-black mb-1">
          QuickBooks → NetSuite
        </h2>
        <p className="text-[15px] text-black/40">
          Altius Group used Source AI to deliver a mid-market migration for their
          client in 18 days — not 4 months.
        </p>
      </motion.div>

      {/* Hero Metric Cards — 3 cards */}
      <div className="grid grid-cols-3 gap-4 mb-5">
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
            className="bg-white border border-black/8 p-5 flex flex-col"
          >
            <metric.icon size={14} className="text-black/20 mb-2" />
            <div className="flex items-baseline gap-1.5 mb-0.5">
              <span className="text-[38px] font-semibold tracking-[-0.04em] leading-none text-black">
                {metric.value}
              </span>
              {metric.unit && (
                <span className="text-[15px] font-light text-black/35">
                  {metric.unit}
                </span>
              )}
            </div>
            <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-black/30">
              {metric.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* 18-Day Timeline Bar */}
      <div className="mb-5">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: T.timelineLabel }}
          className="text-[9px] font-mono uppercase tracking-[0.18em] text-black/25 mb-2"
        >
          18-Day Timeline
        </motion.p>
        <div className="flex h-[36px] gap-[2px]">
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
              <span className="text-[9px] font-medium leading-none">
                {phase.name}
              </span>
              <span className="text-[7px] font-mono text-white/45 mt-0.5">
                {phase.days}d
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Row — fills remaining height */}
      <div className="flex-1 grid grid-cols-[1fr_1fr] gap-6 min-h-0">
        {/* Left: End Client Outcomes */}
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: T.bottomRow }}
            className="text-[9px] font-mono uppercase tracking-[0.15em] text-black/25 mb-3"
          >
            End Client Outcomes
          </motion.p>

          <div className="grid grid-cols-[1.2fr_1fr_1.2fr] gap-2 mb-1.5 px-1">
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
                className="grid grid-cols-[1.2fr_1fr_1.2fr] gap-2 py-2.5 border-b border-black/6 px-1"
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

        {/* Right: Altius Profile + Quote */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: T.profile }}
          className="bg-black relative overflow-hidden flex flex-col"
        >
          {/* Decorative grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full p-7">
            {/* Compact partner identity — single row */}
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/8">
              <div className="w-9 h-9 border border-white/15 flex items-center justify-center shrink-0">
                <Building2 size={16} className="text-white/40" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[16px] font-bold text-white tracking-[-0.02em]">
                  Altius Group
                </p>
                <p className="text-[8px] font-mono uppercase tracking-[0.12em] text-white/25">
                  NetSuite Consulting &middot; Munich &middot; 35 consultants
                </p>
              </div>
            </div>

            {/* Quote — fills remaining space */}
            <div className="flex flex-col flex-1 justify-center">
              <Quote size={18} className="text-white/10 mb-4 scale-x-[-1]" />
              <p className="text-[14px] text-white/65 leading-relaxed mb-5 italic">
                &ldquo;We quoted €14K fixed-price and delivered in under three
                weeks. Our old model would have been €35K over four months with
                an offshore team. Source handled the technical execution — we
                kept the client relationship and made 50%+ margins.&rdquo;
              </p>
              <div>
                <p className="text-[12px] font-semibold text-white/70">
                  Managing Director
                </p>
                <p className="text-[8px] font-mono uppercase tracking-[0.12em] text-white/25 mt-0.5">
                  Altius Group
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
