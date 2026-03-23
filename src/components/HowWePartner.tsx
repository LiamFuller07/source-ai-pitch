"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  LayoutDashboard,
  Code2,
  Shield,
  Database,
  Layers,
  Settings,
  Search,
  ClipboardList,
  FileText,
  Server,
  Code,
  CheckCircle2,
} from "lucide-react";
import { Slide } from "./Slide";

const serviceLanes = [
  { icon: LayoutDashboard, label: "Dashboards" },
  { icon: Code2, label: "SuiteScripts" },
  { icon: Database, label: "Data Quality" },
  { icon: Layers, label: "Integrations" },
  { icon: Shield, label: "SOX Report" },
  { icon: Settings, label: "Workflows" },
  { icon: Database, label: "Data Cleaning" },
  { icon: ClipboardList, label: "RBAC & Audit" },
  { icon: Search, label: "Saved Searches" },
  { icon: ClipboardList, label: "Assessments" },
];

const processSteps = [
  { icon: FileText, title: "Req + Doc", desc: "Share requirements, brief, or call transcript" },
  { icon: Server, title: "API Keys", desc: "Read access to client\u2019s NetSuite instance" },
  { icon: Code, title: "Sandbox Deploy", desc: "Source builds and deploys for review" },
  { icon: CheckCircle2, title: "Live & Billed", desc: "Approve, go live, bill monthly", highlight: true },
];

const laneCards = [
  { label: "Dashboards & KPI", price: "$500\u2013$2K/mo", was: "Was $5K\u2013$15K", turnaround: "<24 hrs" },
  { label: "SuiteScript & Workflows", price: "$1K\u2013$3K/mo", was: "Was $10K\u2013$30K", turnaround: "1\u20133 days" },
  { label: "Reports & Compliance", price: "$2K\u2013$5K/mo", was: "Was $20K\u2013$50K", turnaround: "1\u20132 days" },
  { label: "3rd-Party Integrations", price: "$1K\u2013$3K/mo", was: "Was $10K\u2013$25K", turnaround: "1\u20133 days" },
];

