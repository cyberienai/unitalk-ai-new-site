// Catalog of Missions: concrete outcomes you can hand to an AI Collaborator.
// A Mission = a result to achieve. It mobilizes a job Profile, is carried out by
// an AI Collaborator inside the Workspace, and ends with your validation.
//
// 144 missions = 12 business categories x 12 missions. Each mission is authored
// as a compact SEED; buildMission() derives the richer detail-page fields
// (objective, steps, deliverable, produces, validation, profile) from the
// structured data so the catalog stays consistent and maintainable.

import type { Bilingual } from '@/lib/collaborators-catalog'

export type MissionCategory = { key: string; label: Bilingual }
export type MissionCollection = { key: string; label: Bilingual }

// Availability status. Nothing is "available" until it has been tested for real.
export type MissionStatus = 'available' | 'on-setup' | 'coming-soon'

// Origin of a mission: authored and maintained by Unitalk, or contributed by the
// community. Every catalog mission is currently native; external is future-facing.
export type MissionOrigin = 'native' | 'external'

// Labels describe the mission's editorial origin (who created and published it),
// not its availability. Kept short so they read cleanly in the sidebar, the mobile
// switcher and the active-filter chips.
export const ORIGIN_LABELS: Record<MissionOrigin | 'all', Bilingual> = {
  all: { fr: 'Toutes', en: 'All' },
  native: { fr: 'Unitalk', en: 'Unitalk' },
  external: { fr: 'Communauté', en: 'Community' },
}

export type Mission = {
  slug: string
  category: string
  collections: string[]
  title: Bilingual
  result: Bilingual
  description: Bilingual
  objective: Bilingual
  steps: Bilingual[]
  deliverable: Bilingual
  deliveryTime: Bilingual
  // Scope facets shown on the mission fiche (freelance-style framing): how much
  // work is involved, and whether the mission runs once or recurs.
  volume: Bilingual
  cadence: Bilingual
  validation: Bilingual
  produces: Bilingual[]
  skills: Bilingual[]
  tools: string[]
  profile: Bilingual
  collaboratorSlug: string
  // Facets used by filters.
  sectors: string[]
  languages: string[]
  zones: string[]
  modalities: string[]
  status: MissionStatus
  origin: MissionOrigin
  availabilityReason: Bilingual
  regulated: boolean
  dateAdded: string
  order: number
  keywords: string[]
}

export const DELAY_TBD: Bilingual = {
  fr: 'Délai confirmé après cadrage',
  en: 'Timeline confirmed after scoping',
}

// A mission describes a result, not a headcount — the exact quantity is agreed
// during scoping. Recurrence is the key edge over a one-shot freelance brief.
export const VOLUME_TBD: Bilingual = {
  fr: 'Défini lors du cadrage',
  en: 'Defined during scoping',
}

export const CADENCE_DEFAULT: Bilingual = {
  fr: 'Ponctuel ou récurrent',
  en: 'One-off or recurring',
}

export const STATUS_LABELS: Record<MissionStatus, Bilingual> = {
  available: { fr: 'Disponible', en: 'Available' },
  'on-setup': { fr: 'Préparée par Alma', en: 'Prepared by Alma' },
  'coming-soon': { fr: 'Bientôt disponible', en: 'Coming soon' },
}

// --- Taxonomy: 12 stable business categories -------------------------------
export const MISSION_CATEGORIES: MissionCategory[] = [
  { key: 'ventes', label: { fr: 'Ventes & développement commercial', en: 'Sales & business development' } },
  { key: 'relation-client', label: { fr: 'Relation client & support', en: 'Customer relations & support' } },
  { key: 'marketing', label: { fr: 'Marketing & communication', en: 'Marketing & communication' } },
  { key: 'reunions', label: { fr: 'Réunions & coordination', en: 'Meetings & coordination' } },
  { key: 'administration', label: { fr: 'Administration & organisation', en: 'Administration & organization' } },
  { key: 'finance', label: { fr: 'Finance & gestion', en: 'Finance & management' } },
  { key: 'rh', label: { fr: 'RH & recrutement', en: 'HR & recruiting' } },
  { key: 'direction', label: { fr: 'Direction & pilotage', en: 'Leadership & steering' } },
  { key: 'documents', label: { fr: 'Documents & connaissances', en: 'Documents & knowledge' } },
  { key: 'analyse', label: { fr: 'Analyse, recherche & veille', en: 'Analysis, research & monitoring' } },
  { key: 'operations', label: { fr: 'Opérations & automatisation', en: 'Operations & automation' } },
  { key: 'produit', label: { fr: 'Produit, design & technologie', en: 'Product, design & technology' } },
]

// --- Editorial collections (cross-cutting goals) ---------------------------
export const MISSION_COLLECTIONS: MissionCollection[] = [
  { key: 'developper-activite', label: { fr: "Développer l'activité", en: 'Grow the business' } },
  { key: 'servir-clients', label: { fr: 'Servir les clients', en: 'Serve customers' } },
  { key: 'produire-communiquer', label: { fr: 'Produire et communiquer', en: 'Create and communicate' } },
  { key: 'piloter-organisation', label: { fr: "Piloter l'organisation", en: 'Steer the organization' } },
  { key: 'automatiser-operations', label: { fr: 'Automatiser les opérations', en: 'Automate operations' } },
  { key: 'developper-produits', label: { fr: 'Développer les produits', en: 'Build products' } },
  { key: 'recruter-accompagner', label: { fr: 'Recruter et accompagner', en: 'Recruit and support' } },
]

// --- Filter facet labels ----------------------------------------------------
export const SECTOR_LABELS: Record<string, Bilingual> = {
  commerce: { fr: 'Commerce & e-commerce', en: 'Retail & e-commerce' },
  immobilier: { fr: 'Immobilier', en: 'Real estate' },
  hospitality: { fr: 'Hôtellerie, restauration & tourisme', en: 'Hospitality & tourism' },
  construction: { fr: 'Construction & BTP', en: 'Construction' },
  industrie: { fr: 'Industrie & fabrication', en: 'Industry & manufacturing' },
  transport: { fr: 'Transport & logistique', en: 'Transport & logistics' },
  sante: { fr: 'Santé & médico-social', en: 'Health & care' },
  juridique: { fr: 'Juridique & conformité', en: 'Legal & compliance' },
  finance: { fr: 'Banque, assurance & services financiers', en: 'Banking, insurance & financial services' },
  education: { fr: 'Éducation & formation', en: 'Education & training' },
  services: { fr: 'Services professionnels', en: 'Professional services' },
  public: { fr: 'Secteur public', en: 'Public sector' },
  associations: { fr: 'Associations', en: 'Nonprofits' },
}

export const ZONE_LABELS: Record<string, Bilingual> = {
  france: { fr: 'France', en: 'France' },
  belgique: { fr: 'Belgique', en: 'Belgium' },
  suisse: { fr: 'Suisse', en: 'Switzerland' },
  ue: { fr: 'Union européenne', en: 'European Union' },
  international: { fr: 'International', en: 'International' },
}

export const LANGUAGE_LABELS: Record<string, Bilingual> = {
  fr: { fr: 'Français', en: 'French' },
  en: { fr: 'Anglais', en: 'English' },
  es: { fr: 'Espagnol', en: 'Spanish' },
  de: { fr: 'Allemand', en: 'German' },
  it: { fr: 'Italien', en: 'Italian' },
  multi: { fr: 'Multilingue', en: 'Multilingual' },
}

export const MODALITY_LABELS: Record<string, Bilingual> = {
  telephone: { fr: 'Téléphone', en: 'Phone' },
  email: { fr: 'Email', en: 'Email' },
  chat: { fr: 'Chat', en: 'Chat' },
  reunion: { fr: 'Réunion', en: 'Meeting' },
  documents: { fr: 'Documents', en: 'Documents' },
  donnees: { fr: 'Données', en: 'Data' },
  image: { fr: 'Image', en: 'Image' },
  audio: { fr: 'Audio', en: 'Audio' },
  video: { fr: 'Vidéo', en: 'Video' },
  code: { fr: 'Code', en: 'Code' },
  automatisation: { fr: 'Automatisation', en: 'Automation' },
}

