import { Header } from "@/components/header";
import { HeroSection2 } from "@/components/ui/hero-section-2";
import { FeatureSection } from "@/components/feature-section";
import { FaqsSection } from "@/components/faqs-section";
import { Footer } from "@/components/footer";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <Header />
      <section id="hero">
        <HeroSection2 />
      </section>

      <section id="features">
        <FeatureSection />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <section id="faqs">
        <FaqsSection />
      </section>

      <Footer />
    </>
  );
}