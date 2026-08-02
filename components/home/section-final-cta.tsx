'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'

const AVATARS = [
  '/images/emma-avatar.png',
  '/images/lea-avatar.png',
  '/images/hugo-avatar.png',
  '/images/ines-avatar.png',
  '/images/arthur-avatar.png',
  '/images/nadia-avatar.png',
]

const T = {
  fr: {
    kicker: 'Recrutez votre premier Collaborateur IA',
    title: 'Votre premier Collaborateur IA est déjà prêt.',
    lead: 'Rejoignez les entreprises qui construisent leur équipe IA avec Unitalk.',
    primary: 'Créer mon Collaborateur IA',
    secondary: 'Explorer les Collaborateurs IA',
  },
  en: {
    kicker: 'Recruit your first AI Collaborator',
    title: 'Your first AI Collaborator is already ready.',
    lead: 'Join the companies building their AI team with Unitalk.',
    primary: 'Create my AI Collaborator',
    secondary: 'Explore the AI Collaborators',
  },
} as const

export function SectionFinalCta({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="bg-[#F3EFE6] py-20 sm:py-28">
      <div className="editorial-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl rounded-[2.5rem] border border-[#E0D8C9] bg-[#FBF9F3] px-6 py-14 text-center sm:px-12 sm:py-20"
        >
          {/* Team cluster */}
          <div className="mb-8 flex justify-center -space-x-3">
            {AVATARS.map((src, i) => (
              <motion.img
                key={src}
                src={src || '/placeholder.svg'}
                alt=""
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="h-12 w-12 rounded-full border-2 border-[#FBF9F3] object-cover sm:h-14 sm:w-14"
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Kicker>{t.kicker}</Kicker>
          </div>
          <h2 className="mt-4 text-balance font-sf text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[#1C1A17]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-[#5F594F] sm:text-lg">{t.lead}</p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              {t.primary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/collaborateurs-ia"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#D8D0C2] bg-[#FBF9F3] px-7 text-sm font-bold text-[#4E483F] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17] sm:w-auto"
            >
              {t.secondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
