import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getText, t } from "@/lib/translations";

export default function SpecsSection() {
  const { isDark, isRu } = useTheme();
  const lang = isRu ? "ru" : "en";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const specs = [
    { label: getText(t.specs.display, lang), value: getText(t.specs.displayVal, lang) },
    { label: getText(t.specs.chip, lang), value: getText(t.specs.chipVal, lang) },
    { label: getText(t.specs.memory, lang), value: getText(t.specs.memoryVal, lang) },
    { label: getText(t.specs.storage, lang), value: getText(t.specs.storageVal, lang) },
    { label: getText(t.specs.battery, lang), value: getText(t.specs.batteryVal, lang) },
    { label: getText(t.specs.ports, lang), value: getText(t.specs.portsVal, lang) },
    { label: getText(t.specs.camera, lang), value: getText(t.specs.cameraVal, lang) },
    { label: getText(t.specs.weight, lang), value: getText(t.specs.weightVal, lang) },
    { label: getText(t.specs.charging, lang), value: getText(t.specs.chargingVal, lang) },
    { label: getText(t.specs.os, lang), value: getText(t.specs.osVal, lang) },
  ];

  const headlineLines = getText(t.specs.headline, lang).split("\n");

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-[#0a0a0a]" : "bg-[#f5f5f7]"
      }`}
    >
      <div ref={ref} className="max-w-[96rem] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-40">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`text-sm font-semibold tracking-widest uppercase mb-4 ${
              isDark ? "text-white/40" : "text-black/35"
            }`}
          >
            {getText(t.specs.eyebrow, lang)}
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
                data-testid={`specs-headline-${i}`}
              >
                {line}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Specs list */}
        <div className={`rounded-3xl border overflow-hidden ${
          isDark ? "border-white/[0.06]" : "border-black/[0.06]"
        }`}>
          {specs.map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
              className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 px-6 md:px-8 py-5 border-b last:border-b-0 transition-all duration-150 ${
                isDark
                  ? "border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03]"
                  : "border-black/[0.04] bg-white hover:bg-white/60"
              }`}
              data-testid={`spec-row-${i}`}
            >
              <span className={`text-sm font-medium sm:min-w-48 sm:w-48 flex-shrink-0 ${
                isDark ? "text-white/45" : "text-black/40"
              }`}>
                {spec.label}
              </span>
              <span className={`text-sm leading-relaxed ${isDark ? "text-white/80" : "text-black/80"}`}>
                {spec.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
