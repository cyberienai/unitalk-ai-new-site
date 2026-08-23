'use client'

import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { AlmaInline } from '@/components/alma-inline'
import { AlmaMissionComposer } from '@/components/alma-mission-composer'
import { track } from '@vercel/analytics'
import { localizedHref } from '@/lib/i18n-routing'

const T = {
  fr: {
    eyebrow: 'Une mission à accomplir ?',
    headlineA: 'Confiez une mission concrète',
    headlineB: 'à votre Collaborateur IA.',
    subtitleBeforeAlma: 'Décrivez le résultat attendu.',
    subtitleAfterAlma: 'configure le Collaborateur IA adapté, prépare sa mission et définit avec vous les actions qu’il peut réaliser seul ou soumettre à votre validation.',
    pricing: 'Première mission offerte, jusqu’à 7 jours · Sans carte bancaire ·',
    pricingCta: 'Voir les tarifs',
    cta: 'Préparer ma mission avec Alma',
    voiceKicker: 'Coordinatrice de missions IA',
    voiceTitle: 'Quel travail voulez-vous confier ?',
    voiceBody: '',
    voiceStart: 'Commencer à parler',
    voiceStop: 'Terminer',
    voiceListening: 'Alma vous écoute…',
    voicePlaceholder: 'Ex. Relancer les factures impayées sans contacter les clients en litige…',
    voiceUnsupported: 'La voix n’est pas disponible dans ce navigateur. Décrivez votre besoin par écrit.',
    voiceSubmit: 'Préparer ma mission',
    examples: ['Trouver de nouveaux clients', 'Participer à une visio', 'Relancer des factures'],
  },
  en: {
    eyebrow: 'A mission to accomplish?',
    headlineA: 'Entrust concrete work',
    headlineB: 'to an AI Collaborator.',
    subtitleBeforeAlma: 'Describe the expected outcome.',
    subtitleAfterAlma: 'configures the right AI Collaborator, prepares the mission and defines with you which actions it can perform alone or submit for approval.',
    pricing: 'First mission included, for up to 7 days · No credit card ·',
    pricingCta: 'See pricing',
    cta: 'Prepare my mission with Alma',
    voiceKicker: 'AI mission coordinator',
    voiceTitle: 'What work would you like to assign?',
    voiceBody: '',
    voiceStart: 'Start talking',
    voiceStop: 'Finish',
    voiceListening: 'Alma is listening…',
    voicePlaceholder: 'E.g. Follow up unpaid invoices without contacting customers in dispute…',
    voiceUnsupported: 'Voice is not available in this browser. Describe your need in writing.',
    voiceSubmit: 'Prepare my mission',
    examples: ['Find new customers', 'Join a video call', 'Follow up invoices'],
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function HeroHybrid({ lang = 'fr', value, onChange, listening, onToggleListening, voiceSupported, voiceError }: { lang?: Lang; value: string; onChange: (value: string) => void; listening: boolean; onToggleListening: () => void; voiceSupported: boolean; voiceError?: string }) {
  const t = T[lang]
  const reduce = useReducedMotion()
  const router = useRouter()
  const [promptAttention, setPromptAttention] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const voicePanelRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const openVoiceSurface = useEffectEvent(() => {
    setPromptAttention(true)
    track('home_cta_clicked', { position: 'hero', label: t.cta })
    window.setTimeout(() => {
      voicePanelRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
      textareaRef.current?.focus({ preventScroll: true })
    }, 0)
    window.setTimeout(() => setPromptAttention(false), 1400)
  })

  useEffect(() => {
    const open = () => openVoiceSurface()
    window.addEventListener('open-home-alma', open)
    return () => window.removeEventListener('open-home-alma', open)
  })

  const enter = (delay: number) => ({
    initial: false as const,
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay: reduce ? 0 : delay, ease },
  })

  function handoffNeed(value: string) {
    const clean = value.trim()
    if (!clean) return
    setSubmissionError('')
    const draftId = `draft_${typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2)}`}`
    try {
      localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, createdAt: Date.now() }))
    } catch {
      setSubmissionError(lang === 'fr' ? 'Votre navigateur n’autorise pas la conservation sécurisée de ce brouillon. Vérifiez ses réglages puis réessayez.' : 'Your browser does not allow this draft to be stored securely. Check its settings and try again.')
      return
    }
    track('alma_need_submitted', { mode: listening ? 'voice' : 'text', source: 'hero' })
    const params = new URLSearchParams({ source: 'home-hero' })
    params.set('draft', draftId)
    router.push(`${localizedHref('discover', lang)}?${params}`)
  }

  function submitVoiceNeed() {
    handoffNeed(value)
  }

  return (
    <section className="relative overflow-hidden bg-[#F3EFE6] pb-10 pt-24 sm:pb-12 sm:pt-28 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-5 lg:pt-[88px] [@media(min-width:1024px)_and_(max-height:800px)]:pb-3 [@media(min-width:1024px)_and_(max-height:800px)]:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[#D10E63]/[0.08] blur-3xl" />
      <div className="editorial-shell relative w-full">
        <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-[1.14fr_0.86fr] lg:gap-10 [@media(min-width:1024px)_and_(max-height:800px)]:gap-8">
          <div className="max-w-[720px] text-left">
          <motion.div {...enter(0)} className="mb-4 flex lg:mb-4"><Kicker>{t.eyebrow}</Kicker></motion.div>
          <motion.h1 {...enter(0.08)} className="max-w-[760px] text-[clamp(2.65rem,12vw,4.75rem)] font-semibold leading-[.92] tracking-[-.06em] text-[#1C1A17] lg:text-[clamp(3.25rem,5vw,4.75rem)] [@media(min-width:1024px)_and_(max-height:800px)]:text-[clamp(3rem,4.6vw,4.4rem)]">
            {t.headlineA}{' '}
            <span className="text-[#D10E63]">{t.headlineB}</span>
          </motion.h1>
           <motion.p {...enter(0.16)} className="mt-4 max-w-xl text-[15px] leading-6 text-[#4E483F] sm:mt-5 sm:text-[17px] sm:leading-8 md:text-lg lg:mt-4 lg:text-[16px] lg:leading-7">{t.subtitleBeforeAlma} <span className="whitespace-nowrap"><AlmaInline className="mr-1 align-[-.2em]" />Alma</span> {t.subtitleAfterAlma}</motion.p>
        </div>

         <motion.div id="alma-hero" ref={voicePanelRef} {...enter(0.18)} className="mx-auto w-full max-w-2xl scroll-mt-24">
            <motion.div initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduce ? 0 : 0.35, ease }}>
              <AlmaMissionComposer
                 value={value}
                 onChange={onChange}
                onSubmit={submitVoiceNeed}
                title={t.voiceTitle}
                body={t.voiceBody}
                role={t.voiceKicker}
                placeholder={t.voicePlaceholder}
                submitLabel={t.voiceSubmit}
                starters={t.examples}
                 onStarterSelect={onChange}
                listening={listening}
                 onToggleListening={onToggleListening}
                voiceSupported={voiceSupported}
                voiceStartLabel={t.voiceStart}
                voiceStopLabel={t.voiceStop}
                 listeningLabel={t.voiceListening}
                 error={voiceError || submissionError}
                textareaRef={textareaRef}
                 attention={promptAttention}
                compactMobile
                compactDesktop
                titleInField
               />
            </motion.div>
          </motion.div>
        </div>
        <motion.p {...enter(0.32)} className="mt-6 border-b border-[#CFC5B5] pb-4 text-[12px] font-black leading-5 text-[#1C1A17] sm:mt-8 lg:mt-6">
          {t.pricing}{' '}
          <Link href={localizedHref('pricing', lang)} className="font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{t.pricingCta}</Link>
        </motion.p>
      </div>
    </section>
  )
}
