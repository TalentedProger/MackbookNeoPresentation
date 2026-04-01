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
        <div className="mb-16 md:mb-20 text-center">
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

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = iconMap[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group rounded-3xl p-6 md:p-8 border transition-all duration-200 ${
                  isDark
                    ? "bg-white/[0.025] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1]"
                    : "bg-[#f5f5f7] border-transparent hover:bg-white hover:shadow-lg hover:shadow-black/5"
                }`}
                data-testid={`feature-card-${i}`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-110 ${
                  isDark ? "bg-white/[0.06]" : "bg-black/[0.05]"
                }`}>
                  <Icon className={`w-5 h-5 ${isDark ? "text-white/70" : "text-black/60"}`} />
                </div>
                <h3 className={`text-base font-semibold mb-2 ${isDark ? "text-white" : "text-black"}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? "text-white/50" : "text-black/45"}`}>
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
