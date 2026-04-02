import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getText, t } from "@/lib/translations";
import keyboardImg from "@assets/image-Photoroom_(84)_1775145860491.png";

export default function IntroSection() {
  const { isDark, isRu } = useTheme();
  const lang = isRu ? "ru" : "en";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "1,23", unit: isRu ? "кг" : "kg", label: isRu ? "Вес" : "Weight" },
    { value: "16", unit: isRu ? "ч" : "hrs", label: isRu ? "Автономность" : "Battery" },
    { value: "A18", unit: "", label: isRu ? "Чип Pro" : "Pro Chip" },
  ];

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-[#0a0a0a]" : "bg-[#f5f5f7]"
      }`}
      style={{ minHeight: 580 }}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-0">
        <div className="grid lg:grid-cols-2 gap-16 items-end">
          {/* Left: text + elegant stats */}
          <div className="pb-16 md:pb-24">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6 ${
                isDark ? "text-white" : "text-black"
              }`}
              data-testid="intro-headline"
            >
              {getText(t.intro.headline, lang)}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`text-lg leading-relaxed max-w-lg mb-14 ${
                isDark ? "text-white/55" : "text-black/50"
              }`}
              data-testid="intro-body"
            >
              {getText(t.intro.body, lang)}
            </motion.p>

            {/* Elegant stat row — minimal horizontal dividers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex gap-0 divide-x"
              style={{
                borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                divideColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.38 + i * 0.1 }}
                  className="flex-1 px-5 py-5 first:pl-0 last:pr-0"
                  style={{
                    borderRight: i < stats.length - 1
                      ? `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`
                      : "none",
                  }}
                  data-testid={`intro-stat-${i}`}
                >
                  <div className={`text-3xl md:text-4xl font-black tracking-tighter leading-none ${
                    isDark ? "text-white" : "text-black"
                  }`}>
                    {stat.value}
                    {stat.unit && (
                      <span className={`text-base font-semibold ml-0.5 ${
                        isDark ? "text-white/60" : "text-black/55"
                      }`}>{stat.unit}</span>
                    )}
                  </div>
                  <div className={`text-xs mt-2 font-medium tracking-wide uppercase ${
                    isDark ? "text-white/35" : "text-black/35"
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: keyboard image — flush to bottom-right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-end justify-end"
          >
            <img
              src={keyboardImg}
              alt="MacBook Neo keyboard"
              className="w-full max-w-lg object-contain object-bottom"
              style={{ marginBottom: 0, marginRight: 0 }}
              data-testid="img-intro-keyboard"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
