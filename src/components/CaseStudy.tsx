"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Mountain,
  Clock,
  DollarSign,
  TrendingDown,
  ShieldCheck,
  Quote,
  ShoppingCart,
  Users,
  Database,
  ArrowRight,
} from "lucide-react";
import { Slide } from "./Slide";

const heroMetrics = [
  { value: "18", unit: "days", label: "Migration Time", icon: Clock },
  { value: "$12K", unit: "", label: "Total Cost", icon: DollarSign },
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

const companyStats = [
  { icon: ShoppingCart, label: "Retail / E-commerce / Wholesale" },
  { icon: Users, label: "~120 employees" },
  { icon: DollarSign, label: "$28M ARR" },
  { icon: Database, label: "QuickBooks Enterprise" },
  { icon: ArrowRight, label: "→ NetSuite" },
];

const T = {
  brand: 0,
  header: 0.2,
  metricsStart: 0.4,
  metricsGap: 0.1,
  timelineLabel: 0.85,
  timelineBar: 0.95,
  beforeAfterLabel: 1.3,
  beforeAfterStart: 1.4,
  beforeAfterGap: 0.05,
  quote: 1.7,
};

export function CaseStudy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex px-0 py-0"
    >
      {/* LEFT: Meridian Brand Card — the end client */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: T.brand }}
        className="w-[480px] shrink-0 bg-black relative overflow-hidden flex flex-col"
      >
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-black to-stone-900/30" />
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.05]"
            viewBox="0 0 480 1080"
            fill="none"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <ellipse
                key={i}
                cx={240 + (i % 3) * 15}
                cy={540}
                rx={60 + i * 30}
                ry={50 + i * 25}
                stroke="white"
                strokeWidth="1"
              />
            ))}
          </svg>
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Top label */}
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/20 mb-auto">
            End Client
          </p>

          {/* Center: Brand identity */}
          <div className="flex flex-col items-center text-center my-auto">
            <div className="w-20 h-20 border-2 border-white/15 flex items-center justify-center mb-6">
              <Mountain size={40} className="text-white/50" />
            </div>
            <h3 className="text-[44px] font-bold text-white tracking-[-0.03em] mb-1">
              Meridian
            </h3>
            <p className="text-[22px] font-light text-white/40 tracking-[0.15em] uppercase mb-8">
              Outdoors
            </p>

            {/* Industry tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-white/25 px-2.5 py-1 border border-white/10">
                Retail
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-white/25 px-2.5 py-1 border border-white/10">
                E-commerce
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-white/25 px-2.5 py-1 border border-white/10">
                Wholesale
              </span>
            </div>

            {/* Company stats */}
            <div className="w-full space-y-3">
              {companyStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: T.brand + 0.3 + i * 0.06 }}
                  className="flex items-center gap-3 justify-center"
                >
                  <stat.icon size={13} className="text-white/20 shrink-0" />
                  <span className="text-[12px] text-white/40 font-mono">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/8 pt-4 mt-auto">
            <p className="text-[10px] font-mono text-white/15 uppercase tracking-[0.08em] text-center">
              Representative end client profile
            </p>
          </div>
        </div>
      </motion.div>

      {/* RIGHT: Case Study Data — from the consulting partner's perspective */}
      <div className="flex-1 flex flex-col px-[60px] py-[50px] overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: T.header }}
          className="mb-7"
        >
          <p className="text-[12px] font-mono uppercase tracking-[0.2em] text-black/30 mb-2">
            Partner Case Study
          </p>
          <h2 className="text-[40px] font-semibold tracking-[-0.03em] text-black mb-1">
            QuickBooks → NetSuite
          </h2>
          <p className="text-[16px] text-black/40">
            A consulting partner used Source AI to deliver this migration
            for their client in 18 days — not 4 months.
          </p>
        </motion.div>

        {/* Metrics Row */}
        <div className="grid grid-cols-4 gap-4 mb-7">
          {heroMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: T.metricsStart + i * T.metricsGap,
                ease: "easeOut",
              }}
              className="bg-black text-white p-5 flex flex-col"
            >
              <metric.icon size={15} className="text-white/25 mb-3" />
              <div className="flex items-baseline gap-1 mb-0.5">
                <span className="text-[36px] font-light tracking-[-0.04em] leading-none">
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-[15px] font-light text-white/45">
                    {metric.unit}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-white/30">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: T.timelineLabel }}
            className="text-[9px] font-mono uppercase tracking-[0.15em] text-black/25 mb-2"
          >
            18-Day Timeline
          </motion.p>
          <div className="flex h-[44px] gap-[2px]">
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

        {/* Bottom: Before/After + Quote side by side */}
        <div className="flex-1 grid grid-cols-[1fr_1fr] gap-8 items-start">
          {/* Before / After */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: T.beforeAfterLabel }}
              className="text-[9px] font-mono uppercase tracking-[0.15em] text-black/25 mb-3"
            >
              Client Outcomes
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
                  className="grid grid-cols-[1fr_1fr_1fr] gap-3 py-2.5 border-b border-black/6 px-1"
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

          {/* Quote — from the consulting partner, not the end client */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: T.quote }}
            className="bg-white p-8 flex flex-col justify-center h-full"
          >
            <Quote size={20} className="text-black/8 mb-4 scale-x-[-1]" />
            <p className="text-[15px] text-black/55 leading-relaxed mb-5 italic">
              &ldquo;We quoted $15K fixed-price and delivered in under three weeks.
              Our old model would have been $35K over four months with an offshore
              team. Source handled the technical execution — we kept the client
              relationship and made 50%+ margins.&rdquo;
            </p>
            <div>
              <p className="text-[13px] font-semibold text-black/65">
                Managing Director
              </p>
              <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-black/25">
                NetSuite Consulting Partner
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
}
