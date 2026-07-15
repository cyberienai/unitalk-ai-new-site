// Catalog of AI Collaborator roles, grouped by department.
// This is a catalog (like a directory of job descriptions), not a marketplace.

export type Bilingual = { fr: string; en: string }

export type CatalogRole = {
  name: string
  title: Bilingual
  slug?: string // present when a dedicated detail page exists
}

export type Department = {
  key: string
  label: Bilingual
  roles: CatalogRole[]
}

export const DEPARTMENTS: Department[] = [
  {
    key: 'direction',
    label: { fr: 'Direction', en: 'Leadership' },
    roles: [
      { name: 'Emma', title: { fr: 'Assistante de Direction', en: 'Executive Assistant' }, slug: 'emma' },
      { name: 'CEO Staff', title: { fr: 'Bras droit du dirigeant', en: 'CEO Staff' } },
      { name: 'Chief of Staff', title: { fr: 'Chief of Staff', en: 'Chief of Staff' } },
    ],
  },
  {
    key: 'marketing',
    label: { fr: 'Marketing', en: 'Marketing' },
    roles: [
      { name: 'Alex', title: { fr: 'Assistant Marketing', en: 'Marketing Assistant' }, slug: 'alex' },
      { name: 'Social Media Manager', title: { fr: 'Réseaux sociaux', en: 'Social Media Manager' } },
      { name: 'Content Manager', title: { fr: 'Contenu éditorial', en: 'Content Manager' } },
      { name: 'SEO Specialist', title: { fr: 'Référencement naturel', en: 'SEO Specialist' } },
      { name: 'Ads Specialist', title: { fr: 'Publicité en ligne', en: 'Ads Specialist' } },
    ],
  },
  {
    key: 'sales',
    label: { fr: 'Ventes', en: 'Sales' },
    roles: [
      { name: 'Marcus', title: { fr: 'Assistant Commercial', en: 'Sales Assistant' }, slug: 'marcus' },
      { name: 'SDR', title: { fr: 'Prospection', en: 'Sales Development Rep' } },
      { name: 'Account Executive', title: { fr: 'Closing', en: 'Account Executive' } },
      { name: 'Customer Success', title: { fr: 'Fidélisation', en: 'Customer Success' } },
    ],
  },
  {
    key: 'support',
    label: { fr: 'Support', en: 'Support' },
    roles: [
      { name: 'Sophia', title: { fr: 'Support Client', en: 'Customer Support' }, slug: 'sophia' },
      { name: 'Helpdesk', title: { fr: 'Assistance niveau 1', en: 'Helpdesk' } },
      { name: 'Technical Support', title: { fr: 'Support technique', en: 'Technical Support' } },
    ],
  },
  {
    key: 'finance',
    label: { fr: 'Finance', en: 'Finance' },
    roles: [
      { name: 'Comptabilité', title: { fr: 'Comptabilité', en: 'Accounting' } },
      { name: 'Contrôle de gestion', title: { fr: 'Contrôle de gestion', en: 'Management Control' } },
      { name: 'Facturation', title: { fr: 'Facturation', en: 'Billing' } },
    ],
  },
  {
    key: 'rh',
    label: { fr: 'Ressources Humaines', en: 'Human Resources' },
    roles: [
      { name: 'Recrutement', title: { fr: 'Sourcing & entretiens', en: 'Recruiting' } },
      { name: 'Onboarding', title: { fr: 'Intégration', en: 'Onboarding' } },
      { name: 'People Ops', title: { fr: 'Vie des équipes', en: 'People Ops' } },
    ],
  },
  {
    key: 'produit',
    label: { fr: 'Produit', en: 'Product' },
    roles: [
      { name: 'Product Manager', title: { fr: 'Roadmap & specs', en: 'Product Manager' } },
      { name: 'User Research', title: { fr: 'Recherche utilisateur', en: 'User Research' } },
      { name: 'QA', title: { fr: 'Qualité', en: 'Quality Assurance' } },
    ],
  },
  {
    key: 'operations',
    label: { fr: 'Opérations', en: 'Operations' },
    roles: [
      { name: 'Ops Manager', title: { fr: 'Coordination', en: 'Ops Manager' } },
      { name: 'Achats', title: { fr: 'Achats & fournisseurs', en: 'Procurement' } },
      { name: 'Logistique', title: { fr: 'Logistique', en: 'Logistics' } },
    ],
  },
  {
    key: 'juridique',
    label: { fr: 'Juridique', en: 'Legal' },
    roles: [
      { name: 'Contrats', title: { fr: 'Gestion des contrats', en: 'Contracts' } },
      { name: 'Conformité', title: { fr: 'Conformité & RGPD', en: 'Compliance' } },
    ],
  },
  {
    key: 'developpement',
    label: { fr: 'Développement', en: 'Engineering' },
    roles: [
      { name: 'Dev Assistant', title: { fr: 'Assistant développeur', en: 'Dev Assistant' } },
      { name: 'DevOps', title: { fr: 'Infrastructure', en: 'DevOps' } },
      { name: 'Data Analyst', title: { fr: 'Analyse de données', en: 'Data Analyst' } },
    ],
  },
]

export type RoleDetail = {
  slug: string
  name: string
  avatar: string
  role: Bilingual
  department: Bilingual
  description: Bilingual
  skills: Bilingual[]
  tools: string[]
  missions: Bilingual[]
}

