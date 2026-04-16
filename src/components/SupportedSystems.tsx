"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Slide } from "./Slide";

const targetSystems = [
  { name: "NetSuite", logo: "/logos/netsuite.svg", height: "h-[52px]" },
  { name: "SAP", logo: "/logos/sap.svg", height: "h-[44px]" },
  { name: "Dynamics 365", logo: "/logos/dynamics365.svg", height: "h-[48px]" },
  { name: "Sage", logo: "/logos/sage.svg", height: "h-[42px]" },
];

const sourceSystems = {
  "Mid-Market Accounting": [
    "QuickBooks (all versions)",
    "Xero",
    "MYOB / Reckon",
    "Sage 50 / 100 / 300",
    "FreshBooks / Wave",
    "Zoho Books",
  ],
  "Legacy ERP": [
    "Dynamics GP / Great Plains",
    "Dynamics NAV / Navision",
    "SAP ECC / R/3",
    "Oracle E-Business Suite",
    "Epicor (all versions)",
    "Infor (all versions)",
  ],
  "Anything Else": [
    "Spreadsheets / Excel",
    "CSV / flat-file exports",
    "Custom / in-house systems",
    "Access databases",
    "SQL / database exports",
    "+ any other system",
  ],
};

export function SupportedSystems() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col px-[120px] py-[70px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
          System Agnostic
        </p>
        <h2 className="text-[56px] font-semibold tracking-[-0.03em] text-black mb-3 leading-[1.05]">
          AI Supported Migrations
        </h2>
        <p className="text-[20px] text-black/50 max-w-[1100px] leading-relaxed">
          <span className="text-black font-medium">Any source system</span> → NetSuite, SAP, Dynamics 365, or Sage.
          Source handles the big four ERP targets out of the box, plus 100s of attached integrations.
        </p>
      </motion.div>

      {/* Target Systems — the Big Four */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <p className="text-[12px] font-mono uppercase tracking-[0.15em] text-black/40 font-bold">
            Target Systems
          </p>
          <div className="flex-1 h-px bg-black/10" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {targetSystems.map((sys, i) => (
            <motion.div
              key={sys.name}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="bg-white border border-black/10 flex items-center justify-center h-[140px] px-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sys.logo}
                alt={sys.name}
                className={`${sys.height} w-auto max-w-full object-contain`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Source Systems — Any System */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        className="bg-white border border-black/10 p-8 flex-1 min-h-0"
      >
        <div className="flex items-center gap-4 mb-5">
          <span className="text-[32px] font-semibold tracking-[-0.02em] text-black leading-none">
            Anything
          </span>
          <ArrowRight size={24} strokeWidth={1.75} className="text-black/30" />
          <span className="text-[32px] font-semibold tracking-[-0.02em] text-black leading-none">
            the Big Four
          </span>
          <div className="flex-1 h-px bg-black/10" />
          <span className="text-[12px] font-mono uppercase tracking-[0.12em] text-black/35 font-bold">
            Source Systems
          </span>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {Object.entries(sourceSystems).map(([category, items], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 + ci * 0.1 }}
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/30 font-bold mb-3">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-[13px] font-mono text-black/65 bg-black/[0.03] border border-black/10 px-3 py-1.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-black/10">
          <p className="text-[14px] text-black/45 leading-relaxed">
            Source scans via API where available, or works from data exports, reports, and documentation.
            <span className="text-black/70"> It doesn&apos;t matter what the client is running.</span>
          </p>
        </div>
      </motion.div>
    </Slide>
  );
}
