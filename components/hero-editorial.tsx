'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Waveform({ active }: { active: boolean }) {
  const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  return (
    <div className="flex items-center gap-[3px]" aria-hidden="true">
      {bars.map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-[#D10E63]"
          initial={{ height: 4 }}
          animate={active ? { height: [4, 8 + (i % 5) * 5, 4] } : { height: 4 }}
          transition={{ duration: 0.7 + (i % 4) * 0.16, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

const ease = [0.22, 1, 0.36, 1] as const

export function HeroEditorial() {
  const [domain, setDomain] = useState('')
  const [isTalking, setIsTalking] = useState(false)

  return (
    <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-4xl flex-col items-center justify-center px-5 sm:px-6 lg:px-8 py-16 text-center sm:py-20">
      {/* Eyebrow with editorial rules */}
      <motion.div
        className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#857C6E]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <span className="hidden h-px w-8 sm:block" style={{ background: '#CDC3B1' }} />
        Vous gérez tout, seul, sans pouvoir embaucher
        <span className="hidden h-px w-8 sm:block" style={{ background: '#CDC3B1' }} />
      </motion.div>

      {/* Oversized editorial headline */}
      <motion.h1
        className="mt-6 font-sf font-bold text-[#1C1A17] text-balance"
        style={{ fontSize: 'clamp(2.9rem, 8.5vw, 7rem)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.06 }}
      >
        Votre entreprise
        <br />
        dépend{' '}
        <span
          style={{
            backgroundImage: 'linear-gradient(90deg, #B00B52 0%, #D10E63 55%, #E85C8A 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          trop de vous.
        </span>
      </motion.h1>

      {/* Subline */}
      <motion.p
        className="mt-7 max-w-2xl text-base leading-relaxed text-[#4E483F] sm:text-lg"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.14 }}
      >
        Un appel avec Alma. Le lendemain, votre agent a un prénom, une voix, un numéro. Il se souvient de tout. Chaque échange l&apos;améliore.{' '}
        <span className="text-[#1C1A17]">En quelques semaines, il connaît vos clients mieux que vous.</span>
      </motion.p>

      {/* Alma command bar — the single conversion point */}
      <motion.div
        className="mt-10 w-full max-w-xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.22 }}
      >
        <div className="mb-3 flex items-center justify-center gap-2.5">
          <div className="relative">
            <img src="/alma-avatar.png" alt="Portrait d'Alma" className="h-7 w-7 rounded-full object-cover ring-1 ring-[#D10E63]/40" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#F3EFE6] bg-[#2E7D4F]" aria-hidden="true" />
          </div>
          <p className="text-xs text-[#857C6E]">
            <span className="font-medium text-[#1C1A17]">Alma</span> vous appelle et crée votre agent IA sur mesure.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3] pl-4 pr-1.5 py-1.5 shadow-[0_1px_0_rgba(28,26,23,0.04)] transition-colors focus-within:border-[#D10E63]">
          <AnimatePresence mode="wait" initial={false}>
            {isTalking ? (
              <motion.div
                key="voice"
                className="flex flex-1 items-center gap-3 py-2.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Waveform active />
                <span className="text-sm font-medium text-[#857C6E]">À l&apos;écoute…</span>
              </motion.div>
            ) : (
              <motion.input
                key="text"
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="votre-domaine.fr"
                className="flex-1 bg-transparent py-2.5 text-sm text-[#1C1A17] placeholder-[#A79E8E] focus:outline-none sm:text-base"
                aria-label="Votre nom de domaine"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          {isTalking ? (
            <button
              onClick={() => setIsTalking(false)}
              className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[#D10E63]/10 px-4 text-sm font-medium text-[#D10E63] transition-colors"
              aria-label="Arrêter la voix"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2.5" /></svg>
              Stop
            </button>
          ) : domain.trim() ? (
            <button
              className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[#D10E63] px-5 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
            >
              Créer mon agent gratuitement
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          ) : (
            <button
              onClick={() => setIsTalking(true)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D10E63] text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
              aria-label="Parler à Alma en voice-to-voice"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4" />
              </svg>
            </button>
          )}
        </div>

        <p className="mt-3 text-xs text-[#857C6E]">
          Essai de 7 jours · sans carte bancaire · 1 agent, 10 profils prêts à l&apos;emploi
        </p>
      </motion.div>
    </div>
  )
}
