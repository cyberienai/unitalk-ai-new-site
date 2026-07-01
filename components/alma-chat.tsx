'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlmaAvatar } from './alma-avatar'

function Waveform({ active }: { active: boolean }) {
  const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
  return (
    <div className="flex items-center gap-[3px]" aria-hidden="true">
      {bars.map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-[#FF0099]"
          initial={{ height: 4 }}
          animate={active ? { height: [4, 8 + (i % 6) * 5, 4] } : { height: 4 }}
          transition={{
            duration: 0.7 + (i % 4) * 0.16,
            repeat: active ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function AlmaChat() {
  const [domain, setDomain] = useState('')
  const [isTalking, setIsTalking] = useState(false)

  return (
    <motion.div
      className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-[rgba(255,255,255,0.1)] bg-[#0C0C0E]/95 shadow-[0_24px_80px_-16px_rgba(255,0,153,0.25)] backdrop-blur-xl"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
      role="dialog"
      aria-label="Discuter avec Alma"
    >
      {/* Top hairline accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,0,153,0.6), transparent)' }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.06)] bg-gradient-to-b from-[#151517] to-[#0C0C0E] px-5 py-4">
        <AlmaAvatar state={isTalking ? 'speaking' : 'idle'} size={34} showGlow={false} />
        <div className="flex-1">
          <p className="text-sm font-semibold tracking-tight text-white">Alma</p>
          <p className="text-[11px] text-[#8E8E93]">Agent vocal Customer Success · Unitalk</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(34,197,94,0.12)] px-2.5 py-1 text-[10px] font-medium text-[#4ADE80]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" aria-hidden="true" />
          En ligne
        </span>
      </div>

      {/* Conversation */}
      <div className="space-y-2.5 px-5 py-5">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 shrink-0">
            <AlmaAvatar state="idle" size={20} showGlow={false} />
          </div>
          <div className="rounded-2xl rounded-tl-md bg-[#1A1A1D] px-4 py-2.5 text-sm leading-relaxed text-white">
            Bonjour, je suis Alma. Quel est le nom de domaine de votre entreprise ?
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="w-5 shrink-0" aria-hidden="true" />
          <div className="rounded-2xl rounded-tl-md bg-[#1A1A1D] px-4 py-2.5 text-sm leading-relaxed text-[#C7C7CC]">
            Je collecte les données publiques de votre entreprise, puis je vous appelle pour créer un agent
            {' '}<span className="text-white">personnalisé sur mesure</span> — prénom, voix, email, agenda. Un vrai bras droit, prêt à travailler.
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="w-5 shrink-0" aria-hidden="true" />
          <div className="rounded-2xl rounded-tl-md bg-[#1A1A1D] px-4 py-2.5 text-sm leading-relaxed text-[#C7C7CC]">
            Ensuite, je reste à vos côtés : je vous accompagne au quotidien et vous forme à
            {' '}<span className="text-white">orchestrer vos agents</span> pour en tirer le meilleur.
          </div>
        </div>
      </div>

      {/* Composer — single elegant bar */}
      <div className="border-t border-[rgba(255,255,255,0.06)] bg-[#0A0A0C] px-4 py-3.5">
        <div className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#141416] pl-4 pr-1.5 py-1.5 transition-colors focus-within:border-[#FF0099]/60">
          <AnimatePresence mode="wait" initial={false}>
            {isTalking ? (
              <motion.div
                key="voice"
                className="flex flex-1 items-center gap-3 py-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Waveform active />
                <span className="text-xs font-medium text-[#8E8E93]">À l&apos;écoute…</span>
              </motion.div>
            ) : (
              <motion.input
                key="text"
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="votre-domaine.fr"
                className="flex-1 bg-transparent py-1.5 text-sm text-white placeholder-[#6E6E76] focus:outline-none"
                aria-label="Votre nom de domaine"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          {/* Single contextual action: voice-to-voice by default, send when typing */}
          {isTalking ? (
            <button
              onClick={() => setIsTalking(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(255,0,153,0.14)] text-[#FF0099] transition-colors"
              aria-label="Arrêter la voix"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2.5" />
              </svg>
            </button>
          ) : domain.trim() ? (
            <button
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF0099] text-white transition-colors hover:bg-[#E00085]"
              aria-label="Envoyer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setIsTalking(true)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF0099] text-white transition-colors hover:bg-[#E00085]"
              aria-label="Parler à Alma en voice-to-voice"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4" />
              </svg>
            </button>
          )}
        </div>

        <p className="mt-2.5 text-center text-[11px] text-[#6E6E76]">
          Écrivez ou parlez — gratuit, sans carte bancaire
        </p>
      </div>
    </motion.div>
  )
}
