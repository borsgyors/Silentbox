import HeroSection from './components/HeroSection';
import ClientLogos from './components/ClientLogos';
import ProblemSection from './components/ProblemSection';
import ProductSection from './components/ProductSection';
import CustomerFitSection from './components/CustomerFitSection';
import InteractiveBooth from './components/InteractiveBooth';
import SoundComparison from './components/SoundComparison';
import SalesFlowSection from './components/SalesFlowSection';
import EnvironmentSection from './components/EnvironmentSection';
import TechnologySection from './components/TechnologySection';
import CustomizationSection from './components/CustomizationSection';
import ShowroomSection from './components/ShowroomSection';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import QuoteRequest from './components/QuoteRequest';
import TopNavigation from './components/TopNavigation';
import { LanguageProvider } from './components/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div
        className="relative w-full overflow-x-hidden bg-[var(--warm-white)] text-[var(--graphite)]"
        style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
      >
        <TopNavigation />
        <HeroSection />
        <ClientLogos />
        <ProblemSection />
        <ProductSection />
        <CustomerFitSection />
        <InteractiveBooth />
        <SoundComparison />
        <SalesFlowSection />
        <EnvironmentSection />
        <TechnologySection />
        <CustomizationSection />
        <ShowroomSection />
        <Testimonials />
        <FinalCTA />
        <QuoteRequest />
      </div>
    </LanguageProvider>
  );
}
