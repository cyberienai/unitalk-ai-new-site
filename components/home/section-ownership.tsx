'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'

const T = {
  fr: {
    kicker: 'Ils vous appartiennent',
    titleA: 'Les modèles IA se louent.',
    titleB: 'Vos Collaborateurs IA vous appartiennent.',
    lead: 'Chaque Collaborateur IA possède une identité, une mémoire, des connaissances, des compétences, des outils et un profil public. Il évolue avec votre entreprise.',
    rentTitle: 'Location',
    rentSub: 'Utilisation ponctuelle',
    rentNodes: ['ChatGPT', 'Claude', 'Gemini'],
    ownTitle: 'Votre entreprise',
    ownSub: 'Patrimoine d’intelligence',
    ownName: 'Emma',
    ownAttrs: ['Identité', 'Mémoire', 'Connaissances', 'Compétences', 'Outils', 'Profil public'],
  },
  en: {
    kicker: 'They belong to you',
    titleA: 'AI models are rented.',
    titleB: 'Your AI Collaborators belong to you.',
    lead: 'Each AI Collaborator has an identity, a memory, knowledge, skills, tools and a public profile. It grows with your company.',
    rentTitle: 'Rental',
    rentSub: 'One-off usage',
    rentNodes: ['ChatGPT', 'Claude', 'Gemini'],
    ownTitle: 'Your company',
    ownSub: 'An intelligence asset',
    ownName: 'Emma',
    ownAttrs: ['Identity', 'Memory', 'Knowledge', 'Skills', 'Tools', 'Public profile'],
  },
} as const

export function SectionOwnership({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="bg-[#F3EFE6] py-20 sm:py-28">
      <div className="editorial-shell">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Kicker>{t.kicker}</Kicker>
          </div>
          <h2 className="mt-4 text-balance font-sf text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#1C1A17]">
            {t.titleA} <span className="text-[#D10E63]">{t.titleB}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-[#5F594F]">{t.lead}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
          {/* Rental */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col rounded-3xl border border-[#E4DDCE] bg-[#EFE9DD] p-6"
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{t.rentTitle}</p>
            <p className="mt-1 text-sm text-[#6E665A]">{t.rentSub}</p>
            <div className="mt-5 flex flex-col gap-2.5">
              {t.rentNodes.map((n) => (
                <span key={n} className="rounded-xl border border-[#DDD5CA] bg-[#FBF9F3] px-4 py-3 text-sm font-semibold text-[#6B6560]">
                  {n}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Ownership */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="flex flex-col rounded-3xl border border-[#D10E63]/30 bg-[#D10E63]/[0.06] p-6"
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D10E63]">{t.ownTitle}</p>
            <p className="mt-1 text-sm text-[#A80B50]">{t.ownSub}</p>
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#D10E63]/25 bg-[#FBF9F3] p-3">
              <img src="/images/emma-avatar.png" alt="" className="h-10 w-10 rounded-full object-cover" />
              <p className="font-sf text-base font-bold text-[#1C1A17]">{t.ownName}</p>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {t.ownAttrs.map((attr) => (
                <li key={attr} className="flex items-center gap-1.5 text-sm font-medium text-[#4E483F]">
                  <Check className="h-3.5 w-3.5 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                  {attr}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
