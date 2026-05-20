"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import TempleScene from "./three/TempleScene";
import CameraRig from "./three/CameraRig";
import ScrollController from "./three/ScrollController";
import JourneyContent from "./JourneyContent";

// pages * 100vh = total container height
// max scroll = (pages - 1) * 100vh
// scroll.offset = scrollY / ((pages - 1) * 100vh)
// Content positions in vh map to t via: t ≈ top_vh / ((pages - 1) * 100)
export const JOURNEY_PAGES = 11;

export default function JourneyCanvas() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0D0A19",
      }}
    >
      <Canvas
        camera={{ position: [0, 28, 42], fov: 52, near: 0.1, far: 400 }}
        shadows
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#0D0A19" }}
      >
        <ScrollControls pages={JOURNEY_PAGES} damping={0.25} distance={1}>
          {/* 3D scene — renders in WebGL */}
          <TempleScene />
          {/* Scroll-driven camera path */}
          <CameraRig />
          {/* HTML content panels overlaid on canvas */}
          <JourneyContent />
          {/* Handles nav click scroll-to */}
          <ScrollController />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
