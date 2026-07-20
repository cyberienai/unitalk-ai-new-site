'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Network } from 'lucide-react'

const T = {
  fr: {
    eyebrow: 'Recrutez sans embaucher',
    orgCaption: "L'IA entre dans votre organigramme",
    headline: 'Vos Collaborateurs IA sont',
    headlineAccent: ' déjà prêts.',
    lead: 'Ajoutez des Collaborateurs IA qui analysent, exécutent et livrent avec vos équipes.',
    heroCta: 'Créer mon Collaborateur IA',
    heroCtaSecondary: 'Analyse gratuite',
    heroProofs: ['Essai gratuit 7 jours', 'Sans engagement', 'Prêt en quelques minutes'],
    orgTitle: 'Votre organisation',
    orgMeta: '3 membres + 3 Collaborateurs IA',
    orgPairs: [
      { human: 'Camille', dept: 'Ventes', ai: 'Alex', avatar: '/alex-avatar.png', status: 'Prospection' },
      { human: 'Thomas', dept: 'Support', ai: 'Sophia', avatar: '/sophia-avatar.png', status: 'Clients' },
      { human: 'Léa', dept: 'Opérations', ai: 'Marcus', avatar: '/marcus-avatar.png', status: 'Coordination' },
    ],
    collaboratorLabel: 'Collaborateur IA',
  },
  en: {
    eyebrow: 'Hire without hiring',
    orgCaption: 'AI joins your org chart',
    headline: 'Your AI Collaborators are',
    headlineAccent: ' already ready.',
    lead: 'Add AI Collaborators that analyze, execute and deliver with your teams.',
    heroCta: 'Create my AI Collaborator',
    heroCtaSecondary: 'Free assessment',
    heroProofs: ['7-day free trial', 'No commitment', 'Ready in minutes'],
    orgTitle: 'Your organization',
    orgMeta: '3 members + 3 AI Collaborators',
    orgPairs: [
      { human: 'Camille', dept: 'Sales', ai: 'Alex', avatar: '/alex-avatar.png', status: 'Prospecting' },
      { human: 'Thomas', dept: 'Support', ai: 'Sophia', avatar: '/sophia-avatar.png', status: 'Customers' },
      { human: 'Léa', dept: 'Operations', ai: 'Marcus', avatar: '/marcus-avatar.png', status: 'Coordination' },
    ],
    collaboratorLabel: 'AI Collaborator',
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
          <motion.p {...enter(0.04)} className="mb-7 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">
            {t.eyebrow}
          </motion.p>
          <motion.h1 {...enter(0.1)} className="text-balance font-sf text-[clamp(2.85rem,5.2vw,5.3rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-[#1C1A17]">
            {t.headline}<span className="text-[#D10E63]">{t.headlineAccent}</span>
          </motion.h1>
          <motion.p {...enter(0.18)} className="mt-7 max-w-xl text-pretty text-base leading-7 text-[#5F594F] md:text-lg md:leading-8">
            {t.lead}
          </motion.p>
          <motion.div {...enter(0.24)} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="/signup" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">
              {t.heroCta}<ArrowRight className="h-4 w-4" />
            </a>
            <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#BFB5A6] px-6 text-sm font-bold text-[#1C1A17] transition-colors hover:border-[#D10E63] hover:text-[#D10E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">
              {t.heroCtaSecondary}
            </a>
          </motion.div>
          <motion.div {...enter(0.3)} className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#D8D0C2] pt-5 text-xs font-medium text-[#6B6560]">
            {t.heroProofs.map((proof) => <span key={proof} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#D10E63]" strokeWidth={2.5} />{proof}</span>)}
          </motion.div>
        </div>

        <motion.div {...enter(0.16)} className="relative mx-auto w-full max-w-xl" aria-label={t.orgTitle}>
          <div className="premium-shadow overflow-hidden rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3]">
            <div className="flex items-center justify-between border-b border-[#E4DDCE] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D10E63] text-[#FBF9F3]"><Network className="h-4 w-4" /></span>
                <div><p className="text-sm font-bold text-[#1C1A17]">{t.orgTitle}</p><p className="text-[11px] text-[#857C6E]">{t.orgMeta}</p></div>
              </div>
              <span className="h-2 w-2 rounded-full bg-[#D10E63]" aria-hidden="true" />
            </div>
            <div className="p-4 sm:p-6">
              <div className="mb-3 grid grid-cols-[1fr_2.5rem_1fr] gap-2 px-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]"><span>{lang === 'fr' ? 'Équipe' : 'Team'}</span><span /><span>{t.collaboratorLabel}</span></div>
              <div className="flex flex-col gap-2.5">
                {t.orgPairs.map((pair, index) => (
                  <motion.div key={pair.human} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.3 + index * 0.1 }} className="grid grid-cols-[1fr_2.5rem_1fr] items-center gap-2">
                    <div className="min-w-0 rounded-xl border border-[#E4DDCE] bg-[#F3EFE6] p-3"><p className="truncate text-sm font-bold text-[#1C1A17]">{pair.human}</p><p className="text-[11px] text-[#857C6E]">{pair.dept}</p></div>
                    <div className="flex items-center" aria-hidden="true"><span className="h-px flex-1 bg-[#D10E63]/35" /><span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" /><span className="h-px flex-1 bg-[#D10E63]/35" /></div>
                    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#D10E63]/20 bg-[#D10E63]/[0.045] p-3">
                      <div className="relative shrink-0"><img src={pair.avatar} alt="" className="h-9 w-9 rounded-full object-cover" /><span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#FBF9F3] bg-[#D10E63]" /></div>
                      <div className="min-w-0"><p className="truncate text-sm font-bold text-[#1C1A17]">{pair.ai}</p><p className="truncate text-[11px] text-[#D10E63]">{pair.status}</p></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="border-t border-[#E4DDCE] px-5 py-3.5 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#857C6E] sm:px-6">{t.orgCaption}</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
