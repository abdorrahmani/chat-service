"use client"

import {useState} from "react"
import {motion} from "framer-motion"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Calendar, Edit3, MessageCircle, Save, X} from "lucide-react"
import {useAuth} from "@/providers/auth-provider"

export function UserProfile() {
    const { user } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [displayName, setDisplayName] = useState(user?.username || "")
    const [bio, setBio] = useState("Hey there! I'm using ChatFlow.")
    const [status, setStatus] = useState("online")

    const handleSave = () => {
        // In a real app, this would save to a backend
        setIsEditing(false)
    }

    const handleCancel = () => {
        setDisplayName(user?.username || "")
        setIsEditing(false)
    }

    const joinDate = new Date(2024, 0, 15) // Demo join date

    return (
        <div className="p-3 md:p-6 space-y-4 md:space-y-6 overflow-y-auto">
            {/* Profile Header */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center">
                <div className="relative inline-block">
                    <Avatar className="h-24 w-24 bg-white/20 border-4 border-white/30">
                        <AvatarFallback className="text-white text-xl md:text-2xl bg-transparent">
                            {user?.username?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 md:h-6 md:w-6 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-white mt-4">{displayName}</h1>
                <p className="text-white/70 text-sm md:text-base">@{user?.username}</p>
                <Badge variant="secondary" className="mt-2 bg-white/20 text-white border-white/30 text-xs md:text-sm">
                    {status}
                </Badge>
            </motion.div>

            {/* Profile Information */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 pb-3 md:pb-6">
                        <CardTitle className="text-white text-lg md:text-xl">Profile Information</CardTitle>
                        {!isEditing ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsEditing(true)}
                                className="text-white/80 hover:text-white hover:bg-white/10 self-start sm:self-auto"
                            >
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                        ) : (
                            <div className="flex gap-2 self-start sm:self-auto">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSave}
                                    className="text-green-400 hover:text-green-300 hover:bg-white/10"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Save
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCancel}
                                    className="text-red-400 hover:text-red-300 hover:bg-white/10"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4 pt-0">
                        <div>
                            <Label className="text-white/90 text-sm md:text-bas">Display Name</Label>
                            {isEditing ? (
                                <Input
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 mt-1"
                                />
                            ) : (
                                <p className="text-white mt-1 text-sm md:text-base">{displayName}</p>
                            )}
                        </div>

                        <div>
                            <Label className="text-white/90 text-sm md:text-base">Bio</Label>
                            {isEditing ? (
                                <Input
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tell us about yourself..."
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 mt-1"
                                />
                            ) : (
                                <p className="text-white/80 mt-1">{bio}</p>
                            )}
                        </div>

                        <div>
                            <Label className="text-white/90 text-sm md:text-base">Username</Label>
                            <p className="text-white/80 mt-1 text-sm md:text-base">@{user?.username}</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Activity Stats */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-3 md:gap-4"
            >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-3 md:p-4 text-center">
                        <MessageCircle className="h-6 w-6 md:h-8 md:w-8 text-white mx-auto mb-2" />
                        <p className="text-xl md:text-2xl font-bold text-white">127</p>
                        <p className="text-white/70 text-xs md:text-sm">Messages Sent</p>
                    </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-3 md:p-4 text-center">
                        <Calendar className="h-6 w-6 md:h-8 md:w-8 text-white mx-auto mb-2" />
                        <p className="text-xl md:text-2xl font-bold text-white">
                            {Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24))}
                        </p>
                        <p className="text-white/70 text-xs md:text-sm">Days Active</p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardHeader className="pb-3 md:pb-6">
                        <CardTitle className="text-white text-lg md:text-xl">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0">
                        <div className="flex items-center gap-3 p-2 md:p-3 bg-white/5 rounded-lg">
                            <div className="h-2 w-2 bg-green-400 rounded-full flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-white text-sm">Joined global chat</p>
                                <p className="text-white/50 text-xs">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 md:p-3 bg-white/5 rounded-lg">
                            <div className="h-2 w-2 bg-blue-400 rounded-full flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-white text-sm">Updated profile</p>
                                <p className="text-white/50 text-xs">1 day ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 md:p-3 bg-white/5 rounded-lg">
                            <div className="h-2 w-2 bg-purple-400 rounded-full flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-white text-sm">Sent first message</p>
                                <p className="text-white/50 text-xs">3 days ago</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
