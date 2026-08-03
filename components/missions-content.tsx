'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Check, Search } from 'lucide-react'
import { collaboratorHref } from '@/lib/collaborators-catalog'
import { useLanguage, type Lang } from '@/lib/language-context'

type Mission = {
  id: string
  category: string
  title: string
  description: string
  result: string
  skills: string[]
  tools: string[]
  profile: string
  collaboratorSlug: string
}

type Copy = {
  kicker: string
  title: string
  lead: string
  searchPlaceholder: string
  searchExamplesLabel: string
  searchExamples: string[]
  searchCta: string
  allLabel: string
  resultWord: string
  skillsWord: string
  toolsWord: string
  profileWord: string
  discover: string
  categories: { key: string; label: string }[]
  missions: Mission[]
}

const T: Record<Lang, Copy> = {
  fr: {
    kicker: 'Choisissez ce que vous voulez accomplir',
    title: 'Confiez-lui une première Mission.',
    lead: 'Commencez par un résultat concret. Unitalk prépare les savoir-faire, les outils et le cadre de travail nécessaires à votre Collaborateur IA.',
    searchPlaceholder: 'Que voulez-vous accomplir ?',
    searchExamplesLabel: 'Exemples',
    searchExamples: ['Trouver des clients', 'Préparer une réunion', 'Créer du contenu', 'Automatiser un processus'],
    searchCta: 'Trouver une Mission',
    allLabel: 'Toutes',
    resultWord: 'Résultat',
    skillsWord: 'Savoir-faire',
    toolsWord: 'Outils possibles',
    profileWord: 'Profil recommandé',
    discover: 'Découvrir cette Mission',
    categories: [
      { key: 'ventes', label: 'Ventes' },
      { key: 'support', label: 'Support client' },
      { key: 'marketing', label: 'Marketing et contenu' },
      { key: 'reunions', label: 'Réunions et coordination' },
      { key: 'automatisation', label: 'Automatisation' },
      { key: 'developpement', label: 'Développement' },
    ],
    missions: [
      {
        id: 'clients',
        category: 'ventes',
        title: 'Trouver de nouveaux clients',
        description: 'Identifie les entreprises pertinentes, qualifie les contacts et prépare les prises de contact.',
        result: 'Une liste de prospects qualifiés et des messages prêts à valider.',
        skills: ['Recherche', 'Qualification', 'CRM', 'Rédaction'],
        tools: ['Web', 'CRM', 'Email'],
        profile: 'Commercial',
        collaboratorSlug: 'hugo',
      },
      {
        id: 'reunions',
        category: 'reunions',
        title: 'Préparer et suivre mes réunions',
        description: 'Réunit le contexte, prépare l’ordre du jour, produit le compte rendu et suit les décisions.',
        result: 'Un compte rendu structuré et des actions suivies jusqu’à leur clôture.',
        skills: ['Recherche', 'Synthèse', 'Transcription', 'Suivi'],
        tools: ['Agenda', 'Visioconférence', 'Documents'],
        profile: 'Assistant de réunion',
        collaboratorSlug: 'emma',
      },
      {
        id: 'support',
        category: 'support',
        title: 'Répondre à mes clients',
        description: 'Analyse les demandes, prépare les réponses et transmet les cas sensibles.',
        result: 'Des demandes traitées et une file de validations claire.',
        skills: ['Classification', 'Recherche', 'Rédaction', 'Escalade'],
        tools: ['Email', 'Helpdesk', 'Base de connaissances'],
        profile: 'Support client',
        collaboratorSlug: 'ines',
      },
      {
        id: 'contenus',
        category: 'marketing',
        title: 'Créer mes contenus',
        description: 'Produit les textes, visuels, présentations ou vidéos adaptés à votre identité.',
        result: 'Des contenus prêts à examiner et publier.',
        skills: ['Rédaction', 'Design', 'Publication', 'Analyse'],
        tools: ['Documents', 'Images', 'Vidéo', 'Réseaux sociaux'],
        profile: 'Création de contenu',
        collaboratorSlug: 'lea',
      },
      {
        id: 'automatisation',
        category: 'automatisation',
        title: 'Automatiser mes opérations',
        description: 'Conçoit, exécute et surveille vos processus avec vos applications.',
        result: 'Un processus automatisé, documenté et surveillé.',
        skills: ['Conception', 'Intégration', 'Contrôle', 'Reprise'],
        tools: ['n8n', 'API', 'Applications métier'],
        profile: 'Automatisation',
        collaboratorSlug: 'arthur',
      },
      {
        id: 'developpement',
        category: 'developpement',
        title: 'Développer une fonctionnalité',
        description: 'Analyse le besoin, produit le code, exécute les tests et prépare la livraison.',
        result: 'Une fonctionnalité documentée et prête à examiner.',
        skills: ['Architecture', 'Code', 'Tests', 'Documentation'],
        tools: ['GitHub', 'Terminal', 'Environnement de développement'],
        profile: 'Développement',
        collaboratorSlug: 'arthur',
      },
    ],
  },
  en: {
    kicker: 'Choose what you want to accomplish',
    title: 'Give it a first Mission.',
    lead: 'Start with a concrete outcome. Unitalk prepares the know-how, tools and working frame your AI Collaborator needs.',
    searchPlaceholder: 'What do you want to accomplish?',
    searchExamplesLabel: 'Examples',
    searchExamples: ['Find clients', 'Prepare a meeting', 'Create content', 'Automate a process'],
    searchCta: 'Find a Mission',
    allLabel: 'All',
    resultWord: 'Outcome',
    skillsWord: 'Know-how',
    toolsWord: 'Possible tools',
    profileWord: 'Recommended Profile',
    discover: 'Discover this Mission',
    categories: [
      { key: 'ventes', label: 'Sales' },
      { key: 'support', label: 'Customer support' },
      { key: 'marketing', label: 'Marketing and content' },
      { key: 'reunions', label: 'Meetings and coordination' },
      { key: 'automatisation', label: 'Automation' },
      { key: 'developpement', label: 'Development' },
    ],
    missions: [
      {
        id: 'clients',
        category: 'ventes',
        title: 'Find new clients',
        description: 'Identifies relevant companies, qualifies contacts and prepares outreach.',
        result: 'A list of qualified prospects and messages ready to approve.',
        skills: ['Research', 'Qualification', 'CRM', 'Writing'],
        tools: ['Web', 'CRM', 'Email'],
        profile: 'Sales Rep',
        collaboratorSlug: 'hugo',
      },
      {
        id: 'reunions',
        category: 'reunions',
        title: 'Prepare and follow up my meetings',
        description: 'Gathers context, prepares the agenda, produces minutes and tracks decisions.',
        result: 'A structured recap and actions followed through to completion.',
        skills: ['Research', 'Synthesis', 'Transcription', 'Follow-up'],
        tools: ['Calendar', 'Video call', 'Documents'],
        profile: 'Meeting assistant',
        collaboratorSlug: 'emma',
      },
      {
        id: 'support',
        category: 'support',
        title: 'Answer my customers',
        description: 'Analyzes requests, drafts replies and escalates sensitive cases.',
        result: 'Requests handled and a clear approval queue.',
        skills: ['Classification', 'Research', 'Writing', 'Escalation'],
        tools: ['Email', 'Helpdesk', 'Knowledge base'],
        profile: 'Customer Support',
        collaboratorSlug: 'ines',
      },
      {
        id: 'contenus',
        category: 'marketing',
        title: 'Create my content',
        description: 'Produces the copy, visuals, decks or videos aligned with your identity.',
        result: 'Content ready to review and publish.',
        skills: ['Writing', 'Design', 'Publishing', 'Analysis'],
        tools: ['Documents', 'Images', 'Video', 'Social media'],
        profile: 'Content creation',
        collaboratorSlug: 'lea',
      },
      {
        id: 'automatisation',
        category: 'automatisation',
        title: 'Automate my operations',
        description: 'Designs, runs and monitors your processes with your apps.',
        result: 'An automated, documented and monitored process.',
        skills: ['Design', 'Integration', 'Monitoring', 'Recovery'],
        tools: ['n8n', 'API', 'Business apps'],
        profile: 'Automation',
        collaboratorSlug: 'arthur',
      },
      {
        id: 'developpement',
        category: 'developpement',
        title: 'Build a feature',
        description: 'Analyzes the need, writes the code, runs the tests and prepares delivery.',
        result: 'A documented feature ready to review.',
        skills: ['Architecture', 'Code', 'Tests', 'Documentation'],
        tools: ['GitHub', 'Terminal', 'Dev environment'],
        profile: 'Development',
        collaboratorSlug: 'arthur',
      },
    ],
  },
}

