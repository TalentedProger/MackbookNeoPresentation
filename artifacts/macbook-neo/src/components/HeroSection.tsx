import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useModal } from "@/contexts/ModalContext";
import { getText, t } from "@/lib/translations";
import heroBgImg from "@assets/image_1775062959118.png";

export default function HeroSection() {
  const { isDark, isRu } = useTheme();
  const { openPreOrder } = useModal();
  const lang = isRu ? "ru" : "en";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"], layoutEffect: false });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={ref}
      id="overview"
      className={`relative min-h-screen flex flex-col items-center justify-start overflow-hidden ${
        isDark ? "bg-[#111]" : "bg-[#f5f5f7]"
      }`}
    >
      {/* Background image */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={heroBgImg}
          alt="MacBook Neo hero background"
          className="w-full h-full object-cover object-top"
        />
        {/* Top solid mask — covers the reference image's embedded text */}
        <div className={`absolute top-0 left-0 right-0 h-[30%] ${
          isDark ? "bg-[#111]" : "bg-[#f5f5f7]"
        }`} />
        {/* Fade from solid to transparent */}
        <div className={`absolute top-[30%] left-0 right-0 h-[18%] ${
          isDark
            ? "bg-gradient-to-b from-[#111] to-transparent"
            : "bg-gradient-to-b from-[#f5f5f7] to-transparent"
        }`} />
        {/* Dark overlay for dark mode (subtle) */}
        {isDark && (
          <div className="absolute inset-0 bg-black/30" />
        )}
        {/* Gradient at bottom to fade into next section */}
        <div className={`absolute bottom-0 left-0 right-0 h-48 ${
          isDark
            ? "bg-gradient-to-t from-[#111] to-transparent"
            : "bg-gradient-to-t from-[#f5f5f7] to-transparent"
        }`} />
      </motion.div>

      {/* Content — overlaid on photo */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-32 md:pt-36 w-full"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-sm font-medium tracking-wide mb-2 ${
            isDark ? "text-white/70" : "text-black/60"
          }`}
          data-testid="hero-eyebrow"
        >
          MacBook Neo
        </motion.p>

        {/* Headline — "Hello, Neo." style */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6 ${
            isDark ? "text-white" : "text-black"
          }`}
          data-testid="hero-headline-0"
        >
          {isRu ? "Привет, Нео." : "Hello, Neo."}
        </motion.h1>

        {/* Buy button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.button
            onClick={openPreOrder}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            data-testid="btn-hero-cta1"
            className={`h-11 px-8 rounded-full font-semibold text-sm transition-all duration-200 shadow-lg ${
              isDark
                ? "bg-white text-black hover:bg-white/90"
                : "bg-[#1d1d1f] text-white hover:bg-black/85"
            }`}
          >
            {isRu ? "Купить" : "Buy"}
          </motion.button>

          {/* Price below button */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            className={`text-sm ${isDark ? "text-white/60" : "text-black/55"}`}
            data-testid="hero-subheading"
          >
            {isRu
              ? "От ₽89 990 или ₽7 499/мес. на 12 мес.*"
              : "From $599 or $49.91/mo. for 12 mo.*"}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className={`w-5 h-8 rounded-full border flex items-start justify-center pt-1 ${
            isDark ? "border-white/25" : "border-black/20"
          }`}
        >
          <div className={`w-1 h-2 rounded-full ${isDark ? "bg-white/50" : "bg-black/35"}`} />
        </motion.div>
      </motion.div>
    </section>
  );
}
