"use client";

import { motion } from "framer-motion";
import { Slide } from "./Slide";

const stages = ["DISCOVERY", "SYSTEM SCAN", "STRATEGY", "BRD", "MIGRATION"];

export function Hero() {
  return (
    <Slide bg="bg-black" className="flex items-center justify-center">
      <div className="text-center max-w-[1500px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[20px] font-mono uppercase tracking-[0.2em] text-white/40 mb-12"
        >
          The Migration Engine for Consultants
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[180px] font-normal font-[family-name:var(--font-display)] tracking-[-0.04em] leading-[0.9] text-white mb-14"
        >
          SOURCE AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[28px] text-white/50 max-w-[900px] mx-auto leading-relaxed mb-20"
        >
          From transcript to live system — Source AI handles discovery, scanning,
          strategy, BRD generation, and migration execution.{" "}
          <span className="text-white font-medium">
            The consultant stays on relationships and sign-off.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-0"
        >
          {stages.map((stage, i) => (
            <div key={stage} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className="px-8 py-4 border border-white/10 text-[16px] font-mono font-medium uppercase tracking-[0.1em] text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                {stage}
              </motion.div>
              {i < stages.length - 1 && (
                <div className="w-10 h-px bg-white/10" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </Slide>
  );
}
