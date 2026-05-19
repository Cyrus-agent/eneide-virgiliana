"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { KeyFinding as KeyFindingType } from "@/lib/content";

interface KeyFindingProps {
  finding: KeyFindingType;
  index: number;
  accentColor?: string;
}

export default function KeyFinding({ finding, index, accentColor = "#C9A84C" }: KeyFindingProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: shouldReduce ? 0 : index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, margin: "-40px" }}
      className="flex gap-5 py-6 border-b border-current/10"
    >
      <span
        className="shrink-0 text-4xl font-display font-bold leading-none mt-1"
        style={{ color: accentColor, opacity: 0.6 }}
        aria-hidden
      >
        {String(finding.number).padStart(2, "0")}
      </span>
      <div>
        <h3 className="font-display text-lg font-semibold mb-2 leading-snug">
          {finding.title}
        </h3>
        <p className="text-sm md:text-base opacity-80 leading-relaxed mb-2">
          {finding.body}
        </p>
        {finding.citation && (
          <p
            className="text-xs font-ui tracking-widest uppercase opacity-50 mt-2"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            {finding.citation}
          </p>
        )}
      </div>
    </motion.div>
  );
}
