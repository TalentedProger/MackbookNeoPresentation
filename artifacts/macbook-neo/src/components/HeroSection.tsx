import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useModal } from "@/contexts/ModalContext";
import { getText, t } from "@/lib/translations";
import heroImg from "@assets/mac_neo-Photoroom_1775147607008.png";

export default function HeroSection() {
  const { isDark, isRu } = useTheme();
  const { openPreOrder } = useModal();
  const lang = isRu ? "ru" : "en";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"], layoutEffect: false });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="overview"
      className={`relative min-h-screen flex flex-col items-center overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-[#1a1a1a]" : "bg-[#f5f5f7]"
      }`}
    >
      {/* Text content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-32 md:pt-36 w-full"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-sm font-medium tracking-tight mb-2 ${
            isDark ? "text-white/60" : "text-black/55"
          }`}
          data-testid="hero-eyebrow"
        >
          MacBook Neo
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className={`text-[56px] sm:text-[68px] md:text-[80px] lg:text-[96px] font-black tracking-tight leading-none mb-7 ${
            isDark ? "text-white" : "text-black"
          }`}
          data-testid="hero-headline-0"
        >
          {isRu ? "Привет, Нео." : "Hello, Neo."}
        </motion.h1>

        {/* Buy button + price */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="flex flex-col items-center gap-2.5"
        >
          <motion.button
            onClick={openPreOrder}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            data-testid="btn-hero-cta1"
            className={`h-10 px-7 rounded-full font-semibold text-sm transition-all duration-200 ${
              isDark
                ? "bg-white text-black hover:bg-white/90"
                : "bg-[#1d1d1f] text-white hover:bg-black/80"
            }`}
          >
            {isRu ? "Купить" : "Buy"}
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.48 }}
            className={`text-[13px] ${isDark ? "text-white/45" : "text-black/45"}`}
            data-testid="hero-subheading"
          >
            {isRu
              ? "От ₽89 990 или ₽7 499/мес. на 12 мес.*"
              : "From $599 or $49.91/mo. for 12 mo.*"}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Hero image — hand holding MacBook */}
      <motion.div
        style={{ y: imgY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-xl md:max-w-2xl mx-auto px-4 mt-6"
      >
        <img
          src={heroImg}
          alt="MacBook Neo"
          className="w-full object-contain"
          data-testid="img-hero"
        />
      </motion.div>

    </section>
  );
}