// --- Per-category defaults (skills, profile, tools, facets) ------------------
type CategoryDefault = {
  collection: string
  collaboratorSlug: string
  profile: Bilingual
  skills: Bilingual[]
  tools: string[]
  sectors: string[]
  modality: string
  regulated: boolean
}

const CATEGORY_DEFAULTS: Record<string, CategoryDefault> = {
  ventes: {
    collection: 'developper-activite',
    collaboratorSlug: 'hugo',
    profile: { fr: 'Commercial', en: 'Sales rep' },
    skills: [
      { fr: 'Prospection et qualification', en: 'Prospecting and qualification' },
      { fr: 'Personnalisation des messages', en: 'Message personalization' },
      { fr: 'Suivi du pipeline', en: 'Pipeline tracking' },
      { fr: 'Préparation de rendez-vous', en: 'Meeting preparation' },
    ],
    tools: ['CRM', 'Email', 'LinkedIn', 'Agenda'],
    sectors: ['commerce', 'services', 'industrie', 'immobilier'],
    modality: 'email',
    regulated: false,
  },
  'relation-client': {
    collection: 'servir-clients',
    collaboratorSlug: 'ines',
    profile: { fr: 'Support client', en: 'Customer support' },
    skills: [
      { fr: 'Traitement des demandes', en: 'Request handling' },
      { fr: 'Priorisation et routage', en: 'Prioritization and routing' },
      { fr: 'Rédaction de réponses', en: 'Reply drafting' },
      { fr: 'Suivi de satisfaction', en: 'Satisfaction follow-up' },
    ],
    tools: ['Email', 'Helpdesk', 'Chat', 'Base de connaissances'],
    sectors: ['commerce', 'hospitality', 'finance', 'services'],
    modality: 'email',
    regulated: false,
  },
  marketing: {
    collection: 'produire-communiquer',
    collaboratorSlug: 'lea',
    profile: { fr: 'Content strategist', en: 'Content strategist' },
    skills: [
      { fr: 'Ligne éditoriale', en: 'Editorial line' },
      { fr: 'Rédaction et SEO', en: 'Writing and SEO' },
      { fr: 'Déclinaison multicanal', en: 'Multichannel repurposing' },
      { fr: 'Analyse de performance', en: 'Performance analysis' },
    ],
    tools: ['CMS', 'Réseaux sociaux', 'Analytics', 'Canva'],
    sectors: ['commerce', 'immobilier', 'hospitality', 'education'],
    modality: 'documents',
    regulated: false,
  },
  reunions: {
    collection: 'piloter-organisation',
    collaboratorSlug: 'emma',
    profile: { fr: 'Assistant de direction', en: 'Executive assistant' },
    skills: [
      { fr: "Préparation d'ordre du jour", en: 'Agenda preparation' },
      { fr: 'Comptes rendus', en: 'Minutes' },
      { fr: 'Suivi des actions', en: 'Action tracking' },
      { fr: "Coordination d'agendas", en: 'Calendar coordination' },
    ],
    tools: ['Agenda', 'Visioconférence', 'Notion', 'Email'],
    sectors: ['services', 'public', 'associations', 'education'],
    modality: 'reunion',
    regulated: false,
  },
  administration: {
    collection: 'piloter-organisation',
    collaboratorSlug: 'emma',
    profile: { fr: 'Assistant administratif', en: 'Administrative assistant' },
    skills: [
      { fr: 'Tri et classement', en: 'Sorting and filing' },
      { fr: 'Suivi de dossiers', en: 'File tracking' },
      { fr: 'Rédaction de courriers', en: 'Letter drafting' },
      { fr: 'Gestion des éch��ances', en: 'Deadline management' },
    ],
    tools: ['Email', 'Agenda', 'GED', 'Tableur'],
    sectors: ['services', 'public', 'sante', 'juridique'],
    modality: 'documents',
    regulated: false,
  },
  finance: {
    collection: 'piloter-organisation',
    collaboratorSlug: 'nadia',
    profile: { fr: 'Analyste financier', en: 'Financial analyst' },
    skills: [
      { fr: 'Préparation de reporting', en: 'Reporting preparation' },
      { fr: 'Contrôle et rapprochement', en: 'Control and reconciliation' },
      { fr: "Analyse d'écarts", en: 'Variance analysis' },
      { fr: "Consolidation d'indicateurs", en: 'KPI consolidation' },
    ],
    tools: ['Tableur', 'ERP', 'BI', 'Email'],
    sectors: ['finance', 'services', 'industrie', 'commerce'],
    modality: 'documents',
    regulated: true,
  },
  rh: {
    collection: 'recruter-accompagner',
    collaboratorSlug: 'emma',
    profile: { fr: 'Chargé RH', en: 'HR officer' },
    skills: [
      { fr: "Rédaction d'offres", en: 'Job posting writing' },
      { fr: 'Analyse de candidatures', en: 'Application screening' },
      { fr: "Préparation d'entretiens", en: 'Interview preparation' },
      { fr: "Suivi de l'intégration", en: 'Onboarding follow-up' },
    ],
    tools: ['ATS', 'Email', 'Agenda', 'Base documentaire'],
    sectors: ['services', 'industrie', 'public', 'sante'],
    modality: 'documents',
    regulated: true,
  },
  direction: {
    collection: 'piloter-organisation',
    collaboratorSlug: 'emma',
    profile: { fr: 'Chef de cabinet', en: 'Chief of staff' },
    skills: [
      { fr: "Consolidation d'indicateurs", en: 'KPI consolidation' },
      { fr: 'Notes de décision', en: 'Decision memos' },
      { fr: 'Suivi des décisions', en: 'Decision tracking' },
      { fr: 'Synthèses exécutives', en: 'Executive summaries' },
    ],
    tools: ['Tableur', 'BI', 'Notion', 'Email'],
    sectors: ['services', 'industrie', 'public', 'associations'],
    modality: 'documents',
    regulated: false,
  },
  documents: {
    collection: 'produire-communiquer',
    collaboratorSlug: 'lea',
    profile: { fr: 'Documentaliste', en: 'Knowledge manager' },
    skills: [
      { fr: 'Synthèse de documents', en: 'Document summarization' },
      { fr: "Extraction d'informations", en: 'Information extraction' },
      { fr: 'Structuration de contenus', en: 'Content structuring' },
      { fr: 'Contrôle de cohérence', en: 'Consistency checking' },
    ],
    tools: ['GED', 'Traitement de texte', 'Base de connaissances', 'PDF'],
    sectors: ['juridique', 'public', 'services', 'education'],
    modality: 'documents',
    regulated: false,
  },
  analyse: {
    collection: 'piloter-organisation',
    collaboratorSlug: 'nadia',
    profile: { fr: 'Analyste / veilleur', en: 'Analyst / researcher' },
    skills: [
      { fr: 'Veille et recherche', en: 'Monitoring and research' },
      { fr: 'Analyse comparative', en: 'Comparative analysis' },
      { fr: 'Traitement de données', en: 'Data processing' },
      { fr: 'Restitution structurée', en: 'Structured reporting' },
    ],
    tools: ['Veille', 'Tableur', 'BI', 'Sources publiques'],
    sectors: ['commerce', 'finance', 'industrie', 'services'],
    modality: 'donnees',
    regulated: false,
  },
  operations: {
    collection: 'automatiser-operations',
    collaboratorSlug: 'arthur',
    profile: { fr: 'Automation specialist', en: 'Automation specialist' },
    skills: [
      { fr: 'Cartographie de processus', en: 'Process mapping' },
      { fr: 'Automatisation', en: 'Automation' },
      { fr: 'Contrôle qualité des données', en: 'Data quality control' },
      { fr: 'Supervision et alertes', en: 'Monitoring and alerts' },
    ],
    tools: ['Automatisation', 'API', 'Tableur', 'Supervision'],
    sectors: ['industrie', 'transport', 'commerce', 'construction'],
    modality: 'automatisation',
    regulated: false,
  },
  produit: {
    collection: 'developper-produits',
    collaboratorSlug: 'arthur',
    profile: { fr: 'Produit / technologie', en: 'Product / engineering' },
    skills: [
      { fr: 'Synthèse des besoins', en: 'Needs synthesis' },
      { fr: 'Spécifications et récits', en: 'Specs and user stories' },
      { fr: "Analyse d'interface", en: 'Interface analysis' },
      { fr: 'Documentation technique', en: 'Technical documentation' },
    ],
    tools: ['Gestion de produit', 'Design', 'Dépôt de code', 'Documentation'],
    sectors: ['services', 'commerce', 'education', 'industrie'],
    modality: 'code',
    regulated: false,
  },
}

