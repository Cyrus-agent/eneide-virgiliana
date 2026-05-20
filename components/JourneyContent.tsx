"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { Scroll } from "@react-three/drei";
import {
  meta,
  tldr,
  keyFindings,
  quotes,
  books,
  harvardSchool,
  europeanSchool,
  italianSynthesis,
  augustanProgram,
  bibliography,
} from "@/lib/content";

// ─── Scroll progress hook (no re-renders — uses MotionValue) ─────────────────
function useJourneyProgress() {
  const progress = useMotionValue(0);
  useEffect(() => {
    const handler = (e: Event) => {
      progress.set((e as CustomEvent<{ progress: number }>).detail.progress);
    };
    window.addEventListener("journeyScroll", handler);
    return () => window.removeEventListener("journeyScroll", handler);
  }, [progress]);
  return progress;
}

// ─── Shared constants ─────────────────────────────────────────────────────────
// With JOURNEY_PAGES=11: maxScroll = (11-1)*100vh = 1000vh
// scroll.offset = scrollY / 1000vh  →  t = topVh / 1000
const MAX_SCROLL_VH = 1000;

const FONT_DISPLAY = "var(--font-display)";
const FONT_BODY    = "var(--font-body)";
const FONT_UI      = "var(--font-ui)";

// ─── Animated panel wrapper ───────────────────────────────────────────────────
interface PaneProps {
  progress: ReturnType<typeof useJourneyProgress>;
  topVh: number;
  side: "left" | "right";
  accent: string;
  children: React.ReactNode;
  id?: string;
  shouldReduce: boolean;
}

function Pane({ progress, topVh, side, accent, children, id, shouldReduce }: PaneProps) {
  const t = topVh / MAX_SCROLL_VH;
  // Panel becomes fully visible 0.06 scroll units after its top position
  const enter = [t - 0.08, t + 0.03];

  const opacity = useTransform(progress, enter, [0, 1]);
  const x       = useTransform(progress, enter, shouldReduce ? [0, 0] : [side === "left" ? -55 : 55, 0]);
  const y       = useTransform(progress, enter, shouldReduce ? [0, 0] : [18, 0]);

  return (
    <motion.div
      id={id}
      style={{
        position: "absolute",
        top: `${topVh}vh`,
        [side === "left" ? "left" : "right"]: "clamp(8px, 3vw, 48px)",
        width: "clamp(290px, 44vw, 700px)",
        background: "rgba(10, 7, 6, 0.90)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderLeft: side === "left" ? `2px solid ${accent}65` : undefined,
        borderRight: side === "right" ? `2px solid ${accent}65` : undefined,
        padding: "clamp(1.2rem, 3vw, 2.4rem)",
        borderRadius: side === "left" ? "0 6px 6px 0" : "6px 0 0 6px",
        // Framer Motion drives these:
        opacity,
        x,
        y,
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ label, accent }: { label: string; accent: string }) {
  return (
    <p style={{
      fontFamily: FONT_UI,
      fontSize: "0.62rem",
      letterSpacing: "0.30em",
      textTransform: "uppercase" as const,
      color: accent,
      opacity: 0.7,
      marginBottom: "0.5rem",
    }}>
      {label}
    </p>
  );
}

function H2({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h2 style={{
      fontFamily: FONT_DISPLAY,
      fontSize: "clamp(1.35rem, 3vw, 2rem)",
      fontWeight: 700,
      color,
      marginBottom: "0.6rem",
      lineHeight: 1.1,
    }}>
      {children}
    </h2>
  );
}

function H3({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h3 style={{
      fontFamily: FONT_DISPLAY,
      fontSize: "clamp(0.88rem, 1.8vw, 1.1rem)",
      fontWeight: 600,
      color,
      marginBottom: "0.35rem",
      marginTop: "1.1rem",
    }}>
      {children}
    </h3>
  );
}

function Body({ children, color = "#C8C0B2" }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{
      fontFamily: FONT_BODY,
      fontSize: "clamp(0.80rem, 1.35vw, 0.94rem)",
      lineHeight: 1.72,
      color,
      opacity: 0.86,
      marginBottom: "0.75rem",
    }}>
      {children}
    </p>
  );
}

function GoldRule({ accent }: { accent: string }) {
  return (
    <div style={{
      height: "1px",
      background: `linear-gradient(to right, ${accent}55, transparent)`,
      margin: "0.9rem 0",
    }} />
  );
}

