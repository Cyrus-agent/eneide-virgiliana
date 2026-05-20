"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { meta } from "@/lib/content";
import AnimatedColumns from "./AnimatedColumns";
import ParticleEmbers from "./ParticleEmbers";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY  = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [0, -140]);
  const bgY     = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [0, 100]);
  const imgY    = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0D0907" }}
      aria-label="Intestazione principale"
    >
      {/* Background hero image — Aeneas fleeing Troy */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform"
        aria-hidden
      >
        <Image
          src="/images/hero-aeneas-troy.jpg"
          alt="Enea che fugge da Troia portando il padre Anchise"
          fill
          preload
          className="object-cover object-center"
          style={{ opacity: 0.35 }}
          sizes="100vw"
        />
        {/* Dark overlay gradients */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,9,7,0.6) 0%, rgba(13,9,7,0.2) 40%, rgba(13,9,7,0.5) 70%, rgba(13,9,7,0.95) 100%)",
          }}
        />
        {/* Side darkening for column space */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(13,9,7,0.7) 0%, transparent 20%, transparent 80%, rgba(13,9,7,0.7) 100%)",
          }}
        />
      </motion.div>

      {/* Animated embers */}
      <div className="absolute inset-0" aria-hidden>
        <ParticleEmbers count={25} color="#C9A84C" intensity="low" />
      </div>

      {/* Animated columns — both sides */}
      <AnimatedColumns side="left" accentColor="#C9A84C" bgColor="#0D0907" />
      <AnimatedColumns side="right" accentColor="#C9A84C" bgColor="#0D0907" />

      {/* Main content */}
      <motion.div
        style={{ y: titleY, opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto will-change-transform"
      >
        {/* Latin epigraph */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xs md:text-sm mb-10"
          style={{
            color: "#C9A84C",
            fontFamily: "var(--font-ui)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
          lang="la"
        >
          Arma virumque cano · Aen. I 1
        </motion.p>

        {/* Decorative line above title */}
        <motion.div
          initial={shouldReduce ? {} : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center gap-3 mb-6"
          aria-hidden
        >
          <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: "rgba(201,168,76,0.4)" }} />
          {/* Laurel / diamond ornament */}
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M8 1 L15 8 L8 15 L1 8 Z" fill="#C9A84C" opacity={0.6} />
            <path d="M8 3.5 L12.5 8 L8 12.5 L3.5 8 Z" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity={0.8} />
          </svg>
          <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: "rgba(201,168,76,0.4)" }} />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={shouldReduce ? {} : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-6"
          style={{
            color: "#F5EDD8",
            textShadow: "0 2px 40px rgba(201,168,76,0.2), 0 0 80px rgba(201,168,76,0.1)",
          }}
        >
          {meta.title}
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          initial={shouldReduce ? {} : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="h-px w-32 mx-auto my-8 origin-center"
          style={{ backgroundColor: "#C9A84C" }}
          aria-hidden
        />

        {/* Subtitle */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-lg md:text-xl font-body italic"
          style={{ color: "#C8C0B2" }}
        >
          {meta.subtitle}
        </motion.p>

        {/* Author */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-xs mt-4"
          style={{
            color: "#C9A84C",
            fontFamily: "var(--font-ui)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            opacity: 0.65,
          }}
        >
          {meta.author}
        </motion.p>
      </motion.div>

      {/* Floating scene caption */}
      <motion.div
        style={{ opacity }}
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-20 left-6 z-10 max-w-xs hidden md:block"
        aria-hidden
      >
        <p
          className="text-xs italic"
          style={{
            color: "#C9A84C",
            fontFamily: "var(--font-ui)",
            letterSpacing: "0.08em",
            opacity: 0.5,
          }}
        >
          Enea fugge da Troia portando il padre Anchise · Aen. II
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "#C9A84C", opacity: 0.55, fontFamily: "var(--font-ui)" }}
        >
          Scorri
        </span>
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={20} style={{ color: "#C9A84C", opacity: 0.55 }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
