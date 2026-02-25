"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Slide } from "./Slide";

const migrationPaths = [
  {
    from: { name: "QuickBooks", logo: "/quickbooks-logo.svg", height: "h-[40px]" },
    to: { name: "NetSuite", logo: "/netsuite-logo.svg", height: "h-[60px]" },
  },
  {
    from: { name: "NetSuite", logo: "/netsuite-logo.svg", height: "h-[60px]" },
    to: { name: "QuickBooks", logo: "/quickbooks-logo.svg", height: "h-[40px]" },
  },
  {
    from: { name: "Xero", logo: "/xero-logo.svg", height: "h-[40px]" },
    to: { name: "NetSuite", logo: "/netsuite-logo.svg", height: "h-[60px]" },
  },
];

const comingSoon = [
  "Sage",
  "MYOB",
  "Dynamics 365",
  "SAP",
  "Freshbooks",
  "Zoho Books",
];

export function SupportedSystems() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col justify-center px-[120px]"
    >
      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
            Supported Systems
          </p>
          <h2 className="text-[56px] font-semibold tracking-[-0.03em] text-black mb-3">
            Migration Paths
          </h2>
          <p className="text-[20px] text-black/45 max-w-[900px] leading-relaxed">
            Source AI handles the full migration between these systems —
            not just one platform, but any supported path.
          </p>
        </motion.div>

        {/* Live migration path cards */}
        <div className="grid grid-cols-3 gap-5 mb-10">
          {migrationPaths.map((path, i) => (
            <motion.div
              key={`${path.from.name}-${path.to.name}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white border border-black/10 p-8 flex flex-col"
            >
              {/* Status badge */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/25">
                  Migration Path
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] bg-black text-white px-3 py-1 font-medium">
                  Live
                </span>
              </div>

              {/* From → To with logos */}
              <div className="flex items-center justify-between flex-1 min-h-[80px]">
                <div className="flex flex-col items-center gap-3 flex-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={path.from.logo}
                    alt={path.from.name}
                    className={`${path.from.height} w-auto max-w-[140px] object-contain`}
                  />
                  <span className="text-[12px] font-mono text-black/25">
                    {path.from.name}
                  </span>
                </div>

                <div className="shrink-0 mx-3">
                  <ArrowRight size={22} className="text-black/20" />
                </div>

                <div className="flex flex-col items-center gap-3 flex-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={path.to.logo}
                    alt={path.to.name}
                    className={`${path.to.height} w-auto max-w-[140px] object-contain`}
                  />
                  <span className="text-[12px] font-mono text-black/25">
                    {path.to.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon — Anything → NetSuite */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="bg-black text-white p-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div>
                <p className="text-[12px] font-mono uppercase tracking-[0.12em] text-white/30 mb-3">
                  Coming Soon
                </p>
                <p className="text-[36px] font-semibold tracking-[-0.03em] leading-none">
                  Anything → NetSuite
                </p>
              </div>

              <div className="w-[1px] h-16 bg-white/10" />

              <div className="flex items-center gap-3 flex-wrap">
                {comingSoon.map((name, i) => (
                  <motion.span
                    key={name}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 + i * 0.06 }}
                    className="text-[14px] font-mono text-white/40 bg-white/[0.06] px-4 py-2"
                  >
                    {name}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="shrink-0 ml-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/netsuite-logo.svg"
                alt="NetSuite"
                className="h-[60px] w-auto opacity-20 invert"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