// --- Seed authoring ---------------------------------------------------------
type SeedOpts = {
  status?: MissionStatus
  origin?: MissionOrigin
  collections?: string[]
  sectors?: string[]
  zones?: string[]
  languages?: string[]
  modality?: string
  regulated?: boolean
  dateAdded?: string
}
type Seed = {
  category: string
  slug: string
  titleFr: string
  titleEn: string
  resultFr: string
  resultEn: string
  opts?: SeedOpts
}

function m(
  category: string,
  slug: string,
  titleFr: string,
  titleEn: string,
  resultFr: string,
  resultEn: string,
  opts?: SeedOpts,
): Seed {
  return { category, slug, titleFr, titleEn, resultFr, resultEn, opts }
}

const bi = (fr: string, en: string): Bilingual => ({ fr, en })

// Deterministic fallback date so "recently added" is stable and honest:
// older the further down the list, unless the seed sets an explicit dateAdded.
const FALLBACK_BASE = new Date('2026-03-01T00:00:00Z').getTime()
function fallbackDate(index: number): string {
  const d = new Date(FALLBACK_BASE - index * 2 * 86400000)
  return d.toISOString().slice(0, 10)
}

function availabilityReason(status: MissionStatus): Bilingual {
  if (status === 'available') {
    return {
      fr: 'Cette mission a été testée de bout en bout et peut démarrer rapidement.',
      en: 'This mission has been tested end to end and can start quickly.',
    }
  }
  if (status === 'on-setup') {
    return {
      fr: "Alma peut préparer aujourd'hui le profil métier, les compétences et le cadre de validation nécessaires.",
      en: 'Alma can prepare the job profile, skills and validation framework needed today.',
    }
  }
  return {
    fr: "Cette mission n'est pas encore ouverte. Décrivez votre besoin et Alma vous prévient dès qu'elle est prête.",
    en: 'This mission is not open yet. Describe your need and Alma will let you know as soon as it is ready.',
  }
}

function deriveSteps(): Bilingual[] {
  return [
    {
      fr: 'Vous décrivez votre contexte, vos règles et le résultat attendu.',
      en: 'You describe your context, your rules and the expected result.',
    },
    {
      fr: 'Alma prépare le Collaborateur IA : profil métier, compétences et cadre de validation.',
      en: 'Alma prepares the AI Collaborator: job profile, skills and validation framework.',
    },
    {
      fr: 'Le Collaborateur réalise la mission et vous présente le livrable.',
      en: 'The Collaborator carries out the mission and presents the deliverable.',
    },
    {
      fr: 'Vous validez, ajustez si besoin, puis intégrez le résultat.',
      en: 'You review, adjust if needed, then integrate the result.',
    },
  ]
}

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3)
}

function buildMission(seed: Seed, index: number): Mission {
  const def = CATEGORY_DEFAULTS[seed.category]
  const o = seed.opts ?? {}
  const status: MissionStatus = o.status ?? 'coming-soon'
  const regulated = o.regulated ?? def.regulated
  const title = bi(seed.titleFr, seed.titleEn)
  const result = bi(seed.resultFr, seed.resultEn)
  const collections = o.collections ?? [def.collection]

  const validation: Bilingual = regulated
    ? {
        fr: 'Validation professionnelle requise : le Collaborateur prépare, mais un professionnel habilité valide avant toute décision ou envoi engageant.',
        en: 'Professional validation required: the Collaborator prepares, but a qualified professional validates before any binding decision or send.',
      }
    : {
        fr: "Rien n'est envoyé ni finalisé sans votre validation. Vous gardez le contrôle à chaque étape.",
        en: 'Nothing is sent or finalized without your approval. You stay in control at every step.',
      }

  return {
    slug: seed.slug,
    category: seed.category,
    collections,
    title,
    result,
    description: result,
    objective: {
      fr: `Vous confiez « ${seed.titleFr.toLowerCase()} » à un Collaborateur IA préparé par Alma. ${seed.resultFr}`,
      en: `You hand "${seed.titleEn.toLowerCase()}" to an AI Collaborator prepared by Alma. ${seed.resultEn}`,
    },
    steps: deriveSteps(),
    deliverable: result,
    deliveryTime: DELAY_TBD,
    volume: VOLUME_TBD,
    cadence: CADENCE_DEFAULT,
    validation,
    produces: [
      { fr: 'Le livrable décrit ci-dessus, prêt à valider.', en: 'The deliverable described above, ready to approve.' },
      { fr: 'Un historique clair des sources et des étapes.', en: 'A clear trail of sources and steps.' },
    ],
    skills: def.skills,
    tools: def.tools,
    profile: def.profile,
    collaboratorSlug: def.collaboratorSlug,
    sectors: o.sectors ?? def.sectors,
    languages: o.languages ?? ['fr', 'en'],
    zones: o.zones ?? ['france', 'ue', 'international'],
    modalities: [o.modality ?? def.modality],
    status,
    origin: o.origin ?? 'native',
    availabilityReason: availabilityReason(status),
    regulated,
    dateAdded: o.dateAdded ?? fallbackDate(index),
    order: index,
    keywords: Array.from(new Set([...tokenize(seed.titleFr), ...tokenize(seed.titleEn)])),
  }
}

