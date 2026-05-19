"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { meta } from "@/lib/content";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [0, -120]);
  const bgY    = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0D0907" }}
      aria-label="Intestazione principale"
    >
      {/* Background texture layer — slow parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none will-change-transform"
        aria-hidden
      >
        {/* Radial gold glow, top-center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(201,168,76,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 inset-x-0 h-48"
          style={{
            background: "linear-gradient(to top, #0D0907, transparent)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: titleY, opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto will-change-transform"
      >
        {/* Latin epigraph */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xs md:text-sm tracking-[0.3em] uppercase mb-10"
          style={{ color: "#C9A84C", fontFamily: "var(--font-ui)" }}
          lang="la"
        >
          Arma virumque cano · Aen. I 1
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={shouldReduce ? {} : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-6"
          style={{
            color: "#F5EDD8",
            textShadow: "0 0 80px rgba(201,168,76,0.15)",
          }}
        >
          {meta.title}
        </motion.h1>

        {/* Decorative rule */}
        <motion.div
          initial={shouldReduce ? {} : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="h-px w-32 mx-auto my-8 origin-left"
          style={{ backgroundColor: "#C9A84C" }}
          aria-hidden
        />

        {/* Subtitle */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-lg md:text-xl font-body italic"
          style={{ color: "#C8C0B2" }}
        >
          {meta.subtitle}
        </motion.p>

        {/* Author / period */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-xs tracking-[0.25em] uppercase mt-4"
          style={{ color: "#C9A84C", opacity: 0.7, fontFamily: "var(--font-ui)" }}
        >
          {meta.author}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "#C9A84C", opacity: 0.6, fontFamily: "var(--font-ui)" }}
        >
          Scorri
        </span>
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={20} style={{ color: "#C9A84C", opacity: 0.6 }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
