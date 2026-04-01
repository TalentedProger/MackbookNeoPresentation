import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getText, t } from "@/lib/translations";
import heroFrontImg from "@assets/generated_images/macbook_hero_front.png";
import silverTopImg from "@assets/generated_images/macbook_silver_top.png";

export default function HeroSection() {
  const { isDark, isRu } = useTheme();
  const lang = isRu ? "ru" : "en";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"], layoutEffect: false });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const headlineLines = getText(t.hero.headline, lang).split("\n");

  return (
    <section
      ref={ref}
      id="overview"
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 transition-all duration-700 ${
        isDark
          ? "bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(162,212,75,0.12),transparent)]"
          : "bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(162,212,75,0.15),transparent)]"
      }`} />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-16 md:pt-36"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full border transition-all ${
            isDark
              ? "text-white/50 border-white/10 bg-white/5"
              : "text-black/40 border-black/10 bg-black/5"
          }`}
          data-testid="hero-eyebrow"
        >
          {getText(t.hero.eyebrow, lang)}
        </motion.div>

        {/* Headline */}
        <h1 className="overflow-hidden mb-6">
          {headlineLines.map((line, i) => (
            <motion.span
              key={i}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] ${
                isDark ? "text-white" : "text-black"
              }`}
              data-testid={`hero-headline-${i}`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className={`text-base md:text-lg max-w-xl mb-8 leading-relaxed ${
            isDark ? "text-white/55" : "text-black/50"
          }`}
          data-testid="hero-subheading"
        >
          {getText(t.hero.subheading, lang)}{" "}
          <span className={`font-semibold ${isDark ? "text-white" : "text-black"}`}>
            {getText(t.hero.price, lang)}
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex items-center gap-3 mb-16"
        >
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            data-testid="btn-hero-cta1"
            className={`h-11 px-7 rounded-full font-semibold text-sm flex items-center transition-all duration-200 ${
              isDark
                ? "bg-white text-black hover:bg-white/90"
                : "bg-black text-white hover:bg-black/85"
            }`}
          >
            {getText(t.hero.cta1, lang)}
          </motion.a>
          <motion.a
            href="#chip"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            data-testid="btn-hero-cta2"
            className={`h-11 px-7 rounded-full font-semibold text-sm flex items-center border transition-all duration-200 ${
              isDark
                ? "border-white/20 text-white hover:bg-white/5"
                : "border-black/20 text-black hover:bg-black/5"
            }`}
          >
            {getText(t.hero.cta2, lang)} →
          </motion.a>
        </motion.div>

        {/* Product Images — no movement animations */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-end justify-center gap-6 md:gap-12 max-w-4xl w-full"
        >
          <div className="relative w-52 md:w-72 lg:w-80">
            <img
              src={heroFrontImg}
              alt="MacBook Neo front view"
              className="w-full object-contain drop-shadow-2xl"
              data-testid="img-hero-hand1"
            />
          </div>

          <div className="relative w-44 md:w-60 lg:w-72 -mt-8">
            <img
              src={silverTopImg}
              alt="MacBook Neo top view"
              className="w-full object-contain drop-shadow-2xl"
              data-testid="img-hero-hand2"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-full border ${
                isDark
                  ? "bg-white/5 border-white/10 text-white/50"
                  : "bg-black/5 border-black/8 text-black/40"
              }`}
            >
              {getText(t.hero.holdingCaption, lang)}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className={`w-5 h-8 rounded-full border flex items-start justify-center pt-1 ${
            isDark ? "border-white/20" : "border-black/15"
          }`}
        >
          <div className={`w-1 h-2 rounded-full ${isDark ? "bg-white/40" : "bg-black/30"}`} />
        </motion.div>
      </motion.div>
    </section>
  );
}
