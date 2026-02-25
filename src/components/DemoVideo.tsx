"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { Slide } from "./Slide";

export function DemoVideo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Slide
      ref={ref}
      bg="bg-black"
      className="flex flex-col items-center justify-center px-[80px]"
    >
      <div className="w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-[14px] font-mono uppercase tracking-[0.2em] text-white/30 mb-3">
            Live Demo
          </p>
          <h2 className="text-[48px] font-semibold tracking-[-0.03em] text-white">
            See Source AI in Action
          </h2>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-[1400px] relative cursor-pointer group"
          onClick={handlePlay}
        >
          <div className="relative w-full aspect-video bg-black/50 border border-white/10 overflow-hidden">
            <video
              ref={videoRef}
              src="/source-demo.mp4"
              className="w-full h-full object-contain"
              playsInline
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Play overlay — fades when playing */}
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
                isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <div className="w-20 h-20 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/60 group-hover:scale-105 transition-all duration-200">
                <Play size={32} className="text-white/60 ml-1 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            <p className="text-[13px] font-mono text-white/25">
              QuickBooks scan → business logic inference → NetSuite migration — under 21 days
            </p>
            <a
              href="http://35.233.101.128:3002/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 bg-white text-black px-5 py-2.5 text-[11px] font-mono uppercase tracking-[0.08em] font-medium hover:bg-white/90 transition-colors shrink-0"
            >
              <ExternalLink size={13} />
              Try Live Demo
            </a>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
