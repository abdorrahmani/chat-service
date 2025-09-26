import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {ShimmerButton} from "@/components/shimmer-button";
import {Dispatch, SetStateAction} from "react";
import {AuroraText} from "@/components/aurora-text";

export default function HeroSection({setShowSignup}:{setShowSignup:Dispatch<SetStateAction<boolean>>}) {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="text-center max-w-4xl mx-auto">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 text-balance"
                >
                    Connect, Chat,
                    <AuroraText colors={["#fff","#FF0080", "#ceadee"]}> Collaborate</AuroraText>
                </motion.h1>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/80 mb-8 md:mb-12 max-w-2xl mx-auto text-pretty px-4"
                >
                    Experience seamless communication with our modern chat platform. Join global conversations, connect
                    privately, and build meaningful relationships.
                </motion.p>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center px-4"
                >
                    <ShimmerButton onClick={() => setShowSignup(true)}>
                        Start Chatting Now
                    </ShimmerButton>
                    <Button
                        variant="outline"
                        size="lg"
                        className="border-white/30 text-white hover:bg-white/10 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-transparent w-full sm:w-auto"
                    >
                        Learn More
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}