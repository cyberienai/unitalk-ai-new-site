'use client'

import Image from 'next/image'
import { CtaButton } from '@/components/ui/cta-button'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    title1: 'Les modèles d’IA se louent.',
    title2: 'Vos Collaborateurs IA vous appartiennent.',
    lead: 'Une conversation suffit pour commencer.',
    steps: [
      'Rencontrez Alma.',
      'Recrutez votre premier Collaborateur IA.',
      'Construisez l’entreprise IA de votre entreprise.',
    ],
    cta: 'Recruter mon Collaborateur IA',
    proofs: ['Aucune carte bancaire', 'Essai gratuit', 'Configuration en quelques minutes'],
  },
  en: {
    title1: 'AI models are rented.',
    title2: 'Your AI Collaborators belong to you.',
    lead: 'One conversation is all it takes to start.',
    steps: [
      'Meet Alma.',
      'Hire your first AI Collaborator.',
      'Build your company’s AI organization.',
    ],
    cta: 'Recruit my AI Collaborator',
    proofs: ['No credit card', 'Free trial', 'Set up in minutes'],
  },
} as const

export function SectionFinalCta({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#1C1A17] py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-[30rem] w-[30rem] rounded-full bg-[#D10E63]/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[#D10E63]/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease }}
        className="editorial-shell relative text-center"
      >
        <div className="mb-6 flex justify-center">
          <Image src="/alma-avatar.png" alt="Alma" width={56} height={56} className="h-14 w-14 rounded-full object-cover ring-2 ring-[#D10E63]/40" />
        </div>

        <h2 className="mx-auto max-w-3xl text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#F3EFE6] sm:text-4xl lg:text-5xl">
          {t.title1}{' '}
          <span className="text-[#F0658F]">{t.title2}</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#B8B0A4]">{t.lead}</p>

        <ul className="mx-auto mt-8 flex max-w-md flex-col gap-2.5 text-left">
          {t.steps.map((step) => (
            <li key={step} className="flex items-center gap-3 text-[15px] font-medium text-[#F3EFE6]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3]">
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
              {step}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-4">
          <CtaButton href="/decouvrir" tone="dark">
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </CtaButton>
          <div className="flex flex-row flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs font-medium text-[#8A8175]">
            {t.proofs.map((proof) => (
              <span key={proof} className="flex items-center gap-1.5 whitespace-nowrap">
                <Check className="h-3.5 w-3.5 text-[#F0658F]" strokeWidth={2.5} />
                {proof}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
