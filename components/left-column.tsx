'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function LeftColumn({ onDomainSubmit }: { onDomainSubmit?: (domain: string) => void }) {
  const [domain, setDomain] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleDomainSubmit = () => {
    if (domain.trim()) {
      setSubmitted(true)
      onDomainSubmit?.(domain)
    }
  }

  return (
    <motion.div
      className="relative flex flex-col justify-start pt-16 sm:pt-20 md:pt-0 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Focus glow — guides the eye toward the primary action */}
      <div
        className="pointer-events-none absolute -left-20 top-1/3 -z-10 h-72 w-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,153,0.12), transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* Overline — single contextual line above the title (pain point) */}
      <motion.p
        className="text-xs tracking-normal text-[#A0A0A8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Vous gérez tout, tout seul. Sans pouvoir embaucher.
      </motion.p>

      {/* H1 */}
      <motion.h1
        className="mt-3 sm:mt-4 font-heading text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] text-white text-balance"
        style={{ letterSpacing: '-0.02em' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Démarrez avec votre <span className="text-[#FF0099] italic">agent IA</span>. Ajoutez votre équipe plus tard.
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-4 sm:mt-6 w-full sm:max-w-md text-sm sm:text-base leading-relaxed text-[#A0A0A8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Il apprend votre métier, travaille dans vos outils et n&apos;oublie jamais rien.
      </motion.p>

      {/* HITL reassurance */}
      <motion.p
        className="mt-2 text-xs sm:text-sm font-medium text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Vous restez le patron.
      </motion.p>

      {/* Domain input */}
      <motion.div
        className="mt-6 sm:mt-9 flex w-full sm:max-w-md items-stretch gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E8E93]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="votre-domaine.fr"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDomainSubmit()}
            className="w-full rounded-full border border-[#333333] bg-[#111111] py-3.5 pl-10 pr-14 text-sm text-white placeholder-[#6E6E76] focus:border-[#FF0099] focus:outline-none focus:ring-2 focus:ring-[#FF0099]/30 transition-colors"
            aria-label="Adresse de votre site web"
          />
          <button
            onClick={handleDomainSubmit}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FF0099] text-white hover:bg-[#E00085] transition-colors"
            aria-label="Submit domain"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Input helper */}
      <motion.p
        className="mt-2 text-xs text-[#8A8A92]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}
      >
        Analyse gratuite de votre site en 10 secondes, sans inscription.
      </motion.p>

      {/* Success message */}
      {submitted && domain && (
        <motion.p
          className="mt-3 text-xs text-[#22C55E]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Alma analyse {domain} et prépare votre diagnostic.
        </motion.p>
      )}

      {/* Secondary CTA — neutral, so the domain field stays the primary action */}
      <motion.button
        className="mt-4 sm:mt-5 w-full sm:max-w-md rounded-full border border-[#333333] bg-transparent hover:border-[#555555] hover:bg-[rgba(255,255,255,0.03)] px-6 sm:px-9 py-3 sm:py-4 text-base sm:text-lg font-medium text-white transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Essayer gratuitement
      </motion.button>

      {/* Microcopy */}
      <motion.p
        className="mt-2.5 sm:mt-3 text-xs text-[#8A8A92]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        7 jours d&apos;essai gratuit · une IA prête à travailler · sans carte bancaire
      </motion.p>

      {/* Social proof + open-source signal */}
      <motion.div
        className="mt-5 sm:mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#8A8A92]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-2">
          <span className="flex -space-x-1.5" aria-hidden="true">
            {['#5D9CEC', '#A075E8', '#EC5D9C'].map((c) => (
              <span
                key={c}
                className="h-5 w-5 rounded-full border border-[#0A0A0A]"
                style={{ background: c }}
              />
            ))}
          </span>
          Déjà adopté par 200+ PME françaises
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" aria-hidden="true" />
          Propulsé par Hermes · open source
        </span>
      </motion.div>
    </motion.div>
  )
}
