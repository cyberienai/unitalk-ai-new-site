'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { collaboratorHref, MARKETPLACE_COLLABORATOR_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { STORE_ITEMS, storeItemHref } from '@/lib/store-catalog'

type Lang = 'fr' | 'en'
type Bi = { fr: string; en: string }
type Category = {
  id: string
  title: Bi
  description: Bi
  search: Bi
  action: Bi
  explain: Bi
  missing?: { title: Bi; body: Bi; action: Bi; href: string }
  href: string
  accent: string
}

type MarketplaceItem = {
  key: string
  title: string
  description: string
  href?: string
  addHref?: string
  missionHref?: string
  meta: string
  origin?: string
  avatar?: string
  pending?: boolean
  status?: Bi
  keywords?: string[]
  highlights?: string[]
  highlightsLabel?: string
  score?: number
  starterMission?: string
  exampleResult?: string
}

const PAGE_SIZE = 12

const COLLABORATOR_PROFILE_EXAMPLES: Record<string, Bi[]> = {
  emma: [{ fr: 'Gestion administrative', en: 'Administration' }, { fr: 'Coordination de projets', en: 'Project coordination' }, { fr: 'Organisation de réunions', en: 'Meeting coordination' }],
  lea: [{ fr: 'Médias sociaux', en: 'Social media' }, { fr: 'Référencement naturel', en: 'SEO' }, { fr: 'Acquisition', en: 'Growth' }],
  hugo: [{ fr: 'Prospection', en: 'Prospecting' }, { fr: 'Gestion de comptes', en: 'Account management' }, { fr: 'Gestion CRM', en: 'CRM management' }],
  ines: [{ fr: 'Réussite client', en: 'Customer success' }, { fr: 'Support technique', en: 'Technical support' }],
  arthur: [{ fr: 'DevOps', en: 'DevOps' }, { fr: 'Analyse de données', en: 'Data analysis' }],
  nadia: [{ fr: 'Facturation', en: 'Billing' }, { fr: 'Comptabilité', en: 'Accounting' }, { fr: 'Contrôle de gestion', en: 'Management control' }],
  chloe: [{ fr: 'Opérations RH', en: 'People operations' }, { fr: 'Intégration', en: 'Onboarding' }, { fr: 'Formation', en: 'Training' }],
  iris: [{ fr: 'Recherche utilisateur', en: 'User research' }, { fr: 'Assurance qualité', en: 'Quality assurance' }],
  lucas: [{ fr: 'Gestion de projet', en: 'Project management' }, { fr: 'Achats', en: 'Procurement' }, { fr: 'Logistique', en: 'Logistics' }],
  marcus: [{ fr: 'Gestion des contrats', en: 'Contract management' }, { fr: 'Conformité RGPD', en: 'GDPR compliance' }],
}

const COLLABORATOR_PROOFS: Record<string, { mission: Bi; result: Bi }> = {
  emma: { mission: { fr: 'Préparer et suivre une réunion', en: 'Prepare and follow up a meeting' }, result: { fr: 'Ordre du jour et actions à valider', en: 'Agenda and actions ready for approval' } },
  lea: { mission: { fr: 'Construire un calendrier éditorial', en: 'Build an editorial calendar' }, result: { fr: 'Sujets, briefs et planning à valider', en: 'Topics, briefs and schedule ready for approval' } },
  hugo: { mission: { fr: 'Qualifier de nouveaux prospects', en: 'Qualify new prospects' }, result: { fr: 'Fiches CRM et relances préparées', en: 'CRM records and follow-ups prepared' } },
  ines: { mission: { fr: 'Traiter les demandes clients', en: 'Handle customer requests' }, result: { fr: 'Réponses préparées et cas sensibles isolés', en: 'Replies prepared and sensitive cases isolated' } },
  arthur: { mission: { fr: 'Corriger un bug prioritaire', en: 'Fix a priority bug' }, result: { fr: 'Correctif, tests et documentation prêts', en: 'Fix, tests and documentation ready' } },
  nadia: { mission: { fr: 'Relancer les factures impayées', en: 'Follow up overdue invoices' }, result: { fr: 'Relances préparées et litiges isolés', en: 'Follow-ups prepared and disputes isolated' } },
  chloe: { mission: { fr: 'Présélectionner des candidatures', en: 'Screen job applications' }, result: { fr: 'Candidatures qualifiées et entretiens préparés', en: 'Qualified applicants and interviews prepared' } },
  iris: { mission: { fr: 'Préparer une spécification produit', en: 'Prepare a product specification' }, result: { fr: 'Besoin, critères et recette structurés', en: 'Need, criteria and test plan structured' } },
  lucas: { mission: { fr: 'Suivre un projet transverse', en: 'Track a cross-functional project' }, result: { fr: 'Échéances, responsables et risques à jour', en: 'Deadlines, owners and risks up to date' } },
  marcus: { mission: { fr: 'Préparer une revue de contrat', en: 'Prepare a contract review' }, result: { fr: 'Clauses, échéances et points à valider', en: 'Clauses, deadlines and review points ready' } },
}

