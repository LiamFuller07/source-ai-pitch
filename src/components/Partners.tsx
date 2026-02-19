"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Globe, Users, ShieldCheck } from "lucide-react";
import { Slide } from "./Slide";

const partners = [
  {
    name: "AppWrap",
    tagline: "NetSuite Hi-Tech Partner of the Year",
    description:
      "Award-winning NetSuite Alliance Partner specializing in implementations, complex integrations, and optimization. One of the only NetSuite Partners with SOC I Type I certification.",
    highlights: [
      { icon: Award, text: "NetSuite Hi-Tech Partner of the Year" },
      { icon: ShieldCheck, text: "SOC I Type I certified" },
      { icon: Users, text: "ERP consultants, CPAs & business transformation specialists" },
    ],
    url: "appwrap.com",
  },
  {
    name: "Bring IT",
    tagline: "Global NetSuite Alliance Partner",
    description:
      "Award-winning global ERP consulting provider with 300+ cloud ERP experts across North America, Europe, and Latin America. Recognized by NetSuite with the ERP Expert Badge.",
    highlights: [
      { icon: Globe, text: "300+ ERP experts across 3 continents" },
      { icon: Award, text: "NetSuite ERP Expert Badge" },
      { icon: Users, text: "Strategic partner of Oracle NetSuite, Avalara & Celigo" },
    ],
    url: "bringitps.com",
  },
];

export function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-black"
      className="flex flex-col justify-center px-[120px]"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[18px] font-mono uppercase tracking-[0.2em] text-white/30 mb-4">
            Our Partners
          </p>
          <h2 className="text-[72px] font-semibold tracking-[-0.03em] text-white mb-4">
            Trusted by leading consultancies.
          </h2>
          <p className="text-[22px] text-white/40 max-w-[900px] leading-relaxed">
            Source AI partners with top-tier NetSuite Alliance Partners to
            deliver faster, more profitable migrations.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="border border-white/10 bg-white/[0.03] p-10"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-[36px] font-bold text-white tracking-[-0.02em]">
                    {partner.name}
                  </h3>
                  <p className="text-[14px] font-mono uppercase tracking-[0.1em] text-white/30 mt-1">
                    {partner.tagline}
                  </p>
                </div>
                <p className="text-[12px] font-mono text-white/20 mt-2">
                  {partner.url}
                </p>
              </div>

              <p className="text-[17px] text-white/45 leading-relaxed mb-8">
                {partner.description}
              </p>

              <div className="space-y-4">
                {partner.highlights.map((h, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.15 + j * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <h.icon size={18} className="text-white/25 shrink-0" />
                    <p className="text-[15px] text-white/55">{h.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
