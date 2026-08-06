// Catalog of Missions: concrete outcomes you can hand to an AI Collaborator.
// A Mission = a result to achieve. It mobilizes a job Profile, is carried out by
// an AI Collaborator inside the Workspace, and ends with your validation.

import type { Bilingual } from '@/lib/collaborators-catalog'

export type MissionCategory = {
  key: string
  label: Bilingual
}

// Availability status. Nothing is "available" until it has been tested for real.
export type MissionStatus = 'available' | 'on-setup' | 'coming-soon'

// Advanced filter facets. Resolved per Mission (category defaults + optional overrides),
// so the catalog can grow to hundreds of Missions without editing each object.
export type MissionFacets = {
  sectors: string[]
  languages: string[]
  zones: string[]
  frequency: string
  deliverableType: string
  // How the Collaborator works on this mission (phone, email, chat, meeting, docs, automation).
  modality: string
  status: MissionStatus
}

export type Mission = {
  slug: string
  category: string
  title: Bilingual
  description: Bilingual
  result: Bilingual
  objective: Bilingual
  steps: Bilingual[]
  deliverable: Bilingual
  deliveryTime: Bilingual
  validation: Bilingual
  produces: Bilingual[]
  skills: Bilingual[]
  tools: string[]
  profile: Bilingual
  collaboratorSlug: string
  // Optional, future-proofing fields (per-Mission overrides + provenance).
  facets?: Partial<MissionFacets>
  verifiedAt?: string
  price?: string
}

// Shown instead of an unverified delay. No delay is promised until it is measured.
export const DELAY_TBD: Bilingual = {
  fr: 'Délai confirmé après cadrage',
  en: 'Timeline confirmed after scoping',
}

export const STATUS_LABELS: Record<MissionStatus, Bilingual> = {
  available: { fr: 'Disponible', en: 'Available' },
  'on-setup': { fr: 'Sur configuration', en: 'On setup' },
  'coming-soon': { fr: 'Bientôt disponible', en: 'Coming soon' },
}

export const SECTOR_LABELS: Record<string, Bilingual> = {
  saas: { fr: 'SaaS et logiciels', en: 'SaaS & software' },
  ecommerce: { fr: 'E-commerce', en: 'E-commerce' },
  industrie: { fr: 'Industrie', en: 'Industry' },
  immobilier: { fr: 'Immobilier', en: 'Real estate' },
  services: { fr: 'Services professionnels', en: 'Professional services' },
  'banque-assurance': { fr: 'Banque et assurance', en: 'Banking & insurance' },
  sante: { fr: 'Santé', en: 'Healthcare' },
  education: { fr: 'Éducation', en: 'Education' },
  transport: { fr: 'Transport et logistique', en: 'Transport & logistics' },
  public: { fr: 'Secteur public', en: 'Public sector' },
}

export const LANGUAGE_LABELS: Record<string, Bilingual> = {
  fr: { fr: 'Français', en: 'French' },
  en: { fr: 'Anglais', en: 'English' },
}

export const ZONE_LABELS: Record<string, Bilingual> = {
  france: { fr: 'France', en: 'France' },
  europe: { fr: 'Europe', en: 'Europe' },
  international: { fr: 'International', en: 'International' },
}

export const FREQUENCY_LABELS: Record<string, Bilingual> = {
  oneoff: { fr: 'Ponctuelle', en: 'One-off' },
  recurring: { fr: 'Récurrente', en: 'Recurring' },
  ongoing: { fr: 'En continu', en: 'Ongoing' },
}

export const DELIVERABLE_TYPE_LABELS: Record<string, Bilingual> = {
  liste: { fr: 'Liste / CRM', en: 'List / CRM' },
  reponses: { fr: 'Réponses', en: 'Replies' },
  contenu: { fr: 'Contenu', en: 'Content' },
  'compte-rendu': { fr: 'Compte rendu', en: 'Minutes' },
  rapport: { fr: 'Rapport', en: 'Report' },
  processus: { fr: 'Processus', en: 'Process' },
  code: { fr: 'Code', en: 'Code' },
}

// Modality = how the Collaborator carries out the mission. Ordered for the sidebar.
export const MODALITY_LABELS: Record<string, Bilingual> = {
  telephone: { fr: 'Téléphone', en: 'Phone' },
  email: { fr: 'Email', en: 'Email' },
  chat: { fr: 'Chat', en: 'Chat' },
  reunion: { fr: 'Réunion', en: 'Meeting' },
  documents: { fr: 'Documents', en: 'Documents' },
  automatisation: { fr: 'Automatisation', en: 'Automation' },
}

// Category-based facet defaults. Reasonable, non-verified metadata.
const CATEGORY_FACETS: Record<string, Omit<MissionFacets, 'status'>> = {
  ventes: { sectors: ['saas', 'services', 'industrie'], languages: ['fr', 'en'], zones: ['france', 'international'], frequency: 'recurring', deliverableType: 'liste', modality: 'email' },
  support: { sectors: ['ecommerce', 'saas', 'banque-assurance'], languages: ['fr', 'en'], zones: ['france', 'international'], frequency: 'ongoing', deliverableType: 'reponses', modality: 'chat' },
  marketing: { sectors: ['ecommerce', 'saas', 'immobilier'], languages: ['fr', 'en'], zones: ['france', 'international'], frequency: 'recurring', deliverableType: 'contenu', modality: 'documents' },
  reunions: { sectors: ['services', 'public', 'industrie'], languages: ['fr', 'en'], zones: ['france', 'international'], frequency: 'recurring', deliverableType: 'compte-rendu', modality: 'reunion' },
  analyse: { sectors: ['banque-assurance', 'industrie', 'public'], languages: ['fr', 'en'], zones: ['france', 'international'], frequency: 'recurring', deliverableType: 'rapport', modality: 'documents' },
  finance: { sectors: ['banque-assurance', 'services'], languages: ['fr', 'en'], zones: ['france', 'international'], frequency: 'recurring', deliverableType: 'rapport', modality: 'documents' },
  automatisation: { sectors: ['industrie', 'transport', 'ecommerce'], languages: ['fr', 'en'], zones: ['france', 'international'], frequency: 'ongoing', deliverableType: 'processus', modality: 'automatisation' },
  developpement: { sectors: ['saas'], languages: ['fr', 'en'], zones: ['france', 'international'], frequency: 'oneoff', deliverableType: 'code', modality: 'automatisation' },
}

// Honest per-mission availability. Only a handful are truly "available";
// most need scoping ("on-setup"), and the more advanced ones are "coming-soon".
const STATUS_OVERRIDES: Record<string, MissionStatus> = {
  'trouver-de-nouveaux-clients': 'available',
  'repondre-a-mes-clients': 'available',
  'preparer-et-suivre-mes-reunions': 'available',
  'construire-ma-faq': 'available',
  'creer-mes-contenus': 'available',
  'relancer-les-opportunites': 'on-setup',
  'animer-mes-reseaux-sociaux': 'on-setup',
  'ameliorer-mon-referencement': 'on-setup',
  'preparer-mon-reporting-financier': 'on-setup',
  'automatiser-mes-operations': 'on-setup',
  'developper-une-fonctionnalite': 'coming-soon',
  'corriger-un-lot-de-bugs': 'coming-soon',
}

// Per-mission modality when it differs from the category default.
const MODALITY_OVERRIDES: Record<string, string> = {
  'trouver-de-nouveaux-clients': 'email',
  'relancer-les-opportunites': 'email',
  'repondre-a-mes-clients': 'chat',
  'construire-ma-faq': 'documents',
  'preparer-et-suivre-mes-reunions': 'reunion',
}

// Resolve the facets of a Mission: category defaults, overridable per Mission.
// Status defaults to 'on-setup' — never 'available' without a real test (verifiedAt).
export function missionFacets(m: Mission): MissionFacets {
  const base = CATEGORY_FACETS[m.category] ?? CATEGORY_FACETS.ventes
  const status: MissionStatus =
    m.facets?.status ?? STATUS_OVERRIDES[m.slug] ?? (m.verifiedAt ? 'available' : 'on-setup')
  return {
    sectors: m.facets?.sectors ?? base.sectors,
    languages: m.facets?.languages ?? base.languages,
    zones: m.facets?.zones ?? base.zones,
    frequency: m.facets?.frequency ?? base.frequency,
    deliverableType: m.facets?.deliverableType ?? base.deliverableType,
    modality: m.facets?.modality ?? MODALITY_OVERRIDES[m.slug] ?? base.modality,
    status,
  }
}

export const MISSION_CATEGORIES: MissionCategory[] = [
  { key: 'ventes', label: { fr: 'Ventes', en: 'Sales' } },
  { key: 'support', label: { fr: 'Support client', en: 'Customer support' } },
  { key: 'marketing', label: { fr: 'Marketing et contenu', en: 'Marketing and content' } },
  { key: 'reunions', label: { fr: 'Réunions et coordination', en: 'Meetings and coordination' } },
  { key: 'analyse', label: { fr: 'Analyse et documents', en: 'Analysis and documents' } },
  { key: 'finance', label: { fr: 'Finance', en: 'Finance' } },
  { key: 'automatisation', label: { fr: 'Automatisation', en: 'Automation' } },
  { key: 'developpement', label: { fr: 'Développement', en: 'Development' } },
]

