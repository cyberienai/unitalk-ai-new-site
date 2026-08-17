'use client'

import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { AlmaInline } from '@/components/alma-inline'
import { AlmaMissionComposer } from '@/components/alma-mission-composer'
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
    headlineC: 'Prêt à accomplir vos missions.',
    subtitle: 'Alma personnalise son identité, son rôle et ses outils selon vos règles. Chaque mission validée enrichit ses compétences.',
    proofs: ['Première mission offerte', 'Sans carte bancaire', 'Sans engagement', 'Accompagnement humain si nécessaire'],
    cta: 'Décrire mon besoin',
    voiceKicker: 'Coordinatrice de missions IA Unitalk',
    voiceTitle: 'Quel travail voulez-vous confier à votre Collaborateur IA ?',
    voiceBody: '',
    voiceStart: 'Commencer à parler',
    voiceStop: 'Terminer',
    voiceListening: 'Alma vous écoute…',
    voicePlaceholder: 'Décrivez simplement le résultat attendu…',
    voiceUnsupported: 'La voix n’est pas disponible dans ce navigateur. Décrivez votre besoin par écrit.',
    voiceSubmit: 'Personnaliser mon Collaborateur IA',
    examples: ['Qualifier mes prospects', 'Répondre à mes clients', 'Préparer mes factures', 'Construire mon calendrier éditorial', 'Organiser l’intégration d’un nouveau salarié'],
    previewMission: 'Aperçu de mission',
    previewCollaborator: 'Exemple de profil adapté',
    previewReady: 'À confirmer avec vous',
  },
  en: {
    eyebrow: 'Is someone missing from your team?',
    headline: 'Your own AI Collaborator, ready to carry out your missions.',
    headlineA: 'Your own',
    headlineB: 'AI Collaborator.',
    headlineC: 'Ready to carry out your missions.',
    subtitle: 'Alma customizes its identity, role and tools under your rules. Each approved mission enriches its skills.',
    proofs: ['First mission included', 'No credit card', 'No commitment', 'Human support when needed'],
    cta: 'Describe my mission',
    voiceKicker: 'Unitalk AI mission coordinator',
    voiceTitle: 'What work would you like to assign to your AI Collaborator?',
    voiceBody: '',
    voiceStart: 'Start talking',
    voiceStop: 'Finish',
    voiceListening: 'Alma is listening…',
    voicePlaceholder: 'Simply describe the expected outcome…',
    voiceUnsupported: 'Voice is not available in this browser. Describe your need in writing.',
    voiceSubmit: 'Customize my AI Collaborator',
    examples: ['Qualify my prospects', 'Reply to my customers', 'Prepare my invoices', 'Build my editorial calendar', 'Organize a new employee’s onboarding'],
    previewMission: 'Mission preview',
    previewCollaborator: 'Example suitable profile',
    previewReady: 'To be confirmed with you',
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
    <section className="relative overflow-hidden bg-[#F3EFE6] pb-10 pt-24 sm:pb-12 sm:pt-28 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-5 lg:pt-[88px] [@media(min-width:1024px)_and_(max-height:800px)]:pb-3 [@media(min-width:1024px)_and_(max-height:800px)]:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[#D10E63]/[0.08] blur-3xl" />
      <div className="editorial-shell relative w-full">
        <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 [@media(min-width:1024px)_and_(max-height:800px)]:gap-9">
          <div className="max-w-[720px] text-left">
          <motion.div {...enter(0)} className="mb-4 flex lg:mb-4"><Kicker>{t.eyebrow}</Kicker></motion.div>
          <motion.h1 {...enter(0.08)} className="text-[clamp(2.65rem,12vw,4.5rem)] font-semibold leading-[.9] tracking-[-.065em] text-[#1C1A17] lg:text-[clamp(3.1rem,4.8vw,5rem)] [@media(min-width:1024px)_and_(max-height:800px)]:text-[clamp(3rem,4.5vw,4.5rem)]">
            <span className="block">{t.headlineA}</span>
            <span className="block">{t.headlineB}</span>
            <span className="block text-[#D10E63]">{t.headlineC}</span>
          </motion.h1>
           <motion.p {...enter(0.16)} className="mt-4 max-w-xl text-[15px] leading-6 text-[#4E483F] sm:mt-5 sm:text-[17px] sm:leading-8 md:text-lg lg:mt-4 lg:text-[16px] lg:leading-7"><AlmaInline className="mr-1" />{t.subtitle}</motion.p>
        </div>

         <motion.div id="alma-hero" ref={voicePanelRef} {...enter(0.18)} className="mx-auto w-full max-w-2xl scroll-mt-24">
            <motion.div initial={reduce ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduce ? 0 : 0.35, ease }}>
              <AlmaMissionComposer
                value={transcript}
                onChange={setTranscript}
                onSubmit={submitVoiceNeed}
                title={t.voiceTitle}
                body={t.voiceBody}
                role={t.voiceKicker}
                placeholder={t.voicePlaceholder}
                submitLabel={t.voiceSubmit}
                starters={t.examples}
                listening={listening}
                onToggleListening={toggleListening}
                voiceSupported={voiceSupported}
                voiceStartLabel={t.voiceStart}
                voiceStopLabel={t.voiceStop}
                listeningLabel={t.voiceListening}
                textareaRef={textareaRef}
                previewVisible={Boolean(inputPreview)}
                attention={promptAttention}
                compactMobile
                compactDesktop
                preview={inputPreview && <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-[1.2fr_1fr_auto]"><div className="bg-[#211E1A] p-3.5"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#F3B4CF]">{t.previewMission}</p><p className="mt-1.5 line-clamp-2 font-sf text-[15px] font-semibold leading-5 text-white">{inputPreview.title}</p></div><div className="bg-[#211E1A] p-3.5"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#F3B4CF]">{t.previewCollaborator}</p><p className="mt-1.5 text-[13px] font-semibold text-white">{inputPreview.name}</p><p className="mt-0.5 text-[10px] text-[#AFA397]">{inputPreview.role}</p></div><div className="flex min-w-[144px] items-center justify-center gap-2 bg-[#D10E63] px-3 py-3 text-center text-[11px] font-bold leading-4 text-white"><Check className="size-4 shrink-0" />{t.previewReady}</div></div>}
              />
            </motion.div>
          </motion.div>
        </div>
        <motion.div {...enter(0.32)} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#CFC5B5] pt-4 sm:mt-8 lg:mt-6">
          {t.proofs.map((proof) => (
            <span key={proof} className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#6E665A]">
              <Check aria-hidden="true" className="size-3.5 shrink-0 text-[#D10E63]" />{proof}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function getPreparedDemo(value: string, lang: Lang) {
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
