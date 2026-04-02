import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getText, t } from "@/lib/translations";
import { Volume2, Zap, Camera, Fingerprint, Monitor, Sparkles } from "lucide-react";

const iconMap = [Volume2, Zap, Camera, Fingerprint, Monitor, Sparkles];

export default function FeaturesSection() {
  const { isDark, isRu } = useTheme();
  const lang = isRu ? "ru" : "en";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const features = [
    { title: getText(t.features.f1title, lang), desc: getText(t.features.f1desc, lang) },
    { title: getText(t.features.f2title, lang), desc: getText(t.features.f2desc, lang) },
    { title: getText(t.features.f3title, lang), desc: getText(t.features.f3desc, lang) },
    { title: getText(t.features.f4title, lang), desc: getText(t.features.f4desc, lang) },
    { title: getText(t.features.f5title, lang), desc: getText(t.features.f5desc, lang) },
    { title: getText(t.features.f6title, lang), desc: getText(t.features.f6desc, lang) },
  ];

  const headlineLines = getText(t.features.headline, lang).split("\n");

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-[#050505]" : "bg-white"
      }`}
    >
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-40">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`text-sm font-semibold tracking-widest uppercase mb-4 ${
              isDark ? "text-white/40" : "text-black/35"
            }`}
          >
            {getText(t.features.eyebrow, lang)}
          </motion.p>

          <h2 className="overflow-hidden">
            {headlineLines.map((line, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight ${
                  isDark ? "text-white" : "text-black"
                }`}
                data-testid={`features-headline-${i}`}
              >
                {line}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Features — horizontal numbered rows */}
        <div className={`border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
          {features.map((feature, i) => {
            const Icon = iconMap[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                data-testid={`feature-card-${i}`}
                className={`group flex items-start gap-6 md:gap-12 py-7 md:py-8 border-b transition-all duration-300 cursor-default ${
                  isDark
                    ? "border-white/10 hover:bg-white/[0.02]"
                    : "border-black/10 hover:bg-black/[0.015]"
                }`}
              >
                {/* Number */}
                <span
                  className={`text-xs font-semibold tabular-nums mt-1 w-6 shrink-0 ${
                    isDark ? "text-white/25" : "text-black/25"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 ${
                    isDark ? "bg-white/[0.06]" : "bg-black/[0.05]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isDark ? "text-white/60" : "text-black/55"}`} />
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0 md:min-w-[200px] md:max-w-[240px]">
                  <h3
                    className={`text-base md:text-lg font-semibold tracking-tight ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  className={`hidden md:block flex-1 text-sm leading-relaxed ${
                    isDark ? "text-white/45" : "text-black/45"
                  }`}
                >
                  {feature.desc}
                </p>

                {/* Arrow indicator */}
                <motion.span
                  className={`text-lg shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                    isDark ? "text-white/40" : "text-black/30"
                  }`}
                >
                  →
                </motion.span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
