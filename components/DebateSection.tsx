"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { harvardSchool, europeanSchool, italianSynthesis } from "@/lib/content";
import type { Scholar } from "@/lib/content";

function ScholarCard({ scholar, index, accentColor }: { scholar: Scholar; index: number; accentColor: string }) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      viewport={{ once: true, margin: "-30px" }}
      className="py-4 border-b border-current/10"
    >
      <p className="font-display font-semibold text-sm" style={{ color: accentColor }}>
        {scholar.name}
      </p>
      <p className="text-sm italic opacity-75 mt-0.5">{scholar.work}</p>
      <p
        className="text-xs tracking-widest uppercase opacity-50 mt-0.5"
        style={{ fontFamily: "var(--font-ui)" }}
      >
        {scholar.year}
      </p>
      {scholar.quote && (
        <p className="text-xs italic opacity-70 mt-2 leading-relaxed border-l border-current/20 pl-3">
          {scholar.quote}
        </p>
      )}
    </motion.div>
  );
}

export default function DebateSection() {
  const shouldReduce = useReducedMotion();

  return (
    <SectionWrapper id="dibattito" bgColor="#F5EDD8" parallaxIntensity={30}>
      <div className="px-6 md:px-12 lg:px-24 py-24 md:py-40" style={{ color: "#1C1917" }}>
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-16">
          <motion.p
            initial={shouldReduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase mb-4 opacity-60"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Il dibattito critico
          </motion.p>
          <motion.h2
            initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold mb-4"
          >
            La «doppia voce»
          </motion.h2>
          <motion.p
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="max-w-3xl text-base md:text-lg leading-relaxed opacity-80"
          >
            La critica novecentesca si è divisa tra una lettura celebrativa del poema come monumento
            dell'ideologia augustea e una lettura pessimistica che coglie in esso una «voce privata del
            rimpianto». La sintesi italiana ha trovato una terza via: l'«integrazione difficile».
          </motion.p>
        </div>

        {/* Two columns: Harvard vs European */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mb-20">
          {/* Harvard School */}
          <div>
            <motion.h3
              initial={shouldReduce ? {} : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-lg font-display font-bold mb-6 pb-2 border-b-2"
              style={{ borderColor: "#7A1A1A" }}
            >
              <span style={{ color: "#7A1A1A" }}>Harvard School</span>
              <span className="block text-xs font-ui tracking-widest uppercase opacity-60 mt-1" style={{ fontFamily: "var(--font-ui)" }}>
                Lettura pessimistica
              </span>
            </motion.h3>
            {harvardSchool.map((s, i) => (
              <ScholarCard key={s.name} scholar={s} index={i} accentColor="#7A1A1A" />
            ))}
          </div>

          {/* European / Celebrative */}
          <div>
            <motion.h3
              initial={shouldReduce ? {} : { opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-lg font-display font-bold mb-6 pb-2 border-b-2"
              style={{ borderColor: "#8B6914" }}
            >
              <span style={{ color: "#8B6914" }}>Scuola europea</span>
              <span className="block text-xs font-ui tracking-widest uppercase opacity-60 mt-1" style={{ fontFamily: "var(--font-ui)" }}>
                Lettura celebrativa
              </span>
            </motion.h3>
            {europeanSchool.map((s, i) => (
              <ScholarCard key={s.name} scholar={s} index={i} accentColor="#8B6914" />
            ))}
          </div>
        </div>

        {/* Italian Synthesis */}
        <div className="max-w-5xl mx-auto">
          <motion.h3
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-lg font-display font-bold mb-6 pb-2 border-b-2"
            style={{ borderColor: "#2D4A2A" }}
          >
            <span style={{ color: "#2D4A2A" }}>Sintesi italiana</span>
            <span className="block text-xs font-ui tracking-widest uppercase opacity-60 mt-1" style={{ fontFamily: "var(--font-ui)" }}>
              L'«integrazione difficile»
            </span>
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {italianSynthesis.map((s, i) => (
              <ScholarCard key={s.name} scholar={s} index={i} accentColor="#2D4A2A" />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
