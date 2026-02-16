"use client";

import { motion } from "framer-motion";

const stages = ["DISCOVERY", "SYSTEM SCAN", "STRATEGY", "BRD", "MIGRATION"];

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-8"
        >
          The Migration Engine for Consultants
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-7xl md:text-9xl font-semibold tracking-[-0.04em] leading-[0.9] text-white mb-10"
        >
          SOURCE AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-20"
        >
          From transcript to live system — Source AI handles discovery, scanning,
          strategy, BRD generation, and migration execution.{" "}
          <span className="text-white font-medium">
            The consultant stays on relationships and sign-off.
          </span>
        </motion.p>

        {/* Pipeline stages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-0 flex-wrap"
        >
          {stages.map((stage, i) => (
            <div key={stage} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className="px-5 py-3 border border-white/10 text-[10px] font-mono font-medium uppercase tracking-[0.1em] text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                {stage}
              </motion.div>
              {i < stages.length - 1 && (
                <div className="w-8 h-px bg-white/10" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
