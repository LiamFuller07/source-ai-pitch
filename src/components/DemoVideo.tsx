"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar } from "lucide-react";
import { Slide } from "./Slide";

export function DemoVideo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-black"
      className="flex flex-col items-center justify-center px-[120px]"
    >
      <div className="w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-white/30 mb-4">
            Live Demo
          </p>
          <h2 className="text-[64px] font-semibold tracking-[-0.03em] text-white mb-4">
            See Source AI in Action
          </h2>
          <p className="text-[22px] text-white/40 max-w-[700px] mx-auto leading-relaxed">
            From QuickBooks scan to NetSuite migration — in under 14 days.
          </p>
        </motion.div>

        {/* Book a call CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-8 z-10"
        >
          <div className="w-28 h-28 rounded-full border-2 border-white/15 flex items-center justify-center">
            <Calendar
              size={48}
              className="text-white/30"
            />
          </div>
          <p className="text-[32px] font-semibold text-white/70 tracking-[-0.02em]">
            Book a call with us to see a live demo.
          </p>
          <p className="text-[16px] font-mono uppercase tracking-[0.12em] text-white/25">
            We&apos;ll walk you through a real migration end-to-end
          </p>
        </motion.div>
      </div>
    </Slide>
  );
}