export const ROLE_DETAILS: Record<string, RoleDetail> = {
  emma: {
    slug: 'emma',
    name: 'Emma',
    avatar: '/nina-avatar.png',
    role: { fr: 'Assistante de Direction', en: 'Executive Assistant' },
    department: { fr: 'Direction', en: 'Leadership' },
    description: {
      fr: "Emma gère l'agenda, les priorités et la logistique de la direction. Elle prépare les réunions, filtre les demandes et garde chaque dossier prêt au bon moment.",
      en: "Emma manages the leadership's calendar, priorities and logistics. She prepares meetings, filters requests and keeps every file ready at the right time.",
    },
    skills: [
      { fr: 'Gestion d\'agenda et priorisation', en: 'Calendar management and prioritization' },
      { fr: 'Préparation de réunions et comptes-rendus', en: 'Meeting prep and minutes' },
      { fr: 'Coordination des déplacements', en: 'Travel coordination' },
      { fr: 'Filtrage et tri des demandes', en: 'Request filtering and triage' },
    ],
    tools: ['Email', 'Google Agenda', 'Notion', 'Slack', 'Zoom'],
    missions: [
      { fr: 'Organiser le comité de direction hebdomadaire', en: 'Organize the weekly leadership committee' },
      { fr: 'Réserver et confirmer un déplacement complet', en: 'Book and confirm a full business trip' },
      { fr: 'Préparer un dossier de décision avant réunion', en: 'Prepare a decision brief before a meeting' },
    ],
  },
  marcus: {
    slug: 'marcus',
    name: 'Marcus',
    avatar: '/marcus-avatar.png',
    role: { fr: 'Assistant Commercial', en: 'Sales Assistant' },
    department: { fr: 'Ventes', en: 'Sales' },
    description: {
      fr: "Marcus prospecte, qualifie les leads et suit le pipeline. Il relance au bon moment, tient le CRM à jour et prépare chaque rendez-vous commercial.",
      en: 'Marcus prospects, qualifies leads and tracks the pipeline. He follows up at the right time, keeps the CRM up to date and preps every sales meeting.',
    },
    skills: [
      { fr: 'Prospection et qualification', en: 'Prospecting and qualification' },
      { fr: 'Relances automatiques', en: 'Automated follow-ups' },
      { fr: 'Mise à jour du CRM', en: 'CRM updates' },
      { fr: 'Préparation de propositions', en: 'Proposal preparation' },
    ],
    tools: ['Email', 'CRM', 'LinkedIn', 'Téléphone', 'Calendrier'],
    missions: [
      { fr: 'Qualifier les nouveaux leads entrants', en: 'Qualify new inbound leads' },
      { fr: 'Relancer les opportunités dormantes', en: 'Re-engage dormant opportunities' },
      { fr: 'Préparer un rendez-vous de closing', en: 'Prepare a closing meeting' },
    ],
  },
  sophia: {
    slug: 'sophia',
    name: 'Sophia',
    avatar: '/sophia-avatar.png',
    role: { fr: 'Support Client', en: 'Customer Support' },
    department: { fr: 'Support', en: 'Support' },
    description: {
      fr: "Sophia répond aux clients en continu, résout les demandes courantes et escalade les cas complexes. Elle apprend de chaque échange pour s'améliorer.",
      en: 'Sophia answers customers around the clock, resolves common requests and escalates complex cases. She learns from every exchange to improve.',
    },
    skills: [
      { fr: 'Réponses aux demandes clients', en: 'Handling customer requests' },
      { fr: 'Résolution de tickets', en: 'Ticket resolution' },
      { fr: 'Escalade intelligente', en: 'Smart escalation' },
      { fr: 'Suivi de satisfaction', en: 'Satisfaction follow-up' },
    ],
    tools: ['Email', 'Helpdesk', 'Chat', 'CRM', 'Base de connaissances'],
    missions: [
      { fr: 'Traiter la file de tickets du matin', en: 'Clear the morning ticket queue' },
      { fr: 'Répondre à une réclamation sensible', en: 'Handle a sensitive complaint' },
      { fr: 'Mettre à jour la FAQ produit', en: 'Update the product FAQ' },
    ],
  },
  alex: {
    slug: 'alex',
    name: 'Alex',
    avatar: '/alex-avatar.png',
    role: { fr: 'Assistant Marketing', en: 'Marketing Assistant' },
    department: { fr: 'Marketing', en: 'Marketing' },
    description: {
      fr: "Alex produit du contenu, planifie les publications et suit les performances. Il décline vos campagnes sur chaque canal et propose des idées en continu.",
      en: 'Alex produces content, schedules posts and tracks performance. He adapts your campaigns across every channel and suggests new ideas continuously.',
    },
    skills: [
      { fr: 'Rédaction de contenu', en: 'Content writing' },
      { fr: 'Planification éditoriale', en: 'Editorial planning' },
      { fr: 'Suivi des performances', en: 'Performance tracking' },
      { fr: 'Déclinaison multicanal', en: 'Multichannel adaptation' },
    ],
    tools: ['Email', 'Réseaux sociaux', 'CMS', 'Analytics', 'Canva'],
    missions: [
      { fr: 'Planifier le calendrier éditorial du mois', en: 'Plan the monthly editorial calendar' },
      { fr: 'Rédiger une newsletter produit', en: 'Write a product newsletter' },
      { fr: 'Analyser les performances d\'une campagne', en: 'Analyze a campaign\'s performance' },
    ],
  },
}

export const DETAILED_SLUGS = Object.keys(ROLE_DETAILS)
