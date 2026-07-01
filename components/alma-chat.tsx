'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const T = {
  fr: {
    dialogLabel: 'Discuter avec Alma',
    almaAlt: "Portrait d'Alma",
    role: 'Votre accompagnatrice IA · Unitalk',
    online: 'En ligne',
    msg1: 'Bonjour, je suis Alma.',
    msg2a: 'Je collecte les données publiques de votre entreprise, puis je vous appelle pour créer votre agent : ',
    msg2strong: 'personnalisé sur mesure',
    msg2b: ', avec son prénom, sa voix, son email et son agenda. Votre nouveau bras droit, prêt à travailler.',
    msg3a: 'Ensuite, je reste à vos côtés : je vous accompagne au quotidien et vous forme à ',
    msg3strong: 'orchestrer vos agents',
    msg3b: ' pour en tirer le meilleur.',
    msg4: 'Pour commencer, quel est le nom de domaine de votre entreprise ?',
    listening: 'À l’écoute…',
    placeholder: 'votre-domaine.fr',
    domainAria: 'Votre nom de domaine',
    stopAria: 'Arrêter la voix',
    sendAria: 'Envoyer',
    talkAria: 'Parler à Alma en voice-to-voice',
    footnote: 'Écrivez ou parlez — gratuit, sans carte bancaire',
  },
  en: {
    dialogLabel: 'Chat with Alma',
    almaAlt: 'Portrait of Alma',
    role: 'Your AI guide · Unitalk',
    online: 'Online',
    msg1: 'Hello, I’m Alma.',
    msg2a: 'I gather your company’s public data, then I call you to create your agent: ',
    msg2strong: 'fully customized',
    msg2b: ', with its name, voice, email and calendar. Your new right hand, ready to work.',
    msg3a: 'Then I stay by your side: I guide you day to day and train you to ',
    msg3strong: 'orchestrate your agents',
    msg3b: ' to get the most out of them.',
    msg4: 'To start, what’s your company’s domain name?',
    listening: 'Listening…',
    placeholder: 'your-domain.com',
    domainAria: 'Your domain name',
    stopAria: 'Stop voice',
    sendAria: 'Send',
    talkAria: 'Talk to Alma voice-to-voice',
    footnote: 'Type or talk — free, no credit card',
  },
}

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
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <motion.div
      className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-[rgba(255,255,255,0.1)] bg-[#0C0C0E]/95 shadow-[0_24px_80px_-16px_rgba(255,0,153,0.25)] backdrop-blur-xl"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
      role="dialog"
      aria-label={t.dialogLabel}
    >
      {/* Top hairline accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,0,153,0.6), transparent)' }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.06)] bg-gradient-to-b from-[#151517] to-[#0C0C0E] px-5 py-4">
        <div className="relative shrink-0">
          <img
            src="/alma-avatar.png"
            alt={t.almaAlt}
            className="h-9 w-9 rounded-full object-cover ring-2 ring-[rgba(255,0,153,0.35)]"
          />
          <span
            className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0C0C0E] bg-[#22C55E]"
            aria-hidden="true"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold tracking-tight text-white">Alma</p>
          <p className="text-[11px] text-[#8E8E93]">{t.role}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(34,197,94,0.12)] px-2.5 py-1 text-[10px] font-medium text-[#4ADE80]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" aria-hidden="true" />
          {t.online}
        </span>
      </div>

      {/* Conversation */}
      <div className="space-y-2.5 px-5 py-5">
        <div className="flex items-start gap-2.5">
          <div className="rounded-2xl rounded-tl-md bg-[#1A1A1D] px-4 py-2.5 text-sm leading-relaxed text-white">
            {t.msg1}
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="rounded-2xl rounded-tl-md bg-[#1A1A1D] px-4 py-2.5 text-sm leading-relaxed text-[#C7C7CC]">
            {t.msg2a}
            <span className="text-white">{t.msg2strong}</span>{t.msg2b}
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="rounded-2xl rounded-tl-md bg-[#1A1A1D] px-4 py-2.5 text-sm leading-relaxed text-[#C7C7CC]">
            {t.msg3a}
            <span className="text-white">{t.msg3strong}</span>{t.msg3b}
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="rounded-2xl rounded-tl-md bg-[#1A1A1D] px-4 py-2.5 text-sm leading-relaxed text-white">
            {t.msg4}
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
                <span className="text-xs font-medium text-[#8E8E93]">{t.listening}</span>
              </motion.div>
            ) : (
              <motion.input
                key="text"
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 bg-transparent py-1.5 text-sm text-white placeholder-[#6E6E76] focus:outline-none"
                aria-label={t.domainAria}
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
              aria-label={t.stopAria}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2.5" />
              </svg>
            </button>
          ) : domain.trim() ? (
            <button
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF0099] text-white transition-colors hover:bg-[#E00085]"
              aria-label={t.sendAria}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setIsTalking(true)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF0099] text-white transition-colors hover:bg-[#E00085]"
              aria-label={t.talkAria}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4" />
              </svg>
            </button>
          )}
        </div>

        <p className="mt-2.5 text-center text-[11px] text-[#6E6E76]">
          {t.footnote}
        </p>
      </div>
    </motion.div>
  )
}