export function MissionsContent() {
  const { lang } = useLanguage()
  const t = T[lang]
  const [active, setActive] = useState<string>('all')

  const filters = useMemo(
    () => [{ key: 'all', label: t.allLabel }, ...t.categories],
    [t],
  )

  const visible = active === 'all' ? t.missions : t.missions.filter((m) => m.category === active)

  return (
    <main className="bg-[#F3EFE6]">
      {/* Hero */}
      <section className="border-b border-[#E4DDCE] px-5 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32">
        <div className="editorial-shell">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.kicker}</p>
          <h1 className="mt-4 max-w-3xl text-balance font-sf text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#1C1A17] sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-[#5F594F] md:text-lg">{t.lead}</p>

          {/* Search */}
          <div className="mt-8 max-w-2xl">
            <div className="flex flex-col gap-3 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-2 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-2.5 px-3">
                <Search className="h-4 w-4 shrink-0 text-[#8A8175]" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-transparent py-2.5 text-sm text-[#1C1A17] placeholder:text-[#8A8175] focus:outline-none"
                  aria-label={t.searchPlaceholder}
                />
              </div>
              <a
                href="#missions-grid"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#1C1A17] px-5 py-2.5 text-sm font-bold text-[#F3EFE6] transition-transform hover:-translate-y-0.5"
              >
                {t.searchCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#8A8175]">{t.searchExamplesLabel} :</span>
              {t.searchExamples.map((ex) => (
                <span key={ex} className="rounded-full border border-[#E4DDCE] bg-[#FBF9F3] px-3 py-1 text-xs font-medium text-[#4E483F]">
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters + grid */}
      <section id="missions-grid" className="scroll-mt-24 px-5 py-14 sm:px-8 sm:py-16">
        <div className="editorial-shell">
          {/* Filters */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtres">
            {filters.map((f) => {
              const isActive = f.key === active
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(f.key)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'border-[#1C1A17] bg-[#1C1A17] text-[#F3EFE6]'
                      : 'border-[#E4DDCE] bg-[#FBF9F3] text-[#4E483F] hover:border-[#D10E63]/40 hover:text-[#D10E63]'
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
          </div>

          {/* Grid */}
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((m) => (
              <article
                key={m.id}
                className="flex flex-col rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-6 transition-all duration-300 hover:border-[#D10E63]/30 hover:shadow-[0_20px_50px_rgba(28,26,23,0.07)]"
              >
                <h2 className="font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{m.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#5F594F]">{m.description}</p>

                <div className="mt-5 rounded-2xl bg-[#F3EFE6] p-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.resultWord}</p>
                  <p className="mt-2 flex items-start gap-1.5 text-sm leading-relaxed text-[#1C1A17]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#22A06B]" strokeWidth={2.5} />
                    <span>{m.result}</span>
                  </p>
                </div>

                <div className="mt-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.skillsWord}</p>
                  <p className="mt-1.5 text-sm font-medium text-[#4E483F]">{m.skills.join(' · ')}</p>
                </div>

                <div className="mt-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.toolsWord}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.tools.map((tool) => (
                      <span key={tool} className="rounded-full bg-[#EDE7DA] px-2.5 py-1 text-xs font-medium text-[#4E483F]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.profileWord}</p>
                  <p className="mt-1 text-[13px] font-semibold text-[#D10E63]">{m.profile}</p>
                </div>

                <Link
                  href={collaboratorHref(m.collaboratorSlug)}
                  className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full bg-[#D10E63] px-4 py-2 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
                >
                  {t.discover}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
