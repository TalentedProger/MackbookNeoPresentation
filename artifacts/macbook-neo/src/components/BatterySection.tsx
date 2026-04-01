import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getText, t } from "@/lib/translations";

export default function BatterySection() {
  const { isDark, isRu } = useTheme();
  const lang = isRu ? "ru" : "en";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const headlineLines = getText(t.battery.headline, lang).split("\n");

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Large ambient */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDark
          ? "bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(99,179,237,0.08),transparent)]"
          : "bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(99,179,237,0.12),transparent)]"
      }`} />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-40">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-start"
          >
            {/* Battery illustration */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: isDark
                    ? "conic-gradient(from 0deg, rgba(99,179,237,0.6) 0%, rgba(99,179,237,0.6) 70%, rgba(99,179,237,0.1) 70%)"
                    : "conic-gradient(from 0deg, rgba(59,130,246,0.7) 0%, rgba(59,130,246,0.7) 70%, rgba(59,130,246,0.1) 70%)",
                  padding: "3px",
                  borderRadius: "50%",
                }}
              >
                <div className={`w-full h-full rounded-full ${isDark ? "bg-black" : "bg-white"}`} />
              </motion.div>

              {/* Inner content */}
              <div className="relative flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                  className={`text-7xl md:text-8xl font-black tracking-tighter ${
                    isDark ? "text-white" : "text-black"
                  }`}
                  data-testid="battery-hours"
                >
                  {getText(t.battery.hours, lang)}
                </motion.div>
                <p className={`text-sm mt-2 ${isDark ? "text-white/50" : "text-black/45"}`}>
                  {getText(t.battery.videoLabel, lang)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className={`text-sm font-semibold tracking-widest uppercase mb-4 ${
                isDark ? "text-white/40" : "text-black/35"
              }`}
            >
              {getText(t.battery.eyebrow, lang)}
            </motion.p>

            <h2 className="overflow-hidden mb-6">
              {headlineLines.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight ${
                    isDark ? "text-white" : "text-black"
                  }`}
                  data-testid={`battery-headline-${i}`}
                >
                  {line}
                </motion.span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className={`text-lg leading-relaxed mb-10 max-w-md ${
                isDark ? "text-white/55" : "text-black/50"
              }`}
              data-testid="battery-body"
            >
              {getText(t.battery.body, lang)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className={`rounded-2xl p-4 border ${
                isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-[#f5f5f7] border-black/[0.06]"
              }`}>
                <div className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}>
                  {getText(t.battery.webLabel, lang).split(" ")[0]}
                </div>
                <div className={`text-xs ${isDark ? "text-white/40" : "text-black/40"}`}>
                  {getText(t.battery.webLabel, lang).split(" ").slice(1).join(" ")}
                </div>
              </div>
              <div className={`rounded-2xl p-4 border ${
                isDark ? "bg-white/[0.03] border-white/[0.07]" : "bg-[#f5f5f7] border-black/[0.06]"
              }`}>
                <div className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}>
                  {getText(t.battery.silentLabel, lang)}
                </div>
                <div className={`text-xs ${isDark ? "text-white/40" : "text-black/40"}`}>
                  {getText(t.battery.silentDesc, lang)}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
