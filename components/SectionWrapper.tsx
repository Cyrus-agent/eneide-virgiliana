"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface SectionWrapperProps {
  id: string;
  bgColor: string;
  children: React.ReactNode;
  className?: string;
  parallaxIntensity?: number;
}

export default function SectionWrapper({
  id,
  bgColor,
  children,
  className = "",
  parallaxIntensity = 60,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [0, 0] : [-parallaxIntensity, parallaxIntensity]
  );

  return (
    <section
      id={id}
      ref={ref}
      style={{ backgroundColor: bgColor }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </section>
  );
}