// Editorial demand order for French SMBs. Unknown future profiles stay at the end.
const PROFILE_DEMAND_ORDER = [
  'commercial',
  'gestionnaire-administratif',
  'assistante-de-direction',
  'support-client',
  'analyste-financier',
  'charge-prospection',
  'responsable-relation-client',
  'responsable-marketing',
  'responsable-projet',
  'responsable-crm',
  'integrateur-no-code-automatisation',
  'coordinateur-operations',
  'content-strategist',
  'responsable-seo',
  'redacteur-web',
  'community-manager',
  'chef-projet-digital',
  'responsable-editorial',
  'gestionnaire-campagnes-publicitaires',
  'responsable-acquisition',
  'webmaster',
  'analyste-web',
  'charge-de-recrutement',
  'consultant-strategie-digitale',
  'charge-formation',
  'developpeur',
  'conseillere-adoption-ia',
  'conseiller-transformation-ia',
  'coordinatrice-missions',
] as const

const PROFILE_DEMAND_RANK = new Map<string, number>(PROFILE_DEMAND_ORDER.map((slug, index) => [slug, index]))

const MODEL_ITEMS = [
  { key: 'gpt', title: 'GPT', maker: 'OpenAI', meta: 'Texte · Vision · Code' },
  { key: 'claude', title: 'Claude', maker: 'Anthropic', meta: 'Texte · Analyse · Code' },
  { key: 'gemini', title: 'Gemini', maker: 'Google', meta: 'Texte · Vision · Multimodal' },
  { key: 'mistral', title: 'Mistral', maker: 'Mistral AI', meta: 'Texte · Code · Europe' },
  { key: 'deepseek', title: 'DeepSeek', maker: 'DeepSeek', meta: 'Raisonnement · Code' },
  { key: 'llama', title: 'Llama', maker: 'Meta', meta: 'Open weights · Texte' },
] as const