// --- SEEDS: 12 categories x 12 missions = 144 -------------------------------
const SEEDS: Seed[] = [
  // ---------------- VENTES & DÉVELOPPEMENT COMMERCIAL ----------------
  m('ventes', 'trouver-de-nouveaux-clients', 'Trouver des prospects qualifiés', 'Find qualified prospects', 'Une liste de prospects correspondant à vos critères, prête à être examinée.', 'A list of prospects matching your criteria, ready to review.', { status: 'available', dateAdded: '2026-05-12' }),
  m('ventes', 'qualifier-les-demandes-entrantes', 'Qualifier les demandes entrantes', 'Qualify inbound requests', 'Des opportunités enrichies, classées et orientées vers la bonne personne.', 'Enriched opportunities, sorted and routed to the right person.', { status: 'on-setup' }),
  m('ventes', 'preparer-une-campagne-de-prospection', 'Préparer une campagne de prospection', 'Prepare an outreach campaign', 'Une cible, une séquence de contact et des messages prêts à valider.', 'A target, a contact sequence and messages ready to approve.'),
  m('ventes', 'personnaliser-les-messages-de-prospection', 'Personnaliser les messages de prospection', 'Personalize outreach messages', 'Des messages adaptés au contexte de chaque prospect.', 'Messages tailored to each prospect’s context.', { status: 'on-setup' }),
  m('ventes', 'preparer-les-rendez-vous-commerciaux', 'Préparer les rendez-vous commerciaux', 'Prepare sales meetings', 'Un dossier synthétique avec le contexte, les enjeux et les points à aborder.', 'A concise brief with context, stakes and talking points.'),
  m('ventes', 'rediger-les-comptes-rendus-commerciaux', 'Rédiger les comptes rendus commerciaux', 'Write sales call summaries', 'Une synthèse structurée avec les besoins, objections et prochaines actions.', 'A structured summary with needs, objections and next actions.'),
  m('ventes', 'relancer-les-opportunites', 'Relancer les opportunités en attente', 'Follow up on pending opportunities', 'Des relances contextualisées, prêtes à être validées et envoyées.', 'Contextual follow-ups, ready to approve and send.', { status: 'on-setup' }),
  m('ventes', 'preparer-les-devis', 'Préparer les devis', 'Prepare quotes', 'Des devis complets, construits selon vos offres et prêts à valider.', 'Complete quotes built from your offers and ready to approve.'),
  m('ventes', 'mettre-a-jour-le-crm', 'Mettre à jour le CRM', 'Update the CRM', 'Des fiches, étapes et prochaines actions tenues à jour après chaque échange.', 'Records, stages and next actions kept up to date after each exchange.', { status: 'on-setup', modality: 'automatisation' }),
  m('ventes', 'analyser-le-pipeline-commercial', 'Analyser le pipeline commercial', 'Analyze the sales pipeline', 'Une vue claire des opportunités, des risques et des priorités.', 'A clear view of opportunities, risks and priorities.', { collections: ['developper-activite', 'piloter-organisation'], modality: 'donnees' }),
  m('ventes', 'preparer-une-revue-commerciale', 'Préparer une revue commerciale', 'Prepare a sales review', 'Un rapport synthétique sur le pipeline, les résultats et les actions attendues.', 'A concise report on pipeline, results and expected actions.', { collections: ['developper-activite', 'piloter-organisation'] }),
  m('ventes', 'identifier-les-opportunites-de-vente-additionnelle', 'Identifier les opportunités de vente additionnelle', 'Spot upsell opportunities', 'Une sélection de clients et d’offres complémentaires pertinentes à examiner.', 'A shortlist of customers and relevant add-on offers to review.'),

  // ---------------- RELATION CLIENT & SUPPORT ----------------
  m('relation-client', 'repondre-a-mes-clients', 'Répondre aux demandes reçues par email', 'Answer requests received by email', 'Des réponses contextualisées et une file claire des cas à valider.', 'Contextual replies and a clear queue of cases to approve.', { status: 'available', dateAdded: '2026-05-20', languages: ['fr', 'en', 'es', 'multi'] }),
  m('relation-client', 'repondre-aux-appels-clients', 'Répondre aux appels des clients', 'Answer customer calls', 'Des appels pris en charge, qualifiés et transmis selon vos règles.', 'Calls handled, qualified and routed according to your rules.', { modality: 'telephone', languages: ['fr', 'en', 'es', 'multi'] }),
  m('relation-client', 'trier-et-orienter-les-demandes', 'Trier et orienter les demandes', 'Sort and route requests', 'Chaque demande est classée, priorisée et dirigée vers le bon interlocuteur.', 'Each request is sorted, prioritized and routed to the right person.', { status: 'on-setup' }),
  m('relation-client', 'suivre-les-reclamations', 'Suivre les réclamations', 'Track complaints', 'Un suivi structuré avec historique, prochaine action et délai attendu.', 'Structured tracking with history, next action and expected timeline.'),
  m('relation-client', 'preparer-les-reponses-aux-avis', 'Préparer les réponses aux avis en ligne', 'Draft responses to online reviews', 'Des réponses adaptées, prêtes à être vérifiées et publiées.', 'Tailored responses, ready to check and publish.', { status: 'on-setup' }),
  m('relation-client', 'construire-ma-faq', 'Construire une FAQ', 'Build a FAQ', 'Une base de réponses claire, organisée à partir des demandes récurrentes.', 'A clear answer base, organized from recurring requests.', { status: 'available', dateAdded: '2026-05-02', modality: 'documents' }),
  m('relation-client', 'enrichir-la-base-de-connaissances', 'Enrichir la base de connaissances', 'Enrich the knowledge base', 'Des articles actualisés à partir des nouveaux cas résolus.', 'Articles updated from newly resolved cases.', { modality: 'documents' }),
  m('relation-client', 'informer-les-clients-de-l-avancement', 'Informer les clients de l’avancement', 'Keep customers informed of progress', 'Des messages de suivi envoyés aux étapes importantes de chaque dossier.', 'Follow-up messages sent at the key milestones of each case.', { status: 'on-setup' }),
  m('relation-client', 'suivre-la-satisfaction-client', 'Suivre la satisfaction client', 'Track customer satisfaction', 'Une synthèse des retours, des irritants et des situations à traiter.', 'A summary of feedback, pain points and situations to address.', { modality: 'donnees' }),
  m('relation-client', 'preparer-les-revues-de-comptes-clients', 'Préparer les revues de comptes clients', 'Prepare customer account reviews', 'Un dossier complet sur l’usage, les demandes et les prochaines priorités.', 'A complete file on usage, requests and next priorities.'),
  m('relation-client', 'detecter-les-clients-a-risque', 'Détecter les clients à risque', 'Detect at-risk customers', 'Une liste de situations sensibles accompagnée des signaux observés.', 'A list of sensitive situations with the observed signals.', { modality: 'donnees' }),
  m('relation-client', 'preparer-l-accueil-des-nouveaux-clients', 'Préparer l’accueil des nouveaux clients', 'Prepare new customer onboarding', 'Un parcours d’arrivée, des messages et des ressources adaptés à chaque client.', 'An onboarding path, messages and resources tailored to each customer.'),

  // ---------------- MARKETING & COMMUNICATION ----------------
  m('marketing', 'construire-un-calendrier-editorial', 'Construire un calendrier éditorial', 'Build an editorial calendar', 'Un programme de publications aligné sur vos objectifs et vos temps forts.', 'A publishing plan aligned with your goals and key moments.'),
  m('marketing', 'animer-mes-reseaux-sociaux', 'Rédiger des publications pour les réseaux sociaux', 'Write social media posts', 'Des publications adaptées à chaque réseau, prêtes à relire et programmer.', 'Posts tailored to each network, ready to review and schedule.', { status: 'on-setup', languages: ['fr', 'en', 'es', 'multi'] }),
  m('marketing', 'preparer-une-newsletter', 'Préparer une newsletter', 'Prepare a newsletter', 'Une newsletter structurée, rédigée et prête à valider.', 'A structured newsletter, written and ready to approve.', { status: 'on-setup' }),
  m('marketing', 'ameliorer-mon-referencement', 'Rédiger un article optimisé pour le référencement', 'Write an SEO-optimized article', 'Un article documenté et structuré autour de la recherche ciblée.', 'A researched article structured around the targeted search.', { status: 'on-setup' }),
  m('marketing', 'preparer-une-campagne-emailing', 'Préparer une campagne emailing', 'Prepare an email campaign', 'Une séquence complète avec objets, messages et appels à l’action.', 'A complete sequence with subject lines, messages and calls to action.', { modality: 'email' }),
  m('marketing', 'decliner-un-contenu-multicanal', 'Décliner un contenu sur plusieurs canaux', 'Repurpose content across channels', 'Plusieurs formats cohérents produits à partir d’un contenu source.', 'Several consistent formats produced from a single source content.'),
  m('marketing', 'rediger-une-page-de-vente', 'Rédiger une page de vente', 'Write a sales page', 'Une page structurée autour de l’offre, des bénéfices et de l’action attendue.', 'A page structured around the offer, benefits and expected action.'),
  m('marketing', 'produire-des-fiches-produits', 'Produire des fiches produits', 'Produce product sheets', 'Des fiches homogènes, complètes et prêtes à publier.', 'Consistent, complete product sheets ready to publish.', { status: 'on-setup', sectors: ['commerce', 'immobilier', 'industrie', 'hospitality'] }),
  m('marketing', 'preparer-un-communique-de-presse', 'Préparer un communiqué de presse', 'Prepare a press release', 'Un communiqué clair accompagné des informations utiles aux journalistes.', 'A clear release with the information journalists need.'),
  m('marketing', 'creer-mes-contenus', 'Analyser les performances des contenus', 'Analyze content performance', 'Une synthèse des résultats et des recommandations pour la prochaine période.', 'A summary of results and recommendations for the next period.', { modality: 'donnees' }),
  m('marketing', 'surveiller-l-image-de-marque', 'Surveiller l’image de marque', 'Monitor brand image', 'Une veille des mentions, thèmes émergents et situations à traiter.', 'Monitoring of mentions, emerging themes and situations to address.', { modality: 'donnees' }),
  m('marketing', 'preparer-une-campagne-de-communication', 'Préparer une campagne de communication', 'Prepare a communication campaign', 'Un plan de campagne avec messages, formats, calendrier et validations.', 'A campaign plan with messages, formats, schedule and approvals.'),

  // ---------------- RÉUNIONS & COORDINATION ----------------
  m('reunions', 'preparer-l-ordre-du-jour', 'Préparer l’ordre du jour d’une réunion', 'Prepare a meeting agenda', 'Un ordre du jour structuré à partir des sujets et documents disponibles.', 'A structured agenda built from the available topics and documents.'),
  m('reunions', 'preparer-les-participants', 'Préparer les participants', 'Brief the participants', 'Chaque participant reçoit le contexte et les documents utiles avant la réunion.', 'Each participant gets the context and useful documents before the meeting.'),
  m('reunions', 'transcrire-une-reunion', 'Transcrire une réunion', 'Transcribe a meeting', 'Une transcription fidèle, horodatée et consultable.', 'A faithful, timestamped and searchable transcription.', { status: 'on-setup', modality: 'audio' }),
  m('reunions', 'preparer-et-suivre-mes-reunions', 'Rédiger le compte rendu', 'Write the minutes', 'Une synthèse claire des échanges, décisions et prochaines actions.', 'A clear summary of the discussion, decisions and next actions.', { status: 'available', dateAdded: '2026-05-08' }),
  m('reunions', 'extraire-les-decisions', 'Extraire les décisions', 'Extract the decisions', 'Une liste des décisions avec leur contexte et leur responsable.', 'A list of decisions with their context and owner.', { status: 'on-setup' }),
  m('reunions', 'suivre-les-actions-decidees', 'Suivre les actions décidées', 'Track agreed actions', 'Un suivi actualisé des actions, responsables, échéances et blocages.', 'An up-to-date tracker of actions, owners, deadlines and blockers.'),
  m('reunions', 'coordonner-les-agendas', 'Coordonner les agendas', 'Coordinate calendars', 'Des créneaux proposés et confirmés sans multiplication des échanges.', 'Slots proposed and confirmed without endless back-and-forth.', { modality: 'automatisation' }),
  m('reunions', 'preparer-un-comite-de-direction', 'Préparer un comité de direction', 'Prepare an executive committee', 'Un dossier complet avec indicateurs, ordre du jour et documents de séance.', 'A complete pack with metrics, agenda and session documents.', { status: 'available', dateAdded: '2026-06-01', collections: ['piloter-organisation'] }),
  m('reunions', 'preparer-une-reunion-commerciale', 'Préparer une réunion commerciale', 'Prepare a sales meeting', 'Un dossier client avec objectifs, historique et sujets à traiter.', 'A client brief with objectives, history and topics to cover.', { collections: ['piloter-organisation', 'developper-activite'] }),
  m('reunions', 'organiser-un-evenement-interne', 'Organiser un événement interne', 'Organize an internal event', 'Un planning, des invitations et un suivi logistique prêts à être validés.', 'A schedule, invitations and logistics tracking ready to approve.'),
  m('reunions', 'produire-une-synthese-hebdomadaire', 'Produire une synthèse hebdomadaire', 'Produce a weekly summary', 'Une vue consolidée des réunions, décisions et actions de la semaine.', 'A consolidated view of the week’s meetings, decisions and actions.', { status: 'on-setup' }),
  m('reunions', 'relancer-les-responsables-d-actions', 'Relancer les responsables d’actions', 'Follow up with action owners', 'Des rappels contextualisés envoyés selon les échéances définies.', 'Contextual reminders sent according to the set deadlines.', { modality: 'automatisation' }),

  // ---------------- ADMINISTRATION & ORGANISATION ----------------
  m('administration', 'organiser-les-rendez-vous', 'Organiser les rendez-vous', 'Organize appointments', 'Des rendez-vous planifiés selon les disponibilités et les priorités.', 'Appointments scheduled by availability and priority.', { modality: 'automatisation' }),
  m('administration', 'trier-la-boite-de-reception', 'Trier la boîte de réception', 'Sort the inbox', 'Des messages classés, priorisés et orientés vers la bonne action.', 'Messages sorted, prioritized and routed to the right action.', { status: 'on-setup', modality: 'email' }),
  m('administration', 'preparer-les-courriers-recurrents', 'Préparer les courriers récurrents', 'Prepare recurring letters', 'Des courriers personnalisés, conformes aux modèles et prêts à valider.', 'Personalized letters, matching your templates and ready to approve.', { status: 'on-setup' }),
  m('administration', 'suivre-les-dossiers-administratifs', 'Suivre les dossiers administratifs', 'Track administrative files', 'Une vue à jour des pièces, échéances et prochaines actions.', 'An up-to-date view of documents, deadlines and next actions.'),
  m('administration', 'controler-la-completude-des-dossiers', 'Contrôler la complétude des dossiers', 'Check file completeness', 'Les documents manquants et les anomalies sont clairement identifiés.', 'Missing documents and anomalies are clearly identified.'),
  m('administration', 'classer-les-documents', 'Classer les documents', 'File documents', 'Des documents nommés, organisés et rangés selon vos règles.', 'Documents named, organized and filed according to your rules.', { status: 'on-setup' }),
  m('administration', 'preparer-les-deplacements', 'Préparer les déplacements professionnels', 'Prepare business travel', 'Un itinéraire, des réservations proposées et un dossier de voyage complet.', 'An itinerary, proposed bookings and a complete travel file.'),
  m('administration', 'gerer-les-demandes-internes', 'Gérer les demandes internes', 'Handle internal requests', 'Des demandes enregistrées, orientées et suivies jusqu’à leur résolution.', 'Requests logged, routed and tracked through to resolution.'),
  m('administration', 'preparer-un-dossier-de-signature', 'Préparer un dossier de signature', 'Prepare a signature package', 'Un dossier complet avec les documents, signataires et échéances.', 'A complete package with documents, signatories and deadlines.'),
  m('administration', 'suivre-les-echeances-administratives', 'Suivre les échéances administratives', 'Track administrative deadlines', 'Un calendrier actualisé avec alertes et responsabilités.', 'An updated calendar with alerts and responsibilities.'),
  m('administration', 'mettre-a-jour-les-procedures-internes', 'Mettre à jour les procédures internes', 'Update internal procedures', 'Des procédures cohérentes, actualisées et faciles à consulter.', 'Consistent, up-to-date procedures that are easy to consult.'),
  m('administration', 'preparer-l-arrivee-d-un-prestataire', 'Préparer l’arrivée d’un prestataire', 'Prepare a vendor’s arrival', 'Les informations, accès et documents nécessaires sont prêts avant son arrivée.', 'The information, access and documents needed are ready before arrival.'),

  // ---------------- FINANCE & GESTION (regulated) ----------------
  m('finance', 'preparer-les-elements-de-facturation', 'Préparer les éléments de facturation', 'Prepare billing items', 'Les prestations et montants à facturer sont rassemblés et contrôlés.', 'The services and amounts to bill are gathered and checked.'),
  m('finance', 'preparer-les-factures', 'Préparer les factures', 'Prepare invoices', 'Des factures conformes aux données disponibles, prêtes à valider.', 'Invoices consistent with the available data, ready to approve.', { status: 'on-setup' }),
  m('finance', 'relancer-les-factures-impayees', 'Relancer les factures impayées', 'Follow up on unpaid invoices', 'Des relances adaptées à chaque situation et un suivi actualisé.', 'Follow-ups tailored to each situation and an updated tracker.', { status: 'on-setup', modality: 'email' }),
  m('finance', 'suivre-la-tresorerie', 'Suivre la trésorerie', 'Track cash flow', 'Une position de trésorerie claire et une liste des mouvements attendus.', 'A clear cash position and a list of expected movements.', { modality: 'donnees' }),
  m('finance', 'preparer-mon-reporting-financier', 'Préparer le reporting financier mensuel', 'Prepare the monthly financial report', 'Un reporting structuré avec les évolutions et écarts importants.', 'A structured report with key trends and variances.', { status: 'on-setup', modality: 'donnees' }),
  m('finance', 'analyser-les-ecarts-budgetaires', 'Analyser les écarts budgétaires', 'Analyze budget variances', 'Les principaux écarts sont identifiés, expliqués et documentés.', 'The main variances are identified, explained and documented.', { modality: 'donnees' }),
  m('finance', 'preparer-les-previsions-budgetaires', 'Préparer les prévisions budgétaires', 'Prepare budget forecasts', 'Une projection construite à partir des hypothèses validées.', 'A projection built from validated assumptions.', { modality: 'donnees' }),
  m('finance', 'controler-les-notes-de-frais', 'Contrôler les notes de frais', 'Check expense reports', 'Les pièces manquantes, doublons et anomalies sont signalés avant validation.', 'Missing receipts, duplicates and anomalies are flagged before approval.', { status: 'on-setup' }),
  m('finance', 'comparer-les-offres-fournisseurs', 'Comparer les offres fournisseurs', 'Compare supplier offers', 'Une comparaison structurée des prix, conditions et engagements.', 'A structured comparison of prices, terms and commitments.'),
  m('finance', 'suivre-les-renouvellements', 'Suivre les renouvellements', 'Track renewals', 'Les contrats et abonnements à renouveler sont identifiés avant échéance.', 'Contracts and subscriptions to renew are identified before the deadline.'),
  m('finance', 'preparer-une-revue-des-couts', 'Préparer une revue des coûts', 'Prepare a cost review', 'Une synthèse des dépenses et des pistes d’optimisation à examiner.', 'A summary of spending and optimization avenues to review.', { modality: 'donnees' }),
  m('finance', 'consolider-les-indicateurs-de-gestion', 'Consolider les indicateurs de gestion', 'Consolidate management KPIs', 'Un tableau de suivi actualisé à partir des différentes sources autorisées.', 'An updated dashboard built from the various authorized sources.', { dateAdded: '2026-08-02', modality: 'donnees' }),

  // ---------------- RH & RECRUTEMENT (regulated) ----------------
  m('rh', 'rediger-une-fiche-de-poste', 'Rédiger une fiche de poste', 'Write a job description', 'Une fiche claire décrivant la mission, les responsabilités et les compétences attendues.', 'A clear description of the role, responsibilities and expected skills.', { status: 'on-setup' }),
  m('rh', 'preselectionner-les-candidatures', 'Présélectionner les candidatures', 'Shortlist applications', 'Une sélection argumentée selon les critères validés par l’équipe RH.', 'A justified shortlist based on the criteria approved by HR.'),
  m('rh', 'analyser-les-cv', 'Analyser les CV', 'Analyze resumes', 'Une synthèse comparable des expériences et compétences déclarées.', 'A comparable summary of declared experience and skills.', { status: 'on-setup' }),
  m('rh', 'preparer-les-entretiens', 'Préparer les entretiens', 'Prepare interviews', 'Un dossier candidat et une trame d’entretien adaptés au poste.', 'A candidate brief and an interview guide tailored to the role.'),
  m('rh', 'organiser-les-entretiens', 'Organiser les entretiens', 'Schedule interviews', 'Des créneaux coordonnés et des confirmations envoyées aux participants.', 'Coordinated slots and confirmations sent to participants.', { modality: 'automatisation' }),
  m('rh', 'rediger-les-comptes-rendus-d-entretien', 'Rédiger les comptes rendus d’entretien', 'Write interview notes', 'Une synthèse structurée des éléments observés pendant l’entretien.', 'A structured summary of what was observed during the interview.', { status: 'on-setup' }),
  m('rh', 'preparer-l-arrivee-d-un-collaborateur', 'Préparer l’arrivée d’un collaborateur', 'Prepare an employee’s onboarding', 'Un parcours d’intégration avec documents, rendez-vous et responsabilités.', 'An onboarding path with documents, meetings and responsibilities.'),
  m('rh', 'repondre-aux-questions-rh', 'Répondre aux questions RH internes', 'Answer internal HR questions', 'Des réponses fondées sur les politiques internes et les sources autorisées.', 'Answers grounded in internal policies and authorized sources.', { modality: 'chat' }),
  m('rh', 'preparer-un-plan-de-formation', 'Préparer un plan de formation', 'Prepare a training plan', 'Un programme adapté aux besoins, priorités et disponibilités.', 'A program tailored to needs, priorities and availability.', { dateAdded: '2026-07-30' }),
  m('rh', 'suivre-les-formations', 'Suivre les formations', 'Track training', 'Une vue à jour des inscriptions, progrès et attestations.', 'An up-to-date view of enrollments, progress and certificates.'),
  m('rh', 'preparer-les-campagnes-d-entretiens', 'Préparer les campagnes d’entretiens', 'Prepare review campaigns', 'Un calendrier, des supports et des relances prêts pour chaque équipe.', 'A schedule, materials and reminders ready for each team.'),
  m('rh', 'analyser-les-retours-des-collaborateurs', 'Analyser les retours des collaborateurs', 'Analyze employee feedback', 'Une synthèse anonymisée des thèmes, tendances et points d’attention.', 'An anonymized summary of themes, trends and points of attention.', { modality: 'donnees' }),

  // ---------------- DIRECTION & PILOTAGE ----------------
  m('direction', 'preparer-le-dossier-de-comite', 'Préparer le dossier de comité de direction', 'Prepare the board committee pack', 'Un dossier consolidé avec indicateurs, décisions attendues et documents utiles.', 'A consolidated pack with metrics, expected decisions and useful documents.'),
  m('direction', 'produire-un-rapport-d-activite', 'Produire un rapport d’activité', 'Produce an activity report', 'Une synthèse structurée des réalisations, résultats et priorités.', 'A structured summary of achievements, results and priorities.', { status: 'on-setup' }),
  m('direction', 'suivre-les-objectifs', 'Suivre les objectifs de l’organisation', 'Track organizational objectives', 'Une vue actualisée des objectifs, progrès, risques et responsables.', 'An updated view of objectives, progress, risks and owners.', { modality: 'donnees' }),
  m('direction', 'preparer-une-revue-strategique', 'Préparer une revue stratégique', 'Prepare a strategic review', 'Un dossier mettant en évidence les évolutions, scénarios et arbitrages.', 'A file highlighting changes, scenarios and trade-offs.'),
  m('direction', 'suivre-les-decisions-de-direction', 'Suivre les décisions de direction', 'Track leadership decisions', 'Un registre des décisions, responsables, échéances et états d’avancement.', 'A register of decisions, owners, deadlines and progress.'),
  m('direction', 'consolider-les-indicateurs-cles', 'Consolider les indicateurs clés', 'Consolidate key metrics', 'Un tableau cohérent à partir des sources validées par l’organisation.', 'A consistent dashboard from the sources validated by the organization.', { modality: 'donnees' }),
  m('direction', 'preparer-une-note-de-decision', 'Préparer une note de décision', 'Prepare a decision memo', 'Une synthèse des options, conséquences et éléments à arbitrer.', 'A summary of options, consequences and points to arbitrate.'),
  m('direction', 'produire-une-synthese-executive', 'Produire une synthèse exécutive', 'Produce an executive summary', 'Une lecture courte des faits importants et des actions attendues.', 'A short read of the key facts and expected actions.', { status: 'on-setup' }),
  m('direction', 'suivre-les-risques-operationnels', 'Suivre les risques opérationnels', 'Track operational risks', 'Une cartographie actualisée des risques, signaux et mesures prévues.', 'An updated map of risks, signals and planned measures.'),
  m('direction', 'preparer-une-communication-interne', 'Préparer une communication interne', 'Prepare internal communication', 'Un message structuré expliquant une décision ou une évolution importante.', 'A structured message explaining an important decision or change.', { status: 'on-setup' }),
  m('direction', 'coordonner-un-projet-transversal', 'Coordonner un projet transversal', 'Coordinate a cross-functional project', 'Un suivi partagé des actions, dépendances, responsables et blocages.', 'A shared tracker of actions, dependencies, owners and blockers.', { dateAdded: '2026-07-28' }),
  m('direction', 'preparer-une-revue-de-performance', 'Préparer une revue de performance', 'Prepare a performance review', 'Une synthèse des résultats, écarts et priorités de la prochaine période.', 'A summary of results, gaps and priorities for the next period.', { modality: 'donnees' }),

  // ---------------- DOCUMENTS & CONNAISSANCES ----------------
  m('documents', 'resumer-un-dossier', 'Résumer un dossier', 'Summarize a file', 'Une synthèse fidèle mettant en évidence les faits et points de décision.', 'A faithful summary highlighting the facts and decision points.', { status: 'on-setup' }),
  m('documents', 'comparer-plusieurs-documents', 'Analyser plusieurs documents', 'Analyze multiple documents', 'Les différences, convergences et contradictions sont clairement présentées.', 'Differences, overlaps and contradictions are clearly presented.'),
  m('documents', 'extraire-les-informations-cles', 'Extraire les informations clés', 'Extract key information', 'Les données recherchées sont structurées avec leur source.', 'The requested data is structured with its source.', { status: 'on-setup' }),
  m('documents', 'construire-une-base-de-connaissances', 'Construire une base de connaissances', 'Build a knowledge base', 'Des contenus organisés, reliés et faciles à retrouver.', 'Content organized, linked and easy to find.', { collections: ['produire-communiquer', 'piloter-organisation'] }),
  m('documents', 'mettre-a-jour-une-base-documentaire', 'Mettre à jour une base documentaire', 'Update a document base', 'Les contenus obsolètes et les informations nouvelles sont identifiés.', 'Outdated content and new information are identified.'),
  m('documents', 'rediger-une-procedure', 'Rédiger une procédure', 'Write a procedure', 'Une procédure claire, structurée et directement applicable.', 'A clear, structured and directly applicable procedure.', { status: 'on-setup' }),
  m('documents', 'transformer-des-notes-en-document', 'Transformer des notes en document', 'Turn notes into a document', 'Un document cohérent produit à partir de notes dispersées.', 'A coherent document produced from scattered notes.'),
  m('documents', 'preparer-une-presentation', 'Préparer une présentation', 'Prepare a presentation', 'Une présentation structurée avec messages, données et déroulé.', 'A structured presentation with messages, data and flow.'),
  m('documents', 'classer-un-fonds-documentaire', 'Classer un fonds documentaire', 'Organize a document collection', 'Des documents catégorisés selon une nomenclature cohérente.', 'Documents categorized with a consistent taxonomy.'),
  m('documents', 'verifier-la-coherence-d-un-document', 'Vérifier la cohérence d’un document', 'Check a document’s consistency', 'Les contradictions, omissions et incohérences sont signalées.', 'Contradictions, omissions and inconsistencies are flagged.'),
  m('documents', 'produire-une-chronologie', 'Produire une chronologie', 'Produce a timeline', 'Les événements sont ordonnés avec dates, sources et liens utiles.', 'Events are ordered with dates, sources and useful links.'),
  m('documents', 'preparer-un-dossier-de-reference', 'Préparer un dossier de référence', 'Prepare a reference file', 'Les documents et informations essentiels sont réunis dans un espace structuré.', 'Essential documents and information are gathered in a structured space.'),

  // ---------------- ANALYSE, RECHERCHE & VEILLE ----------------
  m('analyse', 'realiser-une-veille-concurrentielle', 'Réaliser une veille concurrentielle', 'Run competitive monitoring', 'Une synthèse régulière des mouvements, offres et communications concurrentes.', 'A regular summary of competitor moves, offers and communications.', { status: 'on-setup', collections: ['piloter-organisation', 'developper-activite'] }),
  m('analyse', 'surveiller-un-marche', 'Surveiller un marché', 'Monitor a market', 'Les évolutions importantes, nouveaux acteurs et signaux faibles sont identifiés.', 'Key shifts, new entrants and weak signals are identified.'),
  m('analyse', 'comparer-les-offres-concurrentes', 'Comparer les offres concurrentes', 'Compare competitor offers', 'Une matrice comparable des fonctionnalités, prix et positionnements.', 'A comparable matrix of features, prices and positioning.', { status: 'on-setup' }),
  m('analyse', 'analyser-les-ventes', 'Analyser les ventes', 'Analyze sales', 'Les tendances, écarts et facteurs significatifs sont mis en évidence.', 'Trends, gaps and significant drivers are highlighted.', { modality: 'donnees' }),
  m('analyse', 'analyser-les-retours-clients', 'Analyser les retours clients', 'Analyze customer feedback', 'Les thèmes, attentes et irritants sont regroupés et quantifiés.', 'Themes, expectations and pain points are grouped and quantified.', { modality: 'donnees' }),
  m('analyse', 'rechercher-des-informations-publiques', 'Rechercher des informations publiques', 'Research public information', 'Une recherche documentée avec sources, dates et niveau de confiance.', 'Documented research with sources, dates and confidence level.'),
  m('analyse', 'preparer-une-etude-de-marche', 'Préparer une étude de marché', 'Prepare a market study', 'Un dossier structuré sur le marché, les clients et les principaux acteurs.', 'A structured file on the market, customers and key players.'),
  m('analyse', 'suivre-les-actualites-d-un-secteur', 'Suivre les actualités d’un secteur', 'Track industry news', 'Une sélection qualifiée des informations ayant un impact potentiel.', 'A qualified selection of news with potential impact.'),
  m('analyse', 'detecter-les-tendances-emergentes', 'Détecter les tendances émergentes', 'Detect emerging trends', 'Des signaux regroupés par thème et accompagnés de leur source.', 'Signals grouped by theme and accompanied by their source.'),
  m('analyse', 'analyser-un-ensemble-de-donnees', 'Analyser un ensemble de données', 'Analyze a dataset', 'Une synthèse des tendances et anomalies observées dans les données fournies.', 'A summary of trends and anomalies observed in the provided data.', { modality: 'donnees' }),
  m('analyse', 'preparer-un-benchmark', 'Préparer un benchmark', 'Prepare a benchmark', 'Une comparaison structurée selon les critères définis par l’équipe.', 'A structured comparison based on the criteria set by the team.'),
  m('analyse', 'produire-une-note-de-veille', 'Produire une note de veille', 'Produce a monitoring brief', 'Une note courte présentant les faits, conséquences possibles et sources.', 'A short brief with the facts, possible consequences and sources.', { status: 'on-setup', dateAdded: '2026-08-05' }),

  // ---------------- OPÉRATIONS & AUTOMATISATION ----------------
  m('operations', 'automatiser-mes-operations', 'Automatiser une tâche répétitive', 'Automate a repetitive task', 'Un processus documenté, contrôlé et surveillé après validation.', 'A process documented, controlled and monitored after approval.', { status: 'available', dateAdded: '2026-06-10' }),
  m('operations', 'synchroniser-les-donnees', 'Synchroniser les données entre applications', 'Sync data across applications', 'Des informations cohérentes et mises à jour entre les services autorisés.', 'Consistent, up-to-date information across the authorized services.'),
  m('operations', 'mettre-a-jour-le-crm-automatiquement', 'Mettre à jour le CRM automatiquement', 'Update the CRM automatically', 'Les fiches et activités sont actualisées à partir des événements validés.', 'Records and activities are updated from the validated events.'),
  m('operations', 'controler-l-execution-d-un-processus', 'Contrôler l’exécution d’un processus', 'Monitor a process execution', 'Les étapes, retards et anomalies sont suivis dans une vue unique.', 'Steps, delays and anomalies are tracked in a single view.'),
  m('operations', 'detecter-les-anomalies-operationnelles', 'Détecter les anomalies opérationnelles', 'Detect operational anomalies', 'Les situations inhabituelles sont signalées avec leur contexte.', 'Unusual situations are flagged with their context.', { modality: 'donnees' }),
  m('operations', 'preparer-les-alertes-metier', 'Préparer les alertes métier', 'Set up business alerts', 'Des alertes pertinentes sont générées selon les seuils définis.', 'Relevant alerts are generated based on the defined thresholds.'),
  m('operations', 'traiter-les-demandes-recurrentes', 'Traiter les demandes récurrentes', 'Handle recurring requests', 'Les demandes standard sont exécutées selon un processus validé.', 'Standard requests are executed following an approved process.'),
  m('operations', 'coordonner-un-processus-d-approbation', 'Coordonner un processus d’approbation', 'Coordinate an approval process', 'Chaque validation est adressée à la bonne personne et suivie jusqu’à décision.', 'Each approval is routed to the right person and tracked to a decision.'),
  m('operations', 'controler-la-qualite-des-donnees', 'Contrôler la qualité des données', 'Check data quality', 'Les doublons, valeurs manquantes et incohérences sont identifiés.', 'Duplicates, missing values and inconsistencies are identified.', { status: 'on-setup', modality: 'donnees' }),
  m('operations', 'preparer-un-rapport-d-exploitation', 'Préparer un rapport d’exploitation', 'Prepare an operations report', 'Une synthèse des volumes, incidents, délais et actions importantes.', 'A summary of volumes, incidents, delays and key actions.', { modality: 'donnees' }),
  m('operations', 'suivre-les-engagements-fournisseurs', 'Suivre les engagements fournisseurs', 'Track supplier commitments', 'Les échéances, niveaux de service et écarts sont consolidés.', 'Deadlines, service levels and gaps are consolidated.'),
  m('operations', 'documenter-un-processus-automatise', 'Documenter un processus automatisé', 'Document an automated process', 'Une documentation claire décrit les déclencheurs, étapes, contrôles et limites.', 'Clear documentation describes triggers, steps, controls and limits.', { status: 'on-setup', dateAdded: '2026-07-25' }),

  // ---------------- PRODUIT, DESIGN & TECHNOLOGIE ----------------
  m('produit', 'synthetiser-les-retours-utilisateurs', 'Synthétiser les retours utilisateurs', 'Synthesize user feedback', 'Les besoins, irritants et demandes sont regroupés par thème et priorité.', 'Needs, pain points and requests are grouped by theme and priority.', { status: 'on-setup', modality: 'donnees' }),
  m('produit', 'preparer-une-specification-fonctionnelle', 'Préparer une spécification fonctionnelle', 'Prepare a functional spec', 'Une spécification claire avec besoins, comportements et critères d’acceptation.', 'A clear spec with needs, behaviors and acceptance criteria.'),
  m('produit', 'rediger-des-recits-utilisateurs', 'Rédiger des récits utilisateurs', 'Write user stories', 'Des récits structurés accompagnés de critères de validation.', 'Structured stories with validation criteria.', { status: 'on-setup' }),
  m('produit', 'preparer-une-feuille-de-route-produit', 'Préparer une feuille de route produit', 'Prepare a product roadmap', 'Une proposition de priorités reliée aux objectifs et dépendances.', 'A proposed set of priorities tied to objectives and dependencies.'),
  m('produit', 'analyser-une-interface', 'Analyser une interface', 'Analyze an interface', 'Les problèmes de compréhension, d’accessibilité et de conversion sont documentés.', 'Comprehension, accessibility and conversion issues are documented.'),
  m('produit', 'preparer-une-maquette-fonctionnelle', 'Préparer une maquette fonctionnelle', 'Prepare a functional mockup', 'Une proposition d’interface structurée autour du parcours attendu.', 'An interface proposal structured around the expected journey.', { modality: 'image' }),
  m('produit', 'produire-des-variantes-visuelles', 'Produire des variantes visuelles', 'Produce visual variants', 'Des déclinaisons cohérentes respectant les contraintes de marque.', 'Consistent variations that respect the brand constraints.', { modality: 'image' }),
  m('produit', 'preparer-une-video-explicative', 'Préparer une vidéo explicative', 'Prepare an explainer video', 'Un scénario, un découpage et les éléments nécessaires à la production.', 'A script, a storyboard and the elements needed for production.', { modality: 'video' }),
  m('produit', 'analyser-une-anomalie-technique', 'Analyser une anomalie technique', 'Analyze a technical bug', 'Une hypothèse de cause, des preuves et un plan de correction sont documentés.', 'A root-cause hypothesis, evidence and a fix plan are documented.', { modality: 'code' }),
  m('produit', 'preparer-les-tests-d-une-fonctionnalite', 'Préparer les tests d’une fonctionnalité', 'Prepare feature tests', 'Des scénarios de test couvrent les comportements attendus et les cas limites.', 'Test scenarios cover the expected behaviors and edge cases.', { modality: 'code' }),
  m('produit', 'reviser-une-modification-de-code', 'Réviser une modification de code', 'Review a code change', 'Les risques, défauts et améliorations sont présentés de manière argumentée.', 'Risks, defects and improvements are presented with clear reasoning.', { modality: 'code' }),
  m('produit', 'rediger-la-documentation-technique', 'Rédiger la documentation technique', 'Write technical documentation', 'Une documentation claire décrit l’installation, l’utilisation et les limites.', 'Clear documentation describes installation, usage and limits.', { status: 'on-setup', dateAdded: '2026-08-04', modality: 'code' }),
]

