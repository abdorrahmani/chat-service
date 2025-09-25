import {motion} from "framer-motion";
import {Dispatch, SetStateAction} from "react";
import {MessageCircle} from "lucide-react";
import {InteractiveHoverButton} from "@/components/interactive-hover-button";

export default function Navbar({setShowSignup}:{setShowSignup:Dispatch<SetStateAction<boolean>>}) {

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between p-6 backdrop-blur-sm bg-white/10 border-b border-white/20"
        >
            <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                <MessageCircle className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold text-white">ChatFlow</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
                <motion.a
                    href="#features"
                    className="text-white/80 hover:text-white transition-colors"
                    whileHover={{ y: -2 }}
                >
                    Features
                </motion.a>
                <motion.a href="#about" className="text-white/80 hover:text-white transition-colors" whileHover={{ y: -2 }}>
                    About
                </motion.a>
                <motion.a href="#contact" className="text-white/80 hover:text-white transition-colors" whileHover={{ y: -2 }}>
                    Contact
                </motion.a>
            </div>

            <InteractiveHoverButton onClick={() => setShowSignup(true)}   className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                Get Started
            </InteractiveHoverButton>

        </motion.nav>
    );
}