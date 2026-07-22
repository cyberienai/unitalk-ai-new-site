// Catalog of AI Collaborator roles, grouped by department.
// This is a catalog (like a directory of job descriptions), not a marketplace.

export type Bilingual = { fr: string; en: string }

// Collaborators with a dedicated campaign page (e.g. /emma).
// Others fall back to their public profile at /@slug.
const CAMPAIGN_SLUGS = new Set(['emma'])

export function collaboratorHref(slug: string): string {
  return CAMPAIGN_SLUGS.has(slug) ? `/${slug}` : `/@${slug}`
}

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
      { name: 'Emma', title: { fr: 'Executive Assistant', en: 'Executive Assistant' }, slug: 'emma' },
      { name: 'CEO Staff', title: { fr: 'Bras droit du dirigeant', en: 'CEO Staff' } },
      { name: 'Chief of Staff', title: { fr: 'Chief of Staff', en: 'Chief of Staff' } },
    ],
  },
  {
    key: 'marketing',
    label: { fr: 'Marketing', en: 'Marketing' },
    roles: [
      { name: 'Léa', title: { fr: 'Content Strategist', en: 'Content Strategist' }, slug: 'lea' },
      { name: 'Social Media Manager', title: { fr: 'Réseaux sociaux', en: 'Social Media Manager' } },
      { name: 'SEO Specialist', title: { fr: 'Référencement naturel', en: 'SEO Specialist' } },
      { name: 'Ads Specialist', title: { fr: 'Publicité en ligne', en: 'Ads Specialist' } },
    ],
  },
  {
    key: 'sales',
    label: { fr: 'Ventes', en: 'Sales' },
    roles: [
      { name: 'Hugo', title: { fr: 'Commercial', en: 'Sales Rep' }, slug: 'hugo' },
      { name: 'SDR', title: { fr: 'Prospection', en: 'Sales Development Rep' } },
      { name: 'Account Executive', title: { fr: 'Closing', en: 'Account Executive' } },
      { name: 'Customer Success', title: { fr: 'Fidélisation', en: 'Customer Success' } },
    ],
  },
  {
    key: 'support',
    label: { fr: 'Relation client', en: 'Customer Relations' },
    roles: [
      { name: 'Inès', title: { fr: 'Support Client', en: 'Customer Support' }, slug: 'ines' },
      { name: 'Helpdesk', title: { fr: 'Assistance niveau 1', en: 'Helpdesk' } },
      { name: 'Technical Support', title: { fr: 'Support technique', en: 'Technical Support' } },
    ],
  },
  {
    key: 'developpement',
    label: { fr: 'Développement', en: 'Engineering' },
    roles: [
      { name: 'Arthur', title: { fr: 'Développeur', en: 'Developer' }, slug: 'arthur' },
      { name: 'DevOps', title: { fr: 'Infrastructure', en: 'DevOps' } },
      { name: 'Data Analyst', title: { fr: 'Analyse de données', en: 'Data Analyst' } },
    ],
  },
  {
    key: 'finance',
    label: { fr: 'Finance', en: 'Finance' },
    roles: [
      { name: 'Nadia', title: { fr: 'Analyste Financière', en: 'Financial Analyst' }, slug: 'nadia' },
      { name: 'Comptabilité', title: { fr: 'Comptabilité', en: 'Accounting' } },
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
]

export type RoleDetail = {
  slug: string
  name: string
  avatar: string
  role: Bilingual
  roleInline?: boolean // true => le nom du responsable se colle au rôle ("Assistante de <nom>")
  department: Bilingual
  description: Bilingual
  skills: Bilingual[]
  tools: string[]
  missions: Bilingual[]
  manager: { name: string; role: Bilingual } // responsable au sein de l'entreprise (binôme humain)
  managerEmail?: string // email de contact du responsable
  managerHandle?: string // handle public du responsable (ex. patrickchassany)
  company: string // entreprise d'appartenance
  dataOwner?: string // propriétaire des données
}

// Membre humain de l'équipe, en binôme avec un Collaborateur IA
export type Human = {
  handle: string
  name: string
  role: Bilingual
  department: Bilingual
  avatar: string
  bio: Bilingual
  email?: string
  pairSlug: string // slug du Collaborateur IA rattaché
}

export const TEAM_HUMANS: Record<string, Human> = {
  patrickchassany: {
    handle: 'patrickchassany',
    name: 'Patrick Chassany',
    role: { fr: 'Fondateur', en: 'Founder' },
    department: { fr: 'Direction', en: 'Leadership' },
    avatar: '/images/patrick-avatar.png',
    email: 'founder@unitalk.ai',
    pairSlug: 'emma',
    bio: {
      fr: "Patrick a fondé Unitalk pour prouver qu'une entreprise peut grandir en associant humains et Collaborateurs IA. Il travaille au quotidien avec Emma, sa partenaire IA.",
      en: 'Patrick founded Unitalk to prove a company can grow by pairing humans with AI Collaborators. He works daily with Emma, his AI partner.',
    },
  },
  sophiemoreau: {
    handle: 'sophiemoreau',
    name: 'Sophie Moreau',
    role: { fr: 'Directrice Marketing', en: 'Marketing Director' },
    department: { fr: 'Marketing', en: 'Marketing' },
    avatar: '/images/sophie-avatar.png',
    email: 'sophie@unitalk.ai',
    pairSlug: 'lea',
    bio: {
      fr: "Sophie pilote la marque et l'acquisition d'Unitalk. Elle construit la stratégie de contenu avec Léa, sa partenaire IA.",
      en: "Sophie leads Unitalk's brand and acquisition. She builds the content strategy with Léa, her AI partner.",
    },
  },
  antoinelefebvre: {
    handle: 'antoinelefebvre',
    name: 'Antoine Lefebvre',
    role: { fr: 'Directeur Technique', en: 'CTO' },
    department: { fr: 'Développement', en: 'Engineering' },
    avatar: '/images/antoine-avatar.png',
    email: 'antoine@unitalk.ai',
    pairSlug: 'arthur',
    bio: {
      fr: "Antoine dirige l'ingénierie d'Unitalk et conçoit la plateforme Hermès. Il développe main dans la main avec Arthur, son partenaire IA.",
      en: 'Antoine leads Unitalk engineering and designs the Hermès platform. He builds hand in hand with Arthur, his AI partner.',
    },
  },
  clairedubois: {
    handle: 'clairedubois',
    name: 'Claire Dubois',
    role: { fr: 'Directrice Commerciale', en: 'Sales Director' },
    department: { fr: 'Ventes', en: 'Sales' },
    avatar: '/images/claire-avatar.png',
    email: 'claire@unitalk.ai',
    pairSlug: 'hugo',
    bio: {
      fr: "Claire développe le portefeuille clients d'Unitalk et structure la démarche commerciale. Elle avance en binôme avec Hugo, son partenaire IA.",
      en: "Claire grows Unitalk's client portfolio and shapes the sales motion. She moves in tandem with Hugo, her AI partner.",
    },
  },
  juliemartin: {
    handle: 'juliemartin',
    name: 'Julie Martin',
    role: { fr: 'Directrice Financière', en: 'Finance Director' },
    department: { fr: 'Finance', en: 'Finance' },
    avatar: '/images/julie-avatar.png',
    email: 'julie@unitalk.ai',
    pairSlug: 'nadia',
    bio: {
      fr: "Julie pilote la performance financière et la planification d’Unitalk. Elle analyse et anticipe chaque décision avec Nadia, sa partenaire IA.",
      en: "Julie leads Unitalk's financial performance and planning. She analyzes and anticipates every decision with Nadia, her AI partner.",
    },
  },
  marcdelacroix: {
    handle: 'marcdelacroix',
    name: 'Marc Delacroix',
    role: { fr: 'Responsable Support', en: 'Head of Support' },
    department: { fr: 'Relation client', en: 'Customer Relations' },
    avatar: '/images/marc-avatar.png',
    email: 'marc@unitalk.ai',
    pairSlug: 'ines',
    bio: {
      fr: "Marc veille à la satisfaction de chaque client d'Unitalk. Il assure une relation client sans couture avec Inès, sa partenaire IA.",
      en: "Marc watches over every Unitalk client's satisfaction. He delivers seamless customer care with Inès, his AI partner.",
    },
  },
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
    manager: { name: 'Patrick Chassany', role: { fr: 'Fondateur', en: 'Founder' } },
    managerEmail: 'founder@unitalk.ai',
    managerHandle: 'patrickchassany',
    company: 'Unitalk',
    dataOwner: 'Unitalk AI',
    role: { fr: 'Assistante de', en: 'Assistant to' },
    roleInline: true,
    department: { fr: 'Direction', en: 'Leadership' },
    description: {
      fr: "Emma gère l'agenda, les priorités et la logistique de la direction. Elle prépare les réunions, filtre les demandes et garde chaque dossier prêt au bon moment.",
      en: "Emma manages the leadership's calendar, priorities and logistics. She prepares meetings, filters requests and keeps every file ready at the right time.",
    },
    skills: [
      { fr: "Gestion d'agenda et priorisation", en: 'Calendar management and prioritization' },
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
  lea: {
    slug: 'lea',
    name: 'Léa',
    avatar: '/images/lea-avatar.png',
    manager: { name: 'Sophie Moreau', role: { fr: 'Directrice Marketing', en: 'Marketing Director' } },
    managerEmail: 'sophie@unitalk.ai',
    managerHandle: 'sophiemoreau',
    company: 'Unitalk',
    dataOwner: 'Unitalk AI',
    role: { fr: 'Content Strategist', en: 'Content Strategist' },
    department: { fr: 'Marketing', en: 'Marketing' },
    description: {
      fr: "Léa construit la stratégie de contenu, planifie le calendrier éditorial et décline vos messages sur chaque canal. Elle rédige, adapte et mesure l'impact en continu.",
      en: 'Léa builds the content strategy, plans the editorial calendar and adapts your messages across every channel. She writes, tailors and measures impact continuously.',
    },
    skills: [
      { fr: 'Stratégie de contenu', en: 'Content strategy' },
      { fr: 'Calendrier éditorial', en: 'Editorial calendar' },
      { fr: 'Rédaction et SEO', en: 'Writing and SEO' },
      { fr: 'Analyse de performance', en: 'Performance analysis' },
    ],
    tools: ['CMS', 'Réseaux sociaux', 'Analytics', 'Notion', 'Canva'],
    missions: [
      { fr: 'Définir la ligne éditoriale du trimestre', en: 'Define the quarterly editorial line' },
      { fr: 'Rédiger une série d’articles de blog', en: 'Write a series of blog posts' },
      { fr: "Analyser l'engagement des campagnes", en: 'Analyze campaign engagement' },
    ],
  },
  arthur: {
    slug: 'arthur',
    name: 'Arthur',
    avatar: '/images/arthur-avatar.png',
    manager: { name: 'Antoine Lefebvre', role: { fr: 'Directeur Technique', en: 'CTO' } },
    managerEmail: 'antoine@unitalk.ai',
    managerHandle: 'antoinelefebvre',
    company: 'Unitalk',
    dataOwner: 'Unitalk AI',
    role: { fr: 'Développeur', en: 'Developer' },
    department: { fr: 'Développement', en: 'Engineering' },
    description: {
      fr: "Arthur écrit du code, relit les contributions et corrige les bugs. Il documente, teste et livre des fonctionnalités aux côtés de l'équipe technique.",
      en: 'Arthur writes code, reviews contributions and fixes bugs. He documents, tests and ships features alongside the engineering team.',
    },
    skills: [
      { fr: 'Écriture de code', en: 'Code writing' },
      { fr: 'Revue de code', en: 'Code review' },
      { fr: 'Correction de bugs', en: 'Bug fixing' },
      { fr: 'Documentation technique', en: 'Technical documentation' },
    ],
    tools: ['GitHub', 'VS Code', 'Linear', 'Slack', 'CI/CD'],
    missions: [
      { fr: 'Implémenter une nouvelle fonctionnalité', en: 'Implement a new feature' },
      { fr: 'Corriger un lot de bugs prioritaires', en: 'Fix a batch of priority bugs' },
      { fr: 'Documenter une API', en: 'Document an API' },
    ],
  },
  hugo: {
    slug: 'hugo',
    name: 'Hugo',
    avatar: '/images/hugo-avatar.png',
    manager: { name: 'Claire Dubois', role: { fr: 'Directrice Commerciale', en: 'Sales Director' } },
    managerEmail: 'claire@unitalk.ai',
    managerHandle: 'clairedubois',
    company: 'Unitalk',
    dataOwner: 'Unitalk AI',
    role: { fr: 'Commercial', en: 'Sales Rep' },
    department: { fr: 'Ventes', en: 'Sales' },
    description: {
      fr: "Hugo prospecte, qualifie les leads et suit le pipeline. Il relance au bon moment, tient le CRM à jour et prépare chaque rendez-vous commercial.",
      en: 'Hugo prospects, qualifies leads and tracks the pipeline. He follows up at the right time, keeps the CRM up to date and preps every sales meeting.',
    },
    skills: [
      { fr: 'Prospection et qualification', en: 'Prospecting and qualification' },
      { fr: 'Suivi du pipeline', en: 'Pipeline tracking' },
      { fr: 'Relances automatiques', en: 'Automated follow-ups' },
      { fr: 'Préparation de rendez-vous', en: 'Meeting preparation' },
    ],
    tools: ['CRM', 'LinkedIn', 'Email', 'Téléphone', 'Calendrier'],
    missions: [
      { fr: 'Qualifier les nouveaux leads entrants', en: 'Qualify new inbound leads' },
      { fr: 'Relancer les opportunités dormantes', en: 'Re-engage dormant opportunities' },
      { fr: 'Préparer un rendez-vous de closing', en: 'Prepare a closing meeting' },
    ],
  },
  nadia: {
    slug: 'nadia',
    name: 'Nadia',
    avatar: '/images/nadia-avatar.png',
    manager: { name: 'Julie Martin', role: { fr: 'Directrice Financière', en: 'Finance Director' } },
    managerEmail: 'julie@unitalk.ai',
    managerHandle: 'juliemartin',
    company: 'Unitalk',
    dataOwner: 'Unitalk AI',
    role: { fr: 'Analyste Financière', en: 'Financial Analyst' },
    department: { fr: 'Finance', en: 'Finance' },
    description: {
      fr: "Nadia consolide les données financières, suit les indicateurs et prépare les prévisions. Elle transforme chaque chiffre en information utile pour décider.",
      en: 'Nadia consolidates financial data, tracks key metrics and prepares forecasts. She turns every number into useful insight for decision-making.',
    },
    skills: [
      { fr: 'Analyse financière', en: 'Financial analysis' },
      { fr: 'Prévisions et budgets', en: 'Forecasting and budgeting' },
      { fr: 'Suivi des indicateurs', en: 'KPI tracking' },
      { fr: 'Reporting de direction', en: 'Executive reporting' },
    ],
    tools: ['Tableur', 'ERP', 'Notion', 'Email', 'BI'],
    missions: [
      { fr: 'Préparer le reporting financier mensuel', en: 'Prepare the monthly financial report' },
      { fr: 'Mettre à jour les prévisions de trésorerie', en: 'Update cash flow forecasts' },
      { fr: 'Analyser les écarts budgétaires', en: 'Analyze budget variances' },
    ],
  },
  ines: {
    slug: 'ines',
    name: 'Inès',
    avatar: '/images/ines-avatar.png',
    manager: { name: 'Marc Delacroix', role: { fr: 'Responsable Support', en: 'Head of Support' } },
    managerEmail: 'marc@unitalk.ai',
    managerHandle: 'marcdelacroix',
    company: 'Unitalk',
    dataOwner: 'Unitalk AI',
    role: { fr: 'Support Client', en: 'Customer Support' },
    department: { fr: 'Relation client', en: 'Customer Relations' },
    description: {
      fr: "Inès répond aux clients en continu, résout les demandes courantes et escalade les cas complexes. Elle apprend de chaque échange pour s'améliorer.",
      en: 'Inès answers customers around the clock, resolves common requests and escalates complex cases. She learns from every exchange to improve.',
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
}

export const DETAILED_SLUGS = Object.keys(ROLE_DETAILS)

// Binômes humain ↔ Collaborateur IA, dans l'ordre d'affichage de l'équipe
export const TEAM_PAIRS: { humanHandle: string; aiSlug: string }[] = [
  { humanHandle: 'patrickchassany', aiSlug: 'emma' },
  { humanHandle: 'sophiemoreau', aiSlug: 'lea' },
  { humanHandle: 'antoinelefebvre', aiSlug: 'arthur' },
  { humanHandle: 'clairedubois', aiSlug: 'hugo' },
  { humanHandle: 'juliemartin', aiSlug: 'nadia' },
  { humanHandle: 'marcdelacroix', aiSlug: 'ines' },
]

export const HUMAN_HANDLES = Object.keys(TEAM_HUMANS)
