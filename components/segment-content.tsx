'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

export type SegmentKey = 'solo' | 'teams' | 'business'

type Block = {
  eyebrow: string
  title1: string
  title2: string
  subtitle: string
  painTitle: string
  pain: string[]
  featuresTitle: string
  features: { name: string; desc: string }[]
  price: string
  period: string
  ctaLabel: string
  ctaHref: string
  secondaryLabel: string
  secondaryHref: string
}

const ICONS: ReactNode[] = [
  <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
  <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg key="4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  <svg key="5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
]

const DATA: Record<SegmentKey, { fr: Block; en: Block }> = {
  solo: {
    fr: {
      eyebrow: 'Solo',
      title1: 'Vous êtes seul aux commandes. ',
      title2: 'Plus pour longtemps.',
      subtitle:
        'Indépendant, freelance, dirigeant solo : votre agent Unitalk devient votre premier collaborateur. Il répond, relance, organise et exécute — pendant que vous vous concentrez sur votre métier.',
      painTitle: 'Ce qui vous ralentit aujourd’hui',
      pain: [
        'Vous répondez aux mêmes messages toute la journée.',
        'Les relances et devis attendent faute de temps.',
        'Vous jonglez entre dix outils sans jamais souffler.',
      ],
      featuresTitle: 'Ce que votre agent prend en charge',
      features: [
        { name: 'Répond à votre place', desc: 'Appels, emails et messages traités avec sa propre voix et son adresse.' },
        { name: 'Relance et suit', desc: 'Devis, factures et prospects relancés automatiquement, sans oubli.' },
        { name: 'Organise vos journées', desc: 'Agenda, rendez-vous et priorités tenus à jour en continu.' },
        { name: 'Travaille dans vos outils', desc: 'Connecté à vos emails, votre agenda et 3 000+ apps.' },
      ],
      price: '30€',
      period: '/ mois / agent',
      ctaLabel: 'Créer mon agent gratuitement',
      ctaHref: '/decouvrir',
      secondaryLabel: 'Voir le détail du tarif',
      secondaryHref: '/tarifs',
    },
    en: {
      eyebrow: 'Solo',
      title1: 'You’re running it all alone. ',
      title2: 'Not for long.',
      subtitle:
        'Freelancer, independent, solo founder: your Unitalk agent becomes your first teammate. It answers, follows up, organizes and executes — while you focus on your craft.',
      painTitle: 'What’s slowing you down today',
      pain: [
        'You answer the same messages all day long.',
        'Follow-ups and quotes wait because you’re out of time.',
        'You juggle ten tools without ever catching a break.',
      ],
      featuresTitle: 'What your agent takes over',
      features: [
        { name: 'Answers for you', desc: 'Calls, emails and messages handled with its own voice and address.' },
        { name: 'Follows up and tracks', desc: 'Quotes, invoices and leads chased automatically, never forgotten.' },
        { name: 'Organizes your days', desc: 'Calendar, meetings and priorities kept up to date continuously.' },
        { name: 'Works in your tools', desc: 'Connected to your email, your calendar and 3,000+ apps.' },
      ],
      price: '€30',
      period: '/ month / agent',
      ctaLabel: 'Create my agent for free',
      ctaHref: '/decouvrir',
      secondaryLabel: 'See pricing details',
      secondaryHref: '/tarifs',
    },
  },
  teams: {
    fr: {
      eyebrow: 'Teams',
      title1: 'Un agent par personne. ',
      title2: 'Une équipe qui double.',
      subtitle:
        'Donnez à chaque collaborateur son propre agent, avec un contexte d’entreprise partagé. Vos process, vos données et votre savoir-faire circulent — sans jamais se perdre.',
      painTitle: 'Ce qui freine votre équipe',
      pain: [
        'Le savoir reste bloqué dans la tête de quelques personnes.',
        'Chaque nouvel arrivant met des semaines à être opérationnel.',
        'Les tâches répétitives grignotent le temps de toute l’équipe.',
      ],
      featuresTitle: 'Ce que vous gagnez en équipe',
      features: [
        { name: 'Un agent par membre', desc: 'Chacun garde son bras droit, avec son rôle et ses permissions.' },
        { name: 'Mémoire mutualisée', desc: 'Les agents partagent une base de connaissances commune.' },
        { name: 'Process partagés', desc: 'Vos méthodes de travail diffusées à tous les agents d’un coup.' },
        { name: 'Tableau de bord d’équipe', desc: 'Suivez l’activité et la facturation depuis un seul endroit.' },
      ],
      price: '49€',
      period: '/ agent / mois',
      ctaLabel: 'Équiper mon équipe',
      ctaHref: '/decouvrir',
      secondaryLabel: 'Voir le détail du tarif',
      secondaryHref: '/tarifs',
    },
    en: {
      eyebrow: 'Teams',
      title1: 'One agent per person. ',
      title2: 'A team that doubles.',
      subtitle:
        'Give every colleague their own agent, with a shared company context. Your processes, your data and your know-how flow — without ever getting lost.',
      painTitle: 'What holds your team back',
      pain: [
        'Knowledge stays locked in a few people’s heads.',
        'Every new hire takes weeks to become operational.',
        'Repetitive tasks eat away at the whole team’s time.',
      ],
      featuresTitle: 'What you gain as a team',
      features: [
        { name: 'One agent per member', desc: 'Everyone keeps their right hand, with roles and permissions.' },
        { name: 'Shared memory', desc: 'Agents draw from a common company knowledge base.' },
        { name: 'Shared processes', desc: 'Your working methods pushed to every agent at once.' },
        { name: 'Team dashboard', desc: 'Track activity and billing from a single place.' },
      ],
      price: '€49',
      period: '/ agent / month',
      ctaLabel: 'Equip my team',
      ctaHref: '/decouvrir',
      secondaryLabel: 'See pricing details',
      secondaryHref: '/tarifs',
    },
  },
  business: {
    fr: {
      eyebrow: 'Business',
      title1: 'Votre infrastructure IA. ',
      title2: 'Souveraine et sous contrôle.',
      subtitle:
        'Pour les organisations exigeantes : une infrastructure IA privée et dédiée, hébergée où vous le décidez, avec la sécurité, la conformité et l’accompagnement humain qui vont avec.',
      painTitle: 'Vos enjeux à grande échelle',
      pain: [
        'Vos données sensibles ne peuvent pas quitter votre périmètre.',
        'Vous avez des exigences de conformité et de traçabilité fortes.',
        'Vous avez besoin d’intégrations métier et d’un vrai support.',
      ],
      featuresTitle: 'Ce que nous mettons en place',
      features: [
        { name: 'Infrastructure privée', desc: 'IA dédiée, hébergement souverain ou on-premise.' },
        { name: 'Sécurité avancée', desc: 'SSO, SCIM, journalisation et conformité renforcées.' },
        { name: 'Onboarding humain', desc: 'Nos ingénieurs déploient et forment vos équipes.' },
        { name: 'Support & SLA dédiés', desc: 'Un interlocuteur technique attitré, des garanties claires.' },
      ],
      price: 'Sur devis',
      period: 'infrastructure privée',
      ctaLabel: 'Parler à un expert',
      ctaHref: '/decouvrir',
      secondaryLabel: 'Voir le détail du tarif',
      secondaryHref: '/tarifs',
    },
    en: {
      eyebrow: 'Business',
      title1: 'Your AI infrastructure. ',
      title2: 'Sovereign and in control.',
      subtitle:
        'For demanding organizations: a private, dedicated AI infrastructure, hosted where you decide, with the security, compliance and human support that come with it.',
      painTitle: 'Your challenges at scale',
      pain: [
        'Your sensitive data can’t leave your perimeter.',
        'You have strong compliance and traceability requirements.',
        'You need business integrations and real support.',
      ],
      featuresTitle: 'What we put in place',
      features: [
        { name: 'Private infrastructure', desc: 'Dedicated AI, sovereign or on-premise hosting.' },
        { name: 'Advanced security', desc: 'SSO, SCIM, enhanced logging and compliance.' },
        { name: 'Human onboarding', desc: 'Our engineers deploy and train your teams.' },
        { name: 'Dedicated support & SLA', desc: 'An assigned technical contact, clear guarantees.' },
      ],
      price: 'Custom quote',
      period: 'private infrastructure',
      ctaLabel: 'Talk to an expert',
      ctaHref: '/decouvrir',
      secondaryLabel: 'See pricing details',
      secondaryHref: '/tarifs',
    },
  },
}

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
)

