// Store catalog: the equipment that outfits an AI Collaborator.
//
// Three item types share ONE shape (StoreItem) so the catalog page can mix them
// in a single grid and reuse the same card, filters, sort and search as the
// Missions catalog:
//   - profil     : a durable job role and its know-how
//   - competence : a precise, reusable skill
//   - application: a service the Collaborator can work in (with granted rights)
//
// Data is anchored on what already exists in the project (roles, skills, tools
// from collaborators-catalog) plus a curated list of real applications. Every
// counter shown in the UI is computed from this data — nothing is invented.

import type { Bilingual } from '@/lib/collaborators-catalog'
import type { Lang } from '@/lib/language-context'

export type StoreType = 'profil' | 'competence' | 'application'

// Who created/published the Store item. Applications also carry an `editor`
// (the software vendor), which is distinct from the integration creator.
export type Creator = 'unitalk' | 'community'

export type StoreItem = {
  type: StoreType
  slug: string
  name: Bilingual
  description: Bilingual
  creator: Creator
  // Contextual facet key: domain (profil), category (competence/application).
  facet: string
  // Applications only: the software vendor shown on the card instead of creator.
  editor?: string
  // Rich fiche fields (all optional; rendered when present).
  roleInOrg?: Bilingual
  knowHow?: Bilingual[]
  exampleMissions?: Bilingual[]
  relatedSkills?: string[] // competence slugs
  possibleApps?: string[] // application slugs
  enables?: Bilingual[]
  produces?: Bilingual[]
  contexts?: Bilingual[]
  relatedProfiles?: string[] // profil slugs
  neededApps?: string[] // application slugs
  uses?: Bilingual[]
  actions?: Bilingual[]
  dataAccessed?: Bilingual[]
  permissions?: Bilingual[]
  connection?: Bilingual
  compatibleProfiles?: string[]
  compatibleSkills?: string[]
  integrationBy?: string
  order: number
  dateAdded: string
  keywords: string[]
}

// --- Type metadata ---------------------------------------------------------
export const TYPE_SLUGS: Record<StoreType, string> = {
  profil: 'profils-metier',
  competence: 'competences',
  application: 'applications',
}

export const TYPE_BY_SLUG: Record<string, StoreType> = {
  'profils-metier': 'profil',
  competences: 'competence',
  applications: 'application',
}

export const TYPE_LABELS: Record<StoreType, Bilingual> = {
  profil: { fr: 'Profil métier', en: 'Job profile' },
  competence: { fr: 'Compétence', en: 'Skill' },
  application: { fr: 'Application', en: 'Application' },
}

// Plural labels used in the Type filter and result titles.
export const TYPE_LABELS_PLURAL: Record<StoreType, Bilingual> = {
  profil: { fr: 'Profils métier', en: 'Job profiles' },
  competence: { fr: 'Compétences', en: 'Skills' },
  application: { fr: 'Applications', en: 'Applications' },
}

export const CREATOR_LABELS: Record<Creator | 'all', Bilingual> = {
  all: { fr: 'Tous', en: 'All' },
  unitalk: { fr: 'Unitalk', en: 'Unitalk' },
  community: { fr: 'Communauté', en: 'Community' },
}

// --- Contextual facet labels -----------------------------------------------
// Domains for profils métier (section 7).
export const DOMAIN_LABELS: Record<string, Bilingual> = {
  ventes: { fr: 'Ventes', en: 'Sales' },
  'relation-client': { fr: 'Relation client', en: 'Customer relations' },
  marketing: { fr: 'Marketing et communication', en: 'Marketing & communication' },
  administration: { fr: 'Administration', en: 'Administration' },
  finance: { fr: 'Finance et gestion', en: 'Finance & management' },
  rh: { fr: 'Ressources humaines', en: 'Human resources' },
  direction: { fr: 'Direction et pilotage', en: 'Leadership & steering' },
  operations: { fr: 'Opérations', en: 'Operations' },
}

// Categories for compétences (section 7).
export const SKILL_CATEGORY_LABELS: Record<string, Bilingual> = {
  ventes: { fr: 'Ventes et prospection', en: 'Sales & prospecting' },
  'relation-client': { fr: 'Relation client', en: 'Customer relations' },
  marketing: { fr: 'Marketing et communication', en: 'Marketing & communication' },
  reunions: { fr: 'Réunions et coordination', en: 'Meetings & coordination' },
  administration: { fr: 'Administration', en: 'Administration' },
  finance: { fr: 'Finance et gestion', en: 'Finance & management' },
  rh: { fr: 'Ressources humaines', en: 'Human resources' },
  documents: { fr: 'Documents et connaissances', en: 'Documents & knowledge' },
  operations: { fr: 'Opérations', en: 'Operations' },
}

// Categories for applications (section 7).
export const APP_CATEGORY_LABELS: Record<string, Bilingual> = {
  communication: { fr: 'Communication', en: 'Communication' },
  messagerie: { fr: 'Messagerie', en: 'Email' },
  collaboration: { fr: 'Collaboration', en: 'Collaboration' },
  documents: { fr: 'Gestion documentaire', en: 'Document management' },
  'relation-client': { fr: 'Relation client', en: 'Customer relations' },
  ventes: { fr: 'Ventes', en: 'Sales' },
  finance: { fr: 'Finance', en: 'Finance' },
  rh: { fr: 'Ressources humaines', en: 'Human resources' },
  productivite: { fr: 'Productivité', en: 'Productivity' },
}

// Returns the right contextual-facet label map for a given type.
export function facetLabels(type: StoreType): Record<string, Bilingual> {
  if (type === 'profil') return DOMAIN_LABELS
  if (type === 'competence') return SKILL_CATEGORY_LABELS
  return APP_CATEGORY_LABELS
}

/* ========================================================================= */
/* Data                                                                       */
/* ========================================================================= */

