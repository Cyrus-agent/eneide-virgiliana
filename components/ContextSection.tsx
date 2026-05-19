"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import KeyFinding from "./KeyFinding";
import { tldr, keyFindings } from "@/lib/content";

const preVirgilianSources = [
  { name: "Stesicoro", note: "Iliupersis (fr.) — scena su Tabula Iliaca" },
  { name: "Nevio", note: "Bellum Poenicum (fine III a.C.) — probabile incontro Enea-Didone" },
  { name: "Ennio", note: "Annales (II a.C.) — saldatura Enea → Romolo" },
  { name: "Catone", note: "Origines (II a.C.) — Enea alleato di Latino contro Turno" },
  { name: "Varrone", note: "De gente populi Romani — fonte di eziologie virgiliane" },
  { name: "Dionigi di Alicarnasso", note: "Antiquitates Romanae I — raccolta sistematica delle varianti" },
  { name: "Livio", note: "Ab Urbe Condita I — versione prosastica canonica (contemporanea all'Eneide)" },
];

export default function ContextSection() {
  const shouldReduce = useReducedMotion();

  return (
    <SectionWrapper id="contesto" bgColor="#111009" parallaxIntensity={45}>
      <div className="px-6 md:px-12 lg:px-24 py-24 md:py-40 max-w-5xl mx-auto">

        {/* TL;DR */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] uppercase mb-6"
          style={{ color: "#C9A84C", opacity: 0.7, fontFamily: "var(--font-ui)" }}
        >
          Sintesi
        </motion.p>

        <motion.h2
          initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-bold mb-4"
          style={{ color: "#F5EDD8" }}
        >
          Contesto storico-ideologico
        </motion.h2>

        <motion.div
          initial={shouldReduce ? {} : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="h-px w-24 mb-10 origin-left"
          style={{ backgroundColor: "#C9A84C" }}
          aria-hidden
        />

        <div className="space-y-5 mb-16">
          {tldr.map((point, i) => (
            <motion.p
              key={i}
              initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-30px" }}
              className="text-base md:text-lg leading-relaxed max-w-3xl opacity-80"
              style={{ color: "#E8DCCA" }}
            >
              {point}
            </motion.p>
          ))}
        </div>

        {/* Historical context box */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 mb-20 border"
          style={{ borderColor: "rgba(201,168,76,0.2)", backgroundColor: "rgba(201,168,76,0.04)" }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-4 opacity-70"
            style={{ color: "#C9A84C", fontFamily: "var(--font-ui)" }}
          >
            29–19 a.C.
          </p>
          <p className="text-sm md:text-base leading-relaxed opacity-80" style={{ color: "#E8DCCA" }}>
            L'Eneide fu composta nei dieci anni successivi alla battaglia di Azio (settembre 31 a.C.),
            durante la stabilizzazione del principato. Augusto ottenne il titolo nel 27 a.C., quando Virgilio
            aveva già avviato la composizione. Il poema iniziò nel 29 a.C., subito dopo il completamento delle
            Georgiche, e fu interrotto dalla morte del poeta nel 19 a.C. a Brindisi. Fu pubblicato postumo,
            contro la volontà testamentaria di Virgilio, per ordine di Augusto e a cura di L. Vario Rufo e
            Plozio Tucca.
          </p>
        </motion.div>

        {/* Pre-Virgilian Sources */}
        <motion.h3
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-display font-semibold mb-6"
          style={{ color: "#C9A84C" }}
        >
          Le fonti pre-virgiliane della leggenda di Enea
        </motion.h3>

        <div className="grid sm:grid-cols-2 gap-3 mb-24">
          {preVirgilianSources.map((src, i) => (
            <motion.div
              key={src.name}
              initial={shouldReduce ? {} : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              viewport={{ once: true, margin: "-20px" }}
              className="flex gap-3 items-start py-3 border-b"
              style={{ borderColor: "rgba(201,168,76,0.12)" }}
            >
              <span className="shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: "#C9A84C" }} aria-hidden />
              <div>
                <span className="font-display font-semibold text-sm" style={{ color: "#C9A84C" }}>
                  {src.name}
                </span>
                <span className="text-sm opacity-70 ml-2" style={{ color: "#E8DCCA" }}>
                  — {src.note}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Findings */}
        <motion.h3
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-display font-semibold mb-2"
          style={{ color: "#C9A84C" }}
        >
          Nove risultati critici fondamentali
        </motion.h3>
        <motion.div
          initial={shouldReduce ? {} : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="h-px w-16 mb-8 origin-left"
          style={{ backgroundColor: "#C9A84C" }}
          aria-hidden
        />

        <div style={{ color: "#E8DCCA" }}>
          {keyFindings.map((finding, i) => (
            <KeyFinding key={finding.number} finding={finding} index={i} accentColor="#C9A84C" />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