export function HowWePartner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-[#f8f8f8]"
      className="flex flex-col justify-center px-[100px]"
    >
      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[14px] font-mono uppercase tracking-[0.2em] text-black/30 mb-4">
            Managed Services
          </p>
          <h2 className="text-[56px] font-semibold tracking-[-0.03em] mb-5 whitespace-nowrap">
            And we also do managed services work.
          </h2>
          <p className="text-[22px] text-black/45 max-w-[960px] leading-relaxed">
            Post-implementation feature work &mdash; dashboards, SuiteScripts, integrations, compliance.
            Built by AI on demand. You bill monthly with zero delivery overhead.
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="grid gap-8" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
          {/* LEFT — Example + Process */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Process steps — compact horizontal */}
            <div className="bg-white border border-black/10 p-8">
              <p className="text-[13px] font-mono uppercase tracking-[0.12em] text-black/30 mb-5">
                How It Works
              </p>
              <div className="grid grid-cols-4 gap-4">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`flex flex-col p-5 ${step.highlight ? 'bg-black' : 'bg-black/[0.04] border border-black/8'}`}
                  >
                    <span className={`shrink-0 w-9 h-9 flex items-center justify-center mb-3 ${step.highlight ? 'bg-white/15' : 'bg-white'}`}>
                      <step.icon size={16} strokeWidth={1.75} className={step.highlight ? 'text-white' : 'text-black/45'} />
                    </span>
                    <p className={`text-[17px] font-semibold tracking-[-0.01em] mb-1 ${step.highlight ? 'text-white' : 'text-black'}`}>
                      {step.title}
                    </p>
                    <p className={`text-[13px] leading-relaxed ${step.highlight ? 'text-white/50' : 'text-black/40'}`}>
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Revenue bar */}
              <div className="flex mt-5 overflow-hidden border border-black/8">
                <div className="flex-[18] bg-black/[0.06] py-3 text-center">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/40">You</span>
                </div>
                <div className="flex-[50] bg-black py-3 text-center">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white">Source AI</span>
                </div>
                <div className="flex-[32] bg-[#333] py-3 text-center">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white">You Bill Client</span>
                </div>
              </div>
            </div>

            {/* Lane cards with pricing */}
            <div className="grid grid-cols-2 gap-3">
              {laneCards.map((lane, i) => (
                <motion.div
                  key={lane.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="bg-white border border-black/10 p-5"
                >
                  <p className="text-[16px] font-semibold text-black tracking-[-0.01em] mb-1">{lane.label}</p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[18px] font-bold text-black tracking-[-0.01em]">{lane.price}</span>
                    <span className="text-[11px] font-medium text-black/30 uppercase tracking-[0.05em]">{lane.turnaround}</span>
                  </div>
                  <p className="text-[12px] text-black/30 mt-1">{lane.was} one-time</p>
                </motion.div>
              ))}
            </div>

            {/* Customer quote */}
            <div className="bg-white border border-black/10 border-l-[3px] border-l-black/20 px-7 py-6">
              <p className="text-[17px] text-black/50 leading-relaxed italic">
                &ldquo;A client asked for a PO approval dashboard. Normally $12K and 3 weeks. Source had it in sandbox in under 24 hours. We bill $2K/mo &mdash; client pays less, we keep 84% margin.&rdquo;
              </p>
              <p className="text-[12px] font-semibold text-black/60 mt-3">NetSuite Alliance Partner</p>
              <p className="text-[11px] text-black/30">Mid-Market Practice, Australia</p>
            </div>
          </motion.div>

          {/* RIGHT — What Source Builds + Economics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col gap-6"
          >
            {/* Service lanes */}
            <div className="bg-black p-10 flex-1">
              <div className="flex items-center justify-between mb-8">
                <p className="text-[13px] font-mono uppercase tracking-[0.12em] text-white/50">
                  What Source Builds
                </p>
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black bg-white px-4 py-2">
                  Always On
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-7">
                {serviceLanes.map((lane, i) => (
                  <motion.div
                    key={lane.label}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 + i * 0.06 }}
                    className="flex items-center gap-4"
                  >
                    <lane.icon size={20} strokeWidth={1.75} className="text-white/45 shrink-0" />
                    <span className="text-[21px] font-medium text-white/85">
                      {lane.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Economics comparison */}
            <div className="grid grid-cols-2 gap-5">
              {/* Without Source */}
              <div className="border border-black/10 bg-white p-8">
                <p className="text-[13px] font-mono uppercase tracking-[0.10em] text-black/30 mb-6">
                  Without Source
                </p>
                <div className="space-y-5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[17px] text-black/40">You charge</span>
                    <span className="text-[19px] font-semibold text-black/40 line-through decoration-black/15">$5,000/mo</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[17px] text-black/40">Consultant cost</span>
                    <span className="text-[19px] font-semibold text-black/40 line-through decoration-black/15">$4,000/mo</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[17px] text-black/40">Your time</span>
                    <span className="text-[19px] font-semibold text-black/40 line-through decoration-black/15">40+ hrs/mo</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-5 border-t border-black/6">
                    <span className="text-[17px] font-semibold text-black/50">Profit</span>
                    <span className="text-[24px] font-bold text-black/35">~$1K/mo</span>
                  </div>
                </div>
              </div>

              {/* With Source */}
              <div className="border-2 border-black bg-white p-8">
                <p className="text-[13px] font-mono uppercase tracking-[0.10em] text-black mb-6">
                  With Source
                </p>
                <div className="space-y-5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[17px] text-black/50">You charge</span>
                    <span className="text-[19px] font-bold text-black">$5,000/mo</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[17px] text-black/50">Source cost</span>
                    <span className="text-[19px] font-bold text-black">~$800/mo (varies)</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[17px] text-black/50">Your time</span>
                    <span className="text-[19px] font-bold text-black">~4 hrs/mo</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-5 border-t border-black/10">
                    <span className="text-[17px] font-semibold text-black">Profit</span>
                    <span className="text-[28px] font-bold text-black">~$4.2K/mo</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
}
