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
      { name: 'Nadia', title: { fr: 'Analyste Financière', en: 'Financial Analyst' }, slug: 'nadia' },
      { name: 'Comptabilité', title: { fr: 'Comptabilité', en: 'Accounting' } },
      { name: 'Contrôle de gestion', title: { fr: 'Contrôle de gestion', en: 'Management Control' } },
      { name: 'Facturation', title: { fr: 'Facturation', en: 'Billing' } },
    ],
  },
  {
    key: 'rh',
    label: { fr: 'Ressources Humaines', en: 'Human Resources' },
    roles: [
      { name: 'Hugo', title: { fr: 'Chargé RH & Recrutement', en: 'HR & Recruiting' }, slug: 'hugo' },
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
  manager: { name: string; role: Bilingual } // responsable au sein de l'entreprise
  managerEmail?: string // email de contact du responsable
  managerHandle?: string // handle public du responsable (ex. patrickchassany)
  company: string // entreprise d'appartenance
  dataOwner?: string // propriétaire des données
}

// Ce avec quoi chaque Collaborateur IA est livré (identique pour tous)
export const COLLABORATOR_INCLUDES: { title: Bilingual; body: Bilingual }[] = [
  {
    title: { fr: 'Un agent Hermès', en: 'A Hermès agent' },
    body: {
      fr: 'Le moteur qui raisonne, décide et agit pour lui.',
      en: 'The engine that reasons, decides and acts for it.',
    },
  },
  {
    title: { fr: 'Une mémoire collaborative', en: 'Collaborative memory' },
    body: {
      fr: 'Partagée avec votre équipe, elle s’enrichit à chaque mission.',
      en: 'Shared with your team, it grows with every mission.',
    },
  },
  {
    title: { fr: 'Ses propres outils et ressources', en: 'Its own tools and resources' },
    body: {
      fr: 'Les applications et accès dont il a besoin pour agir.',
      en: 'The apps and access it needs to act.',
    },
  },
  {
    title: { fr: 'Son hébergement', en: 'Its hosting' },
    body: {
      fr: 'Sur Unitalk AI Cloud ou l’un de ses partenaires.',
      en: 'On Unitalk AI Cloud or one of its partners.',
    },
  },
]

export const ROLE_DETAILS: Record<string, RoleDetail> = {
  emma: {
    slug: 'emma',
    name: 'Emma',
    avatar: '/images/emma-avatar.png',
    manager: { name: 'Patrick Chassany', role: { fr: 'Founder', en: 'Founder' } },
    managerEmail: 'founder@unitalk.ai',
    managerHandle: 'patrickchassany',
    company: 'Unitalk',
    dataOwner: 'Unitalk AI',
    role: { fr: 'Assistante de', en: 'Assistant to' },
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
    avatar: '/images/marcus-avatar.png',
    manager: { name: 'Sarah Benali', role: { fr: 'Directrice Commerciale', en: 'Head of Sales' } },
    company: 'Unitalk',
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
    avatar: '/images/sophia-avatar.png',
    manager: { name: 'Thomas Girard', role: { fr: 'Responsable Support', en: 'Head of Support' } },
    company: 'Unitalk',
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
    avatar: '/images/alex-avatar.png',
    manager: { name: 'Julien Roy', role: { fr: 'Responsable Marketing', en: 'Head of Marketing' } },
    company: 'Unitalk',
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
  nadia: {
    slug: 'nadia',
    name: 'Nadia',
    avatar: '/images/nadia-avatar.png',
    manager: { name: 'Claire Dubois', role: { fr: 'Directrice Financière', en: 'CFO' } },
    company: 'Unitalk',
    role: { fr: 'Analyste Financière', en: 'Financial Analyst' },
    department: { fr: 'Finance', en: 'Finance' },
    description: {
      fr: "Nadia suit la trésorerie, prépare les tableaux de bord financiers et anticipe les écarts. Elle consolide les chiffres, relance les impayés et prépare chaque décision budgétaire.",
      en: 'Nadia tracks cash flow, prepares financial dashboards and anticipates variances. She consolidates the numbers, chases unpaid invoices and preps every budget decision.',
    },
    skills: [
      { fr: 'Suivi de trésorerie', en: 'Cash flow monitoring' },
      { fr: 'Tableaux de bord et reporting', en: 'Dashboards and reporting' },
      { fr: 'Relance des impayés', en: 'Overdue payment follow-up' },
      { fr: 'Préparation budgétaire', en: 'Budget preparation' },
    ],
    tools: ['Excel', 'Pennylane', 'Stripe', 'Notion', 'Email'],
    missions: [
      { fr: 'Produire le reporting financier mensuel', en: 'Produce the monthly financial report' },
      { fr: 'Relancer les factures en retard', en: 'Chase overdue invoices' },
      { fr: 'Préparer un prévisionnel de trésorerie', en: 'Prepare a cash flow forecast' },
    ],
  },
  hugo: {
    slug: 'hugo',
    name: 'Hugo',
    avatar: '/images/hugo-avatar.png',
    manager: { name: 'Marie Fontaine', role: { fr: 'Responsable RH', en: 'Head of People' } },
    company: 'Unitalk',
    role: { fr: 'Chargé RH & Recrutement', en: 'HR & Recruiting' },
    department: { fr: 'Ressources Humaines', en: 'Human Resources' },
    description: {
      fr: "Hugo source les candidats, coordonne les entretiens et fluidifie l'intégration. Il répond aux questions des équipes et garde chaque process RH à jour.",
      en: 'Hugo sources candidates, coordinates interviews and smooths onboarding. He answers the teams\u2019 questions and keeps every HR process up to date.',
    },
    skills: [
      { fr: 'Sourcing de candidats', en: 'Candidate sourcing' },
      { fr: 'Coordination des entretiens', en: 'Interview coordination' },
      { fr: "Parcours d'intégration", en: 'Onboarding journeys' },
      { fr: 'Réponses aux questions RH', en: 'HR question handling' },
    ],
    tools: ['Email', 'LinkedIn', 'Notion', 'Slack', 'Calendrier'],
    missions: [
      { fr: "Lancer une campagne de recrutement", en: 'Launch a hiring campaign' },
      { fr: 'Planifier une série d\'entretiens', en: 'Schedule an interview loop' },
      { fr: "Préparer l'onboarding d'une recrue", en: 'Prepare a new hire onboarding' },
    ],
  },
}

export const DETAILED_SLUGS = Object.keys(ROLE_DETAILS)