export const MISSIONS: Mission[] = [
  // ---------------- VENTES ----------------
  {
    slug: 'trouver-de-nouveaux-clients',
    category: 'ventes',
    title: { fr: 'Trouver des prospects qualifiés', en: 'Find qualified prospects' },
    description: {
      fr: 'Identifie les entreprises pertinentes, qualifie les contacts et prépare les prises de contact.',
      en: 'Identifies relevant companies, qualifies contacts and prepares outreach.',
    },
    result: {
      fr: 'Une liste de prospects qualifiés et des messages prêts à valider.',
      en: 'A list of qualified prospects and messages ready to approve.',
    },
    objective: {
      fr: 'Construire un flux régulier de prospects qualifiés, sans passer vos journées à chercher et à écrire des messages.',
      en: 'Build a steady flow of qualified prospects without spending your days searching and writing messages.',
    },
    steps: [
      { fr: 'Vous décrivez votre client idéal et votre offre.', en: 'You describe your ideal customer and your offer.' },
      { fr: 'Le Collaborateur recherche et qualifie les entreprises correspondantes.', en: 'The Collaborator researches and qualifies matching companies.' },
      { fr: 'Il prépare des messages de prise de contact personnalisés.', en: 'It drafts personalized outreach messages.' },
      { fr: 'Vous validez la liste et les messages avant tout envoi.', en: 'You approve the list and messages before anything is sent.' },
    ],
    deliverable: {
      fr: 'Un tableau de 30 prospects qualifiés avec, pour chacun, le contact, le contexte et un message personnalisé prêt à envoyer.',
      en: 'A sheet of 30 qualified prospects with, for each, the contact, context and a personalized message ready to send.',
    },
    deliveryTime: { fr: '2 jours ouvrés', en: '2 business days' },
    validation: { fr: 'Votre accord est requis avant tout envoi.', en: 'Your approval is required before anything is sent.' },
    produces: [
      { fr: 'Liste de prospects qualifiés', en: 'Qualified prospect list' },
      { fr: 'Messages de prise de contact', en: 'Outreach messages' },
      { fr: 'Fiches contexte par entreprise', en: 'Context sheets per company' },
    ],
    skills: [
      { fr: 'Recherche', en: 'Research' },
      { fr: 'Qualification', en: 'Qualification' },
      { fr: 'CRM', en: 'CRM' },
      { fr: 'Rédaction', en: 'Writing' },
    ],
    tools: ['Web', 'CRM', 'Email', 'LinkedIn'],
    profile: { fr: 'Commercial', en: 'Sales Rep' },
    collaboratorSlug: 'hugo',
  },
  {
    slug: 'relancer-les-opportunites',
    category: 'ventes',
    title: { fr: 'Relancer les opportunités dormantes', en: 'Re-engage dormant opportunities' },
    description: {
      fr: 'Repère les affaires sans nouvelle, prépare les relances et remet le pipeline en mouvement.',
      en: 'Spots stalled deals, prepares follow-ups and gets the pipeline moving again.',
    },
    result: {
      fr: 'Des relances prêtes à valider pour chaque opportunité endormie.',
      en: 'Follow-ups ready to approve for every dormant opportunity.',
    },
    objective: {
      fr: 'Ne plus laisser filer les affaires en cours faute de suivi, et rouvrir les conversations au bon moment.',
      en: 'Stop losing deals for lack of follow-up, and reopen conversations at the right moment.',
    },
    steps: [
      { fr: 'Le Collaborateur analyse votre pipeline et repère les affaires sans activité récente.', en: 'The Collaborator reviews your pipeline and finds deals with no recent activity.' },
      { fr: 'Il reconstitue le contexte de chaque opportunité.', en: 'It reconstructs the context of each opportunity.' },
      { fr: 'Il rédige une relance adaptée à chaque situation.', en: 'It drafts a follow-up tailored to each situation.' },
      { fr: 'Vous validez et le suivi est mis à jour dans le CRM.', en: 'You approve and the CRM is updated.' },
    ],
    deliverable: {
      fr: 'Une file de relances personnalisées, classées par priorité, avec le contexte de chaque affaire.',
      en: 'A queue of personalized follow-ups, ranked by priority, with the context of each deal.',
    },
    deliveryTime: { fr: '1 jour ouvré', en: '1 business day' },
    validation: { fr: 'Votre accord est requis avant toute relance.', en: 'Your approval is required before any follow-up.' },
    produces: [
      { fr: 'Relances personnalisées', en: 'Personalized follow-ups' },
      { fr: 'Pipeline priorisé', en: 'Prioritized pipeline' },
      { fr: 'CRM à jour', en: 'Updated CRM' },
    ],
    skills: [
      { fr: 'Analyse du pipeline', en: 'Pipeline analysis' },
      { fr: 'Priorisation', en: 'Prioritization' },
      { fr: 'Rédaction', en: 'Writing' },
      { fr: 'Suivi', en: 'Follow-up' },
    ],
    tools: ['CRM', 'Email', 'Calendrier'],
    profile: { fr: 'Commercial', en: 'Sales Rep' },
    collaboratorSlug: 'hugo',
  },

  // ---------------- SUPPORT ----------------
  {
    slug: 'repondre-a-mes-clients',
    category: 'support',
    title: { fr: 'Répondre aux demandes des clients', en: 'Answer customer requests' },
    description: {
      fr: 'Analyse les demandes, prépare les réponses et transmet les cas sensibles.',
      en: 'Analyzes requests, drafts replies and escalates sensitive cases.',
    },
    result: {
      fr: 'Des demandes traitées et une file de validations claire.',
      en: 'Requests handled and a clear approval queue.',
    },
    objective: {
      fr: 'Répondre plus vite à vos clients tout en gardant la main sur les réponses sensibles.',
      en: 'Answer your customers faster while keeping control over sensitive replies.',
    },
    steps: [
      { fr: 'Les demandes entrantes sont classées par type et par urgence.', en: 'Incoming requests are sorted by type and urgency.' },
      { fr: 'Le Collaborateur prépare une réponse à partir de vos ressources.', en: 'The Collaborator drafts a reply from your resources.' },
      { fr: 'Les cas simples sont prêts à envoyer, les cas sensibles sont signalés.', en: 'Simple cases are ready to send, sensitive ones are flagged.' },
      { fr: 'Vous validez avant envoi et la base de connaissances s’enrichit.', en: 'You approve before sending and the knowledge base grows.' },
    ],
    deliverable: {
      fr: 'Une file de réponses prêtes à valider, avec les cas sensibles clairement identifiés.',
      en: 'A queue of replies ready to approve, with sensitive cases clearly identified.',
    },
    deliveryTime: { fr: 'En continu', en: 'Ongoing' },
    validation: { fr: 'Validation requise avant l’envoi des réponses sensibles.', en: 'Approval required before sending sensitive replies.' },
    produces: [
      { fr: 'Réponses prêtes à valider', en: 'Replies ready to approve' },
      { fr: 'File de cas escaladés', en: 'Escalated case queue' },
      { fr: 'Base de connaissances enrichie', en: 'Enriched knowledge base' },
    ],
    skills: [
      { fr: 'Classification', en: 'Classification' },
      { fr: 'Recherche', en: 'Research' },
      { fr: 'Rédaction', en: 'Writing' },
      { fr: 'Escalade', en: 'Escalation' },
    ],
    tools: ['Email', 'Helpdesk', 'Base de connaissances', 'Chat'],
    profile: { fr: 'Support client', en: 'Customer Support' },
    collaboratorSlug: 'ines',
  },
  {
    slug: 'construire-ma-faq',
    category: 'support',
    title: { fr: 'Construire ma FAQ et mes réponses types', en: 'Build my FAQ and canned replies' },
    description: {
      fr: 'Analyse les demandes récurrentes et prépare des réponses réutilisables.',
      en: 'Analyzes recurring requests and prepares reusable replies.',
    },
    result: {
      fr: 'Une FAQ claire et des réponses types prêtes à réutiliser.',
      en: 'A clear FAQ and canned replies ready to reuse.',
    },
    objective: {
      fr: 'Réduire le volume de demandes répétitives en outillant votre support avec de bonnes réponses prêtes à l’emploi.',
      en: 'Reduce repetitive requests by equipping your support with solid ready-to-use answers.',
    },
    steps: [
      { fr: 'Le Collaborateur analyse l’historique des demandes.', en: 'The Collaborator analyzes the request history.' },
      { fr: 'Il regroupe les questions récurrentes par thème.', en: 'It groups recurring questions by topic.' },
      { fr: 'Il rédige une réponse claire pour chacune.', en: 'It writes a clear answer for each.' },
      { fr: 'Vous validez et publiez la FAQ.', en: 'You approve and publish the FAQ.' },
    ],
    deliverable: {
      fr: 'Une FAQ structurée par thème et un jeu de réponses types prêtes à insérer dans vos échanges.',
      en: 'A FAQ structured by topic and a set of canned replies ready to drop into your exchanges.',
    },
    deliveryTime: { fr: '3 jours ouvrés', en: '3 business days' },
    validation: { fr: 'Votre accord est requis avant publication.', en: 'Your approval is required before publishing.' },
    produces: [
      { fr: 'FAQ structurée', en: 'Structured FAQ' },
      { fr: 'Réponses types', en: 'Canned replies' },
      { fr: 'Thèmes récurrents identifiés', en: 'Recurring topics identified' },
    ],
    skills: [
      { fr: 'Analyse', en: 'Analysis' },
      { fr: 'Synthèse', en: 'Synthesis' },
      { fr: 'Rédaction', en: 'Writing' },
      { fr: 'Organisation', en: 'Organization' },
    ],
    tools: ['Helpdesk', 'Base de connaissances', 'Documents'],
    profile: { fr: 'Support client', en: 'Customer Support' },
    collaboratorSlug: 'ines',
  },

  // ---------------- MARKETING ----------------
  {
    slug: 'creer-mes-contenus',
    category: 'marketing',
    title: { fr: 'Produire une campagne de contenu', en: 'Produce a content campaign' },
    description: {
      fr: 'Produit les textes, visuels, présentations ou vidéos adaptés à votre identité.',
      en: 'Produces the copy, visuals, decks or videos aligned with your identity.',
    },
    result: {
      fr: 'Des contenus prêts à examiner et publier.',
      en: 'Content ready to review and publish.',
    },
    objective: {
      fr: 'Alimenter vos canaux avec des contenus réguliers et cohérents, sans y consacrer toutes vos semaines.',
      en: 'Feed your channels with regular, consistent content without spending all your weeks on it.',
    },
    steps: [
      { fr: 'Vous donnez le sujet, le ton et le canal visé.', en: 'You give the topic, tone and target channel.' },
      { fr: 'Le Collaborateur rédige et met en forme le contenu.', en: 'The Collaborator writes and formats the content.' },
      { fr: 'Il l’adapte à chaque canal (article, post, visuel).', en: 'It adapts it to each channel (article, post, visual).' },
      { fr: 'Vous examinez, ajustez et publiez.', en: 'You review, adjust and publish.' },
    ],
    deliverable: {
      fr: 'Un article de blog, sa déclinaison en posts pour les réseaux sociaux et un visuel d’illustration, prêts à publier.',
      en: 'A blog post, its social-media variations and an illustration, ready to publish.',
    },
    deliveryTime: { fr: '2 jours ouvrés', en: '2 business days' },
    validation: { fr: 'Votre accord est requis avant publication.', en: 'Your approval is required before publishing.' },
    produces: [
      { fr: 'Articles et posts', en: 'Articles and posts' },
      { fr: 'Visuels', en: 'Visuals' },
      { fr: 'Déclinaisons par canal', en: 'Per-channel variations' },
    ],
    skills: [
      { fr: 'Rédaction', en: 'Writing' },
      { fr: 'Design', en: 'Design' },
      { fr: 'Publication', en: 'Publishing' },
      { fr: 'Analyse', en: 'Analysis' },
    ],
    tools: ['Documents', 'Images', 'Vidéo', 'Réseaux sociaux'],
    profile: { fr: 'Création de contenu', en: 'Content creation' },
    collaboratorSlug: 'lea',
  },
  {
    slug: 'animer-mes-reseaux-sociaux',
    category: 'marketing',
    title: { fr: 'Préparer une semaine de publications', en: 'Prepare a week of posts' },
    description: {
      fr: 'Planifie le calendrier, prépare les publications et suit l’engagement.',
      en: 'Plans the calendar, prepares posts and tracks engagement.',
    },
    result: {
      fr: 'Un calendrier de publications prêt à valider et à programmer.',
      en: 'A posting calendar ready to approve and schedule.',
    },
    objective: {
      fr: 'Tenir une présence régulière sur vos réseaux sans devoir y penser chaque jour.',
      en: 'Keep a regular presence on your networks without having to think about it every day.',
    },
    steps: [
      { fr: 'Le Collaborateur propose un calendrier éditorial.', en: 'The Collaborator proposes an editorial calendar.' },
      { fr: 'Il prépare chaque publication et son visuel.', en: 'It prepares each post and its visual.' },
      { fr: 'Vous validez la semaine en un coup d’œil.', en: 'You approve the week at a glance.' },
      { fr: 'Il suit l’engagement et ajuste les prochains contenus.', en: 'It tracks engagement and adjusts upcoming content.' },
    ],
    deliverable: {
      fr: 'Un calendrier d’une semaine de publications, visuels inclus, prêt à programmer.',
      en: 'A one-week posting calendar, visuals included, ready to schedule.',
    },
    deliveryTime: { fr: '2 jours ouvrés', en: '2 business days' },
    validation: { fr: 'Votre accord est requis avant programmation.', en: 'Your approval is required before scheduling.' },
    produces: [
      { fr: 'Calendrier éditorial', en: 'Editorial calendar' },
      { fr: 'Publications et visuels', en: 'Posts and visuals' },
      { fr: 'Suivi de l’engagement', en: 'Engagement tracking' },
    ],
    skills: [
      { fr: 'Planification', en: 'Planning' },
      { fr: 'Rédaction', en: 'Writing' },
      { fr: 'Design', en: 'Design' },
      { fr: 'Analyse', en: 'Analysis' },
    ],
    tools: ['Réseaux sociaux', 'Images', 'Analytics'],
    profile: { fr: 'Réseaux sociaux', en: 'Social Media Manager' },
    collaboratorSlug: 'lea',
  },
  {
    slug: 'ameliorer-mon-referencement',
    category: 'marketing',
    title: { fr: 'Préparer un plan d’optimisation SEO', en: 'Prepare an SEO optimization plan' },
    description: {
      fr: 'Analyse vos pages, identifie les opportunités et prépare les optimisations.',
      en: 'Analyzes your pages, identifies opportunities and prepares optimizations.',
    },
    result: {
      fr: 'Un plan d’optimisation clair et des contenus prêts à publier.',
      en: 'A clear optimization plan and content ready to publish.',
    },
    objective: {
      fr: 'Gagner en visibilité sur les moteurs de recherche avec un plan d’action concret.',
      en: 'Gain visibility on search engines with a concrete action plan.',
    },
    steps: [
      { fr: 'Le Collaborateur audite vos pages et vos mots-clés.', en: 'The Collaborator audits your pages and keywords.' },
      { fr: 'Il identifie les opportunités les plus rentables.', en: 'It identifies the highest-value opportunities.' },
      { fr: 'Il prépare les optimisations et les nouveaux contenus.', en: 'It prepares the optimizations and new content.' },
      { fr: 'Vous validez et suivez les positions dans le temps.', en: 'You approve and track rankings over time.' },
    ],
    deliverable: {
      fr: 'Un audit priorisé, une liste de mots-clés cibles et un premier contenu optimisé prêt à publier.',
      en: 'A prioritized audit, a list of target keywords and a first optimized piece ready to publish.',
    },
    deliveryTime: { fr: '3 jours ouvrés', en: '3 business days' },
    validation: { fr: 'Votre accord est requis avant mise en ligne.', en: 'Your approval is required before going live.' },
    produces: [
      { fr: 'Audit SEO priorisé', en: 'Prioritized SEO audit' },
      { fr: 'Mots-clés cibles', en: 'Target keywords' },
      { fr: 'Contenus optimisés', en: 'Optimized content' },
    ],
    skills: [
      { fr: 'Audit', en: 'Audit' },
      { fr: 'Recherche de mots-clés', en: 'Keyword research' },
      { fr: 'Rédaction', en: 'Writing' },
      { fr: 'Analyse', en: 'Analysis' },
    ],
    tools: ['Web', 'Analytics', 'CMS', 'Documents'],
    profile: { fr: 'Référencement naturel', en: 'SEO Specialist' },
    collaboratorSlug: 'lea',
  },

  // ---------------- REUNIONS ----------------
  {
    slug: 'preparer-et-suivre-mes-reunions',
    category: 'reunions',
    title: { fr: 'Préparer une réunion et suivre les décisions', en: 'Prepare a meeting and track decisions' },
    description: {
      fr: 'Réunit le contexte, prépare l’ordre du jour, produit le compte rendu et suit les décisions.',
      en: 'Gathers context, prepares the agenda, produces minutes and tracks decisions.',
    },
    result: {
      fr: 'Un compte rendu structuré et des actions suivies jusqu’à leur clôture.',
      en: 'A structured recap and actions followed through to completion.',
    },
    objective: {
      fr: 'Arriver préparé à chaque réunion et ne plus perdre les décisions une fois la réunion terminée.',
      en: 'Arrive prepared to every meeting and stop losing decisions once the meeting is over.',
    },
    steps: [
      { fr: 'Le Collaborateur réunit le contexte et prépare l’ordre du jour.', en: 'The Collaborator gathers context and prepares the agenda.' },
      { fr: 'Pendant la réunion, il prend des notes structurées.', en: 'During the meeting, it takes structured notes.' },
      { fr: 'Il produit un compte rendu et une liste d’actions.', en: 'It produces minutes and an action list.' },
      { fr: 'Il suit chaque action jusqu’à sa clôture.', en: 'It follows each action through to completion.' },
    ],
    deliverable: {
      fr: 'Un ordre du jour avant la réunion, un compte rendu après, et une liste d’actions assignées et suivies.',
      en: 'An agenda before the meeting, minutes after, and a list of assigned, tracked actions.',
    },
    deliveryTime: { fr: 'Avant et après chaque réunion', en: 'Before and after each meeting' },
    validation: { fr: 'Vous validez l’ordre du jour et le compte rendu.', en: 'You approve the agenda and the minutes.' },
    produces: [
      { fr: 'Ordre du jour', en: 'Agenda' },
      { fr: 'Compte rendu structuré', en: 'Structured minutes' },
      { fr: 'Actions suivies', en: 'Tracked actions' },
    ],
    skills: [
      { fr: 'Recherche', en: 'Research' },
      { fr: 'Synthèse', en: 'Synthesis' },
      { fr: 'Transcription', en: 'Transcription' },
      { fr: 'Suivi', en: 'Follow-up' },
    ],
    tools: ['Agenda', 'Visioconférence', 'Documents'],
    profile: { fr: 'Assistant de réunion', en: 'Meeting assistant' },
    collaboratorSlug: 'emma',
  },

  // ---------------- FINANCE ----------------
  {
    slug: 'preparer-mon-reporting-financier',
    category: 'analyse',
    title: { fr: 'Produire le reporting financier mensuel', en: 'Produce the monthly financial report' },
    description: {
      fr: 'Consolide les données, calcule les indicateurs et met en forme le reporting.',
      en: 'Consolidates data, computes metrics and formats the report.',
    },
    result: {
      fr: 'Un reporting clair, prêt à examiner et à présenter.',
      en: 'A clear report, ready to review and present.',
    },
    objective: {
      fr: 'Obtenir un reporting fiable et lisible chaque mois, sans les heures de consolidation manuelle.',
      en: 'Get a reliable, readable report every month, without the hours of manual consolidation.',
    },
    steps: [
      { fr: 'Le Collaborateur récupère et consolide vos données.', en: 'The Collaborator gathers and consolidates your data.' },
      { fr: 'Il calcule les indicateurs et repère les écarts.', en: 'It computes the metrics and spots variances.' },
      { fr: 'Il met en forme un reporting clair et commenté.', en: 'It formats a clear, commented report.' },
      { fr: 'Vous examinez et présentez en confiance.', en: 'You review and present with confidence.' },
    ],
    deliverable: {
      fr: 'Un reporting mensuel mis en forme, avec les indicateurs clés, les écarts commentés et un résumé pour la direction.',
      en: 'A formatted monthly report, with key metrics, commented variances and an executive summary.',
    },
    deliveryTime: { fr: '2 jours ouvrés', en: '2 business days' },
    validation: { fr: 'Vous examinez le reporting avant diffusion.', en: 'You review the report before it is shared.' },
    produces: [
      { fr: 'Reporting mis en forme', en: 'Formatted report' },
      { fr: 'Indicateurs clés', en: 'Key metrics' },
      { fr: 'Résumé de direction', en: 'Executive summary' },
    ],
    skills: [
      { fr: 'Consolidation', en: 'Consolidation' },
      { fr: 'Analyse financière', en: 'Financial analysis' },
      { fr: 'Reporting', en: 'Reporting' },
      { fr: 'Synthèse', en: 'Synthesis' },
    ],
    tools: ['Tableur', 'ERP', 'BI', 'Documents'],
    profile: { fr: 'Analyste financière', en: 'Financial Analyst' },
    collaboratorSlug: 'nadia',
  },

  // ---------------- AUTOMATISATION ----------------
  {
    slug: 'automatiser-mes-operations',
    category: 'automatisation',
    title: { fr: 'Automatiser une tâche répétitive', en: 'Automate a repetitive task' },
    description: {
      fr: 'Conçoit, exécute et surveille vos processus avec vos applications.',
      en: 'Designs, runs and monitors your processes with your apps.',
    },
    result: {
      fr: 'Un processus automatisé, documenté et surveillé.',
      en: 'An automated, documented and monitored process.',
    },
    objective: {
      fr: 'Supprimer les tâches manuelles répétitives en les confiant à un processus fiable et surveillé.',
      en: 'Remove repetitive manual tasks by handing them to a reliable, monitored process.',
    },
    steps: [
      { fr: 'Vous décrivez le processus à automatiser.', en: 'You describe the process to automate.' },
      { fr: 'Le Collaborateur le conçoit et le connecte à vos applications.', en: 'The Collaborator designs it and connects it to your apps.' },
      { fr: 'Il le teste sur des cas réels avant mise en service.', en: 'It tests it on real cases before going live.' },
      { fr: 'Il le surveille et vous alerte en cas d’anomalie.', en: 'It monitors it and alerts you on anomalies.' },
    ],
    deliverable: {
      fr: 'Un processus automatisé opérationnel, sa documentation et un tableau de surveillance.',
      en: 'A live automated process, its documentation and a monitoring dashboard.',
    },
    deliveryTime: { fr: '3 jours ouvrés', en: '3 business days' },
    validation: { fr: 'Votre accord est requis avant mise en service.', en: 'Your approval is required before going live.' },
    produces: [
      { fr: 'Processus automatisé', en: 'Automated process' },
      { fr: 'Documentation', en: 'Documentation' },
      { fr: 'Surveillance et alertes', en: 'Monitoring and alerts' },
    ],
    skills: [
      { fr: 'Conception', en: 'Design' },
      { fr: 'Intégration', en: 'Integration' },
      { fr: 'Contrôle', en: 'Monitoring' },
      { fr: 'Reprise', en: 'Recovery' },
    ],
    tools: ['n8n', 'API', 'Applications métier'],
    profile: { fr: 'Automatisation', en: 'Automation' },
    collaboratorSlug: 'arthur',
  },

  // ---------------- DEVELOPPEMENT ----------------
  {
    slug: 'developper-une-fonctionnalite',
    category: 'developpement',
    title: { fr: 'Implémenter une fonctionnalité', en: 'Implement a feature' },
    description: {
      fr: 'Analyse le besoin, produit le code, exécute les tests et prépare la livraison.',
      en: 'Analyzes the need, writes the code, runs the tests and prepares delivery.',
    },
    result: {
      fr: 'Une fonctionnalité documentée et prête à examiner.',
      en: 'A documented feature ready to review.',
    },
    objective: {
      fr: 'Avancer sur votre feuille de route produit avec des livraisons propres et testées.',
      en: 'Move forward on your product roadmap with clean, tested deliveries.',
    },
    steps: [
      { fr: 'Vous décrivez la fonctionnalité attendue.', en: 'You describe the expected feature.' },
      { fr: 'Le Collaborateur conçoit et écrit le code.', en: 'The Collaborator designs and writes the code.' },
      { fr: 'Il exécute les tests et documente son travail.', en: 'It runs the tests and documents its work.' },
      { fr: 'Vous examinez la contribution avant de la fusionner.', en: 'You review the contribution before merging.' },
    ],
    deliverable: {
      fr: 'Une contribution de code testée, documentée et prête à être relue puis fusionnée.',
      en: 'A tested, documented code contribution ready to be reviewed and merged.',
    },
    deliveryTime: { fr: '3 jours ouvrés', en: '3 business days' },
    validation: { fr: 'Vous examinez la contribution avant fusion.', en: 'You review the contribution before merging.' },
    produces: [
      { fr: 'Code testé', en: 'Tested code' },
      { fr: 'Documentation technique', en: 'Technical documentation' },
      { fr: 'Contribution prête à fusionner', en: 'Contribution ready to merge' },
    ],
    skills: [
      { fr: 'Architecture', en: 'Architecture' },
      { fr: 'Code', en: 'Code' },
      { fr: 'Tests', en: 'Tests' },
      { fr: 'Documentation', en: 'Documentation' },
    ],
    tools: ['GitHub', 'Terminal', 'Environnement de développement'],
    profile: { fr: 'Développement', en: 'Development' },
    collaboratorSlug: 'arthur',
  },
  {
    slug: 'corriger-un-lot-de-bugs',
    category: 'developpement',
    title: { fr: 'Corriger des anomalies prioritaires', en: 'Fix priority issues' },
    description: {
      fr: 'Reproduit les anomalies, identifie la cause et prépare les correctifs.',
      en: 'Reproduces issues, identifies the root cause and prepares fixes.',
    },
    result: {
      fr: 'Des correctifs testés, prêts à examiner et à livrer.',
      en: 'Tested fixes, ready to review and ship.',
    },
    objective: {
      fr: 'Réduire votre dette de bugs sans mobiliser l’équipe sur des correctifs répétitifs.',
      en: 'Reduce your bug backlog without tying up the team on repetitive fixes.',
    },
    steps: [
      { fr: 'Le Collaborateur reproduit chaque anomalie signalée.', en: 'The Collaborator reproduces each reported issue.' },
      { fr: 'Il identifie la cause et prépare un correctif.', en: 'It identifies the cause and prepares a fix.' },
      { fr: 'Il teste que le correctif ne casse rien d’autre.', en: 'It tests that the fix breaks nothing else.' },
      { fr: 'Vous examinez et livrez en confiance.', en: 'You review and ship with confidence.' },
    ],
    deliverable: {
      fr: 'Un lot de correctifs testés, chacun accompagné de la cause identifiée et des tests associés.',
      en: 'A batch of tested fixes, each with the identified cause and its associated tests.',
    },
    deliveryTime: { fr: '2 jours ouvrés', en: '2 business days' },
    validation: { fr: 'Vous examinez les correctifs avant livraison.', en: 'You review the fixes before shipping.' },
    produces: [
      { fr: 'Correctifs testés', en: 'Tested fixes' },
      { fr: 'Causes identifiées', en: 'Identified root causes' },
      { fr: 'Tests de non-régression', en: 'Regression tests' },
    ],
    skills: [
      { fr: 'Diagnostic', en: 'Diagnosis' },
      { fr: 'Code', en: 'Code' },
      { fr: 'Tests', en: 'Tests' },
      { fr: 'Revue', en: 'Review' },
    ],
    tools: ['GitHub', 'Terminal', 'Environnement de développement'],
    profile: { fr: 'Développement', en: 'Development' },
    collaboratorSlug: 'arthur',
  },

  // ---------------- VENTES (suite) ----------------
  {
    slug: 'qualifier-les-leads-entrants',
    category: 'ventes',
    title: { fr: 'Qualifier les leads entrants', en: 'Qualify inbound leads' },
    description: { fr: 'Trie les demandes entrantes, les qualifie et les oriente vers le bon interlocuteur.', en: 'Sorts inbound requests, qualifies them and routes them to the right person.' },
    result: { fr: 'Des leads qualifiés et priorisés, prêts à être suivis.', en: 'Qualified, prioritized leads ready to follow up.' },
    objective: { fr: 'Ne plus perdre de temps sur des leads froids et concentrer vos efforts sur les contacts à fort potentiel.', en: 'Stop wasting time on cold leads and focus on high-potential contacts.' },
    steps: [
      { fr: 'Le Collaborateur collecte les demandes entrantes de tous vos canaux.', en: 'The Collaborator collects inbound requests from all your channels.' },
      { fr: 'Il les qualifie selon vos critères et les note.', en: 'It qualifies them against your criteria and scores them.' },
      { fr: 'Il les répartit et vous signale les priorités.', en: 'It routes them and flags the priorities.' },
    ],
    deliverable: { fr: 'Une file de leads qualifiés, notés et assignés, avec le contexte de chaque demande.', en: 'A queue of qualified, scored and assigned leads, with the context of each request.' },
    deliveryTime: { fr: 'En continu', en: 'Ongoing' },
    validation: { fr: 'Vous gardez la main sur les critères de qualification.', en: 'You keep control over the qualification criteria.' },
    produces: [
      { fr: 'Leads qualifiés et notés', en: 'Qualified, scored leads' },
      { fr: 'Répartition par interlocuteur', en: 'Routing by owner' },
      { fr: 'Priorités signalées', en: 'Flagged priorities' },
    ],
    skills: [
      { fr: 'Qualification', en: 'Qualification' },
      { fr: 'Scoring', en: 'Scoring' },
      { fr: 'CRM', en: 'CRM' },
    ],
    tools: ['CRM', 'Email', 'Formulaires'],
    profile: { fr: 'Commercial', en: 'Sales Rep' },
    collaboratorSlug: 'hugo',
    facets: { status: 'on-setup', modality: 'email' },
  },
  {
    slug: 'prospection-telephonique',
    category: 'ventes',
    title: { fr: 'Préparer ma prospection téléphonique', en: 'Prepare my phone prospecting' },
    description: { fr: 'Prépare les listes d’appels, les scripts et le suivi après chaque échange.', en: 'Prepares call lists, scripts and follow-up after each call.' },
    result: { fr: 'Des sessions d’appels prêtes, avec script et suivi.', en: 'Ready call sessions, with script and follow-up.' },
    objective: { fr: 'Rendre chaque session d’appels efficace, avec les bons contacts et le bon discours.', en: 'Make every call session effective, with the right contacts and the right pitch.' },
    steps: [
      { fr: 'Le Collaborateur prépare une liste d’appels priorisée.', en: 'The Collaborator prepares a prioritized call list.' },
      { fr: 'Il rédige un script adapté à chaque profil.', en: 'It drafts a script tailored to each profile.' },
      { fr: 'Après l’appel, il consigne le résultat et prépare la relance.', en: 'After the call, it logs the outcome and prepares the follow-up.' },
    ],
    deliverable: { fr: 'Une liste d’appels priorisée, un script par profil et un modèle de suivi post-appel.', en: 'A prioritized call list, a script per profile and a post-call follow-up template.' },
    deliveryTime: { fr: '1 jour ouvré', en: '1 business day' },
    validation: { fr: 'Vous validez le script avant les appels.', en: 'You approve the script before the calls.' },
    produces: [
      { fr: 'Liste d’appels priorisée', en: 'Prioritized call list' },
      { fr: 'Scripts par profil', en: 'Scripts per profile' },
      { fr: 'Suivi post-appel', en: 'Post-call follow-up' },
    ],
    skills: [
      { fr: 'Priorisation', en: 'Prioritization' },
      { fr: 'Rédaction', en: 'Writing' },
      { fr: 'Suivi', en: 'Follow-up' },
    ],
    tools: ['CRM', 'Téléphonie', 'Documents'],
    profile: { fr: 'Commercial', en: 'Sales Rep' },
    collaboratorSlug: 'hugo',
    facets: { status: 'on-setup', modality: 'telephone' },
  },
  {
    slug: 'preparer-mes-rendez-vous-commerciaux',
    category: 'ventes',
    title: { fr: 'Préparer mes rendez-vous commerciaux', en: 'Prepare my sales meetings' },
    description: { fr: 'Réunit le contexte du prospect et prépare un dossier de rendez-vous complet.', en: 'Gathers prospect context and prepares a complete meeting brief.' },
    result: { fr: 'Un dossier de rendez-vous clair, prêt avant chaque échange.', en: 'A clear meeting brief, ready before each call.' },
    objective: { fr: 'Arriver préparé à chaque rendez-vous et augmenter vos chances de conclure.', en: 'Arrive prepared to every meeting and improve your chances of closing.' },
    steps: [
      { fr: 'Le Collaborateur réunit l’historique et le contexte du prospect.', en: 'The Collaborator gathers the prospect’s history and context.' },
      { fr: 'Il prépare les points clés et les objections probables.', en: 'It prepares the key points and likely objections.' },
      { fr: 'Il assemble un dossier prêt à consulter avant le rendez-vous.', en: 'It assembles a brief ready to review before the meeting.' },
    ],
    deliverable: { fr: 'Un dossier de rendez-vous avec le contexte, les points clés, les objections probables et les prochaines étapes.', en: 'A meeting brief with context, key points, likely objections and next steps.' },
    deliveryTime: { fr: 'Avant chaque rendez-vous', en: 'Before each meeting' },
    validation: { fr: 'Vous relisez le dossier avant le rendez-vous.', en: 'You review the brief before the meeting.' },
    produces: [
      { fr: 'Dossier de rendez-vous', en: 'Meeting brief' },
      { fr: 'Points clés et objections', en: 'Key points and objections' },
      { fr: 'Prochaines étapes', en: 'Next steps' },
    ],
    skills: [
      { fr: 'Recherche', en: 'Research' },
      { fr: 'Synthèse', en: 'Synthesis' },
      { fr: 'Préparation', en: 'Preparation' },
    ],
    tools: ['CRM', 'Web', 'Documents'],
    profile: { fr: 'Commercial', en: 'Sales Rep' },
    collaboratorSlug: 'hugo',
    facets: { status: 'available', modality: 'documents' },
  },
  {
    slug: 'rediger-mes-devis',
    category: 'ventes',
    title: { fr: 'Préparer mes devis', en: 'Prepare my quotes' },
    description: { fr: 'Assemble les devis à partir de votre catalogue et de vos règles de prix.', en: 'Builds quotes from your catalog and pricing rules.' },
    result: { fr: 'Des devis prêts à valider et à envoyer.', en: 'Quotes ready to approve and send.' },
    objective: { fr: 'Produire des devis rapides et cohérents sans erreurs de prix.', en: 'Produce fast, consistent quotes without pricing errors.' },
    steps: [
      { fr: 'Vous décrivez le besoin du client.', en: 'You describe the client’s need.' },
      { fr: 'Le Collaborateur assemble le devis selon vos règles.', en: 'The Collaborator builds the quote using your rules.' },
      { fr: 'Vous validez avant l’envoi.', en: 'You approve before sending.' },
    ],
    deliverable: { fr: 'Un devis mis en forme, chiffré selon votre catalogue, prêt à valider et à envoyer.', en: 'A formatted quote, priced from your catalog, ready to approve and send.' },
    deliveryTime: { fr: 'Quelques heures', en: 'A few hours' },
    validation: { fr: 'Votre accord est requis avant l’envoi.', en: 'Your approval is required before sending.' },
    produces: [
      { fr: 'Devis mis en forme', en: 'Formatted quote' },
      { fr: 'Détail chiffré', en: 'Priced breakdown' },
      { fr: 'Conditions commerciales', en: 'Commercial terms' },
    ],
    skills: [
      { fr: 'Chiffrage', en: 'Pricing' },
      { fr: 'Rédaction', en: 'Writing' },
      { fr: 'Rigueur', en: 'Accuracy' },
    ],
    tools: ['CRM', 'Tableur', 'Documents'],
    profile: { fr: 'Commercial', en: 'Sales Rep' },
    collaboratorSlug: 'hugo',
    facets: { status: 'on-setup', modality: 'documents' },
  },

  // ---------------- SUPPORT (suite) ----------------
  {
    slug: 'traiter-les-avis-clients',
    category: 'support',
    title: { fr: 'Traiter les avis clients', en: 'Handle customer reviews' },
    description: { fr: 'Surveille les avis, prépare les réponses et remonte les signaux importants.', en: 'Monitors reviews, drafts replies and surfaces important signals.' },
    result: { fr: 'Des réponses prêtes et une synthèse des retours clients.', en: 'Ready replies and a summary of customer feedback.' },
    objective: { fr: 'Répondre à tous les avis et transformer les retours en améliorations concrètes.', en: 'Answer every review and turn feedback into concrete improvements.' },
    steps: [
      { fr: 'Le Collaborateur rassemble les avis de vos plateformes.', en: 'The Collaborator gathers reviews from your platforms.' },
      { fr: 'Il prépare une réponse adaptée à chaque avis.', en: 'It drafts a reply tailored to each review.' },
      { fr: 'Il synthétise les tendances et les points à corriger.', en: 'It summarizes trends and points to fix.' },
    ],
    deliverable: { fr: 'Une file de réponses prêtes à valider et une synthèse mensuelle des retours.', en: 'A queue of replies ready to approve and a monthly feedback summary.' },
    deliveryTime: { fr: 'En continu', en: 'Ongoing' },
    validation: { fr: 'Vous validez les réponses publiques avant publication.', en: 'You approve public replies before publishing.' },
    produces: [
      { fr: 'Réponses aux avis', en: 'Review replies' },
      { fr: 'Synthèse des retours', en: 'Feedback summary' },
      { fr: 'Points à corriger', en: 'Points to fix' },
    ],
    skills: [
      { fr: 'Analyse', en: 'Analysis' },
      { fr: 'Rédaction', en: 'Writing' },
      { fr: 'Synthèse', en: 'Synthesis' },
    ],
    tools: ['Plateformes d’avis', 'Documents'],
    profile: { fr: 'Support client', en: 'Customer Support' },
    collaboratorSlug: 'ines',
    facets: { status: 'on-setup', modality: 'chat' },
  },
  {
    slug: 'assurer-le-support-telephonique',
    category: 'support',
    title: { fr: 'Assurer le support téléphonique', en: 'Handle phone support' },
    description: { fr: 'Répond aux appels de premier niveau, note les demandes et transmet les cas complexes.', en: 'Answers first-line calls, logs requests and escalates complex cases.' },
    result: { fr: 'Des appels pris en charge et un suivi clair des demandes.', en: 'Calls handled and a clear record of requests.' },
    objective: { fr: 'Ne plus manquer d’appels et offrir une première réponse immédiate à vos clients.', en: 'Stop missing calls and give your customers an immediate first response.' },
    steps: [
      { fr: 'Le Collaborateur prend l’appel et identifie la demande.', en: 'The Collaborator takes the call and identifies the request.' },
      { fr: 'Il répond aux cas simples à partir de vos ressources.', en: 'It handles simple cases from your resources.' },
      { fr: 'Il transmet les cas complexes avec un compte rendu.', en: 'It escalates complex cases with a summary.' },
    ],
    deliverable: { fr: 'Un journal d’appels avec la demande, la réponse apportée et les cas transmis.', en: 'A call log with the request, the answer given and escalated cases.' },
    deliveryTime: { fr: 'En continu', en: 'Ongoing' },
    validation: { fr: 'Vous définissez les cas à transmettre systématiquement.', en: 'You define which cases are always escalated.' },
    produces: [
      { fr: 'Appels pris en charge', en: 'Calls handled' },
      { fr: 'Journal des demandes', en: 'Request log' },
      { fr: 'Cas transmis', en: 'Escalated cases' },
    ],
    skills: [
      { fr: 'Écoute', en: 'Listening' },
      { fr: 'Classification', en: 'Classification' },
      { fr: 'Escalade', en: 'Escalation' },
    ],
    tools: ['Téléphonie', 'Helpdesk', 'Base de connaissances'],
    profile: { fr: 'Support client', en: 'Customer Support' },
    collaboratorSlug: 'ines',
    facets: { status: 'coming-soon', modality: 'telephone' },
  },
  {
    slug: 'suivre-la-satisfaction-client',
    category: 'support',
    title: { fr: 'Suivre la satisfaction client', en: 'Track customer satisfaction' },
    description: { fr: 'Collecte les retours, mesure la satisfaction et alerte sur les baisses.', en: 'Collects feedback, measures satisfaction and alerts on drops.' },
    result: { fr: 'Un suivi clair de la satisfaction et des alertes utiles.', en: 'A clear satisfaction dashboard and useful alerts.' },
    objective: { fr: 'Détecter tôt les clients insatisfaits pour agir avant qu’ils ne partent.', en: 'Spot unhappy customers early to act before they leave.' },
    steps: [
      { fr: 'Le Collaborateur envoie les enquêtes au bon moment.', en: 'The Collaborator sends surveys at the right moment.' },
      { fr: 'Il consolide les réponses et calcule les indicateurs.', en: 'It consolidates responses and computes the metrics.' },
      { fr: 'Il vous alerte en cas de signal faible.', en: 'It alerts you on any weak signal.' },
    ],
    deliverable: { fr: 'Un suivi de satisfaction consolidé, avec indicateurs, verbatims et alertes sur les cas à risque.', en: 'A consolidated satisfaction view, with metrics, verbatims and alerts on at-risk cases.' },
    deliveryTime: { fr: 'En continu', en: 'Ongoing' },
    validation: { fr: 'Vous définissez les seuils d’alerte.', en: 'You set the alert thresholds.' },
    produces: [
      { fr: 'Indicateurs de satisfaction', en: 'Satisfaction metrics' },
      { fr: 'Verbatims clés', en: 'Key verbatims' },
      { fr: 'Alertes sur cas à risque', en: 'At-risk alerts' },
    ],
    skills: [
      { fr: 'Mesure', en: 'Measurement' },
      { fr: 'Analyse', en: 'Analysis' },
      { fr: 'Reporting', en: 'Reporting' },
    ],
    tools: ['Enquêtes', 'Helpdesk', 'Tableur'],
    profile: { fr: 'Support client', en: 'Customer Support' },
    collaboratorSlug: 'ines',
    facets: { status: 'on-setup', modality: 'documents' },
  },

  // ---------------- MARKETING (suite) ----------------
  {
    slug: 'rediger-ma-newsletter',
    category: 'marketing',
    title: { fr: 'Rédiger ma newsletter', en: 'Write my newsletter' },
    description: { fr: 'Prépare le sommaire, rédige les articles et met en forme l’envoi.', en: 'Prepares the outline, writes the pieces and formats the send.' },
    result: { fr: 'Une newsletter prête à relire et à envoyer.', en: 'A newsletter ready to review and send.' },
    objective: { fr: 'Tenir un rythme d’envoi régulier sans y passer des heures à chaque édition.', en: 'Keep a regular sending rhythm without spending hours on each edition.' },
    steps: [
      { fr: 'Le Collaborateur propose un sommaire à partir de votre actualité.', en: 'The Collaborator proposes an outline from your news.' },
      { fr: 'Il rédige chaque section dans votre ton.', en: 'It writes each section in your tone.' },
      { fr: 'Il met en forme l’envoi, prêt à programmer.', en: 'It formats the send, ready to schedule.' },
    ],
    deliverable: { fr: 'Une newsletter complète, mise en forme et prête à programmer dans votre outil d’envoi.', en: 'A complete newsletter, formatted and ready to schedule in your sending tool.' },
    deliveryTime: { fr: '1 jour ouvré', en: '1 business day' },
    validation: { fr: 'Votre accord est requis avant l’envoi.', en: 'Your approval is required before sending.' },
    produces: [
      { fr: 'Sommaire éditorial', en: 'Editorial outline' },
      { fr: 'Articles rédigés', en: 'Written pieces' },
      { fr: 'Envoi mis en forme', en: 'Formatted send' },
    ],
    skills: [
      { fr: 'Rédaction', en: 'Writing' },
      { fr: 'Édition', en: 'Editing' },
      { fr: 'Mise en forme', en: 'Formatting' },
    ],
    tools: ['Documents', 'Emailing', 'Images'],
    profile: { fr: 'Création de contenu', en: 'Content creation' },
    collaboratorSlug: 'lea',
    facets: { status: 'available', modality: 'email' },
  },
  {
    slug: 'produire-mes-fiches-produits',
    category: 'marketing',
    title: { fr: 'Produire mes fiches produits', en: 'Produce my product pages' },
    description: { fr: 'Rédige des fiches produits claires, optimisées et cohérentes.', en: 'Writes clear, optimized and consistent product pages.' },
    result: { fr: 'Des fiches produits prêtes à publier.', en: 'Product pages ready to publish.' },
    objective: { fr: 'Homogénéiser et enrichir vos fiches produits pour mieux convertir.', en: 'Standardize and enrich your product pages to convert better.' },
    steps: [
      { fr: 'Le Collaborateur récupère les caractéristiques de chaque produit.', en: 'The Collaborator gathers each product’s specs.' },
      { fr: 'Il rédige une fiche claire et optimisée.', en: 'It writes a clear, optimized page.' },
      { fr: 'Vous validez avant mise en ligne.', en: 'You approve before going live.' },
    ],
    deliverable: { fr: 'Un lot de fiches produits rédigées, optimisées pour la recherche et prêtes à publier.', en: 'A batch of product pages, search-optimized and ready to publish.' },
    deliveryTime: { fr: '2 jours ouvrés', en: '2 business days' },
    validation: { fr: 'Votre accord est requis avant mise en ligne.', en: 'Your approval is required before going live.' },
    produces: [
      { fr: 'Fiches produits rédigées', en: 'Written product pages' },
      { fr: 'Optimisation recherche', en: 'Search optimization' },
      { fr: 'Cohérence éditoriale', en: 'Editorial consistency' },
    ],
    skills: [
      { fr: 'Rédaction', en: 'Writing' },
      { fr: 'SEO', en: 'SEO' },
      { fr: 'Cohérence', en: 'Consistency' },
    ],
    tools: ['CMS', 'Documents', 'Tableur'],
    profile: { fr: 'Création de contenu', en: 'Content creation' },
    collaboratorSlug: 'lea',
    facets: { status: 'on-setup', modality: 'documents' },
  },
  {
    slug: 'preparer-mes-campagnes-emailing',
    category: 'marketing',
    title: { fr: 'Préparer mes campagnes emailing', en: 'Prepare my email campaigns' },
    description: { fr: 'Segmente les contacts, rédige les emails et prépare la campagne.', en: 'Segments contacts, writes the emails and prepares the campaign.' },
    result: { fr: 'Une campagne emailing prête à valider et à programmer.', en: 'An email campaign ready to approve and schedule.' },
    objective: { fr: 'Envoyer le bon message au bon segment, sans monter chaque campagne à la main.', en: 'Send the right message to the right segment, without building each campaign by hand.' },
    steps: [
      { fr: 'Le Collaborateur segmente votre base selon vos objectifs.', en: 'The Collaborator segments your base against your goals.' },
      { fr: 'Il rédige les emails et les variantes de test.', en: 'It writes the emails and test variants.' },
      { fr: 'Il prépare la campagne, prête à programmer.', en: 'It prepares the campaign, ready to schedule.' },
    ],
    deliverable: { fr: 'Une campagne segmentée, avec emails rédigés, variantes de test et planning d’envoi.', en: 'A segmented campaign, with written emails, test variants and a send schedule.' },
    deliveryTime: { fr: '2 jours ouvrés', en: '2 business days' },
    validation: { fr: 'Votre accord est requis avant l’envoi.', en: 'Your approval is required before sending.' },
    produces: [
      { fr: 'Segments de contacts', en: 'Contact segments' },
      { fr: 'Emails et variantes', en: 'Emails and variants' },
      { fr: 'Planning d’envoi', en: 'Send schedule' },
    ],
    skills: [
      { fr: 'Segmentation', en: 'Segmentation' },
      { fr: 'Rédaction', en: 'Writing' },
      { fr: 'Analyse', en: 'Analysis' },
    ],
    tools: ['Emailing', 'CRM', 'Analytics'],
    profile: { fr: 'Marketing', en: 'Marketing' },
    collaboratorSlug: 'lea',
    facets: { status: 'on-setup', modality: 'email' },
  },

  // ---------------- REUNIONS (suite) ----------------
  {
    slug: 'transcrire-mes-reunions',
    category: 'reunions',
    title: { fr: 'Transcrire mes réunions', en: 'Transcribe my meetings' },
    description: { fr: 'Transcrit vos réunions et en extrait les décisions et les actions.', en: 'Transcribes your meetings and extracts decisions and actions.' },
    result: { fr: 'Une transcription fidèle et un résumé actionnable.', en: 'A faithful transcript and an actionable summary.' },
    objective: { fr: 'Garder une trace exploitable de chaque réunion sans prendre de notes.', en: 'Keep a usable record of every meeting without taking notes.' },
    steps: [
      { fr: 'Le Collaborateur transcrit l’enregistrement de la réunion.', en: 'The Collaborator transcribes the meeting recording.' },
      { fr: 'Il en extrait les décisions et les actions.', en: 'It extracts decisions and actions.' },
      { fr: 'Il produit un résumé prêt à partager.', en: 'It produces a summary ready to share.' },
    ],
    deliverable: { fr: 'Une transcription complète, un résumé des décisions et une liste d’actions assignées.', en: 'A full transcript, a summary of decisions and a list of assigned actions.' },
    deliveryTime: { fr: 'Après chaque réunion', en: 'After each meeting' },
    validation: { fr: 'Vous relisez le résumé avant diffusion.', en: 'You review the summary before sharing.' },
    produces: [
      { fr: 'Transcription complète', en: 'Full transcript' },
      { fr: 'Résumé des décisions', en: 'Decision summary' },
      { fr: 'Actions assignées', en: 'Assigned actions' },
    ],
    skills: [
      { fr: 'Transcription', en: 'Transcription' },
      { fr: 'Synthèse', en: 'Synthesis' },
      { fr: 'Organisation', en: 'Organization' },
    ],
    tools: ['Visioconférence', 'Documents'],
    profile: { fr: 'Assistant de réunion', en: 'Meeting assistant' },
    collaboratorSlug: 'emma',
    facets: { status: 'available', modality: 'reunion' },
  },
  {
    slug: 'coordonner-les-agendas',
    category: 'reunions',
    title: { fr: 'Coordonner les agendas', en: 'Coordinate calendars' },
    description: { fr: 'Trouve les créneaux, propose les rendez-vous et gère les confirmations.', en: 'Finds slots, proposes meetings and manages confirmations.' },
    result: { fr: 'Des rendez-vous calés sans allers-retours.', en: 'Meetings booked without back-and-forth.' },
    objective: { fr: 'Supprimer les échanges interminables pour trouver un créneau commun.', en: 'Remove the endless back-and-forth to find a common slot.' },
    steps: [
      { fr: 'Le Collaborateur compare les disponibilités de chacun.', en: 'The Collaborator compares everyone’s availability.' },
      { fr: 'Il propose les meilleurs créneaux.', en: 'It proposes the best slots.' },
      { fr: 'Il envoie les invitations et gère les confirmations.', en: 'It sends invites and manages confirmations.' },
    ],
    deliverable: { fr: 'Des rendez-vous confirmés dans les agendas, avec invitations envoyées et rappels programmés.', en: 'Confirmed meetings in the calendars, with invites sent and reminders scheduled.' },
    deliveryTime: { fr: 'En continu', en: 'Ongoing' },
    validation: { fr: 'Vous fixez les règles de disponibilité.', en: 'You set the availability rules.' },
    produces: [
      { fr: 'Créneaux proposés', en: 'Proposed slots' },
      { fr: 'Invitations envoyées', en: 'Sent invites' },
      { fr: 'Rappels programmés', en: 'Scheduled reminders' },
    ],
    skills: [
      { fr: 'Organisation', en: 'Organization' },
      { fr: 'Coordination', en: 'Coordination' },
      { fr: 'Suivi', en: 'Follow-up' },
    ],
    tools: ['Agenda', 'Email'],
    profile: { fr: 'Assistant de réunion', en: 'Meeting assistant' },
    collaboratorSlug: 'emma',
    facets: { status: 'on-setup', modality: 'reunion' },
  },
  {
    slug: 'organiser-un-evenement-interne',
    category: 'reunions',
    title: { fr: 'Organiser un événement interne', en: 'Organize an internal event' },
    description: { fr: 'Coordonne la logistique, les invitations et le suivi d’un événement.', en: 'Coordinates logistics, invitations and follow-up for an event.' },
    result: { fr: 'Un événement préparé de bout en bout.', en: 'An event prepared end to end.' },
    objective: { fr: 'Organiser vos événements internes sans y consacrer des journées entières.', en: 'Organize your internal events without spending entire days on them.' },
    steps: [
      { fr: 'Vous décrivez l’événement et ses objectifs.', en: 'You describe the event and its goals.' },
      { fr: 'Le Collaborateur planifie la logistique et les invitations.', en: 'The Collaborator plans logistics and invitations.' },
      { fr: 'Il suit les confirmations et prépare le déroulé.', en: 'It tracks confirmations and prepares the run-of-show.' },
    ],
    deliverable: { fr: 'Un plan d’événement complet : rétroplanning, invitations, logistique et déroulé.', en: 'A complete event plan: timeline, invitations, logistics and run-of-show.' },
    deliveryTime: { fr: 'Selon l’échéance', en: 'Depending on the date' },
    validation: { fr: 'Vous validez le plan avant lancement.', en: 'You approve the plan before launch.' },
    produces: [
      { fr: 'Rétroplanning', en: 'Timeline' },
      { fr: 'Invitations et suivi', en: 'Invitations and follow-up' },
      { fr: 'Déroulé de l’événement', en: 'Run-of-show' },
    ],
    skills: [
      { fr: 'Planification', en: 'Planning' },
      { fr: 'Coordination', en: 'Coordination' },
      { fr: 'Logistique', en: 'Logistics' },
    ],
    tools: ['Agenda', 'Email', 'Documents'],
    profile: { fr: 'Coordination', en: 'Coordination' },
    collaboratorSlug: 'emma',
    facets: { status: 'coming-soon', modality: 'documents' },
  },

  // ---------------- ANALYSE (suite) ----------------
  {
    slug: 'analyser-mes-donnees',
    category: 'analyse',
    title: { fr: 'Analyser mes données', en: 'Analyze my data' },
    description: { fr: 'Explore vos données, identifie les tendances et rédige les enseignements.', en: 'Explores your data, identifies trends and writes the takeaways.' },
    result: { fr: 'Une analyse claire, avec enseignements et recommandations.', en: 'A clear analysis, with takeaways and recommendations.' },
    objective: { fr: 'Transformer vos données brutes en décisions concrètes.', en: 'Turn your raw data into concrete decisions.' },
    steps: [
      { fr: 'Vous indiquez la question à laquelle répondre.', en: 'You state the question to answer.' },
      { fr: 'Le Collaborateur explore et croise vos données.', en: 'The Collaborator explores and cross-references your data.' },
      { fr: 'Il rédige les enseignements et les recommandations.', en: 'It writes the takeaways and recommendations.' },
    ],
    deliverable: { fr: 'Une note d’analyse avec les enseignements clés, les graphiques et des recommandations.', en: 'An analysis note with key takeaways, charts and recommendations.' },
    deliveryTime: { fr: '2 jours ouvrés', en: '2 business days' },
    validation: { fr: 'Vous relisez l’analyse avant diffusion.', en: 'You review the analysis before sharing.' },
    produces: [
      { fr: 'Note d’analyse', en: 'Analysis note' },
      { fr: 'Graphiques', en: 'Charts' },
      { fr: 'Recommandations', en: 'Recommendations' },
    ],
    skills: [
      { fr: 'Analyse de données', en: 'Data analysis' },
      { fr: 'Synthèse', en: 'Synthesis' },
      { fr: 'Visualisation', en: 'Visualization' },
    ],
    tools: ['Tableur', 'BI', 'Documents'],
    profile: { fr: 'Analyste', en: 'Analyst' },
    collaboratorSlug: 'nadia',
    facets: { status: 'on-setup', modality: 'documents' },
  },
  {
    slug: 'produire-un-tableau-de-bord',
    category: 'analyse',
    title: { fr: 'Produire un tableau de bord', en: 'Build a dashboard' },
    description: { fr: 'Conçoit un tableau de bord clair, alimenté par vos données.', en: 'Designs a clear dashboard, fed by your data.' },
    result: { fr: 'Un tableau de bord lisible et tenu à jour.', en: 'A readable dashboard, kept up to date.' },
    objective: { fr: 'Suivre vos indicateurs clés d’un coup d’œil, sans consolidation manuelle.', en: 'Track your key metrics at a glance, without manual consolidation.' },
    steps: [
      { fr: 'Vous précisez les indicateurs à suivre.', en: 'You specify the metrics to track.' },
      { fr: 'Le Collaborateur connecte les sources et conçoit le tableau.', en: 'The Collaborator connects the sources and designs the dashboard.' },
      { fr: 'Il le tient à jour et vous alerte sur les écarts.', en: 'It keeps it up to date and alerts you on variances.' },
    ],
    deliverable: { fr: 'Un tableau de bord alimenté automatiquement, avec les indicateurs clés et des alertes sur écarts.', en: 'An auto-fed dashboard, with key metrics and variance alerts.' },
    deliveryTime: { fr: '3 jours ouvrés', en: '3 business days' },
    validation: { fr: 'Vous validez les indicateurs et les seuils.', en: 'You approve the metrics and thresholds.' },
    produces: [
      { fr: 'Tableau de bord', en: 'Dashboard' },
      { fr: 'Indicateurs clés', en: 'Key metrics' },
      { fr: 'Alertes sur écarts', en: 'Variance alerts' },
    ],
    skills: [
      { fr: 'Modélisation', en: 'Modeling' },
      { fr: 'Visualisation', en: 'Visualization' },
      { fr: 'Analyse', en: 'Analysis' },
    ],
    tools: ['BI', 'Tableur', 'API'],
    profile: { fr: 'Analyste', en: 'Analyst' },
    collaboratorSlug: 'nadia',
    facets: { status: 'coming-soon', modality: 'documents' },
  },
  {
    slug: 'realiser-une-veille-concurrentielle',
    category: 'analyse',
    title: { fr: 'Réaliser une veille concurrentielle', en: 'Run competitive intelligence' },
    description: { fr: 'Surveille vos concurrents et synthétise les mouvements du marché.', en: 'Monitors your competitors and summarizes market moves.' },
    result: { fr: 'Une veille synthétique, régulière et exploitable.', en: 'A concise, regular and usable intelligence brief.' },
    objective: { fr: 'Rester au courant de votre marché sans y passer des heures chaque semaine.', en: 'Stay on top of your market without spending hours each week.' },
    steps: [
      { fr: 'Vous indiquez les concurrents et les thèmes à suivre.', en: 'You list the competitors and topics to watch.' },
      { fr: 'Le Collaborateur collecte et trie les informations.', en: 'The Collaborator collects and sorts the information.' },
      { fr: 'Il rédige une synthèse régulière avec les points saillants.', en: 'It writes a regular summary with the highlights.' },
    ],
    deliverable: { fr: 'Une synthèse de veille périodique, avec les mouvements clés et leur impact possible.', en: 'A periodic intelligence brief, with key moves and their possible impact.' },
    deliveryTime: { fr: 'Hebdomadaire', en: 'Weekly' },
    validation: { fr: 'Vous ajustez les sources et les thèmes suivis.', en: 'You adjust the sources and topics watched.' },
    produces: [
      { fr: 'Synthèse de veille', en: 'Intelligence brief' },
      { fr: 'Mouvements clés', en: 'Key moves' },
      { fr: 'Impacts possibles', en: 'Possible impacts' },
    ],
    skills: [
      { fr: 'Veille', en: 'Monitoring' },
      { fr: 'Recherche', en: 'Research' },
      { fr: 'Synthèse', en: 'Synthesis' },
    ],
    tools: ['Web', 'Documents'],
    profile: { fr: 'Analyste', en: 'Analyst' },
    collaboratorSlug: 'nadia',
    facets: { status: 'on-setup', modality: 'documents' },
  },

  // ---------------- FINANCE ----------------
  {
    slug: 'suivre-ma-tresorerie',
    category: 'finance',
    title: { fr: 'Suivre ma trésorerie', en: 'Track my cash flow' },
    description: { fr: 'Consolide les flux, met à jour la position et anticipe les tensions.', en: 'Consolidates flows, updates the position and anticipates pressure.' },
    result: { fr: 'Une position de trésorerie claire et à jour.', en: 'A clear, up-to-date cash position.' },
    objective: { fr: 'Toujours savoir où vous en êtes et anticiper les tensions de trésorerie.', en: 'Always know where you stand and anticipate cash pressure.' },
    steps: [
      { fr: 'Le Collaborateur consolide vos entrées et sorties.', en: 'The Collaborator consolidates your inflows and outflows.' },
      { fr: 'Il met à jour la position et projette les prochaines semaines.', en: 'It updates the position and projects the coming weeks.' },
      { fr: 'Il vous alerte en cas de tension prévisible.', en: 'It alerts you on any foreseeable pressure.' },
    ],
    deliverable: { fr: 'Un suivi de trésorerie mis à jour, avec la position actuelle et une projection à court terme.', en: 'An updated cash-flow view, with the current position and a short-term projection.' },
    deliveryTime: { fr: 'Hebdomadaire', en: 'Weekly' },
    validation: { fr: 'Vous validez les hypothèses de projection.', en: 'You approve the projection assumptions.' },
    produces: [
      { fr: 'Position de trésorerie', en: 'Cash position' },
      { fr: 'Projection court terme', en: 'Short-term projection' },
      { fr: 'Alertes de tension', en: 'Pressure alerts' },
    ],
    skills: [
      { fr: 'Consolidation', en: 'Consolidation' },
      { fr: 'Projection', en: 'Forecasting' },
      { fr: 'Analyse', en: 'Analysis' },
    ],
    tools: ['Tableur', 'Banque', 'ERP'],
    profile: { fr: 'Analyste financière', en: 'Financial Analyst' },
    collaboratorSlug: 'nadia',
    facets: { status: 'on-setup', modality: 'documents' },
  },
  {
    slug: 'relancer-les-factures-impayees',
    category: 'finance',
    title: { fr: 'Relancer les factures impayées', en: 'Chase unpaid invoices' },
    description: { fr: 'Repère les retards, prépare les relances et suit les paiements.', en: 'Spots overdue invoices, prepares reminders and tracks payments.' },
    result: { fr: 'Des relances envoyées et des délais de paiement réduits.', en: 'Reminders sent and payment delays reduced.' },
    objective: { fr: 'Réduire vos retards de paiement sans y consacrer votre temps.', en: 'Reduce your payment delays without spending your time on it.' },
    steps: [
      { fr: 'Le Collaborateur identifie les factures en retard.', en: 'The Collaborator identifies overdue invoices.' },
      { fr: 'Il prépare une relance adaptée au niveau de retard.', en: 'It prepares a reminder matched to the delay.' },
      { fr: 'Il suit le paiement et relance si nécessaire.', en: 'It tracks payment and follows up if needed.' },
    ],
    deliverable: { fr: 'Une file de relances graduées, prêtes à valider, avec le suivi des paiements attendus.', en: 'A queue of graduated reminders, ready to approve, with tracking of expected payments.' },
    deliveryTime: { fr: 'En continu', en: 'Ongoing' },
    validation: { fr: 'Votre accord est requis avant chaque relance.', en: 'Your approval is required before each reminder.' },
    produces: [
      { fr: 'Relances graduées', en: 'Graduated reminders' },
      { fr: 'Suivi des paiements', en: 'Payment tracking' },
      { fr: 'Factures soldées', en: 'Settled invoices' },
    ],
    skills: [
      { fr: 'Suivi', en: 'Follow-up' },
      { fr: 'Rédaction', en: 'Writing' },
      { fr: 'Rigueur', en: 'Accuracy' },
    ],
    tools: ['Facturation', 'Email', 'Tableur'],
    profile: { fr: 'Gestion', en: 'Accounting' },
    collaboratorSlug: 'nadia',
    facets: { status: 'on-setup', modality: 'email' },
  },
  {
    slug: 'preparer-mes-notes-de-frais',
    category: 'finance',
    title: { fr: 'Préparer mes notes de frais', en: 'Prepare my expense reports' },
    description: { fr: 'Collecte les justificatifs, vérifie les règles et prépare les notes.', en: 'Collects receipts, checks the rules and prepares the reports.' },
    result: { fr: 'Des notes de frais complètes, prêtes à valider.', en: 'Complete expense reports, ready to approve.' },
    objective: { fr: 'En finir avec la corvée des notes de frais tout en respectant vos règles.', en: 'End the expense-report chore while respecting your rules.' },
    steps: [
      { fr: 'Le Collaborateur rassemble les justificatifs.', en: 'The Collaborator gathers the receipts.' },
      { fr: 'Il vérifie la conformité avec votre politique.', en: 'It checks compliance with your policy.' },
      { fr: 'Il prépare la note, prête à valider.', en: 'It prepares the report, ready to approve.' },
    ],
    deliverable: { fr: 'Une note de frais complète et vérifiée, avec justificatifs classés, prête à valider.', en: 'A complete, verified expense report, with receipts organized, ready to approve.' },
    deliveryTime: { fr: 'Quelques heures', en: 'A few hours' },
    validation: { fr: 'Votre accord est requis avant remboursement.', en: 'Your approval is required before reimbursement.' },
    produces: [
      { fr: 'Notes de frais vérifiées', en: 'Verified expense reports' },
      { fr: 'Justificatifs classés', en: 'Organized receipts' },
      { fr: 'Contrôle de conformité', en: 'Compliance check' },
    ],
    skills: [
      { fr: 'Vérification', en: 'Verification' },
      { fr: 'Organisation', en: 'Organization' },
      { fr: 'Rigueur', en: 'Accuracy' },
    ],
    tools: ['Tableur', 'Gestion de frais', 'Documents'],
    profile: { fr: 'Gestion', en: 'Accounting' },
    collaboratorSlug: 'nadia',
    facets: { status: 'available', modality: 'documents' },
  },
  {
    slug: 'etablir-mes-previsions-budgetaires',
    category: 'finance',
    title: { fr: 'Établir mes prévisions budgétaires', en: 'Build my budget forecasts' },
    description: { fr: 'Construit un budget prévisionnel et suit les écarts au fil de l’eau.', en: 'Builds a forecast budget and tracks variances over time.' },
    result: { fr: 'Un budget prévisionnel clair et suivi.', en: 'A clear, tracked forecast budget.' },
    objective: { fr: 'Piloter votre activité avec un budget fiable et actualisé.', en: 'Steer your business with a reliable, up-to-date budget.' },
    steps: [
      { fr: 'Le Collaborateur construit le budget à partir de vos hypothèses.', en: 'The Collaborator builds the budget from your assumptions.' },
      { fr: 'Il compare le réalisé au prévu chaque mois.', en: 'It compares actuals to plan each month.' },
      { fr: 'Il commente les écarts et propose des ajustements.', en: 'It comments on variances and proposes adjustments.' },
    ],
    deliverable: { fr: 'Un budget prévisionnel structuré, avec suivi mensuel des écarts et ajustements proposés.', en: 'A structured forecast budget, with monthly variance tracking and proposed adjustments.' },
    deliveryTime: { fr: '3 jours ouvrés', en: '3 business days' },
    validation: { fr: 'Vous validez les hypothèses de départ.', en: 'You approve the starting assumptions.' },
    produces: [
      { fr: 'Budget prévisionnel', en: 'Forecast budget' },
      { fr: 'Suivi des écarts', en: 'Variance tracking' },
      { fr: 'Ajustements proposés', en: 'Proposed adjustments' },
    ],
    skills: [
      { fr: 'Modélisation', en: 'Modeling' },
      { fr: 'Prévision', en: 'Forecasting' },
      { fr: 'Analyse', en: 'Analysis' },
    ],
    tools: ['Tableur', 'ERP', 'BI'],
    profile: { fr: 'Contrôle de gestion', en: 'Financial Controller' },
    collaboratorSlug: 'nadia',
    facets: { status: 'coming-soon', modality: 'documents' },
  },

  // ---------------- AUTOMATISATION (suite) ----------------
  {
    slug: 'connecter-mes-applications',
    category: 'automatisation',
    title: { fr: 'Connecter mes applications', en: 'Connect my apps' },
    description: { fr: 'Relie vos outils entre eux pour que les données circulent sans ressaisie.', en: 'Links your tools so data flows without re-entry.' },
    result: { fr: 'Des applications connectées et des données synchronisées.', en: 'Connected apps and synchronized data.' },
    objective: { fr: 'Supprimer les copier-coller entre vos outils.', en: 'Remove the copy-paste between your tools.' },
    steps: [
      { fr: 'Vous indiquez les outils à relier.', en: 'You list the tools to connect.' },
      { fr: 'Le Collaborateur conçoit et met en place les connexions.', en: 'The Collaborator designs and sets up the connections.' },
      { fr: 'Il teste puis surveille le bon fonctionnement.', en: 'It tests then monitors that it runs correctly.' },
    ],
    deliverable: { fr: 'Des connexions opérationnelles entre vos applications, documentées et surveillées.', en: 'Live connections between your apps, documented and monitored.' },
    deliveryTime: { fr: '2 jours ouvrés', en: '2 business days' },
    validation: { fr: 'Vous validez avant mise en service.', en: 'You approve before going live.' },
    produces: [
      { fr: 'Connexions opérationnelles', en: 'Live connections' },
      { fr: 'Documentation', en: 'Documentation' },
      { fr: 'Surveillance', en: 'Monitoring' },
    ],
    skills: [
      { fr: 'Intégration', en: 'Integration' },
      { fr: 'Conception', en: 'Design' },
      { fr: 'Contrôle', en: 'Monitoring' },
    ],
    tools: ['n8n', 'API', 'Applications métier'],
    profile: { fr: 'Automatisation', en: 'Automation' },
    collaboratorSlug: 'arthur',
    facets: { status: 'on-setup', modality: 'automatisation' },
  },
  {
    slug: 'synchroniser-mon-crm',
    category: 'automatisation',
    title: { fr: 'Synchroniser mon CRM', en: 'Sync my CRM' },
    description: { fr: 'Tient votre CRM à jour automatiquement à partir de vos autres outils.', en: 'Keeps your CRM up to date automatically from your other tools.' },
    result: { fr: 'Un CRM toujours à jour, sans saisie manuelle.', en: 'A CRM always up to date, without manual entry.' },
    objective: { fr: 'Fiabiliser votre CRM pour que vos équipes s’y fient vraiment.', en: 'Make your CRM reliable so your teams actually trust it.' },
    steps: [
      { fr: 'Le Collaborateur cartographie les données à synchroniser.', en: 'The Collaborator maps the data to sync.' },
      { fr: 'Il met en place la synchronisation et les règles de nettoyage.', en: 'It sets up the sync and cleaning rules.' },
      { fr: 'Il surveille la qualité des données dans le temps.', en: 'It monitors data quality over time.' },
    ],
    deliverable: { fr: 'Une synchronisation CRM opérationnelle, avec règles de nettoyage et contrôle de qualité.', en: 'A live CRM sync, with cleaning rules and quality control.' },
    deliveryTime: { fr: '2 jours ouvrés', en: '2 business days' },
    validation: { fr: 'Vous validez les règles de synchronisation.', en: 'You approve the sync rules.' },
    produces: [
      { fr: 'Synchronisation opérationnelle', en: 'Live sync' },
      { fr: 'Règles de nettoyage', en: 'Cleaning rules' },
      { fr: 'Contrôle de qualité', en: 'Quality control' },
    ],
    skills: [
      { fr: 'Intégration', en: 'Integration' },
      { fr: 'Qualité de données', en: 'Data quality' },
      { fr: 'Contrôle', en: 'Monitoring' },
    ],
    tools: ['CRM', 'API', 'n8n'],
    profile: { fr: 'Automatisation', en: 'Automation' },
    collaboratorSlug: 'arthur',
    facets: { status: 'on-setup', modality: 'automatisation' },
  },
  {
    slug: 'automatiser-la-saisie-de-donnees',
    category: 'automatisation',
    title: { fr: 'Automatiser la saisie de données', en: 'Automate data entry' },
    description: { fr: 'Extrait les données de vos documents et les saisit dans vos outils.', en: 'Extracts data from your documents and enters it into your tools.' },
    result: { fr: 'Une saisie fiable, sans intervention manuelle.', en: 'Reliable entry, without manual work.' },
    objective: { fr: 'Éliminer la saisie manuelle et ses erreurs.', en: 'Eliminate manual entry and its errors.' },
    steps: [
      { fr: 'Le Collaborateur lit vos documents entrants.', en: 'The Collaborator reads your incoming documents.' },
      { fr: 'Il en extrait les données utiles.', en: 'It extracts the useful data.' },
      { fr: 'Il les saisit dans vos outils et signale les doutes.', en: 'It enters them into your tools and flags any doubts.' },
    ],
    deliverable: { fr: 'Un flux de saisie automatisé, avec contrôle des cas incertains, prêt à fonctionner.', en: 'An automated entry flow, with a check on uncertain cases, ready to run.' },
    deliveryTime: { fr: '2 jours ouvrés', en: '2 business days' },
    validation: { fr: 'Vous validez le traitement des cas incertains.', en: 'You approve how uncertain cases are handled.' },
    produces: [
      { fr: 'Saisie automatisée', en: 'Automated entry' },
      { fr: 'Contrôle des doutes', en: 'Doubt handling' },
      { fr: 'Documentation', en: 'Documentation' },
    ],
    skills: [
      { fr: 'Extraction', en: 'Extraction' },
      { fr: 'Intégration', en: 'Integration' },
      { fr: 'Contrôle', en: 'Monitoring' },
    ],
    tools: ['OCR', 'API', 'Applications métier'],
    profile: { fr: 'Automatisation', en: 'Automation' },
    collaboratorSlug: 'arthur',
    facets: { status: 'available', modality: 'automatisation' },
  },
  {
    slug: 'surveiller-mes-processus',
    category: 'automatisation',
    title: { fr: 'Surveiller mes processus', en: 'Monitor my processes' },
    description: { fr: 'Surveille vos automatisations et vous alerte en cas d’anomalie.', en: 'Monitors your automations and alerts you on anomalies.' },
    result: { fr: 'Des processus surveillés et des alertes fiables.', en: 'Monitored processes and reliable alerts.' },
    objective: { fr: 'Détecter les pannes avant qu’elles n’impactent votre activité.', en: 'Catch failures before they impact your business.' },
    steps: [
      { fr: 'Le Collaborateur définit les points de contrôle.', en: 'The Collaborator defines the control points.' },
      { fr: 'Il surveille l’exécution en continu.', en: 'It monitors execution continuously.' },
      { fr: 'Il alerte et propose une reprise en cas d’anomalie.', en: 'It alerts and proposes recovery on anomalies.' },
    ],
    deliverable: { fr: 'Un tableau de surveillance de vos processus, avec alertes et procédures de reprise.', en: 'A monitoring board for your processes, with alerts and recovery procedures.' },
    deliveryTime: { fr: 'En continu', en: 'Ongoing' },
    validation: { fr: 'Vous définissez les seuils d’alerte.', en: 'You set the alert thresholds.' },
    produces: [
      { fr: 'Tableau de surveillance', en: 'Monitoring board' },
      { fr: 'Alertes fiables', en: 'Reliable alerts' },
      { fr: 'Procédures de reprise', en: 'Recovery procedures' },
    ],
    skills: [
      { fr: 'Surveillance', en: 'Monitoring' },
      { fr: 'Diagnostic', en: 'Diagnosis' },
      { fr: 'Reprise', en: 'Recovery' },
    ],
    tools: ['n8n', 'API', 'Alerting'],
    profile: { fr: 'Automatisation', en: 'Automation' },
    collaboratorSlug: 'arthur',
    facets: { status: 'coming-soon', modality: 'automatisation' },
  },

  // ---------------- DEVELOPPEMENT (suite) ----------------
  {
    slug: 'reviser-le-code',
    category: 'developpement',
    title: { fr: 'Réviser le code', en: 'Review code' },
    description: { fr: 'Relit les contributions, signale les problèmes et propose des améliorations.', en: 'Reviews contributions, flags issues and suggests improvements.' },
    result: { fr: 'Des revues de code claires et constructives.', en: 'Clear, constructive code reviews.' },
    objective: { fr: 'Maintenir la qualité du code sans surcharger votre équipe.', en: 'Keep code quality high without overloading your team.' },
    steps: [
      { fr: 'Le Collaborateur relit chaque contribution.', en: 'The Collaborator reviews each contribution.' },
      { fr: 'Il signale les problèmes et les risques.', en: 'It flags issues and risks.' },
      { fr: 'Il propose des améliorations concrètes.', en: 'It suggests concrete improvements.' },
    ],
    deliverable: { fr: 'Une revue de code commentée, avec les problèmes classés par gravité et des propositions.', en: 'A commented code review, with issues ranked by severity and suggestions.' },
    deliveryTime: { fr: 'À chaque contribution', en: 'On each contribution' },
    validation: { fr: 'Vos développeurs gardent la décision finale.', en: 'Your developers keep the final call.' },
    produces: [
      { fr: 'Revue commentée', en: 'Commented review' },
      { fr: 'Problèmes classés', en: 'Ranked issues' },
      { fr: 'Propositions d’amélioration', en: 'Improvement suggestions' },
    ],
    skills: [
      { fr: 'Revue', en: 'Review' },
      { fr: 'Bonnes pratiques', en: 'Best practices' },
      { fr: 'Code', en: 'Code' },
    ],
    tools: ['GitHub', 'Environnement de développement'],
    profile: { fr: 'Développement', en: 'Development' },
    collaboratorSlug: 'arthur',
    facets: { status: 'on-setup', modality: 'automatisation' },
  },
  {
    slug: 'rediger-la-documentation-technique',
    category: 'developpement',
    title: { fr: 'Rédiger la documentation technique', en: 'Write technical documentation' },
    description: { fr: 'Documente votre code, vos API et vos processus techniques.', en: 'Documents your code, APIs and technical processes.' },
    result: { fr: 'Une documentation claire et tenue à jour.', en: 'Clear documentation, kept up to date.' },
    objective: { fr: 'Rendre votre code compréhensible et transmissible à toute l’équipe.', en: 'Make your code understandable and shareable across the team.' },
    steps: [
      { fr: 'Le Collaborateur analyse le code et les processus.', en: 'The Collaborator analyzes the code and processes.' },
      { fr: 'Il rédige une documentation structurée.', en: 'It writes structured documentation.' },
      { fr: 'Il la met à jour à chaque évolution.', en: 'It keeps it updated on each change.' },
    ],
    deliverable: { fr: 'Une documentation technique structurée, avec exemples, prête à publier pour l’équipe.', en: 'Structured technical documentation, with examples, ready to publish for the team.' },
    deliveryTime: { fr: '2 jours ouvrés', en: '2 business days' },
    validation: { fr: 'Vos développeurs relisent avant publication.', en: 'Your developers review before publishing.' },
    produces: [
      { fr: 'Documentation structurée', en: 'Structured documentation' },
      { fr: 'Exemples d’usage', en: 'Usage examples' },
      { fr: 'Mise à jour continue', en: 'Continuous updates' },
    ],
    skills: [
      { fr: 'Rédaction technique', en: 'Technical writing' },
      { fr: 'Synthèse', en: 'Synthesis' },
      { fr: 'Organisation', en: 'Organization' },
    ],
    tools: ['GitHub', 'Documents', 'Environnement de développement'],
    profile: { fr: 'Développement', en: 'Development' },
    collaboratorSlug: 'arthur',
    facets: { status: 'on-setup', modality: 'documents' },
  },
]

// Slugs renamed for SEO. Old slugs redirect to the new ones (see next.config).
export const MISSION_SLUG_REDIRECTS: Record<string, string> = {
  'trouver-des-clients': 'trouver-de-nouveaux-clients',
  'repondre-aux-clients': 'repondre-a-mes-clients',
  'preparer-mes-reunions': 'preparer-et-suivre-mes-reunions',
  'organiser-la-faq': 'construire-ma-faq',
  'animer-mes-reseaux': 'animer-mes-reseaux-sociaux',
  'preparer-mon-reporting': 'preparer-mon-reporting-financier',
  'corriger-des-bugs': 'corriger-un-lot-de-bugs',
}

export function getMission(slug: string): Mission | undefined {
  return MISSIONS.find((m) => m.slug === slug)
}

export function missionsByCategory(category: string): Mission[] {
  return MISSIONS.filter((m) => m.category === category)
}

export function relatedMissions(slug: string, limit = 3): Mission[] {
  const current = getMission(slug)
  if (!current) return []
  const sameCat = MISSIONS.filter((m) => m.slug !== slug && m.category === current.category)
  const others = MISSIONS.filter((m) => m.slug !== slug && m.category !== current.category)
  return [...sameCat, ...others].slice(0, limit)
}
