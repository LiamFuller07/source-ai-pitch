"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Frustration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="h-screen flex items-center justify-center bg-black"
    >
      <div className="max-w-3xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-tight text-white mb-6"
        >
          Customers are frustrated.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl text-white/50 leading-relaxed"
        >
          Migrations take too long.
          <br />
          Revisions upon revisions.
        </motion.p>
      </div>
    </section>
  );
}
