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
  {
    id: 3,
    area: "Historical Transactions",
    question:
      "Source system contains 5 years of transactional history (142,000 records). What is the cutover window for historical data?",
    options: [
      "Full 5-year migration \u2014 all open and closed",
      "Rolling 2-year window \u2014 summary JEs for prior years",
      "Current fiscal year only \u2014 archive prior as PDF",
      "Open transactions only \u2014 closed stays in QuickBooks",
    ],
    selected: null,
    aiRec: 1,
    confidence: 81,
  },
];

const brandFeatures = [
  "Your logo on every document",
  "Your email domain on communications",
  "Your colour scheme on reports",
  "Your consultants named as authors",
  "No Source AI branding visible",
];

export function WhiteLabel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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

        <div className="grid grid-cols-[280px_1fr] gap-8 items-start">
          {/* Left: Brand features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="border border-black/10 p-5 mb-6 text-center">
              <p className="text-[8px] font-mono uppercase tracking-[0.15em] text-black/25 mb-1">
                Your Brand
              </p>
              <p className="text-base font-light tracking-wide text-black/80">
                [ Your Firm Name ]
              </p>
            </div>

            <div className="space-y-3">
              {brandFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-3.5 h-3.5 border border-black/10 flex items-center justify-center shrink-0">
                    <span className="text-[7px] text-black/50">&#10003;</span>
                  </div>
                  <span className="text-[11px] text-black/50">{feature}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-[10px] text-black/30 mt-6 leading-relaxed">
              Source AI runs behind your brand. Every document,
              questionnaire, and report carries your firm&apos;s identity.
            </p>
          </motion.div>

          {/* Right: Google Forms-style questionnaire mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-lg overflow-hidden"
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 30px rgba(0,0,0,0.06)",
            }}
          >
            {/* Form header - colored bar */}
            <div className="bg-[#1a1a1a] px-6 pt-5 pb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
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
              <div className="h-full bg-[#1a1a1a] w-[17%] rounded-r-full" />
            </div>

            {/* Form body */}
            <div className="bg-[#f8f8f8] px-6 py-4 space-y-4 max-h-[380px] overflow-hidden">
              {formQuestions.map((q, qi) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + qi * 0.1 }}
                  className={`bg-white rounded-lg border ${
                    qi === 0 ? "border-l-[3px] border-l-[#1a1a1a] border-t border-r border-b border-t-black/[0.06] border-r-black/[0.06] border-b-black/[0.06]" : "border-black/[0.06]"
                  } p-5`}
                >
                  {/* Question header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-[13px] text-black/80 leading-snug">
                        {q.question}
                        <span className="text-red-400 ml-0.5">*</span>
                      </p>
                    </div>
                  </div>

                  {/* Area tag + confidence */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[8px] font-mono uppercase tracking-[0.1em] text-black/30 border border-black/8 px-1.5 py-0.5 rounded-sm">
                      {q.area}
                    </span>
                    <span className="text-[8px] font-mono text-black/15">
                      {q.confidence}% confidence
                    </span>
                  </div>

                  {/* Radio options */}
                  <div className="space-y-0">
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className={`flex items-start gap-3 py-2 px-2 rounded ${
                          q.selected === oi ? "bg-black/[0.02]" : ""
                        }`}
                      >
                        {/* Radio circle */}
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
                          <p className={`text-[12px] leading-snug ${
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

              {/* Fade-out gradient to suggest more questions */}
              <div className="h-8 bg-gradient-to-t from-[#f8f8f8] to-transparent -mt-8 relative z-10 pointer-events-none" />
            </div>

            {/* Form footer */}
            <div className="bg-[#f8f8f8] border-t border-black/5 px-6 py-3 flex items-center justify-between">
              <span className="text-[9px] font-mono text-black/20">
                1 of 6 answered &middot; Generated by Source AI
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono uppercase tracking-[0.08em] text-black/20 px-3 py-1.5 border border-black/8 rounded">
                  Back
                </span>
                <span className="text-[9px] font-mono uppercase tracking-[0.08em] text-white bg-[#1a1a1a] px-3 py-1.5 rounded">
                  Next
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