export const MISSIONS: Mission[] = SEEDS.map((seed, i) => buildMission(seed, i))

// --- Helpers ----------------------------------------------------------------
export function getMission(slug: string): Mission | undefined {
  return MISSIONS.find((mi) => mi.slug === slug)
}

export function relatedMissions(mission: Mission, count = 3): Mission[] {
  return MISSIONS.filter((mi) => mi.category === mission.category && mi.slug !== mission.slug).slice(0, count)
}

// Thin adapter kept for components that read resolved facets off a mission.
export function missionFacets(mi: Mission) {
  return {
    sectors: mi.sectors,
    zones: mi.zones,
    languages: mi.languages,
    modalities: mi.modalities,
    modality: mi.modalities[0],
    status: mi.status,
  }
}

export function categoryCount(categoryKey: string): number {
  return MISSIONS.filter((mi) => mi.category === categoryKey).length
}

// Editorial "À la une" selection (4 missions across different functions).
export const FEATURED_SLUGS = [
  'trouver-de-nouveaux-clients',
  'repondre-a-mes-clients',
  'preparer-et-suivre-mes-reunions',
  'relancer-les-factures-impayees',
  'suivre-les-reclamations',
  'comparer-plusieurs-documents',
]

// Kept for backward compatibility with earlier UI (3 high-impact).
export const HIGH_IMPACT_SLUGS = ['trouver-de-nouveaux-clients', 'repondre-a-mes-clients', 'automatiser-mes-operations']

