"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MessageCircle, ArrowLeft, Send } from "lucide-react"
import { MessageBubble } from "@/components/chat/message-bubble"
import { useAuth } from "@/providers/auth-provider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NewChatDialog } from "@/components/chat/new-chat-dialog"

interface Conversation {
    id: string
    username: string
    lastMessage: string
    timestamp: Date
    unread: number
    online: boolean
}

interface PrivateMessage {
    id: string
    username: string
    content: string
    timestamp: Date
    type: "private"
}

export function PrivateMessages() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
    const [newMessage, setNewMessage] = useState("")
    const [isMobileThreadOpen, setIsMobileThreadOpen] = useState(false)
    const [isNewChatOpen, setIsNewChatOpen] = useState(false)
    const [privateMessages, setPrivateMessages] = useState<Record<string, PrivateMessage[]>>({
        "1": [
            {
                id: "pm1",
                username: "Alice",
                content: "Hey! How are you doing?",
                timestamp: new Date(Date.now() - 300000),
                type: "private",
            },
            {
                id: "pm2",
                username: "Alice",
                content: "I saw your message in the global chat, great work!",
                timestamp: new Date(Date.now() - 240000),
                type: "private",
            },
        ],
        "2": [
            {
                id: "pm3",
                username: "Bob",
                content: "Thanks for the help earlier!",
                timestamp: new Date(Date.now() - 3600000),
                type: "private",
            },
        ],
        "3": [
            {
                id: "pm4",
                username: "Charlie",
                content: "See you tomorrow!",
                timestamp: new Date(Date.now() - 7200000),
                type: "private",
            },
        ],
    })

    const { user } = useAuth()

    const [conversations] = useState<Conversation[]>([
        {
            id: "1",
            username: "Alice",
            lastMessage: "I saw your message in the global chat, great work!",
            timestamp: new Date(Date.now() - 240000),
            unread: 2,
            online: true,
        },
        {
            id: "2",
            username: "Bob",
            lastMessage: "Thanks for the help earlier!",
            timestamp: new Date(Date.now() - 3600000),
            unread: 0,
            online: false,
        },
        {
            id: "3",
            username: "Charlie",
            lastMessage: "See you tomorrow!",
            timestamp: new Date(Date.now() - 7200000),
            unread: 1,
            online: true,
        },
    ])

    const filteredConversations = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        if (!q) return conversations
        return conversations.filter((conv) => conv.username.toLowerCase().includes(q))
    }, [conversations, searchQuery])

    const formatTime = (date: Date) => {
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 60) return `${minutes}m ago`
        if (hours < 24) return `${hours}h ago`
        return `${days}d ago`
    }

    const handleSendPrivateMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || !selectedConversation || !user) return

        const message: PrivateMessage = {
            id: Date.now().toString(),
            username: user.username,
            content: newMessage.trim(),
            timestamp: new Date(),
            type: "private",
        }

        setPrivateMessages((prev) => ({
            ...prev,
            [selectedConversation]: [...(prev[selectedConversation] || []), message],
        }))
        setNewMessage("")
    }

    const selectedConv = conversations.find((c) => c.id === selectedConversation)
    const currentMessages = selectedConversation ? privateMessages[selectedConversation] || [] : []

    const openThread = (id: string) => {
        setSelectedConversation(id)
        // Open slide-over on mobile
        setIsMobileThreadOpen(true)
    }

    const closeThread = () => {
        setIsMobileThreadOpen(false)
        // Keep selection for desktop; on mobile, selection is fine to persist
    }

    const handleStartChat = (userId: string) => {
        setSelectedConversation(userId)
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            setIsMobileThreadOpen(true)
        }
        setIsNewChatOpen(false)
    }

    // Desktop thread pane (md+)
    const DesktopThread = () => {
        if (!selectedConv) {
            return (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hidden md:flex flex-1 items-center justify-center text-center"
                >
                    <div className="space-y-3 px-6">
                        <MessageCircle className="h-12 w-12 text-white/30 mx-auto" />
                        <h3 className="text-white text-lg font-semibold">Select a conversation</h3>
                        <p className="text-white/60 text-sm">Choose a chat to start messaging.</p>
                    </div>
                </motion.div>
            )
        }

        return (
            <motion.div
                key={selectedConv.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
                className="hidden md:flex flex-1 flex-col"
            >
                <div className="p-4 bg-white/10 backdrop-blur-sm border-b border-white/20">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Avatar className="h-10 w-10 bg-white/20 border border-white/30">
                                <AvatarFallback className="text-white bg-transparent">
                                    {selectedConv.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            {selectedConv.online && (
                                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                            )}
                        </div>
                        <div className="min-w-0">
                            <h2 className="font-semibold text-white truncate">{selectedConv.username}</h2>
                            <p className="text-white/60 text-sm">{selectedConv.online ? "Online" : "Offline"}</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence initial={false}>
                        {currentMessages.map((message, index) => (
                            <MessageBubble
                                key={message.id}
                                message={message}
                                isOwn={message.username === user?.username}
                                delay={index * 0.06}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    onSubmit={handleSendPrivateMessage}
                    className="p-4 bg-white/10 backdrop-blur-sm border-t border-white/20"
                >
                    <div className="flex gap-3">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={`Message ${selectedConv.username}...`}
                            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                        />
                        <Button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </motion.form>
            </motion.div>
        )
    }

    return (
        <>
        <div className="flex-1 md:flex md:overflow-hidden">
            {/* Left pane: conversations list */}
            <div className="w-full md:w-80 md:flex-shrink-0 border-r border-white/10 md:h-[calc(100vh-8rem)] md:overflow-y-auto p-4">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search conversations..."
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                        />
                    </div>

                    {/* Desktop New Chat button */}
                    <div className="hidden md:block">
                        <Button
                            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                            onClick={() => setIsNewChatOpen(true)}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            New Chat
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {filteredConversations.length === 0 ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                                <MessageCircle className="h-12 w-12 text-white/30 mx-auto mb-4" />
                                <p className="text-white/60">No conversations found</p>
                            </motion.div>
                        ) : (
                            filteredConversations.map((conversation, index) => (
                                <motion.div
                                    key={conversation.id}
                                    initial={{ y: 16, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <Card
                                        className="bg-white/10 max-sm:w-72 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors cursor-pointer"
                                        onClick={() => {
                                            if (window.innerWidth < 768) {
                                                openThread(conversation.id)
                                            } else {
                                                setSelectedConversation(conversation.id)
                                            }
                                        }}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Avatar className="h-10 w-10 bg-white/20 border border-white/30">
                                                        <AvatarFallback className="text-white bg-transparent">
                                                            {conversation.username.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {conversation.online && (
                                                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h3 className="font-semibold text-white truncate">{conversation.username}</h3>
                                                        <span className="text-white/50 text-xs">{formatTime(conversation.timestamp)}</span>
                                                    </div>
                                                    <p className="text-white/70 text-sm truncate">{conversation.lastMessage}</p>
                                                </div>

                                                {conversation.unread > 0 && (
                                                    <Badge className="bg-blue-500 text-white text-xs">{conversation.unread}</Badge>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>

                {/* Mobile FAB for new chat */}
                <div className="md:hidden fixed bottom-20 right-4 z-40">
                    <Button
                        className="rounded-full bg-white/20 hover:bg-white/30 text-white border-white/30 size-12 p-0 shadow-lg"
                        onClick={() => setIsNewChatOpen(true)}
                        aria-label="Start new chat"
                    >
                        <Plus className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Right pane: thread (desktop) */}
            <DesktopThread />

            {/* Mobile thread slide-over */}
            <div className="md:hidden">
                <Sheet open={isMobileThreadOpen} onOpenChange={setIsMobileThreadOpen}>
                    <SheetTrigger asChild>
                        <span className="hidden" />
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-white/5 border-white/20 p-0 w-full">
                        {selectedConv ? (
                            <div className="flex h-full flex-col">
                                <SheetHeader className="p-4 pb-2">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={closeThread}
                                            className="text-white/80 hover:text-white hover:bg-white/10"
                                        >
                                            <ArrowLeft className="h-4 w-4" />
                                        </Button>
                                        <SheetTitle className="text-white">
                                            {selectedConv.username}
                                        </SheetTitle>
                                    </div>
                                </SheetHeader>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    <AnimatePresence initial={false}>
                                        {currentMessages.map((message, index) => (
                                            <MessageBubble
                                                key={message.id}
                                                message={message}
                                                isOwn={message.username === user?.username}
                                                delay={index * 0.06}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <form onSubmit={handleSendPrivateMessage} className="p-4 bg-white/10 backdrop-blur-sm border-t border-white/20">
                                    <div className="flex gap-3">
                                        <Input
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder={`Message ${selectedConv.username}...`}
                                            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                                        />
                                        <Button type="submit" disabled={!newMessage.trim()} className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center p-6 text-center">
                                <div>
                                    <MessageCircle className="h-12 w-12 text-white/30 mx-auto mb-3" />
                                    <p className="text-white/70">Select a conversation</p>
                                </div>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
        </div>
        <NewChatDialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen} onStartChat={handleStartChat} />
        </>
    )
}
