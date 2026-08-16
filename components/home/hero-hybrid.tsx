'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Circle, Loader2, Mic, Square } from 'lucide-react'
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
    eyebrow: 'Il vous manque quelqu’un',
    headline: 'Votre propre Collaborateur IA, prêt à travailler avec vos outils.',
    subtitle: 'Confiez-lui vos appels, vos e-mails, votre prospection, vos analyses et vos tâches administratives. Il progresse à chaque mission et appartient à votre entreprise.',
    proofs: ['7 jours pour tester une vraie mission', 'Sans carte bancaire', '1 million de tokens inclus'],
    cta: 'Confier une première mission',
    console: 'Préparation de mission',
    mission: 'Mission reçue',
    collaborator: 'Collaboratrice IA',
    assigned: 'Emma sélectionnée',
    equipping: 'Alma équipe Emma',
    ready: 'Prête à travailler',
    newRole: 'Nouveau rôle nécessaire',
    newRoleDetail: 'Cette mission demande un profil commercial distinct.',
    chloeRole: 'Collaboratrice IA · Commerciale',
    preparing: 'Alma prépare Chloé',
    chloeReady: 'Chloé rejoint votre équipe',
    step: 'Étape',
    almaCaption: "Alma, coordinatrice de missions IA,\ncadre votre besoin et prépare vos collaborateurs",
    almaAction: "Parler à Alma",
    voiceKicker: 'Décrire une mission à la voix',
    voiceTitle: 'Dites à Alma ce qu’il faut accomplir.',
    voiceBody: 'Parlez naturellement. Alma transcrit votre besoin et prépare la première mission.',
    voiceStart: 'Commencer à parler',
    voiceStop: 'Terminer',
    voiceListening: 'Alma vous écoute…',
    voicePlaceholder: 'Votre besoin apparaîtra ici…',
    voiceUnsupported: 'La voix n’est pas disponible dans ce navigateur. Décrivez votre besoin par écrit.',
    voiceSubmit: 'Préparer cette mission',
    voiceBack: 'Revenir à la démonstration',
  },
  en: {
    eyebrow: 'Someone is missing',
    headline: 'Your own AI Collaborator, ready to work with your tools.',
    subtitle: 'Entrust it with calls, emails, prospects, analysis or administrative work. It works with your tools and improves with every mission.',
    proofs: ['7 days to test a real mission', 'No credit card', '1 million tokens included'],
    cta: 'Hand over a first mission',
    console: 'Mission preparation',
    mission: 'Mission received',
    collaborator: 'AI Collaborator',
    assigned: 'Emma selected',
    equipping: 'Alma equips Emma',
    ready: 'Ready to work',
    newRole: 'New role required',
    newRoleDetail: 'This mission requires a distinct sales profile.',
    chloeRole: 'AI Collaborator · Sales',
    preparing: 'Alma prepares Chloé',
    chloeReady: 'Chloé joins your team',
    step: 'Step',
    almaCaption: "Alma, AI mission coordinator, scopes your needs and prepares your collaborators.",
    almaAction: "Talk to Alma",
    voiceKicker: 'Describe a mission by voice',
    voiceTitle: 'Tell Alma what needs to get done.',
    voiceBody: 'Speak naturally. Alma transcribes your need and prepares the first mission.',
    voiceStart: 'Start talking',
    voiceStop: 'Finish',
    voiceListening: 'Alma is listening…',
    voicePlaceholder: 'Your need will appear here…',
    voiceUnsupported: 'Voice is not available in this browser. Describe your need in writing.',
    voiceSubmit: 'Prepare this mission',
    voiceBack: 'Return to the demo',
  },
} as const

const JOURNEYS = {
  fr: [
    { mission: 'Traiter les emails entrants', skills: ['Gestion des emails', 'Priorisation', 'Outlook'] },
    { mission: 'Préparer les comptes rendus', skills: ['Transcription', 'Synthèse', 'Microsoft Teams'] },
    { mission: 'Organiser l’agenda', skills: ['Disponibilités', 'Planification', 'Google Agenda'] },
    { mission: 'Trouver de nouveaux prospects', skills: [] },
  ],
  en: [
    { mission: 'Handle incoming emails', skills: ['Email management', 'Prioritization', 'Outlook'] },
    { mission: 'Prepare meeting notes', skills: ['Transcription', 'Summarization', 'Microsoft Teams'] },
    { mission: 'Organize the calendar', skills: ['Availability', 'Planning', 'Google Calendar'] },
    { mission: 'Find new prospects', skills: [] },
  ],
} as const

const ease = [0.22, 1, 0.36, 1] as const
const PHASE_MS = 1300
type Phase = 0 | 1 | 2 | 3

