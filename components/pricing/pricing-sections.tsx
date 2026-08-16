'use client'

import { Check } from 'lucide-react'
import { PricingConfigurator } from './pricing-configurator'
import { useLanguage } from '@/lib/language-context'

const T = {
  fr: {
    title: 'Un compte. Une facture. Toute votre entreprise.',
    subtitle:
      'Un compte professionnel réunit tous vos Collaborateurs, humains et IA. Les crédits prépayés sont partagés et mutualisés, les dernières versions des modèles restent accessibles, et votre entreprise choisit les capacités adaptées à chaque modalité de travail.',
    trial: '7 jours gratuits. Sans CB.',
    plansTitle: 'Le prix tient en trois lignes.',
    plansLead:
      "L'Entreprise se paie une fois. L'Agent Hermes et sa capacité se paient pour chaque Collaborateur IA.",
    plans: [
      {
        name: 'Entreprise',
        price: '50€',
        period: ' / entreprise',
        desc: 'Alma, Workspace, Desktop, gouvernance, Stores et AI Gateway.',
        features: ['Une seule fois', 'Membres humains illimités', 'Offerte pendant le lancement'],
      },
      {
        name: 'Agent Hermes',
        price: '49€',
        period: ' / Collaborateur',
        desc: "L'identité, l'environnement de travail et les profils métier de votre Collaborateur IA.",
        features: ['Une identité professionnelle', 'Profils métier illimités', 'Outils et droits propres'],
      },
      {
        name: 'Capacité IA',
        price: '0–100€',
        period: ' / Agent',
        desc: 'Vos clés API ou 5, 10 ou 20 millions de tokens par mois.',
        features: ['BYOK à 0 €', 'Ajustable à tout moment', 'Crédits ponctuels disponibles'],
      },
    ],
  },
  en: {
    title: 'One account. One invoice. Your entire company.',
    subtitle:
      'One professional account brings together every human and AI Collaborator. Prepaid credits are shared and pooled, the latest model versions remain available, and your company selects the right capabilities for every work modality.',
    trial: '7 days free. No credit card.',
    plansTitle: 'The price fits in three lines.',
    plansLead:
      'Pay for the Organization once. Pay for the Hermes Agent and its capacity for each AI Collaborator.',
    plans: [
      {
        name: 'Organization',
        price: '€50',
        period: ' / company',
        desc: 'Alma, Workspace, Desktop, governance, Stores and AI Gateway.',
        features: ['Paid once', 'Unlimited human members', 'Free during launch'],
      },
      {
        name: 'Hermes Agent',
        price: '€49',
        period: ' / Collaborator',
        desc: 'The identity, working environment and job profiles of your AI Collaborator.',
        features: ['One professional identity', 'Unlimited job profiles', 'Own tools and permissions'],
      },
      {
        name: 'AI capacity',
        price: '€0–100',
        period: ' / Agent',
        desc: 'Your API keys or 5, 10 or 20 million tokens per month.',
        features: ['BYOK at €0', 'Adjust anytime', 'On-demand credits available'],
      },
    ],
  },
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <section className="relative overflow-hidden pb-10 pt-28 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]"
      />
      <div className="editorial-shell relative">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance font-sf text-[clamp(2.7rem,6vw,5.5rem)] font-semibold leading-[.94] tracking-[-.065em]">
            {t.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-[17px] leading-8 text-[#4E483F]">
            {t.subtitle}
          </p>
          <p className="mt-4 text-sm font-semibold text-[#B00C54]">{t.trial}</p>
        </div>
        <div className="mt-10">
          <PricingConfigurator />
        </div>
      </div>
    </section>
  )
}

export function PricingCollaboration() {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <section className="border-y border-[#DED6C8] bg-[#EAE3D4] py-14">
      <div className="editorial-shell">
        <h2 className="max-w-4xl text-[34px] font-semibold tracking-[-.04em] sm:text-[44px]">
          {t.plansTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-[16px] text-[#4E483F]">{t.plansLead}</p>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {t.plans.map((plan) => (
            <article
              key={plan.name}
              className="flex flex-col justify-between rounded-[22px] border border-[#DED6C8] bg-[#FAF8F3] p-6 text-[#1C1A17]"
            >
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-2xl font-black text-[#D10E63]">
                  {plan.price}
                  <span className="text-xs font-normal text-[#6B6560]">{plan.period}</span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#5A5348]">{plan.desc}</p>
              </div>
              <ul className="mt-6 space-y-2.5 border-t border-[#DED6C8]/40 pt-5 text-xs text-[#3F3A33]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check className="size-4 shrink-0 text-[#22C55E]" /> {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
