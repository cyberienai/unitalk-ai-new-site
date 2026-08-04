'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Infinity, Users, Server } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { COLLABORATOR_TIERS, CONSUMPTION_MODES } from '@/lib/pricing'
import { SectionWorkstation } from './home/section-workstation'

const ease = [0.22, 1, 0.36, 1] as const

const HIGHLIGHT_ICONS = { infinity: Infinity, users: Users, server: Server } as const

const T = {
  fr: {
    eyebrow: 'Tarif',
    title1: 'Un seul plan. ',
    title2: 'Tout compris.',
    subtitle:
      'Un Collaborateur IA partagé par toute votre organisation. Pas de coût par membre, pas d’option cachée. Essai gratuit de 7 jours, sans carte bancaire.',
    price: '49€',
    period: '/ mois',
    planName: 'Le plan Unitalk',
    highlights: [
      { icon: 'infinity', title: 'Profils & compétences illimités', desc: 'Ajoutez autant de savoir-faire métier que nécessaire.' },
      { icon: 'users', title: 'Un seul abonnement', desc: 'Partagé par toute votre organisation, sans coût par membre.' },
      { icon: 'server', title: 'Serveur IA privé & ressources dédiées', desc: 'Email, agenda, fichiers, contacts et numéro, isolés pour vous.' },
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
    asterisk: '* 10 millions de tokens inclus par mois. Tokens supplémentaires disponibles selon vos besoins.',
    cta: 'Recruter mon Collaborateur IA',
    orderCta: 'Composer ma commande',
    tiersEyebrow: 'Plusieurs Collaborateurs IA',
    tiersTitle: 'Un tarif dégressif dès le deuxième',
    tiersSubtitle:
      'Le premier Collaborateur IA est à 49€. Chaque Collaborateur IA supplémentaire coûte moins cher, toujours dans un seul abonnement pour toute l’organisation.',
    tierUnitSuffix: '€ / mois par Collaborateur IA',
    tierQuote: 'Sur devis',
    modesEyebrow: 'Consommation',
    modesTitle: 'Choisissez comment payer l’usage',
    modesSubtitle: 'Abonnement tout inclus, crédits à l’usage ou vos propres clés API. Vous changez d’avis quand vous voulez.',
    reassure: 'Gratuit pour démarrer · sans carte bancaire · résiliable à tout moment.',
    exampleNote: 'Tarifs indicatifs, susceptibles d’évoluer.',
  },
  en: {
    eyebrow: 'Pricing',
    title1: 'One plan. ',
    title2: 'Everything included.',
    subtitle:
      'One AI Collaborator shared across your whole organization. No per-seat cost, no hidden add-ons. 7-day free trial, no credit card.',
    price: '€49',
    period: '/ month',
    planName: 'The Unitalk plan',
    highlights: [
      { icon: 'infinity', title: 'Unlimited profiles & skills', desc: 'Add as much business know-how as you need.' },
      { icon: 'users', title: 'One subscription', desc: 'Shared across your whole organization, no per-seat cost.' },
      { icon: 'server', title: 'Private AI server & dedicated resources', desc: 'Email, calendar, files, contacts and number, isolated for you.' },
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
    asterisk: '* 10 million tokens included per month. Additional tokens available as you need them.',
    cta: 'Hire my AI Collaborator',
    orderCta: 'Build my order',
    tiersEyebrow: 'Several AI Collaborators',
    tiersTitle: 'A degressive price from the second one',
    tiersSubtitle:
      'The first AI Collaborator is €49. Each additional AI Collaborator costs less, still within one subscription for the whole organization.',
    tierUnitSuffix: '€ / month per AI Collaborator',
    tierQuote: 'Custom quote',
    modesEyebrow: 'Consumption',
    modesTitle: 'Choose how you pay for usage',
    modesSubtitle: 'All-inclusive subscription, pay-as-you-go credits, or your own API keys. Change your mind whenever you want.',
    reassure: 'Free to start · no credit card · cancel anytime.',
    exampleNote: 'Indicative pricing, subject to change.',
  },
}

export function TarifsContent() {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <main className="w-full bg-[#F3EFE6]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-grid pt-28 pb-10 sm:pt-32 sm:pb-14">
        <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">{t.eyebrow}</p>
          <h1
            className="mt-3 text-balance font-sf text-4xl font-bold leading-[1.05] text-[#1C1A17] sm:text-5xl md:text-6xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.title1}
            <span className="text-[#D10E63]">{t.title2}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#4E483F] sm:text-lg">{t.subtitle}</p>
        </div>
      </section>

      {/* Plan unique */}
      <section className="mx-auto w-full max-w-lg px-4 pb-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="premium-shadow overflow-hidden rounded-[2rem] border border-[#D8D0C2] bg-[#FBF9F3]"
        >
          <div className="border-b border-[#E4DCCF] p-8 text-center sm:p-10">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A8175]">{t.planName}</p>
            <div className="mt-3 flex items-end justify-center gap-1">
              <span className="font-sf text-6xl font-bold tracking-[-0.04em] text-[#1C1A17]">{t.price}</span>
              <span className="mb-2 text-sm font-medium text-[#6B6560]">{t.period}</span>
            </div>
            <Link
              href="/decouvrir"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="p-8 sm:p-10">
            {/* 3 bénéfices phares */}
            <ul className="flex flex-col gap-4">
              {t.highlights.map((h) => {
                const Icon = HIGHLIGHT_ICONS[h.icon as keyof typeof HIGHLIGHT_ICONS]
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

            <p className="mt-6 border-t border-[#E4DCCF] pt-4 text-xs leading-relaxed text-[#8A8175]">{t.asterisk}</p>
          </div>
        </motion.div>
      </section>

      {/* Dégressif */}
      <section className="mx-auto w-full max-w-lg px-4 py-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3] p-6 sm:p-8"
        >
          <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">
            {t.tiersEyebrow}
          </p>
          <h2 className="mt-2 text-balance text-center font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">
            {t.tiersTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-pretty text-center text-sm leading-relaxed text-[#5F594F]">
            {t.tiersSubtitle}
          </p>
          <ul className="mt-6 flex flex-col divide-y divide-[#E4DCCF]">
            {COLLABORATOR_TIERS.map((tier) => (
              <li key={tier.min} className="flex items-center justify-between gap-4 py-3">
                <span className="text-sm font-semibold text-[#3F3A33]">{tier.label[lang]}</span>
                <span className="text-right text-sm font-bold text-[#1C1A17]">
                  {tier.unit === null ? (
                    <span className="text-[#D10E63]">{t.tierQuote}</span>
                  ) : (
                    <>
                      {tier.unit}
                      <span className="ml-1 text-xs font-medium text-[#8A8175]">{t.tierUnitSuffix}</span>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/commande"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#D10E63] px-6 text-sm font-bold text-[#D10E63] transition-colors hover:bg-[#D10E63] hover:text-[#FBF9F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
          >
            {t.orderCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* Modes de consommation */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.modesEyebrow}</p>
          <h2 className="mt-2 text-balance font-sf text-2xl font-bold tracking-[-0.025em] text-[#1C1A17] sm:text-3xl">
            {t.modesTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]">{t.modesSubtitle}</p>
        </header>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {CONSUMPTION_MODES.map((mode, i) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className={`flex flex-col rounded-3xl border p-7 sm:p-8 ${
                mode.id === 'subscription'
                  ? 'border-[#D10E63] bg-[#FBF9F3] shadow-[0_12px_40px_rgba(209,14,99,0.12)]'
                  : 'border-[#DcD4C4] bg-[#FBF9F3]'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{mode.name[lang]}</h3>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                    mode.id === 'subscription' ? 'bg-[#D10E63] text-[#FBF9F3]' : 'bg-[#EFE9DC] text-[#6B6560]'
                  }`}
                >
                  {mode.tagline[lang]}
                </span>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[#4E483F]">{mode.description[lang]}</p>
              <p className="mt-6 border-t border-[#E4DCCF] pt-4 font-sf text-lg font-bold text-[#1C1A17]">
                {mode.priceLabel[lang]}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-[#857C6E]">{t.reassure}</p>
        <p className="mt-2 text-center text-xs text-[#A79E8E]">{t.exampleNote}</p>
      </section>

      {/* Ce que votre Collaborateur IA obtient — son propre poste de travail */}
      <SectionWorkstation lang={lang} />
    </main>
  )
}
