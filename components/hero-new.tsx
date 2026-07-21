'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Network } from 'lucide-react'
import { HeroActivityBadge } from '@/components/hero-activity-badge'

const T = {
  fr: {
    eyebrow: 'Recrutez sans embaucher',
    headline: 'Votre premier Collaborateur\u00A0IA est',
    headlineAccent: ' déjà prêt.',
    lead: 'Ajoutez-le à votre organigramme en quelques minutes.',
    heroCta: 'Commencer gratuitement',
    heroProofs: ['Essai gratuit 7 jours', 'Sans engagement', 'Prêt en quelques minutes'],
    orgTitle: 'Votre équipe',
    orgMeta: 'À chaque collaborateur peut être associé un Collaborateur IA spécialisé. Commencez avec un, ajoutez-en d’autres.',
    orgPairs: [
      { human: 'Patrick', dept: 'Direction', ai: 'Emma', slug: 'emma', avatar: '/images/emma-avatar.png', status: 'Assistanat' },
      { human: 'Sophie', dept: 'Marketing', ai: 'Léa', slug: 'lea', avatar: '/images/lea-avatar.png', status: 'Contenu' },
      { human: 'Antoine', dept: 'Développement', ai: 'Arthur', slug: 'arthur', avatar: '/images/arthur-avatar.png', status: 'Code' },
      { human: 'Claire', dept: 'Ventes', ai: 'Hugo', slug: 'hugo', avatar: '/images/hugo-avatar.png', status: 'Prospection' },
      { human: 'Julie', dept: 'Finance', ai: 'Nadia', slug: 'nadia', avatar: '/images/nadia-avatar.png', status: 'Analyse' },
      { human: 'Marc', dept: 'Relation client', ai: 'Inès', slug: 'ines', avatar: '/images/ines-avatar.png', status: 'Clients' },
    ],
    collaboratorLabel: 'Collaborateurs IA',
    orgLink: 'Voir toute l’équipe',
  },
  en: {
    eyebrow: 'Recruit without hiring',
    headline: 'Your first AI\u00A0Collaborator is',
    headlineAccent: ' already ready.',
    lead: 'Add them to your org chart in just a few minutes.',
    heroCta: 'Start for free',
    heroProofs: ['7-day free trial', 'No commitment', 'Ready in minutes'],
    orgTitle: 'Your team',
    orgMeta: 'Each teammate can be paired with a specialized AI Collaborator. Start with one, add more.',
    orgPairs: [
      { human: 'Patrick', dept: 'Leadership', ai: 'Emma', slug: 'emma', avatar: '/images/emma-avatar.png', status: 'Assistant' },
      { human: 'Sophie', dept: 'Marketing', ai: 'Léa', slug: 'lea', avatar: '/images/lea-avatar.png', status: 'Content' },
      { human: 'Antoine', dept: 'Engineering', ai: 'Arthur', slug: 'arthur', avatar: '/images/arthur-avatar.png', status: 'Code' },
      { human: 'Claire', dept: 'Sales', ai: 'Hugo', slug: 'hugo', avatar: '/images/hugo-avatar.png', status: 'Prospecting' },
      { human: 'Julie', dept: 'Finance', ai: 'Nadia', slug: 'nadia', avatar: '/images/nadia-avatar.png', status: 'Analysis' },
      { human: 'Marc', dept: 'Customer Relations', ai: 'Inès', slug: 'ines', avatar: '/images/ines-avatar.png', status: 'Customers' },
    ],
    collaboratorLabel: 'AI Collaborators',
    orgLink: 'See the full team',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function HeroNew({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease, delay: reduceMotion ? 0 : delay },
  })

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-[#F3EFE6] pb-20 pt-28 lg:pb-24 lg:pt-32">
      <div aria-hidden="true" className="bg-editorial pointer-events-none absolute inset-0 opacity-55" />
      <div className="editorial-shell relative grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <div className="max-w-2xl">
          <motion.p {...enter(0.04)} className="mb-7 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D10E63] sm:text-left">
            {t.eyebrow}
          </motion.p>
          <motion.h1 {...enter(0.1)} className="text-balance text-center font-sf text-[clamp(2.85rem,5.2vw,5.3rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-[#1C1A17] sm:text-left">
            {t.headline}<span className="text-[#D10E63]">{t.headlineAccent}</span>
          </motion.h1>
          <motion.p {...enter(0.18)} className="mx-auto mt-7 max-w-xl text-pretty text-center text-base leading-7 text-[#5F594F] sm:mx-0 sm:text-left md:text-lg md:leading-8">
            {t.lead}
          </motion.p>
          <motion.div {...enter(0.24)} className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <a href="/signup" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">
              {t.heroCta}<ArrowRight className="h-4 w-4" />
            </a>
            <HeroActivityBadge lang={lang} />
          </motion.div>
          <motion.div {...enter(0.3)} className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-[#D8D0C2] pt-5 text-xs font-medium text-[#6B6560] sm:justify-start">
            {t.heroProofs.map((proof) => <span key={proof} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#D10E63]" strokeWidth={2.5} />{proof}</span>)}
          </motion.div>
        </div>

        <motion.div {...enter(0.16)} className="relative mx-auto w-full max-w-xl" aria-label={t.orgTitle}>
          <div className="premium-shadow overflow-hidden rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3]">
            <div className="flex items-center px-5 pt-5 pb-1 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D10E63] text-[#FBF9F3]"><Network className="h-4 w-4" /></span>
                <div><p className="text-sm font-bold text-[#1C1A17]">{t.orgTitle}</p><p className="text-[11px] text-[#857C6E]">{t.orgMeta}</p></div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="mb-3 grid grid-cols-[1fr_2.5rem_1fr] gap-2 px-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5F594F]"><span>{lang === 'fr' ? 'Équipe' : 'Team'}</span><span /><span>{t.collaboratorLabel}</span></div>
              <div className="max-h-72 overflow-y-auto overscroll-contain pr-1 [scrollbar-color:#D8D0C2_transparent] [scrollbar-width:thin]">
                <div className="flex flex-col gap-2.5">
                  {t.orgPairs.map((pair) => (
                    <div key={pair.human} className="grid grid-cols-[1fr_2.5rem_1fr] items-center gap-2">
                      <div className="min-w-0 rounded-xl border border-[#E4DDCE] bg-[#F3EFE6] p-3"><p className="truncate text-sm font-bold text-[#1C1A17]">{pair.human}</p><p className="text-[11px] text-[#857C6E]">{pair.dept}</p></div>
                      <div className="flex items-center" aria-hidden="true"><span className="h-px flex-1 bg-[#D10E63]/35" /><span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" /><span className="h-px flex-1 bg-[#D10E63]/35" /></div>
                      <Link
                        href={`/@${pair.slug}`}
                        aria-label={`${pair.ai} — ${lang === 'fr' ? 'voir le profil public' : 'view public profile'}`}
                        className="flex min-w-0 items-center gap-3 rounded-xl border border-[#D10E63]/20 bg-[#D10E63]/[0.045] p-3 transition-colors hover:border-[#D10E63]/45 hover:bg-[#D10E63]/[0.09]"
                      >
                        <div className="relative shrink-0"><img src={pair.avatar || '/placeholder.svg'} alt="" className="h-9 w-9 rounded-full object-cover" /><span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#FBF9F3] bg-[#D10E63]" /></div>
                        <div className="min-w-0"><p className="truncate text-sm font-bold text-[#1C1A17]">{pair.ai}</p><p className="truncate text-[11px] font-medium text-[#A80B50]">{pair.status}</p></div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <a href="/team" className="mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-[#E4DDCE] bg-[#F3EFE6] py-2.5 text-xs font-bold text-[#D10E63] transition-colors hover:bg-[#D10E63]/[0.06]">
                {t.orgLink}<ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