// --- Profils métier --------------------------------------------------------
const PROFILS: StoreItem[] = [
  {
    type: 'profil',
    slug: 'assistante-de-direction',
    name: { fr: 'Assistante de direction', en: 'Executive assistant' },
    description: {
      fr: 'Prépare les réunions, organise les priorités et assure le suivi des décisions.',
      en: 'Prepares meetings, organizes priorities and follows up on decisions.',
    },
    creator: 'unitalk',
    facet: 'direction',
    roleInOrg: {
      fr: "Bras droit de la direction, garant du bon déroulement de l'agenda et des dossiers.",
      en: 'Right hand of leadership, keeping the agenda and files on track.',
    },
    knowHow: [
      { fr: "Gestion d'agenda et priorisation", en: 'Calendar management and prioritization' },
      { fr: 'Préparation de réunions et comptes-rendus', en: 'Meeting prep and minutes' },
      { fr: 'Coordination des déplacements', en: 'Travel coordination' },
      { fr: 'Filtrage et tri des demandes', en: 'Request filtering and triage' },
    ],
    exampleMissions: [
      { fr: 'Organiser le comité de direction hebdomadaire', en: 'Organize the weekly leadership committee' },
      { fr: 'Préparer un dossier de décision avant réunion', en: 'Prepare a decision brief before a meeting' },
    ],
    relatedSkills: ['preparer-une-reunion', 'organiser-les-priorites', 'rediger-un-compte-rendu'],
    possibleApps: ['google-agenda', 'outlook', 'notion', 'slack'],
    order: 1,
    dateAdded: '2025-01-06',
    keywords: ['assistant', 'direction', 'agenda', 'reunion', 'executive', 'emma'],
  },
  {
    type: 'profil',
    slug: 'support-client',
    name: { fr: 'Support client', en: 'Customer support' },
    description: {
      fr: 'Traite les demandes, qualifie les situations et transmet les cas nécessitant une intervention.',
      en: 'Handles requests, qualifies situations and escalates cases that need attention.',
    },
    creator: 'unitalk',
    facet: 'relation-client',
    roleInOrg: {
      fr: 'Premier interlocuteur des clients, garant de réponses rapides et fiables.',
      en: 'First point of contact for customers, ensuring fast, reliable answers.',
    },
    knowHow: [
      { fr: 'Réponses aux demandes clients', en: 'Handling customer requests' },
      { fr: 'Résolution de tickets', en: 'Ticket resolution' },
      { fr: 'Escalade intelligente', en: 'Smart escalation' },
      { fr: 'Suivi de satisfaction', en: 'Satisfaction follow-up' },
    ],
    exampleMissions: [
      { fr: 'Traiter la file de tickets du matin', en: 'Clear the morning ticket queue' },
      { fr: 'Répondre à une réclamation sensible', en: 'Handle a sensitive complaint' },
    ],
    relatedSkills: ['repondre-aux-appels', 'resoudre-un-ticket', 'qualifier-une-demande'],
    possibleApps: ['zendesk', 'gmail', 'slack'],
    order: 2,
    dateAdded: '2025-01-05',
    keywords: ['support', 'client', 'ticket', 'sav', 'ines', 'aide'],
  },
  {
    type: 'profil',
    slug: 'commercial',
    name: { fr: 'Commercial', en: 'Sales representative' },
    description: {
      fr: 'Identifie les opportunités, prépare les prises de contact et suit les échanges commerciaux.',
      en: 'Spots opportunities, prepares outreach and tracks sales conversations.',
    },
    creator: 'community',
    facet: 'ventes',
    roleInOrg: {
      fr: 'Moteur du développement commercial, du premier contact au suivi du pipeline.',
      en: 'Engine of business development, from first contact to pipeline follow-up.',
    },
    knowHow: [
      { fr: 'Prospection et qualification', en: 'Prospecting and qualification' },
      { fr: 'Suivi du pipeline', en: 'Pipeline tracking' },
      { fr: 'Relances automatiques', en: 'Automated follow-ups' },
      { fr: 'Préparation de rendez-vous', en: 'Meeting preparation' },
    ],
    exampleMissions: [
      { fr: 'Qualifier les nouveaux leads entrants', en: 'Qualify new inbound leads' },
      { fr: 'Relancer les opportunités dormantes', en: 'Re-engage dormant opportunities' },
    ],
    relatedSkills: ['qualifier-un-prospect', 'relancer-une-opportunite', 'preparer-un-rendez-vous'],
    possibleApps: ['hubspot', 'salesforce', 'linkedin'],
    order: 3,
    dateAdded: '2025-01-04',
    keywords: ['commercial', 'vente', 'prospect', 'crm', 'hugo', 'pipeline'],
  },
  {
    type: 'profil',
    slug: 'content-strategist',
    name: { fr: 'Responsable de contenu', en: 'Content strategist' },
    description: {
      fr: 'Construit la ligne éditoriale, planifie le calendrier et décline les messages sur chaque canal.',
      en: 'Builds the editorial line, plans the calendar and adapts messages per channel.',
    },
    creator: 'unitalk',
    facet: 'marketing',
    roleInOrg: {
      fr: 'Gardien de la voix de la marque et de la régularité des publications.',
      en: 'Keeper of the brand voice and publishing cadence.',
    },
    knowHow: [
      { fr: 'Stratégie de contenu', en: 'Content strategy' },
      { fr: 'Calendrier éditorial', en: 'Editorial calendar' },
      { fr: 'Rédaction et SEO', en: 'Writing and SEO' },
      { fr: 'Analyse de performance', en: 'Performance analysis' },
    ],
    exampleMissions: [
      { fr: 'Définir la ligne éditoriale du trimestre', en: 'Define the quarterly editorial line' },
      { fr: 'Rédiger une série d’articles de blog', en: 'Write a series of blog posts' },
    ],
    relatedSkills: ['rediger-un-article', 'planifier-un-calendrier-editorial'],
    possibleApps: ['notion', 'canva', 'google-drive'],
    order: 4,
    dateAdded: '2025-01-03',
    keywords: ['marketing', 'contenu', 'editorial', 'redaction', 'lea', 'seo'],
  },
  {
    type: 'profil',
    slug: 'analyste-financier',
    name: { fr: 'Analyste financier', en: 'Financial analyst' },
    description: {
      fr: 'Consolide les données financières, suit les indicateurs et prépare les prévisions.',
      en: 'Consolidates financial data, tracks metrics and prepares forecasts.',
    },
    creator: 'unitalk',
    facet: 'finance',
    roleInOrg: {
      fr: 'Traducteur des chiffres en décisions, du reporting aux prévisions.',
      en: 'Turns numbers into decisions, from reporting to forecasting.',
    },
    knowHow: [
      { fr: 'Analyse financière', en: 'Financial analysis' },
      { fr: 'Prévisions et budgets', en: 'Forecasting and budgeting' },
      { fr: 'Suivi des indicateurs', en: 'KPI tracking' },
      { fr: 'Reporting de direction', en: 'Executive reporting' },
    ],
    exampleMissions: [
      { fr: 'Préparer le reporting financier mensuel', en: 'Prepare the monthly financial report' },
      { fr: 'Analyser les écarts budgétaires', en: 'Analyze budget variances' },
    ],
    relatedSkills: ['analyser-des-documents', 'preparer-un-reporting'],
    possibleApps: ['excel', 'google-drive'],
    order: 5,
    dateAdded: '2025-01-02',
    keywords: ['finance', 'analyste', 'reporting', 'budget', 'nadia', 'kpi'],
  },
  {
    type: 'profil',
    slug: 'developpeur',
    name: { fr: 'Développeur', en: 'Developer' },
    description: {
      fr: 'Écrit du code, relit les contributions, corrige les bugs et documente les fonctionnalités.',
      en: 'Writes code, reviews contributions, fixes bugs and documents features.',
    },
    creator: 'community',
    facet: 'operations',
    roleInOrg: {
      fr: "Contributeur technique de l'équipe produit, du code à la livraison.",
      en: 'Technical contributor to the product team, from code to shipping.',
    },
    knowHow: [
      { fr: 'Écriture de code', en: 'Code writing' },
      { fr: 'Revue de code', en: 'Code review' },
      { fr: 'Correction de bugs', en: 'Bug fixing' },
      { fr: 'Documentation technique', en: 'Technical documentation' },
    ],
    exampleMissions: [
      { fr: 'Implémenter une nouvelle fonctionnalité', en: 'Implement a new feature' },
      { fr: 'Documenter une API', en: 'Document an API' },
    ],
    relatedSkills: ['analyser-des-documents'],
    possibleApps: ['github', 'slack'],
    order: 6,
    dateAdded: '2025-01-01',
    keywords: ['developpeur', 'code', 'technique', 'arthur', 'bug', 'api'],
  },
  {
    type: 'profil',
    slug: 'charge-de-recrutement',
    name: { fr: 'Chargé de recrutement', en: 'Recruiter' },
    description: {
      fr: 'Rédige les offres, trie les candidatures et coordonne les entretiens.',
      en: 'Writes job posts, screens applications and coordinates interviews.',
    },
    creator: 'unitalk',
    facet: 'rh',
    roleInOrg: {
      fr: 'Premier contact des candidats, garant d’un processus fluide et équitable.',
      en: 'First contact for candidates, ensuring a smooth, fair process.',
    },
    knowHow: [
      { fr: 'Rédaction d’offres', en: 'Writing job posts' },
      { fr: 'Tri de candidatures', en: 'Application screening' },
      { fr: 'Planification d’entretiens', en: 'Interview scheduling' },
      { fr: 'Suivi des candidats', en: 'Candidate follow-up' },
    ],
    exampleMissions: [
      { fr: 'Trier les candidatures d’une offre', en: 'Screen applications for a job post' },
      { fr: 'Coordonner un cycle d’entretiens', en: 'Coordinate an interview cycle' },
    ],
    relatedSkills: ['qualifier-une-demande', 'organiser-les-priorites'],
    possibleApps: ['gmail', 'notion', 'google-agenda'],
    order: 7,
    dateAdded: '2024-12-28',
    keywords: ['rh', 'recrutement', 'candidat', 'entretien', 'sourcing'],
  },
  {
    type: 'profil',
    slug: 'gestionnaire-administratif',
    name: { fr: 'Gestionnaire administratif', en: 'Administrative officer' },
    description: {
      fr: 'Traite les documents, tient les dossiers à jour et fluidifie les démarches internes.',
      en: 'Processes documents, keeps records up to date and smooths internal procedures.',
    },
    creator: 'unitalk',
    facet: 'administration',
    roleInOrg: {
      fr: 'Colonne vertébrale administrative, garant de dossiers propres et à jour.',
      en: 'Administrative backbone, keeping records clean and current.',
    },
    knowHow: [
      { fr: 'Gestion documentaire', en: 'Document management' },
      { fr: 'Saisie et mise à jour de dossiers', en: 'Record entry and updates' },
      { fr: 'Suivi des échéances', en: 'Deadline tracking' },
    ],
    exampleMissions: [
      { fr: 'Mettre à jour un dossier client complet', en: 'Update a full client record' },
      { fr: 'Classer et archiver les documents du mois', en: 'File and archive the month’s documents' },
    ],
    relatedSkills: ['analyser-des-documents', 'organiser-les-priorites'],
    possibleApps: ['google-drive', 'sharepoint', 'excel'],
    order: 8,
    dateAdded: '2024-12-20',
    keywords: ['administration', 'dossier', 'document', 'gestion', 'classement'],
  },
  {
    type: 'profil',
    slug: 'coordinateur-operations',
    name: { fr: 'Coordinateur des opérations', en: 'Operations coordinator' },
    description: {
      fr: 'Orchestre les tâches, suit les échéances et fait le lien entre les équipes.',
      en: 'Orchestrates tasks, tracks deadlines and links teams together.',
    },
    creator: 'community',
    facet: 'operations',
    roleInOrg: {
      fr: 'Chef d’orchestre du quotidien opérationnel, garant du respect des délais.',
      en: 'Conductor of day-to-day operations, keeping timelines on track.',
    },
    knowHow: [
      { fr: 'Coordination inter-équipes', en: 'Cross-team coordination' },
      { fr: 'Suivi des tâches et jalons', en: 'Task and milestone tracking' },
      { fr: 'Automatisation de routines', en: 'Routine automation' },
    ],
    exampleMissions: [
      { fr: 'Suivre l’avancement d’un projet transverse', en: 'Track a cross-functional project' },
      { fr: 'Automatiser un suivi hebdomadaire', en: 'Automate a weekly follow-up' },
    ],
    relatedSkills: ['organiser-les-priorites', 'preparer-un-reporting'],
    possibleApps: ['notion', 'slack', 'google-agenda'],
    order: 9,
    dateAdded: '2024-12-15',
    keywords: ['operations', 'coordination', 'projet', 'suivi', 'ops'],
  },
]

