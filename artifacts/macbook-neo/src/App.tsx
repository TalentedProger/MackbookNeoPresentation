import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ModalProvider } from "@/contexts/ModalContext";
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

const queryClient = new QueryClient();

function MacBookNeoPage() {
  return (
    <div className="min-h-screen">
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
