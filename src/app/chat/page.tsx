"use client";

import { AnimatePresence } from "framer-motion";
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
import { ChatHeader } from "@/components/chat/chat-header";
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
        <ChatHeader
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
          isConnected={isConnected}
        />
        <div className="flex-1 flex flex-col min-h-0">{renderContent()}</div>
      </div>
    </div>
  );
}
