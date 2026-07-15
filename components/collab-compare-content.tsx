'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'
import { useLanguage, useT } from '@/lib/language-context'
import { CollabSubNav } from './collab-subnav'

type Comparison = {
  key: string
  name: string
  category: { fr: string; en: string }
  themLabel: { fr: string; en: string }
  them: { fr: string; en: string }[]
  us: { fr: string; en: string }[]
}

const COMPARISONS: Comparison[] = [
  {
    key: 'chatgpt', name: 'ChatGPT',
    category: { fr: 'Assistant conversationnel', en: 'Conversational assistant' },
    themLabel: { fr: 'ChatGPT', en: 'ChatGPT' },
    them: [
      { fr: 'Une conversation qui oublie', en: 'A conversation that forgets' },
      { fr: 'Pas d\'accès à vos outils', en: 'No access to your tools' },
      { fr: 'Aucune identité ni rôle', en: 'No identity or role' },
    ],
    us: [
      { fr: 'Une mémoire permanente', en: 'A permanent memory' },
      { fr: 'Email, agenda, CRM, téléphone', en: 'Email, calendar, CRM, phone' },
      { fr: 'Un rôle dans l\'organigramme', en: 'A role in the org chart' },
    ],
  },
  {
    key: 'claude', name: 'Claude',
    category: { fr: 'Assistant conversationnel', en: 'Conversational assistant' },
    themLabel: { fr: 'Claude', en: 'Claude' },
    them: [
      { fr: 'Excellent en rédaction, mais isolé', en: 'Great at writing, but isolated' },
      { fr: 'Pas de mémoire d\'entreprise', en: 'No company memory' },
      { fr: 'Ne travaille pas dans vos apps', en: 'Does not work inside your apps' },
    ],
    us: [
      { fr: 'Rédige ET exécute dans vos outils', en: 'Writes AND acts in your tools' },
      { fr: 'Apprend votre contexte métier', en: 'Learns your business context' },
      { fr: 'Collabore avec vos équipes', en: 'Collaborates with your teams' },
    ],
  },
  {
    key: 'gemini', name: 'Gemini',
    category: { fr: 'Assistant Google', en: 'Google assistant' },
    themLabel: { fr: 'Gemini', en: 'Gemini' },
    them: [
      { fr: 'Lié à l\'écosystème Google', en: 'Tied to the Google ecosystem' },
      { fr: 'Assistance ponctuelle', en: 'One-off assistance' },
      { fr: 'Pas de rôle durable', en: 'No durable role' },
    ],
    us: [
      { fr: 'Connecté à 3 000+ applications', en: 'Connected to 3,000+ apps' },
      { fr: 'Travaille en continu', en: 'Works continuously' },
      { fr: 'Membre durable de l\'équipe', en: 'A durable team member' },
    ],
  },
  {
    key: 'copilot', name: 'Microsoft Copilot',
    category: { fr: 'Assistant Microsoft 365', en: 'Microsoft 365 assistant' },
    themLabel: { fr: 'Copilot', en: 'Copilot' },
    them: [
      { fr: 'Cantonné à Microsoft 365', en: 'Limited to Microsoft 365' },
      { fr: 'Aide à la saisie', en: 'Helps you type' },
      { fr: 'Pas d\'autonomie', en: 'No autonomy' },
    ],
    us: [
      { fr: 'Agnostique de vos outils', en: 'Tool-agnostic' },
      { fr: 'Exécute des missions complètes', en: 'Runs full missions' },
      { fr: 'Gagne en autonomie', en: 'Gains autonomy over time' },
    ],
  },
  {
    key: 'codex', name: 'OpenAI Codex',
    category: { fr: 'Assistant de code', en: 'Coding assistant' },
    themLabel: { fr: 'Codex', en: 'Codex' },
    them: [
      { fr: 'Centré sur le code uniquement', en: 'Code-only focus' },
      { fr: 'Pas de rôle métier', en: 'No business role' },
      { fr: 'Pas de mémoire d\'équipe', en: 'No team memory' },
    ],
    us: [
      { fr: 'Couvre tous les métiers', en: 'Covers every function' },
      { fr: 'S\'intègre à vos process', en: 'Fits your processes' },
      { fr: 'Mémoire partagée', en: 'Shared memory' },
    ],
  },
  {
    key: 'claude-code', name: 'Claude Code',
    category: { fr: 'Agent de code terminal', en: 'Terminal coding agent' },
    themLabel: { fr: 'Claude Code', en: 'Claude Code' },
    them: [
      { fr: 'Puissant pour les développeurs', en: 'Powerful for developers' },
      { fr: 'Réservé au terminal', en: 'Terminal-only' },
      { fr: 'Pas pour les équipes métier', en: 'Not for business teams' },
    ],
    us: [
      { fr: 'Web, desktop, terminal, messagerie', en: 'Web, desktop, terminal, messaging' },
      { fr: 'Accessible à tous les métiers', en: 'For every function' },
      { fr: 'Une identité par collaborateur', en: 'An identity per collaborator' },
    ],
  },
  {
    key: 'dust', name: 'Dust',
    category: { fr: 'Plateforme d\'agents', en: 'Agent platform' },
    themLabel: { fr: 'Dust', en: 'Dust' },
    them: [
      { fr: 'Des assistants à configurer', en: 'Assistants to configure' },
      { fr: 'Orienté connaissance', en: 'Knowledge-oriented' },
      { fr: 'Peu d\'exécution réelle', en: 'Little real execution' },
    ],
    us: [
      { fr: 'Des collaborateurs prêts à l\'emploi', en: 'Ready-to-use collaborators' },
      { fr: 'Exécution dans vos outils', en: 'Execution inside your tools' },
      { fr: 'Serveur privé et RGPD', en: 'Private server and GDPR' },
    ],
  },
  {
    key: 'glean', name: 'Glean',
    category: { fr: 'Recherche d\'entreprise', en: 'Enterprise search' },
    themLabel: { fr: 'Glean', en: 'Glean' },
    them: [
      { fr: 'Cherche l\'information', en: 'Finds information' },
      { fr: 'Ne passe pas à l\'action', en: 'Does not take action' },
      { fr: 'Pas de rôle défini', en: 'No defined role' },
    ],
    us: [
      { fr: 'Trouve ET agit', en: 'Finds AND acts' },
      { fr: 'Exécute des missions', en: 'Executes missions' },
      { fr: 'Un rôle clair par collaborateur', en: 'A clear role per collaborator' },
    ],
  },
]

