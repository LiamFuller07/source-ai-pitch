"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { usePresentationStep } from "./PresentationController";
import { Slide } from "./Slide";

const reasons = [
  {
    title: "Make More Money",
    stat: "3-5x",
    statLabel: "revenue per consultant",
    description:
      "Each consultant handles 3-5x more migrations with AI execution",
  },
  {
    title: "Happier Customers",
    stat: "14 days",
    statLabel: "not months",
    description:
      "Faster delivery with validated artifacts instead of promises",
  },
  {
    title: "Improve Margins",
    stat: "80%",
    statLabel: "cost reduction",
    description: "Replace expensive offshore hours with AI execution",
  },
  {
    title: "Fixed-Price Projects",
    stat: "Fixed",
    statLabel: "price delivery",
    description: "Predictable AI costs enable fixed-price engagements",
  },
  {
    title: "Win More Deals",
    stat: "50%",
    statLabel: "lower client price",
    description: "Undercut competitors while protecting your margins",
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
          className="mb-10"
        >
          <p className="text-[18px] font-mono uppercase tracking-[0.2em] text-black/40 mb-4">
            The Partnership
          </p>
          <h2 className="text-[72px] font-semibold tracking-[-0.03em] mb-4">
            Why Partner with Source AI
          </h2>
          <p className="text-[24px] text-black/45 max-w-[900px] leading-relaxed">
            Source AI doesn&apos;t replace your consultancy — it makes every
            engagement more profitable, faster, and more scalable.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-8">
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
              className="border-2 border-black/10 p-10 hover:border-black/25 transition-colors flex flex-col justify-center min-h-[240px]"
            >
              <p className="text-[64px] font-bold tracking-[-0.03em] text-black leading-none mb-2">
                {reason.stat}
              </p>
              <p className="text-[16px] font-mono uppercase tracking-[0.15em] text-black/30 mb-6">
                {reason.statLabel}
              </p>
              <p className="text-[24px] font-semibold text-black mb-3">
                {reason.title}
              </p>
              <p className="text-[18px] text-black/50 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