// --- Compétences -----------------------------------------------------------
const COMPETENCES: StoreItem[] = [
  {
    type: 'competence',
    slug: 'preparer-une-reunion',
    name: { fr: 'Préparer une réunion', en: 'Prepare a meeting' },
    description: {
      fr: 'Réunit les informations utiles, structure l’ordre du jour et prépare les documents nécessaires.',
      en: 'Gathers useful information, structures the agenda and prepares the needed documents.',
    },
    creator: 'unitalk',
    facet: 'reunions',
    enables: [
      { fr: 'Arriver en réunion avec un ordre du jour clair', en: 'Walk into a meeting with a clear agenda' },
      { fr: 'Disposer des bons documents au bon moment', en: 'Have the right documents ready on time' },
    ],
    produces: [{ fr: 'Un ordre du jour et un dossier de préparation', en: 'An agenda and a prep brief' }],
    contexts: [{ fr: 'Comités, points d’équipe, rendez-vous clients', en: 'Committees, team syncs, client meetings' }],
    relatedProfiles: ['assistante-de-direction'],
    neededApps: ['google-agenda', 'notion'],
    order: 1,
    dateAdded: '2025-01-06',
    keywords: ['reunion', 'ordre du jour', 'preparation', 'comite', 'meeting'],
  },
  {
    type: 'competence',
    slug: 'repondre-aux-appels',
    name: { fr: 'Répondre aux appels', en: 'Answer calls' },
    description: {
      fr: 'Accueille l’appelant, qualifie sa demande et applique les règles de réponse ou de transfert.',
      en: 'Greets the caller, qualifies the request and applies answer or transfer rules.',
    },
    creator: 'unitalk',
    facet: 'relation-client',
    enables: [
      { fr: 'Ne manquer aucun appel entrant', en: 'Never miss an inbound call' },
      { fr: 'Diriger chaque demande vers la bonne personne', en: 'Route each request to the right person' },
    ],
    produces: [{ fr: 'Un appel qualifié et tracé', en: 'A qualified, logged call' }],
    contexts: [{ fr: 'Standard, support, prise de rendez-vous', en: 'Front desk, support, appointment booking' }],
    relatedProfiles: ['support-client'],
    neededApps: ['zendesk'],
    order: 2,
    dateAdded: '2025-01-05',
    keywords: ['appel', 'telephone', 'standard', 'accueil', 'call'],
  },
  {
    type: 'competence',
    slug: 'analyser-des-documents',
    name: { fr: 'Analyser des documents', en: 'Analyze documents' },
    description: {
      fr: 'Extrait les informations utiles, compare les sources et restitue les conclusions.',
      en: 'Extracts useful information, compares sources and reports conclusions.',
    },
    creator: 'community',
    facet: 'documents',
    enables: [
      { fr: 'Comprendre un contrat ou un rapport en minutes', en: 'Understand a contract or report in minutes' },
      { fr: 'Comparer des clauses entre plusieurs sources', en: 'Compare clauses across sources' },
    ],
    produces: [{ fr: 'Une synthèse et des points d’attention', en: 'A summary and key points to watch' }],
    contexts: [{ fr: 'Contrats, rapports, appels d’offres', en: 'Contracts, reports, tenders' }],
    relatedProfiles: ['analyste-financier', 'gestionnaire-administratif'],
    neededApps: ['google-drive', 'sharepoint'],
    order: 3,
    dateAdded: '2025-01-04',
    keywords: ['document', 'analyse', 'contrat', 'synthese', 'clause'],
  },
  {
    type: 'competence',
    slug: 'qualifier-un-prospect',
    name: { fr: 'Qualifier un prospect', en: 'Qualify a prospect' },
    description: {
      fr: 'Évalue le besoin, vérifie les critères et met à jour la fiche dans le CRM.',
      en: 'Assesses the need, checks the criteria and updates the CRM record.',
    },
    creator: 'unitalk',
    facet: 'ventes',
    enables: [
      { fr: 'Concentrer l’effort sur les meilleures opportunités', en: 'Focus effort on the best opportunities' },
    ],
    produces: [{ fr: 'Une fiche prospect qualifiée et à jour', en: 'A qualified, up-to-date prospect record' }],
    contexts: [{ fr: 'Leads entrants, campagnes sortantes', en: 'Inbound leads, outbound campaigns' }],
    relatedProfiles: ['commercial'],
    neededApps: ['hubspot', 'salesforce'],
    order: 4,
    dateAdded: '2025-01-03',
    keywords: ['prospect', 'crm', 'qualification', 'lead', 'vente'],
  },
  {
    type: 'competence',
    slug: 'rediger-un-compte-rendu',
    name: { fr: 'Rédiger un compte-rendu', en: 'Write meeting minutes' },
    description: {
      fr: 'Synthétise les échanges, formalise les décisions et liste les actions à suivre.',
      en: 'Summarizes discussions, records decisions and lists follow-up actions.',
    },
    creator: 'unitalk',
    facet: 'reunions',
    enables: [{ fr: 'Garder une trace claire de chaque décision', en: 'Keep a clear record of every decision' }],
    produces: [{ fr: 'Un compte-rendu partageable', en: 'A shareable set of minutes' }],
    contexts: [{ fr: 'Réunions, comités, ateliers', en: 'Meetings, committees, workshops' }],
    relatedProfiles: ['assistante-de-direction'],
    neededApps: ['notion', 'google-drive'],
    order: 5,
    dateAdded: '2025-01-02',
    keywords: ['compte-rendu', 'minutes', 'decision', 'action', 'reunion'],
  },
  {
    type: 'competence',
    slug: 'relancer-une-opportunite',
    name: { fr: 'Relancer une opportunité', en: 'Follow up on an opportunity' },
    description: {
      fr: 'Choisit le bon moment, personnalise le message et trace la relance dans le CRM.',
      en: 'Picks the right moment, tailors the message and logs the follow-up in the CRM.',
    },
    creator: 'community',
    facet: 'ventes',
    enables: [{ fr: 'Réveiller les opportunités dormantes', en: 'Revive dormant opportunities' }],
    produces: [{ fr: 'Une relance envoyée et tracée', en: 'A sent, logged follow-up' }],
    contexts: [{ fr: 'Pipeline commercial, nurturing', en: 'Sales pipeline, nurturing' }],
    relatedProfiles: ['commercial'],
    neededApps: ['hubspot', 'gmail'],
    order: 6,
    dateAdded: '2025-01-01',
    keywords: ['relance', 'opportunite', 'pipeline', 'suivi', 'crm'],
  },
  {
    type: 'competence',
    slug: 'rediger-un-article',
    name: { fr: 'Rédiger un article', en: 'Write an article' },
    description: {
      fr: 'Structure le sujet, rédige un texte clair et l’optimise pour la lecture et le référencement.',
      en: 'Structures the topic, writes clear copy and optimizes it for reading and SEO.',
    },
    creator: 'unitalk',
    facet: 'marketing',
    enables: [{ fr: 'Publier du contenu régulier et cohérent', en: 'Publish regular, consistent content' }],
    produces: [{ fr: 'Un article prêt à relire et publier', en: 'An article ready to review and publish' }],
    contexts: [{ fr: 'Blog, newsletter, pages web', en: 'Blog, newsletter, web pages' }],
    relatedProfiles: ['content-strategist'],
    neededApps: ['notion', 'google-drive'],
    order: 7,
    dateAdded: '2024-12-27',
    keywords: ['article', 'redaction', 'contenu', 'blog', 'seo'],
  },
  {
    type: 'competence',
    slug: 'preparer-un-reporting',
    name: { fr: 'Préparer un reporting', en: 'Prepare a report' },
    description: {
      fr: 'Rassemble les indicateurs, met en forme les chiffres et fait ressortir les tendances.',
      en: 'Gathers the metrics, formats the numbers and surfaces the trends.',
    },
    creator: 'unitalk',
    facet: 'finance',
    enables: [{ fr: 'Suivre la performance sans effort manuel', en: 'Track performance without manual effort' }],
    produces: [{ fr: 'Un tableau de bord ou un rapport', en: 'A dashboard or a report' }],
    contexts: [{ fr: 'Reporting mensuel, revue d’activité', en: 'Monthly reporting, activity review' }],
    relatedProfiles: ['analyste-financier', 'coordinateur-operations'],
    neededApps: ['excel', 'google-drive'],
    order: 8,
    dateAdded: '2024-12-22',
    keywords: ['reporting', 'indicateur', 'kpi', 'tableau de bord', 'rapport'],
  },
  {
    type: 'competence',
    slug: 'resoudre-un-ticket',
    name: { fr: 'Résoudre un ticket', en: 'Resolve a ticket' },
    description: {
      fr: 'Comprend le problème, applique la solution connue et documente la réponse.',
      en: 'Understands the issue, applies the known fix and documents the answer.',
    },
    creator: 'unitalk',
    facet: 'relation-client',
    enables: [{ fr: 'Réduire le temps de première réponse', en: 'Reduce first-response time' }],
    produces: [{ fr: 'Un ticket résolu et documenté', en: 'A resolved, documented ticket' }],
    contexts: [{ fr: 'Support niveau 1, assistance produit', en: 'Level-1 support, product assistance' }],
    relatedProfiles: ['support-client'],
    neededApps: ['zendesk'],
    order: 9,
    dateAdded: '2024-12-18',
    keywords: ['ticket', 'support', 'resolution', 'sav', 'assistance'],
  },
  {
    type: 'competence',
    slug: 'qualifier-une-demande',
    name: { fr: 'Qualifier une demande', en: 'Qualify a request' },
    description: {
      fr: 'Clarifie le besoin, vérifie les informations et oriente vers la bonne suite.',
      en: 'Clarifies the need, checks the information and routes to the right next step.',
    },
    creator: 'unitalk',
    facet: 'relation-client',
    enables: [{ fr: 'Traiter chaque demande au bon endroit', en: 'Handle each request in the right place' }],
    produces: [{ fr: 'Une demande qualifiée et orientée', en: 'A qualified, routed request' }],
    contexts: [{ fr: 'Support, RH, administration', en: 'Support, HR, administration' }],
    relatedProfiles: ['support-client', 'charge-de-recrutement'],
    neededApps: ['gmail', 'zendesk'],
    order: 10,
    dateAdded: '2024-12-14',
    keywords: ['demande', 'qualification', 'tri', 'orientation'],
  },
  {
    type: 'competence',
    slug: 'organiser-les-priorites',
    name: { fr: 'Organiser les priorités', en: 'Organize priorities' },
    description: {
      fr: 'Trie les tâches, arbitre selon l’urgence et prépare un plan d’action clair.',
      en: 'Sorts tasks, arbitrates by urgency and prepares a clear action plan.',
    },
    creator: 'community',
    facet: 'administration',
    enables: [{ fr: 'Savoir quoi faire en premier chaque jour', en: 'Know what to do first each day' }],
    produces: [{ fr: 'Un plan d’action priorisé', en: 'A prioritized action plan' }],
    contexts: [{ fr: 'Direction, opérations, gestion de projet', en: 'Leadership, operations, project management' }],
    relatedProfiles: ['assistante-de-direction', 'coordinateur-operations'],
    neededApps: ['notion', 'google-agenda'],
    order: 11,
    dateAdded: '2024-12-10',
    keywords: ['priorite', 'organisation', 'tache', 'planning', 'todo'],
  },
  {
    type: 'competence',
    slug: 'preparer-un-rendez-vous',
    name: { fr: 'Préparer un rendez-vous', en: 'Prepare a meeting appointment' },
    description: {
      fr: 'Rassemble le contexte client, prépare les arguments et anticipe les objections.',
      en: 'Gathers client context, prepares talking points and anticipates objections.',
    },
    creator: 'unitalk',
    facet: 'ventes',
    enables: [{ fr: 'Arriver préparé à chaque rendez-vous', en: 'Arrive prepared to every appointment' }],
    produces: [{ fr: 'Une fiche de préparation de rendez-vous', en: 'An appointment prep sheet' }],
    contexts: [{ fr: 'Rendez-vous commerciaux, closing', en: 'Sales meetings, closing' }],
    relatedProfiles: ['commercial'],
    neededApps: ['hubspot', 'google-agenda'],
    order: 12,
    dateAdded: '2024-12-05',
    keywords: ['rendez-vous', 'preparation', 'closing', 'commercial', 'meeting'],
  },
  {
    type: 'competence',
    slug: 'planifier-un-calendrier-editorial',
    name: { fr: 'Planifier un calendrier éditorial', en: 'Plan an editorial calendar' },
    description: {
      fr: 'Répartit les sujets, cale les dates et coordonne les publications sur chaque canal.',
      en: 'Distributes topics, sets dates and coordinates publishing across channels.',
    },
    creator: 'unitalk',
    facet: 'marketing',
    enables: [{ fr: 'Publier régulièrement sans improviser', en: 'Publish regularly without improvising' }],
    produces: [{ fr: 'Un calendrier éditorial partagé', en: 'A shared editorial calendar' }],
    contexts: [{ fr: 'Réseaux sociaux, blog, newsletter', en: 'Social media, blog, newsletter' }],
    relatedProfiles: ['content-strategist'],
    neededApps: ['notion', 'canva'],
    order: 13,
    dateAdded: '2024-12-01',
    keywords: ['calendrier', 'editorial', 'planning', 'contenu', 'social'],
  },
]