const STORE_CATEGORIES: Category[] = [
  {
    id: 'collaborateurs-ia', title: { fr: 'Collaborateurs IA', en: 'AI Collaborators' },
    description: { fr: 'Choisissez un Collaborateur IA de référence, puis faites-le évoluer avec les profils métier et les compétences adaptés à ses missions.', en: 'Choose a reference AI Collaborator, then evolve it with the job profiles and skills suited to its missions.' },
    search: { fr: 'Rechercher un Collaborateur IA', en: 'Search AI Collaborators' }, action: { fr: 'Voir son profil', en: 'View profile' }, explain: { fr: 'Comprendre le Collaborateur IA', en: 'Understand the AI Collaborator' },
    href: '/collaborateurs-ia', accent: '#D10E63',
  },
  {
    id: 'profils-metier', title: { fr: 'Profils métier', en: 'Job profiles' },
    description: { fr: 'Un profil métier de référence pour chaque métier de la connaissance.', en: 'One reference job profile for every knowledge-work profession.' },
    search: { fr: 'Rechercher un profil métier', en: 'Search job profiles' }, action: { fr: 'Découvrir ce profil', en: 'Explore this profile' }, explain: { fr: 'Comprendre les profils métier', en: 'Understand job profiles' },
    missing: { title: { fr: 'Le profil métier dont vous avez besoin manque ?', en: 'Can’t find the job profile you need?' }, body: { fr: 'Décrivez le rôle, les responsabilités et les limites attendues. Alma vous aide à préparer un profil adapté à votre entreprise.', en: 'Describe the expected role, responsibilities and boundaries. Alma helps you prepare a profile tailored to your organization.' }, action: { fr: 'Créer un profil métier', en: 'Create a job profile' }, href: '/decouvrir?source=marketplace&intention=nouveau-profil-metier' },
    href: '/collaborateurs-ia/profils-metier', accent: '#C80B5B',
  },
  {
    id: 'competences', title: { fr: 'Compétences', en: 'Skills' },
    description: { fr: 'Des savoir-faire précis, testés, versionnés et réutilisables.', en: 'Precise, tested, versioned and reusable know-how.' },
    search: { fr: 'Rechercher une compétence', en: 'Search skills' }, action: { fr: 'Ajouter à un Collaborateur IA', en: 'Add to an AI Collaborator' }, explain: { fr: 'Comprendre les compétences', en: 'Understand skills' },
    missing: { title: { fr: 'Une compétence vous manque ?', en: 'Missing a skill?' }, body: { fr: 'Expliquez le savoir-faire attendu. Alma vous aide à le transformer en compétence claire, testable et réutilisable.', en: 'Describe the know-how you need. Alma helps turn it into a clear, testable and reusable skill.' }, action: { fr: 'Créer une compétence', en: 'Create a skill' }, href: '/decouvrir?source=marketplace&intention=nouvelle-competence' },
    href: '/collaborateurs-ia/competences', accent: '#6246B5',
  },
  {
    id: 'applications', title: { fr: 'Applications', en: 'Applications' },
    description: { fr: 'Les outils, connecteurs et applications métier autorisés.', en: 'Approved tools, connectors and business applications.' },
    search: { fr: 'Rechercher une application', en: 'Search applications' }, action: { fr: 'Voir l’application', en: 'View application' }, explain: { fr: 'Comprendre les applications', en: 'Understand applications' },
    missing: { title: { fr: 'Votre application n’est pas encore proposée ?', en: 'Is your application not listed yet?' }, body: { fr: 'Indiquez l’outil à connecter et l’usage visé. Nous vérifions les accès, les actions disponibles et les conditions d’intégration.', en: 'Tell us which tool to connect and the intended use. We review access, available actions and integration requirements.' }, action: { fr: 'Demander une intégration', en: 'Request an integration' }, href: '/decouvrir?source=marketplace&intention=nouvelle-application' },
    href: '/collaborateurs-ia/applications', accent: '#B7501E',
  },
  {
    id: 'modeles-ia', title: { fr: 'Modèles IA', en: 'AI models' },
    description: { fr: 'Les modèles IA autorisés pour raisonner, analyser, produire et agir.', en: 'Approved AI models for reasoning, analysis, creation and action.' },
    search: { fr: 'Rechercher un modèle IA', en: 'Search AI models' }, action: { fr: 'Découvrir le modèle', en: 'Explore model' }, explain: { fr: 'Comprendre les modèles IA', en: 'Understand AI models' },
    missing: { title: { fr: 'Vous souhaitez utiliser un autre modèle IA ?', en: 'Want to use another AI model?' }, body: { fr: 'Partagez le modèle ou le fournisseur souhaité. Nous étudions sa compatibilité, son coût et ses conditions d’accès.', en: 'Share the model or provider you want. We assess compatibility, cost and access requirements.' }, action: { fr: 'Proposer un modèle', en: 'Suggest a model' }, href: '/decouvrir?source=marketplace&intention=nouveau-modele-ia' },
    href: '/modeles-ia', accent: '#1D6692',
  },
  {
    id: 'serveurs-ia', title: { fr: 'Serveurs IA', en: 'AI servers' },
    description: { fr: 'Des environnements privés dimensionnés pour vos Collaborateurs IA et leurs applications.', en: 'Private environments sized for your AI Collaborators and their applications.' },
    search: { fr: 'Rechercher un serveur IA', en: 'Search AI servers' }, action: { fr: 'Voir le serveur', en: 'View server' }, explain: { fr: 'Comprendre les serveurs IA', en: 'Understand AI servers' },
    href: '/collaborateurs-ia/serveurs', accent: '#216641',
  },
]

