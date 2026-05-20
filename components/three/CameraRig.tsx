"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

// Emit scroll progress so FloatingNav can track sections outside Canvas
function emitProgress(t: number) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("journeyScroll", { detail: { progress: t } }));
  }
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

const HERO_COL_HEIGHT = 13; // must match TempleScene hero column height
const ORBIT_RADIUS = 4.8;

export default function CameraRig() {
  const { camera } = useThree();
  const scroll = useScroll();
  const targetPos = useRef(new THREE.Vector3(0, 55, 2));
  const targetLook = useRef(new THREE.Vector3(0, 0, -8));
  const lastT = useRef(-1);

  useFrame(() => {
    const t = scroll.offset;

    // Emit only when changed meaningfully
    if (Math.abs(t - lastT.current) > 0.002) {
      emitProgress(t);
      lastT.current = t;
    }

    let tx: number, ty: number, tz: number;
    let lx: number, ly: number, lz: number;

    if (t < 0.12) {
      // ── PHASE 1: Aerial top-down view, slowly descend ──
      const p = easeInOut(t / 0.12);
      tx = 0;
      ty = THREE.MathUtils.lerp(55, 28, p);
      tz = THREE.MathUtils.lerp(2, 8, p);
      lx = 0; ly = 0; lz = -8;
    } else if (t < 0.28) {
      // ── PHASE 2: Descend toward hero column top ──
      const p = easeInOut((t - 0.12) / 0.16);
      tx = 0;
      ty = THREE.MathUtils.lerp(28, HERO_COL_HEIGHT + 2.5, p);
      tz = THREE.MathUtils.lerp(8, ORBIT_RADIUS, p);
      lx = 0;
      ly = THREE.MathUtils.lerp(8, HERO_COL_HEIGHT + 0.5, p);
      lz = 0;
    } else {
      // ── PHASE 3: Orbit 360° around column while descending ──
      const p = (t - 0.28) / 0.72; // 0 → 1 across remaining scroll
      const angle = p * Math.PI * 2; // full circle
      const height = THREE.MathUtils.lerp(HERO_COL_HEIGHT + 1.5, 0.6, p);

      tx = Math.sin(angle) * ORBIT_RADIUS;
      ty = height;
      tz = Math.cos(angle) * ORBIT_RADIUS;
      lx = 0;
      ly = height - 0.8;
      lz = 0;
    }

    // Smooth camera movement (lerp toward target)
    targetPos.current.set(tx, ty, tz);
    targetLook.current.set(lx, ly, lz);

    camera.position.lerp(targetPos.current, 0.08);

    // lookAt via quaternion slerp
    const dummy = new THREE.Object3D();
    dummy.position.copy(camera.position);
    dummy.lookAt(targetLook.current);
    camera.quaternion.slerp(dummy.quaternion, 0.08);
  });

  return null;
}
