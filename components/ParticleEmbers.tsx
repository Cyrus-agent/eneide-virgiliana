"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface ParticleEmbersProps {
  count?: number;
  color?: string;
  intensity?: "low" | "medium" | "high";
}

export default function ParticleEmbers({
  count = 30,
  color = "#C9A84C",
  intensity = "medium",
}: ParticleEmbersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduce = useReducedMotion();
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (shouldReduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Parse hex color to rgba
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };
    const rgb = hexToRgb(color);

    type Ember = {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      wobble: number;
      wobbleSpeed: number;
      wobbleAmp: number;
    };

    const speedMultiplier = intensity === "low" ? 0.4 : intensity === "high" ? 1.2 : 0.7;

    const createEmber = (): Ember => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.8 * speedMultiplier,
      speedY: -(Math.random() * 1.2 + 0.4) * speedMultiplier,
      opacity: Math.random() * 0.6 + 0.3,
      fadeSpeed: Math.random() * 0.005 + 0.002,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.04 + 0.01,
      wobbleAmp: Math.random() * 1.5 + 0.5,
    });

    const embers: Ember[] = Array.from({ length: count }, createEmber).map((e) => ({
      ...e,
      y: Math.random() * canvas.height,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      embers.forEach((ember) => {
        ember.wobble += ember.wobbleSpeed;
        ember.x += ember.speedX + Math.sin(ember.wobble) * ember.wobbleAmp;
        ember.y += ember.speedY;
        ember.opacity -= ember.fadeSpeed;

        if (ember.opacity <= 0 || ember.y < -10) {
          Object.assign(ember, createEmber());
          return;
        }

        ctx.save();
        ctx.globalAlpha = ember.opacity;

        // Glow
        const grd = ctx.createRadialGradient(
          ember.x, ember.y, 0,
          ember.x, ember.y, ember.size * 3
        );
        grd.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},0.8)`);
        grd.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(255,220,150,0.9)`;
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size * 0.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [count, color, intensity, shouldReduce]);

  if (shouldReduce) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}