// Animated Latin quote with hover glow
function LatinQuote({ latin, translation, source, accent }: {
  latin: string; translation: string; source: string; accent: string;
}) {
  return (
    <motion.blockquote
      whileHover={{ x: 4, transition: { duration: 0.2, ease: "easeOut" } }}
      style={{
        borderLeft: `2px solid ${accent}80`,
        paddingLeft: "0.9rem",
        margin: "0.9rem 0",
        cursor: "default",
      }}
    >
      <p lang="la" style={{
        fontFamily: FONT_BODY,
        fontStyle: "italic",
        fontSize: "clamp(0.86rem, 1.5vw, 1.04rem)",
        color: accent,
        marginBottom: "0.25rem",
        whiteSpace: "pre-line" as const,
        textShadow: `0 0 24px ${accent}40`,
      }}>
        {latin}
      </p>
      <p style={{
        fontFamily: FONT_BODY,
        fontSize: "0.80rem",
        color: "#C8C0B2",
        opacity: 0.74,
        marginBottom: "0.15rem",
      }}>
        {translation}
      </p>
      <cite style={{
        fontFamily: FONT_UI,
        fontSize: "0.60rem",
        letterSpacing: "0.10em",
        color: accent,
        opacity: 0.48,
      }}>
        — {source}
      </cite>
    </motion.blockquote>
  );
}

