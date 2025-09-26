"use client"
import {motion, type Variants, type Target} from "framer-motion";
import {MessageCircle, Github, Twitter, Linkedin} from "lucide-react";

export function Footer() {
    const containerVariants: Variants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0},
    };

    const linkHover: Target = {y: -2, opacity: 1};

    return (
        <footer className="mt-16 border-t border-white/15 bg-white/5/0">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.2}}
                variants={containerVariants}
                transition={{duration: 0.6, ease: "easeOut"}}
                className="mx-auto w-full max-w-6xl px-4 md:px-6"
            >
                <div className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <motion.div whileHover={{scale: 1.05}} className="inline-flex items-center gap-2">
                            <MessageCircle className="h-7 w-7 text-white" />
                            <span className="text-lg font-semibold text-white">ChatFlow</span>
                        </motion.div>
                        <span className="hidden text-white/40 md:inline">•</span>
                        <p className="hidden text-sm text-white/70 md:block">
                            Conversational experiences, reimagined.
                        </p>
                    </div>

                    <nav className="flex flex-wrap items-center gap-6 text-sm">
                        <motion.a whileHover={linkHover} href="#features" className="text-white/80 hover:text-white">
                            Features
                        </motion.a>
                        <motion.a whileHover={linkHover} href="#about" className="text-white/80 hover:text-white">
                            About
                        </motion.a>
                        <motion.a whileHover={linkHover} href="#contact" className="text-white/80 hover:text-white">
                            Contact
                        </motion.a>
                    </nav>
                </div>

                <motion.div
                    initial={{scaleX: 0}}
                    whileInView={{scaleX: 1}}
                    viewport={{once: true}}
                    transition={{duration: 0.7, ease: "easeOut"}}
                    className="origin-left h-px w-full bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                />

                <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
                    <p className="text-xs text-white/60">
                        © {new Date().getFullYear()} ChatFlow. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <motion.a
                            href="https://github.com/Anophell"
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{y: -2}}
                            className="text-white/70 transition-colors hover:text-white"
                            aria-label="GitHub"
                        >
                            <Github className="h-5 w-5" />
                        </motion.a>
                        <motion.a
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{y: -2}}
                            className="text-white/70 transition-colors hover:text-white"
                            aria-label="Twitter"
                        >
                            <Twitter className="h-5 w-5" />
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com/"
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{y: -2}}
                            className="text-white/70 transition-colors hover:text-white"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-5 w-5" />
                        </motion.a>
                    </div>
                </div>
            </motion.div>

            <motion.div
                aria-hidden
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                viewport={{once: true}}
                transition={{duration: 1.2}}
                className="pointer-events-none absolute inset-0 -z-10"
            >
                <div className="absolute -bottom-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-[#7c3aed]/20 blur-3xl" />
            </motion.div>
        </footer>
    );
}