export function SegmentContent({ segment }: { segment: SegmentKey }) {
  const { lang } = useLanguage()
  const t = DATA[segment][lang]

  return (
    <main className="w-full bg-[#F3EFE6]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-grid pt-28 sm:pt-32 pb-10 sm:pb-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">{t.eyebrow}</p>
          <h1
            className="mt-3 max-w-3xl font-sf text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-[#1C1A17] text-balance"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.title1}<span className="text-[#D10E63]">{t.title2}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#4E483F]">{t.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={t.ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
            >
              {t.ctaLabel}
              <ArrowIcon />
            </a>
            <span className="text-sm text-[#857C6E]">
              <span className="font-semibold text-[#1C1A17]">{t.price}</span> {t.period}
            </span>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="rounded-3xl border border-[#DcD4C4] bg-[#FBF9F3] p-6 sm:p-10">
          <h2 className="font-sf text-xl sm:text-2xl font-bold text-[#1C1A17]" style={{ letterSpacing: '-0.02em' }}>
            {t.painTitle}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {t.pain.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-[#4E483F]">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#D10E63]" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
        <h2 className="font-sf text-2xl sm:text-3xl font-bold text-[#1C1A17] text-balance" style={{ letterSpacing: '-0.02em' }}>
          {t.featuresTitle}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {t.features.map((f, i) => (
            <motion.article
              key={f.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
              className="flex items-start gap-4 rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3] p-6"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#D10E63]/10 text-[#D10E63]">
                {ICONS[i % ICONS.length]}
              </span>
              <div>
                <h3 className="font-sf text-base font-bold text-[#1C1A17]">{f.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#4E483F]">{f.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl bg-[#1C1A17] px-6 py-12 sm:px-12 sm:py-16 text-center">
          <h2
            className="font-sf text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.1] text-[#FBF9F3] text-balance"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t.title1}<span className="text-[#FF6FB0]">{t.title2}</span>
          </h2>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={t.ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
            >
              {t.ctaLabel}
              <ArrowIcon />
            </a>
            <a
              href={t.secondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-[#4E483F] px-6 py-3 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#2A2721]"
            >
              {t.secondaryLabel}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
