"use client"

import {useEffect, useRef, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {LogOut, User, Users} from "lucide-react"
import {useAuth} from "@/providers/auth-provider"
import {useRouter} from "next/navigation"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    ChatSidebar,
    MessageBubble,
    MessageInput,
    PrivateMessages,
    TypingIndicator,
    UserProfile
} from "@/components/chat"

import {Button} from "@/components/ui/button"

interface Message {
    id: string
    username: string
    content: string
    timestamp: Date
    type: "global" | "private"
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [activeTab, setActiveTab] = useState<"global" | "profile" | "private">("global")
    const [showTyping, setShowTyping] = useState(false)
    const { user, logout } = useAuth()
    const router = useRouter()
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Initialize with some demo messages
    useEffect(() => {
        const demoMessages: Message[] = [
            {
                id: "1",
                username: "Alice",
                content: "Hey everyone! Welcome to ChatFlow!",
                timestamp: new Date(Date.now() - 300000),
                type: "global",
            },
            {
                id: "2",
                username: "Bob",
                content: "This is amazing! Love the smooth animations.",
                timestamp: new Date(Date.now() - 240000),
                type: "global",
            },
            {
                id: "3",
                username: "Charlie",
                content: "The design is so clean and modern. Great work!",
                timestamp: new Date(Date.now() - 180000),
                type: "global",
            },
        ]
        setMessages(demoMessages)
    }, [])

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, showTyping])

    const handleSendMessage = (content: string) => {
        if (!user) return

        // Show typing indicator briefly
        setShowTyping(true)

        setTimeout(() => {
            const message: Message = {
                id: Date.now().toString(),
                username: user.username,
                content,
                timestamp: new Date(),
                type: "global",
            }

            setMessages((prev) => [...prev, message])
            setShowTyping(false)
        }, 500) // Brief delay to show typing
    }

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return <UserProfile />
            case "private":
                return <PrivateMessages />
            default:
                return (
                    <>
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            <AnimatePresence mode="popLayout">
                                {messages.map((message, index) => (
                                    <MessageBubble
                                        key={message.id}
                                        message={message}
                                        isOwn={message.username === user?.username}
                                        delay={index * 0.05} // Staggered animation
                                    />
                                ))}

                                {/* Typing Indicator */}
                                {showTyping && <TypingIndicator username="Someone" />}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Enhanced Message Input */}
                        <MessageInput onSendMessage={handleSendMessage} placeholder="Type your message..." />
                    </>
                )
        }
    }

    const getHeaderContent = () => {
        switch (activeTab) {
            case "profile":
                return {
                    icon: User,
                    title: "Your Profile",
                    subtitle: "Manage your account settings",
                }
            case "private":
                return {
                    icon: Users,
                    title: "Private Messages",
                    subtitle: "Your direct conversations",
                }
            default:
                return {
                    icon: Users,
                    title: "Global Chat",
                    subtitle: "Connect with everyone",
                }
        }
    }

    const headerContent = getHeaderContent()
    const HeaderIcon = headerContent.icon

    const MobileSidebarToggle = () => {
        return (
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/80 hover:text-white hover:bg-white/10"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-white/5 border-white/20 p-0">
                        <ChatSidebar
                            activeTab={activeTab}
                            onTabChange={(tab) => {
                                setActiveTab(tab)
                            }}
                            onLogout={handleLogout}
                            className="w-full h-full border-none"
                        />
                    </SheetContent>
                </Sheet>
            </div>
        )
    }

    return (
        <div className="min-h-screen gradient-bg flex">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <ChatSidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Mobile: Sidebar toggle */}
                            <MobileSidebarToggle />
                            <div className="hidden md:block">
                                <motion.div
                                    className="bg-white/20 p-2 rounded-full"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <HeaderIcon className="h-5 w-5 text-white" />
                                </motion.div>
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-white">{headerContent.title}</h1>
                                <p className="text-white/70 text-sm">{headerContent.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-white/80 text-sm hidden sm:inline">Welcome, {user?.username}!</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                                className="text-white/80 hover:text-white hover:bg-white/10"
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </motion.header>

                {/* Dynamic Content */}
                {renderContent()}
            </div>
        </div>
    )
}
