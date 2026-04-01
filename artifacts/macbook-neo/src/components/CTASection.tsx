import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getText, t } from "@/lib/translations";
import ctaImg from "@assets/generated_images/macbook_cta.png";

export default function CTASection() {
  const { isDark, isRu } = useTheme();
  const lang = isRu ? "ru" : "en";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const headlineLines = getText(t.cta.headline, lang).split("\n");

  return (
    <section
      id="cta"
      className={`relative overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Glowing background */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDark
          ? "bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(162,212,75,0.12),transparent)]"
          : "bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(162,212,75,0.2),transparent)]"
      }`} />

      <div ref={ref} className="relative max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-40 text-center">
        {/* Static laptop image — no floating animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-12"
        >
          <div className="w-56 md:w-72">
            <img
              src={ctaImg}
              alt="MacBook Neo"
              className="w-full object-contain drop-shadow-2xl"
              data-testid="img-cta"
            />
          </div>
        </motion.div>

        {/* Apple logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-4"
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-8 h-8 ${isDark ? "fill-white/60" : "fill-black/40"}`}
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
        </motion.div>

        {/* Headline */}
        <h2 className="overflow-hidden mb-6">
          {headlineLines.map((line, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight ${
                isDark ? "text-white" : "text-black"
              }`}
              data-testid={`cta-headline-${i}`}
            >
              {line}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className={`text-lg md:text-xl mb-10 ${isDark ? "text-white/55" : "text-black/50"}`}
          data-testid="cta-body"
        >
          {getText(t.cta.body, lang)}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            data-testid="btn-cta-buy"
            className={`h-12 px-8 rounded-full font-semibold text-base flex items-center transition-all ${
              isDark
                ? "bg-white text-black hover:bg-white/90"
                : "bg-black text-white hover:bg-black/85"
            }`}
          >
            {getText(t.cta.btn1, lang)}
          </motion.a>
          <motion.a
            href="#display"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            data-testid="btn-cta-compare"
            className={`h-12 px-8 rounded-full font-semibold text-base flex items-center border transition-all ${
              isDark
                ? "border-white/20 text-white hover:bg-white/5"
                : "border-black/20 text-black hover:bg-black/5"
            }`}
          >
            {getText(t.cta.btn2, lang)}
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className={`text-xs ${isDark ? "text-white/30" : "text-black/30"}`}
        >
          {getText(t.cta.priceNote, lang)}
        </motion.p>
      </div>
    </section>
  );
}
