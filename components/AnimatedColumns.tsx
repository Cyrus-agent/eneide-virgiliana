"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ColumnProps {
  x: number;
  height: number;
  opacity: number;
  delay?: number;
  accentColor?: string;
}

function RomanColumn({ x, height, opacity, delay = 0, accentColor = "#C9A84C" }: ColumnProps) {
  return (
    <g transform={`translate(${x}, 0)`} opacity={opacity}>
      {/* Capital (Corinthian top) */}
      <ellipse cx="20" cy="8" rx="22" ry="5" fill={accentColor} opacity={0.8} />
      <rect x="2" y="8" width="36" height="6" fill={accentColor} opacity={0.7} rx="1" />
      {/* Volutes decoration */}
      <path d={`M4,10 Q8,6 12,10`} stroke={accentColor} strokeWidth="1.5" fill="none" opacity={0.5} />
      <path d={`M28,10 Q32,6 36,10`} stroke={accentColor} strokeWidth="1.5" fill="none" opacity={0.5} />

      {/* Shaft with flutes */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={5 + i * 5.5}
          y="14"
          width="3"
          height={height - 28}
          fill={accentColor}
          opacity={0.12 + (i % 2) * 0.06}
          rx="1"
        />
      ))}
      {/* Main shaft */}
      <rect x="5" y="14" width="30" height={height - 28} fill={accentColor} opacity={0.15} rx="2" />
      {/* Shaft outline */}
      <rect x="5" y="14" width="30" height={height - 28} fill="none" stroke={accentColor} strokeWidth="0.5" opacity={0.3} rx="2" />

      {/* Base */}
      <rect x="2" y={height - 14} width="36" height="5" fill={accentColor} opacity={0.5} rx="1" />
      <rect x="0" y={height - 9} width="40" height="5" fill={accentColor} opacity={0.4} rx="1" />
      <rect x="-2" y={height - 4} width="44" height="4" fill={accentColor} opacity={0.35} rx="1" />
    </g>
  );
}

interface AnimatedColumnsProps {
  side: "left" | "right";
  accentColor?: string;
  bgColor?: string;
}

export default function AnimatedColumns({
  side,
  accentColor = "#C9A84C",
  bgColor = "#0D0907",
}: AnimatedColumnsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Three layers at different speeds for depth
  const y1 = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [-30, 30]);
  const y2 = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [-60, 60]);
  const y3 = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [-15, 15]);

  const isLeft = side === "left";

  return (
    <div
      ref={ref}
      className="absolute top-0 bottom-0 pointer-events-none overflow-hidden"
      style={{
        width: "200px",
        [isLeft ? "left" : "right"]: 0,
        transform: isLeft ? "none" : "scaleX(-1)",
      }}
      aria-hidden
    >
      {/* Back layer — farthest, most transparent */}
      <motion.div style={{ y: y3 }} className="absolute inset-0 will-change-transform">
        <svg viewBox="0 0 200 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <RomanColumn x={80} height={820} opacity={0.07} accentColor={accentColor} />
          <RomanColumn x={130} height={780} opacity={0.05} accentColor={accentColor} />
        </svg>
      </motion.div>

      {/* Mid layer */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 will-change-transform">
        <svg viewBox="0 0 200 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <RomanColumn x={40} height={860} opacity={0.12} accentColor={accentColor} />
          <RomanColumn x={100} height={800} opacity={0.09} accentColor={accentColor} />
        </svg>
      </motion.div>

      {/* Front layer — closest, most opaque */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 will-change-transform">
        <svg viewBox="0 0 200 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <RomanColumn x={-10} height={900} opacity={0.22} accentColor={accentColor} />
          <RomanColumn x={55} height={840} opacity={0.16} accentColor={accentColor} />
        </svg>
      </motion.div>

      {/* Edge gradient fade */}
      <div
        className="absolute inset-0"
        style={{
          background: isLeft
            ? `linear-gradient(to right, ${bgColor} 0%, transparent 60%)`
            : `linear-gradient(to left, ${bgColor} 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}
