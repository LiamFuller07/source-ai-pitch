"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { Slide } from "./Slide";

const coreTeam = [
  {
    name: "Liam Fuller",
    role: "CEO",
    detail: "AI infrastructure & agent systems.",
    image: "/team/liam.jpg",
  },
  {
    name: "Yoan Gabison",
    role: "CTO",
    detail: "Full-stack AI architect. NetSuite & ERP systems.",
    image: "/team/yoan.jpg",
  },
  {
    name: "Sahen Fuller",
    role: "Founding Engineer",
    detail: "Ex-Cybersecurity IT Director.",
    image: null,
  },
  {
    name: "Brian Kelleher",
    role: "AI Engineer",
    detail: "ML pipelines & data migration.",
    image: "/team/brian.jpg",
  },
  {
    name: "Jiri Pucs",
    role: "AI Engineer",
    detail: "Backend systems & integrations.",
    image: "/team/jiri.jpg",
  },
];

const consultants = [
  {
    name: "Sean Gillespie",
    role: "Consultant",
    detail: "ERP strategy & client delivery.",
    image: null,
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
          <h2 className="text-[72px] font-semibold tracking-[-0.03em] text-black mb-4">
            Built by AI engineers.
          </h2>
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

        {/* Core Team */}
        <div className="mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="text-[14px] font-mono uppercase tracking-[0.15em] text-black/25 mb-5"
          >
            Core Team
          </motion.p>
          <div className="grid grid-cols-5 gap-5">
            {coreTeam.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="border border-black/10 p-6 flex flex-col items-center text-center"
              >
                <Avatar name={member.name} image={member.image} />
                <p className="text-[20px] font-semibold text-black mt-4 mb-1">
                  {member.name}
                </p>
                <p className="text-[14px] font-mono uppercase tracking-[0.1em] text-black/40 mb-2">
                  {member.role}
                </p>
                <p className="text-[16px] text-black/35 leading-snug">
                  {member.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Consultants */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-[14px] font-mono uppercase tracking-[0.15em] text-black/25 mb-5"
          >
            Consultants
          </motion.p>
          <div className="grid grid-cols-2 gap-5 max-w-[700px]">
            {consultants.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.65 + i * 0.08 }}
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
          </div>

          {/* Anonymous extended team */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="mt-6 flex items-center gap-5"
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
    </Slide>
  );
}
