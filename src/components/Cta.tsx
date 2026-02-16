"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Cta() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="contact"
      className="h-screen flex items-center justify-center bg-black"
    >
      <div className="max-w-3xl mx-auto text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-8"
        >
          Source AI
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-tight text-white mb-14"
        >
          The migration engine your consultants have been waiting for.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:hello@source-ai.com"
            className="text-[11px] font-mono font-medium uppercase tracking-[0.05em] bg-white text-black px-10 py-4 hover:bg-white/90 transition-colors"
          >
            Book a Demo
          </a>
          <a
            href="https://source-ai.com"
            className="text-[11px] font-mono font-medium uppercase tracking-[0.05em] border border-white/30 text-white px-10 py-4 hover:border-white transition-colors"
          >
            source-ai.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
