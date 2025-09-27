"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, User, Users, Wifi, WifiOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  ChatSidebar,
  MessageBubble,
  MessageInput,
  PrivateMessages,
  TypingIndicator,
  UserProfile,
} from "@/components/chat";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAuth } from "@/providers/auth-provider";

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  type: "global" | "private";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<"global" | "profile" | "private">(
    "global",
  );
  const [showTyping, setShowTyping] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isConnected, lastMessage, sendMessage } = useWebSocket<string>();

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
    ];
    setMessages(demoMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showTyping]);
  
  const handleSendMessage = (content: string) => {
    if (!user) return;

    setShowTyping(true);

    setTimeout(() => {
      const message: Message = {
        id: Date.now().toString(),
        username: user.username,
        content,
        timestamp: new Date(),
        type: "global",
      };

      setMessages((prev) => [...prev, message]);
      sendMessage(content);
      setShowTyping(false);
    }, 500);
  };

  useEffect(() => {
    if (isConnected && user?.username) {
      sendMessage(user.username);
    }
  }, [isConnected, user?.username, sendMessage]);

  useEffect(() => {
    if (!lastMessage) return;

    const serverText =
      typeof lastMessage === "string" ? lastMessage : String(lastMessage);

    const incoming: Message = {
      id: `${Date.now()}-${Math.random()}`,
      username: "System",
      content: serverText,
      timestamp: new Date(),
      type: "global",
    };

    setMessages((prev) => [...prev, incoming]);
  }, [lastMessage]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="flex-1 overflow-y-auto">
            <UserProfile />
          </div>
        );
      case "private":
        return (
          <div className="flex-1 overflow-y-auto">
            <PrivateMessages />
          </div>
        );
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence mode="popLayout">
                {messages.map((message, index) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isOwn={message.username === user?.username}
                    delay={index * 0.05}
                  />
                ))}

                {showTyping && <TypingIndicator username="Someone" />}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <div className="flex-shrink-0">
              <MessageInput
                onSendMessage={handleSendMessage}
                placeholder="Type your message..."
              />
            </div>
          </div>
        );
    }
  };

  const getHeaderContent = () => {
    switch (activeTab) {
      case "profile":
        return {
          icon: User,
          title: "Your Profile",
          subtitle: "Manage your account settings",
        };
      case "private":
        return {
          icon: Users,
          title: "Private Messages",
          subtitle: "Your direct conversations",
        };
      default:
        return {
          icon: Users,
          title: "Global Chat",
          subtitle: "Connect with everyone",
        };
    }
  };

  const headerContent = getHeaderContent();
  const HeaderIcon = headerContent.icon;

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
                setActiveTab(tab);
              }}
              onLogout={handleLogout}
              className="w-full h-full border-none"
            />
          </SheetContent>
        </Sheet>
      </div>
    );
  };

  return (
    <div className="h-screen gradient-bg flex overflow-hidden">
      <div className="hidden md:block fixed left-0 top-0 h-full z-10">
        <ChatSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
        />
      </div>

      <div className="flex-1 flex flex-col md:ml-64 h-full">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4 flex-shrink-0"
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
                <h1 className="text-xl font-semibold text-white">
                  {headerContent.title}
                </h1>
                <p className="text-white/70 text-sm">
                  {headerContent.subtitle}
                </p>
              </div>
            </div>
            <div className="flex max-sm:flex-col items-center gap-3">
              <p>
                {isConnected ? (
                  <span className="flex text-sm gap-2 items-center text-white">
                    <Wifi className="size-4" /> Connected
                  </span>
                ) : (
                  <span className="flex text-sm gap-2 items-center text-red-600">
                    <WifiOff className="size-4" /> Disconnected
                  </span>
                )}
              </p>
              <span className="text-white/80 text-sm hidden sm:inline">
                Welcome, {user?.username}!
              </span>
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
        <div className="flex-1 flex flex-col min-h-0">{renderContent()}</div>
      </div>
    </div>
  );
}
