"use client"

import {SignupDialog} from "@/components/signup-dialog"
import {Navbar,HeroSection,FeatureSection,CTASection,Footer} from "@/components";

export default function Home() {
    return (
        <div className="min-h-screen gradient-bg">
            <Navbar />
            <HeroSection />
            <FeatureSection/>
            <CTASection />

            <SignupDialog />
            <Footer/>
        </div>
  );
}
