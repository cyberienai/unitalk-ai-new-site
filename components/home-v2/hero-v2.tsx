'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Globe, Network } from 'lucide-react'
import { normalizeDomain } from '@/lib/discover-profiles'

const T = {
  fr: {
    avatarsLabel: 'Emma, Léa, Arthur et 3 autres profils prêts à vous rejoindre',
    eyebrow: 'Une nouvelle façon de travailler',
    line1: 'Ne prenez pas',
    strike: 'un abonnement',
    line2: 'Recrutez un Collaborateur IA.',
    lead: 'Il rejoint votre organisation, apprend votre métier et gagne en savoir-faire — sans jamais oublier.',
    domainLabel: 'Connectez votre site web',
    domainHelp: 'Alma l’analyse et façonne un Collaborateur IA sur mesure pour votre activité.',
    domainPlaceholder: 'votreentreprise.com',
    domainCta: 'Recruter mon Collaborateur IA',
    exploreCta: 'Voir comment',
    proofs: ['Prêt en quelques minutes', 'Un seul abonnement', 'Essai gratuit 7 jours'],
    trialMobile: '7 jours d’essai gratuit',
    // organigramme
    orgTitle: 'Votre organisation',
    orgMeta: 'Des Collaborateurs IA dédiés ou partagés. Tous appartiennent à votre organisation.',
    orgFootnote: 'Chaque Collaborateur IA peut travailler pour une personne, une équipe, un département ou toute l’organisation.',
    orgPairs: [
      { human: 'Patrick', dept: 'Direction', ai: 'Emma', slug: 'emma', avatar: '/images/emma-avatar.png', status: 'Assistanat · Réunions · Reporting' },
      { human: 'Sophie', dept: 'Marketing', ai: 'Léa', slug: 'lea', avatar: '/images/lea-avatar.png', status: 'Contenu · Design · Publication' },
      { human: 'Antoine', dept: 'Développement', ai: 'Arthur', slug: 'arthur', avatar: '/images/arthur-avatar.png', status: 'Code · Tests · Documentation' },
      { human: 'Claire', dept: 'Ventes', ai: 'Hugo', slug: 'hugo', avatar: '/images/hugo-avatar.png', status: 'Prospection · CRM · Reporting' },
      { human: 'Julie', dept: 'Finance', ai: 'Nadia', slug: 'nadia', avatar: '/images/nadia-avatar.png', status: 'Analyse · Trésorerie · Reporting' },
      { human: 'Marc', dept: 'Relation client', ai: 'Inès', slug: 'ines', avatar: '/images/ines-avatar.png', status: 'Support · Réponses · Suivi' },
    ],
    collaboratorLabel: 'Collaborateurs IA',
    orgLink: 'Découvrir les Collaborateurs IA',
  },
  en: {
    avatarsLabel: 'Emma, Léa, Arthur and 3 more profiles ready to join you',
    eyebrow: 'A new way to work',
    line1: 'Don’t buy',
    strike: 'a subscription',
    line2: 'Hire an AI Collaborator.',
    lead: 'It joins your organization, learns your business and grows its know-how — never forgetting a thing.',
    domainLabel: 'Connect your website',
    domainHelp: 'Alma analyzes it and shapes an AI Collaborator tailored to your business.',
    domainPlaceholder: 'yourcompany.com',
    domainCta: 'Hire my AI Collaborator',
    exploreCta: 'See how',
    proofs: ['Ready in minutes', 'One subscription', '7-day free trial'],
    trialMobile: '7-day free trial',
    // organigramme
    orgTitle: 'Your organization',
    orgMeta: 'Dedicated or shared AI Collaborators. All of them belong to your organization.',
    orgFootnote: 'Every AI Collaborator can work for a person, a team, a department or the whole organization.',
    orgPairs: [
      { human: 'Patrick', dept: 'Leadership', ai: 'Emma', slug: 'emma', avatar: '/images/emma-avatar.png', status: 'Assistant · Meetings · Reporting' },
      { human: 'Sophie', dept: 'Marketing', ai: 'Léa', slug: 'lea', avatar: '/images/lea-avatar.png', status: 'Content · Design · Publishing' },
      { human: 'Antoine', dept: 'Engineering', ai: 'Arthur', slug: 'arthur', avatar: '/images/arthur-avatar.png', status: 'Code · Tests · Documentation' },
      { human: 'Claire', dept: 'Sales', ai: 'Hugo', slug: 'hugo', avatar: '/images/hugo-avatar.png', status: 'Prospecting · CRM · Reporting' },
      { human: 'Julie', dept: 'Finance', ai: 'Nadia', slug: 'nadia', avatar: '/images/nadia-avatar.png', status: 'Analysis · Cash flow · Reporting' },
      { human: 'Marc', dept: 'Customer care', ai: 'Inès', slug: 'ines', avatar: '/images/ines-avatar.png', status: 'Support · Replies · Follow-up' },
    ],
    collaboratorLabel: 'AI Collaborators',
    orgLink: 'Discover the AI Collaborators',
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

      <div className="editorial-shell relative grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
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

          <h1 className="text-balance text-center font-sf text-[clamp(2.6rem,6vw,5.6rem)] font-semibold leading-[1.12] tracking-[-0.055em] text-[#1C1A17] sm:leading-[0.95] sm:text-left">
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
            <motion.span {...enter(0.16)} className="mt-4 block text-[#D10E63] sm:mt-1">
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

        {/* Visual ��� organigramme : à chaque membre, son Collaborateur IA */}
        <motion.div {...enter(0.2)} className="relative mx-auto w-full max-w-xl" aria-label={t.orgTitle}>
          <div className="premium-shadow overflow-hidden rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3]">
            <div className="px-5 pt-5 pb-1 sm:px-6">
              <Link
                href="/decouvrir"
                aria-label={`${t.orgTitle} — ${lang === 'fr' ? 'découvrir votre organisation' : 'discover your organization'}`}
                className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#D10E63]/[0.05]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D10E63] text-[#FBF9F3]"><Network className="h-4 w-4" /></span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-sm font-bold text-[#1C1A17]">
                    {t.orgTitle}
                    <ArrowRight className="h-3.5 w-3.5 text-[#D10E63] transition-transform group-hover:translate-x-0.5" />
                  </p>
                  <p className="text-[11px] text-[#6E665A]">{t.orgMeta}</p>
                </div>
              </Link>
            </div>
            <div className="p-4 sm:p-6">
              <div className="mb-3 grid grid-cols-[1fr_2.5rem_1fr] gap-2 px-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5F594F]"><span>{lang === 'fr' ? 'Équipe' : 'Team'}</span><span /><span>{t.collaboratorLabel}</span></div>
              <div className="relative">
              <div className="overscroll-contain pr-1 sm:max-h-72 sm:overflow-y-auto [scrollbar-color:#D8D0C2_transparent] [scrollbar-width:thin]">
                <div className="flex flex-col gap-2.5">
                  {t.orgPairs.map((pair) => {
                    const initials = pair.human.slice(0, 2).toUpperCase()
                    return (
                      <div key={pair.human} className="grid grid-cols-[1fr_2.5rem_1fr] items-stretch gap-2">
                        <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-[#E4DDCE] bg-[#F3EFE6] p-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E4DDCE] font-mono text-[11px] font-bold tracking-wide text-[#5F594F]" aria-hidden="true">{initials}</span>
                          <div className="min-w-0"><p className="truncate text-sm font-bold text-[#1C1A17]">{pair.human}</p><p className="truncate text-[11px] text-[#6E665A]">{pair.dept}</p></div>
                        </div>
                        <div className="flex items-center" aria-hidden="true"><span className="h-px flex-1 bg-[#D10E63]/35" /><span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" /><span className="h-px flex-1 bg-[#D10E63]/35" /></div>
                        <a
                          href={`#collab-${pair.slug}`}
                          aria-label={`${pair.ai} — ${lang === 'fr' ? 'voir son profil sur la page' : 'see its profile on the page'}`}
                          className="flex min-w-0 items-center gap-3 rounded-xl border border-[#D10E63]/20 bg-[#D10E63]/[0.045] p-3 transition-colors hover:border-[#D10E63]/45 hover:bg-[#D10E63]/[0.09]"
                        >
                          <div className="relative shrink-0"><Image src={pair.avatar || '/placeholder.svg'} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" /><span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5" aria-hidden="true"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D10E63] opacity-60 motion-reduce:hidden" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-[#FBF9F3] bg-[#D10E63]" /></span></div>
                          <div className="min-w-0"><p className="truncate text-sm font-bold text-[#1C1A17]">{pair.ai}</p><p className="text-[10px] font-medium leading-tight text-[#A80B50]">{pair.status}</p></div>
                        </a>
                      </div>
                    )
                  })}
                </div>
              </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-10 bg-gradient-to-t from-[#FBF9F3] to-transparent sm:block" />
              </div>
              <a href="/collaborateurs-ia" className="mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-[#E4DDCE] bg-[#F3EFE6] py-2.5 text-xs font-bold text-[#D10E63] transition-colors hover:bg-[#D10E63]/[0.06]">
                {t.orgLink}<ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <p className="mt-3 px-2 text-center text-[11px] leading-5 text-[#6E665A] sm:text-left">{t.orgFootnote}</p>
        </motion.div>
      </div>
    </section>
  )
}
