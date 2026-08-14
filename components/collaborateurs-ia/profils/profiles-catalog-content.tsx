'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, CircleCheck, Mic, Search, Square } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import { useLanguage, type Lang } from '@/lib/language-context'
import {
  CREATOR_LABELS,
  DOMAIN_LABELS,
  STORE_ITEMS,
  storeItemHref,
  type StoreItem,
} from '@/lib/store-catalog'

const PAGE_SIZE = 12

type SpeechResultEvent = { results: ArrayLike<{ 0: { transcript: string } }> }
type SpeechRecognitionInstance = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechResultEvent) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === 'undefined') return null
  const speechWindow = window as typeof window & {
    SpeechRecognition?: new () => SpeechRecognitionInstance
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance
  }
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null
}
const FEATURED_SLUGS = [
  'assistante-de-direction',
  'commercial',
  'support-client',
  'responsable-seo',
  'responsable-crm',
  'responsable-editorial',
  'analyste-financier',
  'charge-de-recrutement',
  'coordinateur-operations',
  'chef-projet-digital',
  'analyste-web',
  'integrateur-no-code-automatisation',
]
const DOMAIN_ORDER = [
  'ventes',
  'relation-client',
  'marketing',
  'administration',
  'finance',
  'rh',
  'direction',
  'operations',
  'transformation',
  'conseil-projet',
  'acquisition',
  'contenu-social',
  'crm-cycle-vie',
  'web-ecommerce',
  'data-mesure',
  'developpement-integration',
]

