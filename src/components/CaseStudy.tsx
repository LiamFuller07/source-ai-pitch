"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, DollarSign, TrendingDown, ShieldCheck, Quote } from "lucide-react";
import { Slide } from "./Slide";

const heroMetrics = [
  { value: "18", unit: "days", label: "Migration Time", icon: Clock },
  { value: "$12K", unit: "", label: "Total Cost", icon: DollarSign },
  { value: "67%", unit: "", label: "Cost Savings", icon: TrendingDown },
  { value: "0", unit: "", label: "Data Loss Incidents", icon: ShieldCheck },
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
  {
    label: "Month-end Close",
    before: "12 days",
    after: "3 days",
  },
  {
    label: "Inventory Sync",
    before: "Manual / daily",
    after: "Real-time",
  },
  {
    label: "Channel Visibility",
    before: "Spreadsheets",
    after: "Unified dashboard",
  },
  {
    label: "Intl. Support",
    before: "Not possible",
    after: "Multi-currency ready",
  },
];

const T = {
  header: 0,
  metricsStart: 0.3,
  metricsGap: 0.12,
  timelineLabel: 0.9,
  timelineBar: 1.0,
  beforeAfterLabel: 1.4,
  beforeAfterStart: 1.5,
  beforeAfterGap: 0.06,
  quote: 1.9,
};

export function CaseStudy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-white"
      className="flex flex-col px-[100px] py-[60px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: T.header }}
        className="mb-10"
      >
        <p className="text-[14px] font-mono uppercase tracking-[0.2em] text-black/30 mb-2">
          Case Study
        </p>
        <h2 className="text-[48px] font-semibold tracking-[-0.03em] text-black mb-2">
          Meridian Outdoors
        </h2>
        <p className="text-[20px] text-black/40">
          QuickBooks Enterprise → NetSuite &mdash; Full migration in 18 days
        </p>
      </motion.div>

      {/* Hero Metrics Row */}
      <div className="grid grid-cols-4 gap-5 mb-10">
        {heroMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.45,
              delay: T.metricsStart + i * T.metricsGap,
              ease: "easeOut",
            }}
            className="bg-black text-white p-7 flex flex-col"
          >
            <metric.icon size={18} className="text-white/30 mb-4" />
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-[48px] font-light tracking-[-0.04em] leading-none">
                {metric.value}
              </span>
              {metric.unit && (
                <span className="text-[18px] font-light text-white/50">
                  {metric.unit}
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/35">
              {metric.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Timeline Bar */}
      <div className="mb-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: T.timelineLabel }}
          className="text-[10px] font-mono uppercase tracking-[0.15em] text-black/25 mb-3"
        >
          18-Day Timeline
        </motion.p>
        <div className="flex h-[52px] gap-[2px]">
          {timelinePhases.map((phase, i) => (
            <motion.div
              key={phase.name}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: T.timelineBar + i * 0.06,
                ease: "easeOut",
              }}
              style={{
                width: `${(phase.days / totalDays) * 100}%`,
                transformOrigin: "left",
              }}
              className={`${phase.color} flex flex-col items-center justify-center text-white relative`}
            >
              <span className="text-[11px] font-medium leading-none">
                {phase.name}
              </span>
              <span className="text-[9px] font-mono text-white/50 mt-1">
                {phase.days}d
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom row: Before/After + Quote */}
      <div className="flex-1 grid grid-cols-[1fr_1fr] gap-12 items-start">
        {/* Before / After */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: T.beforeAfterLabel }}
            className="text-[10px] font-mono uppercase tracking-[0.15em] text-black/25 mb-4"
          >
            Before &amp; After
          </motion.p>

          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 mb-2 px-1">
            <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-black/20" />
            <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-black/20">
              Before
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-black/20">
              After
            </span>
          </div>

          <div className="space-y-0">
            {beforeAfter.map((row, j) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.3,
                  delay: T.beforeAfterStart + j * T.beforeAfterGap,
                }}
                className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-3 border-b border-black/6 px-1"
              >
                <span className="text-[13px] font-medium text-black/60">
                  {row.label}
                </span>
                <span className="text-[13px] text-black/30 line-through decoration-black/15">
                  {row.before}
                </span>
                <span className="text-[13px] text-black/70 font-medium">
                  {row.after}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: T.quote }}
          className="bg-[#f8f8f8] p-10 flex flex-col justify-center h-full"
        >
          <Quote size={24} className="text-black/10 mb-5 scale-x-[-1]" />
          <p className="text-[18px] text-black/60 leading-relaxed mb-6 italic">
            &ldquo;We were quoted 4 months and $85K by two other firms. Source AI
            and our consultant had us live on NetSuite in under three weeks for a
            fraction of the cost. The data accuracy was better than any manual
            migration I&apos;ve seen.&rdquo;
          </p>
          <div>
            <p className="text-[14px] font-semibold text-black/70">
              Sarah Chen
            </p>
            <p className="text-[12px] font-mono uppercase tracking-[0.1em] text-black/30">
              CFO, Meridian Outdoors
            </p>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
