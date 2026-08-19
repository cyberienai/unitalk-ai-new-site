'use client'

import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AlmaInline } from '@/components/alma-inline'
import { useLanguage } from '@/lib/language-context'
import type { Lang as SiteLang } from '@/lib/language-context'
import { collaboratorHref, MARKETPLACE_COLLABORATOR_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { DOMAIN_LABELS, SKILL_CATEGORY_LABELS, STORE_ITEMS, storeItemHref } from '@/lib/store-catalog'

type Lang = 'fr' | 'en'
type Bi = { fr: string; en: string }
type Category = {
  id: string
  title: Bi
  description: Bi
  heroTitle: Bi
  heroAccent: Bi
  heroLead: Bi
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
  facetKey?: string
  profileKeys?: string[]
  input?: string
  result?: string
  proof?: string
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
const PROFILE_NAMES = new Map(STORE_ITEMS.filter((item) => item.type === 'profil').map((item) => [item.slug, item.name]))

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
    description: { fr: 'Choisissez le Collaborateur IA qui correspond à votre organisation, puis faites-le évoluer avec les profils métier et les compétences adaptés à ses missions.', en: 'Choose the AI Collaborator that fits your organization, then evolve it with the job profiles and skills suited to its missions.' },
    heroTitle: { fr: 'Choisissez un Collaborateur IA. Confiez-lui une mission concrète.', en: 'Choose an AI Collaborator. Give them a concrete mission.' },
    heroAccent: { fr: 'Confiez-lui une mission concrète.', en: 'Give them a concrete mission.' },
    heroLead: { fr: 'Votre Collaborateur IA peut être rattaché à une personne, une équipe, un département ou toute l’entreprise.', en: 'Your AI Collaborator can work with one person, a team, a department or your entire organization.' },
    search: { fr: 'Rechercher un Collaborateur IA', en: 'Search AI Collaborators' }, action: { fr: 'Voir son profil', en: 'View profile' }, explain: { fr: 'Comprendre le Collaborateur IA', en: 'Understand the AI Collaborator' },
    href: '/collaborateurs-ia', accent: '#D10E63',
  },
  {
    id: 'profils-metier', title: { fr: 'Profils métier', en: 'Job profiles' },
    description: { fr: 'Un profil métier de référence pour chaque métier de la connaissance.', en: 'One reference job profile for every knowledge-work profession.' },
    heroTitle: { fr: 'Ajoutez le bon profil métier. Faites évoluer ses responsabilités.', en: 'Add the right job profile. Evolve their responsibilities.' },
    heroAccent: { fr: 'Faites évoluer ses responsabilités.', en: 'Evolve their responsibilities.' },
    heroLead: { fr: 'Équipez un Collaborateur IA pour un métier précis, puis adaptez son rôle à mesure que vos missions et votre organisation évoluent.', en: 'Equip an AI Collaborator for a specific profession, then adapt the role as your missions and organization evolve.' },
    search: { fr: 'Rechercher un profil métier', en: 'Search job profiles' }, action: { fr: 'Découvrir ce profil', en: 'Explore this profile' }, explain: { fr: 'Comprendre les profils métier', en: 'Understand job profiles' },
    missing: { title: { fr: 'Le profil métier dont vous avez besoin manque ?', en: 'Can’t find the job profile you need?' }, body: { fr: 'Décrivez le rôle, les responsabilités et les limites attendues. Alma vous aide à préparer un profil adapté à votre entreprise.', en: 'Describe the expected role, responsibilities and boundaries. Alma helps you prepare a profile tailored to your organization.' }, action: { fr: 'Créer un profil métier', en: 'Create a job profile' }, href: '/decouvrir?source=marketplace&intention=nouveau-profil-metier' },
    href: '/collaborateurs-ia/profils-metier', accent: '#C80B5B',
  },
  {
    id: 'competences', title: { fr: 'Compétences', en: 'Skills' },
    description: { fr: 'Des méthodes précises, documentées et réutilisables, à valider dans votre contexte.', en: 'Precise, documented and reusable methods to validate in your context.' },
    heroTitle: { fr: 'Un savoir-faire précis. Réutilisable mission après mission.', en: 'Precise know-how. Reusable across missions.' },
    heroAccent: { fr: 'Réutilisable mission après mission.', en: 'Reusable across missions.' },
    heroLead: { fr: 'Choisissez une méthode que votre Collaborateur IA peut appliquer dans un contexte défini, avec un résultat attendu et vos validations.', en: 'Choose a method your AI Collaborator can apply in a defined context, with an expected outcome and your approvals.' },
    search: { fr: 'Rechercher une compétence', en: 'Search skills' }, action: { fr: 'Ajouter à un Collaborateur IA', en: 'Add to an AI Collaborator' }, explain: { fr: 'Comprendre les compétences', en: 'Understand skills' },
    missing: { title: { fr: 'Une compétence vous manque ?', en: 'Missing a skill?' }, body: { fr: 'Expliquez le savoir-faire attendu. Alma vous aide à le transformer en compétence claire, testable et réutilisable.', en: 'Describe the know-how you need. Alma helps turn it into a clear, testable and reusable skill.' }, action: { fr: 'Créer une compétence', en: 'Create a skill' }, href: '/decouvrir?source=marketplace&intention=nouvelle-competence' },
    href: '/collaborateurs-ia/competences', accent: '#6246B5',
  },
  {
    id: 'applications', title: { fr: 'Applications', en: 'Applications' },
    description: { fr: 'Les outils, connecteurs et applications métier autorisés.', en: 'Approved tools, connectors and business applications.' },
    heroTitle: { fr: 'Connectez les outils du travail. Choisissez ce qu’il peut y faire.', en: 'Connect the tools for the job. Choose what they can do.' },
    heroAccent: { fr: 'Choisissez ce qu’il peut y faire.', en: 'Choose what they can do.' },
    heroLead: { fr: 'Messagerie, CRM, gestion de projet ou création : attribuez uniquement les applications nécessaires à chaque Collaborateur IA.', en: 'Email, CRM, project management or creation: assign only the applications each AI Collaborator needs.' },
    search: { fr: 'Rechercher une application', en: 'Search applications' }, action: { fr: 'Voir l’application', en: 'View application' }, explain: { fr: 'Comprendre les applications', en: 'Understand applications' },
    missing: { title: { fr: 'Votre application n’est pas encore proposée ?', en: 'Is your application not listed yet?' }, body: { fr: 'Indiquez l’outil à connecter et l’usage visé. Nous vérifions les accès, les actions disponibles et les conditions d’intégration.', en: 'Tell us which tool to connect and the intended use. We review access, available actions and integration requirements.' }, action: { fr: 'Demander une intégration', en: 'Request an integration' }, href: '/decouvrir?source=marketplace&intention=nouvelle-application' },
    href: '/collaborateurs-ia/applications', accent: '#B7501E',
  },
  {
    id: 'modeles-ia', title: { fr: 'Modèles IA', en: 'AI models' },
    description: { fr: 'Les modèles IA autorisés pour raisonner, analyser, produire et agir.', en: 'Approved AI models for reasoning, analysis, creation and action.' },
    heroTitle: { fr: 'Choisissez le modèle adapté. Changez-le selon la mission.', en: 'Choose the right model. Change it for each mission.' },
    heroAccent: { fr: 'Changez-le selon la mission.', en: 'Change it for each mission.' },
    heroLead: { fr: 'Comparez les familles de modèles et attribuez à chaque Collaborateur IA la capacité adaptée au travail demandé.', en: 'Compare model families and give each AI Collaborator the capacity suited to the work at hand.' },
    search: { fr: 'Rechercher un modèle IA', en: 'Search AI models' }, action: { fr: 'Découvrir le modèle', en: 'Explore model' }, explain: { fr: 'Comprendre les modèles IA', en: 'Understand AI models' },
    missing: { title: { fr: 'Vous souhaitez utiliser un autre modèle IA ?', en: 'Want to use another AI model?' }, body: { fr: 'Partagez le modèle ou le fournisseur souhaité. Nous étudions sa compatibilité, son coût et ses conditions d’accès.', en: 'Share the model or provider you want. We assess compatibility, cost and access requirements.' }, action: { fr: 'Proposer un modèle', en: 'Suggest a model' }, href: '/decouvrir?source=marketplace&intention=nouveau-modele-ia' },
    href: '/modeles-ia', accent: '#1D6692',
  },
  {
    id: 'serveurs-ia', title: { fr: 'Serveurs IA', en: 'AI servers' },
    description: { fr: 'Des environnements privés dimensionnés pour vos Collaborateurs IA et leurs applications.', en: 'Private environments sized for your AI Collaborators and their applications.' },
    heroTitle: { fr: 'Donnez-leur un environnement privé. Dimensionné pour leur travail.', en: 'Give them a private environment. Sized for their work.' },
    heroAccent: { fr: 'Dimensionné pour leur travail.', en: 'Sized for their work.' },
    heroLead: { fr: 'Choisissez l’infrastructure qui héberge les fichiers, applications et ressources d’exécution de vos Collaborateurs IA.', en: 'Choose the infrastructure hosting your AI Collaborators’ files, applications and execution resources.' },
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
      missionHref: `/missions?composer=1&collaborateur=${encodeURIComponent(detail.slug)}&source=marketplace-collaborators`,
      meta: detail.role[lang],
      origin: detail.department[lang],
      avatar: detail.avatar,
      keywords: [...detail.skills.map((skill) => skill[lang]), ...detail.tools, ...detail.missions.map((mission) => mission[lang])],
      highlights: (COLLABORATOR_PROFILE_EXAMPLES[detail.slug] ?? []).slice(0, 2).map((profile) => profile[lang]),
      highlightsLabel: lang === 'fr' ? 'Exemples d’évolution' : 'Examples of growth',
      starterMission: detail.starterMission?.mission[lang],
      exampleResult: detail.starterMission?.result[lang],
    }))
  }

  const storeType = categoryId === 'profils-metier' ? 'profil' : categoryId === 'competences' ? 'competence' : null
  if (storeType) {
    const items = STORE_ITEMS.filter((item) => item.type === storeType)
    if (storeType === 'profil') items.sort((a, b) => (PROFILE_DEMAND_RANK.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (PROFILE_DEMAND_RANK.get(b.slug) ?? Number.MAX_SAFE_INTEGER))
    return items.map((item) => ({
      key: `${item.type}-${item.slug}`, title: item.name[lang], description: item.description[lang], addHref: `/decouvrir?store=${item.slug}`,
      meta: (storeType === 'profil' ? DOMAIN_LABELS[item.facet]?.[lang] : SKILL_CATEGORY_LABELS[item.facet]?.[lang]) ?? item.facet,
      origin: item.creator === 'unitalk' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community',
      highlights: storeType === 'competence' ? undefined : (item.knowHow ?? item.enables ?? item.produces)?.slice(0, 2).map((value) => value[lang]),
      highlightsLabel: storeType === 'profil' ? (lang === 'fr' ? 'Savoir-faire' : 'Know-how') : (lang === 'fr' ? 'Ce qu’elle permet' : 'What it enables'),
      status: item.commercialStatus === 'paid' ? { fr: 'Licence requise', en: 'License required' } : storeType === 'competence' ? { fr: 'Conditions confirmées avant ajout', en: 'Terms confirmed before adding' } : { fr: 'Inclus selon votre offre', en: 'Included depending on your plan' },
      facetKey: item.facet,
      profileKeys: item.relatedProfiles,
      input: storeType === 'competence' ? item.contexts?.[0]?.[lang] : undefined,
      result: storeType === 'competence' ? item.produces?.[0]?.[lang] : undefined,
      proof: storeType === 'competence' ? (item.version ? `Version ${item.version} · ${lang === 'fr' ? 'à valider sur votre cas' : 'validate on your use case'}` : lang === 'fr' ? 'Méthode à valider sur votre cas' : 'Method to validate on your use case') : undefined,
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
    noResults: 'Aucune création ne correspond à cette recherche.', showMore: 'Voir tout le catalogue', showLess: 'Revenir à la sélection',
    emptyTitle: 'Catalogue en préparation', emptyBody: 'Cette catégorie est définie dans l’architecture Unitalk. Ses premières créations publiables seront ajoutées ici.',
    clear: 'Effacer les filtres', available: 'Disponible', preparation: 'Bientôt disponible', addProfile: 'Ajouter à un Collaborateur IA',
    addReassurance: 'Alma vérifie l’adaptation avant l’ajout.',
    allDepartments: 'Tous les départements', result: 'résultat', results: 'résultats', almaTitle: 'Vous ne savez pas qui choisir ?', almaBody: 'Décrivez simplement le travail attendu. Alma vous recommande un Collaborateur IA et cadre avec vous le résultat, les sources et les validations.', almaAction: 'Décrire ma première mission', finalTitle: 'Commencez par un résultat à obtenir, pas par une configuration.', finalBody: 'Alma cadre gratuitement votre première mission. Vous validez le résultat attendu, les accès nécessaires et les actions qui doivent rester sous contrôle humain.', finalProfiles: 'Décrire ma première mission',
    heroProofs: ['7 jours gratuits', 'Sans carte bancaire', 'À partir de 49 €/mois ensuite', 'Aucune action sensible sans validation'], starterMission: 'Première mission possible', exampleResult: 'Livrable à valider', ctaHelp: 'Alma vous aide d’abord à cadrer la mission.', compatibleProfiles: 'Voir les profils métier',
  },
  en: {
    noResults: 'No item matches this search.', showMore: 'View the full catalog', showLess: 'Back to the selection',
    emptyTitle: 'Catalog in preparation', emptyBody: 'This category is defined in the Unitalk architecture. Its first publishable creations will be added here.',
    clear: 'Clear filters', available: 'Available', preparation: 'Coming soon', addProfile: 'Add to an AI Collaborator',
    addReassurance: 'Alma checks the fit before adding it.',
    allDepartments: 'All departments', result: 'result', results: 'results', almaTitle: 'Not sure who to choose?', almaBody: 'Simply describe the work you need done. Alma recommends an AI Collaborator and scopes the outcome, sources and approvals with you.', almaAction: 'Describe my first mission', finalTitle: 'Start with an outcome, not a configuration.', finalBody: 'Alma scopes your first mission for free. You approve the expected result, required access and actions that must remain under human control.', finalProfiles: 'Describe my first mission',
    heroProofs: ['7-day free trial', 'No credit card', 'From €49/month afterwards', 'Sensitive actions require approval'], starterMission: 'Possible first mission', exampleResult: 'Deliverable to approve', ctaHelp: 'Alma first helps you scope the mission.', compatibleProfiles: 'View compatible profiles',
  },
} as const

function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function scrollToStoreHero() {
  requestAnimationFrame(() => document.getElementById('marketplace-store-hero')?.scrollIntoView({
    block: 'start',
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  }))
}

export function UnitalkStoreHub({ collaboratorsOnly = false, fixedLang }: { collaboratorsOnly?: boolean; fixedLang?: SiteLang }) {
  const { lang: selectedLang } = useLanguage()
  const lang = fixedLang ?? selectedLang
  const t = COPY[lang]
  const [activeCategoryId, setActiveCategoryId] = useState(STORE_CATEGORIES[0].id)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [catalogQuery, setCatalogQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState({ lang, value: '' })
  const [skillCategory, setSkillCategory] = useState('')
  const [skillProfile, setSkillProfile] = useState('')
  const department = departmentFilter.lang === lang ? departmentFilter.value : ''
  const setDepartment = (value: string) => setDepartmentFilter({ lang, value })
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeCategory = STORE_CATEGORIES.find((category) => category.id === activeCategoryId) ?? STORE_CATEGORIES[0]
  const isCollaboratorsLanding = collaboratorsOnly && activeCategory.id === 'collaborateurs-ia'
  const categoryItems = useMemo(() => itemsForCategory(activeCategory.id, lang), [activeCategory.id, lang])
  const filteredItems = useMemo(() => {
    const query = normalizeSearch(catalogQuery.trim())
    const departmentItems = department ? categoryItems.filter((item) => item.origin === department) : categoryItems
    const scopedItems = activeCategory.id === 'competences' ? departmentItems.filter((item) => (!skillCategory || item.facetKey === skillCategory) && (!skillProfile || item.profileKeys?.includes(skillProfile))) : departmentItems
    if (!query) return scopedItems
    const tokens = query.split(/\s+/)
    const matches: MarketplaceItem[] = []
    for (const item of scopedItems) {
      const fields = [item.title, item.meta, item.origin ?? '', ...(item.keywords ?? []), ...(item.highlights ?? []), item.description].map(normalizeSearch)
      if (!tokens.every((token) => fields.some((field) => field.includes(token)))) continue
      const points = tokens.reduce((total, token) => total + (fields[0].includes(token) ? 40 : 0) + (fields[1].includes(token) ? 25 : 0) + (fields[2].includes(token) ? 15 : 0) + (fields.slice(3, -1).some((field) => field.includes(token)) ? 15 : 0) + (fields.at(-1)?.includes(token) ? 5 : 0), 0)
      matches.push({ ...item, score: Math.min(99, Math.round(points / tokens.length)) })
    }
    return matches.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
  }, [activeCategory.id, catalogQuery, categoryItems, department, skillCategory, skillProfile])
  const visibleItems = filteredItems.slice(0, visibleCount)
  function clearFilters() {
    setCatalogQuery('')
    setDepartment('')
    setSkillCategory('')
    setSkillProfile('')
    setVisibleCount(PAGE_SIZE)
  }

  useLayoutEffect(() => {
    const selectFromLocation = (scroll = false) => {
      const categoryId = window.location.hash.slice(1) || (window.location.pathname === '/marketplace/collaborateurs-ia' ? 'collaborateurs-ia' : '')
      if (STORE_CATEGORIES.some((category) => category.id === categoryId)) {
        setActiveCategoryId(categoryId)
        setVisibleCount(PAGE_SIZE)
        setCatalogQuery('')
        setDepartmentFilter((current) => ({ ...current, value: '' }))
        setSkillCategory('')
        setSkillProfile('')
        requestAnimationFrame(() => {
          document.getElementById(`marketplace-tab-${categoryId}`)?.scrollIntoView({ behavior: scroll && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto', block: 'nearest', inline: 'center' })
          if (scroll) scrollToStoreHero()
        })
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
    setSkillCategory('')
    setSkillProfile('')
    const pathname = categoryId === 'collaborateurs-ia' ? '/marketplace/collaborateurs-ia' : '/marketplace'
    window.history.pushState(null, '', categoryId === 'collaborateurs-ia' ? pathname : `${pathname}#${categoryId}`)
    if (scroll) scrollToStoreHero()
    requestAnimationFrame(() => document.getElementById(`marketplace-tab-${categoryId}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }))
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
      <section id="marketplace-store-hero" className={`scroll-mt-[76px] bg-[#EAE3D4] px-5 sm:px-8 ${collaboratorsOnly ? 'pb-8 pt-20 sm:pb-10 sm:pt-24' : 'pb-9 pt-20 sm:pb-11 sm:pt-24 [@media(min-width:1024px)_and_(max-height:850px)]:pb-9 [@media(min-width:1024px)_and_(max-height:850px)]:pt-20'}`}>
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="max-w-6xl text-[clamp(2.4rem,5.2vw,5.25rem)] font-semibold leading-[.9] tracking-[-.065em] text-balance [@media(min-width:1024px)_and_(max-height:850px)]:text-[clamp(3rem,4.8vw,4.5rem)]">{activeCategory.heroTitle[lang].slice(0, -activeCategory.heroAccent[lang].length)}<span className="text-[#D10E63] lg:block">{activeCategory.heroAccent[lang]}</span></h1>
          <p className="mt-5 max-w-6xl text-[15px] leading-6 text-[#4E483F] text-pretty sm:mt-6 sm:text-[16px] sm:leading-7 lg:pr-8">{activeCategory.heroLead[lang]}</p>
          {isCollaboratorsLanding && <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-semibold text-[#625B50]">{t.heroProofs.map((proof) => <li key={proof} className="flex items-center gap-2"><span aria-hidden className="size-1.5 rounded-full bg-[#D10E63]"/>{proof}</li>)}</ul>}
        </div>
      </section>

      <div id="marketplace-category-tabs" className="sticky top-[76px] z-30 scroll-mt-[76px] border-y border-white/10 bg-[#211E1B]/95 px-5 text-white shadow-[0_10px_30px_-24px_rgba(0,0,0,.8)] backdrop-blur-md sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl overflow-x-auto scrollbar-hide" role="tablist" aria-label={lang === 'fr' ? 'Catégories de la marketplace' : 'Marketplace categories'}>
            {STORE_CATEGORIES.map((category, index) => {
              const active = activeCategory.id === category.id
               return <button ref={(node) => { tabRefs.current[index] = node }} key={category.id} id={`marketplace-tab-${category.id}`} type="button" role="tab" tabIndex={active ? 0 : -1} aria-selected={active} aria-controls="marketplace-results" onKeyDown={(event) => handleTabKeyDown(event, index)} onClick={() => selectCategory(category.id)} className={`relative flex h-14 shrink-0 items-center px-4 text-[13px] font-semibold outline-none transition-colors first:pl-0 focus-visible:ring-2 focus-visible:ring-[#F2A4C5] focus-visible:ring-inset sm:h-16 sm:px-5 sm:text-sm ${active ? 'text-[#F15B9B]' : 'text-[#BEB4A8] hover:text-white'}`}><span>{category.title[lang]}</span><span className={`absolute inset-x-4 bottom-0 h-[3px] bg-[#D10E63] transition-transform first:left-0 ${active ? 'scale-x-100' : 'scale-x-0'}`} /></button>
             })}
        </div>
      </div>

      <section id="categories" className={`scroll-mt-36 px-5 sm:px-8 ${collaboratorsOnly ? 'pb-20 pt-7 sm:pb-24 sm:pt-10 lg:pb-28' : 'pb-20 pt-7 sm:pt-9 lg:pb-24 [@media(min-width:1024px)_and_(max-height:850px)]:pt-7'}`}>
        <div className="mx-auto w-full max-w-6xl">
            <div id="marketplace-results" role="tabpanel" aria-labelledby={`marketplace-tab-${activeCategory.id}`} className="scroll-mt-[184px]">
                 {!isCollaboratorsLanding && <div className="mb-5 sm:mb-6"><h2 className="text-[28px] font-semibold tracking-[-.04em] sm:text-[34px]">{activeCategory.title[lang]}</h2><p className="mt-2 text-sm leading-6 text-[#625B50] xl:whitespace-nowrap">{activeCategory.description[lang]}</p></div>}
                  {categoryItems.length > 0 && !isCollaboratorsLanding && <div className="flex flex-col gap-3"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">{activeCategory.id !== 'collaborateurs-ia' && <label className="relative block w-full max-w-md"><span className="sr-only">{activeCategory.search[lang]}</span><input type="search" value={catalogQuery} onChange={(event) => { setCatalogQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder={activeCategory.search[lang]} className="h-12 w-full rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-5 pr-12 text-sm outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#857C6E] focus:border-[var(--search-accent)] focus:bg-white focus:ring-4 focus:ring-[#1C1A17]/[.05]" style={{ '--search-accent': activeCategory.accent } as CSSProperties} />{catalogQuery && <button type="button" onClick={() => setCatalogQuery('')} aria-label={t.clear} className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-lg text-[#625B50] outline-none hover:bg-[#EAE3D4] focus-visible:ring-2 focus-visible:ring-[#D10E63]">×</button>}</label>}<Link href={activeCategory.href} className="inline-flex w-fit shrink-0 items-center border-b border-[#857C6E] pb-1 text-xs font-bold text-[#625B50] outline-none hover:text-[#1C1A17] focus-visible:ring-2 focus-visible:ring-[#D10E63] lg:ml-auto">{activeCategory.explain[lang]}<span aria-hidden="true" className="ml-3">↗</span></Link></div>{activeCategory.id === 'competences' && <div className="grid gap-3 sm:grid-cols-2"><select aria-label={lang === 'fr' ? 'Domaine de compétence' : 'Skill domain'} value={skillCategory} onChange={(event) => { setSkillCategory(event.target.value); setVisibleCount(PAGE_SIZE) }} className="h-11 rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6246B5]"><option value="">{lang === 'fr' ? 'Tous les domaines' : 'All domains'}</option>{Object.entries(SKILL_CATEGORY_LABELS).map(([key, label]) => <option key={key} value={key}>{label[lang]}</option>)}</select><select aria-label={lang === 'fr' ? 'Profil compatible' : 'Compatible profile'} value={skillProfile} onChange={(event) => { setSkillProfile(event.target.value); setVisibleCount(PAGE_SIZE) }} className="h-11 rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#6246B5]"><option value="">{lang === 'fr' ? 'Tous les profils compatibles' : 'All compatible profiles'}</option>{[...new Set(categoryItems.flatMap((item) => item.profileKeys ?? []))].map((slug) => <option key={slug} value={slug}>{PROFILE_NAMES.get(slug)?.[lang] ?? slug}</option>)}</select></div>}</div>}
                 <p className={activeCategory.id === 'competences' ? 'mt-4 text-xs font-semibold text-[#766D61]' : 'sr-only'} aria-live="polite">{filteredItems.length} {filteredItems.length === 1 ? t.result : t.results}</p>
                 {(activeCategory.id === 'profils-metier' || activeCategory.id === 'competences') && <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#766D61]"><span aria-hidden className="size-1.5 rounded-full bg-[var(--catalog-accent)]" style={{ '--catalog-accent': activeCategory.accent } as CSSProperties}/>{t.addReassurance}</p>}

               {visibleItems.length > 0 ? <div className="mt-5 grid auto-rows-fr gap-3 sm:mt-6 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleItems.map((item, index) => <MarketplaceItemCard key={item.key} item={item} lang={lang} category={activeCategory} featuredLast={isCollaboratorsLanding && visibleItems.length % 3 === 1 && index === visibleItems.length - 1} labels={{ details: activeCategory.action[lang], available: t.available, preparation: t.preparation, addProfile: t.addProfile }} />)}{activeCategory.missing && <MissingItemCard content={activeCategory.missing} lang={lang} accent={activeCategory.accent} />}</div> : categoryItems.length > 0 ? <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3"><div className="rounded-2xl border border-dashed border-[#CFC5B5] bg-[#FAF8F3] p-8 md:col-span-2"><h3 className="text-xl font-bold">{t.noResults}</h3><button type="button" onClick={clearFilters} className="mt-4 text-sm font-bold text-[#B00C54] underline underline-offset-4">{t.clear}</button></div>{activeCategory.missing && <MissingItemCard content={activeCategory.missing} lang={lang} accent={activeCategory.accent} />}</div> : <div className="mt-5 rounded-2xl border border-[#D8D0C2] bg-[#FAF8F3] p-8"><h3 className="text-2xl font-bold">{t.emptyTitle}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#625B50]">{t.emptyBody}</p></div>}
               {activeCategory.id !== 'collaborateurs-ia' && filteredItems.length > PAGE_SIZE && <div className="mt-9 text-center"><button type="button" onClick={() => setVisibleCount((count) => count >= filteredItems.length ? PAGE_SIZE : filteredItems.length)} className="inline-flex min-h-12 items-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white transition-colors hover:bg-[#332F29]">{visibleCount >= filteredItems.length ? t.showLess : t.showMore}</button></div>}
                 {activeCategory.id === 'collaborateurs-ia' && <section className="mt-10 rounded-[24px] bg-[#181615] p-7 text-white sm:p-9 lg:flex lg:items-end lg:justify-between lg:gap-10"><div><h3 className="max-w-3xl text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[.98] tracking-[-.05em]">{t.almaTitle}</h3><p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#CFC6B8]">{withAlmaAvatar(t.almaBody)}</p><p className="mt-4 text-xs font-semibold text-[#F2A4C5]">{lang === 'fr' ? '7 jours gratuits · Sans carte bancaire · Puis à partir de 49 €/mois hors capacité IA' : '7 days free · No credit card · Then from €49/month excluding AI capacity'}</p></div><Link href="/missions?composer=1&source=marketplace-collaborators-final" className="mt-7 inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#F3EFE6] px-6 text-[13px] font-bold text-[#181615] lg:mt-0">{t.almaAction}<span aria-hidden className="ml-2">→</span></Link></section>}
          </div>
        </div>
      </section>
    </main>
  )
}

function withAlmaAvatar(value: string) {
  return value.split('Alma').map((part, index) => <span key={`${part}-${index}`}>{index > 0 && <><AlmaInline className="mr-1" />Alma</>}{part}</span>)
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

function MarketplaceItemCard({ item, lang, category, labels, featuredLast = false }: { item: MarketplaceItem; lang: Lang; category: Category; labels: { details: string; available: string; preparation: string; addProfile: string }; featuredLast?: boolean }) {
  const hasDirectAdd = Boolean(item.addHref)
  const style = { '--profile-accent': category.accent } as CSSProperties
  if (hasDirectAdd) {
    return (
      <Link href={item.addHref!} aria-label={`${labels.addProfile} : ${item.title}`} className="group relative flex min-h-[238px] flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-5 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[var(--profile-accent)] hover:bg-[#FFFDF9] hover:shadow-[0_18px_45px_-38px_rgba(28,26,23,.8)] focus-visible:border-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)] focus-visible:ring-offset-2 sm:min-h-[248px] sm:p-6 [@media(min-width:1024px)_and_(max-height:850px)]:min-h-[230px] [@media(min-width:1024px)_and_(max-height:850px)]:p-5" style={style}>
        <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[var(--profile-accent)] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
        <p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[var(--profile-accent)]">{item.meta}</p>
        <h3 className="mt-3 line-clamp-2 text-[21px] font-semibold leading-[1.08] tracking-[-.04em] text-[#1C1A17] sm:mt-4 sm:text-[23px]">{item.title}</h3>
        <p className="mt-2.5 line-clamp-2 text-[13px] leading-[1.4rem] text-[#625B50] sm:mt-3 sm:leading-6">{item.description}</p>
        {category.id === 'competences' && <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-[1fr_auto] sm:items-end"><dl className="grid gap-1.5 rounded-xl bg-[#F0EBE1] p-2.5 text-xs sm:gap-2 sm:p-3"><div><dt className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#857C6E]">{lang === 'fr' ? 'Contexte d’application' : 'Application context'}</dt><dd className="mt-0.5 line-clamp-1 font-semibold leading-5 text-[#3F3A33]">{item.input ?? (lang === 'fr' ? 'Contexte précisé avec Alma' : 'Context scoped with Alma')}</dd></div><div className="border-t border-[#D8D0C2] pt-1.5 sm:pt-2"><dt className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#857C6E]">{lang === 'fr' ? 'Résultat produit' : 'Produced result'}</dt><dd className="mt-0.5 line-clamp-1 font-semibold leading-5 text-[#3F3A33]">{item.result ?? (lang === 'fr' ? 'Résultat documenté à valider' : 'Documented result to approve')}</dd></div></dl>{item.profileKeys && item.profileKeys.length > 0 && <div className="hidden sm:block [@media(min-width:1024px)_and_(max-height:850px)]:hidden"><p className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#857C6E]">{lang === 'fr' ? 'Profils compatibles' : 'Compatible profiles'}</p><div className="mt-2 flex flex-wrap gap-1.5">{item.profileKeys.slice(0, 2).map((slug) => <span key={slug} className="rounded-full border border-[#D8D0C2] px-2.5 py-1 text-[10px] font-semibold text-[#4E483F]">{PROFILE_NAMES.get(slug)?.[lang] ?? slug}</span>)}</div></div>}</div>}
        {category.id === 'competences' && <p className="mt-2 hidden text-[10px] font-semibold leading-4 text-[#766D61] sm:block [@media(min-width:1024px)_and_(max-height:850px)]:hidden">{item.proof}</p>}
        {category.id !== 'competences' && item.highlights && item.highlights.length > 0 && <div className="mt-4"><p className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{item.highlightsLabel}</p><ul className="mt-1.5 space-y-1">{item.highlights.map((highlight, index) => <li key={highlight} className={`gap-2 text-xs font-semibold leading-[1.15rem] text-[#4E483F] ${index > 0 ? 'hidden sm:flex' : 'flex'}`}><span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-[var(--profile-accent)]"/>{highlight}</li>)}</ul></div>}
        <div className="mt-auto pt-5 sm:pt-6">
          <div className="border-t border-[#DED6C8] pt-4 transition-colors group-hover:border-[var(--profile-accent)] group-focus-visible:border-[var(--profile-accent)]">
            <p className="text-[10px] font-semibold text-[#857C6E]">{item.origin} · {item.status?.[lang]}</p>
            <span className="mt-2.5 flex min-h-11 items-center justify-between rounded-full border border-[#CFC5B5] px-4 text-[11px] font-bold text-[#1C1A17] transition-[color,background-color,border-color] group-hover:border-[var(--profile-accent)] group-hover:bg-[var(--profile-accent)] group-hover:text-white group-focus-visible:border-[var(--profile-accent)] group-focus-visible:bg-[var(--profile-accent)] group-focus-visible:text-white sm:min-h-10 sm:border-transparent sm:px-0 sm:text-xs sm:group-hover:px-4 sm:group-focus-visible:px-4">
              {labels.addProfile}<span aria-hidden className="ml-3 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    )
  }
  const content = (
    <>
      <div>
        {item.avatar && <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4"><Image src={item.avatar} alt="" width={56} height={56} className="size-12 rounded-full object-cover ring-1 ring-[#D8D0C2] sm:size-14" /><div className="min-w-0"><p className="font-mono text-[10px] font-black uppercase tracking-[.13em] text-[var(--profile-accent)]">{lang === 'fr' ? 'Département' : 'Department'} · {item.origin}</p><p className="mt-1 text-[12px] font-semibold text-[#625B50] sm:mt-1.5 sm:text-[13px]">{item.meta}</p></div></div>}
        <h3 className="line-clamp-2 text-[24px] font-semibold leading-[1.04] tracking-[-.045em] text-[#1C1A17] sm:text-[26px]">{item.title}</h3>
        <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-[#625B50] sm:mt-4 sm:text-sm sm:leading-6">{item.description}</p>
        {item.starterMission && <dl className="mt-4 rounded-xl bg-[#F0EBE1] p-3 sm:mt-5"><div><dt className="font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#857C6E]">{lang === 'fr' ? 'Première mission possible' : 'Possible first mission'}</dt><dd className="mt-1 text-[12px] font-semibold leading-5 text-[#322E29] sm:text-[13px]">{item.starterMission}</dd></div></dl>}
        {item.highlights && <details className="mt-4 sm:hidden"><summary className="cursor-pointer text-xs font-bold text-[#B00C54]">{item.highlightsLabel}</summary><div className="mt-2 flex flex-wrap gap-1.5">{item.highlights.map((highlight) => <span key={highlight} className="rounded-full border border-[#D8D0C2] bg-[#FAF8F3] px-2.5 py-1 text-[11px] font-semibold text-[#4E483F]">{highlight}</span>)}</div></details>}
        {item.highlights && <div className="mt-4 hidden sm:block"><p className="font-mono text-[10px] font-black uppercase tracking-[.12em] text-[#766D61]">{item.highlightsLabel}</p><div className="mt-2 flex flex-wrap gap-1.5">{item.highlights.map((highlight) => <span key={highlight} className="rounded-full border border-[#D8D0C2] bg-[#FAF8F3] px-2.5 py-1 text-[11px] font-semibold text-[#4E483F]">{highlight}</span>)}</div></div>}
      </div>
      <div className="mt-auto pt-5 sm:pt-8">
        <div className="border-t border-[#DED6C8] pt-4 transition-colors group-hover:border-[var(--profile-accent)]">
           {hasDirectAdd ? <Link href={item.addHref!} className="relative z-10 flex min-h-11 w-full items-center justify-center rounded-full bg-[#1C1A17] px-4 text-center text-[13px] font-bold text-white outline-none transition-colors hover:bg-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)]">{labels.addProfile}<span aria-hidden="true" className="ml-2">→</span></Link> : item.missionHref ? <div className="relative z-10"><Link href={item.missionHref} className="flex min-h-11 w-full items-center justify-center rounded-full bg-[#1C1A17] px-4 text-center text-[13px] font-bold text-white outline-none transition-colors hover:bg-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)]">{lang === 'fr' ? `Confier une mission à ${item.title}` : `Assign a mission to ${item.title}`}<span aria-hidden="true" className="ml-2">→</span></Link>{item.href && <Link href={item.href} className="mt-2 block text-center text-[13px] font-bold text-[#625B50] underline decoration-[#CFC5B5] underline-offset-4 outline-none transition-colors hover:text-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)]">{labels.details}</Link>}</div> : <div className="flex items-end justify-between gap-3"><span className="text-xs font-semibold text-[#625B50]">{item.status?.[lang] ?? (item.pending ? labels.preparation : labels.available)}</span>{item.href && <Link href={item.href} className="relative z-10 text-xs font-bold text-[#1C1A17] outline-none transition-colors hover:text-[var(--profile-accent)] focus-visible:ring-2 focus-visible:ring-[var(--profile-accent)]">{labels.details}<span aria-hidden="true" className="ml-2">→</span></Link>}</div>}
        </div>
      </div>
    </>
  )
  const className = `group relative flex min-h-[220px] flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-5 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[var(--profile-accent)] hover:bg-[#FFFDF9] hover:shadow-[0_18px_45px_-38px_rgba(28,26,23,.8)] sm:min-h-[255px] sm:p-6 ${featuredLast ? 'xl:col-start-2' : ''}`
  return <article className={className} style={style}><div className="relative flex min-h-full flex-1 flex-col">{content}</div></article>
}
