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
      className="flex flex-col justify-start pt-32 md:pt-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Badge */}
      <motion.div
        className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] px-3 py-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <span className="text-xs tracking-wider uppercase text-[#8E8E93]">✧ Propulsé par Hermes (open source)</span>
      </motion.div>

      {/* Overline */}
      <motion.p
        className="mt-8 text-xs tracking-normal text-[#8E8E93]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Vous gérez tout, tout seul. Sans pouvoir embaucher.
      </motion.p>

      {/* H1 */}
      <motion.h1
        className="mt-5 font-heading text-6xl md:text-7xl xl:text-8xl font-light leading-tight text-white"
        style={{ letterSpacing: '-0.03em' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Lancez votre <span className="text-[#FF0099] italic">agent IA</span>.
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-6 max-w-md text-base leading-relaxed text-[#8E8E93]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Il apprend votre métier, travaille dans vos outils et n&apos;oublie jamais rien.
      </motion.p>

      {/* HITL reassurance */}
      <motion.p
        className="mt-2 text-sm font-medium text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Vous restez le patron.
      </motion.p>

      {/* Domain input */}
      <motion.div
        className="mt-9 flex max-w-md items-stretch gap-2"
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
            className="w-full rounded-full border border-[#333333] bg-[#111111] py-3.5 pl-10 pr-14 text-sm text-white placeholder-[#555555] focus:border-[#FF0099] focus:outline-none transition-colors"
            aria-label="Domain"
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

      {/* Success message */}
      {submitted && domain && (
        <motion.p
          className="mt-3 text-xs text-[#22C55E]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          ✅ Alma analyse {domain} et prépare votre diagnostic.
        </motion.p>
      )}

      {/* CTA */}
      <motion.button
        className="mt-4 w-full max-w-md rounded-full bg-[#FF0099] hover:bg-[#E00085] px-9 py-4.5 text-lg font-medium text-white transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Essayer gratuitement
      </motion.button>

      {/* Microcopy */}
      <motion.p
        className="mt-3 text-xs text-[#555555]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Essai limité · 1 modèle IA · sans carte bancaire.
      </motion.p>
    </motion.div>
  )
}
