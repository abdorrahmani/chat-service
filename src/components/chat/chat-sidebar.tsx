"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageCircle, Users, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatSidebarProps {
    activeTab: "global" | "profile" | "private"
    onTabChange: (tab: "global" | "profile" | "private") => void
    onLogout: () => void
    className?: string
}

export function ChatSidebar({ activeTab, onTabChange, onLogout, className }: ChatSidebarProps) {
    const tabs = [
        { id: "global" as const, label: "Global Chat", icon: Users },
        { id: "profile" as const, label: "Profile", icon: User },
        { id: "private" as const, label: "Messages", icon: MessageCircle },
    ]

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={cn(
                "relative w-64 bg-white/5 backdrop-blur-sm border-r border-white/20 p-4 h-full",
                className,
            )}
        >
            <div className="flex items-center gap-2 mb-8">
                <MessageCircle className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold text-white">ChatFlow</span>
            </div>

            <nav className="space-y-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                        <Button
                            key={tab.id}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start text-white/80 hover:text-white hover:bg-white/10",
                                activeTab === tab.id && "bg-white/20 text-white",
                            )}
                            onClick={() => onTabChange(tab.id)}
                        >
                            <Icon className="mr-3 h-4 w-4" />
                            {tab.label}
                        </Button>
                    )
                })}
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                    onClick={onLogout}
                >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </motion.aside>
    )
}
