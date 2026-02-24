"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Slide } from "./Slide";

export function Demo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide ref={ref} bg="bg-black" className="flex items-center justify-center">
      <div className="text-center flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-[72px] font-semibold tracking-[-0.03em] text-white mb-10"
        >
          See Source in action.
        </motion.h2>

        <motion.a
          href="http://35.233.101.128:3002/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-[13px] font-mono uppercase tracking-[0.1em] font-medium hover:bg-white/90 transition-colors"
        >
          <ExternalLink size={16} />
          Launch Live Demo
        </motion.a>
      </div>
    </Slide>
  );
}
