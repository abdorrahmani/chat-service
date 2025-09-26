import {AnimatePresence, motion} from "framer-motion";
import {Dispatch, SetStateAction, useState} from "react";
import {MessageCircle} from "lucide-react";
import {InteractiveHoverButton} from "@/components/interactive-hover-button";
import {Button} from "@/components/ui/button";

export default function Navbar({setShowSignup}:{setShowSignup:Dispatch<SetStateAction<boolean>>}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
     <>
         <motion.nav
             initial={{ y: -50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.6 }}
             className="flex items-center justify-between p-4 md:p-6 backdrop-blur-sm bg-white/10 border-b border-white/20"
         >
             <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                 <MessageCircle className="h-6 w-6 md:h-8 md:w-8 text-white" />
                 <span className="text-xl md:text-2xl font-bold text-white">ChatFlow</span>
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

             <div className="flex items-center gap-2">
                 <InteractiveHoverButton onClick={() => setShowSignup(true)}
                                         className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <span>
                    Join
                </span>
                 </InteractiveHoverButton>

                 <Button
                     variant="ghost"
                     size="sm"
                     className="md:hidden text-white"
                     onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                 >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                     </svg>
                 </Button>

             </div>
         </motion.nav>

         <AnimatePresence>
             {mobileMenuOpen && (
                 <motion.div
                     initial={{ opacity: 0, y: -20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }}
                     className="md:hidden absolute w-full bg-white/10 backdrop-blur-sm border-b border-white/20 p-4"
                 >
                     <div className="flex flex-col gap-4">
                         <a href="#features" className="text-white/80 hover:text-white transition-colors py-2">
                             Features
                         </a>
                         <a href="#about" className="text-white/80 hover:text-white transition-colors py-2">
                             About
                         </a>
                         <a href="#contact" className="text-white/80 hover:text-white transition-colors py-2">
                             Contact
                         </a>
                     </div>
                 </motion.div>
             )}
         </AnimatePresence>

     </>
    );
}