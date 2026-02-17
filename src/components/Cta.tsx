"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Slide } from "./Slide";

export function Cta() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide ref={ref} id="contact" bg="bg-black" className="flex items-center justify-center">
      <div className="max-w-[1500px] mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[20px] font-mono uppercase tracking-[0.2em] text-white/40 mb-12"
        >
          Source AI
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[72px] font-semibold tracking-[-0.03em] leading-snug text-white"
        >
          Source is <span className="italic">NOT</span> a tool.
          <br />
          It fundamentally changes consulting in the age of AI.
        </motion.h2>
      </div>
    </Slide>
  );
}