const COPY = {
  fr: {
    kicker: 'Profils métier',
    title: 'Trouvez le profil métier prêt à prendre le relais.',
    lead: 'Commercial, support client, assistante de direction, marketing ou opérations : partez d’une responsabilité concrète et adaptez-la à votre entreprise avec Alma.',
    support: 'Vous ne recréez pas un agent à chaque besoin. Le même Collaborateur IA peut recevoir plusieurs profils métier, conserver son identité et progresser avec votre organisation.',
    benefits: ['29 profils prêts à adapter', 'Profils métier illimités', 'Méthodes et droits personnalisables', 'Validation humaine configurable'],
    explore: 'Trouver le bon profil',
    create: 'Décrire mon besoin à Alma',
    trial: '7 jours gratuits · Sans carte bancaire · Profils métier inclus',
    reassuranceLabel: 'Garanties des profils métier',
    reassurances: [
      ['Partez plus vite', 'Choisissez une responsabilité déjà structurée plutôt que de partir de zéro.'],
      ['Adaptez sans enfermer', 'Alma ajuste le périmètre, les méthodes, les applications et les validations.'],
      ['Gardez la continuité', 'L’identité IA et l’expérience validée restent attachées au Collaborateur IA.'],
    ],
    proofKicker: 'Profil métier publié',
    scope: 'Responsabilité',
    knowHow: 'Savoir-faire',
    missions: 'Missions possibles',
    creator: 'Créé par',
    modelKicker: 'Une identité qui évolue',
    modelTitle: 'Le profil porte la responsabilité. La mission donne le travail à accomplir.',
    modelLead: 'Une mission ne crée pas automatiquement une nouvelle identité. Le même Collaborateur IA peut exercer plusieurs profils métier, selon son rattachement et ses droits.',
    flow: [
      ['Identité IA', 'Lucas reste rattaché à votre entreprise'],
      ['Profil métier', 'Relation client devient une responsabilité durable'],
      ['Compétences', 'Qualifier, répondre et escalader selon vos méthodes'],
      ['Mission', 'Traiter les demandes reçues cette semaine'],
    ],
    catalogKicker: 'Catalogue',
    catalogTitle: 'Des responsabilités prêtes à adapter.',
    catalogLead: 'Choisissez un profil existant. Alma l’adapte ensuite aux méthodes, applications, droits et validations de votre Organisation.',
    catalogPrompt: 'Quel travail voulez-vous déléguer ?',
    search: 'Rechercher une responsabilité ou un savoir-faire…',
    voiceStart: 'Rechercher avec votre voix',
    voiceStop: 'Arrêter la dictée',
    listening: 'Je vous écoute…',
    almaSearchTitle: 'Vous ne connaissez pas le nom du profil ?',
    almaSearchBody: 'Décrivez simplement le travail à confier. Alma recherchera la responsabilité la plus proche et proposera les adaptations nécessaires.',
    almaSearchWithQuery: 'Alma peut partir de cette demande :',
    askAlma: 'Continuer avec Alma',
    pathsKicker: 'Trois parcours',
    pathsTitle: 'Utiliser, apprendre ou publier ?',
    pathsLead: 'Choisissez le parcours qui correspond à votre situation aujourd’hui.',
    paths: [
      { title: 'Créer ou adapter un profil', body: 'Partez d’un besoin ou d’un profil existant. Alma prépare la responsabilité adaptée à votre entreprise.', cta: 'Créer ou adapter avec Alma', href: '/decouvrir?source=profile-store-paths&intention=nouveau-profil-metier', featured: true },
      { title: 'Apprendre à créer', body: 'Apprenez à interviewer un expert, formaliser sa méthode, tester le profil et le versionner.', cta: 'Devenir Co-créateur IA', href: '/co-createur-ia' },
      { title: 'Publier un profil existant', body: 'Votre profil est déjà construit ? Préparez sa vérification et choisissez sa visibilité.', cta: 'Publier mon profil', href: '/collaborateurs-ia/profils-metier/publier' },
    ],
    allCreators: 'Tous les créateurs',
    sort: 'Trier les profils',
    selection: 'Sélection',
    all: 'Tous les profils',
    recent: 'Plus récents',
    alphabetical: 'Ordre alphabétique',
    profiles: 'profils',
    page: 'Page',
    knowHowLabel: 'Savoir-faire',
    missionLabel: 'Exemple de mission',
    relatedSkills: 'compétences liées',
    viewProfile: 'Voir ce profil',
    empty: 'Aucun profil métier ne correspond à votre recherche.',
    midTitle: 'Vous hésitez entre plusieurs profils ?',
    midBody: 'Décrivez simplement le travail attendu. Alma recherche le profil le plus proche et vous indique ce qui doit être adapté.',
    midCta: 'Demander à Alma',
    finalKicker: 'Votre responsabilité',
    finalTitle: 'Trouvez un profil existant ou construisez exactement celui qu’il vous faut.',
    finalBody: 'Alma commence par votre besoin réel, vérifie le catalogue, puis adapte le périmètre, les compétences, les applications et les règles de validation.',
    finalProofs: ['7 jours gratuits', 'Sans carte bancaire', 'Profils métier illimités'],
    finalCta: 'Décrire mon besoin à Alma',
    browseAgain: 'Revenir au catalogue',
    cocreator: 'Devenir Co-créateur IA',
  },
  en: {
    kicker: 'Job profiles',
    title: 'Find the job profile ready to take over.',
    lead: 'Sales, customer support, executive assistance, marketing or operations: start from a concrete responsibility and adapt it to your company with Alma.',
    support: 'You do not recreate an agent for every need. The same AI Collaborator can receive several job profiles, keep its identity and improve with your organization.',
    benefits: ['29 profiles ready to adapt', 'Unlimited job profiles', 'Custom methods and permissions', 'Configurable human approval'],
    explore: 'Find the right profile',
    create: 'Describe my need to Alma',
    trial: '7 days free · No credit card · Job profiles included',
    reassuranceLabel: 'Job profile guarantees',
    reassurances: [
      ['Start faster', 'Choose an already structured responsibility instead of starting from scratch.'],
      ['Adapt without locking in', 'Alma adjusts scope, methods, applications and approvals.'],
      ['Keep continuity', 'The AI identity and validated experience remain attached to the AI Collaborator.'],
    ],
    proofKicker: 'Published job profile',
    scope: 'Responsibility',
    knowHow: 'Know-how',
    missions: 'Possible missions',
    creator: 'Created by',
    modelKicker: 'An identity that evolves',
    modelTitle: 'The profile carries responsibility. The mission defines the work.',
    modelLead: 'A mission does not automatically create a new identity. The same AI Collaborator can exercise several job profiles according to its organization and permissions.',
    flow: [
      ['AI identity', 'Lucas remains attached to your company'],
      ['Job profile', 'Customer relations becomes a lasting responsibility'],
      ['Skills', 'Qualify, answer and escalate using your methods'],
      ['Mission', 'Handle requests received this week'],
    ],
    catalogKicker: 'Catalog',
    catalogTitle: 'Responsibilities ready to adapt.',
    catalogLead: 'Choose an existing profile. Alma then adapts it to your Organization’s methods, applications, permissions and approvals.',
    catalogPrompt: 'What work do you want to delegate?',
    search: 'Search a responsibility or know-how…',
    voiceStart: 'Search with your voice',
    voiceStop: 'Stop dictation',
    listening: 'Listening…',
    almaSearchTitle: 'Do not know the profile name?',
    almaSearchBody: 'Simply describe the work to hand over. Alma will find the closest responsibility and suggest the required adaptations.',
    almaSearchWithQuery: 'Alma can start from this request:',
    askAlma: 'Continue with Alma',
    pathsKicker: 'Three paths',
    pathsTitle: 'Use, learn or publish?',
    pathsLead: 'Choose the path that matches where you are today.',
    paths: [
      { title: 'Create or adapt a profile', body: 'Start from a need or an existing profile. Alma prepares the responsibility for your company.', cta: 'Create or adapt with Alma', href: '/decouvrir?source=profile-store-paths&intention=nouveau-profil-metier', featured: true },
      { title: 'Learn to create', body: 'Learn to interview an expert, formalize their method, test the profile and version it.', cta: 'Become an AI Co-creator', href: '/co-createur-ia' },
      { title: 'Publish an existing profile', body: 'Is your profile already built? Prepare it for verification and choose its visibility.', cta: 'Publish my profile', href: '/collaborateurs-ia/profils-metier/publier' },
    ],
    allCreators: 'All creators',
    sort: 'Sort profiles',
    selection: 'Selection',
    all: 'All profiles',
    recent: 'Most recent',
    alphabetical: 'Alphabetical',
    profiles: 'profiles',
    page: 'Page',
    knowHowLabel: 'Know-how',
    missionLabel: 'Mission example',
    relatedSkills: 'related skills',
    viewProfile: 'View this profile',
    empty: 'No job profile matches your search.',
    midTitle: 'Unsure between several profiles?',
    midBody: 'Simply describe the expected work. Alma finds the closest profile and shows you what should be adapted.',
    midCta: 'Ask Alma',
    finalKicker: 'Your responsibility',
    finalTitle: 'Find an existing profile or build exactly the one you need.',
    finalBody: 'Alma starts with your real need, checks the catalog, then adapts the scope, skills, applications and approval rules.',
    finalProofs: ['7 days free', 'No credit card', 'Unlimited job profiles'],
    finalCta: 'Describe my need to Alma',
    browseAgain: 'Back to catalog',
    cocreator: 'Become an AI Co-creator',
  },
} as const

