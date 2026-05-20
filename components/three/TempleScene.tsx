"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import ColumnMesh from "./ColumnMesh";

// Sparse ember particles in 3D space
function EmberParticles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = Math.random() * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += delta * (0.3 + (i % 3) * 0.15);
      if (pos[i * 3 + 1] > 25) pos[i * 3 + 1] = 0;
      pos[i * 3] += Math.sin(Date.now() * 0.001 + i) * 0.002;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#C9A84C" size={0.06} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

// Torch flame point light that flickers
function TorchLight({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.PointLight>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.intensity = 1.5 + Math.sin(clock.elapsedTime * 8 + position[0]) * 0.4;
  });
  return <pointLight ref={ref} position={position} color="#C9530A" intensity={1.5} distance={12} decay={2} />;
}

export default function TempleScene() {
  const scroll = useScroll();
  const { scene } = useThree();
  const fogRef = useRef<THREE.Fog>(null!);
  const ambientRef = useRef<THREE.AmbientLight>(null!);
  const sunRef = useRef<THREE.DirectionalLight>(null!);

  // Update atmosphere based on scroll
  useFrame(() => {
    const t = scroll.offset;

    // Fog transitions: clear sky → haze → dark crypt atmosphere
    if (fogRef.current) {
      const near = THREE.MathUtils.lerp(40, 8, t);
      const far = THREE.MathUtils.lerp(120, 30, t);
      fogRef.current.near = near;
      fogRef.current.far = far;
      // Color shifts from sky blue/dark → deep obsidian
      const r = THREE.MathUtils.lerp(0.05, 0.04, t);
      const g = THREE.MathUtils.lerp(0.06, 0.035, t);
      const b = THREE.MathUtils.lerp(0.10, 0.025, t);
      (fogRef.current.color as THREE.Color).setRGB(r, g, b);
    }

    // Sun dims as we descend, torches compensate
    if (sunRef.current) {
      sunRef.current.intensity = THREE.MathUtils.lerp(2.2, 0.3, Math.min(t * 2, 1));
    }
    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(0.4, 0.15, t);
    }

    // Background color
    scene.background = new THREE.Color(
      THREE.MathUtils.lerp(0.05, 0.04, t),
      THREE.MathUtils.lerp(0.06, 0.035, t),
      THREE.MathUtils.lerp(0.10, 0.025, t)
    );
  });

  return (
    <>
      {/* Fog */}
      <fog ref={fogRef} attach="fog" args={["#0D0A19", 40, 120]} />

      {/* Background stars — visible in aerial view */}
      <Stars radius={80} depth={40} count={800} factor={3} saturation={0} fade speed={0.3} />

      {/* Lighting */}
      <ambientLight ref={ambientRef} intensity={0.4} color="#C9C0A8" />
      <directionalLight
        ref={sunRef}
        position={[15, 30, 10]}
        intensity={2.2}
        color="#FFF5E0"
        castShadow
      />

      {/* Torch lights at column base level (activate as camera descends) */}
      <TorchLight position={[3, 1.5, 3]} />
      <TorchLight position={[-3, 1.5, 3]} />
      <TorchLight position={[3, 1.5, -3]} />
      <TorchLight position={[-3, 1.5, -3]} />

      {/* ── FLOOR ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[160, 160]} />
        <meshStandardMaterial color="#C8C0B0" roughness={0.65} metalness={0.02} />
      </mesh>

      {/* Stylobate (raised temple platform) */}
      <mesh position={[0, 0.45, -10]}>
        <boxGeometry args={[46, 0.9, 22]} />
        <meshStandardMaterial color="#D4CCB8" roughness={0.55} />
      </mesh>
      <mesh position={[0, 1.05, -10]}>
        <boxGeometry args={[43, 0.3, 19]} />
        <meshStandardMaterial color="#DDD5C2" roughness={0.5} />
      </mesh>

      {/* ── BACKGROUND COLONNADE ── */}
      {([-18, -12, -6, 0, 6, 12, 18] as number[]).map((x, i) => (
        <ColumnMesh
          key={i}
          height={14}
          radius={0.75}
          position={[x, 1.35, -16]}
          opacity={0.5}
        />
      ))}

      {/* Entablature (architrave + frieze over background colonnade) */}
      <mesh position={[0, 16.5, -16]}>
        <boxGeometry args={[40, 1.0, 2]} />
        <meshStandardMaterial color="#D0C8B4" roughness={0.45} />
      </mesh>
      <mesh position={[0, 17.6, -16]}>
        <boxGeometry args={[40, 0.7, 1.8]} />
        <meshStandardMaterial color="#C8C0AC" roughness={0.5} />
      </mesh>
      {/* Pediment triangle */}
      <mesh position={[0, 18.6, -16.1]}>
        <coneGeometry args={[18, 3, 4]} />
        <meshStandardMaterial color="#D4CDB8" roughness={0.5} />
      </mesh>

      {/* ── SIDE COLUMNS ── */}
      <ColumnMesh height={13} radius={0.8} position={[-10, 1.35, -4]} opacity={0.35} />
      <ColumnMesh height={13} radius={0.8} position={[10, 1.35, -4]} opacity={0.35} />
      <ColumnMesh height={13} radius={0.8} position={[-14, 1.35, -8]} opacity={0.22} />
      <ColumnMesh height={13} radius={0.8} position={[14, 1.35, -8]} opacity={0.22} />

      {/* ── HERO COLUMN (the one we orbit) ── */}
      <ColumnMesh height={13} radius={1.0} position={[0, 0, 0]} />

      {/* Ember particles */}
      <EmberParticles count={60} />
    </>
  );
}
