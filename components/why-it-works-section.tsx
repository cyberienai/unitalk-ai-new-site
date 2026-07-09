'use client'

import { motion } from 'framer-motion'
import { Brain, Users, User } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const T = {
  fr: {
    eyebrow: 'Pourquoi ça marche',
    pillars: [
      {
        icon: Brain,
        title: 'Mémoire Partagée',
        description: 'Votre équipe et ses agents travaillent dans le même contexte, les mêmes décisions, la même mémoire d\'entreprise.',
      },
      {
        icon: Users,
        title: 'Collaboration Active',
        description: 'L\'agent Hermès les propulse. Vos équipes et vos agents raisonnent ensemble, décident ensemble, exécutent ensemble.',
      },
      {
        icon: User,
        title: 'Vrais Collaborateurs',
        description: 'Chaque agent a une identité, une voix, un rôle. Ils grandissent, apprennent, se souviennent. Des collègues, vraiment.',
      },
    ],
  },
  en: {
    eyebrow: 'Why It Works',
    pillars: [
      {
        icon: Brain,
        title: 'Shared Memory',
        description: 'Your team and its agents work in the same context, decisions, and company memory.',
      },
      {
        icon: Users,
        title: 'Active Collaboration',
        description: 'Powered by Hermès agent. Your teams and your agents reason together, decide together, execute together.',
      },
      {
        icon: User,
        title: 'Real Collaborators',
        description: 'Each agent has an identity, a voice, a role. They grow, learn, remember. Colleagues, truly.',
      },
    ],
  },
}

export function WhyItWorksSection() {
  const { lang } = useLanguage()
  const t = T[lang as keyof typeof T]
  const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

  return (
    <section className="relative bg-gradient-to-b from-[#F3EFE6] via-[#FBF9F3] to-[#F3EFE6] py-20 sm:py-32">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D10E63]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D10E63]/3 rounded-full blur-3xl" />
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-[#1C1A17]">
            Trois principes de collaboration
            <br />
            <span className="bg-gradient-to-r from-[#D10E63] to-[#F1729F] bg-clip-text text-transparent">qui changent tout</span>
          </h2>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
          {t.pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                className="group relative flex flex-col items-start gap-5 rounded-2xl border border-[#DCD4C4] bg-white/70 backdrop-blur-sm p-8 shadow-sm transition-all duration-300 hover:border-[#D10E63]/40 hover:bg-white hover:shadow-lg hover:shadow-[#D10E63]/15 hover:-translate-y-1"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.12 }}
              >
                {/* Icon with enhanced styling */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#D10E63]/15 to-[#D10E63]/5 text-[#D10E63] group-hover:from-[#D10E63]/25 group-hover:to-[#D10E63]/10 transition-all duration-300">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>

                {/* Title with better emphasis */}
                <h3 className="text-xl font-bold text-[#1C1A17] group-hover:text-[#D10E63] transition-colors duration-300">{pillar.title}</h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-[#6B6560] group-hover:text-[#1C1A17] transition-colors duration-300">{pillar.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
