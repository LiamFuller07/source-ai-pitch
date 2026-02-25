"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Slide } from "./Slide";

export function Frustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide ref={ref} bg="bg-black" className="flex items-center justify-center">
      <div className="max-w-[1400px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-[100px] font-semibold font-[family-name:var(--font-display)] tracking-[-0.03em] leading-tight text-white mb-10"
        >
          Customers are frustrated.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[36px] text-white/50 leading-relaxed"
        >
          Migrations take too long.
          <br />
          Revisions upon revisions.
        </motion.p>
      </div>
    </Slide>
  );
}
