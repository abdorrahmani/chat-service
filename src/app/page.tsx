"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SignupDialog } from "@/components/signup-dialog"
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import { Zap } from "lucide-react"
import {ShimmerButton} from "@/components/shimmer-button";
import FeatureSection from "@/components/feature-section";

export default function Home() {
    const [showSignup, setShowSignup] = useState(false)

    return (
        <div className="min-h-screen gradient-bg">
            <Navbar setShowSignup={setShowSignup} />
            <HeroSection setShowSignup={setShowSignup} />
            <FeatureSection/>


            {/* Call to Action */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-center mt-24"
            >
                <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
                <p className="text-white/80 text-lg mb-8">Join thousands of users already chatting on ChatFlow</p>

                <ShimmerButton onClick={() => setShowSignup(true)}
                               className="bg-accent hover:bg-accent/90  text-white text-lg inline-flex">
                    <Zap className="mr-2 h-5 w-5" />
                    Join ChatFlow Today
                </ShimmerButton>

            </motion.div>

            <SignupDialog open={showSignup} onOpenChange={setShowSignup} />
        </div>
  );
}
