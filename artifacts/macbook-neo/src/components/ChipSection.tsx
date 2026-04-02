import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getText, t } from "@/lib/translations";
import chipImg from "@assets/image-Photoroom_(81)_(1)-Photoroom_1775145715579.png";

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
      {/* Ambient glow */}
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
          {/* Left: headline + body + stats */}
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

          {/* Right: A18 chip image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <img
              src={chipImg}
              alt="A18 Pro chip"
              className="w-72 h-72 md:w-96 md:h-96 object-contain drop-shadow-2xl"
              data-testid="img-chip"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
