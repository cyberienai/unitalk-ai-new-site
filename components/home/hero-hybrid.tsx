'use client'

import Image from 'next/image'
import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Mic, Square } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { track } from '@vercel/analytics'

type SpeechResultEvent = { results: ArrayLike<{ 0: { transcript: string } }> }
type SpeechRecognitionInstance = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechResultEvent) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === 'undefined') return null
  const speechWindow = window as typeof window & {
    SpeechRecognition?: new () => SpeechRecognitionInstance
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance
  }
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null
}

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un ?',
    headline: 'Votre propre Collaborateur IA, prêt à accomplir vos missions.',
    headlineA: 'Votre propre',
    headlineB: 'Collaborateur IA.',
    headlineC: 'Prêt pour vos missions.',
    subtitle: 'Confiez-lui vos appels, vos e-mails, votre prospection ou vos tâches administratives. Il travaille avec votre équipe et progresse à chaque mission.',
    proofs: ['Première mission offerte', 'Mission prête en quelques minutes', 'Sans carte bancaire'],
    techSignature: 'Propulsé par Hermes · Open source · Hébergé en France',
    cta: 'Décrire ma mission',
    voiceKicker: 'Coordinatrice de missions IA',
    voiceTitle: 'Décrivez le travail à accomplir.',
    voiceBody: 'Alma transforme votre besoin en mission. Connectez-vous ensuite pour préparer votre Collaborateur IA.',
    voiceStart: 'Commencer à parler',
    voiceStop: 'Terminer',
    voiceListening: 'Alma vous écoute…',
    voicePlaceholder: 'Décrivez votre besoin…',
    voiceUnsupported: 'La voix n’est pas disponible dans ce navigateur. Décrivez votre besoin par écrit.',
    voiceSubmit: 'Continuer avec cette mission',
    examples: ['Qualifier mes prospects', 'Traiter mes e-mails entrants'],
    previewMission: 'Proposition d’Alma',
    previewCollaborator: 'Collaborateur recommandé',
    previewReady: 'Recommandé pour cette mission',
  },
  en: {
    eyebrow: 'Someone is missing',
    headline: 'Your own AI Collaborator, ready to carry out your missions.',
    headlineA: 'Your own',
    headlineB: 'AI Collaborator.',
    headlineC: 'Ready for your missions.',
    subtitle: 'Entrust it with calls, emails, prospecting or administrative work. It works with your team and improves with every mission.',
    proofs: ['First mission included', 'Mission ready in minutes', 'No credit card'],
    techSignature: 'Powered by Hermes · Open source · Hosted in France',
    cta: 'Describe my mission',
    voiceKicker: 'AI mission coordinator',
    voiceTitle: 'Describe the work to be done.',
    voiceBody: 'Alma turns your need into a mission. Then sign in to prepare your AI Collaborator.',
    voiceStart: 'Start talking',
    voiceStop: 'Finish',
    voiceListening: 'Alma is listening…',
    voicePlaceholder: 'Describe your need…',
    voiceUnsupported: 'Voice is not available in this browser. Describe your need in writing.',
    voiceSubmit: 'Continue with this mission',
    examples: ['Qualify my prospects', 'Handle my incoming emails'],
    previewMission: 'Alma’s proposal',
    previewCollaborator: 'Recommended AI Collaborator',
    previewReady: 'Recommended for this mission',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function HeroHybrid({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion()
  const router = useRouter()
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [promptAttention, setPromptAttention] = useState(false)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const voicePanelRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const cleanTranscript = transcript.trim()
  const inputPreview = cleanTranscript.length >= 20 ? getPreparedDemo(cleanTranscript, lang) : null
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
    const SpeechRecognition = getSpeechRecognition()
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = (event) => {
      let value = ''
      for (let index = 0; index < event.results.length; index++) value += event.results[index][0].transcript
      setTranscript(value.trim())
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition
    const id = window.setTimeout(() => setVoiceSupported(true), 0)
    return () => {
      window.clearTimeout(id)
      recognition.abort()
      recognitionRef.current = null
    }
  }, [lang])

  useEffect(() => {
    const open = () => openVoiceSurface()
    window.addEventListener('open-home-alma', open)
    return () => window.removeEventListener('open-home-alma', open)
  })

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay: reduce ? 0 : delay, ease },
  })

  function toggleListening() {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (listening) {
      recognition.stop()
      return
    }
    setTranscript('')
    setListening(true)
    track('alma_voice_started', { source: 'hero' })
    try {
      recognition.start()
    } catch {
      setListening(false)
    }
  }

  function submitVoiceNeed() {
    const clean = transcript.trim()
    if (!clean) return
    const draftId = `draft_${crypto.randomUUID()}`
    try {
      localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, createdAt: Date.now() }))
    } catch {}
    track('alma_need_submitted', { mode: 'voice', source: 'hero' })
    router.push(`/decouvrir?draft=${encodeURIComponent(draftId)}&source=mission-store`)
  }

  return (
    <section className="relative overflow-hidden border-b border-[#CFC5B5] bg-[#F3EFE6] pb-12 pt-24 sm:pt-28 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-5 lg:pt-[88px] [@media(min-width:1024px)_and_(max-height:800px)]:pb-3 [@media(min-width:1024px)_and_(max-height:800px)]:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[#D10E63]/[0.08] blur-3xl" />
      <div className="editorial-shell relative grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 [@media(min-width:1024px)_and_(max-height:800px)]:gap-9">
        <div className="max-w-[720px] text-left">
          <motion.div {...enter(0)} className="mb-5 flex lg:mb-4"><Kicker>{t.eyebrow}</Kicker></motion.div>
          <motion.h1 {...enter(0.08)} className="text-[clamp(3.25rem,6.1vw,6.5rem)] font-semibold leading-[.88] tracking-[-.07em] text-[#1C1A17] lg:text-[clamp(3.1rem,4.8vw,5rem)] [@media(min-width:1024px)_and_(max-height:800px)]:text-[clamp(3rem,4.5vw,4.5rem)]">
            <span className="block">{t.headlineA}</span>
            <span className="block">{t.headlineB}</span>
            <span className="block text-[#D10E63]">{t.headlineC}</span>
          </motion.h1>
          <motion.p {...enter(0.16)} className="mt-6 max-w-xl text-[17px] leading-8 text-[#4E483F] md:text-lg lg:mt-4 lg:text-[16px] lg:leading-7">{t.subtitle}</motion.p>

          <motion.div {...enter(0.28)} className="mt-7 flex flex-wrap gap-3 lg:mt-5">
            {t.proofs.map((proof) => (
              <span key={proof} className="inline-flex items-center gap-2 rounded-xl border border-[#D10E63]/15 bg-[#D10E63]/[0.07] px-3.5 py-2 text-xs font-bold text-[#B00C54]">
                <Check aria-hidden="true" className="size-3.5 shrink-0" />{proof}
              </span>
            ))}
          </motion.div>
          <motion.p {...enter(0.31)} className="mt-3 text-[11px] font-semibold text-[#6E665A]">{t.techSignature}</motion.p>
        </div>

         <motion.div id="alma-hero" ref={voicePanelRef} {...enter(0.18)} className="mx-auto w-full max-w-2xl scroll-mt-24">
            <motion.div initial={reduce ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduce ? 0 : 0.35, ease }}>
              <div className="relative flex min-h-[430px] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#17130F] p-5 text-[#F8F1E7] shadow-[0_34px_80px_-28px_rgba(23,19,15,0.65)] sm:min-h-[480px] sm:p-7 lg:min-h-0 lg:p-5">
                <div aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#F15B9B] to-transparent" />
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3">
                    <Image src="/alma-avatar.png" alt="Alma" width={44} height={44} className="size-11 rounded-full object-cover ring-2 ring-[#D10E63]/35" />
                    <div><p className="font-sf font-semibold">Alma</p><p className="text-xs text-[#D6CABD]">{t.voiceKicker}</p></div>
                  </div>
                </div>

                <div className="flex min-h-[94px] items-center py-4">
                  <AnimatePresence mode="wait" initial={false}>
                    {inputPreview ? (
                      <motion.div key="preview" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full text-left">
                        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-[1.2fr_1fr_auto]">
                          <div className="bg-[#211E1A] p-3.5"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#F3B4CF]">{t.previewMission}</p><p className="mt-1.5 line-clamp-2 font-sf text-[15px] font-semibold leading-5 text-white">{inputPreview.title}</p></div>
                          <div className="bg-[#211E1A] p-3.5"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#F3B4CF]">{t.previewCollaborator}</p><p className="mt-1.5 text-[13px] font-semibold text-white">{inputPreview.name}</p><p className="mt-0.5 text-[10px] text-[#AFA397]">{inputPreview.role}</p></div>
                          <div className="flex min-w-[144px] items-center justify-center gap-2 bg-[#D10E63] px-3 py-3 text-center text-[11px] font-bold leading-4 text-white"><Check className="size-4 shrink-0" />{t.previewReady}</div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="prompt" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-left">
                        <h2 className="text-balance font-sf text-[24px] font-semibold tracking-[-0.025em]">{t.voiceTitle}</h2>
                        <p className="mt-2 max-w-md text-[13px] leading-5 text-[#D6CABD]">{t.voiceBody}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <textarea ref={textareaRef} value={transcript} onChange={(event) => setTranscript(event.target.value)} rows={3} placeholder={t.voicePlaceholder} aria-label={t.voicePlaceholder} className={`w-full resize-none rounded-2xl border bg-white/[0.07] px-4 py-3 pr-16 text-[15px] leading-6 text-white outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-[#AFA397] focus:border-[#D10E63] focus:bg-white/[0.09] ${promptAttention ? 'border-[#F15B9B] shadow-[0_0_0_4px_rgba(209,14,99,0.16)]' : 'border-white/15'}`} />
                  {voiceSupported && (
                    <button type="button" onClick={toggleListening} aria-pressed={listening} aria-label={listening ? t.voiceStop : t.voiceStart} className={`absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#F15B9B] ${listening ? 'bg-[#D10E63] text-white' : 'bg-white/10 text-[#F15B9B] hover:bg-white/15'}`}>
                      {listening && !reduce && <motion.span aria-hidden className="absolute inset-0 rounded-full border border-[#F15B9B]" animate={{ scale: [1, 1.3], opacity: [0.6, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />}
                      {listening ? <Square className="size-3.5" fill="currentColor" /> : <Mic className="size-4" />}
                    </button>
                  )}
                </div>
                {listening && <p className="mt-2 text-xs font-medium text-[#F3B4CF]">{t.voiceListening}</p>}
                <div className="mt-3 min-h-7">
                  {!inputPreview && (
                    <div className="flex flex-wrap gap-2">
                    {t.examples.map((example) => <button key={example} type="button" onClick={() => { setTranscript(example); textareaRef.current?.focus() }} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-left text-[11px] font-medium text-[#D6CABD] transition-colors hover:border-[#D10E63]/50 hover:text-white">{example}</button>)}
                    </div>
                  )}
                </div>
                <AnimatePresence initial={false}>
                  {cleanTranscript && (
                    <motion.button
                      type="button"
                      onClick={submitVoiceNeed}
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                      transition={{ duration: reduce ? 0 : 0.2, ease }}
                      className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#E51872] px-6 text-sm font-bold text-white shadow-[0_8px_24px_-12px_rgba(229,24,114,.8)] transition-colors hover:bg-[#F02A82]"
                    >
                      {t.voiceSubmit}<ArrowRight className="size-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function getPreparedDemo(value: string, lang: Lang) {
  const normalized = value.toLocaleLowerCase(lang)

  if (normalized.includes('factur') || normalized.includes('invoice')) {
    return lang === 'fr'
      ? {
          title: 'Relancer les factures impayées',
          objective: 'Obtenir le règlement des factures échues sans relancer les dossiers en litige.',
          rule: 'Ne jamais contacter un client ayant un litige ouvert. Validation avant contentieux.',
          name: 'Emma', role: 'Collaboratrice IA · Finance', avatar: '/images/emma-avatar.png',
          skills: ['Messagerie', 'Facturation', 'CRM'],
        }
      : {
          title: 'Follow up on unpaid invoices',
          objective: 'Collect overdue invoices without contacting customers with an open dispute.',
          rule: 'Never contact a customer with an open dispute. Approval before collections.',
          name: 'Emma', role: 'AI Collaborator · Finance', avatar: '/images/emma-avatar.png',
          skills: ['Email', 'Billing', 'CRM'],
        }
  }

  if (normalized.includes('e-mail') || normalized.includes('email') || normalized.includes('mail')) {
    return lang === 'fr'
      ? {
          title: 'Traiter les e-mails entrants',
          objective: 'Trier les messages, préparer les réponses et signaler les demandes sensibles.',
          rule: 'Signaler les demandes sensibles et valider leur réponse avant envoi.',
          name: 'Emma', role: 'Collaboratrice IA · Assistante de direction', avatar: '/images/emma-avatar.png',
          skills: ['Outlook', 'Priorisation', 'Microsoft Teams'],
        }
      : {
          title: 'Handle incoming emails',
          objective: 'Sort messages, prepare replies and flag sensitive requests.',
          rule: 'Flag sensitive requests and approve their reply before sending.',
          name: 'Emma', role: 'AI Collaborator · Executive Assistant', avatar: '/images/emma-avatar.png',
          skills: ['Outlook', 'Prioritization', 'Microsoft Teams'],
        }
  }

  return lang === 'fr'
    ? {
        title: value.trim(),
        objective: 'Transformer votre demande en résultat concret et vérifiable.',
        rule: 'Les règles et validations seront confirmées avec votre entreprise.',
        name: 'Emma', role: 'Collaboratrice IA recommandée par Alma', avatar: '/images/emma-avatar.png',
        skills: ['Objectif', 'Applications', 'Validations'],
      }
    : {
        title: value.trim(),
        objective: 'Turn your request into a concrete, verifiable result.',
        rule: 'Rules and approvals will be confirmed with your company.',
        name: 'Emma', role: 'AI Collaborator recommended by Alma', avatar: '/images/emma-avatar.png',
        skills: ['Objective', 'Applications', 'Approvals'],
      }
}
