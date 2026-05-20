"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/content";

// Map each section id to the scroll.offset at which it becomes the active section
// Must match CameraRig phase ranges and JourneyContent top positions
const SECTION_RANGES: Record<string, [number, number]> = {
  hero:        [0.00, 0.36],
  contesto:    [0.36, 0.47],
  "libro-i":   [0.45, 0.57],
  "libro-ii":  [0.54, 0.66],
  "libro-iii": [0.63, 0.72],
  "libro-iv":  [0.71, 0.80],
  dibattito:   [0.80, 0.88],
  augusto:     [0.87, 0.94],
  biblio:      [0.93, 1.00],
};

// Scroll target offset (0-1) when a nav item is clicked
const SECTION_TARGETS: Record<string, number> = {
  hero:        0.00,
  contesto:    0.40,
  "libro-i":   0.49,
  "libro-ii":  0.58,
  "libro-iii": 0.665,
  "libro-iv":  0.75,
  dibattito:   0.835,
  augusto:     0.90,
  biblio:      0.96,
};

export default function FloatingNav() {
  const [active, setActive] = useState<string>("hero");
  const [visible, setVisible] = useState(false);

  // Track scroll progress from CameraRig's custom event
  useEffect(() => {
    const handler = (e: Event) => {
      const t = (e as CustomEvent<{ progress: number }>).detail.progress;

      // Show nav after approach phase
      setVisible(t > 0.32);

      // Determine active section
      for (const [id, [from, to]] of Object.entries(SECTION_RANGES)) {
        if (t >= from && t < to) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener("journeyScroll", handler);
    return () => window.removeEventListener("journeyScroll", handler);
  }, []);

  // Navigate to section by setting the drei scroll container's scrollTop
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = SECTION_TARGETS[id] ?? 0;
    // Dispatch event picked up by ScrollController inside Canvas
    window.dispatchEvent(new CustomEvent("journeyScrollTo", { detail: { target } }));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 inset-x-0 z-50"
          aria-label="Navigazione principale"
        >
          <div
            className="flex items-center justify-center flex-wrap gap-1 px-4 py-3 mx-auto"
            style={{
              background: "rgba(13, 9, 7, 0.88)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className="relative px-3 py-1.5 text-xs transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
                style={{
                  fontFamily: "var(--font-ui)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: active === id ? "#C9A84C" : "#C8C0B2",
                }}
                aria-current={active === id ? "location" : undefined}
              >
                {label}
                {active === id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 inset-x-3 h-px"
                    style={{ backgroundColor: "#C9A84C" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    aria-hidden
                  />
                )}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
