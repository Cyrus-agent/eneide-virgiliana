"use client";

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

// ─── Shared styles ────────────────────────────────────────────────────────────

const FONT_DISPLAY = "var(--font-display)";
const FONT_BODY    = "var(--font-body)";
const FONT_UI      = "var(--font-ui)";

function panelStyle(
  side: "left" | "right",
  accent: string,
  topVh: number
): React.CSSProperties {
  return {
    position: "absolute",
    top: `${topVh}vh`,
    [side === "left" ? "left" : "right"]: "clamp(8px, 3vw, 48px)",
    width: "clamp(290px, 44vw, 700px)",
    background: "rgba(13, 9, 7, 0.88)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderLeft: side === "left" ? `2px solid ${accent}70` : undefined,
    borderRight: side === "right" ? `2px solid ${accent}70` : undefined,
    padding: "clamp(1.2rem, 3vw, 2.4rem)",
    borderRadius: side === "left" ? "0 4px 4px 0" : "4px 0 0 4px",
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ label, accent }: { label: string; accent: string }) {
  return (
    <p
      style={{
        fontFamily: FONT_UI,
        fontSize: "0.65rem",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: accent,
        opacity: 0.7,
        marginBottom: "0.5rem",
      }}
    >
      {label}
    </p>
  );
}

function Heading2({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h2
      style={{
        fontFamily: FONT_DISPLAY,
        fontSize: "clamp(1.4rem, 3vw, 2rem)",
        fontWeight: 700,
        color,
        marginBottom: "0.8rem",
        lineHeight: 1.1,
      }}
    >
      {children}
    </h2>
  );
}

function Heading3({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h3
      style={{
        fontFamily: FONT_DISPLAY,
        fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
        fontWeight: 600,
        color,
        marginBottom: "0.4rem",
        marginTop: "1.2rem",
      }}
    >
      {children}
    </h3>
  );
}

function BodyText({ children, color = "#C8C0B2" }: { children: React.ReactNode; color?: string }) {
  return (
    <p
      style={{
        fontFamily: FONT_BODY,
        fontSize: "clamp(0.82rem, 1.4vw, 0.96rem)",
        lineHeight: 1.7,
        color,
        opacity: 0.85,
        marginBottom: "0.8rem",
      }}
    >
      {children}
    </p>
  );
}

function Divider({ accent }: { accent: string }) {
  return (
    <div
      style={{
        height: "1px",
        background: `linear-gradient(to right, ${accent}50, transparent)`,
        margin: "1rem 0",
      }}
    />
  );
}

function LatinQuote({
  latin,
  translation,
  source,
  accent,
}: {
  latin: string;
  translation: string;
  source: string;
  accent: string;
}) {
  return (
    <blockquote
      style={{
        borderLeft: `2px solid ${accent}90`,
        paddingLeft: "1rem",
        margin: "1rem 0",
      }}
    >
      <p
        lang="la"
        style={{
          fontFamily: FONT_BODY,
          fontStyle: "italic",
          fontSize: "clamp(0.88rem, 1.5vw, 1.05rem)",
          color: accent,
          marginBottom: "0.3rem",
          whiteSpace: "pre-line",
        }}
      >
        {latin}
      </p>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)",
          color: "#C8C0B2",
          opacity: 0.75,
          marginBottom: "0.2rem",
        }}
      >
        {translation}
      </p>
      <cite
        style={{
          fontFamily: FONT_UI,
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          color: accent,
          opacity: 0.5,
        }}
      >
        — {source}
      </cite>
    </blockquote>
  );
}

