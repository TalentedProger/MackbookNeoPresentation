import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getText, t } from "@/lib/translations";
import detailImg from "@assets/image_1775060466757.png";

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
          className={`text-sm font-semibold tracking-widest uppercase mb-4 text-center ${
            isDark ? "text-white/40" : "text-black/35"
          }`}
        >
          {getText(t.display.eyebrow, lang)}
        </motion.p>

        <h2 className="text-center mb-4 overflow-hidden">
          {headlineLines.map((line, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight ${
                isDark ? "text-white" : "text-black"
              }`}
              data-testid={`display-headline-${i}`}
            >
              {line}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={`text-center text-lg max-w-xl mx-auto mb-16 leading-relaxed ${
            isDark ? "text-white/55" : "text-black/50"
          }`}
        >
          {getText(t.display.body, lang)}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className={`rounded-2xl p-5 border text-center transition-all ${
                isDark
                  ? "bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06]"
                  : "bg-white border-black/[0.06] hover:bg-white/80"
              }`}
              data-testid={`display-stat-${i}`}
            >
              <div className={`text-xl md:text-2xl font-bold tracking-tight mb-1 ${
                isDark ? "text-white" : "text-black"
              }`}>
                {stat.value}
              </div>
              <div className={`text-xs ${isDark ? "text-white/40" : "text-black/40"}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Display image */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`rounded-3xl overflow-hidden border ${
            isDark ? "border-white/[0.06]" : "border-black/[0.06]"
          }`}
        >
          <img
            src={detailImg}
            alt="MacBook Neo display detail"
            className="w-full object-contain"
            data-testid="img-display"
          />
        </motion.div>
      </div>
    </section>
  );
}
