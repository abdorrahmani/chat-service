"use client"

import { motion, useSpring, useTransform } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface Message {
    id: string
    username: string
    content: string
    timestamp: Date
    type: "global" | "private"
}

interface MessageBubbleProps {
    message: Message
    isOwn: boolean
    delay?: number
}

export function MessageBubble({ message, isOwn, delay = 0 }: MessageBubbleProps) {
    const [isVisible, setIsVisible] = useState(false)

    // iPhone-style drop animation with spring physics
    const y = useSpring(50, { stiffness: 300, damping: 30 })
    const opacity = useSpring(0, { stiffness: 300, damping: 30 })
    const scale = useSpring(0.8, { stiffness: 400, damping: 25 })

    // Transform values for smooth animation
    const yTransform = useTransform(y, [50, 0], [50, 0])
    const opacityTransform = useTransform(opacity, [0, 1], [0, 1])
    const scaleTransform = useTransform(scale, [0.8, 1], [0.8, 1])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
            // Animate to final values with iPhone-like timing
            y.set(0)
            opacity.set(1)
            scale.set(1)
        }, delay * 1000)

        return () => clearTimeout(timer)
    }, [delay, y, opacity, scale])

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    return (
        <motion.div
            style={{
                y: yTransform,
                opacity: opacityTransform,
                scale: scaleTransform,
            }}
            className={cn("flex gap-2 md:gap-3 max-w-[85%] sm:max-w-[80%]", isOwn ? "ml-auto flex-row-reverse" : "mr-auto")}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    delay: delay + 0.1,
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                }}
            >
                <Avatar className="h-6 w-6 md:h-8 md:w-8 bg-white/20 border border-white/30 flex-shrink-0">
                    <AvatarFallback className="text-white text-xs md:text-sm bg-transparent">
                        {message.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </motion.div>

            <div className={cn("space-y-1", isOwn ? "text-right" : "text-left")}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay + 0.2, duration: 0.3 }}
                    className="flex items-center gap-2"
                >
                    <span className="text-white/80 text-sm font-medium">{message.username}</span>
                    <span className="text-white/50 text-xs">{formatTime(message.timestamp)}</span>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        delay: delay + 0.3,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    }}
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                    }}
                    className={cn(
                        "rounded-2xl px-4 py-2 max-w-md break-words backdrop-blur-sm",
                        isOwn
                            ? "bg-white/20 text-white rounded-br-md border border-white/30"
                            : "bg-white/10 text-white rounded-bl-md border border-white/20",
                    )}
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: delay + 0.4, duration: 0.4 }}
                        className="text-sm leading-relaxed"
                    >
                        {message.content}
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    )
}
