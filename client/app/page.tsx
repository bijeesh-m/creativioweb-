import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
// import ServicesSection from "@/components/home/ServicesSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import InsightsSection from "@/components/home/InsightsSection";
import CTASection from "@/components/home/CTASection";
import ServicesSection from "@/components/others/ServicesSection";
import ClientSection from "@/components/home/ClientSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ClientSection />
      <TestimonialSection />
      <InsightsSection />
      <CTASection />
    </>
  );
}
