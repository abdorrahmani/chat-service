import {motion} from "framer-motion";
import {ShimmerButton} from "@/components/shimmer-button";
import {Zap} from "lucide-react";
import {Dispatch, SetStateAction} from "react";

export default function CTASection({setShowSignup}: {setShowSignup:Dispatch<SetStateAction<boolean>>}) {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-center mt-16 md:mt-24 px-4"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Ready to get started?</h2>
            <p className="text-white/80 text-base md:text-lg mb-6 md:mb-8">
                Join thousands of users already chatting on ChatFlow
            </p>

            <ShimmerButton onClick={() => setShowSignup(true)}
                           className="bg-accent hover:bg-accent/90  text-white text-lg inline-flex">
                <Zap className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Join ChatFlow Today
            </ShimmerButton>
        </motion.div>
    );
}