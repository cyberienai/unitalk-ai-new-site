'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, FileText, Globe, Loader2, Search, Sparkles } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { CtaButton } from '@/components/ui/cta-button'

const ease = [0.22, 1, 0.36, 1] as const

const COPY = {
  fr: {
    eyebrow: 'Commencez par votre site web',
    title: 'Votre site web suffit pour commencer.',
    subtitle:
      'Indiquez l’adresse de votre entreprise. Alma explore vos pages, comprend votre activité et vous propose les premières missions de votre Collaborateur IA.',
    placeholder: 'www.votre-entreprise.com',
    inputLabel: 'Adresse de votre site web',
    cta: 'Analyser mon site',
    noSite: 'Vous n’avez pas de site web ? Discutez directement avec Alma.',
    steps: ['Exploration', 'Compréhension', 'Missions', 'Recrutement'],
    demo: {
      browsing: 'Alma explore votre site',
      pages: ['Accueil', 'Nos services', 'À propos', 'Tarifs', 'Contact'],
      understandTitle: 'Ce qu’Alma a compris',
      facts: [
        { label: 'Activité', value: 'Éditeur de logiciel pour PME', source: 'Accueil' },
        { label: 'Clients', value: 'Artisans et commerçants', source: 'À propos' },
        { label: 'Offre', value: 'Abonnement mensuel, essai gratuit', source: 'Tarifs' },
      ],
      sourceLabel: 'Source',
      missionsTitle: 'Missions proposées',
      missions: [
        'Répondre aux demandes de démonstration',
        'Qualifier les prospects entrants',
        'Relancer les essais gratuits',
      ],
      chosenTitle: 'Votre Collaborateur IA est prêt',
      chosenSubtitle: 'Profil recommandé : développement commercial',
      chooseCta: 'Continuer avec Alma',
    },
  },
  en: {
    eyebrow: 'Start with your website',
    title: 'Your website is all it takes to begin.',
    subtitle:
      'Enter your company’s address. Alma explores your pages, understands your business, and suggests the first missions for your AI Collaborator.',
    placeholder: 'www.your-company.com',
    inputLabel: 'Your website address',
    cta: 'Analyze my site',
    noSite: 'No website? Talk directly with Alma.',
    steps: ['Exploration', 'Understanding', 'Missions', 'Hiring'],
    demo: {
      browsing: 'Alma is exploring your site',
      pages: ['Home', 'Our services', 'About', 'Pricing', 'Contact'],
      understandTitle: 'What Alma understood',
      facts: [
        { label: 'Business', value: 'Software vendor for SMBs', source: 'Home' },
        { label: 'Customers', value: 'Craftspeople and retailers', source: 'About' },
        { label: 'Offer', value: 'Monthly subscription, free trial', source: 'Pricing' },
      ],
      sourceLabel: 'Source',
      missionsTitle: 'Suggested missions',
      missions: ['Answer demo requests', 'Qualify inbound leads', 'Follow up on free trials'],
      chosenTitle: 'Your AI Collaborator is ready',
      chosenSubtitle: 'Recommended profile: sales development',
      chooseCta: 'Continue with Alma',
    },
  },
} as const

const STEP_DURATIONS = [3200, 4200, 4200, 3400]

function normalizeDomain(input: string): string | null {
  const trimmed = input.trim().toLowerCase()
  if (!trimmed) return null
  const host = trimmed.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
  if (!host.includes('.') || host.startsWith('.') || host.endsWith('.')) return null
  if (/\s/.test(host)) return null
  return host
}

