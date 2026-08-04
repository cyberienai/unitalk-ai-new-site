'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Une offre pour commencer',
    title: 'Tout ce qu’il faut pour lancer votre premier Collaborateur IA.',
    intro: 'Une seule offre, sans surprise. Vous ajoutez des profils métier quand vous en avez besoin.',
    included: [
      'Un Collaborateur IA avec sa propre identité',
      'Email, téléphone et calendrier dédiés',
      'Mémoire durable, propre à votre organisation',
      'Profils métier à activer selon vos besoins',
      'Tous les modèles d’IA inclus (ChatGPT et les autres)',
      'Connexion à vos outils (Google Workspace, Microsoft 365…)',
      'Espace de travail avec validation des missions',
      'Environnement hébergé en France, outils de conformité RGPD',
      'Mise en place accompagnée',
    ],
    cta: 'Commencer l’essai gratuit',
    subtext: 'Essai gratuit 7 jours · Mise en place accompagnée',
    detail: 'Voir le détail des tarifs',
  },
  en: {
    eyebrow: 'A plan to get started',
    title: 'Everything you need to launch your first AI Collaborator.',
    intro: 'A single plan, no surprises. You add business profiles whenever you need them.',
    included: [
      'An AI Collaborator with its own identity',
      'Dedicated email, phone and calendar',
      'Durable memory, specific to your organization',
      'Business profiles to activate as you need',
      'Every AI model included (ChatGPT and the others)',
      'Connection to your tools (Google Workspace, Microsoft 365…)',
      'Workspace with mission approval',
      'Environment hosted in France, GDPR compliance tools',
      'Guided onboarding',
    ],
    cta: 'Start the free trial',
    subtext: '7-day free trial · Guided onboarding',
    detail: 'See full pricing',
  },
} as const

export function SectionPricing({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="relative overflow-hidden bg-[#F3EFE6] py-20 sm:py-28">
      <div className="editorial-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2 className="text-balance font-sf text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1C1A17]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#4E483F]">
            {t.intro}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease }}
          className="premium-shadow mx-auto mt-12 max-w-2xl rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3] p-6 sm:p-8"
        >
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {t.included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#3F3A33]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/10 text-[#D10E63]">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col items-center gap-3 border-t border-[#E4DDCE] pt-7">
            <a
              href="/decouvrir"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 sm:w-auto"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-xs font-medium text-[#6B6560]">{t.subtext}</p>
            <a href="/tarifs" className="text-xs font-semibold text-[#D10E63] underline-offset-2 hover:underline">
              {t.detail}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