// --- Applications ----------------------------------------------------------
const APPLICATIONS: StoreItem[] = [
  {
    type: 'application',
    slug: 'microsoft-teams',
    name: { fr: 'Microsoft Teams', en: 'Microsoft Teams' },
    description: {
      fr: 'Permet à votre Collaborateur IA de participer aux échanges, réunions et espaces autorisés.',
      en: 'Lets your AI Collaborator take part in authorized chats, meetings and spaces.',
    },
    creator: 'unitalk',
    editor: 'Microsoft',
    facet: 'communication',
    uses: [
      { fr: 'Suivre les conversations d’équipe autorisées', en: 'Follow authorized team conversations' },
      { fr: 'Publier des messages et résumés', en: 'Post messages and summaries' },
    ],
    actions: [
      { fr: 'Lire et envoyer des messages', en: 'Read and send messages' },
      { fr: 'Rejoindre une réunion planifiée', en: 'Join a scheduled meeting' },
    ],
    dataAccessed: [{ fr: 'Messages des canaux autorisés', en: 'Messages from authorized channels' }],
    permissions: [{ fr: 'Accès aux équipes et canaux accordés', en: 'Access to granted teams and channels' }],
    connection: { fr: 'Connexion sécurisée via votre compte Microsoft 365.', en: 'Secure sign-in via your Microsoft 365 account.' },
    compatibleProfiles: ['assistante-de-direction', 'support-client'],
    compatibleSkills: ['preparer-une-reunion', 'rediger-un-compte-rendu'],
    order: 1,
    dateAdded: '2025-01-06',
    keywords: ['teams', 'microsoft', 'communication', 'chat', 'reunion', 'visio'],
  },
  {
    type: 'application',
    slug: 'sharepoint',
    name: { fr: 'Microsoft SharePoint', en: 'Microsoft SharePoint' },
    description: {
      fr: 'Permet de consulter et organiser les documents des espaces autorisés de votre Organisation.',
      en: 'Lets it read and organize documents in your organization’s authorized spaces.',
    },
    creator: 'unitalk',
    editor: 'Microsoft',
    facet: 'documents',
    uses: [{ fr: 'Retrouver et classer des documents', en: 'Find and file documents' }],
    actions: [{ fr: 'Lire, créer et déplacer des fichiers', en: 'Read, create and move files' }],
    dataAccessed: [{ fr: 'Bibliothèques de documents autorisées', en: 'Authorized document libraries' }],
    permissions: [{ fr: 'Accès aux sites SharePoint accordés', en: 'Access to granted SharePoint sites' }],
    connection: { fr: 'Connexion sécurisée via votre compte Microsoft 365.', en: 'Secure sign-in via your Microsoft 365 account.' },
    compatibleProfiles: ['gestionnaire-administratif'],
    compatibleSkills: ['analyser-des-documents'],
    order: 2,
    dateAdded: '2025-01-05',
    keywords: ['sharepoint', 'microsoft', 'document', 'fichier', 'ged'],
  },
  {
    type: 'application',
    slug: 'google-drive',
    name: { fr: 'Google Drive', en: 'Google Drive' },
    description: {
      fr: 'Permet de consulter, organiser et produire des documents dans les espaces autorisés.',
      en: 'Lets it read, organize and produce documents in authorized spaces.',
    },
    creator: 'unitalk',
    editor: 'Google',
    facet: 'documents',
    uses: [{ fr: 'Créer et partager des documents', en: 'Create and share documents' }],
    actions: [{ fr: 'Lire, créer et modifier des fichiers', en: 'Read, create and edit files' }],
    dataAccessed: [{ fr: 'Dossiers et fichiers partagés autorisés', en: 'Authorized shared folders and files' }],
    permissions: [{ fr: 'Accès aux dossiers Drive accordés', en: 'Access to granted Drive folders' }],
    connection: { fr: 'Connexion sécurisée via votre compte Google Workspace.', en: 'Secure sign-in via your Google Workspace account.' },
    compatibleProfiles: ['content-strategist', 'analyste-financier', 'gestionnaire-administratif'],
    compatibleSkills: ['analyser-des-documents', 'rediger-un-article'],
    order: 3,
    dateAdded: '2025-01-04',
    keywords: ['google', 'drive', 'document', 'fichier', 'stockage'],
  },
  {
    type: 'application',
    slug: 'gmail',
    name: { fr: 'Gmail', en: 'Gmail' },
    description: {
      fr: 'Permet de lire, trier et envoyer des emails depuis les boîtes autorisées.',
      en: 'Lets it read, sort and send emails from authorized mailboxes.',
    },
    creator: 'unitalk',
    editor: 'Google',
    facet: 'messagerie',
    uses: [{ fr: 'Traiter et rédiger des emails', en: 'Handle and draft emails' }],
    actions: [{ fr: 'Lire, classer et envoyer des messages', en: 'Read, label and send messages' }],
    dataAccessed: [{ fr: 'Emails des boîtes autorisées', en: 'Emails from authorized mailboxes' }],
    permissions: [{ fr: 'Accès à la messagerie accordée', en: 'Access to the granted mailbox' }],
    connection: { fr: 'Connexion sécurisée via votre compte Google Workspace.', en: 'Secure sign-in via your Google Workspace account.' },
    compatibleProfiles: ['support-client', 'commercial', 'charge-de-recrutement'],
    compatibleSkills: ['qualifier-une-demande', 'relancer-une-opportunite'],
    order: 4,
    dateAdded: '2025-01-03',
    keywords: ['gmail', 'google', 'email', 'messagerie', 'mail'],
  },
  {
    type: 'application',
    slug: 'outlook',
    name: { fr: 'Microsoft Outlook', en: 'Microsoft Outlook' },
    description: {
      fr: 'Permet de gérer les emails et l’agenda des boîtes autorisées.',
      en: 'Lets it manage emails and calendar for authorized mailboxes.',
    },
    creator: 'unitalk',
    editor: 'Microsoft',
    facet: 'messagerie',
    uses: [{ fr: 'Traiter les emails et planifier l’agenda', en: 'Handle emails and plan the calendar' }],
    actions: [{ fr: 'Lire, envoyer et planifier', en: 'Read, send and schedule' }],
    dataAccessed: [{ fr: 'Emails et agenda autorisés', en: 'Authorized emails and calendar' }],
    permissions: [{ fr: 'Accès à la boîte et à l’agenda accordés', en: 'Access to the granted mailbox and calendar' }],
    connection: { fr: 'Connexion sécurisée via votre compte Microsoft 365.', en: 'Secure sign-in via your Microsoft 365 account.' },
    compatibleProfiles: ['assistante-de-direction'],
    compatibleSkills: ['preparer-une-reunion', 'organiser-les-priorites'],
    order: 5,
    dateAdded: '2025-01-02',
    keywords: ['outlook', 'microsoft', 'email', 'agenda', 'calendrier'],
  },
  {
    type: 'application',
    slug: 'google-agenda',
    name: { fr: 'Google Agenda', en: 'Google Calendar' },
    description: {
      fr: 'Permet de consulter les disponibilités et planifier des rendez-vous autorisés.',
      en: 'Lets it check availability and schedule authorized appointments.',
    },
    creator: 'unitalk',
    editor: 'Google',
    facet: 'productivite',
    uses: [{ fr: 'Planifier réunions et rendez-vous', en: 'Schedule meetings and appointments' }],
    actions: [{ fr: 'Créer et déplacer des événements', en: 'Create and move events' }],
    dataAccessed: [{ fr: 'Agendas partagés autorisés', en: 'Authorized shared calendars' }],
    permissions: [{ fr: 'Accès aux agendas accordés', en: 'Access to granted calendars' }],
    connection: { fr: 'Connexion sécurisée via votre compte Google Workspace.', en: 'Secure sign-in via your Google Workspace account.' },
    compatibleProfiles: ['assistante-de-direction', 'commercial'],
    compatibleSkills: ['preparer-une-reunion', 'preparer-un-rendez-vous'],
    order: 6,
    dateAdded: '2025-01-01',
    keywords: ['agenda', 'google', 'calendrier', 'rendez-vous', 'planning'],
  },
  {
    type: 'application',
    slug: 'slack',
    name: { fr: 'Slack', en: 'Slack' },
    description: {
      fr: 'Permet de suivre et animer les conversations d’équipe dans les canaux autorisés.',
      en: 'Lets it follow and drive team conversations in authorized channels.',
    },
    creator: 'unitalk',
    editor: 'Slack',
    facet: 'collaboration',
    uses: [{ fr: 'Communiquer avec les équipes', en: 'Communicate with teams' }],
    actions: [{ fr: 'Lire et envoyer des messages', en: 'Read and send messages' }],
    dataAccessed: [{ fr: 'Messages des canaux autorisés', en: 'Messages from authorized channels' }],
    permissions: [{ fr: 'Accès aux canaux accordés', en: 'Access to granted channels' }],
    connection: { fr: 'Connexion sécurisée via OAuth Slack.', en: 'Secure sign-in via Slack OAuth.' },
    compatibleProfiles: ['coordinateur-operations', 'developpeur'],
    compatibleSkills: ['organiser-les-priorites'],
    order: 7,
    dateAdded: '2024-12-28',
    keywords: ['slack', 'communication', 'chat', 'equipe', 'canal'],
  },
  {
    type: 'application',
    slug: 'notion',
    name: { fr: 'Notion', en: 'Notion' },
    description: {
      fr: 'Permet d’organiser notes, documents et bases de connaissances dans les espaces autorisés.',
      en: 'Lets it organize notes, docs and knowledge bases in authorized spaces.',
    },
    creator: 'unitalk',
    editor: 'Notion',
    facet: 'collaboration',
    uses: [{ fr: 'Structurer notes et documentation', en: 'Structure notes and documentation' }],
    actions: [{ fr: 'Lire, créer et mettre à jour des pages', en: 'Read, create and update pages' }],
    dataAccessed: [{ fr: 'Espaces et pages autorisés', en: 'Authorized workspaces and pages' }],
    permissions: [{ fr: 'Accès à l’espace Notion accordé', en: 'Access to the granted Notion workspace' }],
    connection: { fr: 'Connexion sécurisée via OAuth Notion.', en: 'Secure sign-in via Notion OAuth.' },
    compatibleProfiles: ['content-strategist', 'coordinateur-operations'],
    compatibleSkills: ['rediger-un-compte-rendu', 'planifier-un-calendrier-editorial'],
    order: 8,
    dateAdded: '2024-12-24',
    keywords: ['notion', 'note', 'documentation', 'wiki', 'base de connaissances'],
  },
  {
    type: 'application',
    slug: 'hubspot',
    name: { fr: 'HubSpot', en: 'HubSpot' },
    description: {
      fr: 'Permet de consulter et mettre à jour les informations commerciales selon les droits accordés.',
      en: 'Lets it read and update sales information according to granted rights.',
    },
    creator: 'unitalk',
    editor: 'HubSpot',
    facet: 'relation-client',
    uses: [{ fr: 'Suivre le pipeline et les contacts', en: 'Track the pipeline and contacts' }],
    actions: [{ fr: 'Lire et mettre à jour fiches et affaires', en: 'Read and update records and deals' }],
    dataAccessed: [{ fr: 'Contacts et transactions autorisés', en: 'Authorized contacts and deals' }],
    permissions: [{ fr: 'Accès au CRM accordé', en: 'Access to the granted CRM' }],
    connection: { fr: 'Connexion sécurisée via OAuth HubSpot.', en: 'Secure sign-in via HubSpot OAuth.' },
    compatibleProfiles: ['commercial'],
    compatibleSkills: ['qualifier-un-prospect', 'relancer-une-opportunite'],
    order: 9,
    dateAdded: '2024-12-20',
    keywords: ['hubspot', 'crm', 'vente', 'pipeline', 'contact'],
  },
  {
    type: 'application',
    slug: 'salesforce',
    name: { fr: 'Salesforce', en: 'Salesforce' },
    description: {
      fr: 'Permet de gérer comptes, opportunités et activités commerciales selon les droits accordés.',
      en: 'Lets it manage accounts, opportunities and sales activity per granted rights.',
    },
    creator: 'community',
    editor: 'Salesforce',
    facet: 'ventes',
    uses: [{ fr: 'Piloter le cycle de vente', en: 'Drive the sales cycle' }],
    actions: [{ fr: 'Lire et mettre à jour comptes et opportunités', en: 'Read and update accounts and opportunities' }],
    dataAccessed: [{ fr: 'Comptes et opportunités autorisés', en: 'Authorized accounts and opportunities' }],
    permissions: [{ fr: 'Accès au CRM accordé', en: 'Access to the granted CRM' }],
    connection: { fr: 'Connexion sécurisée via OAuth Salesforce.', en: 'Secure sign-in via Salesforce OAuth.' },
    integrationBy: 'Communauté Unitalk',
    compatibleProfiles: ['commercial'],
    compatibleSkills: ['qualifier-un-prospect'],
    order: 10,
    dateAdded: '2024-12-16',
    keywords: ['salesforce', 'crm', 'vente', 'opportunite', 'compte'],
  },
  {
    type: 'application',
    slug: 'zendesk',
    name: { fr: 'Zendesk', en: 'Zendesk' },
    description: {
      fr: 'Permet de traiter les tickets de support dans les files autorisées.',
      en: 'Lets it handle support tickets in authorized queues.',
    },
    creator: 'unitalk',
    editor: 'Zendesk',
    facet: 'relation-client',
    uses: [{ fr: 'Traiter et suivre les tickets', en: 'Handle and track tickets' }],
    actions: [{ fr: 'Lire, répondre et clôturer des tickets', en: 'Read, reply to and close tickets' }],
    dataAccessed: [{ fr: 'Tickets des files autorisées', en: 'Tickets from authorized queues' }],
    permissions: [{ fr: 'Accès au helpdesk accordé', en: 'Access to the granted helpdesk' }],
    connection: { fr: 'Connexion sécurisée via OAuth Zendesk.', en: 'Secure sign-in via Zendesk OAuth.' },
    compatibleProfiles: ['support-client'],
    compatibleSkills: ['resoudre-un-ticket', 'repondre-aux-appels'],
    order: 11,
    dateAdded: '2024-12-12',
    keywords: ['zendesk', 'support', 'ticket', 'helpdesk', 'sav'],
  },
  {
    type: 'application',
    slug: 'excel',
    name: { fr: 'Microsoft Excel', en: 'Microsoft Excel' },
    description: {
      fr: 'Permet de lire et produire des tableaux et calculs dans les fichiers autorisés.',
      en: 'Lets it read and produce spreadsheets and calculations in authorized files.',
    },
    creator: 'unitalk',
    editor: 'Microsoft',
    facet: 'finance',
    uses: [{ fr: 'Analyser des données chiffrées', en: 'Analyze numerical data' }],
    actions: [{ fr: 'Lire, calculer et mettre en forme', en: 'Read, compute and format' }],
    dataAccessed: [{ fr: 'Classeurs autorisés', en: 'Authorized workbooks' }],
    permissions: [{ fr: 'Accès aux fichiers accordés', en: 'Access to granted files' }],
    connection: { fr: 'Connexion sécurisée via votre compte Microsoft 365.', en: 'Secure sign-in via your Microsoft 365 account.' },
    compatibleProfiles: ['analyste-financier', 'gestionnaire-administratif'],
    compatibleSkills: ['preparer-un-reporting'],
    order: 12,
    dateAdded: '2024-12-08',
    keywords: ['excel', 'microsoft', 'tableur', 'calcul', 'finance'],
  },
  {
    type: 'application',
    slug: 'github',
    name: { fr: 'GitHub', en: 'GitHub' },
    description: {
      fr: 'Permet de suivre le code, les revues et les tickets des dépôts autorisés.',
      en: 'Lets it follow code, reviews and issues in authorized repositories.',
    },
    creator: 'community',
    editor: 'GitHub',
    facet: 'productivite',
    uses: [{ fr: 'Suivre le développement', en: 'Follow development' }],
    actions: [{ fr: 'Lire le code, commenter, ouvrir des tickets', en: 'Read code, comment, open issues' }],
    dataAccessed: [{ fr: 'Dépôts autorisés', en: 'Authorized repositories' }],
    permissions: [{ fr: 'Accès aux dépôts accordés', en: 'Access to granted repositories' }],
    connection: { fr: 'Connexion sécurisée via OAuth GitHub.', en: 'Secure sign-in via GitHub OAuth.' },
    integrationBy: 'Communauté Unitalk',
    compatibleProfiles: ['developpeur'],
    compatibleSkills: [],
    order: 13,
    dateAdded: '2024-12-03',
    keywords: ['github', 'code', 'depot', 'developpement', 'git'],
  },
  {
    type: 'application',
    slug: 'linkedin',
    name: { fr: 'LinkedIn', en: 'LinkedIn' },
    description: {
      fr: 'Permet de préparer la prospection et le suivi des contacts professionnels autorisés.',
      en: 'Lets it prepare prospecting and follow-up on authorized professional contacts.',
    },
    creator: 'community',
    editor: 'LinkedIn',
    facet: 'ventes',
    uses: [{ fr: 'Identifier et suivre des prospects', en: 'Identify and follow prospects' }],
    actions: [{ fr: 'Consulter des profils, préparer des messages', en: 'View profiles, prepare messages' }],
    dataAccessed: [{ fr: 'Contacts et profils autorisés', en: 'Authorized contacts and profiles' }],
    permissions: [{ fr: 'Accès au compte accordé', en: 'Access to the granted account' }],
    connection: { fr: 'Connexion sécurisée via OAuth LinkedIn.', en: 'Secure sign-in via LinkedIn OAuth.' },
    integrationBy: 'Communauté Unitalk',
    compatibleProfiles: ['commercial'],
    compatibleSkills: ['qualifier-un-prospect'],
    order: 14,
    dateAdded: '2024-11-28',
    keywords: ['linkedin', 'prospection', 'reseau', 'contact', 'social selling'],
  },
  {
    type: 'application',
    slug: 'canva',
    name: { fr: 'Canva', en: 'Canva' },
    description: {
      fr: 'Permet de préparer des visuels simples pour vos contenus dans les espaces autorisés.',
      en: 'Lets it prepare simple visuals for your content in authorized spaces.',
    },
    creator: 'community',
    editor: 'Canva',
    facet: 'productivite',
    uses: [{ fr: 'Créer des visuels de contenu', en: 'Create content visuals' }],
    actions: [{ fr: 'Générer et exporter des visuels', en: 'Generate and export visuals' }],
    dataAccessed: [{ fr: 'Projets et marques autorisés', en: 'Authorized projects and brands' }],
    permissions: [{ fr: 'Accès à l’espace Canva accordé', en: 'Access to the granted Canva workspace' }],
    connection: { fr: 'Connexion sécurisée via OAuth Canva.', en: 'Secure sign-in via Canva OAuth.' },
    integrationBy: 'Communauté Unitalk',
    compatibleProfiles: ['content-strategist'],
    compatibleSkills: ['planifier-un-calendrier-editorial'],
    order: 15,
    dateAdded: '2024-11-22',
    keywords: ['canva', 'visuel', 'design', 'contenu', 'graphique'],
  },
]

