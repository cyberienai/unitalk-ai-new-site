'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Infinity, Users, Server } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Tarif',
    title: 'Un seul plan, tout compris.',
    subtitle:
      'Un Collaborateur IA partagé par toute votre organisation. Pas de coût par membre, pas d’option cachée.',
    price: '49€',
    period: '/ mois',
    highlights: [
      { icon: Infinity, title: 'Profils & compétences illimités', desc: 'Ajoutez autant de savoir-faire métier que nécessaire.' },
      { icon: Users, title: 'Un seul abonnement', desc: 'Partagé par toute votre organisation, sans coût par membre.' },
      { icon: Server, title: 'Serveur IA privé & ressources dédiées', desc: 'Email, agenda, fichiers, contacts et numéro, isolés pour vous.' },
    ],
    includedLabel: 'Également inclus',
    included: [
      '1 Collaborateur IA',
      '10 millions de tokens par mois*',
      '30 min de supervision humaine par mois',
      'Onboarding personnalisé',
      'Accès à tous les modèles IA, dont ChatGPT',
      'Toutes les modalités : texte, image, vidéo, audio, code',
    ],
    cta: 'Recruter mon Collaborateur IA',
    secondary: 'Voir le détail des tarifs',
    note: '7 jours d’essai gratuit, sans carte bancaire.',
    asterisk: '* 10 millions de tokens inclus par mois. Tokens supplémentaires disponibles selon vos besoins.',
  },
  en: {
    eyebrow: 'Pricing',
    title: 'One plan, everything included.',
    subtitle:
      'One AI Collaborator shared across your whole organization. No per-seat cost, no hidden add-ons.',
    price: '€49',
    period: '/ month',
    highlights: [
      { icon: Infinity, title: 'Unlimited profiles & skills', desc: 'Add as much business know-how as you need.' },
      { icon: Users, title: 'One subscription', desc: 'Shared across your whole organization, no per-seat cost.' },
      { icon: Server, title: 'Private AI server & dedicated resources', desc: 'Email, calendar, files, contacts and number, isolated for you.' },
    ],
    includedLabel: 'Also included',
    included: [
      '1 AI Collaborator',
      '10 million tokens per month*',
      '30 min of human supervision per month',
      'Personalized onboarding',
      'Access to every AI model, including ChatGPT',
      'Every modality: text, image, video, audio, code',
    ],
    cta: 'Hire my AI Collaborator',
    secondary: 'See pricing details',
    note: '7-day free trial, no credit card required.',
    asterisk: '* 10 million tokens included per month. Additional tokens available as you need them.',
  },
} as const

export function SectionPricing({ lang }: { lang: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section id="tarifs" className="w-full border-t border-[#E9E2D4] bg-[#F3EFE6] py-24 sm:py-32">
      <div className="editorial-shell">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]">
            {t.subtitle}
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="premium-shadow mx-auto mt-14 max-w-lg overflow-hidden rounded-[2rem] border border-[#E4DCCF] bg-[#FBF9F3]"
        >
          <div className="border-b border-[#E4DCCF] p-8 text-center sm:p-10">
            <div className="flex items-end justify-center gap-1">
              <span className="font-sf text-6xl font-bold tracking-[-0.04em] text-[#1C1A17]">
                {t.price}
              </span>
              <span className="mb-2 text-sm font-medium text-[#6B6560]">{t.period}</span>
            </div>
            <Link
              href="/decouvrir"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-xs text-[#8A8175]">{t.note}</p>
          </div>

          <div className="p-8 sm:p-10">
            {/* 3 bénéfices phares */}
            <ul className="flex flex-col gap-4">
              {t.highlights.map((h) => {
                const Icon = h.icon
                return (
                  <li key={h.title} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D10E63] text-[#FBF9F3]">
                      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-sf text-[15px] font-bold leading-tight text-[#1C1A17]">{h.title}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-[#5F594F]">{h.desc}</p>
                    </div>
                  </li>
                )
              })}
            </ul>

            {/* Le reste, groupé */}
            <div className="mt-7 border-t border-[#E4DCCF] pt-6">
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">
                {t.includedLabel}
              </p>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {t.included.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-snug text-[#3F3A33]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D10E63]" strokeWidth={2.5} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-[#8A8175]">
              {t.asterisk}
            </p>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            href="/tarifs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4E483F] underline-offset-4 transition-colors hover:text-[#D10E63] hover:underline"
          >
            {t.secondary}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
