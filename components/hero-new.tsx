'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Globe, Network } from 'lucide-react'
import { normalizeDomain } from '@/lib/discover-profiles'
import { collaboratorHref } from '@/lib/collaborators-catalog'

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un.',
    headline: 'Votre Collaborateur\u00A0IA',
    headlineAccent: 'est déjà prêt.',
    lead: 'Autonome, il travaille avec vos outils et appartient à votre organisation. Ajoutez-lui les savoir-faire métier dont vous avez besoin.',
    domainLabel: 'Indiquez l’adresse de votre site.',
    domainHelper: 'Alma analyse votre activité et prépare ses premières missions.',
    domainPlaceholder: 'votreentreprise.com',
    domainCta: 'Découvrir mon Collaborateur IA',
    exploreCta: 'Voir les missions',
    heroProofs: ['Configuration personnalisée', 'Espace de travail privé', 'Essai gratuit 7 jours'],
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
    eyebrow: 'You’re missing someone.',
    headline: 'Your AI\u00A0Collaborator',
    headlineAccent: 'is ready to go.',
    lead: 'Autonomous, it works with your tools and belongs to your organization. Add the professional know-how you need.',
    domainLabel: 'Enter your website address.',
    domainHelper: 'Alma analyzes your business and prepares its first missions.',
    domainPlaceholder: 'yourcompany.com',
    domainCta: 'Discover my AI Collaborator',
    exploreCta: 'See the missions',
    heroProofs: ['Tailored setup', 'Private workspace', '7-day free trial'],
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

export function HeroNew({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
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
    <section className="relative flex min-h-0 items-center overflow-hidden bg-[#F3EFE6] pb-14 pt-24 sm:min-h-[92svh] sm:pb-20 sm:pt-32 lg:pb-20 lg:pt-36">
      <div className="editorial-shell relative grid items-center gap-6 sm:gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div className="max-w-2xl">
          <motion.p {...enter(0.04)} className="mb-5 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D10E63] sm:mb-6 sm:text-left">
            {t.eyebrow}
          </motion.p>
          <motion.h1 {...enter(0.1)} className="text-balance text-center font-sf text-[clamp(2.4rem,5.2vw,5.3rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#1C1A17] sm:text-left md:leading-[0.96]">
            {t.headline}{' '}
            <span className="text-[#D10E63]">{t.headlineAccent}</span>
          </motion.h1>
          <motion.p {...enter(0.18)} className="mx-auto mt-5 max-w-xl text-balance text-center text-base leading-7 text-[#5F594F] sm:mx-0 sm:mt-6 sm:text-left md:text-lg md:leading-8">
            {t.lead}
          </motion.p>
          <motion.div {...enter(0.24)} className="mt-8 sm:mt-9">
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
            <p className="mx-auto mt-3 max-w-md text-balance text-center text-xs leading-5 text-[#8A8175] sm:mx-0 sm:text-left">
              {t.domainHelper}
            </p>
            {/* Secondary link — hidden on mobile so the first screen keeps a single action */}
            <div className="mt-3 hidden justify-center sm:flex sm:justify-start">
              <Link
                href="/#missions"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4E483F] underline-offset-4 transition-colors hover:text-[#D10E63] hover:underline"
              >
                {t.exploreCta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
          <motion.div {...enter(0.3)} className="mt-5 flex flex-col items-start gap-2 text-xs font-medium text-[#6B6560] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-1.5">
            {t.heroProofs.map((proof) => <span key={proof} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#D10E63]" strokeWidth={2.5} />{proof}</span>)}
          </motion.div>
        </div>

        {/* Visual — organigramme : à chaque membre, son Collaborateur IA */}
        <motion.div {...enter(0.16)} className="relative mx-auto w-full max-w-xl" aria-label={t.orgTitle}>
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
                        <Link
                          href={collaboratorHref(pair.slug)}
                          aria-label={`${pair.ai} — ${lang === 'fr' ? 'voir le profil public' : 'view public profile'}`}
                          className="flex min-w-0 items-center gap-3 rounded-xl border border-[#D10E63]/20 bg-[#D10E63]/[0.045] p-3 transition-colors hover:border-[#D10E63]/45 hover:bg-[#D10E63]/[0.09]"
                        >
                          <div className="relative shrink-0"><img src={pair.avatar || '/placeholder.svg'} alt="" className="h-9 w-9 rounded-full object-cover" /><span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5" aria-hidden="true"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D10E63] opacity-60 motion-reduce:hidden" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-[#FBF9F3] bg-[#D10E63]" /></span></div>
                          <div className="min-w-0"><p className="truncate text-sm font-bold text-[#1C1A17]">{pair.ai}</p><p className="text-[10px] font-medium leading-tight text-[#A80B50]">{pair.status}</p></div>
                        </Link>
                      </div>
                    )
                  })}
                </div>
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