export function SectionStartWebsite({ lang = 'fr' }: { lang?: Lang }) {
  const t = COPY[lang]
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const [url, setUrl] = useState('')
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)

  const canSubmit = useMemo(() => normalizeDomain(url) !== null, [url])

  useEffect(() => {
    if (reduceMotion || paused) return
    const id = setTimeout(() => setStep((s) => (s + 1) % 4), STEP_DURATIONS[step])
    return () => clearTimeout(id)
  }, [step, paused, reduceMotion])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const domain = normalizeDomain(url)
    router.push(domain ? `/decouvrir?site=${encodeURIComponent(domain)}` : '/decouvrir')
  }

  return (
    <section id="commencer" className="scroll-mt-20 border-t border-[#E9E2D4] bg-[#F3EFE6] py-24 sm:py-32">
      <div className="editorial-shell">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          {/* Left: promise + form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
            className="text-center lg:text-left"
          >
            <div className="mb-4 flex justify-center lg:justify-start">
              <Kicker>{t.eyebrow}</Kicker>
            </div>
            <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
              {t.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F] lg:mx-0">
              {t.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col gap-3 rounded-[1.5rem] border border-[#E4DCCF] bg-[#FBF9F3] p-3 sm:flex-row sm:items-center sm:rounded-full sm:p-2 sm:pl-5">
                <label htmlFor="company-site" className="sr-only">
                  {t.inputLabel}
                </label>
                <span className="flex flex-1 items-center gap-2.5 px-3 sm:px-0">
                  <Globe className="h-5 w-5 shrink-0 text-[#8A8175]" aria-hidden="true" />
                  <input
                    id="company-site"
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t.placeholder}
                    className="w-full bg-transparent py-2.5 font-mono text-[14px] text-[#1C1A17] placeholder:text-[#A69C8C] focus:outline-none"
                  />
                </span>
                <CtaButton type="submit" disabled={!canSubmit}>
                  {t.cta}
                  <ArrowRight className="h-4 w-4" />
                </CtaButton>
              </div>
              <a
                href="/decouvrir"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#8A5A6E] underline-offset-4 hover:text-[#D10E63] hover:underline"
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {t.noSite}
              </a>
            </form>
          </motion.div>

          {/* Right: animated demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <DemoWindow t={t} step={reduceMotion ? 2 : step} reduceMotion={!!reduceMotion} onGoToStep={setStep} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function DemoWindow({
  t,
  step,
  reduceMotion,
  onGoToStep,
}: {
  t: (typeof COPY)['fr']
  step: number
  reduceMotion: boolean
  onGoToStep: (s: number) => void
}) {
  const d = t.demo
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E4DCCF] bg-[#1C1A17] shadow-[0_30px_80px_rgba(28,26,23,0.18)]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E4573B]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8B94A]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5AA469]" />
        <div className="ml-3 flex-1 truncate rounded-md bg-white/10 px-3 py-1 font-mono text-[11px] text-white/60">
          alma.unitalk.ai
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between gap-1 border-b border-white/10 px-3 py-3">
        {t.steps.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => onGoToStep(i)}
            aria-current={i === step ? 'step' : undefined}
            className={`flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${
              i === step ? 'bg-[#D10E63] text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] ${
                i < step ? 'bg-[#5AA469] text-white' : i === step ? 'bg-white/20 text-white' : 'bg-white/10 text-white/50'
              }`}
            >
              {i < step ? <Check className="h-2.5 w-2.5" /> : i + 1}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Stage */}
      <div className="relative min-h-[340px] p-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
          >
            {step === 0 && <StepBrowsing d={d} reduceMotion={reduceMotion} />}
            {step === 1 && <StepUnderstanding d={d} reduceMotion={reduceMotion} />}
            {step === 2 && <StepMissions d={d} reduceMotion={reduceMotion} />}
            {step === 3 && <StepChosen d={d} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function StepBrowsing({ d, reduceMotion }: { d: (typeof COPY)['fr']['demo']; reduceMotion: boolean }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setActive((a) => (a + 1) % d.pages.length), 600)
    return () => clearInterval(id)
  }, [d.pages.length, reduceMotion])
  return (
    <div>
      <p className="mb-4 flex items-center gap-2 font-sf text-sm font-semibold text-white">
        <Search className="h-4 w-4 text-[#E8A0BF]" />
        {d.browsing}
      </p>
      <div className="space-y-2">
        {d.pages.map((page, i) => (
          <div
            key={page}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors ${
              i === active ? 'border-[#D10E63]/50 bg-[#D10E63]/10' : 'border-white/10 bg-white/[0.03]'
            }`}
          >
            <Globe className={`h-4 w-4 shrink-0 ${i === active ? 'text-[#E8A0BF]' : 'text-white/30'}`} />
            <span className="flex-1 truncate font-mono text-xs text-white/70">
              /{page.toLowerCase().replace(/\s/g, '-')}
            </span>
            {i === active ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-[#E8A0BF]" />
            ) : i < active ? (
              <Check className="h-3.5 w-3.5 text-[#5AA469]" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function StepUnderstanding({ d, reduceMotion }: { d: (typeof COPY)['fr']['demo']; reduceMotion: boolean }) {
  return (
    <div>
      <p className="mb-4 flex items-center gap-2 font-sf text-sm font-semibold text-white">
        <Sparkles className="h-4 w-4 text-[#E8A0BF]" />
        {d.understandTitle}
      </p>
      <div className="space-y-2.5">
        {d.facts.map((fact, i) => (
          <motion.div
            key={fact.label}
            initial={reduceMotion ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.15 * i, duration: 0.4, ease }}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">{fact.label}</p>
            <p className="mt-1 font-sf text-sm font-medium text-white">{fact.value}</p>
            <p className="mt-1.5 flex items-center gap-1 text-[11px] text-[#E8A0BF]">
              <FileText className="h-3 w-3" />
              {d.sourceLabel} : {fact.source}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function StepMissions({ d, reduceMotion }: { d: (typeof COPY)['fr']['demo']; reduceMotion: boolean }) {
  return (
    <div>
      <p className="mb-4 flex items-center gap-2 font-sf text-sm font-semibold text-white">
        <Check className="h-4 w-4 text-[#5AA469]" />
        {d.missionsTitle}
      </p>
      <div className="space-y-2.5">
        {d.missions.map((mission, i) => (
          <motion.div
            key={mission}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.15 * i, duration: 0.4, ease }}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/20 text-[11px] font-bold text-[#E8A0BF]">
              {i + 1}
            </span>
            <span className="font-sf text-sm text-white/85">{mission}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function StepChosen({ d }: { d: (typeof COPY)['fr']['demo'] }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#5AA469]/20"
      >
        <Check className="h-8 w-8 text-[#5AA469]" />
      </motion.span>
      <p className="mt-5 font-sf text-lg font-bold text-white">{d.chosenTitle}</p>
      <p className="mt-2 text-sm text-white/60">{d.chosenSubtitle}</p>
      <span className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3]">
        {d.chooseCta}
        <ArrowRight className="h-4 w-4" />
      </span>
    </div>
  )
}
