"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const receptions = [
  {
    author: "Servio",
    period: "IV–V sec. d.C.",
    title: "Commentario all'Eneide",
    body: "Inaugura la lettura «storicizzante» dell'Eneide: «intentio Vergili haec est, Homerum imitari et Augustum laudare a parentibus» (ad Aen. 1.1). Segnala la storicizzazione Priamo-Pompeo ad Aen. 2.557 e la dimensione allegorica di Didone.",
    accent: "#C9A84C",
  },
  {
    author: "Macrobio",
    period: "V sec.",
    title: "Saturnalia IV–VI",
    body: "Prima grande lettura intertestuale dell'Eneide: confronta Virgilio con Omero, Nevio, Ennio, Apollonio Rodio. È il fondamento di tutta la tradizione filologica fino a Heinze.",
    accent: "#C9A84C",
  },
  {
    author: "Orazio",
    period: "65–8 a.C.",
    title: "Odi I 37 · III 1-6 · Carmen Saeculare",
    body: "Condivide il programma celebrativo augusteo ma con maggiore esplicitezza panegirica. La sua «Cleopatra» (Odi I 37 «nunc est bibendum») è forse il modello mediato per la Didone virgiliana (Galinsky 2003).",
    accent: "#8B6914",
  },
  {
    author: "Properzio",
    period: "50–15 a.C. ca.",
    title: "Libro IV — Aitia romane",
    body: "La sua «integrazione difficile» (La Penna 1977) è simmetrica a quella di Virgilio. Il libro IV — tempio di Apollo Palatino (IV 6), Tarpeia (IV 4) — costruisce in versi elegiaci la stessa fondazione mitica augustea.",
    accent: "#8B6914",
  },
  {
    author: "Livio",
    period: "59 a.C. – 17 d.C.",
    title: "Ab Urbe Condita I–V",
    body: "Composto negli stessi anni dell'Eneide, costruisce in prosa la versione canonica dell'origo gentis. Prosa liviana e poesia virgiliana si specchiano (Wiseman, Clio's Cosmetics, 1979).",
    accent: "#8B6914",
  },
];

export default function ReceiptSection() {
  const shouldReduce = useReducedMotion();

  return (
    <SectionWrapper id="ricezione" bgColor="#0E1209" parallaxIntensity={35}>
      <div className="px-6 md:px-12 lg:px-24 py-24 md:py-40 max-w-5xl mx-auto">
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "#C9A84C", opacity: 0.7, fontFamily: "var(--font-ui)" }}
        >
          Ricezione e letteratura coeva
        </motion.p>

        <motion.h2
          initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-bold mb-3"
          style={{ color: "#F5EDD8" }}
        >
          Servio, Macrobio e i contemporanei
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

        <div className="space-y-8">
          {receptions.map((r, i) => (
            <motion.div
              key={r.author}
              initial={shouldReduce ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-30px" }}
              className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 pb-8 border-b"
              style={{ borderColor: "rgba(201,168,76,0.12)" }}
            >
              <div>
                <p className="font-display font-bold text-lg" style={{ color: r.accent }}>
                  {r.author}
                </p>
                <p
                  className="text-xs tracking-widest uppercase opacity-60 mt-1"
                  style={{ fontFamily: "var(--font-ui)", color: "#C8C0B2" }}
                >
                  {r.period}
                </p>
                <p className="text-sm italic mt-1 opacity-70" style={{ color: "#C8C0B2" }}>
                  {r.title}
                </p>
              </div>
              <p
                className="text-sm md:text-base leading-relaxed opacity-80"
                style={{ color: "#F5EDD8" }}
              >
                {r.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
