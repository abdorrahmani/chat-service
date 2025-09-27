import { motion } from "framer-motion";
import { LogOut, Menu, User, Users, Wifi, WifiOff } from "lucide-react";
import React from "react";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type ChatHeaderProps = {
  activeTab: "global" | "profile" | "private";
  setActiveTab: (tab: "global" | "profile" | "private") => void;
  onLogout: () => void;
  user: { username: string } | null;
  isConnected: boolean;
};

export function ChatHeader({
  activeTab,
  setActiveTab,
  onLogout,
  user,
  isConnected,
}: ChatHeaderProps) {
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
              onLogout={onLogout}
              className="w-full h-full border-none"
            />
          </SheetContent>
        </Sheet>
      </div>
    );
  };

  const headerContent = getHeaderContent();

  const HeaderIcon = headerContent.icon;
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4 flex-shrink-0"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
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
            <p className="text-white/70 text-sm">{headerContent.subtitle}</p>
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
            onClick={onLogout}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
