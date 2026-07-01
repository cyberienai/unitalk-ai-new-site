'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Solution = {
  department: string
  color: string
  headline: string
  desc: string
  tasks: string[]
  icon: ReactNode
}

const SOLUTIONS: Solution[] = [
  {
    department: 'Ventes',
    color: '#D10E63',
    headline: 'Ne laissez plus filer un seul prospect',
    desc: 'Votre agent qualifie les leads, relance les devis en attente et prépare vos rendez-vous — pendant que vous vendez.',
    tasks: ['Qualification des leads', 'Relances de devis', 'Mise à jour du CRM', 'Préparation des RDV'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    department: 'Support',
    color: '#3E6DA8',
    headline: 'Un support qui répond, jour et nuit',
    desc: 'Il traite les tickets, répond aux questions récurrentes et escalade uniquement ce qui compte vraiment.',
    tasks: ['Réponses aux FAQ', 'Traitement des tickets', 'Suivi de satisfaction', 'Escalade intelligente'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    department: 'Administratif',
    color: '#C77A34',
    headline: 'Reprenez le contrôle de vos journées',
    desc: 'Il gère votre agenda, trie vos emails et organise vos priorités pour que rien ne passe entre les mailles.',
    tasks: ['Gestion d’agenda', 'Tri des emails', 'Organisation des tâches', 'Prise de notes'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    department: 'Marketing',
    color: '#2E7D4F',
    headline: 'Publiez plus, sans y passer vos soirées',
    desc: 'Il rédige vos contenus, planifie vos publications et suit la performance de vos campagnes.',
    tasks: ['Rédaction de contenus', 'Planification sociale', 'Newsletters', 'Suivi des campagnes'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    ),
  },
  {
    department: 'Finance',
    color: '#4E483F',
    headline: 'Une trésorerie toujours sous les yeux',
    desc: 'Il émet les factures, relance les impayés et synthétise vos indicateurs clés dans des tableaux de bord clairs.',
    tasks: ['Émission de factures', 'Relances d’impayés', 'Suivi de trésorerie', 'Reporting'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    department: 'RH',
    color: '#B4361C',
    headline: 'Recrutez sans perdre le fil',
    desc: 'Il trie les candidatures, répond aux candidats et prépare les onboardings pour une intégration sans accroc.',
    tasks: ['Tri des candidatures', 'Réponses aux candidats', 'Préparation d’onboarding', 'Suivi RH'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

export function SolutionsContent() {
  return (
    <main className="w-full bg-[#F3EFE6]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-grid pt-28 sm:pt-32 pb-10 sm:pb-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">Solutions</p>
          <h1
            className="mt-3 font-sf text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-[#1C1A17] text-balance"
            style={{ letterSpacing: '-0.03em' }}
          >
            Un agent pour chaque métier. <span className="text-[#D10E63]">Un seul à gérer.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#4E483F]">
            Ventes, support, administratif, marketing, finance, RH — votre agent endosse le rôle dont
            vous avez besoin, avec les compétences et les outils qui vont avec.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s, i) => (
            <motion.article
              key={s.department}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className="flex flex-col rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3] p-6 transition-all hover:-translate-y-0.5 hover:border-[#1C1A17]/25 hover:shadow-[0_8px_30px_rgba(28,26,23,0.08)]"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ color: s.color, background: `${s.color}14` }}
                >
                  {s.icon}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: s.color }}>
                  {s.department}
                </span>
              </div>

              <h2 className="mt-5 font-sf text-xl font-bold leading-snug text-[#1C1A17]" style={{ letterSpacing: '-0.02em' }}>
                {s.headline}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4E483F]">{s.desc}</p>

              <ul className="mt-5 space-y-2 border-t border-[#DcD4C4] pt-5">
                {s.tasks.map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm text-[#3A362F]">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: s.color }} />
                    {t}
                  </li>
                ))}
              </ul>

              <a
                href="/agents"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#D10E63] transition-colors hover:text-[#B00B52]"
              >
                Voir les profils {s.department}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
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
            Votre métier n’est pas dans la liste ? <span className="text-[#FF6FB0]">Alma s’en occupe.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#C4BAA8]">
            Donnez votre nom de domaine, Alma vous appelle et façonne un agent sur mesure pour votre
            activité — quelle qu’elle soit.
          </p>
          <a
            href="/creer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
          >
            Créer mon agent gratuitement
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </section>
    </main>
  )
}
