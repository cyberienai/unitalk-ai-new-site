'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

type CategoryKey = 'ventes' | 'support' | 'admin' | 'marketing' | 'finance' | 'rh'

type Agent = {
  name: string
  role: string
  category: CategoryKey
  pitch: string
  skills: string[]
  wink?: string
}

const CATEGORY_COLOR: Record<CategoryKey, string> = {
  ventes: '#D10E63',
  support: '#3E6DA8',
  admin: '#C77A34',
  marketing: '#2E7D4F',
  finance: '#4E483F',
  rh: '#B4361C',
}

const CATEGORY_ORDER: CategoryKey[] = ['ventes', 'support', 'admin', 'marketing', 'finance', 'rh']

const T = {
  fr: {
    eyebrow: 'Cas d’usage',
    title1: 'Dix profils prêts à l’emploi. ',
    title2: 'Un seul agent.',
    subtitle:
      'Chaque profil arrive avec son rôle, ses compétences et ses outils. Activez celui dont vous avez besoin — votre agent change de casquette en un instant, sans jamais perdre la mémoire de votre entreprise.',
    all: 'Tous',
    categoryLabels: {
      ventes: 'Ventes',
      support: 'Support',
      admin: 'Administratif',
      marketing: 'Marketing',
      finance: 'Finance',
      rh: 'RH',
    } as Record<CategoryKey, string>,
    activate: 'Activer ce profil',
    ctaTitle1: 'Vous ne trouvez pas le bon profil ? ',
    ctaTitle2: 'Alma le crée.',
    ctaDesc:
      'Donnez votre nom de domaine, Alma vous appelle et façonne un agent sur mesure pour votre métier — même si votre besoin sort des sentiers battus.',
    ctaBtn: 'Créer mon agent gratuitement',
    agents: [
      { name: 'Patrick', role: 'Commercial', category: 'ventes', pitch: 'Prospecte, relance les devis en attente et prépare vos rendez-vous.', skills: ['Relances', 'Devis', 'CRM'], wink: 'On n’attend plus Patrick — lui, il est déjà au boulot.' },
      { name: 'Sofia', role: 'Customer Success', category: 'support', pitch: 'Accueille vos clients, répond aux questions et suit la satisfaction.', skills: ['Onboarding', 'Support', 'Suivi'] },
      { name: 'Camille', role: 'Assistante de direction', category: 'admin', pitch: 'Gère votre agenda, trie vos emails et organise vos journées.', skills: ['Agenda', 'Emails', 'Organisation'] },
      { name: 'Louis', role: 'Support client', category: 'support', pitch: 'Traite les tickets, répond aux FAQ et escalade ce qui compte.', skills: ['Tickets', 'FAQ', 'SAV'] },
      { name: 'Nina', role: 'Marketing', category: 'marketing', pitch: 'Rédige vos contenus, planifie vos publications et suit vos campagnes.', skills: ['Contenus', 'Réseaux', 'Campagnes'] },
      { name: 'Hugo', role: 'Comptabilité', category: 'finance', pitch: 'Émet les factures, relance les impayés et suit votre trésorerie.', skills: ['Factures', 'Relances', 'Suivi'] },
      { name: 'Sarah', role: 'Ressources humaines', category: 'rh', pitch: 'Prépare une première lecture selon les critères validés et transmet la décision aux personnes autorisées.', skills: ['Recrutement', 'Onboarding', 'RH'] },
      { name: 'Théo', role: 'Accueil téléphonique', category: 'support', pitch: 'Répond aux appels, prend les messages et fixe les rendez-vous.', skills: ['Appels', 'Messages', 'RDV'] },
      { name: 'Emma', role: 'Rédactrice', category: 'marketing', pitch: 'Écrit vos articles, vos newsletters et optimise votre référencement.', skills: ['Articles', 'Newsletters', 'SEO'] },
      { name: 'Marc', role: 'Analyste', category: 'finance', pitch: 'Construit vos tableaux de bord et synthétise vos données clés.', skills: ['Reporting', 'Tableaux', 'Synthèses'] },
    ] as Agent[],
  },
  en: {
    eyebrow: 'Use cases',
    title1: 'Ten ready-to-use profiles. ',
    title2: 'One single agent.',
    subtitle:
      'Each profile comes with its role, its skills and its tools. Activate the one you need — your agent switches hats in an instant, without ever losing your company’s memory.',
    all: 'All',
    categoryLabels: {
      ventes: 'Sales',
      support: 'Support',
      admin: 'Admin',
      marketing: 'Marketing',
      finance: 'Finance',
      rh: 'HR',
    } as Record<CategoryKey, string>,
    activate: 'Activate this profile',
    ctaTitle1: 'Can’t find the right profile? ',
    ctaTitle2: 'Alma creates it.',
    ctaDesc:
      'Give your domain name, Alma calls you and crafts a custom agent for your line of work — even if your need is off the beaten path.',
    ctaBtn: 'Create my agent for free',
    agents: [
      { name: 'Patrick', role: 'Sales rep', category: 'ventes', pitch: 'Prospects, follows up on pending quotes and prepares your meetings.', skills: ['Follow-ups', 'Quotes', 'CRM'], wink: 'No more waiting on Patrick — he’s already on the job.' },
      { name: 'Sofia', role: 'Customer Success', category: 'support', pitch: 'Welcomes your customers, answers questions and tracks satisfaction.', skills: ['Onboarding', 'Support', 'Tracking'] },
      { name: 'Camille', role: 'Executive assistant', category: 'admin', pitch: 'Manages your calendar, sorts your emails and organizes your days.', skills: ['Calendar', 'Emails', 'Organization'] },
      { name: 'Louis', role: 'Customer support', category: 'support', pitch: 'Handles tickets, answers FAQs and escalates what matters.', skills: ['Tickets', 'FAQ', 'After-sales'] },
      { name: 'Nina', role: 'Marketing', category: 'marketing', pitch: 'Writes your content, schedules your posts and tracks your campaigns.', skills: ['Content', 'Social', 'Campaigns'] },
      { name: 'Hugo', role: 'Accounting', category: 'finance', pitch: 'Issues invoices, chases unpaid bills and tracks your cash flow.', skills: ['Invoices', 'Follow-ups', 'Tracking'] },
      { name: 'Sarah', role: 'Human resources', category: 'rh', pitch: 'Sorts applications, replies to candidates and prepares onboardings.', skills: ['Recruiting', 'Onboarding', 'HR'] },
      { name: 'Théo', role: 'Phone reception', category: 'support', pitch: 'Answers calls, takes messages and books appointments.', skills: ['Calls', 'Messages', 'Bookings'] },
      { name: 'Emma', role: 'Copywriter', category: 'marketing', pitch: 'Writes your articles, your newsletters and optimizes your SEO.', skills: ['Articles', 'Newsletters', 'SEO'] },
      { name: 'Marc', role: 'Analyst', category: 'finance', pitch: 'Builds your dashboards and summarizes your key data.', skills: ['Reporting', 'Dashboards', 'Summaries'] },
    ] as Agent[],
  },
}

