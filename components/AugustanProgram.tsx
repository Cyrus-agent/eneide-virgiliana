"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { augustanProgram } from "@/lib/content";

export default function AugustanProgram() {
  const shouldReduce = useReducedMotion();

  return (
    <SectionWrapper id="augusto" bgColor="#1C1400" parallaxIntensity={40}>
      <div className="px-6 md:px-12 lg:px-24 py-24 md:py-40 max-w-5xl mx-auto">
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "#C9A84C", opacity: 0.7, fontFamily: "var(--font-ui)" }}
        >
          Il contesto monumentale
        </motion.p>

        <motion.h2
          initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-bold mb-3"
          style={{ color: "#F5EDD8" }}
        >
          Il programma augusteo
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

        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-base md:text-lg leading-relaxed mb-16 max-w-3xl opacity-80"
          style={{ color: "#F5EDD8" }}
        >
          La storicizzazione virgiliana è isomorfa rispetto al lavoro plastico-architettonico di Augusto.
          Forum Augustum, Ara Pacis, monetazione e restauro templare compongono lo stesso lessico
          mitico-storico dell'Eneide (Galinsky 1996; Zanker 1987).
        </motion.p>

        {/* Monuments grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          {augustanProgram.map((monument, i) => (
            <motion.div
              key={monument.name}
              initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-40px" }}
              className="p-6 border border-current/10"
              style={{ borderColor: "rgba(201,168,76,0.2)" }}
            >
              <p
                className="text-xs tracking-[0.2em] uppercase mb-2"
                style={{ color: "#C9A84C", opacity: 0.7, fontFamily: "var(--font-ui)" }}
              >
                {monument.date}
              </p>
              <h3
                className="text-xl font-display font-semibold mb-3"
                style={{ color: "#C9A84C" }}
              >
                {monument.name}
              </h3>
              <p
                className="text-sm leading-relaxed mb-4 opacity-80"
                style={{ color: "#F5EDD8" }}
              >
                {monument.description}
              </p>
              <p
                className="text-xs italic opacity-60 border-l pl-3"
                style={{ color: "#C8C0B2", borderColor: "rgba(201,168,76,0.3)" }}
              >
                {monument.connection}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
