import { Header } from "@/components/landing/header";
import { LandingHero } from "@/components/landing/hero";
import { LandingFeatures } from "@/components/landing/features";
import { LandingDemo } from "@/components/landing/demo";
import { LandingHowItWorks } from "@/components/landing/how-it-works";
import { LandingPricing } from "@/components/landing/pricing";
import { LandingFaq } from "@/components/landing/faq";
import { LandingFooter } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-3.5rem)] bg-background">
        <LandingHero />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingDemo />
        <LandingPricing />
        <LandingFaq />
        <LandingFooter />
      </main>
    </>
  );
}