export const STORE_ITEMS: StoreItem[] = [...PROFILS, ...COMPETENCES, ...APPLICATIONS]

// Fast lookup by type-slug + item-slug (used by fiche pages).
export function getStoreItem(typeSlug: string, slug: string): StoreItem | undefined {
  const type = TYPE_BY_SLUG[typeSlug]
  if (!type) return undefined
  return STORE_ITEMS.find((i) => i.type === type && i.slug === slug)
}

export function getStoreItemBySlug(slug: string): StoreItem | undefined {
  return STORE_ITEMS.find((i) => i.slug === slug)
}

export function storeItemHref(item: StoreItem): string {
  return `/store/${TYPE_SLUGS[item.type]}/${item.slug}`
}

/* ========================================================================= */
/* Facets, filters, sort, search                                              */
/* ========================================================================= */

export type Facet = { key: string; label: Bilingual }

export type TypeKey = StoreType | 'all'

export type StoreFilters = {
  type: TypeKey
  creator: Creator | 'all'
  facet: string | 'all' // domain / category depending on type
  editor: string | 'all' // applications only
}

export const EMPTY_STORE_FILTERS: StoreFilters = {
  type: 'all',
  creator: 'all',
  facet: 'all',
  editor: 'all',
}

// Type filter options (section 5). "all" = Tout le Store.
export const TYPE_FACETS: Facet[] = [
  { key: 'all', label: { fr: 'Tout le Store', en: 'All the Store' } },
  { key: 'profil', label: TYPE_LABELS_PLURAL.profil },
  { key: 'competence', label: TYPE_LABELS_PLURAL.competence },
  { key: 'application', label: TYPE_LABELS_PLURAL.application },
]

