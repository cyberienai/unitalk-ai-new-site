'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Globe, ListChecks, Users, Search } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { useAlma } from '@/lib/alma-context'
import { normalizeDomain } from '@/lib/discover-profiles'
import {
  CATEGORY_LABELS,
  curatedMissions,
  getMission,
  JOB_PROFILES,
  type Entry,
  type JobProfile,
} from './types'
import type { Mission } from '@/lib/missions-catalog'

type SubView = 'choices' | 'company' | 'mission' | 'profile' | 'profile-mission' | 'adapt'

export function ScreenStart({
  lang,
  onStart,
}: {
  lang: Lang
  onStart: (patch: { entry: Entry; domain: string; missionSlug: string }) => void
}) {
  const { openAlma } = useAlma()
  const [view, setView] = useState<SubView>('choices')
  const [entry, setEntry] = useState<Entry>('company')
  const [missionSlug, setMissionSlug] = useState('trouver-de-nouveaux-clients')
  const [query, setQuery] = useState('')
  const [domain, setDomain] = useState('')
  const [domainError, setDomainError] = useState('')

  const t = COPY[lang]
  const missions = curatedMissions()
  const filteredMissions = missions.filter((m) =>
    (m.title[lang] + ' ' + m.description[lang]).toLowerCase().includes(query.toLowerCase()),
  )
  const filteredProfiles = JOB_PROFILES.filter((p) =>
    (p.label[lang] + ' ' + p.summary[lang]).toLowerCase().includes(query.toLowerCase()),
  )

  function chooseMission(m: Mission) {
    setMissionSlug(m.slug)
    setEntry('mission')
    setView('adapt')
  }
  function chooseProfile(p: JobProfile) {
    setMissionSlug(p.missionSlug)
    setEntry('profile')
    setView('profile-mission')
  }
  function chooseProfileMission(m: Mission) {
    setMissionSlug(m.slug)
    setView('adapt')
  }
  function submitCompany() {
    const d = normalizeDomain(domain)
    if (!d) {
      setDomainError(t.domainError)
      return
    }
    onStart({ entry: 'company', domain: d, missionSlug: 'trouver-de-nouveaux-clients' })
  }
  function submitAdapt() {
    // Domain is optional here (a mission/profile is already chosen).
    onStart({ entry, domain: normalizeDomain(domain), missionSlug })
  }

  const back = (
    <button
      type="button"
      onClick={() => {
        setQuery('')
        setDomainError('')
        setView('choices')
      }}
      className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#8A8175] transition-colors hover:text-[#1C1A17]"
    >
      <ArrowLeft className="h-4 w-4" />
      {t.back}
    </button>
  )

  // ---- CHOICES ----
  if (view === 'choices') {
    const choices: { key: Entry; icon: typeof Globe; title: string; body: string; cta: string; go: () => void }[] = [
      { key: 'company', icon: Globe, title: t.c1Title, body: t.c1Body, cta: t.c1Cta, go: () => setView('company') },
      { key: 'mission', icon: ListChecks, title: t.c2Title, body: t.c2Body, cta: t.c2Cta, go: () => setView('mission') },
      { key: 'profile', icon: Users, title: t.c3Title, body: t.c3Body, cta: t.c3Cta, go: () => setView('profile') },
    ]
    return (
      <div>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.kicker}</p>
        <h1 className="mt-4 text-balance font-sf text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1C1A17]">
          {t.title}
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#4E483F]">{t.lead}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {choices.map((c) => {
            const Icon = c.icon
            return (
              <button
                key={c.key}
                type="button"
                onClick={c.go}
                className="group flex flex-col rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D10E63]/45 hover:shadow-[0_20px_50px_-30px_rgba(28,26,23,0.55)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D10E63]/[0.1] text-[#D10E63]">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h2 className="mt-4 font-sf text-lg font-bold tracking-[-0.01em] text-[#1C1A17]">{c.title}</h2>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#5A544A]">{c.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#D10E63]">
                  {c.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            )
          })}
        </div>

        <p className="mt-6 border-l-2 border-[#D10E63] pl-4 text-sm font-semibold leading-snug text-[#1C1A17]">
          {t.converge}
        </p>

        <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          {t.reassurance.map((r) => (
            <li key={r} className="text-xs font-medium text-[#5F594F]">
              {r}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // ---- COMPANY (domain) ----
  if (view === 'company') {
    return (
      <div>
        {back}
        <h1 className="text-balance font-sf text-[clamp(1.7rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
          {t.companyTitle}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4E483F]">{t.companyLead}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submitCompany()
          }}
          className="mt-7 max-w-md"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] p-2 focus-within:border-[#D10E63]">
            <Globe className="ml-3 h-5 w-5 shrink-0 text-[#8A8175]" />
            <input
              type="text"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value)
                setDomainError('')
              }}
              placeholder="votre-entreprise.fr"
              aria-label={t.companyTitle}
              className="w-full bg-transparent py-2.5 pr-2 text-sm text-[#1C1A17] outline-none placeholder:text-[#9A9184]"
            />
          </div>
          {domainError && <p className="mt-2 text-sm font-medium text-[#C0392B]">{domainError}</p>}
          <button
            type="submit"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872] sm:w-auto"
          >
            {t.companyCta}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-[#5A544A]">{t.companyReassure}</p>
        <button
          type="button"
          onClick={openAlma}
          className="mt-4 text-sm font-semibold text-[#B10A52] underline-offset-4 hover:underline"
        >
          {t.companyNoSite}
        </button>
      </div>
    )
  }

  // ---- MISSION list ----
  if (view === 'mission') {
    return (
      <div>
        {back}
        <h1 className="text-balance font-sf text-[clamp(1.7rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
          {t.missionTitle}
        </h1>
        <SearchBar value={query} onChange={setQuery} placeholder={t.missionSearch} />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {filteredMissions.map((m) => (
            <MissionPick key={m.slug} mission={m} lang={lang} cta={t.chooseMission} onClick={() => chooseMission(m)} />
          ))}
        </div>
      </div>
    )
  }

  // ---- PROFILE list ----
  if (view === 'profile') {
    return (
      <div>
        {back}
        <h1 className="text-balance font-sf text-[clamp(1.7rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
          {t.profileTitle}
        </h1>
        <SearchBar value={query} onChange={setQuery} placeholder={t.profileSearch} />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {filteredProfiles.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => chooseProfile(p)}
              className="group flex h-full flex-col rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D10E63]/45 hover:shadow-[0_20px_50px_-30px_rgba(28,26,23,0.55)]"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-[#D10E63]/[0.08] px-2.5 py-1 text-[11px] font-semibold text-[#A80B50]">
                {CATEGORY_LABELS[p.category]?.[lang] ?? p.category}
              </span>
              <h3 className="mt-3 font-sf text-base font-bold text-[#1C1A17]">{p.label[lang]}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#5A544A]">{p.summary[lang]}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.skills.map((s) => (
                  <span key={s[lang]} className="rounded-full border border-[#E1D9C9] px-2 py-0.5 text-[11px] text-[#5A544A]">
                    {s[lang]}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#D10E63]">
                {t.chooseProfile}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ---- PROFILE → choose mission ----
  if (view === 'profile-mission') {
    const chosenProfile = JOB_PROFILES.find((p) => p.missionSlug === missionSlug)
    // Three adapted missions: the profile default + two curated peers.
    const adapted = [
      getMission(missionSlug),
      ...missions.filter((m) => m.slug !== missionSlug).slice(0, 2),
    ]
    return (
      <div>
        {back}
        <h1 className="text-balance font-sf text-[clamp(1.7rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
          {t.profileMissionTitle}
        </h1>
        {chosenProfile && (
          <p className="mt-3 text-sm text-[#5A544A]">
            {t.profileChip}{' '}
            <span className="font-semibold text-[#1C1A17]">{chosenProfile.label[lang]}</span>
          </p>
        )}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {adapted.map((m) => (
            <MissionPick
              key={m.slug}
              mission={m}
              lang={lang}
              cta={t.chooseMission}
              onClick={() => chooseProfileMission(m)}
            />
          ))}
        </div>
      </div>
    )
  }

  // ---- ADAPT (optional domain, mission chosen) ----
  const chosen = getMission(missionSlug)
  return (
    <div>
      {back}
      <h1 className="text-balance font-sf text-[clamp(1.7rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] text-[#1C1A17]">
        {t.adaptTitle}
      </h1>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#D10E63]/[0.08] px-3 py-1.5 text-sm font-semibold text-[#A80B50]">
        <ListChecks className="h-4 w-4" />
        {chosen.title[lang]}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submitAdapt()
        }}
        className="mt-6 max-w-md"
      >
        <div className="flex items-center gap-2 rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] p-2 focus-within:border-[#D10E63]">
          <Globe className="ml-3 h-5 w-5 shrink-0 text-[#8A8175]" />
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="votre-entreprise.fr"
            aria-label={t.adaptTitle}
            className="w-full bg-transparent py-2.5 pr-2 text-sm text-[#1C1A17] outline-none placeholder:text-[#9A9184]"
          />
        </div>
        <button
          type="submit"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872] sm:w-auto"
        >
          {t.continue}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <button
        type="button"
        onClick={() => submitAdapt()}
        className="mt-4 text-sm font-medium text-[#8A8175] underline-offset-4 hover:text-[#1C1A17] hover:underline"
      >
        {t.skipDomain}
      </button>
    </div>
  )
}

