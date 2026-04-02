import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getText, t } from "@/lib/translations";
import displayImg from "@assets/image-Photoroom_(85)_1775147833561.png";

export default function DisplaySection() {
  const { isDark, isRu } = useTheme();
  const lang = isRu ? "ru" : "en";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { value: getText(t.display.stat1value, lang), label: getText(t.display.stat1label, lang) },
    { value: getText(t.display.stat2value, lang), label: getText(t.display.stat2label, lang) },
    { value: getText(t.display.stat3value, lang), label: getText(t.display.stat3label, lang) },
    { value: getText(t.display.stat4value, lang), label: getText(t.display.stat4label, lang) },
  ];

  const headlineLines = getText(t.display.headline, lang).split("\n");

  return (
    <section
      id="display"
      className={`relative overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-[#050505]" : "bg-[#f5f5f7]"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 blur-3xl ${
          isDark
            ? "bg-gradient-to-t from-blue-900/15 to-transparent"
            : "bg-gradient-to-t from-blue-100/50 to-transparent"
        }`} />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-40">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`text-sm font-semibold tracking-widest uppercase mb-8 ${
            isDark ? "text-white/40" : "text-black/35"
          }`}
        >
          {getText(t.display.eyebrow, lang)}
        </motion.p>

        {/* Equal-height two-column grid */}
        <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-stretch">

          {/* LEFT column: headline on top + image at bottom */}
          <div className="flex flex-col">
            {/* Headline */}
            <h2 className="overflow-hidden mb-8">
              {headlineLines.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight ${
                    isDark ? "text-white" : "text-black"
                  }`}
                  data-testid={`display-headline-${i}`}
                >
                  {line}
                </motion.span>
              ))}
            </h2>

            {/* Image fills remaining height, aligned to bottom */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex items-end"
            >
              <img
                src={displayImg}
                alt="MacBook Neo display"
                className="w-full object-contain drop-shadow-2xl"
                data-testid="img-display"
              />
            </motion.div>
          </div>

          {/* RIGHT column: body text + elegant stats */}
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className={`text-lg leading-relaxed mb-12 max-w-md ${
                isDark ? "text-white/55" : "text-black/50"
              }`}
            >
              {getText(t.display.body, lang)}
            </motion.p>

            {/* Elegant stat rows — same style as IntroSection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.07 }}
                  className="flex items-center justify-between py-4"
                  style={{
                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                  }}
                  data-testid={`display-stat-${i}`}
                >
                  <span className={`text-xs font-medium tracking-wide uppercase ${
                    isDark ? "text-white/35" : "text-black/35"
                  }`}>
                    {stat.label}
                  </span>
                  <span className={`text-xl md:text-2xl font-black tracking-tighter ${
                    isDark ? "text-white" : "text-black"
                  }`}>
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
