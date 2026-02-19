"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";
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

        {/* Video placeholder / embed area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[1200px] aspect-video bg-white/[0.03] border border-white/10 flex items-center justify-center cursor-pointer group relative overflow-hidden"
        >
          {/* Play button */}
          <div className="flex flex-col items-center gap-6 z-10">
            <div className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/5 transition-all duration-300">
              <Play
                size={40}
                className="text-white/40 group-hover:text-white/80 transition-colors ml-1"
                fill="currentColor"
              />
            </div>
            <p className="text-[14px] font-mono uppercase tracking-[0.15em] text-white/25 group-hover:text-white/50 transition-colors">
              Play Demo
            </p>
          </div>

          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>
      </div>
    </Slide>
  );
}