export function CollabCompareContent() {
  const { lang } = useLanguage()
  const [active, setActive] = useState('chatgpt')
  const current = COMPARISONS.find((c) => c.key === active) ?? COMPARISONS[0]

  const t = useT({
    fr: {
      eyebrow: 'Comparatif',
      title: 'Collaborateur IA vs les autres.',
      subtitle: 'Les assistants répondent. Les Collaborateurs IA travaillent. Voici la différence, outil par outil.',
      themCol: 'Eux',
      usCol: 'Collaborateur IA',
      ctaTitle: 'Voyez la différence par vous-même.',
      ctaBtn: 'Créer mon Collaborateur IA',
    },
    en: {
      eyebrow: 'Comparison',
      title: 'AI Collaborator vs the rest.',
      subtitle: 'Assistants answer. AI Collaborators work. Here is the difference, tool by tool.',
      themCol: 'Them',
      usCol: 'AI Collaborator',
      ctaTitle: 'See the difference for yourself.',
      ctaBtn: 'Create my AI Collaborator',
    },
  })

  return (
    <main className="w-full bg-[#F3EFE6]">
      <CollabSubNav active="/collaborateurs-ia/comparatif" />

      {/* Hero */}
      <section className="px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#D10E63]">{t.eyebrow}</p>
          <h1 className="text-balance font-sf text-4xl font-bold leading-[1.05] text-[#1C1A17] [letter-spacing:-0.04em] sm:text-5xl lg:text-6xl">{t.title}</h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-[#4E483F]">{t.subtitle}</p>
        </div>
      </section>

      {/* Selector */}
      <div className="sticky top-[7.5rem] z-20 border-y border-[#DDD5CA] bg-[#F3EFE6]/90 backdrop-blur-md sm:top-[8.5rem]">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-3 sm:px-6 lg:px-8 scrollbar-hide">
          {COMPARISONS.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === c.key ? 'bg-[#D10E63] text-[#FBF9F3]' : 'text-[#6B6560] hover:bg-[#EAE3D4] hover:text-[#1C1A17]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison */}
      <section className="px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div key={current.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <p className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#857C6E]">{current.category[lang]}</p>
            <h2 className="mt-3 text-balance text-center font-sf text-3xl font-semibold text-[#1C1A17] [letter-spacing:-0.03em] sm:text-4xl">
              {t.usCol} vs {current.name}
            </h2>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {/* Them */}
              <div className="rounded-3xl border border-[#DDD5CA] bg-[#FBF9F3] p-6 sm:p-8">
                <p className="text-lg font-bold text-[#857C6E]">{current.themLabel[lang]}</p>
                <div className="mt-6 flex flex-col gap-4">
                  {current.them.map((item) => (
                    <div key={item[lang]} className="flex items-start gap-3">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-[#B7AE9F]" />
                      <p className="text-[#6B6560]">{item[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Us */}
              <div className="rounded-3xl border-2 border-[#D10E63]/30 bg-[#FBF9F3] p-6 shadow-[0_18px_48px_rgba(209,14,99,0.12)] sm:p-8">
                <p className="text-lg font-bold text-[#D10E63]">{t.usCol}</p>
                <div className="mt-6 flex flex-col gap-4">
                  {current.us.map((item) => (
                    <div key={item[lang]} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#D10E63]" />
                      <p className="font-medium text-[#1C1A17]">{item[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#D10E63] px-5 py-24 text-center text-[#FBF9F3] sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance font-sf text-4xl font-semibold [letter-spacing:-0.04em] md:text-5xl">{t.ctaTitle}</h2>
          <a href="/signup" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#FBF9F3] px-7 py-3.5 font-bold text-[#1C1A17] transition-transform hover:-translate-y-0.5">
            {t.ctaBtn}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  )
}
