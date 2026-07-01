'use client'

import { motion } from 'framer-motion'

export function LeftColumn({ onDomainSubmit }: { onDomainSubmit?: (domain: string) => void }) {
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

      {/* Overline — single contextual line above the title */}
      <motion.p
        className="text-xs tracking-normal text-[#A0A0A8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Vous gérez tout, seul, sans pouvoir embaucher.
      </motion.p>

      {/* H1 — emotional hook (the pain) */}
      <motion.h1
        className="mt-3 sm:mt-4 font-heading text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] text-white text-balance"
        style={{ letterSpacing: '-0.02em' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Votre entreprise dépend <span className="text-[#FF0099] italic">trop de vous</span>.
      </motion.h1>

      {/* Offer accroche + HITL reassurance */}
      <motion.p
        className="mt-3 text-xs sm:text-sm text-[#A0A0A8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span className="font-medium text-white">1 agent, 10 profils prêts à l&apos;emploi</span> — vous gardez le contrôle.
      </motion.p>

      {/* Single explicit CTA — domain input now lives in the Alma chat widget */}
      <motion.div
        className="mt-6 sm:mt-9 flex w-full sm:max-w-md flex-col gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <button
          onClick={() => onDomainSubmit?.('')}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF0099] px-6 py-4 text-sm sm:text-base font-semibold text-white hover:bg-[#E00085] transition-colors"
        >
          Créer mon agent gratuitement
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>

      {/* Single concise reassurance line */}
      <motion.p
        className="mt-3 text-xs text-[#8A8A92]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}
      >
        Sans carte bancaire · Alma vous guide dès l&apos;ouverture
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
