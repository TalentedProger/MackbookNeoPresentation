import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useModal } from "@/contexts/ModalContext";

const colorOptions = [
  { id: "silver", label: { ru: "Серебро", en: "Silver" }, hex: "#E0E0E0", darkHex: "#BCBCBC", gradient: "linear-gradient(135deg, #f0f0f0, #c8c8c8)" },
  { id: "pink", label: { ru: "Розовый", en: "Pink" }, hex: "#F5C5C5", darkHex: "#E8AAAA", gradient: "linear-gradient(135deg, #fce0e0, #e8b0b0)" },
  { id: "yellow", label: { ru: "Жёлтый", en: "Yellow" }, hex: "#D4E87A", darkHex: "#C2D96A", gradient: "linear-gradient(135deg, #e8f09a, #c0d060)" },
  { id: "midnight", label: { ru: "Полночь", en: "Midnight" }, hex: "#3D4F6E", darkHex: "#2D3F5E", gradient: "linear-gradient(135deg, #4a607a, #2a3858)" },
];

const storageOptions = [
  { id: "256", label: "256 ГБ", labelEn: "256 GB", price: 89990, priceEn: 599 },
  { id: "512", label: "512 ГБ", labelEn: "512 GB", price: 99990, priceEn: 699 },
  { id: "1tb", label: "1 ТБ", labelEn: "1 TB", price: 119990, priceEn: 849 },
];

function formatPrice(price: number, isRu: boolean) {
  if (isRu) return `₽${price.toLocaleString("ru-RU")}`;
  return `$${price.toLocaleString("en-US")}`;
}

