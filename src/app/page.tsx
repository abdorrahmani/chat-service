"use client";

import {
  CTASection,
  FeatureSection,
  Footer,
  HeroSection,
  Navbar,
  SignupDialog,
} from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <CTASection />

      <SignupDialog />
      <Footer />
    </div>
  );
}
