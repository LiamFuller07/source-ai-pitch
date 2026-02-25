"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Slide } from "./Slide";

export function Solution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide ref={ref} bg="bg-white" className="flex items-center justify-center">
      <div className="max-w-[1600px] mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[22px] font-mono uppercase tracking-[0.25em] text-black/30 mb-8"
        >
          Introducing
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-[120px] font-semibold font-[family-name:var(--font-display)] tracking-[-0.04em] leading-[0.9] text-black mb-10"
        >
          Source
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-[120px] h-[2px] bg-black/10 mx-auto mb-12"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[40px] text-black/50 leading-relaxed max-w-[1100px] mx-auto"
        >
          An AI engine that automates 80% of ERP migrations —
          <br />
          so your consultancy wins more deals, moves faster,
          <br />
          and makes more money.
        </motion.p>
      </div>
    </Slide>
  );
}
