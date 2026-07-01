'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type Agent = {
  name: string
  role: string
  category: string
  color: string
  pitch: string
  skills: string[]
}

const AGENTS: Agent[] = [
  {
    name: 'Patrick',
    role: 'Commercial',
    category: 'Ventes',
    color: '#FF0099',
    pitch: 'Prospecte, relance les devis en attente et prépare vos rendez-vous.',
    skills: ['Relances', 'Devis', 'CRM'],
  },
  {
    name: 'Alma',
    role: 'Customer Success',
    category: 'Support',
    color: '#5D9CEC',
    pitch: 'Accueille vos clients, répond aux questions et suit la satisfaction.',
    skills: ['Onboarding', 'Support', 'Suivi'],
  },
  {
    name: 'Camille',
    role: 'Assistante de direction',
    category: 'Administratif',
    color: '#F5A623',
    pitch: 'Gère votre agenda, trie vos emails et organise vos journées.',
    skills: ['Agenda', 'Emails', 'Organisation'],
  },
  {
    name: 'Louis',
    role: 'Support client',
    category: 'Support',
    color: '#5D9CEC',
    pitch: 'Traite les tickets, répond aux FAQ et escalade ce qui compte.',
    skills: ['Tickets', 'FAQ', 'SAV'],
  },
  {
    name: 'Nina',
    role: 'Marketing',
    category: 'Marketing',
    color: '#7ED321',
    pitch: 'Rédige vos contenus, planifie vos publications et suit vos campagnes.',
    skills: ['Contenus', 'Réseaux', 'Campagnes'],
  },
  {
    name: 'Hugo',
    role: 'Comptabilité',
    category: 'Finance',
    color: '#50E3C2',
    pitch: 'Émet les factures, relance les impayés et suit votre trésorerie.',
    skills: ['Factures', 'Relances', 'Suivi'],
  },
  {
    name: 'Sarah',
    role: 'Ressources humaines',
    category: 'RH',
    color: '#BD10E0',
    pitch: 'Trie les candidatures, répond aux candidats et prépare les onboardings.',
    skills: ['Recrutement', 'Onboarding', 'RH'],
  },
  {
    name: 'Théo',
    role: 'Accueil téléphonique',
    category: 'Support',
    color: '#5D9CEC',
    pitch: 'Répond aux appels, prend les messages et fixe les rendez-vous.',
    skills: ['Appels', 'Messages', 'RDV'],
  },
  {
    name: 'Emma',
    role: 'Rédactrice',
    category: 'Marketing',
    color: '#7ED321',
    pitch: 'Écrit vos articles, vos newsletters et optimise votre référencement.',
    skills: ['Articles', 'Newsletters', 'SEO'],
  },
  {
    name: 'Marc',
    role: 'Analyste',
    category: 'Finance',
    color: '#50E3C2',
    pitch: 'Construit vos tableaux de bord et synthétise vos données clés.',
    skills: ['Reporting', 'Tableaux', 'Synthèses'],
  },
]

const CATEGORIES = ['Tous', 'Ventes', 'Support', 'Administratif', 'Marketing', 'Finance', 'RH']

export function AgentsGallery() {
  const [filter, setFilter] = useState('Tous')

  const visible = filter === 'Tous' ? AGENTS : AGENTS.filter((a) => a.category === filter)

  return (
    <main className="w-full bg-[#0A0A0A]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">
            Trouver des agents
          </p>
          <h1 className="mt-3 font-heading text-4xl sm:text-5xl md:text-6xl font-light leading-[1.05] text-white text-balance" style={{ letterSpacing: '-0.02em' }}>
            10 profils prêts à l&apos;emploi.{' '}
            <span className="text-[#FF0099] italic">Un seul agent.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#B4B4BE]">
            Chaque profil arrive avec son rôle, ses compétences et ses outils. Activez celui dont vous
            avez besoin — votre agent change de casquette en un instant, sans jamais perdre la mémoire
            de votre entreprise.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 border-b border-white/8 pb-6">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === c
                  ? 'bg-[#FF0099] text-white'
                  : 'border border-white/12 text-[#B4B4BE] hover:border-white/30 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {visible.map((a, i) => (
            <motion.article
              key={a.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className="group flex flex-col rounded-2xl border border-white/10 bg-[#141416] p-5 transition-colors hover:border-white/25"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ background: a.color }}
                >
                  {a.name.charAt(0)}
                </span>
                <div>
                  <h2 className="text-base font-semibold text-white leading-tight">{a.name}</h2>
                  <p className="text-xs text-[#8A8A92]">{a.role}</p>
                </div>
                <span className="ml-auto rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-[#8A8A92]">
                  {a.category}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#C7C7D1]">{a.pitch}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {a.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-[#B4B4BE]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <a
                href="/creer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#FF0099] transition-colors hover:text-[#FF3AAF]"
              >
                Activer ce profil
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#151517] to-[#0C0C0E] px-6 py-12 sm:px-12 sm:py-16 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light leading-[1.1] text-white text-balance" style={{ letterSpacing: '-0.02em' }}>
            Vous ne trouvez pas le bon profil ?{' '}
            <span className="text-[#FF0099] italic">Alma le crée.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#B4B4BE]">
            Donnez votre nom de domaine, Alma vous appelle et façonne un agent sur mesure pour votre
            métier — même si votre besoin sort des sentiers battus.
          </p>
          <a
            href="/creer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#FF0099] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E00085]"
          >
            Créer mon agent gratuitement
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </section>
    </main>
  )
}
