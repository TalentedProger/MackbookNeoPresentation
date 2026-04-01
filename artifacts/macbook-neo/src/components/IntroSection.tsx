import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getText, t } from "@/lib/translations";
import handImg from "@assets/image-Photoroom_(77)_1775062987389.png";

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
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
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
              className={`text-lg leading-relaxed max-w-lg ${
                isDark ? "text-white/55" : "text-black/50"
              }`}
              data-testid="intro-body"
            >
              {getText(t.intro.body, lang)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 grid grid-cols-3 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.1 }}
                  className={`rounded-2xl p-4 border transition-all ${
                    isDark
                      ? "bg-white/[0.03] border-white/[0.06]"
                      : "bg-white border-black/[0.06]"
                  }`}
                  data-testid={`intro-stat-${i}`}
                >
                  <div className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-black"}`}>
                    {stat.value}<span className="text-base font-medium ml-0.5">{stat.unit}</span>
                  </div>
                  <div className={`text-xs mt-0.5 ${isDark ? "text-white/40" : "text-black/40"}`}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            <img
              src={handImg}
              alt="MacBook Neo held in hand"
              className="w-full max-w-md object-contain drop-shadow-2xl"
              data-testid="img-intro-colors"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
