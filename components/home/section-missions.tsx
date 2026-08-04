'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { collaboratorHref } from '@/lib/collaborators-catalog'
import type { Lang } from '@/lib/language-context'
import { Kicker } from './section-kicker'

type Mission = {
  id: string
  title: string
  description: string
  profileLabel: string
  profiles: string
  tools: string[]
  result: string
  href: string
}

const T: Record<Lang, {
  kicker: string
  title: string
  subtitle: string
  toolsWord: string
  resultWord: string
  discover: string
  exploreAll: string
  missions: Mission[]
}> = {
  fr: {
    kicker: 'Choisissez sa mission',
    title: 'Que voulez-vous lui confier ?',
    subtitle: 'Commencez par un résultat concret. Chaque mission recommande le profil et les outils nécessaires.',
    toolsWord: 'Outils clés',
    resultWord: 'Résultat attendu',
    discover: 'Découvrir',
    exploreAll: 'Explorer toutes les missions',
    missions: [
      {
        id: 'clients',
        title: 'Trouver de nouveaux clients',
        description: 'Recherche les entreprises pertinentes, qualifie les contacts et prépare les prises de contact.',
        profileLabel: 'Profil recommandé',
        profiles: 'Commercial',
        tools: ['CRM', 'LinkedIn', 'Email'],
        result: 'Une liste de prospects qualifiés et des prises de contact prêtes à envoyer.',
        href: collaboratorHref('hugo'),
      },
      {
        id: 'reunions',
        title: 'Préparer et suivre mes réunions',
        description: 'Réunit le contexte, produit le compte rendu et suit les décisions.',
        profileLabel: 'Profil recommandé',
        profiles: 'Assistant de réunion',
        tools: ['Agenda', 'Notion', 'Visio'],
        result: 'Un compte rendu clair et les décisions suivies jusqu’à leur clôture.',
        href: collaboratorHref('emma'),
      },
      {
        id: 'contenus',
        title: 'Créer mes contenus',
        description: 'Produit des visuels, des présentations et des vidéos adaptés à votre identité.',
        profileLabel: 'Profils recommandés',
        profiles: 'Designer · Motion designer',
        tools: ['Design', 'Vidéo', 'Présentation'],
        result: 'Des visuels et des vidéos prêts à publier, fidèles à votre identité.',
        href: '/collaborateurs-ia',
      },
      {
        id: 'operations',
        title: 'Automatiser mes opérations',
        description: 'Conçoit, exécute et surveille vos processus avec vos applications.',
        profileLabel: 'Profil recommandé',
        profiles: 'Automatisation',
        tools: ['Workflows', 'API', 'Vos applications'],
        result: 'Des processus qui s’exécutent et se surveillent sans intervention.',
        href: '/collaborateurs-ia',
      },
    ],
  },
  en: {
    kicker: 'Choose its mission',
    title: 'What do you want it to take on?',
    subtitle: 'Start from a concrete result. Every mission recommends the profile and the tools needed.',
    toolsWord: 'Key tools',
    resultWord: 'Expected result',
    discover: 'Discover',
    exploreAll: 'Explore all missions',
    missions: [
      {
        id: 'clients',
        title: 'Find new customers',
        description: 'Researches relevant companies, qualifies contacts and prepares outreach.',
        profileLabel: 'Recommended profile',
        profiles: 'Sales Rep',
        tools: ['CRM', 'LinkedIn', 'Email'],
        result: 'A list of qualified prospects and outreach ready to send.',
        href: collaboratorHref('hugo'),
      },
      {
        id: 'reunions',
        title: 'Prepare and track my meetings',
        description: 'Gathers the context, produces the minutes and tracks the decisions.',
        profileLabel: 'Recommended profile',
        profiles: 'Meeting Assistant',
        tools: ['Calendar', 'Notion', 'Video'],
        result: 'Clear minutes and decisions tracked through to closure.',
        href: collaboratorHref('emma'),
      },
      {
        id: 'contenus',
        title: 'Create my content',
        description: 'Produces visuals, presentations and videos tailored to your identity.',
        profileLabel: 'Recommended profiles',
        profiles: 'Designer · Motion designer',
        tools: ['Design', 'Video', 'Slides'],
        result: 'Visuals and videos ready to publish, true to your identity.',
        href: '/collaborateurs-ia',
      },
      {
        id: 'operations',
        title: 'Automate my operations',
        description: 'Designs, runs and monitors your processes with your apps.',
        profileLabel: 'Recommended profile',
        profiles: 'Automation',
        tools: ['Workflows', 'API', 'Your apps'],
        result: 'Processes that run and monitor themselves without intervention.',
        href: '/collaborateurs-ia',
      },
    ],
  },
}

export function SectionMissions({ lang }: { lang: Lang }) {
  const t = T[lang]
  const [active, setActive] = useState(0)

  return (
    <section id="missions" className="scroll-mt-20 bg-[#F3EFE6] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-[#5F594F]">{t.subtitle}</p>
        </div>

        {/* Horizontal carousel on mobile, grid on desktop */}
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {t.missions.map((m, i) => {
            const isActive = i === active
            return (
              <div
                key={m.id}
                className={`flex w-[80vw] shrink-0 snap-start flex-col rounded-3xl border p-6 transition-all duration-300 sm:w-auto ${
                  isActive
                    ? 'border-[#D10E63]/40 bg-[#FBF9F3] shadow-[0_20px_50px_rgba(28,26,23,0.08)]'
                    : 'border-[#E4DCCF] bg-[#EFEADF] hover:border-[#D10E63]/25 hover:bg-[#FBF9F3]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  className="flex flex-col text-left"
                >
                  <h3 className="font-sf text-lg font-bold tracking-[-0.02em] text-[#1C1A17]">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5F594F]">{m.description}</p>
                  <p className="mt-4 text-[13px] font-semibold text-[#D10E63]">
                    {m.profileLabel} : {m.profiles}
                  </p>
                </button>

                {/* Reveal for the active mission */}
                <div className={`grid transition-all duration-300 ${isActive ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="border-t border-[#E4DCCF] pt-4">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.toolsWord}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.tools.map((tool) => (
                          <span key={tool} className="rounded-full bg-[#EDE7DA] px-2.5 py-1 text-xs font-medium text-[#4E483F]">{tool}</span>
                        ))}
                      </div>
                      <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.resultWord}</p>
                      <p className="mt-2 flex items-start gap-1.5 text-sm leading-relaxed text-[#4E483F]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#22A06B]" strokeWidth={2.5} />
                        <span>{m.result}</span>
                      </p>
                      <Link
                        href={m.href}
                        tabIndex={isActive ? 0 : -1}
                        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-4 py-2 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
                      >
                        {t.discover}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Explore all missions */}
        <div className="mt-8 flex justify-center sm:justify-start">
          <Link
            href="/collaborateurs-ia"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4E483F] underline-offset-4 transition-colors hover:text-[#D10E63] hover:underline"
          >
            {t.exploreAll}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
