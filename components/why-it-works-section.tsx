'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, Package } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const T = {
  fr: {
    eyebrow: 'Pourquoi ça marche',
    pillars: [
      {
        icon: Brain,
        title: 'Mémoire Partagée',
        description: 'Vos humains et leurs agents partagent le même contexte, les mêmes décisions, la même mémoire d\'entreprise.',
      },
      {
        icon: Zap,
        title: 'Agents Autonomes',
        description: 'Propulsés par Hermès, nos agents raisonnent, planifient et exécutent. Pas des chatbots passifs.',
      },
      {
        icon: Package,
        title: 'Tout-en-un',
        description: 'Aucune intégration complexe. Interface unique, infrastructure dédiée, support inclus.',
      },
    ],
  },
  en: {
    eyebrow: 'Why It Works',
    pillars: [
      {
        icon: Brain,
        title: 'Shared Memory',
        description: 'Your humans and their agents share the same context, decisions, and company memory.',
      },
      {
        icon: Zap,
        title: 'Autonomous Agents',
        description: 'Powered by Hermès, our agents reason, plan, and execute. Not passive chatbots.',
      },
      {
        icon: Package,
        title: 'All-in-One',
        description: 'No complex integrations. Single interface, dedicated infrastructure, support included.',
      },
    ],
  },
}

export function WhyItWorksSection() {
  const { lang } = useLanguage()
  const t = T[lang as keyof typeof T]
  const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

  return (
    <section className="bg-[#F3EFE6] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <motion.div
          className="mb-12 text-center sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl font-bold leading-tight text-[#1C1A17] sm:text-4xl">
            Trois principes simples qui changent tout
          </h2>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {t.pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                className="flex flex-col items-start gap-4 rounded-2xl border border-[#DCD4C4] bg-white p-6 shadow-sm transition-all hover:border-[#D10E63]/30 hover:shadow-md hover:shadow-[#D10E63]/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D10E63]/10 text-[#D10E63]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#1C1A17]">{pillar.title}</h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-[#6B6560]">{pillar.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
