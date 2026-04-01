import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getText, t } from "@/lib/translations";

export default function ChipSection() {
  const { isDark, isRu } = useTheme();
  const lang = isRu ? "ru" : "en";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { value: getText(t.chip.stat1, lang), icon: "⬡" },
    { value: getText(t.chip.stat2, lang), icon: "▣" },
    { value: getText(t.chip.stat3, lang), icon: "◈" },
    { value: getText(t.chip.stat4, lang), icon: "◉" },
  ];

  const chipLines = getText(t.chip.headline, lang).split("\n");

  return (
    <section
      id="chip"
      className={`relative overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl ${
          isDark
            ? "bg-gradient-to-br from-purple-900/20 via-orange-900/10 to-transparent"
            : "bg-gradient-to-br from-purple-100/60 via-orange-100/30 to-transparent"
        }`} />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-40">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`text-sm font-semibold tracking-widest uppercase mb-4 ${
            isDark ? "text-white/40" : "text-black/35"
          }`}
          data-testid="chip-eyebrow"
        >
          {getText(t.chip.eyebrow, lang)}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: headline + body */}
          <div>
            <h2 className="overflow-hidden mb-6">
              {chipLines.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight ${
                    isDark ? "text-white" : "text-black"
                  }`}
                  data-testid={`chip-headline-${i}`}
                >
                  {line}
                </motion.span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className={`text-base md:text-lg leading-relaxed mb-10 max-w-md ${
                isDark ? "text-white/55" : "text-black/50"
              }`}
              data-testid="chip-body"
            >
              {getText(t.chip.body, lang)}
            </motion.p>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  className={`rounded-2xl p-4 border ${
                    isDark
                      ? "bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06]"
                      : "bg-black/[0.02] border-black/[0.06] hover:bg-black/[0.04]"
                  } transition-all duration-200`}
                  data-testid={`chip-stat-${i}`}
                >
                  <span className="text-lg mb-1 block">{stat.icon}</span>
                  <span className={`text-sm font-medium ${isDark ? "text-white/80" : "text-black/70"}`}>
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Chip visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Outer glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "conic-gradient(from 0deg, #ff6b00, #ff00ff, #6600ff, #0066ff, #00ffcc, #00ff66, #ff6b00)",
                  padding: "2px",
                  borderRadius: "24px",
                }}
              >
                <div className={`w-full h-full rounded-[22px] ${isDark ? "bg-[#0a0a0a]" : "bg-[#f0f0f0]"}`} />
              </motion.div>

              {/* Chip body */}
              <div
                className={`absolute inset-2 rounded-[20px] flex flex-col items-center justify-center border ${
                  isDark
                    ? "bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border-white/10"
                    : "bg-gradient-to-br from-[#e8e8e8] to-[#d0d0d0] border-black/10"
                }`}
              >
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-12 h-12 mb-3 ${isDark ? "fill-white" : "fill-black"}`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <p className={`text-2xl font-bold tracking-tight text-center ${isDark ? "text-white" : "text-black"}`}>
                    A18 Pro
                  </p>
                  <p className={`text-xs text-center mt-1 ${isDark ? "text-white/40" : "text-black/40"}`}>
                    Apple Silicon
                  </p>
                </motion.div>
              </div>

              {/* Corner pins */}
              {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-3 h-3 rounded-full border ${
                    isDark ? "bg-[#222] border-white/10" : "bg-[#ccc] border-black/10"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
