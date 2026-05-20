"use client";

import dynamic from "next/dynamic";
import FloatingNav from "@/components/FloatingNav";

// Three.js requires browser APIs — must be loaded client-side only
const JourneyCanvas = dynamic(
  () => import("@/components/JourneyCanvas"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#0D0907",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Georgia, serif",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#C9A84C",
            fontSize: "0.7rem",
            opacity: 0.6,
          }}
        >
          Caricamento del tempio…
        </p>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <>
      <FloatingNav />
      <JourneyCanvas />
    </>
  );
}
