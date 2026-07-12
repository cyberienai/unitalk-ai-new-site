'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Check, Loader2, ArrowRightLeft, Server, Info } from 'lucide-react'

// Small accessible "i" tooltip shown next to a field label.
function FieldInfo({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label={text}
        className="inline-flex items-center justify-center rounded-full text-[#B8B0A2] transition-colors hover:text-[#D10E63] focus:text-[#D10E63] focus:outline-none"
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 w-52 -translate-x-1/2 rounded-lg bg-[#1C1A17] px-3 py-2 text-xs font-normal leading-relaxed text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {text}
      </span>
    </span>
  )
}

const T = {
  fr: {
    tabCreate: 'Déployer',
    tabMigrate: 'Migrer',
    formTitlePrefix: '',
    migrateTitle: 'Migrez vers un Collaborateur IA Unitalk',
    migrateSubtitle: 'Transférez vos données depuis votre outil actuel.',
    platformLabel: 'Outil actuel',
    platformOptions: ['Hermes', 'OpenClaw', 'ChatGPT Team', 'Claude Team', 'Gemini Spark', 'Perplexity Computer', 'Microsoft Scout', 'Genspark Claw', 'Kimi Claw', 'Autre'],
    hostingLabel: 'Hébergement actuel',
    hostingOptions: { cloud: 'Hébergé (cloud)', selfHosted: 'Auto-hébergé' },
    migrateCta: 'Transférer mes données',
    migrateReassurance: 'Migration accompagnée • Sans interruption',
    domainLabel: 'Nom de domaine',
    domainPlaceholder: 'monentreprise.com',
    domainHint: "Nous analysons automatiquement votre site web pour créer le contexte partagé de votre organisation.",
    analysis: {
      scanning: 'Analyse de votre site en cours…',
      company: 'Entreprise détectée',
      sector: 'Secteur identifié : Services B2B',
      pages: '12 pages analysées',
      services: '4 services détectés',
      ready: (n: string, fem: boolean) => `${n} est prêt${fem ? 'e' : ''} à travailler`,
    },
    nameLabel: 'Nom du collaborateur',
    namePlaceholder: 'Emma',
    nameHint: 'Vous pourrez le modifier plus tard.',
    suggestName: 'Autre suggestion',
    locationChange: '(changer)',
    locationInfo: "Zone d'hébergement de votre collaborateur IA — vos données restent dans ce pays.",
    roleLabel: 'Rôle',
    roleHint: 'Les compétences seront générées automatiquement.',
    roleOptions: [
      { f: 'Assistante Exécutive', m: 'Assistant Exécutif' },
      { f: 'Assistante commerciale', m: 'Assistant commercial' },
      { f: 'Chargée de Support Client', m: 'Chargé de Support Client' },
      { f: 'Gestionnaire de Projets', m: 'Gestionnaire de Projets' },
      { f: 'Chargée Marketing', m: 'Chargé Marketing' },
      { f: 'Chargée RH', m: 'Chargé RH' },
      { f: 'Comptable', m: 'Comptable' },
      { f: 'Chargée Administrative', m: 'Chargé Administratif' },
      { f: 'Chargée de Recrutement', m: 'Chargé de Recrutement' },
      { f: 'Analyste de Données', m: 'Analyste de Données' },
      { f: 'Rédactrice de Contenu', m: 'Rédacteur de Contenu' },
      { f: 'Chargée Juridique', m: 'Chargé Juridique' },
    ],
    ctaButton: 'Déployez',
    ctaDuration: (fem: boolean) => `Prêt${fem ? 'e' : ''} à travailler en 2 min • 7 jours gratuits • Sans carte bancaire`,
    defaultName: 'Emma',
    terms: "En cliquant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité.",
  },
  en: {
    tabCreate: 'Deploy',
    tabMigrate: 'Migrate',
    formTitlePrefix: '',
    migrateTitle: 'Migrate to a Unitalk AI Collaborator',
    migrateSubtitle: 'Transfer your data from your current tool.',
    platformLabel: 'Current tool',
    platformOptions: ['Hermes', 'OpenClaw', 'ChatGPT Team', 'Claude Team', 'Gemini Spark', 'Perplexity Computer', 'Microsoft Scout', 'Genspark Claw', 'Kimi Claw', 'Other'],
    hostingLabel: 'Current hosting',
    hostingOptions: { cloud: 'Hosted (cloud)', selfHosted: 'Self-hosted' },
    migrateCta: 'Transfer my data',
    migrateReassurance: 'Guided migration • No downtime',
    domainLabel: 'Domain name',
    domainPlaceholder: 'mycompany.com',
    domainHint: 'We automatically analyze your website to build the shared context for your organization.',
    analysis: {
      scanning: 'Analyzing your website…',
      company: 'Company detected',
      sector: 'Sector identified: B2B Services',
      pages: '12 pages analyzed',
      services: '4 services detected',
      ready: (n: string, _fem: boolean) => `${n} is ready to work`,
    },
    nameLabel: 'Collaborator Name',
    namePlaceholder: 'Emma',
    nameHint: 'You can change it later.',
    suggestName: 'Another suggestion',
    locationChange: '(change)',
    locationInfo: 'Hosting zone for your AI collaborator — your data stays in this country.',
    roleLabel: 'Role',
    roleHint: 'Skills will be generated automatically.',
    roleOptions: [
      { f: 'Executive Assistant', m: 'Executive Assistant' },
      { f: 'Sales Assistant', m: 'Sales Assistant' },
      { f: 'Customer Support', m: 'Customer Support' },
      { f: 'Project Manager', m: 'Project Manager' },
      { f: 'Marketing Specialist', m: 'Marketing Specialist' },
      { f: 'HR Specialist', m: 'HR Specialist' },
      { f: 'Accountant', m: 'Accountant' },
      { f: 'Administrative Officer', m: 'Administrative Officer' },
      { f: 'Recruiter', m: 'Recruiter' },
      { f: 'Data Analyst', m: 'Data Analyst' },
      { f: 'Content Writer', m: 'Content Writer' },
      { f: 'Legal Assistant', m: 'Legal Assistant' },
    ],
    ctaButton: 'Deploy',
    ctaDuration: (_fem: boolean) => 'Ready to work in 2 min • 7 days free • No credit card',
    defaultName: 'Emma',
    terms: 'By clicking, you accept our Terms of Use and Privacy Policy.',
  },
}

interface CollaboratorFormProps {
  lang?: 'fr' | 'en'
}

const SUGGESTED_NAMES = ['Emma', 'Léa', 'Nina', 'Alex', 'Noé', 'Maya']

// Each suggested collaborator gets a real face so deploying feels personal.
const AVATAR_BY_NAME: Record<string, string> = {
  Emma: '/assistant-avatar.png',
  Léa: '/elena-avatar.png',
  Nina: '/nina-avatar.png',
  Alex: '/alex-avatar.png',
  Noé: '/marcus-avatar.png',
  Maya: '/sofia-avatar.png',
}
const DEFAULT_AVATAR = '/assistant-avatar.png'

// Hosting zone for the collaborator — a single concept reused down the funnel (Hermes Cloud "workplace").
const COUNTRIES = [
  { code: 'FR', fr: 'France', en: 'France' },
  { code: 'DE', fr: 'Allemagne', en: 'Germany' },
  { code: 'CH', fr: 'Suisse', en: 'Switzerland' },
] as const

// Real flag images (identical rendering across OSes, unlike emoji flags on Windows).
function flagUrl(code: string) {
  return `https://flagcdn.com/${code.toLowerCase()}.svg`
}

// Auto-detect the hosting zone from the domain TLD, defaulting to France.
function detectCountry(domain: string): string {
  const d = domain.trim().toLowerCase()
  if (/\.de$/.test(d)) return 'DE'
  if (/\.ch$/.test(d)) return 'CH'
  return 'FR'
}

// Grammatical gender of suggested names, used for French agreement ("prêt/prête").
const FEMININE_NAMES = new Set(['Emma', 'Léa', 'Nina', 'Maya'])
const MASCULINE_NAMES = new Set(['Alex', 'Noé'])
// For custom names, guess feminine when it ends in "a" or "e" (common FR pattern), else masculine.
function isFeminineName(name: string): boolean {
  if (FEMININE_NAMES.has(name)) return true
  if (MASCULINE_NAMES.has(name)) return false
  return /[ae]$/i.test(name.trim())
}

export default function CollaboratorForm({ lang = 'fr' }: CollaboratorFormProps) {
  const t = T[lang]
  const [mode, setMode] = useState<'create' | 'migrate'>('create')
  const [domain, setDomain] = useState('')
  const [name, setName] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [platform, setPlatform] = useState(t.platformOptions[0])
  const [currentHosting, setCurrentHosting] = useState<'cloud' | 'selfHosted'>('cloud')
  // Simulated domain analysis: 0 = idle, 1 = scanning, 2..4 = revealed lines
  const [analysisStep, setAnalysisStep] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  // Hosting zone: auto-detected from the domain TLD until the user picks one manually.
  const [country, setCountry] = useState('FR')
  const [countryTouched, setCountryTouched] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const selectedCountry = COUNTRIES.find((c) => c.code === country) ?? COUNTRIES[0]

  const collaboratorName = name.trim() || t.defaultName
  const collaboratorAvatar = AVATAR_BY_NAME[collaboratorName] || DEFAULT_AVATAR
  const collaboratorIsFeminine = isFeminineName(collaboratorName)
  const role = t.roleOptions[roleIndex][collaboratorIsFeminine ? 'f' : 'm']
  const domainIsValid = /\..{2,}/.test(domain.trim())

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    if (!domainIsValid) {
      setAnalysisStep(0)
      return
    }

    setAnalysisStep(1)
    const schedule = (step: number, delay: number) => {
      timers.current.push(setTimeout(() => setAnalysisStep(step), delay))
    }
    schedule(2, 700)
    schedule(3, 1300)
    schedule(4, 1900)
    schedule(5, 2500)
    schedule(6, 3100)

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
    // Re-run whenever the validity of the typed domain changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domainIsValid])

  // Auto-detect hosting zone from the domain TLD, unless the user has chosen one.
  useEffect(() => {
    if (countryTouched) return
    setCountry(detectCountry(domain))
  }, [domain, countryTouched])

  const suggestName = () => {
    const currentIndex = SUGGESTED_NAMES.indexOf(collaboratorName)
    const nextIndex = (currentIndex + 1) % SUGGESTED_NAMES.length
    setName(SUGGESTED_NAMES[nextIndex])
  }

  const analysisLines = [
    { key: 'company', label: t.analysis.company, step: 2 },
    { key: 'sector', label: t.analysis.sector, step: 3 },
    { key: 'pages', label: t.analysis.pages, step: 4 },
    { key: 'services', label: t.analysis.services, step: 5 },
  ]

  return (
    <motion.div
      className="relative w-full max-w-md rounded-2xl border border-[#E6DFD1] bg-[#F5F1E8] p-6 shadow-xl sm:p-7"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {/* Segmented tabs — Create / Migrate */}
      <div className="mb-5 flex rounded-full border border-[#DDD5CA] bg-[#EDE7DA] p-1">
        {(['create', 'migrate'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`relative flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === m ? 'text-white' : 'text-[#6B6560] hover:text-[#1C1A17]'
            }`}
          >
            {mode === m && (
              <motion.span
                layoutId="form-tab"
                className="absolute inset-0 rounded-full bg-[#D10E63]"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{m === 'create' ? t.tabCreate : t.tabMigrate}</span>
          </button>
        ))}
      </div>

      {mode === 'create' ? (
        <>
      {/* Header — a real face makes deploying feel personal */}
      <div className="mb-5 flex items-center gap-3.5">
        <div className="relative shrink-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={collaboratorAvatar}
              src={collaboratorAvatar || '/placeholder.svg'}
              alt={`${collaboratorName}, ${role}`}
              className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[#F5F1E8] bg-[#B8B0A2]">
            <span className="sr-only">{lang === 'fr' ? 'En attente de déploiement' : 'Pending deployment'}</span>
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-snug text-[#1C1A17] text-balance">
            {t.formTitlePrefix} {collaboratorName}
          </h3>
          {/* Hosting zone — secondary info, must not compete with the name */}
          <div className="group mt-0.5 flex items-center gap-1.5 text-xs text-[#8A8175]">
            <span className="flex items-center gap-1.5">
              <img
                src={flagUrl(selectedCountry.code) || "/placeholder.svg"}
                alt=""
                aria-hidden="true"
                className="h-3 w-[18px] shrink-0 rounded-[2px] object-cover ring-1 ring-black/5"
              />
              <span className="font-medium">{selectedCountry[lang]}</span>
            </span>
            <FieldInfo text={t.locationInfo} />
            <span className="relative">
              <button
                type="button"
                onClick={() => setLocationOpen((v) => !v)}
                className="font-medium text-[#D10E63] opacity-0 transition-opacity duration-150 hover:text-[#A50B4E] focus:opacity-100 focus:outline-none focus:underline group-hover:opacity-100 aria-expanded:opacity-100"
                aria-haspopup="listbox"
                aria-expanded={locationOpen}
              >
                {t.locationChange}
              </button>
              {locationOpen && (
                <>
                  <span
                    className="fixed inset-0 z-10"
                    aria-hidden="true"
                    onClick={() => setLocationOpen(false)}
                  />
                  <ul
                    role="listbox"
                    className="absolute left-0 top-full z-20 mt-1.5 w-44 overflow-hidden rounded-lg border border-[#DDD5CA] bg-white py-1 shadow-lg"
                  >
                    {COUNTRIES.map((c) => (
                      <li key={c.code}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={c.code === country}
                          onClick={() => {
                            setCountry(c.code)
                            setCountryTouched(true)
                            setLocationOpen(false)
                          }}
                          className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-[#F5F1E8] ${
                            c.code === country ? 'font-semibold text-[#1C1A17]' : 'text-[#4A453F]'
                          }`}
                        >
                          <img
                            src={flagUrl(c.code) || "/placeholder.svg"}
                            alt=""
                            aria-hidden="true"
                            className="h-3.5 w-[21px] shrink-0 rounded-[2px] object-cover ring-1 ring-black/5"
                          />
                          {c[lang]}
                          {c.code === country && (
                            <Check className="ml-auto h-3.5 w-3.5 text-[#D10E63]" strokeWidth={2.5} />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Domain — the root of the organization */}
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#6B6560]">
          {t.domainLabel}
          <FieldInfo text={t.domainHint} />
        </label>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder={t.domainPlaceholder}
          className="w-full rounded-lg border border-[#DDD5CA] bg-white px-4 py-3 text-base font-medium text-[#1C1A17] placeholder-[#B8B0A2] focus:border-[#D10E63] focus:outline-none focus:ring-1 focus:ring-[#D10E63]/30"
        />
        <AnimatePresence mode="wait">
          {analysisStep !== 0 && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 space-y-1.5 overflow-hidden rounded-lg border border-[#E6DFD1] bg-white/60 p-3"
            >
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#6B6560]">
                {analysisStep < 6 ? (
                  <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[#D10E63]" />
                ) : (
                  <Check className="h-3.5 w-3.5 shrink-0 text-[#2E7D4F]" strokeWidth={2.5} />
                )}
                {t.analysis.scanning}
              </div>
              {analysisLines.map((line) => (
                <AnimatePresence key={line.key}>
                  {analysisStep >= line.step && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-1.5 pl-5 text-xs text-[#8A8175]"
                    >
                      <Check className="h-3 w-3 shrink-0 text-[#2E7D4F]" strokeWidth={2.5} />
                      {line.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
              <AnimatePresence>
                {analysisStep >= 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 flex items-center gap-1.5 border-t border-[#E6DFD1] pt-2 text-xs font-semibold text-[#D10E63]"
                  >
                    <Sparkles className="h-3.5 w-3.5 shrink-0" />
                    {t.analysis.ready(collaboratorName, collaboratorIsFeminine)}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* First collaborator */}
      <div className="mb-5 mt-4">
        <div className="grid gap-3">
          {/* Name */}
          <div className="min-w-0 flex-1">
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#6B6560]">
              {t.nameLabel}
              <FieldInfo text={t.nameHint} />
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full rounded-lg border border-[#DDD5CA] bg-white py-3 pl-4 pr-28 text-sm text-[#1C1A17] placeholder-[#B8B0A2] focus:border-[#D10E63] focus:outline-none focus:ring-1 focus:ring-[#D10E63]/30"
              />
              <button
                type="button"
                onClick={suggestName}
                className="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-md px-2 py-1.5 text-xs font-semibold text-[#D10E63] transition-colors hover:bg-[#D10E63]/10"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t.suggestName}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#6B6560]">
              {t.roleLabel}
              <FieldInfo text={t.roleHint} />
            </label>
            <select
              value={roleIndex}
              onChange={(e) => setRoleIndex(Number(e.target.value))}
              className="w-full cursor-pointer appearance-none truncate rounded-lg border border-[#DDD5CA] bg-white pl-4 pr-10 py-3 text-sm font-medium text-[#1C1A17] transition-colors hover:border-[#C9BFB0] focus:border-[#D10E63] focus:outline-none focus:ring-2 focus:ring-[#D10E63]/20"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B6560' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1.2rem center',
              }}
            >
              {t.roleOptions.map((option, i) => (
                <option key={i} value={i}>
                  {option[collaboratorIsFeminine ? 'f' : 'm']}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* CTA Button — personalized with the collaborator's name */}
      <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] py-3 text-center font-semibold text-white transition-colors hover:bg-[#B00B52]">
        {t.ctaButton} {collaboratorName}
        <span aria-hidden="true">›</span>
      </button>
            <p className="mt-2 text-center text-xs text-[#8A8175]">{t.ctaDuration(collaboratorIsFeminine)}</p>
        </>
      ) : (
        <>
          {/* Migrate header */}
          <div className="mb-5">
            <h3 className="text-lg font-bold leading-snug text-[#1C1A17] text-balance">{t.migrateTitle}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#8A8175] text-pretty">{t.migrateSubtitle}</p>
          </div>

          {/* Current platform */}
          <div className="mb-4">
            <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-[#6B6560]">
              <ArrowRightLeft className="h-4 w-4 text-[#D10E63]" />
              {t.platformLabel}
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full rounded-lg border border-[#DDD5CA] bg-white px-4 py-3 text-sm text-[#1C1A17] focus:border-[#D10E63] focus:outline-none focus:ring-1 focus:ring-[#D10E63]/30"
            >
              {t.platformOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Current hosting — only for self-hostable tools (OpenClaw, Hermes) */}
          <AnimatePresence initial={false}>
            {(platform === 'OpenClaw' || platform === 'Hermes') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mb-4">
                  <span className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-[#6B6560]">
                    <Server className="h-4 w-4 text-[#D10E63]" />
                    {t.hostingLabel}
                  </span>
                  <div className="flex rounded-lg border border-[#DDD5CA] bg-[#EDE7DA] p-1">
                    {(['cloud', 'selfHosted'] as const).map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setCurrentHosting(h)}
                        className={`flex-1 rounded-md py-2 text-xs font-semibold transition-colors ${
                          currentHosting === h ? 'bg-white text-[#1C1A17] shadow-sm' : 'text-[#6B6560] hover:text-[#1C1A17]'
                        }`}
                      >
                        {t.hostingOptions[h]}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Domain */}
          <div className="mb-5">
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#6B6560]">
              {t.domainLabel}
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder={t.domainPlaceholder}
              className="w-full rounded-lg border border-[#DDD5CA] bg-white px-4 py-3 text-base font-medium text-[#1C1A17] placeholder-[#B8B0A2] focus:border-[#D10E63] focus:outline-none focus:ring-1 focus:ring-[#D10E63]/30"
            />
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] py-3 text-center font-semibold text-white transition-colors hover:bg-[#B00B52]">
            {t.migrateCta}
            <span aria-hidden="true">›</span>
          </button>
          <p className="mt-2 text-center text-xs text-[#8A8175]">{t.migrateReassurance}</p>
        </>
      )}
    </motion.div>
  )
}
