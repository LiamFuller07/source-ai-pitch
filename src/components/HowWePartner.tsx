"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Handshake,
  Building2,
  ArrowLeft,
  Globe,
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
// Website preview — polished landing page mockup
// ---------------------------------------------------------------------------

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-black/8 bg-[#f5f5f5]">
      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      <div className="ml-4 flex-1 bg-white border border-black/10 px-3 py-1 flex items-center gap-2">
        <svg className="w-3 h-3 text-black/20 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span className="text-[10px] font-mono text-black/35">{url}</span>
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-black/6">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-black/10 flex items-center justify-center">
          <span className="text-[7px] font-bold text-black/40">YF</span>
        </div>
        <span className="text-[11px] font-semibold text-black/70">Your Firm</span>
      </div>
      <div className="flex items-center gap-5">
        <span className="text-[9px] text-black/30 font-mono uppercase tracking-[0.06em]">Services</span>
        <span className="text-[9px] text-black/30 font-mono uppercase tracking-[0.06em]">About</span>
        <span className="text-[9px] text-black/30 font-mono uppercase tracking-[0.06em]">Contact</span>
      </div>
    </div>
  );
}

{/* Alliance: QB → NS specific landing page */}
function AllianceWebsite() {
  return (
    <div className="flex flex-col h-full border border-black/10 overflow-hidden bg-white">
      <BrowserChrome url="yourfirm.com/netsuite-migration" />
      <NavBar />
      {/* Hero — deep navy gradient with geometric pattern overlay */}
      <div
        className="flex-1 relative overflow-hidden flex flex-col justify-center px-8 py-8"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0c4a6e 100%)" }}
      >
        {/* Geometric grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Accent glow */}
        <div className="absolute top-[-30%] right-[-10%] w-[200px] h-[200px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(56,189,248,0.4) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-20%] left-[10%] w-[150px] h-[150px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)" }} />

        {/* Content */}
        <div className="relative z-10">
          <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-sky-300/50 mb-3">
            QuickBooks &rarr; NetSuite
          </p>
          <p className="text-[22px] font-semibold tracking-[-0.03em] text-white leading-tight mb-1">
            $10K. 10 Days.
          </p>
          <p className="text-[22px] font-semibold tracking-[-0.03em] text-white leading-tight mb-3">
            Done.
          </p>
          <p className="text-[11px] text-white/45 leading-relaxed max-w-[320px] mb-5">
            Migrate from QuickBooks to NetSuite for a fixed $10K. AI handles migration, config, and testing. Live in 10 days.
          </p>
          <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2">
              <span className="text-[9px] font-semibold text-[#0f172a] uppercase tracking-[0.06em]">Get Started</span>
            </div>
            <span className="text-[9px] text-white/35 font-mono uppercase tracking-[0.06em]">Learn More &rarr;</span>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-black/8 border-t border-black/8">
        {[
          { val: "$10K", label: "Fixed price" },
          { val: "10 Days", label: "Go-live" },
          { val: "80%", label: "AI-automated" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center py-3">
            <span className="text-[13px] font-bold tracking-[-0.01em] text-black">{s.val}</span>
            <span className="text-[8px] font-mono uppercase tracking-[0.08em] text-black/30 mt-0.5">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-6 py-2.5 border-t border-black/6 bg-black/[0.02]">
        <span className="text-[8px] text-black/25 font-mono uppercase tracking-[0.08em]">AI-validated</span>
        <span className="text-[8px] text-black/15">&middot;</span>
        <span className="text-[8px] text-black/25 font-mono uppercase tracking-[0.08em]">Fixed price guarantee</span>
        <span className="text-[8px] text-black/15">&middot;</span>
        <span className="text-[8px] text-black/25 font-mono uppercase tracking-[0.08em]">No scope creep</span>
      </div>
    </div>
  );
}

{/* Solution Provider: Consultancy website — broader ERP services */}
function SolutionWebsite() {
  return (
    <div className="flex flex-col h-full border border-black/10 overflow-hidden bg-white">
      <BrowserChrome url="yourfirm.com" />
      <NavBar />
      {/* Consultancy hero — white bg, professional feel */}
      <div className="flex-1 flex flex-col justify-center px-8 py-8 border-b border-black/6">
        <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-black/25 mb-3">
          AI-Native ERP Consulting
        </p>
        <p className="text-[22px] font-semibold tracking-[-0.03em] text-black leading-tight mb-1">
          Fixed-Price ERP
        </p>
        <p className="text-[22px] font-semibold tracking-[-0.03em] text-black leading-tight mb-3">
          Migrations.
        </p>
        <p className="text-[11px] text-black/40 leading-relaxed max-w-[340px] mb-5">
          We deliver NetSuite implementations at fixed cost. 80% of the work is AI-automated &mdash; your project ships in weeks, not months.
        </p>
        <div className="flex items-center gap-3">
          <div className="bg-black px-4 py-2">
            <span className="text-[9px] font-semibold text-white uppercase tracking-[0.06em]">Talk to Us</span>
          </div>
          <span className="text-[9px] text-black/30 font-mono uppercase tracking-[0.06em]">Our Services &rarr;</span>
        </div>
      </div>
      {/* Service cards row */}
      <div className="grid grid-cols-3 divide-x divide-black/6">
        {[
          { title: "Implementation", desc: "Full NetSuite setup" },
          { title: "Data Migration", desc: "Any source system" },
          { title: "Go-Live Support", desc: "Hands-on launch" },
        ].map((s) => (
          <div key={s.title} className="px-4 py-3">
            <p className="text-[10px] font-semibold text-black mb-0.5">{s.title}</p>
            <p className="text-[8px] text-black/30">{s.desc}</p>
          </div>
        ))}
      </div>
      {/* Trust row */}
      <div className="flex items-center justify-center gap-6 py-2.5 border-t border-black/6 bg-black/[0.02]">
        <span className="text-[8px] text-black/25 font-mono uppercase tracking-[0.08em]">80% AI-automated</span>
        <span className="text-[8px] text-black/15">&middot;</span>
        <span className="text-[8px] text-black/25 font-mono uppercase tracking-[0.08em]">Fixed price</span>
        <span className="text-[8px] text-black/15">&middot;</span>
        <span className="text-[8px] text-black/25 font-mono uppercase tracking-[0.08em]">Weeks, not months</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Go-to-Market Panel
// ---------------------------------------------------------------------------

interface GoToMarketPanelProps {
  direction: "left" | "right";
  model: "alliance" | "solution";
}

function GoToMarketPanel({ direction, model }: GoToMarketPanelProps) {
  const xEntry = direction === "left" ? -60 : 60;
  const isAlliance = model === "alliance";

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
      <div className="mb-5">
        <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/30 mb-2">
          Go to Market
        </p>
        <h3 className="text-[22px] font-semibold tracking-[-0.02em] mb-1.5">
          {isAlliance ? "Sell the $10K migration." : "Your website. Your brand."}
        </h3>
        <p className="text-[14px] text-black/40 leading-relaxed">
          {isAlliance
            ? "Launch a landing page for QuickBooks to NetSuite migrations under your domain."
            : "Position your firm as an AI-native consultancy. Fixed-price implementations, powered by Source."}
        </p>
      </div>

      {/* Website preview — fills remaining space */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
        className="flex-1"
        style={{ boxShadow: "0 4px 20px -4px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.04)" }}
      >
        {isAlliance ? <AllianceWebsite /> : <SolutionWebsite />}
      </motion.div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 mt-4"
      >
        <Globe size={13} strokeWidth={1.75} className="text-black/25 shrink-0" />
        <p className="text-[11px] text-black/30">
          Ships under your domain. Source never appears in client-facing content.
        </p>
      </motion.div>
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
                      $4K+
                    </p>
                    <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/30 mb-3">
                      Referral kickback
                    </p>
                    <p className="text-[15px] text-black/50 leading-relaxed">
                      Plus a negotiated % of the NetSuite license fee
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
                <GoToMarketPanel key="gtm-left" direction="left" model="solution" />
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
                <GoToMarketPanel key="gtm-right" direction="right" model="alliance" />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Slide>
  );
}