function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="mt-6 flex max-w-xl items-center gap-2 rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] p-2 focus-within:border-[#D10E63]">
      <Search className="ml-3 h-5 w-5 shrink-0 text-[#8A8175]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full bg-transparent py-2.5 pr-2 text-sm text-[#1C1A17] outline-none placeholder:text-[#9A9184]"
      />
    </div>
  )
}

function MissionPick({
  mission,
  lang,
  cta,
  onClick,
}: {
  mission: Mission
  lang: Lang
  cta: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full flex-col rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D10E63]/45 hover:shadow-[0_20px_50px_-30px_rgba(28,26,23,0.55)]"
    >
      <span className="inline-flex w-fit items-center rounded-full bg-[#D10E63]/[0.08] px-2.5 py-1 text-[11px] font-semibold text-[#A80B50]">
        {CATEGORY_LABELS[mission.category]?.[lang] ?? mission.category}
      </span>
      <h3 className="mt-3 font-sf text-base font-bold leading-snug text-[#1C1A17]">{mission.title[lang]}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#5A544A]">{mission.result[lang]}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#D10E63]">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  )
}

const COPY = {
  fr: {
    kicker: 'Commencer gratuitement',
    title: 'Commençons par ce que vous savez déjà.',
    lead: 'Partez de votre entreprise, d’une mission ou d’un savoir-faire. Alma construit ensuite le contexte dont votre Collaborateur IA a besoin pour travailler.',
    c1Title: 'Mon entreprise',
    c1Body: 'Alma rassemble les informations publiques disponibles, puis vérifie avec vous ce qu’elle a compris.',
    c1Cta: 'Analyser mon entreprise',
    c2Title: 'Une mission',
    c2Body: 'Choisissez directement ce que vous souhaitez confier.',
    c2Cta: 'Choisir une mission',
    c3Title: 'Un profil métier',
    c3Body: 'Partez du savoir-faire dont votre entreprise a besoin.',
    c3Cta: 'Choisir un profil métier',
    converge: 'Quel que soit votre point de départ, Alma construit le même contexte d’Organisation.',
    reassurance: ['7 jours gratuits', 'Hébergé en France', 'Conforme au RGPD'],
    back: 'Retour',
    companyTitle: 'Quel est le site Web de votre entreprise ?',
    companyLead: 'Alma rassemble les informations publiques disponibles pour préparer une première compréhension de votre activité.',
    companyCta: 'Analyser mon entreprise',
    companyReassure: 'Alma cite ses sources. Vous choisissez ce qu’elle conserve et qui peut y accéder.',
    companyNoSite: 'Je n’ai pas de site Web — Parler à Alma',
    domainError: 'Indiquez un domaine, par exemple unitalk.ai.',
    missionTitle: 'Qu’aimeriez-vous confier à votre Collaborateur IA ?',
    missionSearch: 'Décrivez votre objectif ou recherchez une mission…',
    chooseMission: 'Choisir cette mission',
    profileTitle: 'De quel savoir-faire avez-vous besoin ?',
    profileSearch: 'Recherchez un métier, une expertise ou une compétence…',
    chooseProfile: 'Choisir ce profil',
    profileMissionTitle: 'Avec quelle mission souhaitez-vous commencer ?',
    profileChip: 'Profil choisi :',
    adaptTitle: 'Pour adapter cette mission, quel est le site Web de votre entreprise ?',
    continue: 'Continuer',
    skipDomain: 'Je préfère le préciser plus tard',
  },
  en: {
    kicker: 'Start for free',
    title: 'Let’s start with what you already know.',
    lead: 'Start from your company, a mission or a know-how. Alma then builds the context your AI Collaborator needs to work.',
    c1Title: 'My company',
    c1Body: 'Alma gathers the available public information, then checks with you what it understood.',
    c1Cta: 'Analyze my company',
    c2Title: 'A mission',
    c2Body: 'Pick directly what you want to hand off.',
    c2Cta: 'Choose a mission',
    c3Title: 'A job profile',
    c3Body: 'Start from the know-how your company needs.',
    c3Cta: 'Choose a job profile',
    converge: 'Whatever your starting point, Alma builds the same Organization context.',
    reassurance: ['7 days free', 'Hosted in France', 'GDPR compliant'],
    back: 'Back',
    companyTitle: 'What is your company’s website?',
    companyLead: 'Alma gathers the available public information to prepare a first understanding of your business.',
    companyCta: 'Analyze my company',
    companyReassure: 'Alma cites its sources. You choose what it keeps and who can access it.',
    companyNoSite: 'I don’t have a website — Talk to Alma',
    domainError: 'Enter a domain, for example unitalk.ai.',
    missionTitle: 'What would you like to hand to your AI Collaborator?',
    missionSearch: 'Describe your goal or search for a mission…',
    chooseMission: 'Choose this mission',
    profileTitle: 'Which know-how do you need?',
    profileSearch: 'Search for a role, an expertise or a skill…',
    chooseProfile: 'Choose this profile',
    profileMissionTitle: 'Which mission would you like to start with?',
    profileChip: 'Chosen profile:',
    adaptTitle: 'To tailor this mission, what is your company’s website?',
    continue: 'Continue',
    skipDomain: 'I’d rather specify it later',
  },
} as const