export default function PreOrderModal() {
  const { isDark, isRu } = useTheme();
  const { isPreOrderOpen, closePreOrder } = useModal();

  const [selectedColor, setSelectedColor] = useState(2);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const currentPrice = storageOptions[selectedStorage];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName || !form.email) return;
    setSubmitted(true);
  }

  function handleClose() {
    closePreOrder();
    setTimeout(() => setSubmitted(false), 400);
  }

  const cardBg = isDark ? "bg-[#1c1c1e]/95 border-white/[0.08]" : "bg-white/95 border-black/[0.06]";
  const labelColor = isDark ? "text-white/50" : "text-black/45";
  const textPrimary = isDark ? "text-white" : "text-black";
  const inputBg = isDark
    ? "bg-white/[0.05] border-white/[0.1] text-white placeholder-white/30 focus:border-white/25"
    : "bg-black/[0.03] border-black/[0.1] text-black placeholder-black/30 focus:border-black/25";

  return (
    <AnimatePresence>
      {isPreOrderOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border backdrop-blur-2xl shadow-2xl pointer-events-auto ${cardBg}`}
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className={`absolute top-5 right-5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isDark ? "bg-white/10 hover:bg-white/20 text-white/70" : "bg-black/7 hover:bg-black/12 text-black/60"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                </svg>
              </button>

              <div className="p-7 md:p-9">
                {submitted ? (
                  /* Success state */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center py-8"
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
                      isDark ? "bg-[#a2d44b]/20" : "bg-[#a2d44b]/15"
                    }`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#a2d44b" strokeWidth="2.5" className="w-8 h-8">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${textPrimary}`}>
                      {isRu ? "Предзаказ оформлен!" : "Order placed!"}
                    </h3>
                    <p className={`text-base mb-1 ${labelColor}`}>
                      {isRu ? "MacBook Neo" : "MacBook Neo"} — {colorOptions[selectedColor].label[isRu ? "ru" : "en"]} · {isRu ? currentPrice.label : currentPrice.labelEn}
                    </p>
                    <p className={`text-sm mb-6 ${labelColor}`}>
                      {isRu ? "Подтверждение придёт на " : "Confirmation will be sent to "}{form.email}
                    </p>
                    <p className={`text-2xl font-bold ${textPrimary}`}>
                      {formatPrice(isRu ? currentPrice.price : currentPrice.priceEn, isRu)}
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="mb-7">
                      <p className={`text-xs font-semibold tracking-widest uppercase mb-1 ${labelColor}`}>
                        {isRu ? "Предзаказ" : "Pre-Order"}
                      </p>
                      <h2 className={`text-2xl font-bold ${textPrimary}`}>MacBook Neo</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Color selection */}
                      <div>
                        <p className={`text-xs font-semibold tracking-wider uppercase mb-3 ${labelColor}`}>
                          {isRu ? "Цвет" : "Color"}
                        </p>
                        <div className="flex items-center gap-3">
                          {colorOptions.map((color, i) => (
                            <button
                              key={color.id}
                              type="button"
                              onClick={() => setSelectedColor(i)}
                              title={color.label[isRu ? "ru" : "en"]}
                              className="relative focus:outline-none"
                            >
                              <div
                                className="w-9 h-9 rounded-full transition-transform"
                                style={{ background: color.gradient }}
                              />
                              {selectedColor === i && (
                                <motion.div
                                  layoutId="colorRing"
                                  className="absolute -inset-1.5 rounded-full border-2"
                                  style={{ borderColor: isDark ? color.hex : color.hex }}
                                />
                              )}
                            </button>
                          ))}
                        </div>
                        <p className={`text-sm mt-2 font-medium ${textPrimary}`}>
                          {colorOptions[selectedColor].label[isRu ? "ru" : "en"]}
                        </p>
                      </div>

                      {/* Storage selection */}
                      <div>
                        <p className={`text-xs font-semibold tracking-wider uppercase mb-3 ${labelColor}`}>
                          {isRu ? "Хранилище" : "Storage"}
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {storageOptions.map((opt, i) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setSelectedStorage(i)}
                              className={`rounded-xl px-3 py-3 border text-center transition-all ${
                                selectedStorage === i
                                  ? isDark
                                    ? "bg-white text-black border-white"
                                    : "bg-black text-white border-black"
                                  : isDark
                                    ? "bg-white/[0.04] border-white/[0.1] text-white hover:bg-white/[0.08]"
                                    : "bg-black/[0.03] border-black/[0.08] text-black hover:bg-black/[0.06]"
                              }`}
                            >
                              <div className="text-sm font-semibold">{isRu ? opt.label : opt.labelEn}</div>
                              <div className={`text-xs mt-0.5 ${
                                selectedStorage === i
                                  ? isDark ? "text-black/60" : "text-white/65"
                                  : labelColor
                              }`}>
                                {formatPrice(isRu ? opt.price : opt.priceEn, isRu)}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Personal details */}
                      <div>
                        <p className={`text-xs font-semibold tracking-wider uppercase mb-3 ${labelColor}`}>
                          {isRu ? "Ваши данные" : "Your details"}
                        </p>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder={isRu ? "Имя" : "First name"}
                              value={form.firstName}
                              onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                              required
                              className={`w-full h-11 px-4 rounded-xl border text-sm outline-none transition-all ${inputBg}`}
                            />
                            <input
                              type="text"
                              placeholder={isRu ? "Фамилия" : "Last name"}
                              value={form.lastName}
                              onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                              className={`w-full h-11 px-4 rounded-xl border text-sm outline-none transition-all ${inputBg}`}
                            />
                          </div>
                          <input
                            type="email"
                            placeholder={isRu ? "Электронная почта" : "Email address"}
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            required
                            className={`w-full h-11 px-4 rounded-xl border text-sm outline-none transition-all ${inputBg}`}
                          />
                        </div>
                      </div>

                      {/* Price summary + submit */}
                      <div className={`pt-4 border-t ${isDark ? "border-white/[0.07]" : "border-black/[0.06]"}`}>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className={`text-sm ${labelColor}`}>MacBook Neo — {colorOptions[selectedColor].label[isRu ? "ru" : "en"]}</p>
                            <p className={`text-xs ${labelColor}`}>{isRu ? currentPrice.label : currentPrice.labelEn}</p>
                          </div>
                          <p className={`text-xl font-bold ${textPrimary}`}>
                            {formatPrice(isRu ? currentPrice.price : currentPrice.priceEn, isRu)}
                          </p>
                        </div>

                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className={`w-full h-12 rounded-full font-semibold text-base transition-all ${
                            isDark
                              ? "bg-white text-black hover:bg-white/90"
                              : "bg-[#1d1d1f] text-white hover:bg-black/85"
                          }`}
                        >
                          {isRu ? "Оформить предзаказ" : "Place Pre-Order"}
                        </motion.button>

                        <p className={`text-center text-xs mt-3 ${labelColor}`}>
                          {isRu
                            ? "Никаких обязательств — только резервирование"
                            : "No charge now — reservation only"}
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
