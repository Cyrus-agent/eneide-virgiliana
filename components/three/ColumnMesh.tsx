"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface ColumnMeshProps {
  height?: number;
  radius?: number;
  position?: [number, number, number];
  opacity?: number;
}

const MARBLE_COLOR = new THREE.Color(0.91, 0.87, 0.79);
const MARBLE_DARK = new THREE.Color(0.84, 0.80, 0.72);

export default function ColumnMesh({
  height = 12,
  radius = 1,
  position = [0, 0, 0],
  opacity = 1,
}: ColumnMeshProps) {
  const transparent = opacity < 1;

  const matProps = useMemo(
    () => ({
      color: MARBLE_COLOR,
      roughness: 0.35,
      metalness: 0.04,
      transparent,
      opacity,
    }),
    [transparent, opacity]
  );
  const darkMatProps = useMemo(
    () => ({
      color: MARBLE_DARK,
      roughness: 0.4,
      metalness: 0.02,
      transparent,
      opacity,
    }),
    [transparent, opacity]
  );

  const shaftTop = height * 0.5 + 0.9;

  return (
    <group position={position}>
      {/* Plinth */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[radius * 2.8, 0.4, radius * 2.8]} />
        <meshStandardMaterial {...darkMatProps} />
      </mesh>

      {/* Lower torus moulding */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[radius * 1.3, radius * 1.3, 0.3, 32]} />
        <meshStandardMaterial {...darkMatProps} />
      </mesh>

      {/* Shaft — slight entasis taper */}
      <mesh position={[0, shaftTop, 0]}>
        <cylinderGeometry args={[radius * 0.82, radius * 1.02, height - 1.5, 32, 1]} />
        <meshStandardMaterial {...matProps} />
      </mesh>

      {/* Annuli (neck rings) */}
      {[0, 0.18, 0.36].map((offset, i) => (
        <mesh key={i} position={[0, height - 0.6 + offset, 0]}>
          <cylinderGeometry args={[radius * 0.86, radius * 0.86, 0.1, 32]} />
          <meshStandardMaterial {...darkMatProps} />
        </mesh>
      ))}

      {/* Echinus (capital ovolo) */}
      <mesh position={[0, height + 0.2, 0]}>
        <cylinderGeometry args={[radius * 1.35, radius * 0.9, 0.7, 32]} />
        <meshStandardMaterial {...matProps} />
      </mesh>

      {/* Abacus */}
      <mesh position={[0, height + 0.75, 0]}>
        <boxGeometry args={[radius * 2.8, 0.4, radius * 2.8]} />
        <meshStandardMaterial {...darkMatProps} />
      </mesh>
    </group>
  );
}
