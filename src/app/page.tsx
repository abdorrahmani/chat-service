"use client"

import {useState} from "react"
import {SignupDialog} from "@/components/signup-dialog"
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import FeatureSection from "@/components/feature-section";
import CTASection from "@/components/cta-section";

export default function Home() {
    const [showSignup, setShowSignup] = useState(false)

    return (
        <div className="min-h-screen gradient-bg">
            <Navbar setShowSignup={setShowSignup} />
            <HeroSection setShowSignup={setShowSignup} />
            <FeatureSection/>
            <CTASection setShowSignup={setShowSignup} />

            <SignupDialog open={showSignup} onOpenChange={setShowSignup} />
        </div>
  );
}
