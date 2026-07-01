'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlmaAvatar } from './alma-avatar'

type Mode = 'voice' | 'chat'

function Waveform({ active }: { active: boolean }) {
  const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  return (
    <div className="flex items-center justify-center gap-1 h-12" aria-hidden="true">
      {bars.map((i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-[#FF0099]"
          initial={{ height: 6 }}
          animate={active ? { height: [6, 8 + (i % 5) * 6, 6] } : { height: 6 }}
          transition={{
            duration: 0.9 + (i % 4) * 0.15,
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
      className="w-full max-w-sm overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#0A0A0A] shadow-2xl"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
      role="dialog"
      aria-label="Discuter avec Alma"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.06)] bg-[#111111] px-4 py-3.5">
        <AlmaAvatar state={isTalking ? 'speaking' : 'idle'} size={30} showGlow={false} />
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Alma</p>
          <p className="text-xs text-[#8E8E93]">Répond en direct · vocal ou écrit</p>
        </div>
      </div>

      {/* Welcome message */}
      <div className="px-4 pt-4">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5">
            <AlmaAvatar state="idle" size={22} showGlow={false} />
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-[#1A1A1A] px-3.5 py-2.5 text-sm leading-relaxed text-white">
            Bonjour, je suis Alma. Entrez votre nom de domaine : je collecte automatiquement les données publiques de votre site pour créer le contexte de votre agent.
          </div>
        </div>

        {/* Domain input */}
        <div className="relative mt-3">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8E93]">
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
            className="w-full rounded-full border border-[#333333] bg-[#111111] py-2.5 pl-9 pr-4 text-sm text-white placeholder-[#6E6E76] focus:border-[#FF0099] focus:outline-none focus:ring-2 focus:ring-[#FF0099]/30 transition-colors"
            aria-label="Votre nom de domaine"
          />
        </div>
      </div>

      {/* Mode toggle */}
      <div className="mt-4 flex items-center gap-1 px-4">
        <button
          onClick={() => setMode('voice')}
          className={`flex-1 rounded-full px-3 py-2 text-xs font-medium transition-colors ${
            mode === 'voice' ? 'bg-[#FF0099] text-white' : 'text-[#8E8E93] hover:text-white'
          }`}
        >
          Parler
        </button>
        <button
          onClick={() => setMode('chat')}
          className={`flex-1 rounded-full px-3 py-2 text-xs font-medium transition-colors ${
            mode === 'chat' ? 'bg-[#FF0099] text-white' : 'text-[#8E8E93] hover:text-white'
          }`}
        >
          Écrire
        </button>
      </div>

      {/* Mode content */}
      <div className="px-4 pb-4 pt-3">
        {mode === 'voice' ? (
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111111] p-4">
            <Waveform active={isTalking} />
            <button
              onClick={() => setIsTalking((v) => !v)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF0099] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E00085]"
            >
              {isTalking ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                  Terminer
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
              className="w-full rounded-full border border-[#333333] bg-[#111111] py-3 pl-4 pr-12 text-sm text-white placeholder-[#6E6E76] focus:border-[#FF0099] focus:outline-none focus:ring-2 focus:ring-[#FF0099]/30 transition-colors"
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