export function ProfilesCatalogContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [listening, setListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const deferredQuery = useDeferredValue(query)
  const domain = params.get('domaine') ?? 'selection'
  const creator = params.get('createur') === 'community' ? 'community' : params.get('createur') === 'unitalk' ? 'unitalk' : 'all'
  const sort = params.get('tri') === 'recent' ? 'recent' : params.get('tri') === 'az' ? 'az' : 'selection'
  const requestedPage = Math.max(1, Number.parseInt(params.get('page') ?? '1', 10) || 1)
  const profiles = useMemo(() => STORE_ITEMS.filter(item => item.type === 'profil'), [])
  const featured = useMemo(() => FEATURED_SLUGS.map(slug => profiles.find(profile => profile.slug === slug)).filter(Boolean) as StoreItem[], [profiles])
  const presentDomains = useMemo(() => new Set(profiles.map(profile => profile.facet)), [profiles])
  const domains = DOMAIN_ORDER.filter(domainKey => presentDomains.has(domainKey))
  const proof = profiles.find(profile => profile.slug === 'responsable-seo') ?? profiles[0]
  const almaHref = `/decouvrir?source=profile-store-search&intention=nouveau-profil-metier${query.trim() ? `&q=${encodeURIComponent(query.trim())}` : ''}`

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition()
    if (!SpeechRecognition) return
    setVoiceSupported(true)
    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = event => {
      let transcript = ''
      for (let index = 0; index < event.results.length; index++) transcript += event.results[index][0].transcript
      setQuery(transcript)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition
    return () => {
      recognition.abort()
      recognitionRef.current = null
    }
  }, [lang])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if ((params.get('q') ?? '') !== query) updateParams({ q: query || null, page: null })
    }, 250)
    return () => window.clearTimeout(timer)
  }, [query])

  const results = useMemo(() => {
    const base = domain === 'selection' && !deferredQuery.trim() ? featured : profiles
    return base
      .filter(profile => domain === 'selection' || domain === 'all' || profile.facet === domain)
      .filter(profile => creator === 'all' || profile.creator === creator)
      .filter(profile => !deferredQuery.trim() || profileSearch(profile, deferredQuery, lang))
      .sort((a, b) => sort === 'recent' ? b.dateAdded.localeCompare(a.dateAdded) : sort === 'az' ? profileName(a, lang).localeCompare(profileName(b, lang), lang) : a.order - b.order)
  }, [creator, deferredQuery, domain, featured, lang, profiles, sort])

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const page = Math.min(requestedPage, pageCount)
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function updateParams(changes: Record<string, string | null>) {
    const next = new URLSearchParams(params.toString())
    for (const [key, value] of Object.entries(changes)) value ? next.set(key, value) : next.delete(key)
    router.replace(`${pathname}${next.size ? `?${next}` : ''}`, { scroll: false })
  }

  function toggleListening() {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (listening) {
      recognition.stop()
      return
    }
    setListening(true)
    try {
      recognition.start()
    } catch {
      setListening(false)
    }
  }

  return <main className="overflow-hidden bg-[#F3EFE6] font-sf text-[#1C1A17]">
    <section className="relative px-5 pb-16 pt-24 sm:px-8 sm:pt-28"><div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]"/><div className="editorial-shell relative grid items-center gap-12 lg:grid-cols-[.88fr_1.12fr] lg:gap-20"><div><Kicker>{t.kicker}</Kicker><h1 className="hero-heading mt-5 whitespace-pre-line">{t.title}</h1><p className="mt-6 max-w-xl text-[17px] leading-8 text-[#4E483F]">{t.lead}</p><p className="mt-4 max-w-xl text-[15px] leading-7 text-[#4E483F]">{t.support}</p><div className="mt-8 flex flex-wrap items-center gap-5"><a href="#profiles-catalog" className="inline-flex min-h-12 items-center rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white">{t.explore} →</a><Link href="/inscription?source=profile-store&intention=nouveau-profil-metier" className="text-sm font-bold text-[#B00C54] underline-offset-4 hover:underline">{t.create}</Link></div></div>{proof&&<ProfileProof profile={proof} lang={lang}/>}</div></section>

    <section className="border-y border-[#DED6C8] bg-[#151310] px-5 py-14 text-[#FAF8F3] sm:px-8"><div className="editorial-shell"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#F2A4C5]">{t.modelKicker}</p><h2 className="mt-5 max-w-4xl text-[32px] font-semibold leading-[1.08] tracking-[-.035em] sm:text-[40px]">{t.modelTitle}</h2><p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#CFC6B8]">{t.modelLead}</p><div className="mt-9 grid gap-px overflow-hidden rounded-[18px] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">{t.flow.map(([label, body], index) => <article key={label} className="bg-[#211E1B] p-5"><p className="font-mono text-[10px] font-bold text-[#F2A4C5]">0{index + 1}</p><h3 className="mt-5 text-lg font-semibold">{label}</h3><p className="mt-3 text-sm leading-6 text-[#CFC6B8]">{body}</p></article>)}</div></div></section>

    <section id="profiles-catalog" className="scroll-mt-24 px-5 py-16 sm:px-8"><div className="editorial-shell"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#B00C54]">{t.catalogKicker}</p><h2 className="mt-5 text-[34px] font-semibold tracking-[-.04em] sm:text-[40px]">{t.catalogTitle}</h2><p className="mt-4 max-w-3xl text-[16px] leading-7 text-[#4E483F]">{t.catalogLead}</p><div className="mt-8 flex flex-col gap-3 lg:flex-row"><label className="relative min-w-0 flex-1"><span className="sr-only">{t.search}</span><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6E665A]"/><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={listening ? t.listening : t.search} className="h-12 w-full rounded-full border border-[#D8D0C2] bg-[#FFFDF9] pl-11 pr-14 text-sm outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15"/>{voiceSupported&&<button type="button" onClick={toggleListening} aria-label={listening?t.voiceStop:t.voiceStart} aria-pressed={listening} className={`absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] ${listening?'bg-[#D10E63] text-white':'text-[#B00C54] hover:bg-[#FBEAF1]'}`}>{listening?<Square className="size-3.5" fill="currentColor"/>:<Mic className="size-4"/>}</button>}</label><select aria-label={t.allCreators} value={creator} onChange={event => updateParams({ createur: event.target.value === 'all' ? null : event.target.value, page: null })} className="h-12 rounded-full border border-[#D8D0C2] bg-[#FFFDF9] px-4 text-sm font-semibold"><option value="all">{t.allCreators}</option><option value="unitalk">Unitalk</option><option value="community">{lang === 'fr' ? 'Communauté' : 'Community'}</option></select><select aria-label={t.sort} value={sort} onChange={event => updateParams({ tri: event.target.value === 'selection' ? null : event.target.value, page: null })} className="h-12 rounded-full border border-[#D8D0C2] bg-[#FFFDF9] px-4 text-sm font-semibold"><option value="selection">{t.selection}</option><option value="recent">{t.recent}</option><option value="az">{t.alphabetical}</option></select></div><div className="scrollbar-hide mt-5 flex gap-2 overflow-x-auto pb-1"><Filter active={domain === 'selection'} onClick={() => updateParams({ domaine: null, page: null })}>{t.selection}</Filter><Filter active={domain === 'all'} onClick={() => updateParams({ domaine: 'all', page: null })}>{t.all}</Filter>{domains.map(domainKey => <Filter key={domainKey} active={domain === domainKey} onClick={() => updateParams({ domaine: domainKey, page: null })}>{DOMAIN_LABELS[domainKey]?.[lang] ?? domainKey}</Filter>)}</div><div className="mt-7 flex justify-between"><p aria-live="polite" className="text-sm font-semibold">{results.length} {t.profiles}</p><p className="text-xs text-[#857C6E]">{t.page} {page}/{pageCount}</p></div>{visible.length ? <div className="mt-4 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map(profile => <ProfileCard key={profile.slug} profile={profile} lang={lang}/>)}</div> : <EmptyState lang={lang} query={query}/>}<Pagination page={page} pageCount={pageCount} onPage={value => updateParams({ page: value === 1 ? null : String(value) })}/></div></section>

    <section className="px-5 pb-16 sm:px-8"><div className="editorial-shell overflow-hidden rounded-3xl border border-[#D8D0C2] bg-[#EAE3D4]"><div className="grid lg:grid-cols-[1fr_.9fr]"><div className="p-7 sm:p-10"><div className="flex items-center gap-3"><Image src="/alma-avatar.png" alt="Alma" width={48} height={48} className="size-12 rounded-full object-cover ring-2 ring-[#D10E63]/20"/><div><p className="font-sf text-lg font-bold">Alma</p><p className="text-xs font-semibold text-[#6E665A]">{lang==='fr'?'Coordinatrice de missions IA':'AI mission coordinator'}</p></div></div><h2 className="mt-6 text-[28px] font-semibold leading-[1.08] tracking-[-.035em] sm:text-[34px]">{t.almaSearchTitle}</h2><p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#625B50]">{t.almaSearchBody}</p>{query.trim()&&<div className="mt-5 rounded-2xl border border-[#D8D0C2] bg-[#FAF8F3] p-4"><p className="font-mono text-[9px] font-bold uppercase tracking-[.15em] text-[#857C6E]">{t.almaSearchWithQuery}</p><p className="mt-2 text-sm font-semibold leading-6">« {query.trim()} »</p></div>}<Link href={almaHref} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white">{t.askAlma}<ArrowRight className="ml-2 size-4"/></Link></div><div className="border-t border-[#D8D0C2] bg-[#FAF8F3] p-7 lg:border-l lg:border-t-0 sm:p-10"><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#B00C54]">{lang==='fr'?'Ce qu’Alma prépare':'What Alma prepares'}</p><ol className="mt-6 space-y-5">{(lang==='fr'?[['01','Comprendre le travail','Résultat attendu, fréquence et exceptions.'],['02','Trouver le profil proche','Responsabilité existante ou variante à créer.'],['03','Préparer son activation','Compétences, applications, droits et validations.']]:[['01','Understand the work','Expected outcome, frequency and exceptions.'],['02','Find the closest profile','Existing responsibility or a variant to create.'],['03','Prepare activation','Skills, applications, permissions and approvals.']]).map(([number,title,body])=><li key={number} className="grid grid-cols-[32px_1fr] gap-3"><span className="font-mono text-[10px] font-black text-[#D10E63]">{number}</span><div><h3 className="text-sm font-bold">{title}</h3><p className="mt-1 text-xs leading-5 text-[#625B50]">{body}</p></div></li>)}</ol></div></div></div></section>

    <section className="border-t border-[#D8D0C2] bg-[#FAF8F3] px-5 py-16 sm:px-8 sm:py-20"><div className="editorial-shell"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#B00C54]">{t.pathsKicker}</p><h2 className="mt-5 text-[34px] font-semibold leading-[1.08] tracking-[-.04em] sm:text-[44px]">{t.pathsTitle}</h2><p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#4E483F]">{t.pathsLead}</p><div className="mt-10 grid gap-5 lg:grid-cols-3">{t.paths.map((path,index)=><article key={path.title} className={`flex min-h-[300px] flex-col rounded-3xl border p-6 sm:p-7 ${'featured' in path&&path.featured?'border-[#D10E63] bg-[#181615] text-[#FAF8F3] shadow-[0_22px_55px_-35px_rgba(209,14,99,.5)]':'border-[#D8D0C2] bg-[#F3EFE6]'}`}><p className={`font-mono text-[10px] font-black tracking-[.16em] ${'featured' in path&&path.featured?'text-[#F2A4C5]':'text-[#B00C54]'}`}>0{index+1}</p><h3 className="mt-6 text-2xl font-bold tracking-[-.025em]">{path.title}</h3><p className={`mt-4 text-sm leading-7 ${'featured' in path&&path.featured?'text-[#CFC6B8]':'text-[#625B50]'}`}>{path.body}</p><Link href={path.href} className={`mt-auto inline-flex min-h-11 items-center pt-7 text-sm font-bold ${'featured' in path&&path.featured?'text-[#F2A4C5]':'text-[#B00C54]'}`}>{path.cta}<ArrowRight className="ml-2 size-4"/></Link></article>)}</div></div></section>

    <section className="border-t border-white/10 bg-[#181615] px-5 py-16 text-[#FAF8F3] sm:px-8 sm:py-20"><div className="editorial-shell"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#F2A4C5]">{t.finalKicker}</p><div className="mt-5 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><h2 className="max-w-3xl text-[34px] font-semibold leading-[1.08] tracking-[-.04em] sm:text-[44px]">{t.finalTitle}</h2><p className="mt-5 max-w-3xl text-[16px] leading-7 text-[#CFC6B8]">{t.finalBody}</p><ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#E7E0D5]">{t.finalProofs.map(proof=><li key={proof} className="flex items-center gap-2"><Check className="size-4 text-[#F2A4C5]"/>{proof}</li>)}</ul></div><div className="flex min-w-[260px] flex-col gap-3"><Link href="/decouvrir?source=profile-store-final&intention=nouveau-profil-metier" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white">{t.finalCta}<ArrowRight className="ml-2 size-4"/></Link><a href="#profiles-catalog" className="text-center text-sm font-bold text-[#E7E0D5] underline decoration-[#F2A4C5]/40 underline-offset-4">{t.browseAgain}</a><Link href="/co-createur-ia" className="text-center text-xs font-semibold text-[#AFA397] hover:text-white">{t.cocreator}</Link></div></div></div></section>
  </main>
}

