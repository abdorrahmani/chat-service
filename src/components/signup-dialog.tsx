"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageCircle, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/providers/auth-provider"
import { useRouter } from "next/navigation"

interface SignupDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function SignupDialog({ open, onOpenChange }: SignupDialogProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const success = await login(username, password)

        if (success) {
            onOpenChange(false)
            router.push("/chat")
        }

        setIsLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md gradient-bg border-white/20">
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
                    <DialogTitle className="text-center text-2xl font-bold text-white">Join ChatFlow</DialogTitle>
                </DialogHeader>

                <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-white/90">
                            Username
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-white/90">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 pr-10"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <AnimatePresence>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Button
                                type="submit"
                                className="w-full bg-white text-primary hover:bg-white/90 text-lg py-6"
                                disabled={isLoading || !username || !password}
                            >
                                {isLoading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                                    />
                                ) : (
                                    <>Create Account &rarr;</>
                                )}
                            </Button>
                        </motion.div>
                    </AnimatePresence>
                </motion.form>
            </DialogContent>
        </Dialog>
    )
}
