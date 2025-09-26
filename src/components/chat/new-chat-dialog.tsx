"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, MessageCircle } from "lucide-react"

interface User {
    id: string
    username: string
    online: boolean
}

interface NewChatDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onStartChat: (userId: string) => void
}

export function NewChatDialog({ open, onOpenChange, onStartChat }: NewChatDialogProps) {
    const [searchQuery, setSearchQuery] = useState("")

    // Demo users from global chat
    const [users] = useState<User[]>([
        { id: "1", username: "Alice", online: true },
        { id: "2", username: "Bob", online: false },
        { id: "3", username: "Charlie", online: true },
        { id: "4", username: "Diana", online: true },
        { id: "5", username: "Eve", online: false },
    ])

    const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(searchQuery.toLowerCase()))

    const handleStartChat = (userId: string) => {
        onStartChat(userId)
        onOpenChange(false)
        setSearchQuery("")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] sm:max-w-md gradient-bg border-white/20 p-4 sm:p-6">
                <DialogHeader>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center mb-4"
                    >
                        <div className="bg-white/20 p-3 rounded-full">
                            <MessageCircle className="h-8 w-8 text-white" />
                        </div>
                    </motion.div>
                    <DialogTitle className="text-center text-2xl font-bold text-white">Start New Chat</DialogTitle>
                </DialogHeader>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="space-y-4"
                >
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search users..."
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                        />
                    </div>

                    {/* Users List */}
                    <div className="max-h-[60vh] sm:max-h-64 overflow-y-auto space-y-2">
                        {filteredUsers.map((user) => (
                            <motion.div
                                key={user.id}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 cursor-pointer transition-colors"
                                onClick={() => handleStartChat(user.id)}
                            >
                                <div className="relative">
                                    <Avatar className="h-10 w-10 bg-white/20 border border-white/30">
                                        <AvatarFallback className="text-white bg-transparent">
                                            {user.username.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    {user.online && (
                                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-white">{user.username}</p>
                                    <p className="text-white/60 text-sm">{user.online ? "Online" : "Offline"}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-white/60">No users found</p>
                        </div>
                    )}
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}