export const CREATOR_FACETS: Facet[] = (['all', 'unitalk', 'community'] as (Creator | 'all')[]).map((k) => ({
  key: k,
  label: CREATOR_LABELS[k],
}))

// Contextual facet values that ACTUALLY exist for the given type, in label order.
export function contextualFacets(type: StoreType): Facet[] {
  const labels = facetLabels(type)
  const present = new Set(STORE_ITEMS.filter((i) => i.type === type).map((i) => i.facet))
  return Object.keys(labels)
    .filter((k) => present.has(k))
    .map((k) => ({ key: k, label: labels[k] }))
}

// Editors present among applications, in alphabetical order.
export function editorFacets(): Facet[] {
  const editors = Array.from(
    new Set(STORE_ITEMS.filter((i) => i.type === 'application' && i.editor).map((i) => i.editor as string)),
  ).sort((a, b) => a.localeCompare(b))
  return editors.map((e) => ({ key: e, label: { fr: e, en: e } }))
}

export function matchesStoreFilters(item: StoreItem, f: StoreFilters): boolean {
  if (f.type !== 'all' && item.type !== f.type) return false
  if (f.creator !== 'all' && item.creator !== f.creator) return false
  if (f.facet !== 'all' && item.facet !== f.facet) return false
  if (f.editor !== 'all' && item.editor !== f.editor) return false
  return true
}

