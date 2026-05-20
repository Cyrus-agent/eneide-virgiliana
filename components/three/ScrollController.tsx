"use client";

import { useEffect } from "react";
import { useScroll } from "@react-three/drei";

/**
 * Listens to `journeyScrollTo` window events dispatched by FloatingNav
 * and smoothly scrolls the drei scroll container to the target offset.
 * Must be rendered inside <ScrollControls>.
 */
export default function ScrollController() {
  const scroll = useScroll();

  useEffect(() => {
    const handler = (e: Event) => {
      const { target } = (e as CustomEvent<{ target: number }>).detail;
      if (!scroll.el) return;

      const maxScroll = scroll.el.scrollHeight - scroll.el.clientHeight;
      const targetScrollTop = target * maxScroll;

      scroll.el.scrollTo({ top: targetScrollTop, behavior: "smooth" });
    };

    window.addEventListener("journeyScrollTo", handler);
    return () => window.removeEventListener("journeyScrollTo", handler);
  }, [scroll.el]);

  return null;
}
