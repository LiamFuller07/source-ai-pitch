"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowLeftRight } from "lucide-react";
import { Slide } from "./Slide";

const migrationPaths = [
  {
    left: { name: "QuickBooks", logo: "/quickbooks-logo.svg", height: "h-[40px]" },
    right: { name: "NetSuite", logo: "/netsuite-logo.svg", height: "h-[48px]" },
    bidirectional: true,
    connectedTools: ["+ Shopify", "+ HubSpot", "+ Stripe", "+ 100s more"],
  },
  {
    left: { name: "Xero", logo: "/xero-logo.svg", height: "h-[48px]" },
    right: { name: "NetSuite", logo: "/netsuite-logo.svg", height: "h-[48px]" },
    bidirectional: false,
    connectedTools: ["+ Stripe", "+ PayPal", "+ 100s more"],
  },
  {
    left: { name: "QuickBooks", logo: "/quickbooks-logo.svg", height: "h-[40px]" },
    right: { name: "NetSuite", logo: "/netsuite-logo.svg", height: "h-[48px]" },
    bidirectional: false,
    connectedTools: ["+ Salesforce", "+ SharePoint", "+ 100s more"],
  },
];

const comingSoon = [
  "Dynamics 365",
  "Sage",
  "MYOB",
  "SAP",
  "Freshbooks",
  "Zoho Books",
  "DEAR Systems",
  "Reckon",
  "Custom / Legacy ERPs",
];

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
        className="mb-10"
      >
        <p className="text-[16px] font-mono uppercase tracking-[0.2em] text-black/30 mb-3">
          Supported Systems
        </p>
        <h2 className="text-[56px] font-semibold tracking-[-0.03em] text-black mb-3">
          AI Supported Migrations
        </h2>
        <p className="text-[20px] text-black/45 max-w-[900px] leading-relaxed">
          Source is capable across these paths today, along with 100s of integrations attached to them.
        </p>
      </motion.div>

      {/* Live migration path cards — stretch to fill */}
      <div className="flex-1 grid grid-cols-3 gap-5 mb-8 min-h-0">
        {migrationPaths.map((path, i) => (
          <motion.div
            key={`${path.left.name}-${path.right.name}`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="bg-white border border-black/10 p-8 flex flex-col"
          >
            {/* Status badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-black/25">
                Migration Path
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.1em] bg-black text-white px-3 py-1 font-medium">
                Live
              </span>
            </div>

            {/* Logos with arrow */}
            <div className="flex items-center justify-center gap-6 flex-1">
              <div className="flex flex-col items-center gap-3 flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={path.left.logo}
                  alt={path.left.name}
                  className={`${path.left.height} w-auto max-w-[180px] object-contain`}
                />
                {/* Connected tools */}
                {path.connectedTools && (
                  <div className="flex flex-wrap items-center justify-center gap-1 mt-1">
                    {path.connectedTools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] font-mono text-black/30 bg-black/[0.04] px-2 py-0.5"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="shrink-0">
                {path.bidirectional ? (
                  <ArrowLeftRight size={36} strokeWidth={1.5} className="text-black/25" />
                ) : (
                  <ArrowRight size={36} strokeWidth={1.5} className="text-black/25" />
                )}
              </div>

              <div className="flex flex-col items-center gap-3 flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={path.right.logo}
                  alt={path.right.name}
                  className={`${path.right.height} w-auto max-w-[180px] object-contain`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Separator */}
      <div className="border-t border-black/10 my-2" />

      {/* Coming Soon — white bg for future logos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        className="bg-white border border-black/10 p-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div>
              <p className="text-[12px] font-mono uppercase tracking-[0.12em] text-black/30 mb-3">
                Coming Soon
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[36px] font-semibold tracking-[-0.03em] leading-none text-black">
                  Anything →
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/netsuite-logo.svg" alt="NetSuite" className="h-[48px] w-auto" />
              </div>
            </div>

            <div className="w-[1px] h-16 bg-black/10" />

            <div className="flex items-center gap-3 flex-wrap">
              {comingSoon.map((name, i) => (
                <motion.span
                  key={name}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.06 }}
                  className="text-[14px] font-mono text-black/50 bg-black/[0.04] border border-black/10 px-4 py-2"
                >
                  {name}
                </motion.span>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </Slide>
  );
}
