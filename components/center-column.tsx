'use client'

import { motion } from 'framer-motion'
import { AlmaAvatar } from './alma-avatar'
import { UnitalkLogo } from './unitalk-logo'

export function CenterColumn({ domain = 'agence-thomas.fr' }: { domain?: string }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      className="relative flex flex-col justify-start pt-16 sm:pt-20 md:pt-0 w-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,0,153,0.15), transparent)',
          filter: 'blur(80px)',
        }}
      />

      {/* Card */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#111111] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#222222] bg-[#0F0F0F] px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <UnitalkLogo size={18} />
            <span className="text-xs font-medium text-white">Alma · en direct</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#22C55E]" />
            <span className="text-xs text-[#8E8E93]">En ligne</span>
          </div>
        </div>

        {/* Chat area */}
        <motion.div className="space-y-3 sm:space-y-4 p-4 sm:p-6 h-80 sm:h-96 overflow-y-auto" variants={containerVariants} initial="hidden" animate="visible">
          {/* 1 — Comprehension */}
          <motion.div className="flex items-start gap-3" variants={itemVariants}>
            <AlmaAvatar state="listening" size={32} showGlow={false} />
            <div className="max-w-xs rounded-2xl bg-[#1A1A1A] px-4 py-3 text-sm text-[#FFFFFF]">
              <p className="font-medium">Bonjour Thomas.</p>
              <p className="text-[#A0A0A8]">J&apos;ai analysé {domain} : agence digitale, 3 personnes, Gmail · HubSpot · GA4.</p>
            </div>
          </motion.div>

          {/* 2 — Concrete action proposal */}
          <motion.div className="flex items-start gap-3" variants={itemVariants}>
            <AlmaAvatar state="speaking" size={32} showGlow={false} />
            <div className="max-w-xs rounded-2xl bg-[#1A1A1A] px-4 py-3 text-sm text-[#FFFFFF]">
              <p>Je peux corriger votre DMARC et créer un agent qui relance vos devis en attente.</p>
              <p className="mt-2 text-[#A0A0A8]">Je prépare tout. Vous validez avant que ça parte.</p>
            </div>
          </motion.div>

          {/* 3 — Human-in-the-loop control */}
          <motion.div className="flex items-center gap-3 pl-11" variants={itemVariants}>
            <button className="rounded-full bg-[#FF0099] px-4 py-2 text-xs font-medium text-white hover:bg-[#E00085] transition-colors">
              Valider
            </button>
            <button className="rounded-full border border-[#333333] px-4 py-2 text-xs font-medium text-white hover:border-[#555555] transition-colors">
              Ajuster
            </button>
          </motion.div>

          {/* Context panel */}
          <motion.div className="mt-6 rounded-xl border border-[#222222] bg-[#0F0F0F] p-4" variants={itemVariants}>
            <p className="text-xs uppercase tracking-wider text-[#8A8A92] mb-3">Ce qu&apos;Alma comprend</p>
            <div className="space-y-2 text-xs text-[#A0A0A8]">
              <p>✓ {domain} · Paris</p>
              <p>✓ 3 personnes · fondée 2019</p>
              <p>✓ Gmail · HubSpot · GA4</p>
              <p>⚠ DMARC absent</p>
              <p>⚠ Score mobile 38/100</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Input bar */}
        <div className="border-t border-[#222222] bg-[#0F0F0F] px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#8E8E93] flex-shrink-0">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          <input
            type="text"
            placeholder="Répondre à Alma..."
            className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-[#555555] focus:outline-none"
            disabled
          />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#8E8E93] flex-shrink-0">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
