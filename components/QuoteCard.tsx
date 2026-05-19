"use client";

import { motion, useReducedMotion } from "framer-motion";

interface QuoteCardProps {
  latin: string;
  translation: string;
  source: string;
  accentColor?: string;
}

export default function QuoteCard({
  latin,
  translation,
  source,
  accentColor = "#C9A84C",
}: QuoteCardProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      className="relative my-10 px-8 py-8 border-l-2"
      style={{ borderColor: accentColor }}
    >
      {/* Decorative corner */}
      <span
        className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 -translate-x-px -translate-y-px"
        style={{ borderColor: accentColor }}
        aria-hidden
      />
      <span
        className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 translate-x-px translate-y-px"
        style={{ borderColor: accentColor }}
        aria-hidden
      />

      {/* Latin verse */}
      <p
        className="text-xl md:text-2xl font-display italic leading-relaxed whitespace-pre-line mb-4"
        style={{ color: accentColor }}
        lang="la"
      >
        {latin}
      </p>

      {/* Italian translation */}
      <p className="text-base md:text-lg font-body text-current opacity-80 mb-3 leading-relaxed">
        {translation}
      </p>

      {/* Source */}
      <p
        className="text-xs font-ui tracking-widest uppercase opacity-60"
        style={{ fontFamily: "var(--font-ui)" }}
      >
        {source}
      </p>
    </motion.div>
  );
}
