import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getText, t } from "@/lib/translations";
import colorsFanImg from "@assets/image-Photoroom_(78)_1775063030459.png";

const colors = [
  { id: "silver", hex: "#E8E8E8", gradient: "linear-gradient(135deg, #f0f0f0, #c8c8c8)", labelKey: "silver" as const },
  { id: "pink", hex: "#F5C5C5", gradient: "linear-gradient(135deg, #fce0e0, #e8b0b0)", labelKey: "pink" as const },
  { id: "yellow", hex: "#D4E87A", gradient: "linear-gradient(135deg, #e8f09a, #c0d060)", labelKey: "yellow" as const },
  { id: "blue", hex: "#3D4F6E", gradient: "linear-gradient(135deg, #4a607a, #2a3858)", labelKey: "blue" as const },
];

export default function ColorsSection() {
  const { isDark, isRu } = useTheme();
  const lang = isRu ? "ru" : "en";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeColor, setActiveColor] = useState(2);

  const headlineLines = getText(t.colors.headline, lang).split("\n");

  return (
    <section
      id="colors"
      className={`relative overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-[#0a0a0a]" : "bg-[#f5f5f7]"
      }`}
    >
      <motion.div
        animate={{ background: `radial-gradient(ellipse 60% 50% at 70% 50%, ${colors[activeColor].hex}28, transparent)` }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none"
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-40">
        <div className="mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`text-sm font-semibold tracking-widest uppercase mb-4 ${
              isDark ? "text-white/40" : "text-black/35"
            }`}
          >
            {getText(t.colors.eyebrow, lang)}
          </motion.p>

          <h2 className="overflow-hidden mb-4">
            {headlineLines.map((line, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight ${
                  isDark ? "text-white" : "text-black"
                }`}
                data-testid={`colors-headline-${i}`}
              >
                {line}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`text-lg max-w-lg leading-relaxed ${isDark ? "text-white/55" : "text-black/50"}`}
          >
            {getText(t.colors.body, lang)}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Color picker */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-8">
              {colors.map((color, i) => (
                <motion.button
                  key={color.id}
                  onClick={() => setActiveColor(i)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`btn-color-${color.id}`}
                  className="relative"
                >
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ background: color.gradient }}
                  />
                  {activeColor === i && (
                    <motion.div
                      layoutId="colorIndicator"
                      className="absolute -inset-1.5 rounded-full border-2"
                      style={{ borderColor: color.hex }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeColor}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`text-xl font-semibold ${isDark ? "text-white" : "text-black"}`}
                data-testid="colors-active-label"
              >
                {getText(t.colors[colors[activeColor].labelKey], lang)}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* 4 colors fan image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={colorsFanImg}
              alt="MacBook Neo in four colors"
              className="w-full object-contain drop-shadow-2xl"
              data-testid="img-colors-hands"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
