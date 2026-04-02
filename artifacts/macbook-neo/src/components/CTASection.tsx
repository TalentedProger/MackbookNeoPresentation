import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useModal } from "@/contexts/ModalContext";
import { getText, t } from "@/lib/translations";
import ctaVideo from "@assets/c7a1c978af111a068b61be5df8373888_720w_1775145554792.mp4";

export default function CTASection() {
  const { isDark, isRu } = useTheme();
  const { openPreOrder } = useModal();
  const lang = isRu ? "ru" : "en";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const headlineLines = getText(t.cta.headline, lang).split("\n");

  return (
    <section
      id="cta"
      className="relative overflow-hidden"
      style={{ minHeight: 700 }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src={ctaVideo} type="video/mp4" />
      </video>

      {/* Dark overlay so text is readable */}
      <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }} />

      <div
        ref={ref}
        className="relative max-w-5xl mx-auto px-6 md:px-12 py-32 md:py-48 text-center"
        style={{ zIndex: 2 }}
      >
        {/* Apple logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 fill-white/70"
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
        </motion.div>

        {/* Glassmorphism headline container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5"
        >
          <div
            className="inline-block rounded-3xl px-8 py-6 mb-2"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <h2 className="overflow-hidden">
              {headlineLines.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-white"
                  data-testid={`cta-headline-${i}`}
                >
                  {line}
                </motion.span>
              ))}
            </h2>
          </div>
        </motion.div>

        {/* Glassmorphism body text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="inline-block mb-10 rounded-2xl px-6 py-3"
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <p
            className="text-lg md:text-xl text-white/80"
            data-testid="cta-body"
          >
            {getText(t.cta.body, lang)}
          </p>
        </motion.div>

        {/* Glassmorphism buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
        >
          <motion.button
            onClick={openPreOrder}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            data-testid="btn-cta-buy"
            className="h-12 px-8 rounded-full font-semibold text-base flex items-center transition-all"
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "white",
            }}
          >
            {getText(t.cta.btn1, lang)}
          </motion.button>
          <motion.a
            href="#display"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            data-testid="btn-cta-compare"
            className="h-12 px-8 rounded-full font-semibold text-base flex items-center transition-all"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {getText(t.cta.btn2, lang)}
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-xs text-white/35"
        >
          {getText(t.cta.priceNote, lang)}
        </motion.p>
      </div>
    </section>
  );
}
