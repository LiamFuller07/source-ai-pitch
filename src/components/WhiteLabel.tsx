"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const formQuestions = [
  {
    id: 1,
    area: "Chart of Accounts",
    question:
      "The legacy QuickBooks instance contains 847 accounts across 12 sub-levels. How should nested account hierarchies be mapped to NetSuite\u2019s 6-level structure?",
    options: [
      "Flatten to 6 levels using concatenated naming (e.g., 1000-100-10)",
      "Preserve top 6 levels, merge lower levels into leaf accounts",
      "Create custom segments in NetSuite to retain full depth",
      "Rebuild hierarchy from scratch using NetSuite best practices",
    ],
    selected: 1,
    aiRec: 1,
    confidence: 87,
  },
  {
    id: 2,
    area: "Customer Records",
    question:
      "Detected 3,214 customer records with 412 duplicates (12.8% overlap). Multiple records share Tax IDs but differ in billing addresses. What deduplication strategy?",
    options: [
      "Merge by Tax ID, retain most recent billing address",
      "Merge by Tax ID, create multiple address books per customer",
      "Flag duplicates for manual review before migration",
      "Migrate all as-is, deduplicate post-migration in NetSuite",
    ],
    selected: null,
    aiRec: 1,
    confidence: 72,
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Source AI generates questions",
    detail: "Based on system scan findings, AI creates targeted multi-choice questions specific to the migration.",
  },
  {
    step: "2",
    title: "Consultant sends a link",
    detail: "A branded URL is shared with the end client. No software to install — just a browser link.",
  },
  {
    step: "3",
    title: "Client answers in browser",
    detail: "The questionnaire appears under your brand. Client selects options and AI pre-fills recommendations.",
  },
  {
    step: "4",
    title: "Answers feed back to Source AI",
    detail: "Responses automatically update the BRD, migration plan, and implementation config.",
  },
];

const brandFeatures = [
  "Your logo on every page",
  "Your domain in the URL",
  "Your colour scheme applied",
  "Your consultants as authors",
  "No Source AI branding visible",
];