export function featuredMissions(): Mission[] {
  return FEATURED_SLUGS.map((s) => getMission(s)).filter(Boolean) as Mission[]
}

// "Ajoutées récemment": the newest by real dateAdded.
export function recentMissions(count = 6): Mission[] {
  return [...MISSIONS].sort((a, b) => (a.dateAdded < b.dateAdded ? 1 : -1)).slice(0, count)
}

// Search synonym groups (any term in a group matches the others).
export const SEARCH_SYNONYMS: string[][] = [
  ['prospect', 'lead', 'opportunite'],
  ['client', 'acheteur', 'usager'],
  ['support', 'sav', 'relation client'],
  ['email', 'e-mail', 'courriel', 'messagerie'],
  ['telephone', 'appel', 'standard'],
  ['reunion', 'rendez-vous', 'meeting'],
  ['compte rendu', 'synthese', 'proces-verbal'],
  ['vente', 'commercial', 'prospection'],
  ['facture', 'facturation', 'reglement'],
  ['impaye', 'retard de paiement', 'relance'],
  ['recrutement', 'candidature', 'cv'],
  ['document', 'fichier', 'pdf', 'dossier'],
  ['veille', 'recherche', 'surveillance'],
  ['automatisation', 'processus', 'workflow'],
  ['logiciel', 'application', 'outil'],
  ['code', 'developpement', 'programmation'],
  ['contenu', 'article', 'publication'],
  ['reseau social', 'social media'],
  ['tableau de bord', 'reporting', 'indicateur'],
]
