'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Globe } from 'lucide-react'
import { normalizeDomain } from '@/lib/discover-profiles'

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un.',
    headline: 'Votre Collaborateur\u00A0IA',
    headlineVerb: 'est',
    headlineAccent: ' déjà prêt.',
    lead: 'Recrutez un Collaborateur IA spécialisé et autonome. Il rejoint votre Organisation, travaille avec vos outils et prend en charge ses premières Missions.',
    domainLabel: 'Entrez votre domaine. Alma prépare le contexte de votre Organisation et vous présente les Collaborateurs IA adaptés.',
    domainPlaceholder: 'monentreprise.com',
    domainCta: 'Découvrir mon organisation',
    exploreCta: 'Explorer les Collaborateurs IA',
    heroProofs: ['Contexte préparé par Alma', 'Workspace privé pour votre Organisation', 'Essai gratuit de 7 jours'],
    // Inès status card
    cardName: 'Inès',
    cardRole: 'Collaboratrice IA',
    stateReady: 'Prête',
    stateWorking: 'Travaille',
    activity: 'répond à un client',
    activityLabel: 'Mission en cours',
  },
  en: {
    eyebrow: 'You’re missing someone.',
    headline: 'Your AI\u00A0Collaborator',
    headlineVerb: 'is',
    headlineAccent: ' already ready.',
    lead: 'Recruit a specialized, autonomous AI Collaborator. It joins your Organization, works with your tools and takes on its first Missions.',
    domainLabel: 'Enter your domain. Alma prepares your Organization’s context and introduces the AI Collaborators that fit.',
    domainPlaceholder: 'mycompany.com',
    domainCta: 'Discover my organization',
    exploreCta: 'Explore the AI Collaborators',
    heroProofs: ['Context prepared by Alma', 'A private Workspace for your Organization', '7-day free trial'],
    cardName: 'Inès',
    cardRole: 'AI Collaborator',
    stateReady: 'Ready',
    stateWorking: 'Working',
    activity: 'answering a customer',
    activityLabel: 'Mission in progress',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function HeroNew({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()
  const [domain, setDomain] = useState('')
  const domainPreview = normalizeDomain(domain)

  // Inès status animation: ready -> working -> activity
  const [phase, setPhase] = useState<0 | 1 | 2>(reduceMotion ? 2 : 0)
  useEffect(() => {
    if (reduceMotion) return
    const t1 = setTimeout(() => setPhase(1), 1400)
    const t2 = setTimeout(() => setPhase(2), 2600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [reduceMotion])

  const submitDomain = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = domainPreview
      ? `/decouvrir?domain=${encodeURIComponent(domainPreview)}`
      : '/decouvrir'
  }

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease, delay: reduceMotion ? 0 : delay },
  })

  const working = phase >= 1

  return (
    <section className="relative flex min-h-0 items-center overflow-hidden bg-[#F3EFE6] pb-16 pt-20 sm:min-h-[92svh] sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
      <div className="editorial-shell relative grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <div className="max-w-2xl">
          <motion.p {...enter(0.04)} className="mb-4 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D10E63] sm:mb-7 sm:text-left">
            {t.eyebrow}
          </motion.p>
          <motion.h1 {...enter(0.1)} className="text-balance text-center font-sf text-[clamp(2.4rem,5.2vw,5.3rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#1C1A17] sm:text-left md:leading-[0.96]">
            {t.headline}{' '}
            <span className="whitespace-nowrap">
              {t.headlineVerb}
              <span className="text-[#D10E63]">{t.headlineAccent}</span>
            </span>
          </motion.h1>
          <motion.p {...enter(0.18)} className="mx-auto mt-6 max-w-xl text-balance text-center text-base leading-7 text-[#5F594F] sm:mx-0 sm:text-left md:text-lg md:leading-8">
            {t.lead}
          </motion.p>
          <motion.div {...enter(0.24)} className="mt-7 sm:mt-9">
            <p className="mx-auto max-w-md text-balance text-center text-sm leading-6 text-[#5F594F] sm:mx-0 sm:text-left">
              {t.domainLabel}
            </p>
            <form onSubmit={submitDomain} className="mx-auto mt-4 flex w-full max-w-md flex-col gap-3 sm:mx-0">
              <div className="flex items-center overflow-hidden rounded-full border border-[#D8D0C2] bg-[#FBF9F3] focus-within:border-[#D10E63] focus-within:ring-2 focus-within:ring-[#D10E63]/25">
                <span className="pl-4 pr-1 text-[#8A8175]" aria-hidden="true"><Globe className="h-4 w-4" /></span>
                <input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder={t.domainPlaceholder}
                  aria-label={t.domainLabel}
                  className="min-w-0 flex-1 bg-transparent py-3.5 pr-4 text-sm text-[#1C1A17] outline-none placeholder:text-[#A29A8C]"
                />
              </div>
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
              >
                {t.domainCta}<ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-3 flex justify-center sm:justify-start">
              <Link
                href="/collaborateurs-ia"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4E483F] underline-offset-4 transition-colors hover:text-[#D10E63] hover:underline"
              >
                {t.exploreCta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
          <motion.div {...enter(0.3)} className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-[#6B6560] sm:justify-start">
            {t.heroProofs.map((proof) => <span key={proof} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#D10E63]" strokeWidth={2.5} />{proof}</span>)}
          </motion.div>
        </div>

        {/* Visual — Inès status card (ready -> working -> activity) */}
        <motion.div {...enter(0.16)} className="relative mx-auto w-full max-w-md">
          <div className="premium-shadow overflow-hidden rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3] p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img src="/images/ines-avatar.png" alt="" className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20" />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4" aria-hidden="true">
                  {working && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22A06B] opacity-60 motion-reduce:hidden" />}
                  <span className={`relative inline-flex h-4 w-4 rounded-full border-2 border-[#FBF9F3] transition-colors duration-500 ${working ? 'bg-[#22A06B]' : 'bg-[#B8AF9E]'}`} />
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{t.cardName}</p>
                <p className="text-sm text-[#6B6560]">{t.cardRole}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-500 ${
                  working ? 'bg-[#22A06B]/12 text-[#1B7A50]' : 'bg-[#EDE7DA] text-[#6B6560]'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${working ? 'bg-[#22A06B]' : 'bg-[#B8AF9E]'}`} aria-hidden="true" />
                {working ? t.stateWorking : t.stateReady}
              </span>
            </div>

            {/* Activity reveal */}
            <div
              className={`grid transition-all duration-500 ${phase >= 2 ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="rounded-2xl border border-[#E4DDCE] bg-[#F3EFE6] p-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.activityLabel}</p>
                  <p className="mt-1.5 text-[15px] font-medium text-[#1C1A17]">{t.activity}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
