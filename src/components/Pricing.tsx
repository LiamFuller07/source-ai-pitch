"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Fragment, useRef } from "react";
import { FileText, Scan, DollarSign, ArrowRight } from "lucide-react";
import { Slide } from "./Slide";

const steps = [
  {
    Icon: FileText,
    num: "01",
    title: "You send the SOW",
    body: "Drop in the client's scope, requirements, or existing SOW — however detailed or rough.",
  },
  {
    Icon: Scan,
    num: "02",
    title: "We scan & quote",
    body: "Source AI reads the scope, runs a system scan, and sends back a fixed price within 24 hours.",
  },
  {
    Icon: DollarSign,
    num: "03",
    title: "You charge the client",
    body: "You mark up, invoice your client directly, and keep the margin. Source is your back-office engine.",
  },
];

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col justify-center px-[120px]"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
            Pricing
          </p>
          <h2 className="text-[56px] font-semibold tracking-[-0.03em] text-black mb-3">
            Send SOW. Get Price. Charge Client.
          </h2>
          <p className="text-[20px] text-black/45 leading-relaxed max-w-[900px]">
            No quoting calls, no scoping workshops, no T&amp;M surprises. Three steps from SOW to invoice.
          </p>
        </motion.div>

        {/* Three step flow */}
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-0 mb-10">
          {steps.map((step, i) => (
            <Fragment key={step.num}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="bg-white border border-black/10 p-8 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-black flex items-center justify-center">
                    <step.Icon size={24} strokeWidth={1.75} className="text-white" />
                  </div>
                  <span className="text-[13px] font-mono tracking-[0.15em] text-black/25 font-medium">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-[26px] font-semibold tracking-[-0.02em] text-black leading-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-[16px] text-black/55 leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-center justify-center px-4"
                >
                  <ArrowRight size={32} strokeWidth={1.5} className="text-black/20" />
                </motion.div>
              )}
            </Fragment>
          ))}
        </div>

        {/* Free first migration block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75 }}
          className="bg-black text-white p-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-10">
            <div>
              <p className="text-[48px] font-bold tracking-[-0.04em] leading-none">
                FREE
              </p>
              <p className="text-[12px] font-mono uppercase tracking-[0.1em] text-white/30 mt-2">
                First migration
              </p>
            </div>
            <div className="w-[1px] h-16 bg-white/10" />
            <div>
              <p className="text-[24px] font-semibold tracking-[-0.02em] mb-2">
                Your first migration is free.
              </p>
              <p className="text-[16px] text-white/45 leading-relaxed max-w-[520px]">
                Send us your first SOW — we&apos;ll scope, price, and deliver it on us. No cost, no commitment.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.85 }}
          className="mt-4 text-[12px] text-black/25 leading-relaxed"
        >
          Fixed price, locked quote upfront — returned within 24 hours of SOW submission.
        </motion.p>
      </div>
    </Slide>
  );
}