function MonumentImage({ src, alt, accent }: { src: string; alt: string; accent: string }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(140px, 22vw, 260px)",
        marginBottom: "1.2rem",
        overflow: "hidden",
        borderRadius: "2px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          opacity: 0.65,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, transparent 50%, rgba(13,9,7,0.9) 100%)`,
        }}
      />
      <p
        style={{
          position: "absolute",
          bottom: "0.5rem",
          right: "0.75rem",
          fontFamily: FONT_UI,
          fontSize: "0.58rem",
          letterSpacing: "0.06em",
          color: accent,
          opacity: 0.55,
          fontStyle: "italic",
        }}
      >
        {alt}
      </p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function JourneyContent() {
  const bookMap = Object.fromEntries(books.map((b) => [b.variant, b]));
  const b1 = bookMap["I"];
  const b2 = bookMap["II"];
  const b3 = bookMap["III"];
  const b4 = bookMap["IV"];

  const quotesI  = quotes.filter((q) => q.book === "I");
  const quotesII = quotes.filter((q) => q.book === "II");
  const quotesIV = quotes.filter((q) => q.book === "IV");

  return (
    <Scroll html>

      {/* ── HERO OVERLAY ─────────────────────────────────────── */}
      <div
        id="hero"
        style={{
          position: "absolute",
          top: "30vh",
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 1rem",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontFamily: FONT_UI,
            fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#C9A84C",
            opacity: 0.8,
            marginBottom: "1.2rem",
          }}
          lang="la"
        >
          Arma virumque cano · Aen. I 1
        </p>
        <h1
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(1.8rem, 5vw, 4rem)",
            fontWeight: 900,
            color: "#F5EDD8",
            textShadow: "0 2px 60px rgba(201,168,76,0.3), 0 0 120px rgba(201,168,76,0.1)",
            lineHeight: 1.05,
            marginBottom: "1rem",
          }}
        >
          {meta.title}
        </h1>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontStyle: "italic",
            fontSize: "clamp(0.9rem, 1.8vw, 1.2rem)",
            color: "#C8C0B2",
          }}
        >
          {meta.subtitle}
        </p>
        <p
          style={{
            fontFamily: FONT_UI,
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C9A84C",
            opacity: 0.55,
            marginTop: "0.8rem",
          }}
        >
          {meta.author}
        </p>

        {/* Scroll hint */}
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <p
            style={{
              fontFamily: FONT_UI,
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A84C",
              opacity: 0.5,
            }}
          >
            Scorri per esplorare
          </p>
          <div
            style={{
              width: "1px",
              height: "48px",
              background: "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)",
            }}
          />
        </div>
      </div>

      {/* ── CONTEXT ──────────────────────────────────────────── */}
      <div id="contesto" style={panelStyle("left", "#C9A84C", 290)}>
        <SectionLabel label="Contesto storico · 29–19 a.C." accent="#C9A84C" />
        <Heading2 color="#F5EDD8">La storicizzazione virgiliana</Heading2>
        <Divider accent="#C9A84C" />
        {tldr.map((t, i) => (
          <BodyText key={i}>{t}</BodyText>
        ))}
        <Divider accent="#C9A84C" />
        <p
          style={{
            fontFamily: FONT_UI,
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C9A84C",
            opacity: 0.6,
            marginBottom: "0.6rem",
          }}
        >
          9 Risultati chiave
        </p>
        {keyFindings.slice(0, 4).map((kf) => (
          <div
            key={kf.number}
            style={{
              display: "flex",
              gap: "0.8rem",
              marginBottom: "0.8rem",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontFamily: FONT_UI,
                fontSize: "0.65rem",
                color: "#C9A84C",
                opacity: 0.5,
                paddingTop: "0.15rem",
                minWidth: "1.5rem",
              }}
            >
              {String(kf.number).padStart(2, "0")}
            </span>
            <div>
              <p
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "0.8rem",
                  color: "#F5EDD8",
                  marginBottom: "0.2rem",
                }}
              >
                {kf.title}
              </p>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "0.78rem",
                  color: "#C8C0B2",
                  opacity: 0.75,
                  lineHeight: 1.5,
                }}
              >
                {kf.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── LIBRO I ──────────────────────────────────────────── */}
      <div id="libro-i" style={panelStyle("right", b1.accent, 430)}>
        <MonumentImage
          src="/images/book1-juno-temple.jpg"
          alt="Tempio di Giunone a Cartagine · Aen. I 441"
          accent={b1.accent}
        />
        <SectionLabel label={b1.title} accent={b1.accent} />
        <Heading2 color="#F5EDD8">{b1.subtitle}</Heading2>
        <Divider accent={b1.accent} />
        <BodyText color={b1.textColor}>{b1.intro}</BodyText>
        {b1.subsections.map((sub) => (
          <div key={sub.title}>
            <Heading3 color={b1.accent}>{sub.title}</Heading3>
            <BodyText color={b1.textColor}>{sub.body}</BodyText>
          </div>
        ))}
        {quotesI.map((q) => (
          <LatinQuote key={q.source} {...q} accent={b1.accent} />
        ))}
      </div>

      {/* ── LIBRO II ─────────────────────────────────────────── */}
      <div id="libro-ii" style={panelStyle("left", b2.accent, 565)}>
        <MonumentImage
          src="/images/book2-fall-of-troy.jpg"
          alt="Caduta di Troia in fiamme · Aen. II"
          accent={b2.accent}
        />
        <SectionLabel label={b2.title} accent={b2.accent} />
        <Heading2 color="#F5EDD8">{b2.subtitle}</Heading2>
        <Divider accent={b2.accent} />
        <BodyText color={b2.textColor}>{b2.intro}</BodyText>
        {b2.subsections.map((sub) => (
          <div key={sub.title}>
            <Heading3 color={b2.accent}>{sub.title}</Heading3>
            <BodyText color={b2.textColor}>{sub.body}</BodyText>
          </div>
        ))}
        {quotesII.map((q) => (
          <LatinQuote key={q.source} {...q} accent={b2.accent} />
        ))}
        {/* Remaining key findings 3 */}
        <Divider accent={b2.accent} />
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
          <span style={{ fontFamily: FONT_UI, fontSize: "0.65rem", color: b2.accent, opacity: 0.5, minWidth: "1.5rem" }}>03</span>
          <div>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.8rem", color: "#F5EDD8", marginBottom: "0.2rem" }}>
              {keyFindings[2].title}
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: b2.textColor, opacity: 0.75, lineHeight: 1.5 }}>
              {keyFindings[2].body}
            </p>
          </div>
        </div>
      </div>

      {/* ── LIBRO III ────────────────────────────────────────── */}
      <div id="libro-iii" style={panelStyle("right", b3.accent, 690)}>
        <MonumentImage
          src="/images/book3-fleet-mediterranean.jpg"
          alt="Flotta troiana nel Mediterraneo · Aen. III"
          accent={b3.accent}
        />
        <SectionLabel label={b3.title} accent={b3.accent} />
        <Heading2 color="#F5EDD8">{b3.subtitle}</Heading2>
        <Divider accent={b3.accent} />
        <BodyText color={b3.textColor}>{b3.intro}</BodyText>
        {b3.subsections.map((sub) => (
          <div key={sub.title}>
            <Heading3 color={b3.accent}>{sub.title}</Heading3>
            <BodyText color={b3.textColor}>{sub.body}</BodyText>
          </div>
        ))}
        <Divider accent={b3.accent} />
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
          <span style={{ fontFamily: FONT_UI, fontSize: "0.65rem", color: b3.accent, opacity: 0.5, minWidth: "1.5rem" }}>04</span>
          <div>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.8rem", color: "#F5EDD8", marginBottom: "0.2rem" }}>
              {keyFindings[3].title}
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: b3.textColor, opacity: 0.75, lineHeight: 1.5 }}>
              {keyFindings[3].body}
            </p>
          </div>
        </div>
      </div>

      {/* ── LIBRO IV ─────────────────────────────────────────── */}
      <div id="libro-iv" style={panelStyle("left", b4.accent, 810)}>
        <MonumentImage
          src="/images/book4-dido-pyre.jpg"
          alt="Didone sul rogo · Aen. IV"
          accent={b4.accent}
        />
        <SectionLabel label={b4.title} accent={b4.accent} />
        <Heading2 color="#F5EDD8">{b4.subtitle}</Heading2>
        <Divider accent={b4.accent} />
        <BodyText color={b4.textColor}>{b4.intro}</BodyText>
        {b4.subsections.map((sub) => (
          <div key={sub.title}>
            <Heading3 color={b4.accent}>{sub.title}</Heading3>
            <BodyText color={b4.textColor}>{sub.body}</BodyText>
          </div>
        ))}
        {quotesIV.map((q) => (
          <LatinQuote key={q.source} {...q} accent={b4.accent} />
        ))}
        <Divider accent={b4.accent} />
        {keyFindings.slice(4, 6).map((kf) => (
          <div key={kf.number} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start", marginBottom: "0.8rem" }}>
            <span style={{ fontFamily: FONT_UI, fontSize: "0.65rem", color: b4.accent, opacity: 0.5, minWidth: "1.5rem" }}>
              {String(kf.number).padStart(2, "0")}
            </span>
            <div>
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.8rem", color: "#F5EDD8", marginBottom: "0.2rem" }}>{kf.title}</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: b4.textColor, opacity: 0.75, lineHeight: 1.5 }}>{kf.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── DIBATTITO ────────────────────────────────────────── */}
      <div id="dibattito" style={panelStyle("right", "#C8C0B2", 935)}>
        <SectionLabel label="Il dibattito critico" accent="#C9A84C" />
        <Heading2 color="#F5EDD8">Harvard School vs Scuola Italiana</Heading2>
        <Divider accent="#C9A84C" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          {/* Harvard / pessimistic */}
          <div>
            <p style={{ fontFamily: FONT_UI, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A03030", opacity: 0.8, marginBottom: "0.5rem" }}>
              Harvard School
            </p>
            {harvardSchool.map((s) => (
              <div key={s.name} style={{ marginBottom: "0.6rem" }}>
                <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.78rem", color: "#F5EDD8" }}>{s.name}</p>
                <p style={{ fontFamily: FONT_BODY, fontStyle: "italic", fontSize: "0.7rem", color: "#C8C0B2", opacity: 0.65 }}>
                  {s.work}, {s.year}
                </p>
                {s.quote && (
                  <p style={{ fontFamily: FONT_BODY, fontStyle: "italic", fontSize: "0.7rem", color: "#A03030", opacity: 0.85, marginTop: "0.2rem" }}>
                    {s.quote}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* European / celebrative */}
          <div>
            <p style={{ fontFamily: FONT_UI, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", opacity: 0.8, marginBottom: "0.5rem" }}>
              Scuola Europea
            </p>
            {europeanSchool.map((s) => (
              <div key={s.name} style={{ marginBottom: "0.6rem" }}>
                <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.78rem", color: "#F5EDD8" }}>{s.name}</p>
                <p style={{ fontFamily: FONT_BODY, fontStyle: "italic", fontSize: "0.7rem", color: "#C8C0B2", opacity: 0.65 }}>
                  {s.work}, {s.year}
                </p>
                {s.quote && (
                  <p style={{ fontFamily: FONT_BODY, fontStyle: "italic", fontSize: "0.7rem", color: "#C9A84C", opacity: 0.85, marginTop: "0.2rem" }}>
                    {s.quote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <Divider accent="#C9A84C" />
        <p style={{ fontFamily: FONT_UI, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B9A6A", opacity: 0.8, marginBottom: "0.5rem" }}>
          Sintesi italiana
        </p>
        {italianSynthesis.map((s) => (
          <div key={s.name} style={{ marginBottom: "0.6rem" }}>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.78rem", color: "#F5EDD8" }}>{s.name}</p>
            <p style={{ fontFamily: FONT_BODY, fontStyle: "italic", fontSize: "0.7rem", color: "#C8C0B2", opacity: 0.65 }}>
              {s.work}, {s.year}
            </p>
            {s.quote && (
              <p style={{ fontFamily: FONT_BODY, fontStyle: "italic", fontSize: "0.7rem", color: "#6B9A6A", opacity: 0.85, marginTop: "0.2rem" }}>
                {s.quote}
              </p>
            )}
          </div>
        ))}
        <Divider accent="#C9A84C" />
        {keyFindings.slice(6, 9).map((kf) => (
          <div key={kf.number} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start", marginBottom: "0.8rem" }}>
            <span style={{ fontFamily: FONT_UI, fontSize: "0.65rem", color: "#C9A84C", opacity: 0.5, minWidth: "1.5rem" }}>
              {String(kf.number).padStart(2, "0")}
            </span>
            <div>
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.8rem", color: "#F5EDD8", marginBottom: "0.2rem" }}>{kf.title}</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "#C8C0B2", opacity: 0.75, lineHeight: 1.5 }}>{kf.body}</p>
              {kf.citation && (
                <p style={{ fontFamily: FONT_UI, fontSize: "0.65rem", color: "#C9A84C", opacity: 0.45, marginTop: "0.2rem" }}>{kf.citation}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── PROGRAMMA AUGUSTEO ───────────────────────────────── */}
      <div id="augusto" style={panelStyle("left", "#C9A84C", 1020)}>
        <MonumentImage
          src="/images/augustan-forum.jpg"
          alt="Forum Augustum — Tempio di Marte Ultore"
          accent="#C9A84C"
        />
        <SectionLabel label="Il programma culturale augusteo" accent="#C9A84C" />
        <Heading2 color="#F5EDD8">Marmo e mito: l'Eneide in pietra</Heading2>
        <Divider accent="#C9A84C" />
        {augustanProgram.map((monument) => (
          <div
            key={monument.name}
            style={{
              marginBottom: "1rem",
              paddingLeft: "0.8rem",
              borderLeft: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.9rem", fontWeight: 700, color: "#C9A84C", marginBottom: "0.1rem" }}>
              {monument.name}
            </p>
            <p style={{ fontFamily: FONT_UI, fontSize: "0.6rem", letterSpacing: "0.12em", color: "#C9A84C", opacity: 0.5, marginBottom: "0.3rem" }}>
              {monument.date}
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "#E8DCCA", opacity: 0.82, lineHeight: 1.6, marginBottom: "0.2rem" }}>
              {monument.description}
            </p>
            <p style={{ fontFamily: FONT_BODY, fontStyle: "italic", fontSize: "0.75rem", color: "#C9A84C", opacity: 0.65 }}>
              ↔ {monument.connection}
            </p>
          </div>
        ))}
      </div>

      {/* ── BIBLIOGRAFIA ─────────────────────────────────────── */}
      <div id="biblio" style={panelStyle("right", "#6B5A2A", 1085)}>
        <SectionLabel label="Bibliografia essenziale" accent="#C9A84C" />
        <Heading2 color="#F5EDD8">Fonti e strumenti critici</Heading2>
        <Divider accent="#6B5A2A" />
        {(["generale", "I", "II", "III", "IV"] as const).map((cat) => {
          const entries = bibliography.filter((b) => b.book === cat);
          if (!entries.length) return null;
          return (
            <div key={cat} style={{ marginBottom: "1rem" }}>
              <p style={{ fontFamily: FONT_UI, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A84C", opacity: 0.55, marginBottom: "0.4rem" }}>
                {cat === "generale" ? "Testi di riferimento" : `Libro ${cat}`}
              </p>
              {entries.map((e, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: FONT_BODY,
                    fontStyle: "italic",
                    fontSize: "0.76rem",
                    color: "#C8C0B2",
                    opacity: 0.72,
                    lineHeight: 1.5,
                    marginBottom: "0.25rem",
                    paddingLeft: "0.8rem",
                  }}
                >
                  {e.author}, <span style={{ fontStyle: "normal" }}>{e.title}</span>, {e.publisher}, {e.year}
                  {e.note && (
                    <span style={{ color: "#C9A84C", opacity: 0.6 }}> — {e.note}</span>
                  )}
                </p>
              ))}
            </div>
          );
        })}

        {/* Closing */}
        <Divider accent="#C9A84C" />
        <div style={{ textAlign: "center", paddingTop: "1rem" }}>
          <p
            style={{
              fontFamily: FONT_UI,
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A84C",
              opacity: 0.45,
            }}
            lang="la"
          >
            Finis · Publius Vergilius Maro
          </p>
        </div>
      </div>

    </Scroll>
  );
}
