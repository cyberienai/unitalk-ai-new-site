'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from './section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    kicker: 'Votre Collaborateur IA',
    title: 'Une identité qui reste. Des profils qui évoluent.',
    subtitle:
      'Votre Collaborateur IA conserve sa fonction, sa mémoire, son contexte et son expérience. Ajoutez-lui de nouveaux savoir-faire à mesure que ses responsabilités évoluent.',
    identityName: 'Emma',
    identityRole: 'Collaboratrice IA',
    identityNote: 'La même identité, du premier jour à aujourd’hui.',
    steps: [
      { when: 'Jour 1', title: 'Profil prospection', desc: 'Identifie et qualifie vos prospects.' },
      { when: 'Mois 2', title: '+ Profil reporting', desc: 'Suit les résultats et produit vos tableaux de bord.' },
      { when: 'Mois 4', title: '+ Profil support', desc: 'Répond à vos clients et traite les demandes courantes.' },
    ],
    discoverAll: 'Découvrir les Collaborateurs IA',
  },
  en: {
    kicker: 'Your AI Collaborator',
    title: 'An identity that stays. Profiles that evolve.',
    subtitle:
      'Your AI Collaborator keeps its function, its memory, its context and its experience. Add new skills as its responsibilities grow.',
    identityName: 'Emma',
    identityRole: 'AI Collaborator',
    identityNote: 'The same identity, from day one until today.',
    steps: [
      { when: 'Day 1', title: 'Prospecting profile', desc: 'Identifies and qualifies your prospects.' },
      { when: 'Month 2', title: '+ Reporting profile', desc: 'Tracks results and builds your dashboards.' },
      { when: 'Month 4', title: '+ Support profile', desc: 'Answers your customers and handles routine requests.' },
    ],
    discoverAll: 'Discover the AI Collaborators',
  },
}

export function SectionCollaborator({ lang }: { lang: Lang }) {
  const t = T[lang]

  return (
    <section className="bg-[#EFEADF] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Copy */}
        <div className="max-w-xl">
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-[#5F594F]">{t.subtitle}</p>

          <div className="mt-8">
            <Link
              href="/collaborateurs-ia"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4E483F] underline-offset-4 transition-colors hover:text-[#D10E63] hover:underline"
            >
              {t.discoverAll}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Profile-evolution timeline */}
        <div className="premium-shadow rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3] p-6 sm:p-8">
          {/* Identity anchor — stays constant */}
          <div className="flex items-center gap-4 border-b border-[#E9E2D4] pb-5">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[#1C1A17]/[0.08]">
              <Image src="/images/emma-avatar.png" alt={t.identityName} fill className="object-cover" sizes="56px" />
            </span>
            <div className="min-w-0">
              <p className="font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{t.identityName}</p>
              <p className="text-sm font-medium text-[#D10E63]">{t.identityRole}</p>
            </div>
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-[#8A8175]">{t.identityNote}</p>

          {/* Timeline */}
          <ol className="relative mt-6 flex flex-col gap-6 pl-8">
            <span className="absolute left-[9px] top-2 bottom-2 w-px bg-[#E4DCCF]" aria-hidden="true" />
            {t.steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease, delay: i * 0.12 }}
                className="relative"
              >
                <span
                  className="absolute -left-8 top-1 flex h-[19px] w-[19px] items-center justify-center rounded-full border-2 border-[#D10E63] bg-[#FBF9F3]"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />
                </span>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{step.when}</p>
                <p className="mt-1 text-[15px] font-bold text-[#1C1A17]">{step.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-[#5F594F]">{step.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
