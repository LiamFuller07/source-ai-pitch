"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Handshake,
  Building2,
  ArrowLeft,
  Globe,
  Linkedin,
  FileText,
  Presentation,
} from "lucide-react";
import { Slide } from "./Slide";

// ---------------------------------------------------------------------------
// Step data — preserved exactly as before
// ---------------------------------------------------------------------------

const allianceSteps = [
  "You find a QuickBooks customer",
  "Refer them to Source",
  "Source delivers $10K migration in 10 days",
  "Customer returns to you for post-go-live work",
  "You earn a kickback + ongoing revenue",
];

const solutionSteps = [
  "You sell the NetSuite license directly",
  "Source handles 80% of implementation via AI",
  "Your certified consultants handle the final 20%",
  "Client goes live in weeks, not months",
  "You scale without hiring — higher margins on every deal",
];

// ---------------------------------------------------------------------------
// Compact mockup components
// ---------------------------------------------------------------------------

function WebsiteMini() {
  return (
    <div className="flex flex-col h-full border border-black/10 overflow-hidden bg-white">
      {/* Browser chrome bar */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-black/08 bg-[#f5f5f5]">
        <span className="w-2 h-2 rounded-full bg-black/15" />
        <span className="w-2 h-2 rounded-full bg-black/15" />
        <span className="w-2 h-2 rounded-full bg-black/15" />
        <span className="ml-2 flex-1 bg-white border border-black/10 rounded-sm h-3" />
      </div>
      {/* Hero section */}
      <div className="bg-black flex-1 flex flex-col items-center justify-center px-4 py-5 gap-2">
        <p className="text-white text-[10px] font-semibold tracking-[-0.01em] text-center leading-tight">
          QuickBooks &rarr; NetSuite in 10 Days
        </p>
        <p className="text-white/45 text-[8px] font-mono uppercase tracking-[0.08em] text-center">
          Fixed price. Fully automated.
        </p>
        <button className="mt-1 bg-white text-black text-[8px] font-mono uppercase tracking-[0.08em] px-3 py-1">
          Get Started
        </button>
      </div>
      {/* Stat row */}
      <div className="grid grid-cols-3 divide-x divide-black/08 border-t border-black/08">
        {[
          { val: "$10K", label: "Fixed" },
          { val: "10 Days", label: "Go-live" },
          { val: "80%", label: "AI" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center py-2 px-1">
            <span className="text-[9px] font-bold tracking-[-0.01em]">{s.val}</span>
            <span className="text-[7px] font-mono uppercase tracking-[0.08em] text-black/35">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinkedInMini() {
  return (
    <div className="flex flex-col h-full bg-[#f3f2ef] border border-black/10 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-black/06 px-3 py-2 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center shrink-0">
          <span className="text-white text-[7px] font-bold">YF</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[8px] font-semibold text-black">Your Firm</span>
          <span className="text-[7px] text-black/40 font-mono uppercase tracking-[0.04em]">
            ERP Consulting &middot; 2h
          </span>
        </div>
      </div>
      {/* Post body */}
      <div className="px-3 py-2 flex-1">
        <p className="text-[8px] text-black/65 leading-relaxed">
          We just migrated a $2M retailer from QuickBooks to NetSuite in{" "}
          <span className="font-semibold text-black">8 days</span>. AI handled
          the heavy lifting &mdash; our team focused on what mattered.
        </p>
        {/* Article card preview */}
        <div className="mt-2 border border-black/10 bg-white px-2 py-1.5">
          <p className="text-[7px] font-semibold text-black leading-tight">
            How We Cut ERP Implementation Time by 80%
          </p>
          <p className="text-[6px] text-black/35 font-mono uppercase tracking-[0.06em] mt-0.5">
            yourfirm.com
          </p>
        </div>
      </div>
      {/* Engagement row */}
      <div className="bg-white border-t border-black/08 px-3 py-1.5 flex gap-3">
        <span className="text-[7px] text-black/40 font-mono">47 likes</span>
        <span className="text-[7px] text-black/40 font-mono">12 comments</span>
      </div>
    </div>
  );
}

function CaseStudyMini() {
  return (
    <div className="flex flex-col h-full bg-white border border-black/10 overflow-hidden">
      {/* Header band */}
      <div className="bg-[#f5f5f5] border-b border-black/08 px-3 py-2 flex items-center gap-2">
        <div className="w-5 h-5 bg-black/10 flex items-center justify-center">
          <span className="text-[6px] font-bold text-black/40">YF</span>
        </div>
        <span className="text-[7px] font-mono uppercase tracking-[0.12em] text-black/35">
          Case Study
        </span>
      </div>
      {/* Title */}
      <div className="px-3 pt-3 pb-2">
        <p className="text-[8px] font-semibold text-black leading-tight tracking-[-0.01em]">
          Acme Retail: QuickBooks to NetSuite in 8 Days
        </p>
      </div>
      {/* Stat row */}
      <div className="grid grid-cols-3 divide-x divide-black/08 border-y border-black/08 mx-3">
        {[
          { val: "8", label: "Days" },
          { val: "$10K", label: "Cost" },
          { val: "3.2K", label: "Records" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center py-1.5">
            <span className="text-[9px] font-bold tracking-[-0.01em]">{s.val}</span>
            <span className="text-[6px] font-mono uppercase tracking-[0.08em] text-black/35">
              {s.label}
            </span>
          </div>
        ))}
      </div>
      {/* Content lines */}
      <div className="px-3 pt-2 pb-3 flex flex-col gap-1.5 flex-1">
        {[70, 55, 65, 40].map((w, i) => (
          <div
            key={i}
            className="h-1.5 bg-black/08 rounded-sm"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function SalesDeckMini() {
  return (
    <div className="flex flex-col h-full bg-black border border-white/10 overflow-hidden">
      {/* Slide dot row */}
      <div className="flex gap-1 px-3 pt-2.5 pb-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 ${i === 1 ? "bg-white/60" : "bg-white/15"}`}
          />
        ))}
      </div>
      {/* Slide content */}
      <div className="flex-1 flex flex-col justify-center px-4 py-3">
        <p className="text-[7px] font-mono uppercase tracking-[0.12em] text-white/35 mb-1.5">
          The Offer
        </p>
        <p className="text-[13px] font-bold tracking-[-0.02em] text-white leading-tight">
          $10K. 10 Days. Done.
        </p>
        <p className="text-[8px] text-white/45 mt-1.5 leading-relaxed">
          Fixed price. AI-powered. No surprises.
        </p>
      </div>
      {/* Stat row */}
      <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10">
        {[
          { val: "$10K", label: "Fixed" },
          { val: "10d", label: "Timeline" },
          { val: "80%", label: "AI" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center py-2">
            <span className="text-[9px] font-bold text-white tracking-[-0.01em]">
              {s.val}
            </span>
            <span className="text-[6px] font-mono uppercase tracking-[0.08em] text-white/35">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Go-to-Market Panel
// ---------------------------------------------------------------------------

const mockups = [
  { label: "Website", icon: Globe, component: WebsiteMini },
  { label: "LinkedIn", icon: Linkedin, component: LinkedInMini },
  { label: "Case Study", icon: FileText, component: CaseStudyMini },
  { label: "Sales Deck", icon: Presentation, component: SalesDeckMini },
];

interface GoToMarketPanelProps {
  direction: "left" | "right";
}

function GoToMarketPanel({ direction }: GoToMarketPanelProps) {
  const xEntry = direction === "left" ? -60 : 60;

  return (
    <motion.div
      key="gtm-panel"
      initial={{ opacity: 0, x: xEntry }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: xEntry }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white border border-black/10 p-8 flex flex-col h-full"
    >
      {/* Panel header */}
      <div className="mb-6">
        <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/30 mb-2">
          Go to Market
        </p>
        <h3 className="text-[20px] font-semibold tracking-[-0.02em] mb-1.5">
          Market it your way.
        </h3>
        <p className="text-[14px] text-black/45 leading-relaxed">
          Use our white-label assets — or build your own. Source gives you a
          full marketing kit to start selling immediately.
        </p>
      </div>

      {/* 2x2 mockup grid */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {mockups.map(({ label, icon: Icon, component: MockupComponent }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            {/* Mockup container ~140-160px tall */}
            <div className="h-[148px]">
              <MockupComponent />
            </div>
            {/* Label row */}
            <div className="flex items-center gap-1.5">
              <Icon size={12} strokeWidth={1.75} className="text-black/35" />
              <span className="text-[10px] font-mono uppercase tracking-[0.10em] text-black/40">
                {label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

type Selected = "alliance" | "solution" | null;

export function HowWePartner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Selected>(null);

  // Derived header copy
  const title =
    selected === "alliance"
      ? "Alliance Partner"
      : selected === "solution"
      ? "Solution Provider"
      : "Two Ways to Work with Source";

  const subtitle =
    selected === "alliance"
      ? "Here\u2019s exactly how the referral model works — and what you\u2019ll earn on every deal."
      : selected === "solution"
      ? "Here\u2019s how you deliver more with less, and the marketing tools to start selling now."
      : "Whether you refer or deliver \u2014 Source makes every deal more profitable.";

  // Button class shared by both cards
  const thatsMeBtnClass =
    "mt-6 w-full py-3.5 border border-black/15 text-[11px] font-mono uppercase tracking-[0.08em] text-black/40 hover:text-white hover:border-black hover:bg-black transition-all duration-200 cursor-pointer";

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col justify-center px-[120px]"
    >
      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          {/* Back button */}
          <AnimatePresence mode="wait">
            {selected !== null ? (
              <motion.button
                key="back-btn"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelected(null)}
                className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.08em] text-black/40 hover:text-black transition-colors duration-150 mb-4 cursor-pointer"
              >
                <ArrowLeft size={14} strokeWidth={1.75} />
                All Models
              </motion.button>
            ) : (
              <motion.div
                key="label-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-4"
              >
                <p className="text-[14px] font-mono uppercase tracking-[0.2em] text-black/30">
                  Partnership Models
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.h2
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-[52px] font-semibold tracking-[-0.03em] mb-3"
            >
              {title}
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[20px] text-black/45 max-w-[900px] leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-2 gap-8" style={{ minHeight: 520 }}>
          {/* ---- LEFT COLUMN ---- */}
          <div className="relative flex flex-col">
            <AnimatePresence mode="wait">
              {/* Alliance card — visible when null or alliance selected */}
              {selected !== "solution" && (
                <motion.div
                  key="alliance-card"
                  initial={
                    selected === null
                      ? { opacity: 0, x: -30 }
                      : { opacity: 1, x: 0 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: selected === null ? 0.5 : 0.25, delay: selected === null ? 0.3 : 0 }}
                  className={`bg-white flex flex-col flex-1 p-10 h-full ${
                    selected === "alliance"
                      ? "border-2 border-black"
                      : "border border-black/10"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <Handshake size={24} className="text-black/40" strokeWidth={1.75} />
                    <h3 className="text-[28px] font-semibold tracking-[-0.02em]">
                      Alliance Partners
                    </h3>
                  </div>
                  <p className="text-[14px] font-mono uppercase tracking-[0.12em] text-black/30 mb-8">
                    Refer &amp; Earn
                  </p>

                  {/* Steps */}
                  <div className="flex flex-col gap-4 mb-8 flex-1">
                    {allianceSteps.map((step, i) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        className="flex items-start gap-4"
                      >
                        <span className="shrink-0 w-7 h-7 flex items-center justify-center bg-black text-white text-[12px] font-semibold">
                          {i + 1}
                        </span>
                        <p className="text-[18px] text-black/65 leading-relaxed pt-[2px]">
                          {step}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Callout */}
                  <div className="border-t border-black/10 pt-6">
                    <p className="text-[28px] font-bold tracking-[-0.02em] text-black mb-1">
                      $2K&ndash;$5K
                    </p>
                    <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/30 mb-3">
                      Kickback per referral
                    </p>
                    <p className="text-[15px] text-black/50 leading-relaxed">
                      Keep the customer for all post-go-live work
                    </p>
                  </div>

                  {/* That's me button — only when nothing selected */}
                  <AnimatePresence>
                    {selected === null && (
                      <motion.button
                        key="alliance-cta"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 1, duration: 0.3 }}
                        onClick={() => setSelected("alliance")}
                        className={thatsMeBtnClass}
                      >
                        That&apos;s me &rarr;
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* GTM panel enters left col when solution is selected */}
              {selected === "solution" && (
                <GoToMarketPanel key="gtm-left" direction="left" />
              )}
            </AnimatePresence>
          </div>

          {/* ---- RIGHT COLUMN ---- */}
          <div className="relative flex flex-col">
            <AnimatePresence mode="wait">
              {/* Solution card — visible when null or solution selected */}
              {selected !== "alliance" && (
                <motion.div
                  key="solution-card"
                  initial={
                    selected === null
                      ? { opacity: 0, x: 30 }
                      : { opacity: 1, x: 0 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ duration: selected === null ? 0.5 : 0.25, delay: selected === null ? 0.5 : 0 }}
                  className={`bg-white flex flex-col flex-1 p-10 h-full ${
                    selected === "solution"
                      ? "border-2 border-black"
                      : "border border-black/10"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <Building2 size={24} className="text-black/40" strokeWidth={1.75} />
                    <h3 className="text-[28px] font-semibold tracking-[-0.02em]">
                      Solution Providers
                    </h3>
                  </div>
                  <p className="text-[14px] font-mono uppercase tracking-[0.12em] text-black/30 mb-8">
                    Sell &amp; Scale
                  </p>

                  {/* Steps */}
                  <div className="flex flex-col gap-4 mb-8 flex-1">
                    {solutionSteps.map((step, i) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.7 + i * 0.08 }}
                        className="flex items-start gap-4"
                      >
                        <span className="shrink-0 w-7 h-7 flex items-center justify-center bg-black text-white text-[12px] font-semibold">
                          {i + 1}
                        </span>
                        <p className="text-[18px] text-black/65 leading-relaxed pt-[2px]">
                          {step}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Callout */}
                  <div className="border-t border-black/10 pt-6">
                    <p className="text-[28px] font-bold tracking-[-0.02em] text-black mb-1">
                      50%+
                    </p>
                    <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/30 mb-3">
                      Project margins
                    </p>
                    <p className="text-[15px] text-black/50 leading-relaxed">
                      Scale your practice without offshore teams
                    </p>
                    <p className="text-[13px] text-black/35 mt-3">
                      Plus a % of the NetSuite license fee on every deal you close.
                    </p>
                  </div>

                  {/* That's me button — only when nothing selected */}
                  <AnimatePresence>
                    {selected === null && (
                      <motion.button
                        key="solution-cta"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 1, duration: 0.3 }}
                        onClick={() => setSelected("solution")}
                        className={thatsMeBtnClass}
                      >
                        That&apos;s me &rarr;
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* GTM panel enters right col when alliance is selected */}
              {selected === "alliance" && (
                <GoToMarketPanel key="gtm-right" direction="right" />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Slide>
  );
}
