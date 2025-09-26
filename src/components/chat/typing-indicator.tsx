"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface TypingIndicatorProps {
    username: string
}

export function TypingIndicator({ username }: TypingIndicatorProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex gap-3 max-w-[80%] mr-auto"
        >
            <Avatar className="h-8 w-8 bg-white/20 border border-white/30">
                <AvatarFallback className="text-white text-sm bg-transparent">
                    {username.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <span className="text-white/80 text-sm font-medium">{username}</span>
                    <span className="text-white/50 text-xs">typing...</span>
                </div>

                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="bg-white/10 text-white rounded-2xl rounded-bl-md px-4 py-2 border border-white/20"
                >
                    <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-white/60 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.6, 1, 0.6],
                                }}
                                transition={{
                                    duration: 1.4,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
