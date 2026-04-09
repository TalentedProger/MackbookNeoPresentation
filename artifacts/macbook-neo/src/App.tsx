import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import ChipSection from "@/components/ChipSection";
import DisplaySection from "@/components/DisplaySection";
import BatterySection from "@/components/BatterySection";
import ColorsSection from "@/components/ColorsSection";
import FeaturesSection from "@/components/FeaturesSection";
import SpecsSection from "@/components/SpecsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PreOrderModal from "@/components/PreOrderModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
});

const SEO_META = {
  en: {
    title: "MacBook Neo 2026 — Hello, Neo. A18 Pro · Liquid Retina · 16h Battery",
    description: "MacBook Neo 2026: Apple A18 Pro chip, 13-inch Liquid Retina display, up to 16 hours battery, silent fanless design. Starting from $599. Buy MacBook Neo — the thinnest premium laptop.",
    ogTitle: "MacBook Neo 2026 — Hello, Neo.",
    ogDesc: "Apple A18 Pro chip. 13-inch Liquid Retina. Up to 16 hours battery. Silent fanless design. Starting from $599.",
  },
  ru: {
    title: "MacBook Neo 2026 — Привет, Neo. Чип A18 Pro · Liquid Retina · 16ч Батарея",
    description: "MacBook Neo 2026: чип Apple A18 Pro, 13-дюймовый Liquid Retina дисплей, до 16 часов автономной работы, бесшумный без вентиляторов. От ₽89 990. Купить MacBook Neo.",
    ogTitle: "MacBook Neo 2026 — Привет, Neo.",
    ogDesc: "Чип Apple A18 Pro. 13-дюймовый Liquid Retina. До 16 часов. Бесшумный. От ₽89 990.",
  },
};

function SeoUpdater() {
  const { isRu } = useTheme();
  const lang = isRu ? "ru" : "en";
  const meta = SEO_META[lang];

  useEffect(() => {
    // Update document title
    document.title = meta.title;

    // Update meta description
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", meta.description);

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update OG meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", meta.ogTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", meta.ogDesc);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", meta.ogTitle);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute("content", meta.ogDesc);
  }, [lang, meta]);

  return null;
}

function MacBookNeoPage() {
  return (
    <div className="min-h-screen">
      <SeoUpdater />
      <Navbar />
      <HeroSection />
      <IntroSection />
      <ChipSection />
      <DisplaySection />
      <BatterySection />
      <ColorsSection />
      <FeaturesSection />
      <SpecsSection />
      <CTASection />
      <Footer />
      <PreOrderModal />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-muted-foreground">Page not found</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={MacBookNeoPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ModalProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </ModalProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
