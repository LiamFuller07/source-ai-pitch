"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const sourceAiCapabilities = [
  "System scanning",
  "Business logic inference",
  "Strategy generation",
  "Questionnaire engine",
  "BRD (AS-IS → TO-BE)",
  "Migration plan",
  "Implementation & config",
  "Testing & QA",
  "Validation & proof artifacts",
  "Go-live execution",
];

export function AiReplacesChain() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="h-screen flex flex-col justify-center px-6 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/40 mb-3">
            The Solution
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em]">
            AI Replaces the Delivery Chain
          </h2>
        </motion.div>

        {/* Flow diagram */}
        <div className="grid grid-cols-[1fr_auto_2.5fr_auto_1fr] gap-4 items-stretch">
          {/* End Client */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-black/10 p-5 flex flex-col justify-center"
          >
            <p className="text-[9px] font-mono uppercase tracking-[0.1em] text-black/40 mb-2">
              End Client
            </p>
            <p className="text-[12px] text-black/50 leading-relaxed">
              Has legacy system
              <br />
              Needs to migrate
            </p>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex items-center text-black/20 text-lg"
          >
            →
          </motion.div>

          {/* Source AI Engine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border-2 border-black p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] font-mono font-medium uppercase tracking-[0.1em]">
                Source AI Engine
              </p>
              <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-black/40 border border-black/10 px-3 py-1">
                &lt; 14 Days
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {sourceAiCapabilities.map((cap, i) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.04 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-1 h-1 bg-black shrink-0" />
                  <span className="text-[12px] text-black/60">{cap}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex items-center text-black/20 text-lg"
          >
            →
          </motion.div>

          {/* Live System */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="border border-black/10 p-5 flex flex-col justify-center"
          >
            <p className="text-[9px] font-mono uppercase tracking-[0.1em] text-black/40 mb-2">
              Live System
            </p>
            <p className="text-[16px] font-light text-black leading-relaxed">
              Dynamics 365
              <br />
              NetSuite
            </p>
          </motion.div>
        </div>

        {/* Consultant strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-6 border border-black/5 bg-black/[0.02] p-4 flex flex-wrap gap-6 items-center"
        >
          <p className="text-[9px] font-mono uppercase tracking-[0.1em] text-black/40">
            Consultant:
          </p>
          {[
            "Client relationship",
            "Provides context",
            "Delivers questions",
            "Reviews outputs",
            "Confirms plan",
          ].map((role) => (
            <p key={role} className="text-[11px] text-black/50">
              {role}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
