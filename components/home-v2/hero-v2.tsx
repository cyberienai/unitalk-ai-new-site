'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Building2, Check, Globe, Network, User, Users } from 'lucide-react'
import { normalizeDomain } from '@/lib/discover-profiles'

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un.',
    titleLead: 'Votre Collaborateur IA est prêt à',
    missions: [
      'rédiger vos rapports',
      'trouver de nouveaux clients',
      'participer à vos réunions',
      'analyser vos données',
      'répondre à vos clients',
      'créer vos contenus',
      'automatiser vos opérations',
    ],
    lead: 'Alma analyse votre site Web et prépare sa première mission.',
    domainAria: 'Votre site web',
    domainPlaceholder: 'votreentreprise.com',
    domainCta: 'Découvrir mon Collaborateur IA',
    proofs: ['Essai gratuit 7 jours', 'Hébergé en France', 'Conforme au RGPD'],
    // organigramme
    orgTitle: 'Votre organisation',
    orgLeadParts: [
      { t: 'Chaque Collaborateur IA peut travailler pour ' },
      { t: 'une personne', h: true },
      { t: ', ' },
      { t: 'une équipe', h: true },
      { t: ', ' },
      { t: 'un département', h: true },
      { t: ', ' },
      { t: 'un projet', h: true },
      { t: ' ou ' },
      { t: 'toute l’organisation', h: true },
      { t: '.' },
    ],
    orgPairs: [
      { human: 'Une personne', dept: 'Direction', ai: 'Emma', slug: 'emma', avatar: '/images/emma-avatar.png', status: 'Assistanat · Réunions · Reporting', scaleKind: 'person', scaleLabel: 'Une personne' },
      { human: 'Équipe Marketing', dept: '5 personnes', ai: 'Léa', slug: 'lea', avatar: '/images/lea-avatar.png', status: 'Contenu · Design · Publication', scaleKind: 'team', scaleLabel: 'Une équipe' },
      { human: 'Département Produit', dept: '3 équipes', ai: 'Arthur', slug: 'arthur', avatar: '/images/arthur-avatar.png', status: 'Roadmap · Specs · Livraison', scaleKind: 'department', scaleLabel: 'Un département' },
      { human: 'Toute votre organisation', dept: 'Acme', ai: 'Hugo', slug: 'hugo', avatar: '/images/hugo-avatar.png', status: 'Prospection · CRM · Reporting', scaleKind: 'org', scaleLabel: 'Toute l’organisation' },
      { human: 'Finance', dept: '4 personnes', ai: 'Nadia', slug: 'nadia', avatar: '/images/nadia-avatar.png', status: 'Analyse · Trésorerie · Reporting', scaleKind: 'team', scaleLabel: 'Une équipe' },
      { human: 'Marc', dept: 'Relation client', ai: 'Inès', slug: 'ines', avatar: '/images/ines-avatar.png', status: 'Support · Réponses · Suivi', scaleKind: 'person', scaleLabel: 'Une personne' },
    ],
    collaboratorLabel: 'Collaborateurs IA',
    scaleHeader: 'Rattaché à',
  },
  en: {
    eyebrow: 'Someone is missing.',
    titleLead: 'Your AI Collaborator is ready to',
    missions: [
      'write your reports',
      'find new customers',
      'join your meetings',
      'analyze your data',
      'answer your customers',
      'create your content',
      'automate your operations',
    ],
    lead: 'Alma analyzes your website and prepares its first mission.',
    domainAria: 'Your website',
    domainPlaceholder: 'yourcompany.com',
    domainCta: 'Discover my AI Collaborator',
    proofs: ['7-day free trial', 'Hosted in France', 'GDPR compliant'],
    // organigramme
    orgTitle: 'Your organization',
    orgLeadParts: [
      { t: 'Every AI Collaborator can work for ' },
      { t: 'a person', h: true },
      { t: ', ' },
      { t: 'a team', h: true },
      { t: ', ' },
      { t: 'a department', h: true },
      { t: ', ' },
      { t: 'a project', h: true },
      { t: ' or ' },
      { t: 'the whole organization', h: true },
      { t: '.' },
    ],
    orgPairs: [
      { human: 'A person', dept: 'Leadership', ai: 'Emma', slug: 'emma', avatar: '/images/emma-avatar.png', status: 'Assistant · Meetings · Reporting', scaleKind: 'person', scaleLabel: 'One person' },
      { human: 'Marketing team', dept: '5 people', ai: 'Léa', slug: 'lea', avatar: '/images/lea-avatar.png', status: 'Content · Design · Publishing', scaleKind: 'team', scaleLabel: 'One team' },
      { human: 'Product department', dept: '3 teams', ai: 'Arthur', slug: 'arthur', avatar: '/images/arthur-avatar.png', status: 'Roadmap · Specs · Delivery', scaleKind: 'department', scaleLabel: 'A department' },
      { human: 'Your whole organization', dept: 'Acme', ai: 'Hugo', slug: 'hugo', avatar: '/images/hugo-avatar.png', status: 'Prospecting · CRM · Reporting', scaleKind: 'org', scaleLabel: 'Whole organization' },
      { human: 'Finance', dept: '4 people', ai: 'Nadia', slug: 'nadia', avatar: '/images/nadia-avatar.png', status: 'Analysis · Cash flow · Reporting', scaleKind: 'team', scaleLabel: 'One team' },
      { human: 'Marc', dept: 'Customer care', ai: 'Inès', slug: 'ines', avatar: '/images/ines-avatar.png', status: 'Support · Replies · Follow-up', scaleKind: 'person', scaleLabel: 'One person' },
    ],
    collaboratorLabel: 'AI Collaborators',
    scaleHeader: 'Attached to',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

const SCALE_ICONS = {
  person: User,
  team: Users,
  department: Building2,
  org: Network,
} as const

export function HeroV2({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()
  const [domain, setDomain] = useState('')
  const domainPreview = normalizeDomain(domain)

  const [missionIndex, setMissionIndex] = useState(0)
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setMissionIndex((i) => (i + 1) % t.missions.length)
    }, 2400)
    return () => clearInterval(id)
  }, [reduceMotion, t.missions.length])

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
          <motion.p {...enter(0.04)} className="mb-5 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D10E63] sm:mb-6 sm:text-left">
            {t.eyebrow}
          </motion.p>

          <h1 className="text-balance text-center font-sf text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-[1.08] tracking-[-0.055em] text-[#1C1A17] sm:leading-[1] sm:text-left">
            <motion.span {...enter(0.1)} className="block">
              {t.titleLead}
            </motion.span>
            <span className="mt-2 block min-h-[1.1em] sm:mt-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={missionIndex}
                  initial={reduceMotion ? false : { opacity: 0, y: '0.4em' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: '-0.4em' }}
                  transition={{ duration: 0.45, ease }}
                  className="block text-[#D10E63]"
                >
                  {t.missions[missionIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <motion.p {...enter(0.22)} className="mx-auto mt-6 max-w-xl text-balance text-center text-base leading-relaxed text-[#4E483F] sm:mx-0 sm:text-left md:text-lg">
            {t.lead}
          </motion.p>

  <motion.div {...enter(0.28)} className="mt-8">
  <form onSubmit={submitDomain} className="mx-auto flex w-full max-w-md flex-col gap-3 sm:mx-0">
              <div className="flex items-center overflow-hidden rounded-full border border-[#D8D0C2] bg-[#FBF9F3] focus-within:border-[#D10E63] focus-within:ring-2 focus-within:ring-[#D10E63]/25">
                <span className="pl-4 pr-1 text-[#8A8175]" aria-hidden="true"><Globe className="h-4 w-4" /></span>
                <input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder={t.domainPlaceholder}
                  aria-label={t.domainAria}
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

            <div className="mt-4 flex flex-row flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs font-medium text-[#6B6560] sm:justify-start">
              {t.proofs.map((proof) => (
                <span key={proof} className="flex items-center gap-1.5 whitespace-nowrap">
                  <Check className="h-3.5 w-3.5 text-[#D10E63]" strokeWidth={2.5} />
                  {proof}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Visual — organigramme : à chaque membre, son Collaborateur IA */}
        <motion.div {...enter(0.2)} className="relative mx-auto w-full max-w-xl" aria-label={t.orgTitle}>
          <div className="premium-shadow overflow-hidden rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3]">
            <div className="px-5 pt-5 pb-1 sm:px-6">
              <Link
                href="/decouvrir"
                aria-label={`${t.orgTitle} — ${lang === 'fr' ? 'découvrir votre organisation' : 'discover your organization'}`}
                className="group -mx-2 flex items-start gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-[#D10E63]/[0.05]"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D10E63] text-[#FBF9F3]"><Network className="h-4 w-4" /></span>
                <p className="text-[13px] font-semibold leading-6 text-[#4E483F]">
                  {t.orgLeadParts.map((part, i) =>
                    part.h ? (
                      <span key={i} className="font-bold text-[#D10E63]">{part.t}</span>
                    ) : (
                      <span key={i}>{part.t}</span>
                    ),
                  )}
                  <ArrowRight className="ml-1 inline h-3.5 w-3.5 shrink-0 align-[-2px] text-[#D10E63] transition-transform group-hover:translate-x-0.5" />
                </p>
              </Link>
            </div>
            <div className="p-4 sm:p-6">
              <div className="mb-3 grid grid-cols-[1fr_2.5rem_1fr] gap-2 px-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5F594F]"><span>{t.scaleHeader}</span><span /><span>{t.collaboratorLabel}</span></div>
              <div>
              <div>
                <div className="flex flex-col gap-2.5">
                  {t.orgPairs.slice(0, 4).map((pair) => {
                    const ScaleIcon = SCALE_ICONS[pair.scaleKind as keyof typeof SCALE_ICONS]
                    return (
                      <div key={pair.human} className="grid grid-cols-[1fr_2.5rem_1fr] items-stretch gap-2">
                        <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-[#E4DDCE] bg-[#F3EFE6] p-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E4DDCE] text-[#5F594F]" aria-hidden="true"><ScaleIcon className="h-4 w-4" /></span>
                          <p className="min-w-0 text-pretty text-sm font-semibold leading-tight text-[#1C1A17]">{pair.human}</p>
                        </div>
                        <div className="flex items-center" aria-hidden="true"><span className="h-px flex-1 bg-[#D10E63]/35" /><span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" /><span className="h-px flex-1 bg-[#D10E63]/35" /></div>
                        <a
                          href={`#collab-${pair.slug}`}
                          aria-label={`${pair.ai} — ${lang === 'fr' ? `rattaché à ${pair.scaleLabel.toLowerCase()}, voir son profil` : `attached to ${pair.scaleLabel.toLowerCase()}, see its profile`}`}
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
              </div>
              </div>
              </div>
            </motion.div>
      </div>
    </section>
  )
}