// Key finding with animated number badge
function Finding({ number, title, body, citation, accent, textColor }: {
  number: number; title: string; body: string; citation?: string;
  accent: string; textColor: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 5, transition: { duration: 0.18, ease: "easeOut" } }}
      style={{ display: "flex", gap: "0.8rem", marginBottom: "0.85rem", alignItems: "flex-start", cursor: "default" }}
    >
      <span style={{
        fontFamily: FONT_UI,
        fontSize: "0.60rem",
        color: accent,
        opacity: 0.48,
        paddingTop: "0.18rem",
        minWidth: "1.4rem",
        letterSpacing: "0.05em",
      }}>
        {String(number).padStart(2, "0")}
      </span>
      <div>
        <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.80rem", color: "#F5EDD8", marginBottom: "0.18rem" }}>
          {title}
        </p>
        <p style={{ fontFamily: FONT_BODY, fontSize: "0.77rem", color: textColor, opacity: 0.74, lineHeight: 1.55 }}>
          {body}
        </p>
        {citation && (
          <p style={{ fontFamily: FONT_UI, fontSize: "0.60rem", color: accent, opacity: 0.40, marginTop: "0.15rem" }}>
            {citation}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// Monument image with scale-hover
function SceneImage({ src, alt, accent }: { src: string; alt: string; accent: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, transition: { duration: 0.35, ease: "easeOut" } }}
      style={{
        position: "relative" as const,
        width: "100%",
        height: "clamp(130px, 20vw, 240px)",
        marginBottom: "1.1rem",
        overflow: "hidden",
        borderRadius: "3px",
        cursor: "default",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.62 }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(to bottom, transparent 45%, rgba(10,7,6,0.92) 100%)`,
      }} />
      <p style={{
        position: "absolute", bottom: "0.5rem", right: "0.7rem",
        fontFamily: FONT_UI, fontSize: "0.56rem", letterSpacing: "0.06em",
        color: accent, opacity: 0.52, fontStyle: "italic",
      }}>
        {alt}
      </p>
    </motion.div>
  );
}

// Scholar card with hover lift
function ScholarCard({ name, work, year, quote, accent }: {
  name: string; work: string; year: string; quote?: string; accent: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.18, ease: "easeOut" } }}
      style={{ marginBottom: "0.55rem", cursor: "default" }}
    >
      <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.78rem", color: "#F5EDD8" }}>{name}</p>
      <p style={{ fontFamily: FONT_BODY, fontStyle: "italic", fontSize: "0.68rem", color: "#C8C0B2", opacity: 0.62 }}>
        {work}, {year}
      </p>
      {quote && (
        <p style={{ fontFamily: FONT_BODY, fontStyle: "italic", fontSize: "0.68rem", color: accent, opacity: 0.80, marginTop: "0.15rem" }}>
          {quote}
        </p>
      )}
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function JourneyContent() {
  const progress  = useJourneyProgress();
  const shouldReduce = useReducedMotion() ?? false;

  const bookMap   = Object.fromEntries(books.map((b) => [b.variant, b]));
  const b1 = bookMap["I"];
  const b2 = bookMap["II"];
  const b3 = bookMap["III"];
  const b4 = bookMap["IV"];

  const quotesI  = quotes.filter((q) => q.book === "I");
  const quotesII = quotes.filter((q) => q.book === "II");
  const quotesIV = quotes.filter((q) => q.book === "IV");

  // Stagger variants for list items
  const stagger = {
    container: { transition: { staggerChildren: 0.07 } },
    item:      { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } },
  };

  return (
    <Scroll html>

      {/* ── HERO TITLE — visible during aerial phase ─── */}
      <motion.div
        id="hero"
        initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: "28vh",
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 1rem",
          pointerEvents: "none",
        }}
      >
        <p lang="la" style={{
          fontFamily: FONT_UI,
          fontSize: "clamp(0.55rem, 1.1vw, 0.70rem)",
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "#C9A84C",
          opacity: 0.78,
          marginBottom: "1.2rem",
        }}>
          Arma virumque cano · Aen. I 1
        </p>

        <h1 style={{
          fontFamily: FONT_DISPLAY,
          fontSize: "clamp(1.7rem, 5vw, 3.8rem)",
          fontWeight: 900,
          color: "#F5EDD8",
          textShadow: "0 2px 60px rgba(201,168,76,0.35), 0 0 120px rgba(201,168,76,0.12)",
          lineHeight: 1.05,
          marginBottom: "0.9rem",
        }}>
          {meta.title}
        </h1>

        <p style={{
          fontFamily: FONT_BODY,
          fontStyle: "italic",
          fontSize: "clamp(0.85rem, 1.7vw, 1.15rem)",
          color: "#C8C0B2",
        }}>
          {meta.subtitle}
        </p>

        <p style={{
          fontFamily: FONT_UI,
          fontSize: "0.60rem",
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "#C9A84C",
          opacity: 0.52,
          marginTop: "0.7rem",
        }}>
          {meta.author}
        </p>

        {/* Animated scroll hint */}
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          style={{ marginTop: "2.8rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}
        >
          <p style={{
            fontFamily: FONT_UI, fontSize: "0.58rem", letterSpacing: "0.30em",
            textTransform: "uppercase", color: "#C9A84C", opacity: 0.44,
          }}>
            Scorri per esplorare
          </p>
          <div style={{
            width: "1px", height: "44px",
            background: "linear-gradient(to bottom, rgba(201,168,76,0.55), transparent)",
          }} />
        </motion.div>
      </motion.div>

      {/* ── CONTESTO STORICO ─────────────────── top 400vh → t≈0.40 ── */}
      <Pane progress={progress} topVh={400} side="left" accent="#C9A84C" id="contesto" shouldReduce={shouldReduce}>
        <SectionLabel label="Contesto storico · 29–19 a.C." accent="#C9A84C" />
        <H2 color="#F5EDD8">La storicizzazione virgiliana</H2>
        <GoldRule accent="#C9A84C" />
        {tldr.map((t, i) => <Body key={i}>{t}</Body>)}
        <GoldRule accent="#C9A84C" />
        <p style={{ fontFamily: FONT_UI, fontSize: "0.60rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A84C", opacity: 0.58, marginBottom: "0.55rem" }}>
          Risultati chiave
        </p>
        {keyFindings.slice(0, 4).map((kf) => (
          <Finding key={kf.number} {...kf} accent="#C9A84C" textColor="#C8C0B2" />
        ))}
      </Pane>

      {/* ── LIBRO I ──────────────────────────── top 490vh → t≈0.49 ── */}
      <Pane progress={progress} topVh={490} side="right" accent={b1.accent} id="libro-i" shouldReduce={shouldReduce}>
        <SceneImage src="/images/book1-juno-temple.jpg" alt="Tempio di Giunone a Cartagine · Aen. I 441" accent={b1.accent} />
        <SectionLabel label={b1.title} accent={b1.accent} />
        <H2 color="#F5EDD8">{b1.subtitle}</H2>
        <GoldRule accent={b1.accent} />
        <Body color={b1.textColor}>{b1.intro}</Body>
        {b1.subsections.map((sub) => (
          <div key={sub.title}>
            <H3 color={b1.accent}>{sub.title}</H3>
            <Body color={b1.textColor}>{sub.body}</Body>
          </div>
        ))}
        {quotesI.map((q) => <LatinQuote key={q.source} {...q} accent={b1.accent} />)}
      </Pane>

      {/* ── LIBRO II ─────────────────────────── top 580vh → t≈0.58 ── */}
      <Pane progress={progress} topVh={580} side="left" accent={b2.accent} id="libro-ii" shouldReduce={shouldReduce}>
        <SceneImage src="/images/book2-fall-of-troy.jpg" alt="Caduta di Troia in fiamme · Aen. II" accent={b2.accent} />
        <SectionLabel label={b2.title} accent={b2.accent} />
        <H2 color="#F5EDD8">{b2.subtitle}</H2>
        <GoldRule accent={b2.accent} />
        <Body color={b2.textColor}>{b2.intro}</Body>
        {b2.subsections.map((sub) => (
          <div key={sub.title}>
            <H3 color={b2.accent}>{sub.title}</H3>
            <Body color={b2.textColor}>{sub.body}</Body>
          </div>
        ))}
        {quotesII.map((q) => <LatinQuote key={q.source} {...q} accent={b2.accent} />)}
        <GoldRule accent={b2.accent} />
        <Finding {...keyFindings[2]} accent={b2.accent} textColor={b2.textColor} />
      </Pane>

      {/* ── LIBRO III ────────────────────────── top 665vh → t≈0.665 ── */}
      <Pane progress={progress} topVh={665} side="right" accent={b3.accent} id="libro-iii" shouldReduce={shouldReduce}>
        <SceneImage src="/images/book3-fleet-mediterranean.jpg" alt="Flotta troiana nel Mediterraneo · Aen. III" accent={b3.accent} />
        <SectionLabel label={b3.title} accent={b3.accent} />
        <H2 color="#F5EDD8">{b3.subtitle}</H2>
        <GoldRule accent={b3.accent} />
        <Body color={b3.textColor}>{b3.intro}</Body>
        {b3.subsections.map((sub) => (
          <div key={sub.title}>
            <H3 color={b3.accent}>{sub.title}</H3>
            <Body color={b3.textColor}>{sub.body}</Body>
          </div>
        ))}
        <GoldRule accent={b3.accent} />
        <Finding {...keyFindings[3]} accent={b3.accent} textColor={b3.textColor} />
      </Pane>

      {/* ── LIBRO IV ─────────────────────────── top 750vh → t≈0.75 ── */}
      <Pane progress={progress} topVh={750} side="left" accent={b4.accent} id="libro-iv" shouldReduce={shouldReduce}>
        <SceneImage src="/images/book4-dido-pyre.jpg" alt="Didone sul rogo · Aen. IV" accent={b4.accent} />
        <SectionLabel label={b4.title} accent={b4.accent} />
        <H2 color="#F5EDD8">{b4.subtitle}</H2>
        <GoldRule accent={b4.accent} />
        <Body color={b4.textColor}>{b4.intro}</Body>
        {b4.subsections.map((sub) => (
          <div key={sub.title}>
            <H3 color={b4.accent}>{sub.title}</H3>
            <Body color={b4.textColor}>{sub.body}</Body>
          </div>
        ))}
        {quotesIV.map((q) => <LatinQuote key={q.source} {...q} accent={b4.accent} />)}
        <GoldRule accent={b4.accent} />
        {keyFindings.slice(4, 6).map((kf) => (
          <Finding key={kf.number} {...kf} accent={b4.accent} textColor={b4.textColor} />
        ))}
      </Pane>

      {/* ── DIBATTITO ────────────────────────── top 835vh → t≈0.835 ── */}
      <Pane progress={progress} topVh={835} side="right" accent="#C9A84C" id="dibattito" shouldReduce={shouldReduce}>
        <SectionLabel label="Il dibattito critico" accent="#C9A84C" />
        <H2 color="#F5EDD8">Harvard School vs Scuola Italiana</H2>
        <GoldRule accent="#C9A84C" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.8rem" }}>
          <div>
            <p style={{ fontFamily: FONT_UI, fontSize: "0.58rem", letterSpacing: "0.20em", textTransform: "uppercase", color: "#A03030", opacity: 0.75, marginBottom: "0.4rem" }}>
              Harvard School
            </p>
            {harvardSchool.map((s) => (
              <ScholarCard key={s.name} {...s} accent="#A03030" />
            ))}
          </div>
          <div>
            <p style={{ fontFamily: FONT_UI, fontSize: "0.58rem", letterSpacing: "0.20em", textTransform: "uppercase", color: "#C9A84C", opacity: 0.75, marginBottom: "0.4rem" }}>
              Scuola Europea
            </p>
            {europeanSchool.map((s) => (
              <ScholarCard key={s.name} {...s} accent="#C9A84C" />
            ))}
          </div>
        </div>

        <GoldRule accent="#6B9A6A" />
        <p style={{ fontFamily: FONT_UI, fontSize: "0.58rem", letterSpacing: "0.20em", textTransform: "uppercase", color: "#6B9A6A", opacity: 0.75, marginBottom: "0.4rem" }}>
          Sintesi italiana
        </p>
        {italianSynthesis.map((s) => (
          <ScholarCard key={s.name} {...s} accent="#6B9A6A" />
        ))}

        <GoldRule accent="#C9A84C" />
        {keyFindings.slice(6, 9).map((kf) => (
          <Finding key={kf.number} {...kf} accent="#C9A84C" textColor="#C8C0B2" />
        ))}
      </Pane>

      {/* ── PROGRAMMA AUGUSTEO ──────────────── top 900vh → t≈0.90 ── */}
      <Pane progress={progress} topVh={900} side="left" accent="#C9A84C" id="augusto" shouldReduce={shouldReduce}>
        <SceneImage src="/images/augustan-forum.jpg" alt="Forum Augustum — Tempio di Marte Ultore" accent="#C9A84C" />
        <SectionLabel label="Il programma culturale augusteo" accent="#C9A84C" />
        <H2 color="#F5EDD8">Marmo e mito: l&apos;Eneide in pietra</H2>
        <GoldRule accent="#C9A84C" />
        {augustanProgram.map((m) => (
          <motion.div
            key={m.name}
            whileHover={{ x: 4, transition: { duration: 0.18, ease: "easeOut" } }}
            style={{ marginBottom: "0.9rem", paddingLeft: "0.75rem", borderLeft: "1px solid rgba(201,168,76,0.28)", cursor: "default" }}
          >
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.88rem", fontWeight: 700, color: "#C9A84C", marginBottom: "0.08rem" }}>{m.name}</p>
            <p style={{ fontFamily: FONT_UI, fontSize: "0.57rem", letterSpacing: "0.12em", color: "#C9A84C", opacity: 0.45, marginBottom: "0.25rem" }}>{m.date}</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "#E8DCCA", opacity: 0.80, lineHeight: 1.58, marginBottom: "0.15rem" }}>{m.description}</p>
            <p style={{ fontFamily: FONT_BODY, fontStyle: "italic", fontSize: "0.72rem", color: "#C9A84C", opacity: 0.60 }}>↔ {m.connection}</p>
          </motion.div>
        ))}
      </Pane>

      {/* ── BIBLIOGRAFIA ─────────────────────── top 960vh → t≈0.96 ── */}
      <Pane progress={progress} topVh={960} side="right" accent="#6B5A2A" id="biblio" shouldReduce={shouldReduce}>
        <SectionLabel label="Bibliografia essenziale" accent="#C9A84C" />
        <H2 color="#F5EDD8">Fonti e strumenti critici</H2>
        <GoldRule accent="#6B5A2A" />
        {(["generale", "I", "II", "III", "IV"] as const).map((cat) => {
          const entries = bibliography.filter((b) => b.book === cat);
          if (!entries.length) return null;
          return (
            <div key={cat} style={{ marginBottom: "0.85rem" }}>
              <p style={{ fontFamily: FONT_UI, fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A84C", opacity: 0.50, marginBottom: "0.35rem" }}>
                {cat === "generale" ? "Testi di riferimento" : `Libro ${cat}`}
              </p>
              {entries.map((e, i) => (
                <p key={i} style={{ fontFamily: FONT_BODY, fontStyle: "italic", fontSize: "0.74rem", color: "#C8C0B2", opacity: 0.70, lineHeight: 1.5, marginBottom: "0.22rem", paddingLeft: "0.7rem" }}>
                  {e.author}, <span style={{ fontStyle: "normal" }}>{e.title}</span>, {e.publisher}, {e.year}
                  {e.note && <span style={{ color: "#C9A84C", opacity: 0.55 }}> — {e.note}</span>}
                </p>
              ))}
            </div>
          );
        })}
        <GoldRule accent="#C9A84C" />
        <div style={{ textAlign: "center", paddingTop: "0.8rem" }}>
          <p lang="la" style={{ fontFamily: FONT_UI, fontSize: "0.60rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C9A84C", opacity: 0.38 }}>
            Finis · Publius Vergilius Maro
          </p>
        </div>
      </Pane>

    </Scroll>
  );
}
