'use client'

import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:inline">Unitalk.ai</span>
        </motion.div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <motion.a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" whileHover={{ color: '#FF0099' }}>
            Caractéristiques
          </motion.a>
          <motion.a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" whileHover={{ color: '#FF0099' }}>
            Tarification
          </motion.a>
          <motion.a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" whileHover={{ color: '#FF0099' }}>
            À propos
          </motion.a>
        </div>

        {/* CTA Button */}
        <motion.button
          className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Démarrer
        </motion.button>
      </div>
    </motion.nav>
  )
}
