"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SignupDialog } from "@/components/signup-dialog"
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import { MessageCircle, Users, Shield, Zap } from "lucide-react"
import {ShimmerButton} from "@/components/shimmer-button";

export default function Home() {
    const [showSignup, setShowSignup] = useState(false)

    return (
        <div className="min-h-screen gradient-bg">
            <Navbar setShowSignup={setShowSignup} />
            <HeroSection setShowSignup={setShowSignup} />

            {/* Features Grid */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid md:grid-cols-3 gap-8 mt-24"
                id="features"
            >
                <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                    <Users className="h-12 w-12 text-white mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-3">Global Chat</h3>
                    <p className="text-white/70">
                        Join the worldwide conversation. Share ideas, meet new people, and be part of a vibrant community.
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                    <MessageCircle className="h-12 w-12 text-white mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-3">Private Messages</h3>
                    <p className="text-white/70">
                        Have intimate conversations with friends. Your privacy is protected with end-to-end security.
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                    <Shield className="h-12 w-12 text-white mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-3">Secure & Fast</h3>
                    <p className="text-white/70">
                        Lightning-fast messaging with enterprise-grade security. Your data stays safe and private.
                    </p>
                </motion.div>
            </motion.div>

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
