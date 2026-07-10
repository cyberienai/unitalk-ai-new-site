'use client'

import { motion } from 'framer-motion'
import { Brain, Users, IdCard, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const T = {
  fr: {
    eyebrow: '• LE FONCTIONNEMENT',
    cta: 'Activer mon Collaborateur IA',
    pillars: [
      {
        icon: Brain,
        title: 'Un contexte commun',
        description: 'Votre équipe et vos agents partagent le même contexte, les mêmes décisions, la même mémoire. Zéro information perdue.',
      },
      {
        icon: Users,
        title: 'Une intelligence collective',
        description: 'Humains et collaborateurs IA raisonnent, décident, exécutent ensemble. Pas d\'aller-retour, une seule équipe.',
      },
      {
        icon: IdCard,
        title: 'Des collaborateurs à part entière',
        description: 'Chaque collaborateur a un nom, un rôle, une voix, une mémoire. Pas un chatbot. Un vrai membre de l\'équipe.',
      },
    ],
  },
  en: {
    eyebrow: '• HOW IT WORKS',
    cta: 'Activate my AI Collaborator',
    pillars: [
      {
        icon: Brain,
        title: 'Shared Context',
        description: 'Your team and your agents share the same context, decisions, and company memory. Zero information lost.',
      },
      {
        icon: Users,
        title: 'Collective Intelligence',
        description: 'Humans and AI collaborators reason, decide, execute together. No back-and-forth, one team.',
      },
      {
        icon: IdCard,
        title: 'Full-fledged collaborators',
        description: 'Each collaborator has a name, a role, a voice, a memory. Not a chatbot. A real team member.',
      },
    ],
  },
}

export function WhyItWorksSection() {
  const { lang } = useLanguage()
  const t = T[lang as keyof typeof T]
  const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

  return (
    <section className="relative bg-[#F3EFE6] py-20 sm:py-32">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D10E63]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D10E63]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <motion.div
          className="mb-14 text-center sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-[#1C1A17]">
            <span className="text-[#D10E63]">Ce qui rend un Collaborateur IA unique</span>
          </h2>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
          {t.pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                className="group relative flex flex-col items-start gap-5 rounded-2xl border border-[#E8E1D0] bg-[#FFFFFF] p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-[rgba(90,70,60,0.12)] hover:-translate-y-1"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.12 }}
              >
                {/* Icon with enhanced styling */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#D10E63]/25 to-[#D10E63]/15 text-[#D10E63] group-hover:from-[#D10E63]/35 group-hover:to-[#D10E63]/25 transition-all duration-300">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>

                {/* Title with better emphasis */}
                <h3 className="text-xl font-bold text-[#1C1A17]">{pillar.title}</h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-[#333333]">{pillar.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <a
            href="/solo"
            className="inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-8 py-4 text-sm font-semibold text-[#FBF9F3] transition-all hover:bg-[#B00B52] sm:text-base"
          >
            {t.cta}
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
