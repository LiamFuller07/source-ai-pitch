"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const reasons = [
  { icon: "$", title: "Make More Money", description: "Deliver more projects with the same team. Revenue per consultant increases significantly." },
  { icon: "\u2605", title: "Happier Customers", description: "Faster delivery, fewer surprises. Clients get validated artifacts instead of promises." },
  { icon: "\u2191", title: "Improve Margins", description: "Replace expensive offshore hours with AI execution. Keep consultants on high-value work." },
  { icon: "\u00d73", title: "More Migrations", description: "Remove the architect bottleneck. Take on engagements you'd normally turn away." },
  { icon: "\u25B6", title: "Win More Deals", description: "Cut costs drastically and undercut competitors on price while protecting your margins." },
  { icon: "0", title: "First Migration Free", description: "We'll run your first migration at no cost. See the full output before you commit." },
];

export function WhyPartner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="h-screen flex flex-col justify-center px-6 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/40 mb-3">
            The Partnership
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] mb-3">
            Why Partner with Source AI
          </h2>
          <p className="text-black/50 text-sm max-w-xl mx-auto">
            Source AI doesn&apos;t replace your consultancy — it makes every
            engagement more profitable, faster, and more scalable.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-px bg-black/5">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              className="bg-white p-7 group hover:bg-black/[0.01] transition-colors"
            >
              <div className="w-9 h-9 border border-black/10 flex items-center justify-center mb-4 group-hover:border-black/30 transition-colors">
                <span className="text-sm font-light text-black/60">{reason.icon}</span>
              </div>
              <p className="text-[11px] font-mono font-medium uppercase tracking-[0.05em] mb-2">
                {reason.title}
              </p>
              <p className="text-[12px] text-black/50 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
