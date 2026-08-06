'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Phone,
  CalendarDays,
  Briefcase,
  Megaphone,
  FileText,
  Settings2,
  BrainCircuit,
  Plug,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import { CtaButton } from '@/components/ui/cta-button'

const ease = [0.22, 1, 0.36, 1] as const

type Group = { icon: LucideIcon; title: string; items: readonly [string, string, string] }

const T = {
  fr: {
    eyebrow: 'Une équipe complète',
    title: 'Un Collaborateur IA travaille comme un véritable membre de votre équipe.',
    subtitle: 'Une seule plateforme pour communiquer, vendre, produire et collaborer.',
    groups: [
      { icon: Phone, title: 'Communication', items: ['Téléphone IA', 'Chat', 'Emails'] },
      { icon: CalendarDays, title: 'Réunions', items: ['Planification', 'Transcription', 'Comptes-rendus'] },
      { icon: Briefcase, title: 'Vente', items: ['Prospection', 'Qualification', 'Devis'] },
      { icon: Megaphone, title: 'Marketing', items: ['Contenus', 'Réseaux sociaux', 'Newsletters'] },
      { icon: FileText, title: 'Documents', items: ['Analyse', 'Résumés', 'Présentations'] },
      { icon: Settings2, title: 'Opérations', items: ['Automatisation', 'Processus', 'Connecteurs'] },
      { icon: BrainCircuit, title: 'Intelligence', items: ['Mémoire d’entreprise', 'Tous les modèles IA', 'Recherche & Veille'] },
      { icon: Plug, title: 'Applications', items: ['3 000+ intégrations', 'CRM, ERP, Messagerie', 'API & Webhooks'] },
      { icon: Users, title: 'Collaboration', items: ['Travail en équipe', 'Missions partagées', 'Contexte partagé'] },
    ] as Group[],
    footer: 'Plus de 500 missions disponibles.',
    cta: 'Explorer les missions',
  },
  en: {
    eyebrow: 'A complete team',
    title: 'An AI Collaborator works like a real member of your team.',
    subtitle: 'One platform to communicate, sell, produce and collaborate.',
    groups: [
      { icon: Phone, title: 'Communication', items: ['AI phone', 'Chat', 'Emails'] },
      { icon: CalendarDays, title: 'Meetings', items: ['Scheduling', 'Transcription', 'Minutes'] },
      { icon: Briefcase, title: 'Sales', items: ['Prospecting', 'Qualification', 'Quotes'] },
      { icon: Megaphone, title: 'Marketing', items: ['Content', 'Social media', 'Newsletters'] },
      { icon: FileText, title: 'Documents', items: ['Analysis', 'Summaries', 'Presentations'] },
      { icon: Settings2, title: 'Operations', items: ['Automation', 'Processes', 'Connectors'] },
      { icon: BrainCircuit, title: 'Intelligence', items: ['Company memory', 'Every AI model', 'Research & monitoring'] },
      { icon: Plug, title: 'Applications', items: ['3,000+ integrations', 'CRM, ERP, Messaging', 'APIs & Webhooks'] },
      { icon: Users, title: 'Collaboration', items: ['Teamwork', 'Shared missions', 'Shared context'] },
    ] as Group[],
    footer: '500+ missions available.',
    cta: 'Explore missions',
  },
} as const

export function SectionCapabilities({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()

  return (
    <section className="border-t border-[#E9E2D4] bg-[#F3EFE6] py-24 sm:py-32">
      <div className="editorial-shell">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 flex justify-center">
            <Kicker>{t.eyebrow}</Kicker>
          </div>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.6rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]">{t.subtitle}</p>
        </motion.header>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {t.groups.map((group, i) => {
            const Icon = group.icon
            return (
              <motion.div
                key={group.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease, delay: (i % 3) * 0.06 }}
                className="rounded-2xl border border-[#E4DCCF] bg-[#FBF9F3] p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D10E63]/[0.1] text-[#D10E63]">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="font-sf text-[15px] font-bold tracking-[-0.01em] text-[#1C1A17]">{group.title}</h3>
                </div>
                <ul className="mt-4 flex flex-col divide-y divide-[#EBE4D6]">
                  {group.items.map((item) => (
                    <li key={item} className="py-2 text-[13px] font-medium leading-tight text-[#4E483F]">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease }}
          className="mt-12 flex flex-col items-center gap-5"
        >
          <p className="font-sf text-lg font-bold tracking-[-0.02em] text-[#1C1A17]">
            {t.footer}
          </p>
          <CtaButton href="/missions">
            {t.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CtaButton>
        </motion.div>
      </div>
    </section>
  )
}
