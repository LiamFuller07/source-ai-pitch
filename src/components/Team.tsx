"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { Slide } from "./Slide";

const leadership = [
  {
    name: "Liam Fuller",
    role: "CEO",
    detail: "Built Source's autonomous migration engine. AI infrastructure & multi-agent systems.",
    image: "/team/liam.jpg",
  },
  {
    name: "Yoan Gabison",
    role: "CTO",
    detail: "10+ years in NetSuite & ERP. Full-stack AI architect who designed Source's core platform.",
    image: "/team/yoan.jpg",
  },
  {
    name: "Sean Gillespie",
    role: "Head of Consulting",
    detail: "ERP strategy & go-to-market. Leads partner delivery, client success & marketing execution.",
    image: "/team/sean.jpg",
  },
];

const engineers = [
  {
    name: "Shane Fuller",
    role: "Founding Engineer",
    detail: "Former Cybersecurity IT Director. Enterprise security, infrastructure & compliance.",
    image: "/team/shane.jpg",
  },
  {
    name: "Brian Kelleher",
    role: "AI Engineer",
    detail: "ML pipelines & data migration. Builds the models that power Source's automation.",
    image: "/team/brian.jpg",
  },
  {
    name: "Jiri Pucs",
    role: "AI Engineer",
    detail: "Backend systems, API architecture & integration pipelines.",
    image: "/team/jiri.jpg",
  },
];

const consultants = [
  {
    name: "Matthew Rodgers",
    role: "Senior Consultant",
    detail: "ERP implementation & enterprise transformation.",
    image: "/team/matthew.jpg",
  },
  {
    name: "Bryan McCutchan",
    role: "Consultant",
    detail: "ERP migration & systems integration.",
    image: "/team/bryan.jpg",
  },
];

function Avatar({
  name,
  image,
  size = "md",
}: {
  name: string;
  image: string | null;
  size?: "md" | "sm";
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const dims = size === "md" ? "w-16 h-16" : "w-12 h-12";
  const textSize = size === "md" ? "text-[18px]" : "text-[14px]";

  if (!image || failed) {
    return (
      <div
        className={`${dims} rounded-full bg-black/5 flex items-center justify-center shrink-0`}
      >
        <span className={`${textSize} font-semibold text-black/30`}>
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${dims} rounded-full overflow-hidden shrink-0 bg-black/5`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Slide
      ref={ref}
      bg="bg-white"
      className="flex flex-col justify-center px-[120px]"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-[18px] font-mono uppercase tracking-[0.2em] text-black/30 mb-4">
            The Team
          </p>
          <h2 className="text-[72px] font-semibold tracking-[-0.03em] text-black mb-2">
            Built by AI engineers.
          </h2>
          <p className="text-[22px] text-black/40 max-w-[800px] leading-relaxed">
            A team with deep ERP domain expertise and production AI systems experience.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 text-black/40"
          >
            <MapPin size={20} />
            <p className="text-[20px] font-mono">San Francisco, CA</p>
          </motion.div>
        </motion.div>

        {/* Leadership */}
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="text-[14px] font-mono uppercase tracking-[0.15em] text-black/25 mb-5"
          >
            Leadership
          </motion.p>
          <div className="grid grid-cols-[1fr_1fr_0.85fr] gap-5">
            {leadership.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className={`border-2 border-black/15 flex items-center gap-5 ${i === 2 ? "p-5" : "p-7"}`}
              >
                <Avatar name={member.name} image={member.image} />
                <div>
                  <p className="text-[22px] font-semibold text-black mb-0.5">
                    {member.name}
                  </p>
                  <p className="text-[13px] font-mono uppercase tracking-[0.1em] text-black/40 mb-2">
                    {member.role}
                  </p>
                  <p className="text-[15px] text-black/40 leading-snug">
                    {member.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Engineers */}
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-[14px] font-mono uppercase tracking-[0.15em] text-black/25 mb-5"
          >
            Engineering
          </motion.p>
          <div className="grid grid-cols-3 gap-5">
            {engineers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                className="border border-black/10 p-6 flex items-center gap-4"
              >
                <Avatar name={member.name} image={member.image} />
                <div>
                  <p className="text-[18px] font-semibold text-black mb-0.5">
                    {member.name}
                  </p>
                  <p className="text-[12px] font-mono uppercase tracking-[0.1em] text-black/40 mb-1.5">
                    {member.role}
                  </p>
                  <p className="text-[14px] text-black/35 leading-snug">
                    {member.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Consultants */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="text-[14px] font-mono uppercase tracking-[0.15em] text-black/25 mb-5"
          >
            Consultants
          </motion.p>
          <div className="flex items-center gap-5">
            {consultants.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.75 + i * 0.08 }}
                className="border border-black/8 p-5 flex items-center gap-4"
              >
                <Avatar name={member.name} image={member.image} size="sm" />
                <div>
                  <p className="text-[18px] font-semibold text-black mb-0.5">
                    {member.name}
                  </p>
                  <p className="text-[13px] font-mono uppercase tracking-[0.1em] text-black/40">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Anonymous extended team */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="flex items-center gap-5"
            >
              <div className="flex -space-x-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-black/[0.06] border-2 border-white flex items-center justify-center"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-black/20"
                    >
                      <circle cx="8" cy="6" r="3" fill="currentColor" />
                      <path
                        d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-black/[0.06] border-2 border-white flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-black/30">
                    10+
                  </span>
                </div>
              </div>
              <p className="text-[15px] text-black/35 font-mono">
                Additional internal expertise consultants
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
