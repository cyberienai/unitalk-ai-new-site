'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

type Plan = {
  name: string
  price: string
  period: string
  tagline: string
  cta: string
  href: string
  highlight?: boolean
  features: string[]
}

const T = {
  fr: {
    eyebrow: 'Tarif',
    title1: 'Un prix clair. ',
    title2: 'Zéro surprise.',
    subtitle:
      'Commencez gratuitement, sans carte bancaire. Vous ne payez en plus que ce que vous consommez, et vous résiliez quand vous voulez.',
    mostChosen: 'Le plus choisi',
    reassurePre: 'Gratuit pour démarrer · sans carte bancaire · résiliable à tout moment · ',
    reassureLink: 'version Desktop open source',
    plans: [
      {
        name: 'Executive', price: '29€', period: '/ mois / agent',
        tagline: 'Un agent sur mesure pour vous lancer, façonné en un appel avec Alma.',
        cta: 'Créer mon agent', href: '/signup',
        features: ['1 agent sur mesure, 10 profils inclus', 'Adresse email, numéro, agenda et contacts dédiés', 'Propulsé par Hermes, notre moteur open source', 'Accès aux meilleurs modèles d\'IA', 'BYOK ou crédits IA prépayés', 'Multimodal : voix, texte, image, audio, code', 'Mémoire d\'entreprise persistante', 'Connexion à 3 000+ apps via MCP', 'Accompagnement par Alma'],
      },
      {
        name: 'Team', price: '49€', period: '/ agent / mois',
        tagline: 'Un agent par collaborateur, un espace partagé et une mémoire commune.',
        cta: 'Équiper mon équipe', href: '/signup', highlight: true,
        features: ['Tout le plan Executive, pour chaque membre', 'Espace collaboratif partagé', 'Mémoire d’entreprise mutualisée entre agents', 'Alma interviewe chaque collaborateur', 'Rôles et permissions par agent', 'Compétences et process partagés', 'Tableau de bord d’équipe', 'Facturation centralisée', 'Support prioritaire'],
      },
      {
        name: 'Business', price: 'Sur devis', period: 'infrastructure privée',
        tagline: 'Votre propre infrastructure IA, souveraine et sous votre contrôle.',
        cta: 'Parler à un expert', href: '/signup',
        features: ['Tout le plan Team, sans limite', 'Infrastructure IA privée et dédiée', 'Hébergement souverain ou on-premise', 'SSO, SCIM et gestion avancée des accès', 'Journalisation et conformité renforcées', 'Onboarding humain par nos ingénieurs', 'Accompagnement et SLA dédiés', 'Intégrations métier sur mesure', 'Interlocuteur technique attitré'],
      },
    ] as Plan[],
  },
  en: {
    eyebrow: 'Pricing',
    title1: 'A clear price. ',
    title2: 'Zero surprises.',
    subtitle:
      'Start for free, no credit card. You only pay extra for what you use, and you cancel whenever you want.',
    mostChosen: 'Most popular',
    reassurePre: 'Free to start · no credit card · cancel anytime · ',
    reassureLink: 'open-source Desktop version',
    plans: [
      {
        name: 'Executive', price: '€29', period: '/ month / agent',
        tagline: 'A custom agent to get you started, crafted in a single call with Alma.',
        cta: 'Create my agent', href: '/signup',
        features: ['1 custom agent, 10 profiles included', 'Dedicated email, number, calendar and contacts', 'Powered by Hermes, our open-source engine', 'Access to the best AI models', 'BYOK or prepaid AI credits', 'Multimodal: voice, text, image, audio, code', 'Persistent company memory', 'Connection to 3,000+ apps via MCP', 'Support from Alma'],
      },
      {
        name: 'Team', price: '€49', period: '/ agent / month',
        tagline: 'One agent per colleague, a shared workspace and a common memory.',
        cta: 'Equip my team', href: '/signup', highlight: true,
        features: ['Everything in Executive, for each member', 'Shared collaborative workspace', 'Company memory pooled across agents', 'Alma interviews each colleague', 'Roles and permissions per agent', 'Shared skills and processes', 'Team dashboard', 'Centralized billing', 'Priority support'],
      },
      {
        name: 'Business', price: 'Custom quote', period: 'private infrastructure',
        tagline: 'Your own AI infrastructure, sovereign and under your control.',
        cta: 'Talk to an expert', href: '/signup',
        features: ['Everything in Team, with no limits', 'Private, dedicated AI infrastructure', 'Sovereign or on-premise hosting', 'SSO, SCIM and advanced access management', 'Enhanced logging and compliance', 'Human onboarding by our engineers', 'Dedicated support and SLA', 'Custom business integrations', 'Assigned technical contact'],
      },
    ] as Plan[],
  },
}

export function TarifsContent() {
  const { lang } = useLanguage()
  const t = T[lang]
  const PLANS = t.plans
  return (
    <main className="w-full bg-[#F3EFE6]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-grid pt-28 sm:pt-32 pb-10 sm:pb-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">{t.eyebrow}</p>
          <h1
            className="mt-3 font-sf text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-[#1C1A17] text-balance"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.title1}<span className="text-[#D10E63]">{t.title2}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#4E483F]">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`flex flex-col rounded-3xl border p-7 sm:p-8 ${
                plan.highlight
                  ? 'border-[#D10E63] bg-[#FBF9F3] shadow-[0_12px_40px_rgba(209,14,99,0.12)]'
                  : 'border-[#DcD4C4] bg-[#FBF9F3]'
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-sf text-2xl font-bold text-[#1C1A17]" style={{ letterSpacing: '-0.02em' }}>
                  {plan.name}
                </h2>
                {plan.highlight && (
                  <span className="rounded-full bg-[#D10E63] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#FBF9F3]">
                    {t.mostChosen}
                  </span>
                )}
              </div>

              <p className="mt-2 min-h-[2.5rem] text-sm leading-relaxed text-[#4E483F]">{plan.tagline}</p>

              <div className="mt-5 flex items-baseline gap-1.5 border-t border-[#DcD4C4] pt-5">
                <span
                  className="font-sf text-4xl font-bold text-[#1C1A17] whitespace-nowrap"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {plan.price}
                </span>
                <span className="text-sm text-[#857C6E]">{plan.period}</span>
              </div>

              <a
                href={plan.href}
                className={`mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-5 py-3.5 text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? 'bg-[#D10E63] text-[#FBF9F3] hover:bg-[#B00B52]'
                    : 'border border-[#1C1A17] text-[#1C1A17] hover:bg-[#1C1A17] hover:text-[#FBF9F3]'
                }`}
              >
                {plan.cta}
              </a>

              <ul className="mt-7 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#3A362F]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mt-0.5 flex-shrink-0 text-[#D10E63]"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Reassurance line */}
        <p className="mt-10 text-center text-sm text-[#857C6E]">
          {t.reassurePre}
          <a href="/agent-ia-public" className="font-medium text-[#D10E63] underline-offset-4 hover:underline">
            {t.reassureLink}
          </a>
        </p>
      </section>
    </main>
  )
}
