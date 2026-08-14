'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight, Infinity, Users, Server } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Tarifs transparents',
    title: 'Recrutez du temps de travail, pas un énième SaaS.',
    subtitle:
      'C’est incomparablement moins cher qu’un humain, mais structuré exactement de la même façon dans votre plan de charge RH. Choisissez le temps de travail adapté à chaque Collaborateur IA.',
    pricingTitle: 'Plans de temps de travail',
    plans: [
      {
        price: '49€',
        period: '/ mois',
        name: 'Quart-temps',
        desc: 'Idéal pour automatiser vos petites tâches régulières, votre veille et la mise à jour de vos données.',
        features: ['1 Collaborateur IA', '1 million de tokens inclus / mois', 'Onboarding standard', 'Support email'],
      },
      {
        price: '99€',
        period: '/ mois',
        name: 'Mi-temps',
        desc: 'Prise en charge active et quotidienne de vos processus métier (gestion d’agenda, tri d’emails).',
        features: ['1 Collaborateur IA', '5 millions de tokens inclus / mois', 'Onboarding personnalisé', 'Support prioritaire'],
        featured: true,
      },
      {
        price: '199€',
        period: '/ mois',
        name: 'Temps plein',
        desc: 'Un collaborateur dédié à 100%, autonome 24/7, prêt à piloter des flux complexes pour votre équipe.',
        features: ['1 Collaborateur IA', '12 millions de tokens inclus / mois', 'Onboarding sur-mesure', 'Supervision AgentOps (30m)'],
      },
    ],
    highlightsLabel: 'Inclus dans tous les plans',
    highlights: [
      { icon: Infinity, title: 'Profils & compétences illimités', desc: 'Ajoutez autant de savoir-faire métier que nécessaire.' },
      { icon: Users, title: 'Un seul abonnement d’équipe', desc: 'Partagé par toute votre organisation, sans coût par membre.' },
      { icon: Server, title: 'Serveur IA privé & ressources dédiées', desc: 'Email, agenda, fichiers, contacts et numéro, isolés pour vous.' },
    ],
    cta: 'Commencer l’essai gratuit',
    secondary: 'Simuler une configuration sur-mesure',
    note: '7 jours d’essai gratuit, sans carte bancaire.',
  },
  en: {
    eyebrow: 'Transparent Pricing',
    title: 'Hire working hours, not another SaaS.',
    subtitle:
      'It is incomparably cheaper than a human, but structured in exactly the same way in your HR planning. Choose the working hours tailored to each AI Collaborator.',
    pricingTitle: 'Working hour plans',
    plans: [
      {
        price: '€49',
        period: '/ month',
        name: 'Part-time (1/4)',
        desc: 'Ideal for automating small recurring tasks, monitoring, and updating your data.',
        features: ['1 AI Collaborator', '1 million tokens included / mo', 'Standard onboarding', 'Email support'],
      },
      {
        price: '€99',
        period: '/ month',
        name: 'Half-time (1/2)',
        desc: 'Active daily support for your business processes (calendar management, email sorting).',
        features: ['1 AI Collaborator', '5 million tokens included / mo', 'Personalized onboarding', 'Priority support'],
        featured: true,
      },
      {
        price: '€199',
        period: '/ month',
        name: 'Full-time (1/1)',
        desc: 'A 100% dedicated collaborator, autonomous 24/7, ready to run complex workflows for your team.',
        features: ['1 AI Collaborator', '12 million tokens included / mo', 'Bespoke onboarding', 'AgentOps supervision (30m)'],
      },
    ],
    highlightsLabel: 'Included in all plans',
    highlights: [
      { icon: Infinity, title: 'Unlimited profiles & skills', desc: 'Add as much business know-how as you need.' },
      { icon: Users, title: 'One team subscription', desc: 'Shared across your whole organization, no per-seat cost.' },
      { icon: Server, title: 'Private AI server & dedicated resources', desc: 'Email, calendar, files, contacts and number, isolated for you.' },
    ],
    cta: 'Start free trial',
    secondary: 'Simulate a custom configuration',
    note: '7-day free trial, no credit card required.',
  },
} as const

export function SectionPricing({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduce = useReducedMotion()

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, delay: reduce ? 0 : delay, ease },
  })

  return (
    <section id="tarifs" className="w-full border-t border-[#E9E2D4] bg-[#F3EFE6] py-16 sm:py-24">
      <div className="editorial-shell">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#5F594F] md:text-lg">
            {t.subtitle}
          </p>
        </header>

        {/* 3 cards side-by-side or stacked on mobile */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-1 md:grid-cols-3">
          {t.plans.map((plan, index) => {
            const isFeatured = 'featured' in plan && plan.featured
            return (
              <motion.div
                key={plan.name}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: reduce ? 0 : index * 0.1, ease }}
                className={`relative flex flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-300 sm:p-8 ${
                  isFeatured
                    ? 'border-[#D10E63] bg-[#17130F] text-[#F8F1E7] shadow-[0_20px_48px_rgba(209,14,99,0.15)] md:-translate-y-2'
                    : 'border-[#E4DCCF] bg-[#FBF9F3] text-[#1C1A17]'
                }`}
              >
                {isFeatured && (
                  <div className="absolute right-4 top-4 rounded-full bg-[#D10E63] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
                    Recommandé
                  </div>
                )}
                
                <h3 className="font-sf text-xl font-bold tracking-[-0.02em]">{plan.name}</h3>
                <p className={`mt-2 text-xs leading-relaxed ${isFeatured ? 'text-[#C9C0B0]' : 'text-[#6B6560]'}`}>
                  {plan.desc}
                </p>

                <div className="mt-5 flex items-end gap-1">
                  <span className="font-sf text-4xl font-bold tracking-[-0.04em]">
                    {plan.price}
                  </span>
                  <span className={`mb-1 text-xs font-medium ${isFeatured ? 'text-[#8F877A]' : 'text-[#6B6560]'}`}>
                    {plan.period}
                  </span>
                </div>

                <Link
                  href="/decouvrir"
                  className={`mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full text-xs font-bold transition-transform hover:-translate-y-0.5 ${
                    isFeatured
                      ? 'bg-[#D10E63] text-white shadow-[0_12px_24px_-10px_rgba(209,14,99,0.5)]'
                      : 'bg-[#D10E63]/10 text-[#D10E63] hover:bg-[#D10E63] hover:text-white'
                  }`}
                >
                  {t.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <p className={`mt-2 text-center text-[10px] ${isFeatured ? 'text-[#8F877A]' : 'text-[#6B6560]'}`}>
                  {t.note}
                </p>

                {/* Features included */}
                <ul className="mt-6 space-y-2.5 border-t border-[#DED6C8]/30 pt-5 text-xs">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 leading-snug">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#22C55E]" strokeWidth={2.5} />
                      <span className={isFeatured ? 'text-[#E8E1D0]' : 'text-[#3F3A33]'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Global Value Highlights (Row below cards) */}
        <div className="mx-auto mt-16 max-w-5xl border-t border-[#DED6C8] pt-12">
          <p className="mb-6 text-center font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">
            {t.highlightsLabel}
          </p>
          <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            {t.highlights.map((h) => {
              const Icon = h.icon
              return (
                <li key={h.title} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D10E63]/10 text-[#D10E63]">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h4 className="font-sf text-[14px] font-bold text-[#1C1A17]">{h.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#5F594F]">{h.desc}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mt-12 text-center">
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