export function activeStoreFilterCount(f: StoreFilters): number {
  return (
    (f.type !== 'all' ? 1 : 0) +
    (f.creator !== 'all' ? 1 : 0) +
    (f.facet !== 'all' ? 1 : 0) +
    (f.editor !== 'all' ? 1 : 0)
  )
}

// Only the secondary facets count toward the mobile "Filtres" badge.
export function advancedStoreFilterCount(f: StoreFilters): number {
  return (f.creator !== 'all' ? 1 : 0) + (f.facet !== 'all' ? 1 : 0) + (f.editor !== 'all' ? 1 : 0)
}

// --- Sort ------------------------------------------------------------------
export type SortKey = 'recommended' | 'recent' | 'az'
export const DEFAULT_SORT: SortKey = 'recommended'

export const SORT_OPTIONS: { key: SortKey; label: Bilingual }[] = [
  { key: 'recommended', label: { fr: 'Recommandés', en: 'Recommended' } },
  { key: 'recent', label: { fr: 'Plus récents', en: 'Most recent' } },
  { key: 'az', label: { fr: 'Ordre alphabétique', en: 'Alphabetical' } },
]

export function sortStoreItems(list: StoreItem[], sort: SortKey, lang: Lang): StoreItem[] {
  const copy = [...list]
  if (sort === 'recommended') return copy.sort((a, b) => a.order - b.order)
  if (sort === 'recent') {
    return copy.sort((a, b) => (a.dateAdded < b.dateAdded ? 1 : a.dateAdded > b.dateAdded ? -1 : a.order - b.order))
  }
  return copy.sort((a, b) => a.name[lang].localeCompare(b.name[lang], lang))
}

