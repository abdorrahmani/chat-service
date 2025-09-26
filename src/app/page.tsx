"use client"

import {useState} from "react"
import {SignupDialog} from "@/components/signup-dialog"
import {Navbar,HeroSection,FeatureSection,CTASection,Footer} from "@/components";

export default function Home() {
    const [showSignup, setShowSignup] = useState(false)

    return (
        <div className="min-h-screen gradient-bg">
            <Navbar setShowSignup={setShowSignup} />
            <HeroSection setShowSignup={setShowSignup} />
            <FeatureSection/>
            <CTASection setShowSignup={setShowSignup} />

            <SignupDialog open={showSignup} onOpenChange={setShowSignup} />
            <Footer/>
        </div>
  );
}
