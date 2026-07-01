'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlmaAvatar } from './alma-avatar'

type Mode = 'voice' | 'chat'

function Waveform({ active }: { active: boolean }) {
  const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  return (
    <div className="flex items-center justify-center gap-[3px] h-14" aria-hidden="true">
      {bars.map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-b from-[#FF3DAE] to-[#FF0099]"
          initial={{ height: 5 }}
          animate={active ? { height: [5, 10 + (i % 6) * 6, 5] } : { height: 5 }}
          transition={{
            duration: 0.8 + (i % 4) * 0.18,
            repeat: active ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function AlmaChat() {
  const [mode, setMode] = useState<Mode>('voice')
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
        <AlmaAvatar state={isTalking ? 'speaking' : 'idle'} size={32} showGlow={false} />
        <div className="flex-1">
          <p className="text-sm font-semibold tracking-tight text-white">Alma</p>
          <p className="text-[11px] text-[#8E8E93]">Agent d&apos;onboarding Unitalk</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(34,197,94,0.12)] px-2.5 py-1 text-[10px] font-medium text-[#4ADE80]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" aria-hidden="true" />
          En ligne
        </span>
      </div>

      {/* Conversation */}
      <div className="space-y-2.5 px-5 pt-5">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 shrink-0">
            <AlmaAvatar state="idle" size={20} showGlow={false} />
          </div>
          <div className="rounded-2xl rounded-tl-md bg-[#1A1A1D] px-4 py-2.5 text-sm leading-relaxed text-white">
            Bonjour, je suis Alma. Entrez votre nom de domaine.
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="w-5 shrink-0" aria-hidden="true" />
          <div className="rounded-2xl rounded-tl-md bg-[#1A1A1D] px-4 py-2.5 text-sm leading-relaxed text-[#C7C7CC]">
            J&apos;analyse votre site, je vous appelle, puis je crée votre agent — avec son prénom, sa voix, son email et son agenda.{' '}
            <span className="text-white">Une vraie identité, prête à travailler.</span>
          </div>
        </div>

        {/* Domain input */}
        <div className="relative pl-[30px] pt-1">
          <div className="absolute left-[42px] top-1/2 -translate-y-1/2 text-[#8E8E93]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="votre-domaine.fr"
            className="w-full rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#111113] py-2.5 pl-9 pr-4 text-sm text-white placeholder-[#6E6E76] transition-colors focus:border-[#FF0099] focus:outline-none focus:ring-2 focus:ring-[#FF0099]/25"
            aria-label="Votre nom de domaine"
          />
        </div>
      </div>

      {/* Mode toggle — segmented control */}
      <div className="mt-4 px-5">
        <div className="flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.06)] bg-[#111113] p-1">
          <button
            onClick={() => setMode('voice')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all ${
              mode === 'voice' ? 'bg-[#FF0099] text-white shadow-[0_2px_10px_rgba(255,0,153,0.4)]' : 'text-[#8E8E93] hover:text-white'
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4" />
            </svg>
            Parler
          </button>
          <button
            onClick={() => setMode('chat')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all ${
              mode === 'chat' ? 'bg-[#FF0099] text-white shadow-[0_2px_10px_rgba(255,0,153,0.4)]' : 'text-[#8E8E93] hover:text-white'
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Écrire
          </button>
        </div>
      </div>

      {/* Mode content */}
      <div className="px-5 pb-5 pt-3">
        {mode === 'voice' ? (
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111113] p-4">
            <Waveform active={isTalking} />
            <button
              onClick={() => setIsTalking((v) => !v)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF0099] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E00085]"
            >
              {isTalking ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                  Terminer l&apos;appel
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4" />
                  </svg>
                  Parler à Alma
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="relative">
            <input
              type="text"
              placeholder="Demandez-moi n'importe quoi..."
              className="w-full rounded-full border border-[rgba(255,255,255,0.1)] bg-[#111113] py-3 pl-4 pr-12 text-sm text-white placeholder-[#6E6E76] transition-colors focus:border-[#FF0099] focus:outline-none focus:ring-2 focus:ring-[#FF0099]/25"
              aria-label="Votre message"
            />
            <button
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-[#FF0099] text-white transition-colors hover:bg-[#E00085]"
              aria-label="Envoyer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
