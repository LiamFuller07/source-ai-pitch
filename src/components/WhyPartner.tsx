"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { usePresentationStep } from "./PresentationController";
import { Slide } from "./Slide";

const reasons = [
  {
    title: "Make More Money",
    stat: "50%+",
    statLabel: "project margins",
    description:
      "AI execution eliminates offshore teams and reduces delivery cost dramatically",
  },
  {
    title: "Happier Customers",
    stat: "Sub 21",
    statLabel: "day migrations",
    description:
      "Days not months for migrations — faster delivery with validated artifacts",
  },
  {
    title: "Fixed-Price Deals",
    stat: "Fixed",
    statLabel: "price delivery",
    description: "Source enables you to win fixed-price deals with predictable AI execution costs",
  },
  {
    title: "Scale Without Hiring",
    stat: "0",
    statLabel: "new hires needed",
    description: "Grow your migration practice without recruiting offshore teams",
  },
  {
    title: "Win More Deals",
    stat: "WIN",
    statLabel: "on price every time",
    description: "Quote $8K–$15K while competitors quote $30K–$40K — and still keep 50%+ margins",
  },
  {
    title: "White Label Delivery",
    stat: "Your",
    statLabel: "brand, not ours",
    description:
      "Client-facing questionnaires and reports ship under your logo, domain, and colours",
  },
];

export function WhyPartner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { setMaxSteps, resetSteps, isStepVisible } = usePresentationStep();

  useEffect(() => {
    if (inView) {
      setMaxSteps(reasons.length);
      resetSteps();
    }
  }, [inView, setMaxSteps, resetSteps]);

  return (
    <Slide
      ref={ref}
      bg="bg-white"
      className="flex flex-col justify-center px-[120px]"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-[14px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
            The Partnership
          </p>
          <h2 className="text-[52px] font-semibold tracking-[-0.03em] mb-3">
            Why Partner with Source AI
          </h2>
          <p className="text-[20px] text-black/45 max-w-[900px] leading-relaxed">
            Source AI doesn&apos;t replace your consultancy — it makes every
            engagement more profitable, faster, and more scalable.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={
                isStepVisible(i + 1)
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.8, y: 20 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="border border-black/10 p-8 hover:border-black/25 transition-colors flex flex-col justify-center min-h-[200px]"
            >
              <p className="text-[48px] font-bold tracking-[-0.03em] text-black leading-none mb-1">
                {reason.stat}
              </p>
              <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/30 mb-4">
                {reason.statLabel}
              </p>
              <p className="text-[20px] font-semibold text-black mb-2">
                {reason.title}
              </p>
              <p className="text-[15px] text-black/50 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
