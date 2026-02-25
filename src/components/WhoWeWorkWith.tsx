"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Mountain,
  ShoppingCart,
  Users,
  DollarSign,
  Database,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { Slide } from "./Slide";

const painPoints = [
  "Manual inventory sync across 3 sales channels",
  "Month-end close takes 12+ days",
  "No real-time visibility into wholesale margins",
  "Custom integrations breaking on every QB update",
  "Cannot support international expansion",
];

const companyDetails = [
  { label: "Industry", value: "Outdoor Retail / E-commerce / Wholesale", icon: ShoppingCart },
  { label: "Employees", value: "~120 across 4 locations", icon: Users },
  { label: "Revenue", value: "$28M ARR", icon: DollarSign },
  { label: "Legacy System", value: "QuickBooks Enterprise", icon: Database },
  { label: "Target System", value: "NetSuite", icon: ArrowRight },
];

const T = {
  hero: 0,
  title: 0.3,
  details: 0.5,
  detailGap: 0.08,
  painLabel: 1.0,
  painStart: 1.1,
  painGap: 0.06,
};

export function WhoWeWorkWith() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col px-[80px] py-[60px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: T.hero }}
        className="mb-10"
      >
        <p className="text-[14px] font-mono uppercase tracking-[0.2em] text-black/30 mb-2">
          Who We Work With
        </p>
        <h2 className="text-[48px] font-normal font-[family-name:var(--font-display)] tracking-[-0.03em] text-black">
          Built for mid-market migrations.
        </h2>
      </motion.div>

      {/* Main content — hero visual left, details right */}
      <div className="flex-1 grid grid-cols-[1.1fr_0.9fr] gap-12 items-start">
        {/* LEFT: Hero Visual Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: T.hero, ease: "easeOut" }}
          className="relative overflow-hidden bg-black h-[680px]"
        >
          {/* Decorative background pattern */}
          <div className="absolute inset-0">
            {/* Mountain/outdoor gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-black to-stone-900/30" />
            {/* Topographic-style lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.06]"
              viewBox="0 0 600 700"
              fill="none"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx={300 + (i % 3) * 20}
                  cy={350}
                  rx={80 + i * 35}
                  ry={60 + i * 30}
                  stroke="white"
                  strokeWidth="1"
                />
              ))}
            </svg>
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Company identity */}
          <div className="relative z-10 flex flex-col h-full p-12">
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              {/* Logo mark */}
              <div className="w-24 h-24 border-2 border-white/20 flex items-center justify-center mb-8">
                <Mountain size={48} className="text-white/60" />
              </div>
              <h3 className="text-[56px] font-bold text-white tracking-[-0.03em] mb-2">
                Meridian
              </h3>
              <p className="text-[28px] font-light text-white/50 tracking-[0.15em] uppercase">
                Outdoors
              </p>
              <div className="mt-8 flex items-center gap-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/25 px-3 py-1.5 border border-white/10">
                  Retail
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/25 px-3 py-1.5 border border-white/10">
                  E-commerce
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/25 px-3 py-1.5 border border-white/10">
                  Wholesale
                </span>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10 pt-5 flex items-center justify-between">
              <p className="text-[11px] font-mono text-white/20 uppercase tracking-[0.1em]">
                Representative Client Profile
              </p>
              <p className="text-[11px] font-mono text-white/20">
                QuickBooks → NetSuite
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Company Details */}
        <div className="flex flex-col gap-8">
          {/* Company name + subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: T.title }}
          >
            <h3 className="text-[36px] font-bold text-black tracking-[-0.02em] mb-1">
              Meridian Outdoors
            </h3>
            <p className="text-[16px] text-black/40 leading-relaxed">
              Mid-market outdoor retail brand with DTC e-commerce,
              wholesale distribution, and 4 physical retail locations.
            </p>
          </motion.div>

          {/* Detail rows */}
          <div className="space-y-0">
            {companyDetails.map((detail, i) => (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.35,
                  delay: T.details + i * T.detailGap,
                }}
                className="flex items-center gap-4 py-4 border-b border-black/6"
              >
                <detail.icon size={16} className="text-black/20 shrink-0" />
                <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-black/30 w-[120px] shrink-0">
                  {detail.label}
                </span>
                <span className="text-[15px] text-black/70 font-medium">
                  {detail.value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Pain points */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: T.painLabel }}
              className="flex items-center gap-2 mb-4"
            >
              <AlertTriangle size={14} className="text-black/25" />
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-black/30">
                Key Pain Points
              </p>
            </motion.div>
            <div className="space-y-2.5">
              {painPoints.map((point, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.25,
                    delay: T.painStart + j * T.painGap,
                  }}
                  className="flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black/15 shrink-0 mt-[7px]" />
                  <span className="text-[14px] text-black/50 leading-snug">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
