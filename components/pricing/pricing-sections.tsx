'use client'

import { Check } from 'lucide-react'
import { PricingConfigurator } from './pricing-configurator'
import { useLanguage } from '@/lib/language-context'

const T = {
  fr: {
    eyebrow: 'Tarifs · Entreprise IA',
    heroAccent: 'Composables. Sans surprise.',
    title: 'Des tarifs clairs pour toute votre entreprise IA.',
    subtitle:
      'Réunissez vos équipes humaines et vos Collaborateurs IA dans un compte unique. Choisissez le nombre de Collaborateurs, leurs ressources et leur capacité d’utilisation des modèles IA. Le total est calculé immédiatement.',
    trial: '7 jours gratuits · Sans carte bancaire',
    proofs: ['Prix calculé immédiatement', 'Hermes gratuit · Licence MIT', 'Configuration ajustable'],
    plansTitle: 'Ce que vous payez. Ce qui reste gratuit.',
    plansLead:
      "Le compte Entreprise IA est facturé une seule fois. Chaque licence Collaborateur IA ajoute une identité et des ressources privées. La capacité IA finance l’utilisation des modèles. Hermes reste gratuit sous licence MIT.",
    plans: [
      {
        name: 'Compte Entreprise IA',
        price: '50€',
        period: ' / entreprise',
        desc: 'Le compte central de votre entreprise pour administrer les humains, les Collaborateurs IA, leurs accès, leurs budgets et leur facturation.',
        features: ['Alma pour préparer les missions', 'Espace commun pour suivre le travail et valider les décisions', 'Catalogues de profils, compétences et applications', 'Modèles IA, budgets et facturation centralisés', 'Membres humains illimités'],
      },
      {
        name: 'Licence Collaborateur IA',
        price: '49€',
        period: ' / Collaborateur',
        desc: "Une identité IA professionnelle et son environnement privé de travail dans votre entreprise.",
        features: ['Identité IA : prénom, avatar et voix', 'Email, calendrier et numéro de téléphone', 'Mémoire IA et historique', 'Applications et modèles IA autorisés', 'Ressources IA, fichiers et serveur IA isolé'],
      },
      {
        name: 'Capacité modèles IA',
        price: '0–100€',
        period: ' / Collaborateur',
        desc: 'Utilisez vos Clés API ou attribuez 5, 10 ou 20 millions de tokens par mois à chaque Collaborateur IA.',
        features: ['Apportez vos propres clés APIs à 0 €', 'Ajoutez des crédits prépayés', 'Ajustable à tout moment'],
      },
      {
        name: 'Hermes open source',
        price: 'Gratuit',
        period: ' · Licence MIT',
        desc: 'Le moteur agentique open source qui permet de planifier, apprendre des savoir-faire et exécuter le travail.',
        features: ['Profils métier et compétences', 'Navigateur, terminal et planification', 'Code source ouvert · Licence MIT', 'Aucun prix de licence Hermes'],
      },
    ],
  },
  en: {
    eyebrow: 'Pricing · AI Company',
    heroAccent: 'Composable. No surprises.',
    title: 'Clear pricing for your entire AI company.',
    subtitle:
      'Bring your human teams and AI Collaborators together under one account. Choose the number of Collaborators, their resources and their AI model capacity. Your total is calculated instantly.',
    trial: '7 days free. No credit card.',
    proofs: ['Instant price calculation', 'Hermes free · MIT License', 'Adjustable configuration'],
    plansTitle: 'What you pay for. What stays free.',
    plansLead:
      'The AI Company account is billed once. Each AI Collaborator License adds a private identity and resources. AI capacity funds model usage. Hermes remains free under the MIT License.',
    plans: [
      {
        name: 'AI Company Account',
        price: '€50',
        period: ' / company',
        desc: 'Your company’s central account for administering people, AI Collaborators, access, budgets and billing.',
        features: ['Alma to prepare missions', 'Shared space to follow work and approve decisions', 'Catalogs of profiles, skills and applications', 'AI models, budgets and centralized billing', 'Unlimited human members'],
      },
      {
        name: 'AI Collaborator License',
        price: '€49',
        period: ' / Collaborator',
        desc: 'A professional AI identity and its private working environment in your company.',
        features: ['AI identity: first name, avatar and voice', 'Email, calendar and phone number', 'AI memory and history', 'Authorized applications and AI models', 'AI resources, files and isolated AI server'],
      },
      {
        name: 'AI Model Capacity',
        price: '€0–100',
        period: ' / Collaborator',
        desc: 'Use your API Keys or assign 5, 10 or 20 million tokens per month to each AI Collaborator.',
        features: ['Bring your own API keys at €0', 'Add prepaid credits', 'Adjust anytime'],
      },
      {
        name: 'Open-source Hermes',
        price: 'Free',
        period: ' · MIT License',
        desc: 'The open-source agentic engine that plans, learns know-how and executes work.',
        features: ['Job profiles and skills', 'Browser, terminal and scheduling', 'Open source code · MIT License', 'No Hermes license fee'],
      },
    ],
  },
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <section className="relative overflow-hidden border-b border-[#D8D0C2] px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]"
      />
      <div className="editorial-shell relative">
        <p className="font-mono text-[10px] font-black uppercase tracking-[.22em] text-[#B00C54]">{t.eyebrow}</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <h1 className="max-w-[900px] text-balance font-sf text-[clamp(2.7rem,5.8vw,5.8rem)] font-semibold leading-[.9] tracking-[-.065em]">
            {t.title}<span className="mt-2 block text-[#D10E63]">{t.heroAccent}</span>
          </h1>
          <div className="lg:pb-3">
            <p className="text-[17px] leading-8 text-[#4E483F]">{t.subtitle}</p>
            <p className="mt-4 text-sm font-bold text-[#B00C54]">{t.trial}</p>
          </div>
        </div>
        <div className="mt-10 grid border-y border-[#CFC5B5] sm:grid-cols-3">
          {t.proofs.map((proof, index) => <p key={proof} className="flex min-h-16 items-center gap-4 border-b border-[#CFC5B5] py-3 text-sm font-bold last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><span className="font-mono text-[9px] text-[#B00C54]">0{index + 1}</span>{proof}</p>)}
        </div>
        <div className="mt-10 scroll-mt-24">
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
    <section className="border-y border-[#DED6C8] bg-[#EAE3D4] px-5 py-20 sm:px-8 sm:py-28">
      <div className="editorial-shell">
        <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{lang === 'fr' ? 'Architecture du prix' : 'Pricing architecture'}</p>
        <h2 className="mt-6 max-w-5xl text-[clamp(2.7rem,6vw,6rem)] font-semibold leading-[.92] tracking-[-.065em]">
          {t.plansTitle}
        </h2>
        <p className="mt-6 max-w-3xl text-[17px] leading-8 text-[#4E483F]">{t.plansLead}</p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-[#CFC5B5] bg-[#CFC5B5] md:grid-cols-2 xl:grid-cols-4">
          {t.plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`flex min-h-[440px] flex-col p-7 ${index === 3 ? 'bg-[#181615] text-white' : index === 1 ? 'bg-[#D10E63] text-white' : 'bg-[#FAF8F3] text-[#1C1A17]'}`}
            >
              <div>
                <p className={`font-mono text-[9px] font-black uppercase tracking-[.18em] ${index === 1 || index === 3 ? 'text-white/65' : 'text-[#B00C54]'}`}>0{index + 1}</p>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-.035em]">{plan.name}</h3>
                <p className={`mt-5 text-[clamp(2.5rem,4vw,4.5rem)] font-semibold leading-none tracking-[-.07em] ${index === 1 || index === 3 ? 'text-white' : 'text-[#D10E63]'}`}>
                  {plan.price}
                  <span className={`block pt-3 text-xs font-semibold tracking-normal ${index === 1 || index === 3 ? 'text-white/65' : 'text-[#6B6560]'}`}>{plan.period}</span>
                </p>
                <p className={`mt-7 text-sm leading-7 ${index === 1 || index === 3 ? 'text-white/75' : 'text-[#5A5348]'}`}>{plan.desc}</p>
              </div>
              <ul className={`mt-auto space-y-3 border-t pt-6 text-xs font-semibold ${index === 1 || index === 3 ? 'border-white/20 text-white/85' : 'border-[#DED6C8] text-[#3F3A33]'}`}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check className={`size-4 shrink-0 ${index === 1 || index === 3 ? 'text-[#F2A4C5]' : 'text-[#D10E63]'}`} /> {feature}
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
