"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { bibliography } from "@/lib/content";
import type { BibEntry } from "@/lib/content";

const CATEGORIES: { key: BibEntry["book"]; label: string }[] = [
  { key: "generale", label: "Studi generali" },
  { key: "I", label: "Libro I" },
  { key: "II", label: "Libro II" },
  { key: "III", label: "Libro III" },
  { key: "IV", label: "Libro IV" },
];

function AccordionItem({
  category,
  label,
  entries,
}: {
  category: BibEntry["book"];
  label: string;
  entries: BibEntry[];
}) {
  const [open, setOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <div className="border-b" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-lg" style={{ color: "#C9A84C" }}>
          {label}
          <span
            className="ml-3 text-xs font-ui tracking-widest opacity-60"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            {entries.length} voci
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.25 }}
          aria-hidden
        >
          <ChevronDown size={18} style={{ color: "#C9A84C" }} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={shouldReduce ? { height: "auto" } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduce ? { height: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ul className="pb-6 space-y-4">
              {entries.map((entry) => (
                <li key={`${entry.author}-${entry.year}`} className="pl-4 border-l" style={{ borderColor: "rgba(201,168,76,0.25)" }}>
                  <p className="text-sm font-body" style={{ color: "#F5EDD8", opacity: 0.9 }}>
                    <span className="font-semibold">{entry.author}</span>,{" "}
                    <span className="italic">{entry.title}</span>,{" "}
                    {entry.publisher}, {entry.year}.
                  </p>
                  {entry.note && (
                    <p
                      className="text-xs mt-1 opacity-60"
                      style={{ color: "#C8C0B2", fontFamily: "var(--font-ui)", letterSpacing: "0.05em" }}
                    >
                      {entry.note}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BibliographySection() {
  const shouldReduce = useReducedMotion();

  return (
    <SectionWrapper id="bibliografia" bgColor="#0F0E0C" parallaxIntensity={20}>
      <div className="px-6 md:px-12 lg:px-24 py-24 md:py-40 max-w-4xl mx-auto">
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "#C9A84C", opacity: 0.7, fontFamily: "var(--font-ui)" }}
        >
          Fonti e studi
        </motion.p>

        <motion.h2
          initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-bold mb-3"
          style={{ color: "#F5EDD8" }}
        >
          Bibliografia
        </motion.h2>

        <motion.div
          initial={shouldReduce ? {} : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="h-px w-24 mb-12 origin-left"
          style={{ backgroundColor: "#C9A84C" }}
          aria-hidden
        />

        <div>
          {CATEGORIES.map((cat) => {
            const entries = bibliography.filter((b) => b.book === cat.key);
            if (entries.length === 0) return null;
            return (
              <AccordionItem
                key={cat.key}
                category={cat.key}
                label={cat.label}
                entries={entries}
              />
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-xs italic mt-12 opacity-40 leading-relaxed"
          style={{ color: "#C8C0B2" }}
        >
          Per A.S. Pease 1935 ad Aen. IV 625, verificare la princeps Harvard (ristampa Darmstadt 1967).
          I commenti di N. Horsfall (Brill, 2006–2008) restano insuperati per Realien e fonti.
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
