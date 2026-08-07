'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'

const T = {
  fr: {
    kicker: 'Alma',
    titleA: 'Vous ne savez pas lequel choisir ?',
    titleB: 'Parlez avec Alma',
    role: 'Votre Conseillère IA',
    lead: 'Elle comprend votre entreprise, identifie vos besoins et vous recommande les Collaborateurs IA les plus adaptés.',
    cta: 'Parlez avec Alma',
    recoTitle: 'Recommandations d’Alma',
    recos: [
      { name: 'Emma', role: 'Assistante de direction IA', score: 98, avatar: '/images/emma-avatar.png' },
      { name: 'Léa', role: 'Créatrice de contenu IA', score: 96, avatar: '/images/lea-avatar.png' },
      { name: 'Hugo', role: 'Commercial IA', score: 94, avatar: '/images/hugo-avatar.png' },
    ],
    match: 'de correspondance',
  },
  en: {
    kicker: 'Alma',
    titleA: 'Not sure which one to choose?',
    titleB: 'Talk with Alma',
    role: 'Your AI Advisor',
    lead: 'She understands your company, identifies your needs and recommends the AI Collaborators that fit you best.',
    cta: 'Talk with Alma',
    recoTitle: 'Alma’s recommendations',
    recos: [
      { name: 'Emma', role: 'AI Executive Assistant', score: 98, avatar: '/images/emma-avatar.png' },
      { name: 'Léa', role: 'AI Content Strategist', score: 96, avatar: '/images/lea-avatar.png' },
      { name: 'Hugo', role: 'AI Sales Rep', score: 94, avatar: '/images/hugo-avatar.png' },
    ],
    match: 'match',
  },
} as const

export function SectionAlma({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="bg-[#1C1A17] py-20 text-[#FBF9F3] sm:py-28">
      <div className="editorial-shell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Alma */}
          <div>
            <div className="flex">
              <Kicker dark>{t.kicker}</Kicker>
            </div>
            <h2 className="mt-4 text-balance font-sf text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              {t.titleA} <span className="text-[#E8A0BF]">{t.titleB}</span>
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D10E63]">
                <Sparkles className="h-5 w-5" />
              </span>
              <p className="font-sf text-lg font-bold">{t.role}</p>
            </div>
            <p className="mt-5 max-w-md text-pretty text-base leading-7 text-[#FBF9F3]/70">{t.lead}</p>
            <Link
              href="/decouvrir"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: recommendations */}
          <div className="rounded-[2rem] border border-[#FBF9F3]/12 bg-[#26231F] p-6 sm:p-8">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E8A0BF]">{t.recoTitle}</p>
            <div className="mt-5 flex flex-col gap-3">
              {t.recos.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.12 }}
                  className="flex items-center gap-4 rounded-2xl border border-[#FBF9F3]/10 bg-[#1C1A17] p-4"
                >
                  <img src={r.avatar || '/placeholder.svg'} alt="" className="h-11 w-11 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-sf text-base font-bold">{r.name}</p>
                    <p className="truncate text-[13px] text-[#FBF9F3]/60">{r.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-lg font-bold text-[#E8A0BF]">{r.score}%</p>
                    <p className="text-[10px] uppercase tracking-wide text-[#FBF9F3]/40">{t.match}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