function itemsForCategory(categoryId: string, lang: Lang): MarketplaceItem[] {
  if (categoryId === 'collaborateurs-ia') {
    return MARKETPLACE_COLLABORATOR_SLUGS.map((slug) => ROLE_DETAILS[slug]).map((detail) => ({
      key: `collaborateur-${detail.slug}`,
      title: detail.name,
      description: detail.promise[lang],
      href: collaboratorHref(detail.slug),
      missionHref: `/decouvrir?collaborateur=${encodeURIComponent(detail.slug)}&source=marketplace-collaborator-card`,
      meta: detail.role[lang],
      origin: detail.department[lang],
      avatar: detail.avatar,
      keywords: [...detail.skills.map((skill) => skill[lang]), ...detail.tools, ...detail.missions.map((mission) => mission[lang])],
      highlights: (COLLABORATOR_PROFILE_EXAMPLES[detail.slug] ?? []).slice(0, 2).map((profile) => profile[lang]),
      highlightsLabel: lang === 'fr' ? 'Exemples d’évolution' : 'Examples of growth',
      starterMission: COLLABORATOR_PROOFS[detail.slug]?.mission[lang],
      exampleResult: COLLABORATOR_PROOFS[detail.slug]?.result[lang],
    }))
  }

  const storeType = categoryId === 'profils-metier' ? 'profil' : categoryId === 'competences' ? 'competence' : null
  if (storeType) {
    const items = STORE_ITEMS.filter((item) => item.type === storeType)
    if (storeType === 'profil') items.sort((a, b) => (PROFILE_DEMAND_RANK.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (PROFILE_DEMAND_RANK.get(b.slug) ?? Number.MAX_SAFE_INTEGER))
    return items.map((item) => ({
      key: `${item.type}-${item.slug}`, title: item.name[lang], description: item.description[lang], addHref: `/decouvrir?store=${item.slug}`,
      meta: item.roleInOrg?.[lang] ?? item.facet, origin: item.creator === 'unitalk' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community',
      status: item.commercialStatus === 'paid' ? { fr: 'Licence requise', en: 'License required' } : { fr: 'Inclus', en: 'Included' },
    }))
  }
  if (categoryId === 'applications') {
    return STORE_ITEMS.filter((item) => item.type === 'application' || item.type === 'integration').map((item) => ({
      key: `${item.type}-${item.slug}`, title: item.name[lang], description: item.description[lang], href: storeItemHref(item),
      meta: item.editor ?? (item.type === 'integration' ? (lang === 'fr' ? 'Intégration' : 'Integration') : item.facet),
      origin: item.creator === 'unitalk' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community', pending: item.commercialStatus === 'draft',
      status: item.commercialStatus === 'draft' ? { fr: 'Bientôt disponible', en: 'Coming soon' } : item.commercialStatus === 'paid' ? { fr: 'Licence requise', en: 'License required' } : { fr: 'Connectable', en: 'Connectable' },
    }))
  }
  if (categoryId === 'modeles-ia') {
    return MODEL_ITEMS.map((item) => ({
      key: item.key, title: item.title,
      description: lang === 'fr' ? `Famille de modèles ${item.maker}, disponible selon les droits, les clés et la configuration AI Gateway.` : `${item.maker} model family, available according to permissions, keys and AI Gateway configuration.`,
      href: '/modeles-ia', meta: item.meta, origin: item.maker, status: { fr: 'Selon votre fournisseur', en: 'Via your provider' },
    }))
  }
  if (categoryId === 'serveurs-ia') {
    return STORE_ITEMS.filter((item) => item.type === 'server').map((item) => ({
      key: `${item.type}-${item.slug}`, title: item.name[lang], description: item.description[lang], href: storeItemHref(item),
      meta: lang === 'fr' ? 'Infrastructure privée' : 'Private infrastructure', origin: 'Unitalk', pending: item.commercialStatus === 'draft',
      status: item.commercialStatus === 'draft' ? { fr: 'Sur demande', en: 'On request' } : { fr: 'Provisionnable', en: 'Provisionable' },
    }))
  }
  return []
}

const COPY = {
  fr: {
    heroTitle: 'Une identité qui reste. Des profils métier qui évoluent.',
    heroAccent: 'Des profils métier qui évoluent.',
    heroLead: 'Choisissez le Collaborateur IA qui rejoint votre entreprise. Faites ensuite évoluer ses profils métier et ses compétences au fil des missions.',
    noResults: 'Aucune création ne correspond à cette recherche.', showMore: 'Voir tout le catalogue', showLess: 'Revenir à la sélection',
    emptyTitle: 'Catalogue en préparation', emptyBody: 'Cette catégorie est définie dans l’architecture Unitalk. Ses premières créations publiables seront ajoutées ici.',
    clear: 'Effacer les filtres', available: 'Disponible', preparation: 'Bientôt disponible', addProfile: 'Ajouter à un Collaborateur IA',
    allDepartments: 'Tous les départements', result: 'résultat', results: 'résultats', almaTitle: 'Vous hésitez entre plusieurs Collaborateurs IA ?', almaBody: 'Décrivez la mission à Alma. Elle vous aide à choisir une identité de référence et à identifier les profils métier et compétences nécessaires.', almaAction: 'Décrire ma mission à Alma', finalTitle: 'Vous ne choisissez pas un métier définitif.', finalBody: 'Vous choisissez une identité qui conserve sa mémoire et évolue avec les profils métier et les compétences dont votre entreprise a besoin.', finalProfiles: 'Explorer les profils métier',
    heroProofs: ['Même identité', 'Mémoire conservée', 'Profils métier ajoutables', 'Droits gouvernés'], starterMission: 'Mission de départ', exampleResult: 'Exemple de résultat', ctaHelp: 'Alma vous aide d’abord à cadrer la mission.', compatibleProfiles: 'Voir les profils compatibles',
  },
  en: {
    heroTitle: 'One identity that remains. Job profiles that evolve.',
    heroAccent: 'Job profiles that evolve.',
    heroLead: 'Choose the AI Collaborator joining your organization. Then evolve its job profiles and skills as missions change.',
    noResults: 'No item matches this search.', showMore: 'View the full catalog', showLess: 'Back to the selection',
    emptyTitle: 'Catalog in preparation', emptyBody: 'This category is defined in the Unitalk architecture. Its first publishable creations will be added here.',
    clear: 'Clear filters', available: 'Available', preparation: 'Coming soon', addProfile: 'Add to an AI Collaborator',
    allDepartments: 'All departments', result: 'result', results: 'results', almaTitle: 'Choosing between several AI Collaborators?', almaBody: 'Describe the mission to Alma. She helps you choose a reference identity and identify the required job profiles and skills.', almaAction: 'Describe my mission to Alma', finalTitle: 'You are not choosing one permanent job.', finalBody: 'You are choosing an identity that retains its memory and evolves with the job profiles and skills your organization needs.', finalProfiles: 'Explore job profiles',
    heroProofs: ['Same identity', 'Memory retained', 'Job profiles can be added', 'Governed permissions'], starterMission: 'Starter mission', exampleResult: 'Example result', ctaHelp: 'Alma first helps you scope the mission.', compatibleProfiles: 'View compatible profiles',
  },
} as const

function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function scrollToCategoryTabs() {
  requestAnimationFrame(() => document.getElementById('marketplace-category-tabs')?.scrollIntoView({
    block: 'start',
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  }))
}

export function UnitalkStoreHub({ collaboratorsOnly = false }: { collaboratorsOnly?: boolean }) {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [activeCategoryId, setActiveCategoryId] = useState(STORE_CATEGORIES[0].id)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [catalogQuery, setCatalogQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState({ lang, value: '' })
  const department = departmentFilter.lang === lang ? departmentFilter.value : ''
  const setDepartment = (value: string) => setDepartmentFilter({ lang, value })
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeCategory = STORE_CATEGORIES.find((category) => category.id === activeCategoryId) ?? STORE_CATEGORIES[0]
  const categoryItems = useMemo(() => itemsForCategory(activeCategory.id, lang), [activeCategory.id, lang])
  const filteredItems = useMemo(() => {
    const query = normalizeSearch(catalogQuery.trim())
    const departmentItems = department ? categoryItems.filter((item) => item.origin === department) : categoryItems
    if (!query) return departmentItems
    const tokens = query.split(/\s+/)
    const matches: MarketplaceItem[] = []
    for (const item of departmentItems) {
      const fields = [item.title, item.meta, item.origin ?? '', ...(item.keywords ?? []), ...(item.highlights ?? []), item.description].map(normalizeSearch)
      if (!tokens.every((token) => fields.some((field) => field.includes(token)))) continue
      const points = tokens.reduce((total, token) => total + (fields[0].includes(token) ? 40 : 0) + (fields[1].includes(token) ? 25 : 0) + (fields[2].includes(token) ? 15 : 0) + (fields.slice(3, -1).some((field) => field.includes(token)) ? 15 : 0) + (fields.at(-1)?.includes(token) ? 5 : 0), 0)
      matches.push({ ...item, score: Math.min(99, Math.round(points / tokens.length)) })
    }
    return matches.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
  }, [catalogQuery, categoryItems, department])
  const visibleItems = filteredItems.slice(0, visibleCount)
  function clearFilters() {
    setCatalogQuery('')
    setDepartment('')
    setVisibleCount(PAGE_SIZE)
  }

  useEffect(() => {
    const selectFromLocation = (scroll = false) => {
      const categoryId = window.location.hash.slice(1) || (window.location.pathname === '/marketplace/collaborateurs-ia' ? 'collaborateurs-ia' : '')
      if (STORE_CATEGORIES.some((category) => category.id === categoryId)) {
        setActiveCategoryId(categoryId)
        setVisibleCount(PAGE_SIZE)
        setCatalogQuery('')
        setDepartmentFilter((current) => ({ ...current, value: '' }))
        if (scroll) scrollToCategoryTabs()
      }
    }
    selectFromLocation()
    const handleLocationChange = () => selectFromLocation(true)
    window.addEventListener('hashchange', handleLocationChange)
    window.addEventListener('popstate', handleLocationChange)
    return () => {
      window.removeEventListener('hashchange', handleLocationChange)
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  function selectCategory(categoryId: string, scroll = true) {
    setActiveCategoryId(categoryId)
    setVisibleCount(PAGE_SIZE)
    setCatalogQuery('')
    setDepartment('')
    const pathname = categoryId === 'collaborateurs-ia' ? '/marketplace/collaborateurs-ia' : '/marketplace'
    window.history.pushState(null, '', categoryId === 'collaborateurs-ia' ? pathname : `${pathname}#${categoryId}`)
    if (scroll) scrollToCategoryTabs()
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = STORE_CATEGORIES.length - 1
    const next = event.key === 'ArrowRight' ? (index === last ? 0 : index + 1) : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1) : event.key === 'Home' ? 0 : event.key === 'End' ? last : null
    if (next === null) return
    event.preventDefault()
    selectCategory(STORE_CATEGORIES[next].id, false)
    tabRefs.current[next]?.focus()
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#F3EFE6] font-sf text-[#1C1A17]">
      <section className={`bg-[#EAE3D4] px-5 sm:px-8 ${collaboratorsOnly ? 'pb-8 pt-20 sm:pb-10 sm:pt-24' : 'pb-12 pt-24 sm:pb-14 sm:pt-28'}`}>
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="max-w-6xl text-[clamp(2.8rem,5.7vw,5.25rem)] font-semibold leading-[.88] tracking-[-.07em] text-balance">{t.heroTitle.slice(0, -t.heroAccent.length)}<span className="text-[#D10E63] lg:block">{t.heroAccent}</span></h1>
          <p className="mt-7 max-w-6xl text-[16px] leading-7 text-[#4E483F] text-pretty lg:pr-8">{t.heroLead}</p>
          {collaboratorsOnly && <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-semibold text-[#625B50]">{t.heroProofs.map((proof) => <li key={proof} className="flex items-center gap-2"><span aria-hidden className="size-1.5 rounded-full bg-[#D10E63]"/>{proof}</li>)}</ul>}
        </div>
      </section>

      {!collaboratorsOnly && <div id="marketplace-category-tabs" className="sticky top-[76px] z-30 scroll-mt-[76px] border-y border-[#CFC5B5] bg-[#F3EFE6]/95 px-5 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl overflow-x-auto scrollbar-hide" role="tablist" aria-label={lang === 'fr' ? 'Catégories de la marketplace' : 'Marketplace categories'}>
            {STORE_CATEGORIES.map((category, index) => {
              const active = activeCategory.id === category.id
               return <button ref={(node) => { tabRefs.current[index] = node }} key={category.id} id={`marketplace-tab-${category.id}`} type="button" role="tab" tabIndex={active ? 0 : -1} aria-selected={active} aria-controls="marketplace-results" onKeyDown={(event) => handleTabKeyDown(event, index)} onClick={() => selectCategory(category.id)} className={`relative flex h-16 shrink-0 items-center px-4 text-sm font-semibold outline-none transition-colors first:pl-0 focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-inset sm:h-[72px] sm:px-6 sm:text-[15px] ${active ? 'text-[#1C1A17]' : 'text-[#766D61] hover:text-[#1C1A17]'}`}><span>{category.title[lang]}</span><span className={`absolute inset-x-4 bottom-0 h-[3px] transition-transform first:left-0 ${active ? 'scale-x-100' : 'scale-x-0'}`} style={{ backgroundColor: category.accent }} /></button>
             })}
        </div>
      </div>}

      <section id="categories" className="scroll-mt-40 px-5 pb-24 pt-10 sm:px-8 sm:pt-12 lg:pb-32">
        <div className="mx-auto w-full max-w-6xl">
           <div id="marketplace-results" role="tabpanel" aria-labelledby={`marketplace-tab-${activeCategory.id}`} className="scroll-mt-[184px]">
                {!collaboratorsOnly && <div className="mb-7"><h2 className="text-3xl font-semibold tracking-[-.04em] sm:text-4xl">{activeCategory.title[lang]}</h2><p className="mt-3 text-[15px] leading-7 text-[#625B50] xl:whitespace-nowrap">{activeCategory.description[lang]}</p></div>}
                {categoryItems.length > 0 && !collaboratorsOnly && <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">{activeCategory.id !== 'collaborateurs-ia' && <label className="relative block w-full max-w-md"><span className="sr-only">{activeCategory.search[lang]}</span><input type="search" value={catalogQuery} onChange={(event) => { setCatalogQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder={activeCategory.search[lang]} className="h-12 w-full rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-5 pr-12 text-sm outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#857C6E] focus:border-[var(--search-accent)] focus:bg-white focus:ring-4 focus:ring-[#1C1A17]/[.05]" style={{ '--search-accent': activeCategory.accent } as CSSProperties} />{catalogQuery && <button type="button" onClick={() => setCatalogQuery('')} aria-label={t.clear} className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-lg text-[#625B50] outline-none hover:bg-[#EAE3D4] focus-visible:ring-2 focus-visible:ring-[#D10E63]">×</button>}</label>}<Link href={activeCategory.href} className="inline-flex w-fit shrink-0 items-center border-b border-[#857C6E] pb-1 text-xs font-bold text-[#625B50] outline-none hover:text-[#1C1A17] focus-visible:ring-2 focus-visible:ring-[#D10E63] lg:ml-auto">{activeCategory.explain[lang]}<span aria-hidden="true" className="ml-3">↗</span></Link></div>}
                <p className="sr-only" aria-live="polite">{filteredItems.length} {filteredItems.length === 1 ? t.result : t.results}</p>

              {visibleItems.length > 0 ? <div className="mt-7 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleItems.map((item) => <MarketplaceItemCard key={item.key} item={item} lang={lang} category={activeCategory} labels={{ details: activeCategory.action[lang], available: t.available, preparation: t.preparation, addProfile: t.addProfile }} />)}{activeCategory.missing && <MissingItemCard content={activeCategory.missing} lang={lang} accent={activeCategory.accent} />}</div> : categoryItems.length > 0 ? <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3"><div className="rounded-2xl border border-dashed border-[#CFC5B5] bg-[#FAF8F3] p-8 md:col-span-2"><h3 className="text-xl font-bold">{t.noResults}</h3><button type="button" onClick={clearFilters} className="mt-4 text-sm font-bold text-[#B00C54] underline underline-offset-4">{t.clear}</button></div>{activeCategory.missing && <MissingItemCard content={activeCategory.missing} lang={lang} accent={activeCategory.accent} />}</div> : <div className="mt-7 rounded-2xl border border-[#D8D0C2] bg-[#FAF8F3] p-8"><h3 className="text-2xl font-bold">{t.emptyTitle}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#625B50]">{t.emptyBody}</p></div>}
               {activeCategory.id !== 'collaborateurs-ia' && filteredItems.length > PAGE_SIZE && <div className="mt-9 text-center"><button type="button" onClick={() => setVisibleCount((count) => count >= filteredItems.length ? PAGE_SIZE : filteredItems.length)} className="inline-flex min-h-12 items-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white transition-colors hover:bg-[#332F29]">{visibleCount >= filteredItems.length ? t.showLess : t.showMore}</button></div>}
               {activeCategory.id === 'collaborateurs-ia' && <><aside className="mt-8 flex flex-col gap-4 border-l-4 border-[#D10E63] bg-[#EAE3D4] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><h3 className="text-lg font-semibold">{t.almaTitle}</h3><p className="mt-1 max-w-2xl text-sm leading-6 text-[#625B50]">{t.almaBody}</p></div><Link href="/missions?composer=1&source=marketplace-advisor" className="shrink-0 rounded-full bg-[#D10E63] px-5 py-3 text-[13px] font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{t.almaAction}<span aria-hidden className="ml-2">→</span></Link></aside><section className="mt-10 rounded-[24px] bg-[#181615] p-7 text-white sm:p-9 lg:flex lg:items-end lg:justify-between lg:gap-10"><div><h3 className="max-w-3xl text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[.98] tracking-[-.05em]">{t.finalTitle}</h3><p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#CFC6B8]">{t.finalBody}</p></div><Link href="/marketplace#profils-metier" className="mt-7 inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#F3EFE6] px-6 text-[13px] font-bold text-[#181615] lg:mt-0">{t.finalProfiles}<span aria-hidden className="ml-2">→</span></Link></section></>}
          </div>
        </div>
      </section>
    </main>
  )
}

function MissingItemCard({ content, lang, accent }: { content: NonNullable<Category['missing']>; lang: Lang; accent: string }) {
  return (
    <Link href={content.href} className="group flex min-h-[240px] flex-col rounded-[16px] border border-dashed border-[#AFA596] bg-[#EAE3D4]/60 p-6 text-left transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--missing-accent)] hover:bg-[#EAE3D4] sm:min-h-[255px]" style={{ '--missing-accent': accent } as CSSProperties}>
      <p className="font-mono text-[9px] font-bold uppercase tracking-[.16em]" style={{ color: accent }}>{lang === 'fr' ? 'Sur demande' : 'On request'}</p>
      <h3 className="mt-5 text-[23px] font-semibold leading-[1.08] tracking-[-.04em]">{content.title[lang]}</h3>
      <p className="mt-4 text-[13px] leading-6 text-[#625B50]">{content.body[lang]}</p>
      <span className="mt-auto border-t border-[#CFC5B5] pt-4 text-xs font-bold transition-colors group-hover:text-[var(--missing-accent)]">{content.action[lang]}<span aria-hidden="true" className="ml-2">→</span></span>
    </Link>
  )
}

function MarketplaceItemCard({ item, lang, category, labels }: { item: MarketplaceItem; lang: Lang; category: Category; labels: { details: string; available: string; preparation: string; addProfile: string } }) {
  const hasDirectAdd = Boolean(item.addHref)
  const content = (
    <>
      <div>
        {item.avatar && <div className="mb-5 flex items-center gap-4">{item.href ? <Link href={item.href} aria-label={`${labels.details} : ${item.title}`}><Image src={item.avatar} alt="" width={56} height={56} className="size-14 rounded-full object-cover ring-1 ring-[#D8D0C2]" /></Link> : <Image src={item.avatar} alt="" width={56} height={56} className="size-14 rounded-full object-cover ring-1 ring-[#D8D0C2]" />}<div className="min-w-0"><p className="font-mono text-[10px] font-black uppercase tracking-[.13em] text-[var(--profile-accent)]">{lang === 'fr' ? 'Département' : 'Department'} · {item.origin}</p><p className="mt-1.5 text-[13px] font-semibold text-[#625B50]">{item.meta}</p></div></div>}
        <h3 className="line-clamp-2 text-[26px] font-semibold leading-[1.04] tracking-[-.045em] text-[#1C1A17] transition-colors group-hover:text-[var(--profile-accent)]">{item.href ? <Link href={item.href}>{item.title}</Link> : item.title}</h3>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#625B50]">{item.description}</p>
        {item.starterMission && <dl className="mt-5 grid gap-2 rounded-xl bg-[#F0EBE1] p-3"><div><dt className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#857C6E]">{lang === 'fr' ? 'Mission de départ' : 'Starter mission'}</dt><dd className="mt-1 text-[13px] font-semibold leading-5 text-[#322E29]">{item.starterMission}</dd></div><div className="border-t border-[#D8D0C2] pt-2"><dt className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#857C6E]">{lang === 'fr' ? 'Exemple de résultat' : 'Example result'}</dt><dd className="mt-1 text-xs leading-5 text-[#625B50]">{item.exampleResult}</dd></div></dl>}
        {item.highlights && <div className="mt-4"><p className="font-mono text-[10px] font-black uppercase tracking-[.12em] text-[#766D61]">{item.highlightsLabel}</p><div className="mt-2 flex flex-wrap gap-1.5">{item.highlights.map((highlight) => <span key={highlight} className="rounded-full border border-[#D8D0C2] bg-[#FAF8F3] px-2.5 py-1 text-[11px] font-semibold text-[#4E483F]">{highlight}</span>)}</div><Link href="/marketplace#profils-metier" className="relative z-10 mt-3 inline-flex text-xs font-bold text-[#B00C54] underline decoration-[#D10E63]/25 underline-offset-4">{lang === 'fr' ? 'Voir les profils compatibles' : 'View compatible profiles'}</Link></div>}
      </div>
      <div className="mt-auto pt-8">
        <div className="border-t border-[#DED6C8] pt-4 transition-colors group-hover:border-[var(--profile-accent)]">
           {hasDirectAdd ? <Link href={item.addHref!} className="relative z-10 flex min-h-11 w-full items-center justify-center rounded-full bg-[#1C1A17] px-4 text-center text-[13px] font-bold text-white outline-none transition-colors hover:bg-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)]">{labels.addProfile}<span aria-hidden="true" className="ml-2">→</span></Link> : item.missionHref ? <div className="relative z-10"><Link href={item.missionHref} className="flex min-h-11 w-full items-center justify-center rounded-full bg-[#1C1A17] px-4 text-center text-[13px] font-bold text-white outline-none transition-colors hover:bg-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)]">{lang === 'fr' ? `Confier une mission à ${item.title}` : `Assign a mission to ${item.title}`}<span aria-hidden="true" className="ml-2">→</span></Link><p className="mt-2 text-center text-[11px] leading-4 text-[#766D61]">{lang === 'fr' ? 'Alma vous aide d’abord à cadrer la mission.' : 'Alma first helps you scope the mission.'}</p>{item.href && <Link href={item.href} className="mt-2 block text-center text-[13px] font-bold text-[#625B50] underline decoration-[#CFC5B5] underline-offset-4 outline-none transition-colors hover:text-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)]">{labels.details}</Link>}</div> : <div className="flex items-end justify-between gap-3"><span className="text-xs font-semibold text-[#625B50]">{item.status?.[lang] ?? (item.pending ? labels.preparation : labels.available)}</span>{item.href && <Link href={item.href} className="relative z-10 text-xs font-bold text-[#1C1A17] outline-none transition-colors hover:text-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)]">{labels.details}<span aria-hidden="true" className="ml-2">→</span></Link>}</div>}
        </div>
      </div>
    </>
  )
  const style = { '--profile-accent': category.accent } as CSSProperties
  const className = 'group relative flex min-h-[240px] flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-6 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[var(--profile-accent)] hover:bg-[#FFFDF9] hover:shadow-[0_18px_45px_-38px_rgba(28,26,23,.8)] sm:min-h-[255px]'
  return <article className={className} style={style}><div className="relative flex min-h-full flex-1 flex-col">{content}</div></article>
}
