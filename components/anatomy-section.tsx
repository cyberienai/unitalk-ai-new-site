'use client'

import { motion } from 'framer-motion'
import { User, Wrench, Brain, Zap, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

type AnatomyCard = {
  icon: LucideIcon
  title: string
  tagline: string
  items: string[]
}

const T = {
  fr: {
    eyebrow: 'ILS POSSÈDENT',
    title: 'Tout ce qu\u2019il faut pour travailler.',
    subtitle:
      'Un agent exécute des tâches. Un collaborateur possède une identité, des outils, une mémoire et une intelligence. Voici de quoi il est fait.',
    cards: [
      {
        icon: User,
        title: 'Une identité',
        tagline: 'Un vrai profil, comme un collègue.',
        items: ['Prénom', 'Voix', 'Numéro de téléphone', 'Adresse email', 'Agenda', 'URL publique'],
      },
      {
        icon: Wrench,
        title: 'Des outils',
        tagline: 'Ils travaillent déjà dans votre entreprise.',
        items: [
          'Plus de 3 000 applications',
          'Connectés à votre CRM',
          'Exécutent du code',
          'Naviguent sur le web',
        ],
      },
      {
        icon: Brain,
        title: 'Une mémoire',
        tagline: 'Ils se souviennent. Ils apprennent ensemble.',
        items: [
          'Retiennent chaque échange',
          'Apprennent en continu',
          'Contexte partagé de l\u2019entreprise',
          'Accumulent l\u2019expérience',
        ],
      },
      {
        icon: Zap,
        title: 'Une intelligence',
        tagline: 'Toujours le meilleur modèle, automatiquement.',
        items: [
          'ChatGPT, Claude, Gemini',
          'Sélection automatique du modèle',
          'Texte, image, code, audio',
          'Développent de nouvelles compétences',
        ],
      },
    ] as AnatomyCard[],
  },
  en: {
    eyebrow: 'THEY HAVE',
    title: 'Everything it takes to work.',
    subtitle:
      'An agent executes tasks. A collaborator has an identity, tools, a memory and an intelligence. Here is what they are made of.',
    cards: [
      {
        icon: User,
        title: 'An identity',
        tagline: 'A real profile, like a colleague.',
        items: ['First name', 'Voice', 'Phone number', 'Email address', 'Calendar', 'Public URL'],
      },
      {
        icon: Wrench,
        title: 'Tools',
        tagline: 'They already work inside your company.',
        items: ['3,000+ applications', 'Connected to your CRM', 'Run code', 'Browse the web'],
      },
      {
        icon: Brain,
        title: 'A memory',
        tagline: 'They remember. They learn together.',
        items: [
          'Remember every exchange',
          'Learn continuously',
          'Shared company context',
          'Build up experience',
        ],
      },
      {
        icon: Zap,
        title: 'An intelligence',
        tagline: 'Always the best model, automatically.',
        items: [
          'ChatGPT, Claude, Gemini',
          'Automatic model selection',
          'Text, image, code, audio',
          'Develop new skills',
        ],
      },
    ] as AnatomyCard[],
  },
}

export function AnatomySection({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="relative w-full border-t border-[#DCD4C4] bg-[#FBF9F3] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2
            className="font-sf text-3xl font-bold leading-[1.08] text-[#1C1A17] text-balance sm:text-4xl md:text-[2.75rem]"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#8A8175] sm:text-lg">
            {t.subtitle}
          </p>
        </motion.div>

        {/* 4 rich cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {t.cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease, delay: (i % 2) * 0.1 }}
                className="group flex flex-col rounded-3xl border border-[#E6DFD1] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D10E63]/25 hover:shadow-lg hover:shadow-[#D10E63]/5 sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1C1A17] text-[#FBF9F3] transition-all duration-300 group-hover:bg-[#D10E63]">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3
                      className="font-sf text-xl font-bold leading-snug text-[#1C1A17]"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {card.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-[#8A8175]">{card.tagline}</p>
                  </div>
                </div>

                <ul className="mt-6 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#4E483F]">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/10 text-[#D10E63]">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
