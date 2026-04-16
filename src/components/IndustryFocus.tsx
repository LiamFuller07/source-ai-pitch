"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShoppingCart,
  Truck,
  Factory,
  UtensilsCrossed,
  Briefcase,
  Monitor,
  CheckCircle2,
} from "lucide-react";
import { Slide } from "./Slide";

const industries = [
  {
    icon: ShoppingCart,
    name: "Retail & E-commerce",
    price: "$10–20K",
    timeline: "10–21 days",
    revenue: "$1M–$50M",
    integrations: ["Shopify", "Stripe", "Amazon"],
    scope: "Omnichannel inventory, DTC + wholesale, multi-location POS",
  },
  {
    icon: Truck,
    name: "Wholesale & Distribution",
    price: "$12–25K",
    timeline: "14–21 days",
    revenue: "$5M–$100M",
    integrations: ["EDI", "3PL", "ShipStation"],
    scope: "Multi-warehouse, landed cost, margin visibility, order management",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    price: "$15–30K",
    timeline: "14–21 days",
    revenue: "$5M–$80M",
    integrations: ["Salesforce", "HubSpot", "CAD"],
    scope: "BOM & work orders, production scheduling, shop-floor-to-GL",
  },
  {
    icon: UtensilsCrossed,
    name: "Food & Beverage",
    price: "$12–25K",
    timeline: "14–21 days",
    revenue: "$2M–$60M",
    integrations: ["Shopify", "Stripe", "EDI"],
    scope: "Lot traceability, expiry tracking, multi-channel distribution",
  },
  {
    icon: Briefcase,
    name: "Professional Services",
    price: "$10–20K",
    timeline: "10–21 days",
    revenue: "$1M–$50M",
    integrations: ["HubSpot", "Salesforce", "Xero"],
    scope: "Project accounting, resource utilisation, time & expense",
  },
  {
    icon: Monitor,
    name: "Technology & SaaS",
    price: "$12–25K",
    timeline: "10–21 days",
    revenue: "$2M–$80M",
    integrations: ["Stripe", "Salesforce", "HubSpot"],
    scope: "Revenue recognition (ASC 606), subscription billing, multi-entity",
  },
];

const idealClient = [
  "$1M–$100M annual revenue",
  "On QuickBooks, Xero, or Sage",
  "Standard accounting workflows",
  "1–5 subsidiaries / entities",
  "Common integrations (Shopify, Stripe, HubSpot)",
];

export function IndustryFocus() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-black"
      className="flex flex-col justify-center px-[100px]"
    >
      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-[14px] font-mono uppercase tracking-[0.2em] text-white/30 mb-3">
            Fixed-Price Industries
          </p>
          <h2 className="text-[52px] font-semibold tracking-[-0.03em] text-white mb-3">
            Where We Deliver
          </h2>
          <p className="text-[20px] text-white/40 max-w-[900px] leading-relaxed">
            Mid-market companies outgrowing QuickBooks, Xero, or Sage &mdash;
            every migration is fixed-price, fixed-timeline, zero scope creep.
          </p>
        </motion.div>

        {/* Main layout: industry grid left, ideal client right */}
        <div
          className="grid gap-7"
          style={{ gridTemplateColumns: "1fr 340px" }}
        >
          {/* Industry cards — 3x2 */}
          <div className="grid grid-cols-3 gap-4">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="border border-white/10 p-6 hover:border-white/20 transition-colors flex flex-col"
              >
                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 border border-white/15 flex items-center justify-center shrink-0">
                    <ind.icon
                      size={18}
                      strokeWidth={1.75}
                      className="text-white/50"
                    />
                  </div>
                  <p className="text-[17px] font-semibold text-white tracking-[-0.01em] leading-tight">
                    {ind.name}
                  </p>
                </div>

                {/* Price + Timeline */}
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-[28px] font-bold tracking-[-0.03em] text-white leading-none">
                    {ind.price}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-white/30">
                    {ind.timeline}
                  </span>
                </div>

                {/* Revenue range */}
                <p className="text-[11px] font-mono uppercase tracking-[0.08em] text-white/25 mb-3">
                  {ind.revenue} revenue
                </p>

                {/* Scope description */}
                <p className="text-[13px] text-white/40 leading-relaxed mb-4 flex-1">
                  {ind.scope}
                </p>

                {/* Integrations */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {ind.integrations.map((int) => (
                    <span
                      key={int}
                      className="text-[10px] font-mono font-bold text-white/60 bg-white/[0.06] border border-white/10 px-2 py-1"
                    >
                      + {int}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right sidebar — ideal client + stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col gap-5"
          >
            {/* Ideal Client Profile */}
            <div className="border border-white/10 p-7 flex-1">
              <p className="text-[13px] font-mono uppercase tracking-[0.12em] text-white/30 mb-6">
                Ideal Client Profile
              </p>
              <div className="space-y-4">
                {idealClient.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={16}
                      strokeWidth={1.75}
                      className="text-white/25 shrink-0 mt-0.5"
                    />
                    <span className="text-[15px] text-white/60 leading-snug">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Key numbers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-white/10 p-6">
                <p className="text-[36px] font-bold tracking-[-0.03em] text-white leading-none mb-1">
                  $10–30K
                </p>
                <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/30">
                  Fixed price
                </p>
              </div>
              <div className="border border-white/10 p-6">
                <p className="text-[36px] font-bold tracking-[-0.03em] text-white leading-none mb-1">
                  Sub 21
                </p>
                <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/30">
                  Days to go-live
                </p>
              </div>
            </div>

            {/* Fixed price guarantee */}
            <div className="bg-white p-6">
              <p className="text-[17px] font-semibold text-black tracking-[-0.01em] mb-2">
                Fixed price. Zero scope creep.
              </p>
              <p className="text-[14px] text-black/45 leading-relaxed">
                If anything goes wrong, it&apos;s on Source. Zero liability for
                you. Every migration includes integrations, testing, and
                go-live.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
}