export function WhiteLabel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // The URL that gets "typed" into the address bar
  const url = "review.acme-consulting.com/migration/quickbooks-netsuite";

  return (
    <section ref={ref} className="h-screen flex flex-col justify-center px-6 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/40 mb-3">
            Your Brand
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em]">
            White Label Delivery
          </h2>
        </motion.div>

        <div className="grid grid-cols-[300px_1fr] gap-8 items-start">
          {/* Left: How it works + brand features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* How it works steps */}
            <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-black/30 mb-4">
              How the questionnaire works
            </p>
            <div className="space-y-4 mb-8">
              {howItWorks.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex gap-3"
                >
                  <div className="w-5 h-5 border border-black/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[9px] font-mono font-bold text-black/40">{item.step}</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-black/75 leading-snug">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-black/35 leading-relaxed mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Brand features checklist */}
            <div className="border-t border-black/8 pt-5">
              <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-black/30 mb-3">
                White label includes
              </p>
              <div className="space-y-2">
                {brandFeatures.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.04 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-3.5 h-3.5 bg-black flex items-center justify-center shrink-0">
                      <span className="text-[7px] text-white font-bold">&#10003;</span>
                    </div>
                    <span className="text-[11px] text-black/50">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Browser with questionnaire */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="overflow-hidden border border-black/15"
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.08)",
            }}
          >
            {/* Browser chrome */}
            <div className="bg-[#e8e8e8] border-b border-black/10">
              {/* Title bar with traffic lights */}
              <div className="flex items-center gap-2 px-4 pt-3 pb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="text-[9px] font-mono text-black/30 truncate">
                    Acme Consulting — Migration Review
                  </div>
                </div>
              </div>
              {/* Address bar with typing animation */}
              <div className="mx-3 mb-2.5 bg-white border border-black/10 px-3 py-1.5 flex items-center gap-2">
                <svg className="w-3 h-3 text-green-600/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div className="flex-1 overflow-hidden">
                  <motion.span
                    className="text-[10px] font-mono text-black/50 inline-block whitespace-nowrap"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "auto" } : {}}
                    transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                    style={{ overflow: "hidden", display: "inline-block" }}
                  >
                    {url}
                  </motion.span>
                  <motion.span
                    className="inline-block w-[1px] h-3 bg-black/40 ml-0.5 align-middle"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: 3, delay: 0.8 }}
                  />
                </div>
              </div>
            </div>

            {/* Page content fades in after URL is typed */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 2.3, duration: 0.5 }}
            >
              {/* Form header */}
              <div className="bg-[#1a1a1a] px-6 pt-5 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 bg-white/20 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white/70">AC</span>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-white/40">
                      Acme Consulting
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-white/20">
                    Phase 1 of 3
                  </span>
                </div>
                <h3 className="text-[17px] font-light text-white tracking-[-0.01em]">
                  QuickBooks &rarr; NetSuite Migration Review
                </h3>
                <p className="text-[10px] text-white/30 mt-1">
                  Data Migration &middot; 6 questions &middot; Generated from system scan
                </p>
              </div>

              {/* Progress bar */}
              <div className="h-[3px] bg-black/5">
                <div className="h-full bg-[#1a1a1a] w-[17%]" />
              </div>

              {/* Form body */}
              <div className="bg-[#f8f8f8] px-6 py-4 space-y-4 max-h-[340px] overflow-hidden">
                {formQuestions.map((q, qi) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 2.5 + qi * 0.15 }}
                    className={`bg-white border ${
                      qi === 0 ? "border-l-[3px] border-l-[#1a1a1a] border-t border-r border-b border-t-black/[0.06] border-r-black/[0.06] border-b-black/[0.06]" : "border-black/[0.06]"
                    } p-5`}
                  >
                    <p className="text-[12px] text-black/80 leading-snug mb-3">
                      {q.question}
                      <span className="text-red-400 ml-0.5">*</span>
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[8px] font-mono uppercase tracking-[0.1em] text-black/30 border border-black/8 px-1.5 py-0.5">
                        {q.area}
                      </span>
                      <span className="text-[8px] font-mono text-black/15">
                        {q.confidence}% confidence
                      </span>
                    </div>

                    <div className="space-y-0">
                      {q.options.map((opt, oi) => (
                        <div
                          key={oi}
                          className={`flex items-start gap-3 py-2 px-2 ${
                            q.selected === oi ? "bg-black/[0.02]" : ""
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            <div
                              className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center ${
                                q.selected === oi
                                  ? "border-[#1a1a1a]"
                                  : "border-black/15"
                              }`}
                            >
                              {q.selected === oi && (
                                <div className="w-[8px] h-[8px] rounded-full bg-[#1a1a1a]" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-[11px] leading-snug ${
                              q.selected === oi ? "text-black/80" : "text-black/55"
                            }`}>
                              {opt}
                            </p>
                            {oi === q.aiRec && (
                              <span className="text-[7px] font-mono uppercase tracking-[0.1em] text-black/15 mt-0.5 inline-block">
                                &larr; AI Recommendation
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                <div className="h-8 bg-gradient-to-t from-[#f8f8f8] to-transparent -mt-8 relative z-10 pointer-events-none" />
              </div>

              {/* Form footer */}
              <div className="bg-[#f8f8f8] border-t border-black/5 px-6 py-3 flex items-center justify-between">
                <span className="text-[9px] font-mono text-black/20">
                  1 of 6 answered &middot; Generated by Source AI
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono uppercase tracking-[0.08em] text-black/20 px-3 py-1.5 border border-black/8">
                    Back
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.08em] text-white bg-[#1a1a1a] px-3 py-1.5">
                    Next
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
