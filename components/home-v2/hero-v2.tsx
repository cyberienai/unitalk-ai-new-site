'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Globe } from 'lucide-react'
import { normalizeDomain } from '@/lib/discover-profiles'

const T = {
  fr: {
    avatarsLabel: 'Emma, Léa, Arthur et 3 autres profils prêts à recruter',
    eyebrow: 'Une nouvelle façon de travailler',
    line1: 'Ne prenez pas',
    strike: 'un abonnement',
    line2: 'Prenez un Collaborateur IA.',
    lead: 'Unitalk ne vous vend pas un outil de plus. Vous accueillez un Collaborateur IA qui appartient à votre organisation, garde une identité, une mémoire, et apprend votre métier.',
    domainLabel: 'Connectez votre site web',
    domainHelp: 'Alma en fait un Collaborateur IA prêt à travailler, façonné pour votre activité.',
    domainPlaceholder: 'votreentreprise.com',
    domainCta: 'Recruter mon Collaborateur IA',
    exploreCta: 'Voir comment',
    proofs: ['Prêt en quelques minutes', 'Un seul abonnement', 'Essai gratuit 7 jours'],
    trialMobile: '7 jours d’essai gratuit',
    // hire card
    badge: 'Collaborateur IA',
    cardName: 'Emma',
    cardRole: 'Assistante de direction',
    cardStatusLabel: 'Statut',
    cardStatus: 'Recrutée aujourd’hui',
    cardBelongsLabel: 'Appartient à',
    cardBelongs: 'Votre organisation',
    cardProfilesLabel: 'Profils actifs',
    cardProfiles: ['Assistanat', 'Réunions', 'Reporting'],
    cardFootnote: 'Une identité qui reste. Des savoir-faire qui s’ajoutent.',
  },
  en: {
    avatarsLabel: 'Emma, Léa, Arthur and 3 more profiles ready to hire',
    eyebrow: 'A new way to work',
    line1: 'Don’t buy',
    strike: 'a subscription',
    line2: 'Hire an AI Collaborator.',
    lead: 'Unitalk doesn’t sell you another tool. You welcome an AI Collaborator who belongs to your organization, keeps an identity, a memory, and learns your business.',
    domainLabel: 'Connect your website',
    domainHelp: 'Alma turns it into an AI Collaborator ready to work, shaped for your business.',
    domainPlaceholder: 'yourcompany.com',
    domainCta: 'Hire my AI Collaborator',
    exploreCta: 'See how',
    proofs: ['Ready in minutes', 'One subscription', '7-day free trial'],
    trialMobile: '7-day free trial',
    badge: 'AI Collaborator',
    cardName: 'Emma',
    cardRole: 'Executive assistant',
    cardStatusLabel: 'Status',
    cardStatus: 'Hired today',
    cardBelongsLabel: 'Belongs to',
    cardBelongs: 'Your organization',
    cardProfilesLabel: 'Active profiles',
    cardProfiles: ['Assistant', 'Meetings', 'Reporting'],
    cardFootnote: 'One identity that stays. Skills that add up.',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

const HERO_AVATARS = [
  { name: 'Emma', src: '/images/emma-avatar.png' },
  { name: 'Léa', src: '/images/lea-avatar.png' },
  { name: 'Arthur', src: '/images/arthur-avatar.png' },
  { name: 'Hugo', src: '/images/hugo-avatar.png' },
  { name: 'Nadia', src: '/images/nadia-avatar.png' },
  { name: 'Inès', src: '/images/ines-avatar.png' },
] as const

export function HeroV2({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()
  const [domain, setDomain] = useState('')
  const domainPreview = normalizeDomain(domain)

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

  return (
    <section className="relative flex min-h-0 items-center overflow-hidden bg-[#F3EFE6] pb-14 pt-24 sm:min-h-[94svh] sm:pb-20 sm:pt-32 lg:pt-36">
      {/* subtle editorial backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-24 h-[36rem] w-[36rem] rounded-full bg-[#D10E63]/[0.06] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="editorial-shell relative grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="max-w-2xl">
          <motion.div {...enter(0)} className="mb-5 flex items-center justify-center gap-3 sm:justify-start">
            <ul className="flex items-center -space-x-2.5">
              {HERO_AVATARS.map((a, i) => (
                <motion.li
                  key={a.name}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.6, x: -6 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.4, ease, delay: reduceMotion ? 0 : 0.06 * i }}
                  className="relative"
                  style={{ zIndex: HERO_AVATARS.length - i }}
                >
                  <Image
                    src={a.src}
                    alt={a.name}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-[#F3EFE6]"
                  />
                </motion.li>
              ))}
            </ul>
            <span className="max-w-[10rem] text-pretty text-[11px] font-medium leading-4 text-[#6E665A] sm:max-w-[13rem]">
              {t.avatarsLabel}
            </span>
          </motion.div>

          <motion.p {...enter(0.04)} className="mb-5 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D10E63] sm:mb-6 sm:text-left">
            {t.eyebrow}
          </motion.p>

          <h1 className="text-balance text-center font-sf text-[clamp(2.6rem,6vw,5.6rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-[#1C1A17] sm:leading-[0.95] sm:text-left">
            <motion.span {...enter(0.1)} className="block">
              {t.line1}{' '}
              <span className="relative inline-block whitespace-nowrap text-[#8A8175]">
                {t.strike}
                <motion.span
                  aria-hidden="true"
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease, delay: reduceMotion ? 0 : 0.9 }}
                  className="absolute left-0 top-1/2 h-[0.12em] w-full origin-left -translate-y-1/2 rounded-full bg-[#D10E63]"
                />
              </span>
            </motion.span>
            <motion.span {...enter(0.16)} className="mt-1 block text-[#D10E63]">
              {t.line2}
            </motion.span>
          </h1>

          <motion.p {...enter(0.22)} className="mx-auto mt-6 max-w-xl text-balance text-center text-base leading-relaxed text-[#4E483F] sm:mx-0 sm:text-left md:text-lg">
            {t.lead}
          </motion.p>

          <motion.div {...enter(0.28)} className="mt-8">
            <p className="mx-auto max-w-md text-center text-sm font-semibold text-[#3F3A33] sm:mx-0 sm:text-left">
              {t.domainLabel}
            </p>
            <form onSubmit={submitDomain} className="mx-auto mt-3 flex w-full max-w-md flex-col gap-3 sm:mx-0">
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
            <p className="mx-auto mt-3 max-w-md text-center text-xs leading-5 text-[#8A8175] sm:mx-0 sm:text-left">
              {t.domainHelp}
            </p>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-[#6B6560] sm:hidden">
              <Check className="h-3.5 w-3.5 text-[#D10E63]" strokeWidth={2.5} />
              {t.trialMobile}
            </div>
            <div className="mt-4 hidden flex-row flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-medium text-[#6B6560] sm:flex">
              {t.proofs.map((proof) => (
                <span key={proof} className="flex items-center gap-1.5 whitespace-nowrap">
                  <Check className="h-3.5 w-3.5 text-[#D10E63]" strokeWidth={2.5} />
                  {proof}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Visual — the "hire card": a Collaborateur IA employee badge */}
        <motion.div {...enter(0.2)} className="relative mx-auto w-full max-w-sm">
          <motion.div
            initial={reduceMotion ? false : { rotate: -1.5 }}
            animate={{ rotate: reduceMotion ? 0 : [-1.5, 1, -1.5] }}
            transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
            className="premium-shadow overflow-hidden rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3]"
          >
            {/* badge header */}
            <div className="flex items-center justify-between border-b border-[#E4DDCE] bg-[#F3EFE6] px-5 py-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#D10E63]">{t.badge}</span>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#6E665A]">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D10E63] opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D10E63]" />
                </span>
                Unitalk
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4">
                <Image src="/images/emma-avatar.png" alt="" width={72} height={72} className="h-18 w-18 rounded-2xl object-cover" style={{ height: 72, width: 72 }} />
                <div className="min-w-0">
                  <p className="font-sf text-2xl font-bold leading-tight tracking-[-0.02em] text-[#1C1A17]">{t.cardName}</p>
                  <p className="text-sm text-[#6E665A]">{t.cardRole}</p>
                </div>
              </div>

              <dl className="mt-6 flex flex-col gap-3 border-t border-[#E4DDCE] pt-5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#8A8175]">{t.cardStatusLabel}</dt>
                  <dd className="flex items-center gap-1.5 font-semibold text-[#1C1A17]">
                    <Check className="h-3.5 w-3.5 text-[#D10E63]" strokeWidth={3} />
                    {t.cardStatus}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#8A8175]">{t.cardBelongsLabel}</dt>
                  <dd className="font-semibold text-[#1C1A17]">{t.cardBelongs}</dd>
                </div>
              </dl>

              <div className="mt-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.cardProfilesLabel}</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {t.cardProfiles.map((profile, i) => (
                    <motion.span
                      key={profile}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease, delay: reduceMotion ? 0 : 0.6 + i * 0.12 }}
                      className="rounded-full border border-[#D10E63]/25 bg-[#D10E63]/[0.06] px-3 py-1 text-xs font-semibold text-[#A80B50]"
                    >
                      {profile}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          <p className="mt-4 px-2 text-center text-[11px] leading-5 text-[#6E665A]">{t.cardFootnote}</p>
        </motion.div>
      </div>
    </section>
  )
}
