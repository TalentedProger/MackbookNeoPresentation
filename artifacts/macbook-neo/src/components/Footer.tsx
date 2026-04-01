import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getText, t } from "@/lib/translations";

export default function Footer() {
  const { isDark, isRu } = useTheme();
  const lang = isRu ? "ru" : "en";

  const links = isRu
    ? ["Конфиденциальность", "Условия использования", "Карта сайта", "Техподдержка", "О компании"]
    : ["Privacy", "Terms of Use", "Sitemap", "Support", "About"];

  return (
    <footer className={`relative border-t transition-colors duration-700 ${
      isDark
        ? "bg-[#0a0a0a] border-white/[0.05]"
        : "bg-[#f5f5f7] border-black/[0.06]"
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        {/* Top: Logo + tagline */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className={`w-5 h-5 ${isDark ? "fill-white/40" : "fill-black/30"}`}
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span className={`text-sm ${isDark ? "text-white/40" : "text-black/35"}`}>
              {getText(t.footer.tagline, lang)}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link, i) => (
              <a
                key={i}
                href="#"
                className={`text-xs transition-all hover:opacity-60 ${
                  isDark ? "text-white/35" : "text-black/35"
                }`}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom: copyright + disclaimer */}
        <div className={`border-t pt-6 ${isDark ? "border-white/[0.04]" : "border-black/[0.05]"}`}>
          <p className={`text-xs leading-relaxed ${isDark ? "text-white/25" : "text-black/25"}`}>
            {getText(t.footer.copy, lang)}
          </p>
          <p className={`text-xs mt-2 leading-relaxed max-w-3xl ${isDark ? "text-white/20" : "text-black/20"}`}>
            {isRu
              ? "Цены указаны ориентировочно. Фактические цены могут отличаться в зависимости от региона. MacBook Neo — концептуальное устройство 2026 года."
              : "Prices are approximate. Actual prices may vary by region. MacBook Neo is a 2026 concept device."
            }
          </p>
        </div>
      </div>
    </footer>
  );
}
