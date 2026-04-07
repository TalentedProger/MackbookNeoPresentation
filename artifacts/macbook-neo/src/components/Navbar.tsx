import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getText, t } from "@/lib/translations";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { isDark, isRu, toggleTheme, toggleLanguage } = useTheme();
  const lang = isRu ? "ru" : "en";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  const navLinks = [
    { href: "#overview", label: getText(t.nav.overview, lang) },
    { href: "#display", label: getText(t.nav.specs, lang) },
    { href: "#colors", label: getText(t.nav.colors, lang) },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDark
            ? "bg-black/70 backdrop-blur-2xl border-b border-white/[0.06]"
            : "bg-white/70 backdrop-blur-2xl border-b border-black/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[96rem] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group" data-testid="nav-logo">
          <svg
            viewBox="0 0 24 24"
            className={`w-5 h-5 transition-opacity group-hover:opacity-70 ${isDark ? "fill-white" : "fill-black"}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <span className={`text-sm font-semibold tracking-tight ${isDark ? "text-white" : "text-black"}`}>
            MacBook Neo
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-all duration-200 hover:opacity-60 ${
                isDark ? "text-white/80" : "text-black/70"
              }`}
              data-testid={`nav-link-${link.href.slice(1)}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 relative z-50">
          <div className="hidden md:flex items-center gap-2">
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="btn-toggle-language"
              className={`relative flex items-center h-7 rounded-full text-xs font-semibold px-3 transition-all duration-300 border ${
                isDark
                  ? "bg-white/10 border-white/15 text-white hover:bg-white/20"
                  : "bg-black/5 border-black/10 text-black hover:bg-black/10"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                >
                  {isRu ? "РУ" : "EN"}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="btn-toggle-theme"
              className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 border ${
                isDark
                  ? "bg-white/10 border-white/15 text-white hover:bg-white/20"
                  : "bg-black/5 border-black/10 text-black hover:bg-black/10"
              }`}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            data-testid="btn-nav-buy"
            className={`hidden md:flex items-center h-7 rounded-full text-xs font-semibold px-4 transition-all duration-200 ${
              isDark
                ? "bg-white text-black hover:bg-white/90"
                : "bg-black text-white hover:bg-black/85"
            }`}
          >
            {getText(t.nav.buy, lang)}
          </motion.button>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="btn-mobile-menu"
          >
            <div className="w-5 h-3.5 relative flex flex-col justify-between">
              <span className={`absolute left-0 w-full h-[1.5px] rounded-full transition-all duration-300 ease-out origin-center ${isDark ? "bg-white" : "bg-black"} ${mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1.5px] rounded-full transition-all duration-200 ease-out origin-center ${isDark ? "bg-white" : "bg-black"} ${mobileOpen ? "opacity-0 scale-x-0" : "opacity-100"}`} />
              <span className={`absolute left-0 w-full h-[1.5px] rounded-full transition-all duration-300 ease-out origin-center ${isDark ? "bg-white" : "bg-black"} ${mobileOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0px at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150vmax at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0px at top right)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "clip-path, opacity", transform: "translateZ(0)" }}
            className={`fixed inset-0 z-40 md:hidden w-full h-[100dvh] flex flex-col pb-8 pt-24 px-8 overscroll-contain ${
              isDark ? "bg-[#0a0a0a]" : "bg-[#f5f5f7]"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Navigation links */}
              <div className="flex flex-col gap-6 flex-1 mt-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-black"}`}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Bottom block: toggles + action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-6 w-full shrink-0"
              >
                <div className={`h-14 px-4 rounded-2xl flex items-center justify-between border ${
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-black/[0.02] border-black/10"
                }`}>
                  <span className={`text-sm font-medium ${isDark ? "text-white/60" : "text-black/60"}`}>
                    {isRu ? "Настройки" : "Settings"}
                  </span>
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={toggleLanguage}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center h-10 w-16 justify-center rounded-2xl text-sm font-semibold transition-all ${
                        isDark ? "bg-white/10 text-white" : "bg-black/5 text-black"
                      }`}
                    >
                      {isRu ? "РУ" : "EN"}
                    </motion.button>

                    <motion.button
                      onClick={toggleTheme}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-all ${
                        isDark ? "bg-white/10 text-white" : "bg-black/5 text-black"
                      }`}
                    >
                      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </motion.button>
                  </div>
                </div>

                <a
                  href="#cta"
                  onClick={() => setMobileOpen(false)}
                  className={`w-full flex items-center justify-center h-14 rounded-full text-base font-semibold transition-all ${
                    isDark ? "bg-white text-black" : "bg-black text-white"
                  }`}
                >
                  {getText(t.nav.buy, lang)}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
