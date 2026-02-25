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
    <Slide ref={ref} bg="bg-white" className="flex items-center justify-center">
      <div className="text-center flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-[72px] font-normal font-[family-name:var(--font-display)] tracking-[0.01em] text-black mb-10"
        >
          See Source in action
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/source-logo.svg"
            alt=""
            className="inline-block w-[18px] h-[18px] ml-2 mb-2 align-baseline"
          />
        </motion.h2>

        <motion.a
          href="http://35.233.101.128:3002/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-[13px] font-mono uppercase tracking-[0.1em] font-medium hover:bg-black/90 transition-colors"
        >
          <ExternalLink size={16} />
          Launch Live Demo
        </motion.a>
      </div>
    </Slide>
  );
}
