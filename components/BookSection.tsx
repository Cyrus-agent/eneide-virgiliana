"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import QuoteCard from "./QuoteCard";
import ParticleEmbers from "./ParticleEmbers";
import { books, quotes } from "@/lib/content";

interface BookSectionProps {
  variant: "I" | "II" | "III" | "IV";
}

// Scene illustrations per book variant
const bookImages: Partial<Record<string, { src: string; alt: string }>> = {
  II: {
    src: "/images/book2-fall-of-troy.jpg",
    alt: "La caduta di Troia in fiamme — Libro II",
  },
  III: {
    src: "/images/book3-fleet-mediterranean.jpg",
    alt: "La flotta troiana nel Mediterraneo — Libro III",
  },
  IV: {
    src: "/images/book4-dido-pyre.jpg",
    alt: "Didone sul rogo funebre — Libro IV",
  },
};

// Ember effects for thematically appropriate books
const bookEmbers: Partial<Record<string, { color: string; intensity: "low" | "medium" | "high" }>> = {
  II: { color: "#C03030", intensity: "high" },   // Burning Troy — red fire
  IV: { color: "#C9A84C", intensity: "medium" }, // Dido's pyre — golden amber
};

const romanNumeralToId: Record<string, string> = {
  I: "libro-i",
  II: "libro-ii",
  III: "libro-iii",
  IV: "libro-iv",
};

export default function BookSection({ variant }: BookSectionProps) {
  const shouldReduce = useReducedMotion();
  const book = books.find((b) => b.variant === variant)!;
  const bookQuotes = quotes.filter((q) => q.book === variant);

  const sceneImage = bookImages[variant];
  const embers = bookEmbers[variant];

  return (
    <SectionWrapper id={romanNumeralToId[variant]} bgColor={book.bg}>
      {/* Atmospheric ember particles */}
      {embers && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <ParticleEmbers count={embers.intensity === "high" ? 40 : 20} color={embers.color} intensity={embers.intensity} />
        </div>
      )}

      {/* Scene illustration */}
      {sceneImage && (
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(220px, 35vw, 480px)" }}
          aria-hidden
        >
          <Image
            src={sceneImage.src}
            alt={sceneImage.alt}
            fill
            className="object-cover object-center"
            style={{ opacity: 0.55 }}
            sizes="100vw"
          />
          {/* Fade into section bg at top and bottom */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${book.bg} 0%, transparent 25%, transparent 70%, ${book.bg} 100%)`,
            }}
          />
          {/* Caption */}
          <div className="absolute bottom-4 right-6 z-10">
            <p
              className="text-xs italic"
              style={{ color: book.accent, fontFamily: "var(--font-ui)", opacity: 0.6, letterSpacing: "0.06em" }}
            >
              {sceneImage.alt}
            </p>
          </div>
        </motion.div>
      )}

      <div className="px-6 md:px-12 lg:px-24 py-24 md:py-40 max-w-5xl mx-auto">
        {/* Book label */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: book.accent, opacity: 0.7, fontFamily: "var(--font-ui)" }}
        >
          {book.title}
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-bold mb-3"
          style={{ color: book.textColor }}
        >
          {book.subtitle}
        </motion.h2>

        {/* Decorative rule */}
        <motion.div
          initial={shouldReduce ? {} : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="h-px w-24 mb-10 origin-left"
          style={{ backgroundColor: book.accent }}
          aria-hidden
        />

        {/* Intro */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-base md:text-lg leading-relaxed mb-12 max-w-3xl"
          style={{ color: book.textColor, opacity: 0.85 }}
        >
          {book.intro}
        </motion.p>

        {/* Subsections */}
        <div className="space-y-12">
          {book.subsections.map((sub, i) => (
            <motion.div
              key={sub.title}
              initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <h3
                className="text-xl md:text-2xl font-display font-semibold mb-4"
                style={{ color: book.accent }}
              >
                {sub.title}
              </h3>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: book.textColor, opacity: 0.80 }}
              >
                {sub.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote cards */}
        {bookQuotes.length > 0 && (
          <div className="mt-16 space-y-2" style={{ color: book.textColor }}>
            {bookQuotes.map((q) => (
              <QuoteCard
                key={q.source}
                latin={q.latin}
                translation={q.translation}
                source={q.source}
                accentColor={book.accent}
              />
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