export const PAGE_SIZE = 12

// --- URL <-> state ---------------------------------------------------------
export function storeFiltersFromParams(params: URLSearchParams): StoreFilters {
  const type = params.get('type')
  const validType: TypeKey =
    type === 'profil' || type === 'competence' || type === 'application' ? type : 'all'
  const creator = params.get('creator')
  return {
    type: validType,
    creator: creator === 'unitalk' || creator === 'community' ? creator : 'all',
    facet: params.get('facet') || 'all',
    editor: params.get('editor') || 'all',
  }
}

export function sortFromParams(params: URLSearchParams): SortKey {
  const v = params.get('tri')
  return v === 'recent' || v === 'az' ? v : DEFAULT_SORT
}

export function buildStoreParams(query: string, f: StoreFilters, sort: SortKey): string {
  const p = new URLSearchParams()
  if (query.trim()) p.set('q', query.trim())
  if (f.type !== 'all') p.set('type', f.type)
  if (f.creator !== 'all') p.set('creator', f.creator)
  if (f.facet !== 'all') p.set('facet', f.facet)
  if (f.editor !== 'all') p.set('editor', f.editor)
  if (sort !== DEFAULT_SORT) p.set('tri', sort)
  return p.toString()
}

// --- Relative date ---------------------------------------------------------
export function relativeDate(iso: string, lang: Lang): string {
  const then = new Date(iso + 'T00:00:00')
  if (Number.isNaN(then.getTime())) return ''
  const days = Math.round((Date.now() - then.getTime()) / 86_400_000)
  if (days <= 0) return lang === 'fr' ? "Ajouté aujourd'hui" : 'Added today'
  if (days === 1) return lang === 'fr' ? 'Ajouté hier' : 'Added yesterday'
  if (days < 30) return lang === 'fr' ? `Ajouté il y a ${days} jours` : `Added ${days} days ago`
  const label = then.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return lang === 'fr' ? `Ajouté le ${label}` : `Added on ${label}`
}

// --- Search ----------------------------------------------------------------
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function haystack(item: StoreItem, lang: Lang): string {
  const facetLabel = facetLabels(item.type)[item.facet]?.[lang] ?? ''
  return normalize(
    [item.name[lang], item.description[lang], TYPE_LABELS[item.type][lang], facetLabel, item.editor ?? '', ...item.keywords].join(
      ' ',
    ),
  )
}

export type Scored = { item: StoreItem; score: number }

// Ranks items by relevance. Empty query -> score 0 for all (caller keeps order).
// A query only keeps items that actually match a token, so weak searches never
// get padded with unrelated results.
export function searchStore(query: string, lang: Lang): Scored[] {
  const q = normalize(query)
  if (!q) return STORE_ITEMS.map((item) => ({ item, score: 0 }))
  const tokens = q.split(' ').filter((t) => t.length > 2)
  if (tokens.length === 0) return STORE_ITEMS.map((item) => ({ item, score: 0 }))

  const scored: Scored[] = []
  for (const item of STORE_ITEMS) {
    const name = normalize(item.name[lang])
    const hay = haystack(item, lang)
    let score = 0
    for (const tok of tokens) {
      if (name.includes(tok)) score += 3
      else if (hay.includes(tok)) score += 1
    }
    if (score > 0) scored.push({ item, score })
  }
  return scored.sort((a, b) => b.score - a.score || a.item.order - b.item.order)
}

// Placeholder examples that scroll before focus (section 3).
export const ALMA_EXAMPLES: Bilingual[] = [
  { fr: 'Préparer et suivre nos comités de direction', en: 'Prepare and track our leadership committees' },
  { fr: 'Répondre aux appels de nos clients', en: 'Answer our customers’ calls' },
  { fr: 'Qualifier les prospects dans notre CRM', en: 'Qualify prospects in our CRM' },
  { fr: 'Analyser des contrats et comparer leurs clauses', en: 'Analyze contracts and compare their clauses' },
  { fr: 'Travailler dans Microsoft Teams et SharePoint', en: 'Work in Microsoft Teams and SharePoint' },
]