function ProfileProof({ profile, lang }: { profile: StoreItem; lang: Lang }) {
  const t = COPY[lang]
  return <article className="rounded-[18px] border border-[#DED6C8] bg-[#FAF8F3] p-6 shadow-[0_22px_60px_-48px_rgba(28,26,23,.5)] sm:p-8"><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#B00C54]">{t.proofKicker}</p><h2 className="mt-4 text-2xl font-semibold">{profileName(profile, lang)}</h2><p className="mt-3 text-sm leading-6 text-[#4E483F]">{profile.description[lang]}</p><dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-[#DED6C8] bg-[#DED6C8] sm:grid-cols-2"><ProofField label={t.scope} values={[profile.roleInOrg?.[lang] ?? profile.description[lang]]}/><ProofField label={t.knowHow} values={profile.knowHow?.slice(0, 3).map(item => item[lang]) ?? []}/><ProofField label={t.missions} values={profile.exampleMissions?.slice(0, 2).map(item => item[lang]) ?? []}/><ProofField label={t.creator} values={[CREATOR_LABELS[profile.creator][lang]]}/></dl></article>
}

function ProofField({ label, values }: { label: string; values: string[] }) { return <div className="bg-[#FAF8F3] p-4"><dt className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#857C6E]">{label}</dt><dd className="mt-3 text-xs font-semibold leading-5">{values.length ? values.join(' · ') : '—'}</dd></div> }

function ProfileCard({ profile, lang }: { profile: StoreItem; lang: Lang }) {
  const t = COPY[lang]
  const name = profileName(profile, lang)
  const relatedSkills = profile.relatedSkills?.length ?? 0
  return <article className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[18px] border border-[#DED6C8] bg-[#FAF8F3] p-6 transition-[transform,border-color,box-shadow] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:origin-left before:scale-x-0 before:bg-[#D10E63] before:transition-transform hover:-translate-y-1 hover:border-[#D10E63]/35 hover:shadow-[0_18px_42px_-30px_rgba(28,26,23,.3)] hover:before:scale-x-100 focus-within:before:scale-x-100"><p className="font-mono text-[9px] font-bold uppercase tracking-[.16em] text-[#B00C54]">{DOMAIN_LABELS[profile.facet]?.[lang] ?? profile.facet}</p><h3 className="mt-4 text-xl font-semibold leading-7">{name}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-[#4E483F]">{profile.description[lang]}</p><div className="mt-5"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#857C6E]">{t.knowHowLabel}</p><p className="mt-2 line-clamp-2 text-xs leading-5 text-[#6E665A]">{profile.knowHow?.slice(0, 3).map(item => item[lang]).join(' · ') || '—'}</p></div><div className="mt-5"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#857C6E]">{t.missionLabel}</p><p className="mt-2 line-clamp-2 text-xs font-semibold leading-5">{profile.exampleMissions?.[0]?.[lang] ?? '—'}</p></div><div className="mt-auto flex items-center justify-between gap-3 border-t border-[#DED6C8] pt-4 text-xs text-[#6E665A]"><span>{CREATOR_LABELS[profile.creator][lang]}{relatedSkills ? ` · ${relatedSkills} ${t.relatedSkills}` : ''}</span><strong className="inline-flex items-center gap-1 text-[#B00C54]">{t.viewProfile}<ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1"/></strong></div><Link href={storeItemHref(profile)} aria-label={`${t.kicker}: ${name}`} className="absolute inset-0 rounded-[18px] outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"/></article>
}

function Filter({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) { return <button type="button" aria-pressed={active} onClick={onClick} className={`h-9 shrink-0 rounded-full border px-3.5 text-xs font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] ${active ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-[#FFFDF9] text-[#4E483F]'}`}>{children}</button> }
function Pagination({ page, pageCount, onPage }: { page: number; pageCount: number; onPage: (page: number) => void }) { if (pageCount <= 1) return null; return <nav aria-label="Pagination" className="mt-10 flex flex-wrap justify-center gap-2"><button type="button" disabled={page === 1} onClick={() => onPage(page - 1)} className="inline-flex h-10 items-center gap-1 rounded-full border border-[#D8D0C2] px-4 text-xs font-semibold disabled:opacity-35"><ArrowLeft className="size-3.5"/> Précédent</button>{Array.from({ length: pageCount }, (_, index) => index + 1).map(number => <button type="button" key={number} aria-current={page === number ? 'page' : undefined} aria-label={`Page ${number}`} onClick={() => onPage(number)} className={`size-10 rounded-full border text-xs font-bold ${page === number ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-[#FFFDF9]'}`}>{number}</button>)}<button type="button" disabled={page === pageCount} onClick={() => onPage(page + 1)} className="inline-flex h-10 items-center gap-1 rounded-full border border-[#D8D0C2] px-4 text-xs font-semibold disabled:opacity-35">Suivant <ArrowRight className="size-3.5"/></button></nav> }
function EmptyState({ lang, query }: { lang: Lang; query: string }) { const t = COPY[lang]; return <div role="status" className="mt-5 rounded-[18px] border border-[#DED6C8] bg-[#FAF8F3] p-10 text-center"><h3 className="text-xl font-semibold">{t.empty}</h3><Link href={`/inscription?source=profile-store&intention=nouveau-profil-metier&q=${encodeURIComponent(query)}`} className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#D10E63] px-5 text-sm font-bold text-white">{t.create} →</Link></div> }
function profileName(profile: StoreItem, lang: Lang) { return profile.labels?.neutral?.[lang] ?? profile.name[lang] }
function profileSearch(profile: StoreItem, query: string, lang: Lang) { const haystack = [profileName(profile, lang), profile.description[lang], profile.roleInOrg?.[lang], ...(profile.knowHow?.map(item => item[lang]) ?? []), ...(profile.exampleMissions?.map(item => item[lang]) ?? []), ...(profile.specializations?.map(item => item[lang]) ?? []), ...profile.keywords].filter(Boolean).join(' '); return normalize(haystack).includes(normalize(query.trim())) }
function normalize(value: string) { return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') }
