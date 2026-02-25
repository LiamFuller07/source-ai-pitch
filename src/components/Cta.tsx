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
      <div className="max-w-[1400px] mx-auto text-center flex flex-col items-center">
        {/* Source logo — white */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/source-logo.svg"
            alt="Source AI"
            className="w-[80px] h-[80px] invert opacity-100"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-[68px] font-semibold tracking-[-0.03em] leading-snug text-white"
        >
          Source is <span className="italic">NOT</span> a tool.
          <br />
          It fundamentally changes consulting in the age of AI.
        </motion.h2>
      </div>
    </Slide>
  );
}