export function AgentsGallery() {
  const { lang } = useLanguage()
  const t = T[lang]
  const [filter, setFilter] = useState<'all' | CategoryKey>('all')

  const AGENTS = t.agents
  const visible = filter === 'all' ? AGENTS : AGENTS.filter((a) => a.category === filter)
  const filters: Array<'all' | CategoryKey> = ['all', ...CATEGORY_ORDER]

  return (
    <main className="w-full bg-[#F3EFE6]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-grid pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h1
            className="mt-3 font-sf text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-[#1C1A17] text-balance"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.title1}<span className="text-[#D10E63]">{t.title2}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#4E483F]">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 border-b border-[#DcD4C4] pb-6">
          {filters.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === c
                  ? 'bg-[#1C1A17] text-[#FBF9F3]'
                  : 'border border-[#DcD4C4] text-[#4E483F] hover:border-[#1C1A17]/40 hover:text-[#1C1A17]'
              }`}
              aria-pressed={filter === c}
            >
              {c === 'all' ? t.all : t.categoryLabels[c]}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {visible.map((a, i) => {
            const color = CATEGORY_COLOR[a.category] ?? '#D10E63'
            return (
              <motion.article
                key={a.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                className="group flex flex-col rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3] p-5 transition-all hover:-translate-y-0.5 hover:border-[#1C1A17]/25 hover:shadow-[0_8px_30px_rgba(28,26,23,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-[#FBF9F3]"
                    style={{ background: color }}
                  >
                    {a.name.charAt(0)}
                  </span>
                  <div>
                    <h2 className="text-base font-semibold text-[#1C1A17] leading-tight">{a.name}</h2>
                    <p className="text-xs text-[#857C6E]">{a.role}</p>
                  </div>
                  <span
                    className="ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                    style={{ color, background: `${color}14` }}
                  >
                    {t.categoryLabels[a.category]}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#4E483F]">{a.pitch}</p>

                {a.wink && (
                  <p className="mt-2 flex items-start gap-1.5 text-xs italic leading-relaxed text-[#D10E63]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0"><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /><circle cx="12" cy="12" r="10" /></svg>
                    {a.wink}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {a.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[#DcD4C4] px-2.5 py-0.5 text-[11px] text-[#4E483F]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <a
                  href="/decouvrir"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#D10E63] transition-colors hover:text-[#B00B52]"
                >
                  {t.activate}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
              </motion.article>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl bg-[#1C1A17] px-6 py-12 sm:px-12 sm:py-16 text-center">
          <h2
            className="font-sf text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.1] text-[#FBF9F3] text-balance"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t.ctaTitle1}<span className="text-[#FF6FB0]">{t.ctaTitle2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#C4BAA8]">
            {t.ctaDesc}
          </p>
          <a
            href="/decouvrir"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
          >
            {t.ctaBtn}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </section>
    </main>
  )
}