export function HeroHybrid({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const journeys = JOURNEYS[lang]
  const reduce = useReducedMotion()
  const router = useRouter()
  const [showVoice, setShowVoice] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [cycle, setCycle] = useState(0)
  const [phase, setPhase] = useState<Phase>(0)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const current = journeys[cycle]
  const isChloe = cycle === journeys.length - 1

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
    if (reduce) return
    const id = setTimeout(() => {
      if (phase < 3) setPhase((phase + 1) as Phase)
      else {
        setCycle((value) => (value + 1) % journeys.length)
        setPhase(0)
      }
    }, phase === 3 ? 1900 : PHASE_MS)
    return () => clearTimeout(id)
  }, [cycle, journeys.length, phase, reduce])

  const visiblePhase = reduce ? 3 : phase
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
    router.push(`/decouvrir?draft=${encodeURIComponent(draftId)}`)
  }

  return (
    <section className="relative overflow-hidden bg-[#F3EFE6] pb-12 pt-24 sm:pt-28 lg:pb-16">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-[#D10E63]/[0.07] blur-3xl" />
      <div className="editorial-shell relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="max-w-xl text-center sm:text-left">
          <motion.div {...enter(0)} className="mb-5 flex justify-center sm:justify-start"><Kicker>{t.eyebrow}</Kicker></motion.div>
          <motion.h1 {...enter(0.08)} className="hero-heading text-[#1C1A17]">{t.headline}</motion.h1>
          <motion.p {...enter(0.16)} className="mt-5 text-balance text-[17px] leading-relaxed text-[#4E483F] md:text-lg">{t.subtitle}</motion.p>

          <motion.div {...enter(0.28)} className="mt-7 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-[#6E665A] sm:justify-start">
            {t.proofs.map((proof) => <span key={proof} className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#D10E63]" />{proof}</span>)}
          </motion.div>

          <motion.div {...enter(0.34)} className="mt-8">
            <Link href="/decouvrir" onClick={() => track('home_cta_clicked', { position: 'hero', label: t.cta })} className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-white shadow-[0_14px_30px_-12px_rgba(209,14,99,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6] sm:w-auto">
              {t.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <motion.div {...enter(0.18)} className="mx-auto w-full max-w-2xl">
          <AnimatePresence mode="wait" initial={false}>
          {showVoice ? (
            <motion.div key="voice" initial={reduce ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }} transition={{ duration: reduce ? 0 : 0.35, ease }}>
              <div className="relative flex min-h-[509px] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#17130F] p-5 text-[#F8F1E7] shadow-[0_34px_80px_-28px_rgba(23,19,15,0.65)] sm:p-7">
                <div aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#F15B9B] to-transparent" />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Image src="/alma-avatar.png" alt="Alma" width={44} height={44} className="size-11 rounded-full object-cover ring-2 ring-[#D10E63]/35" />
                    <div><p className="font-sf font-semibold">Alma</p><p className="text-xs text-[#D6CABD]">{t.voiceKicker}</p></div>
                  </div>
                  <button type="button" onClick={() => { recognitionRef.current?.abort(); setListening(false); setShowVoice(false) }} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-xs font-bold text-[#D6CABD] hover:border-white/30 hover:text-white">
                    <ArrowLeft className="size-3.5" />{t.voiceBack}
                  </button>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
                  <button type="button" onClick={toggleListening} disabled={!voiceSupported} aria-pressed={listening} aria-label={listening ? t.voiceStop : t.voiceStart} className={`relative flex size-24 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#F15B9B] disabled:cursor-not-allowed disabled:opacity-50 ${listening ? 'bg-[#D10E63] text-white' : 'bg-[#D10E63]/15 text-[#F15B9B] ring-1 ring-[#D10E63]/30 hover:bg-[#D10E63]/25'}`}>
                    {listening && !reduce && <motion.span aria-hidden className="absolute inset-0 rounded-full border border-[#F15B9B]" animate={{ scale: [1, 1.45], opacity: [0.65, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />}
                    {listening ? <Square className="size-7" fill="currentColor" /> : <Mic className="size-9" />}
                  </button>
                  <h2 className="mt-6 max-w-md text-balance font-sf text-2xl font-semibold tracking-[-0.025em] sm:text-[28px]">{t.voiceTitle}</h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-[#D6CABD]">{voiceSupported ? (listening ? t.voiceListening : t.voiceBody) : t.voiceUnsupported}</p>
                </div>

                <textarea value={transcript} onChange={(event) => setTranscript(event.target.value)} rows={2} placeholder={t.voicePlaceholder} className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-[#887D72] focus:border-[#D10E63]" />
                <button type="button" onClick={submitVoiceNeed} disabled={!transcript.trim()} className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white transition-colors hover:bg-[#E51872] disabled:cursor-not-allowed disabled:opacity-40">
                  {t.voiceSubmit}<ArrowRight className="size-4" />
                </button>
              </div>
            </motion.div>
          ) : (
          <motion.div key="demo" initial={reduce ? false : { opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, x: 20 }} transition={{ duration: reduce ? 0 : 0.35, ease }}>
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#17130F] text-[#F8F1E7] shadow-[0_34px_80px_-28px_rgba(23,19,15,0.65)] min-h-[420px]">
            <div aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#F15B9B] to-transparent" />
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#D10E63]" /><span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#D6CABD]">{t.console}</span></div>
              <span className="font-mono text-[10px] text-[#AFA397]">{t.step} {visiblePhase + 1}/4</span>
            </div>

            <div className="p-5 sm:p-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={cycle} initial={reduce ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, x: -14 }} transition={{ duration: reduce ? 0 : 0.35, ease }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#887D72]">{t.mission}</p>
                  <h2 className="mt-2 font-sf text-[25px] font-semibold tracking-[-0.025em] text-white sm:text-[30px]">{current.mission}</h2>

                  <div className="mt-7 grid gap-7 sm:grid-cols-[150px_1fr]">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <Image src={isChloe ? '/images/chloe-avatar.png' : '/images/emma-avatar.png'} alt={isChloe ? 'Chloé' : 'Emma'} width={56} height={56} className="h-14 w-14 rounded-full object-cover ring-2 ring-[#D10E63]/30" />
                      <p className="mt-3 font-sf text-lg font-semibold">{isChloe ? 'Chloé' : 'Emma'}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#D6CABD]">{isChloe ? t.chloeRole : t.collaborator}</p>
                    </div>

                    <ol className="space-y-4">
                      <TimelineRow label={t.mission} status={visiblePhase > 0 ? 'done' : 'active'} />
                      <TimelineRow label={isChloe ? t.newRole : t.assigned} detail={isChloe ? t.newRoleDetail : undefined} status={visiblePhase > 1 ? 'done' : visiblePhase === 1 ? 'active' : 'next'} />
                      <TimelineRow label={isChloe ? t.preparing : t.equipping} status={visiblePhase > 2 ? 'done' : visiblePhase === 2 ? 'active' : 'next'}>
                        {!isChloe && visiblePhase >= 2 && <div className="mt-3 flex flex-wrap gap-2">{current.skills.map((skill, index) => <motion.span key={skill} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: index < (visiblePhase === 2 ? 2 : 3) ? 1 : 0.3, y: 0 }} transition={{ delay: reduce ? 0 : index * 0.18 }} className="rounded-full border border-[#D10E63]/25 bg-[#D10E63]/10 px-2.5 py-1 text-[11px] text-[#F3B4CF]">{skill}</motion.span>)}</div>}
                      </TimelineRow>
                      <TimelineRow label={isChloe ? t.chloeReady : t.ready} status={visiblePhase === 3 ? 'done' : 'next'} />
                    </ol>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <motion.div {...enter(0.24)} className="mt-5 flex flex-col justify-between gap-4 rounded-[26px] border border-white/10 bg-[#17130F] p-4 text-left sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Image 
                src="/alma-avatar.png" 
                alt="Alma" 
                width={40} 
                height={40} 
                className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-[#D10E63]/30" 
              />
              <p className="max-w-[280px] whitespace-pre-line text-[13px] font-medium leading-relaxed text-[#D6CABD] sm:max-w-none">
                {t.almaCaption}
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setShowVoice(true); track('home_cta_clicked', { position: 'hero_voice', label: t.almaAction }) }}
              className="group flex items-center gap-1.5 self-start whitespace-nowrap text-xs font-bold text-[#F15B9B] hover:text-[#F8A3CB] sm:self-auto"
            >
              {t.almaAction}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </motion.div>
          )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function TimelineRow({ label, detail, status, children }: { label: string; detail?: string; status: 'done' | 'active' | 'next'; children?: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[20px_1fr] gap-3">
      <span className="mt-0.5 flex h-5 w-5 items-center justify-center">
        {status === 'done' ? <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D10E63] text-white"><Check className="h-3 w-3" strokeWidth={3} /></span> : status === 'active' ? <Loader2 className="h-5 w-5 animate-spin text-[#F15B9B]" /> : <Circle className="h-4 w-4 text-[#625A52]" />}
      </span>
      <div className={status === 'next' ? 'text-[#AFA397]' : 'text-[#F8F1E7]'}>
        <p className="text-sm font-medium">{label}</p>
        {detail && <p className="mt-1 text-xs leading-relaxed text-[#AFA397]">{detail}</p>}
        {children}
      </div>
    </li>
  )
}
