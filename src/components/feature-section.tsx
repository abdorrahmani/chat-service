"use client"

import { motion } from "framer-motion"
import { MessageCircle, Users, Shield, Zap, Globe, Lock } from "lucide-react"

export function FeatureSection() {
    return (
      <div className="container mx-auto px-4 py-16">
          <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-24"
              id="features"
          >
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px]">
                  <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 md:col-span-2 md:row-span-2 flex flex-col justify-center"
                  >
                      <Users className="h-16 w-16 text-white mb-6" />
                      <h3 className="text-3xl font-bold text-white mb-4">Global Chat</h3>
                      <p className="text-white/80 md:text-lg text-sm leading-relaxed">
                          Join the worldwide conversation. Share ideas, meet new people, and be part of a vibrant community that spans
                          the globe.
                      </p>
                  </motion.div>

                  <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 md:col-span-2 flex flex-col justify-center"
                  >
                      <MessageCircle className="h-12 w-12 text-white mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-3">Private Messages</h3>
                      <p className="text-white/70 text-sm">Have intimate conversations with friends. Your privacy is protected.</p>
                  </motion.div>

                  <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 md:col-span-1 flex flex-col justify-center"
                  >
                      <Zap className="h-10 w-10 text-white mb-3" />
                      <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
                      <p className="text-white/70 text-xs">Instant messaging</p>
                  </motion.div>

                  <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 md:col-span-1 flex flex-col justify-center"
                  >
                      <Globe className="h-10 w-10 text-white mb-3" />
                      <h3 className="text-lg font-semibold text-white mb-2">Global Reach</h3>
                      <p className="text-white/70 text-xs">Worldwide access</p>
                  </motion.div>

                  <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 md:col-span-2 flex flex-col justify-center"
                  >
                      <Shield className="h-12 w-12 text-white mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-3">Enterprise Security</h3>
                      <p className="text-white/70 text-sm">Bank-level encryption keeps your conversations secure and private.</p>
                  </motion.div>

                  <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 md:col-span-2 flex flex-col justify-center"
                  >
                      <Lock className="h-12 w-12 text-white mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-3">End-to-End Encryption</h3>
                      <p className="text-white/70 text-sm">
                          Your messages are encrypted from device to device. Not even we can read them.
                      </p>
                  </motion.div>
              </div>
          </motion.div>
      </div>
    )
}
