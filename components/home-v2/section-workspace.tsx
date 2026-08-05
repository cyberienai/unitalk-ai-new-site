'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, MessagesSquare, Users, Target, FileText, Wrench, Workflow, Brain } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Un seul environnement',
    title: 'Le workspace de votre organisation.',
    subtitle: 'Humains et Collaborateurs IA travaillent dans le même environnement. Une seule interface pour tout piloter.',
    items: [
      { icon: MessagesSquare, label: 'vos conversations' },
      { icon: Users, label: 'vos Collaborateurs IA' },
      { icon: Target, label: 'vos missions' },
      { icon: FileText, label: 'vos documents' },
      { icon: Wrench, label: 'vos outils' },
      { icon: Workflow, label: 'vos automatisations' },
      { icon: Brain, label: 'la mémoire de votre entreprise' },
    ],
    closing: 'Plus besoin de passer d’une application à l’autre. Tout se passe dans votre workspace.',
    cta: 'Découvrir le workspace',
    imageAlt: 'Le workspace Unitalk où humains et Collaborateurs IA travaillent ensemble',
  },
  en: {
    eyebrow: 'One single environment',
    title: 'Your organization’s workspace.',
    subtitle: 'Humans and AI Collaborators work in the same environment. One interface to run everything.',
    items: [
      { icon: MessagesSquare, label: 'your conversations' },
      { icon: Users, label: 'your AI Collaborators' },
      { icon: Target, label: 'your missions' },
      { icon: FileText, label: 'your documents' },
      { icon: Wrench, label: 'your tools' },
      { icon: Workflow, label: 'your automations' },
      { icon: Brain, label: 'your company memory' },
    ],
    closing: 'No more jumping between apps. Everything happens in your workspace.',
    cta: 'Discover the workspace',
    imageAlt: 'The Unitalk workspace where humans and AI Collaborators work together',
  },
} as const

export function SectionWorkspace({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="border-t border-[#E9E2D4] bg-[#F3EFE6] py-24 sm:py-32">
      <div className="editorial-shell">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.eyebrow}</p>
            <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
              {t.title}
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-[#5F594F]">{t.subtitle}</p>

            <ul className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {t.items.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label} className="flex items-center gap-2.5 text-[13px] font-medium text-[#3F3A33]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E4DCCF] bg-[#FBF9F3] text-[#D10E63]">
                      <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    </span>
                    {item.label}
                  </li>
                )
              })}
            </ul>

            <p className="mt-7 max-w-lg text-pretty text-[15px] font-semibold leading-relaxed text-[#1C1A17]">{t.closing}</p>

            <Link
              href="/decouvrir"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
            className="premium-shadow overflow-hidden rounded-[1.75rem] border border-[#E4DCCF] bg-[#FBF9F3]"
          >
            <Image
              src="/images/unitalk-collaborative-workspace.png"
              alt={t.imageAlt}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
