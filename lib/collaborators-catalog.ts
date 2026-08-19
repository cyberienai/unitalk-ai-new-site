// Catalog of AI Collaborator roles, grouped by department.
// This is a catalog (like a directory of job descriptions), not a marketplace.

export type Bilingual = { fr: string; en: string }

export function collaboratorHref(slug: string): string {
  return `/@${slug}`
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
      { name: 'Camille', title: { fr: 'Analyste stratégie et veille', en: 'Strategy and Intelligence Analyst' }, slug: 'camille' },
      { name: 'CEO Staff', title: { fr: 'Bras droit du dirigeant', en: 'CEO Staff' } },
      { name: 'Chief of Staff', title: { fr: 'Chief of Staff', en: 'Chief of Staff' } },
    ],
  },
  {
    key: 'marketing',
    label: { fr: 'Marketing', en: 'Marketing' },
    roles: [
      { name: 'Léa', title: { fr: 'Responsable éditoriale', en: 'Editorial Lead' }, slug: 'lea' },
      { name: 'Maya', title: { fr: 'Réseaux sociaux', en: 'Social Media Manager' }, slug: 'maya' },
      { name: 'Alex', title: { fr: 'Acquisition et SEO', en: 'Growth and SEO' }, slug: 'alex' },
      { name: 'Ads Specialist', title: { fr: 'Publicité en ligne', en: 'Ads Specialist' } },
    ],
  },
  {
    key: 'sales',
    label: { fr: 'Ventes', en: 'Sales' },
    roles: [
      { name: 'Hugo', title: { fr: 'Commercial', en: 'Sales Representative' }, slug: 'hugo' },
      { name: 'SDR', title: { fr: 'Prospection', en: 'Sales Development Rep' } },
      { name: 'Account Executive', title: { fr: 'Closing', en: 'Account Executive' } },
      { name: 'Amelia', title: { fr: 'Fidélisation', en: 'Customer Success' }, slug: 'amelia' },
    ],
  },
  {
    key: 'support',
    label: { fr: 'Relation client', en: 'Customer Relations' },
    roles: [
      { name: 'Inès', title: { fr: 'Support client', en: 'Customer Support' }, slug: 'ines' },
      { name: 'Helpdesk', title: { fr: 'Assistance niveau 1', en: 'Helpdesk' } },
      { name: 'Sarah', title: { fr: 'Support technique', en: 'Technical Support' }, slug: 'sarah' },
    ],
  },
  {
    key: 'developpement',
    label: { fr: 'Développement', en: 'Engineering' },
    roles: [
      { name: 'Arthur', title: { fr: 'Développeur', en: 'Developer' }, slug: 'arthur' },
      { name: 'Victor', title: { fr: 'Infrastructure', en: 'DevOps' }, slug: 'victor' },
      { name: 'Noah', title: { fr: 'Analyse de données', en: 'Data Analyst' }, slug: 'noah' },
    ],
  },
  {
    key: 'finance',
    label: { fr: 'Finance', en: 'Finance' },
    roles: [
      { name: 'Nadia', title: { fr: 'Analyste financière', en: 'Financial Analyst' }, slug: 'nadia' },
      { name: 'Comptabilité', title: { fr: 'Comptabilité', en: 'Accounting' } },
      { name: 'Otto', title: { fr: 'Facturation', en: 'Billing' }, slug: 'otto' },
    ],
  },
  {
    key: 'rh',
    label: { fr: 'Ressources Humaines', en: 'Human Resources' },
    roles: [
      { name: 'Chloé', title: { fr: 'Sourcing & entretiens', en: 'Recruiting' }, slug: 'chloe' },
      { name: 'Onboarding', title: { fr: 'Intégration', en: 'Onboarding' } },
      { name: 'Zoé', title: { fr: 'Vie des équipes et onboarding', en: 'People Ops and Onboarding' }, slug: 'zoe' },
    ],
  },
  {
    key: 'produit',
    label: { fr: 'Produit', en: 'Product' },
    roles: [
      { name: 'Iris', title: { fr: 'Roadmap, specs et qualité', en: 'Product and QA' }, slug: 'iris' },
      { name: 'User Research', title: { fr: 'Recherche utilisateur', en: 'User Research' } },
      { name: 'QA', title: { fr: 'Qualité', en: 'Quality Assurance' } },
    ],
  },
  {
    key: 'operations',
    label: { fr: 'Opérations', en: 'Operations' },
    roles: [
      { name: 'Lucas', title: { fr: 'Coordination', en: 'Ops Coordinator' }, slug: 'lucas' },
      { name: 'Gabriel', title: { fr: 'Analyste achats', en: 'Procurement Analyst' }, slug: 'gabriel' },
    ],
  },
  {
    key: 'juridique',
    label: { fr: 'Juridique', en: 'Legal' },
    roles: [
      { name: 'Marcus', title: { fr: 'Contrats et conformité', en: 'Contracts and Compliance' }, slug: 'marcus' },
      { name: 'Conformité', title: { fr: 'Conformité & RGPD', en: 'Compliance' } },
    ],
  },
]

export type RoleDetail = {
  slug: string
  name: string
  avatar: string
  role: Bilingual
  gender: 'female' | 'male'
  roleInline?: boolean // true => le nom du responsable se colle au rôle ("Assistante de <nom>")
  department: Bilingual
  description: Bilingual
  promise: Bilingual
  availability: 'available' | 'beta' | 'on-request'
  skills: Bilingual[]
  tools: string[]
  missions: Bilingual[]
  starterMission?: { mission: Bilingual; result: Bilingual }
  // Liste publique optionnelle « Ce que vous pouvez lui demander » : quand elle
  // est présente, elle remplace la section « Missions types » sur le profil.
  askList?: Bilingual[]
  // Capacité de participation aux visioconférences (optionnelle, ex. Emma).
  videoCall?: {
    title: Bilingual
    body: Bilingual
    identity: string // ex. "Emma · Collaboratrice IA · Unitalk"
    actions: Bilingual[]
    transparency: Bilingual[]
    cta: Bilingual
  }
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
      fr: "Antoine dirige l'ingénierie d'Unitalk et conçoit la plateforme Hermes. Il développe main dans la main avec Arthur, son partenaire IA.",
      en: 'Antoine leads Unitalk engineering and designs the Hermes platform. He builds hand in hand with Arthur, his AI partner.',
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
    title: { fr: 'Un agent Hermes', en: 'A Hermes agent' },
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
    role: { fr: 'Assistante de direction', en: 'Executive Assistant' },
    gender: 'female',
    department: { fr: 'Direction', en: 'Leadership' },
    description: {
      fr: "Emma gère l'agenda, les priorités et la logistique de la direction. Elle prépare les réunions, filtre les demandes et garde chaque dossier prêt au bon moment.",
      en: "Emma manages the leadership's calendar, priorities and logistics. She prepares meetings, filters requests and keeps every file ready at the right time.",
    },
    promise: { fr: 'Prépare vos réunions, organise vos priorités et suit chaque décision.', en: 'Prepares meetings, organizes priorities and tracks every decision.' },
    availability: 'available',
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
    starterMission: { mission: { fr: 'Préparer et suivre une réunion', en: 'Prepare and follow up a meeting' }, result: { fr: 'Ordre du jour et actions à valider', en: 'Agenda and actions ready for approval' } },
    askList: [
      { fr: 'préparer une réunion', en: 'prepare a meeting' },
      { fr: 'participer à une visioconférence', en: 'join a video call' },
      { fr: 'produire un compte rendu', en: 'produce meeting minutes' },
      { fr: 'synthétiser un dossier', en: 'summarize a file' },
      { fr: 'identifier les décisions et prochaines actions', en: 'identify decisions and next actions' },
      { fr: 'organiser un agenda', en: 'organize a calendar' },
      { fr: 'suivre les actions décidées', en: 'track the decided actions' },
      { fr: 'orienter une demande vers la bonne personne', en: 'route a request to the right person' },
    ],
    videoCall: {
      title: { fr: 'Participer à vos visioconférences', en: 'Join your video calls' },
      body: {
        fr: 'Emma peut rejoindre les réunions auxquelles elle est invitée, préparer l’ordre du jour, synthétiser les échanges, identifier les décisions et organiser le suivi des actions.',
        en: 'Emma can join the meetings she is invited to, prepare the agenda, summarize the discussion, identify decisions and organize the follow-up of actions.',
      },
      identity: 'Emma · Collaboratrice IA · Unitalk',
      actions: [
        { fr: 'Inviter Emma à une visioconférence', en: 'Invite Emma to a video call' },
        { fr: 'Planifier une réunion', en: 'Schedule a meeting' },
        { fr: 'Voir un exemple de compte rendu', en: 'See a sample of minutes' },
      ],
      transparency: [
        { fr: 'Emma est toujours identifiée comme une Collaboratrice IA.', en: 'Emma is always identified as an AI Collaborator.' },
        { fr: 'L’organisateur autorise sa participation.', en: 'The organizer authorizes her participation.' },
        { fr: 'Toute transcription ou tout enregistrement est signalé aux participants.', en: 'Any transcription or recording is disclosed to participants.' },
        { fr: 'Elle utilise uniquement les documents et informations autorisés.', en: 'She only uses authorized documents and information.' },
        { fr: 'Elle ne prend aucune décision engageante sans validation humaine.', en: 'She makes no binding decision without human validation.' },
        { fr: 'Les échanges et comptes rendus restent dans le Workspace privé.', en: 'Exchanges and minutes stay in the private Workspace.' },
      ],
      cta: { fr: 'Inviter Emma à votre prochaine visioconférence', en: 'Invite Emma to your next video call' },
    },
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
    role: { fr: 'Responsable éditoriale', en: 'Editorial Lead' },
    gender: 'female',
    department: { fr: 'Marketing', en: 'Marketing' },
    description: {
      fr: "Léa construit la stratégie de contenu, planifie le calendrier éditorial et décline vos messages sur chaque canal. Elle rédige, adapte et mesure l'impact en continu.",
      en: 'Léa builds the content strategy, plans the editorial calendar and adapts your messages across every channel. She writes, tailors and measures impact continuously.',
    },
    promise: { fr: 'Transforme votre stratégie en contenus prêts à publier et à mesurer.', en: 'Turns your strategy into content ready to publish and measure.' },
    availability: 'available',
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
    starterMission: { mission: { fr: 'Construire un calendrier éditorial', en: 'Build an editorial calendar' }, result: { fr: 'Sujets, briefs et planning à valider', en: 'Topics, briefs and schedule ready for approval' } },
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
    gender: 'male',
    department: { fr: 'Développement', en: 'Engineering' },
    description: {
      fr: "Arthur écrit du code, relit les contributions et corrige les bugs. Il documente, teste et livre des fonctionnalités aux côtés de l'équipe technique.",
      en: 'Arthur writes code, reviews contributions and fixes bugs. He documents, tests and ships features alongside the engineering team.',
    },
    promise: { fr: 'Prépare le code, les tests et la documentation avant validation.', en: 'Prepares code, tests and documentation before approval.' },
    availability: 'available',
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
    starterMission: { mission: { fr: 'Corriger un bug prioritaire', en: 'Fix a priority bug' }, result: { fr: 'Correctif, tests et documentation prêts', en: 'Fix, tests and documentation ready' } },
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
    role: { fr: 'Commercial', en: 'Sales Representative' },
    gender: 'male',
    department: { fr: 'Ventes', en: 'Sales' },
    description: {
      fr: "Hugo prospecte, qualifie les leads et suit le pipeline. Il relance au bon moment, tient le CRM à jour et prépare chaque rendez-vous commercial.",
      en: 'Hugo prospects, qualifies leads and tracks the pipeline. He follows up at the right time, keeps the CRM up to date and preps every sales meeting.',
    },
    promise: { fr: 'Qualifie vos prospects, tient le CRM à jour et prépare les relances.', en: 'Qualifies prospects, updates the CRM and prepares follow-ups.' },
    availability: 'available',
    skills: [
      { fr: 'Prospection et qualification', en: 'Prospecting and qualification' },
      { fr: 'Suivi du pipeline', en: 'Pipeline tracking' },
      { fr: 'Préparation et planification des relances', en: 'Follow-up preparation and scheduling' },
      { fr: 'Préparation de rendez-vous', en: 'Meeting preparation' },
    ],
    tools: ['CRM', 'LinkedIn', 'Email', 'Téléphone', 'Calendrier'],
    missions: [
      { fr: 'Qualifier les nouveaux leads entrants', en: 'Qualify new inbound leads' },
      { fr: 'Relancer les opportunités dormantes', en: 'Re-engage dormant opportunities' },
      { fr: 'Préparer un rendez-vous de closing', en: 'Prepare a closing meeting' },
    ],
    starterMission: { mission: { fr: 'Qualifier de nouveaux prospects', en: 'Qualify new prospects' }, result: { fr: 'Fiches CRM et relances préparées', en: 'CRM records and follow-ups prepared' } },
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
    role: { fr: 'Analyste financière', en: 'Financial Analyst' },
    gender: 'female',
    department: { fr: 'Finance', en: 'Finance' },
    description: {
      fr: "Nadia consolide les données financières, suit les indicateurs et prépare les prévisions. Elle transforme chaque chiffre en information utile pour décider.",
      en: 'Nadia consolidates financial data, tracks key metrics and prepares forecasts. She turns every number into useful insight for decision-making.',
    },
    promise: { fr: 'Fiabilise vos chiffres, vos prévisions et vos décisions financières.', en: 'Strengthens your numbers, forecasts and financial decisions.' },
    availability: 'available',
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
    starterMission: { mission: { fr: 'Relancer les factures impayées', en: 'Follow up overdue invoices' }, result: { fr: 'Relances préparées et litiges isolés', en: 'Follow-ups prepared and disputes isolated' } },
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
    role: { fr: 'Support client', en: 'Customer Support' },
    gender: 'female',
    department: { fr: 'Relation client', en: 'Customer Relations' },
    description: {
      fr: "Inès répond aux clients en continu, résout les demandes courantes et escalade les cas complexes. Elle apprend de chaque échange pour s'améliorer.",
      en: 'Inès answers customers around the clock, resolves common requests and escalates complex cases. She learns from every exchange to improve.',
    },
    promise: { fr: 'Répond aux clients, résout les demandes et escalade les cas sensibles.', en: 'Answers customers, resolves requests and escalates sensitive cases.' },
    availability: 'available',
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
    starterMission: { mission: { fr: 'Traiter les demandes clients', en: 'Handle customer requests' }, result: { fr: 'Réponses préparées et cas sensibles isolés', en: 'Replies prepared and sensitive cases isolated' } },
  },
  chloe: {
    slug: 'chloe', name: 'Chloé', avatar: '/images/chloe-avatar.png',
    manager: { name: 'Votre responsable RH', role: { fr: 'Responsable RH', en: 'HR Manager' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'Chargée de recrutement', en: 'Recruiter' }, gender: 'female', department: { fr: 'Ressources humaines', en: 'Human Resources' },
    description: { fr: 'Chloé rédige les offres, source et présélectionne les candidatures, prépare les entretiens et organise chaque onboarding sous contrôle de votre équipe.', en: 'Chloé writes job posts, sources and screens applicants, prepares interviews and organizes onboarding under your team’s control.' },
    promise: { fr: 'Transforme vos besoins de recrutement en candidatures qualifiées.', en: 'Turns hiring needs into qualified applicants.' }, availability: 'beta',
    skills: [{ fr: 'Rédaction d’offres', en: 'Job post writing' }, { fr: 'Sourcing de candidats', en: 'Candidate sourcing' }, { fr: 'Présélection', en: 'Screening' }, { fr: 'Préparation d’entretiens', en: 'Interview preparation' }],
    tools: ['ATS', 'LinkedIn', 'Email', 'Calendrier', 'Notion'],
    missions: [{ fr: 'Préparer une campagne de recrutement', en: 'Prepare a recruiting campaign' }, { fr: 'Présélectionner les candidatures', en: 'Screen applicants' }, { fr: 'Organiser un onboarding', en: 'Organize onboarding' }],
    starterMission: { mission: { fr: 'Présélectionner des candidatures', en: 'Screen job applications' }, result: { fr: 'Candidatures qualifiées et entretiens préparés', en: 'Qualified applicants and interviews prepared' } },
  },
  lucas: {
    slug: 'lucas', name: 'Lucas', avatar: '/images/lucas-avatar.png',
    manager: { name: 'Votre responsable des opérations', role: { fr: 'Responsable des opérations', en: 'Head of Operations' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'Coordinateur des opérations', en: 'Operations Coordinator' }, gender: 'male', department: { fr: 'Opérations', en: 'Operations' },
    description: { fr: 'Lucas coordonne les projets, suit les échéances, prépare les comptes rendus et relance les responsables pour que chaque action avance.', en: 'Lucas coordinates projects, tracks deadlines, prepares reports and follows up with owners so every action moves forward.' },
    promise: { fr: 'Garde vos projets, échéances et responsables parfaitement alignés.', en: 'Keeps projects, deadlines and owners perfectly aligned.' }, availability: 'available',
    skills: [{ fr: 'Coordination de projet', en: 'Project coordination' }, { fr: 'Suivi des échéances', en: 'Deadline tracking' }, { fr: 'Comptes rendus', en: 'Progress reports' }, { fr: 'Gestion des risques', en: 'Risk management' }],
    tools: ['Notion', 'Asana', 'Trello', 'Slack', 'Calendrier'],
    missions: [{ fr: 'Mettre à jour un plan de projet', en: 'Update a project plan' }, { fr: 'Préparer le comité de suivi', en: 'Prepare the steering meeting' }, { fr: 'Relancer les actions en retard', en: 'Follow up on overdue actions' }],
    starterMission: { mission: { fr: 'Suivre un projet transverse', en: 'Track a cross-functional project' }, result: { fr: 'Échéances, responsables et risques à jour', en: 'Deadlines, owners and risks up to date' } },
  },
  camille: {
    slug: 'camille', name: 'Camille', avatar: '/nina-avatar.png',
    manager: { name: 'Votre direction', role: { fr: 'Direction générale', en: 'Executive Leadership' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'Analyste stratégie et veille', en: 'Strategy and Intelligence Analyst' }, gender: 'female', department: { fr: 'Direction', en: 'Leadership' },
    description: { fr: 'Camille surveille les marchés et les concurrents, détecte les tendances et signaux faibles, puis consolide les informations utiles aux décisions de la direction.', en: 'Camille monitors markets and competitors, detects trends and weak signals, then consolidates the information leadership needs to make decisions.' },
    promise: { fr: 'Transforme les signaux du marché en scénarios et décisions mieux préparés.', en: 'Turns market signals into scenarios and better-prepared decisions.' }, availability: 'on-request',
    skills: [{ fr: 'Veille marché et concurrentielle', en: 'Market and competitive intelligence' }, { fr: 'Détection des tendances et signaux faibles', en: 'Trend and weak-signal detection' }, { fr: 'Benchmarks stratégiques', en: 'Strategic benchmarking' }, { fr: 'Scénarios et notes de décision', en: 'Scenarios and decision briefs' }],
    tools: ['Web', 'Bases de données', 'Notion', 'Tableur', 'BI'],
    missions: [{ fr: 'Surveiller un marché et ses concurrents', en: 'Monitor a market and its competitors' }, { fr: 'Produire un benchmark et une note de veille', en: 'Produce a benchmark and intelligence brief' }, { fr: 'Préparer une revue stratégique et ses scénarios', en: 'Prepare a strategic review and its scenarios' }],
    starterMission: { mission: { fr: 'Préparer une note de veille stratégique', en: 'Prepare a strategic intelligence brief' }, result: { fr: 'Signaux, sources et conséquences à valider', en: 'Signals, sources and implications ready for review' } },
  },
  sophia: {
    slug: 'sophia', name: 'Sophia', avatar: '/images/sophia-avatar.png',
    manager: { name: 'Votre responsable administratif', role: { fr: 'Responsable administratif', en: 'Administration Manager' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'Gestionnaire administrative', en: 'Administrative Coordinator' }, gender: 'female', department: { fr: 'Administration', en: 'Administration' },
    description: { fr: 'Sophia classe les demandes, prépare les dossiers, contrôle les pièces et tient les échéances administratives à jour.', en: 'Sophia sorts requests, prepares files, checks documents and keeps administrative deadlines up to date.' },
    promise: { fr: 'Prépare des dossiers complets et maintient vos échéances administratives.', en: 'Prepares complete files and maintains administrative deadlines.' }, availability: 'available',
    skills: [{ fr: 'Gestion documentaire', en: 'Document management' }, { fr: 'Contrôle de pièces', en: 'Document checks' }, { fr: 'Suivi administratif', en: 'Administrative tracking' }, { fr: 'Rédaction de courriers', en: 'Business correspondence' }],
    tools: ['Email', 'Drive', 'Microsoft 365', 'Notion', 'ERP'],
    missions: [{ fr: 'Préparer un dossier administratif', en: 'Prepare an administrative file' }, { fr: 'Contrôler les pièces manquantes', en: 'Check missing documents' }, { fr: 'Suivre les échéances', en: 'Track deadlines' }],
  },
  otto: {
    slug: 'otto', name: 'Otto', avatar: '/images/otto-avatar.png',
    manager: { name: 'Votre responsable comptable', role: { fr: 'Responsable comptable', en: 'Accounting Manager' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'Gestionnaire facturation', en: 'Billing Coordinator' }, gender: 'male', department: { fr: 'Finance', en: 'Finance' },
    description: { fr: 'Otto collecte les justificatifs, prépare les factures, rapproche les paiements et organise les relances avant validation comptable.', en: 'Otto collects receipts, prepares invoices, reconciles payments and organizes reminders before accounting approval.' },
    promise: { fr: 'Prépare vos factures et relances sans perdre un justificatif.', en: 'Prepares invoices and reminders without losing a receipt.' }, availability: 'beta',
    skills: [{ fr: 'Préparation de factures', en: 'Invoice preparation' }, { fr: 'Collecte de justificatifs', en: 'Receipt collection' }, { fr: 'Rapprochement des paiements', en: 'Payment reconciliation' }, { fr: 'Relances clients', en: 'Customer reminders' }],
    tools: ['Pennylane', 'Qonto', 'ERP', 'Email', 'Tableur'],
    missions: [{ fr: 'Préparer la facturation mensuelle', en: 'Prepare monthly billing' }, { fr: 'Collecter les justificatifs manquants', en: 'Collect missing receipts' }, { fr: 'Préparer les relances', en: 'Prepare payment reminders' }],
  },
  alex: {
    slug: 'alex', name: 'Alex', avatar: '/images/alex-avatar.png',
    manager: { name: 'Votre responsable acquisition', role: { fr: 'Responsable acquisition', en: 'Head of Growth' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'Responsable acquisition et SEO', en: 'Growth and SEO Manager' }, gender: 'male', department: { fr: 'Marketing', en: 'Marketing' },
    description: { fr: 'Alex analyse la demande, construit les plans SEO et publicitaires, prépare les campagnes et mesure les conversions.', en: 'Alex analyzes demand, builds SEO and paid plans, prepares campaigns and measures conversions.' },
    promise: { fr: 'Transforme vos objectifs de croissance en campagnes mesurables.', en: 'Turns growth goals into measurable campaigns.' }, availability: 'beta',
    skills: [{ fr: 'Audit SEO', en: 'SEO audit' }, { fr: 'Recherche de mots-clés', en: 'Keyword research' }, { fr: 'Campagnes publicitaires', en: 'Paid campaigns' }, { fr: 'Analyse de conversion', en: 'Conversion analysis' }],
    tools: ['Search Console', 'Analytics', 'Google Ads', 'CRM', 'Tableur'],
    missions: [{ fr: 'Préparer un plan d’acquisition', en: 'Prepare an acquisition plan' }, { fr: 'Auditer le référencement', en: 'Audit search visibility' }, { fr: 'Analyser une campagne', en: 'Analyze a campaign' }],
  },
  iris: {
    slug: 'iris', name: 'Iris', avatar: '/images/iris-avatar.png',
    manager: { name: 'Votre responsable produit', role: { fr: 'Responsable produit', en: 'Head of Product' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'Responsable produit', en: 'Product Manager' }, gender: 'female', department: { fr: 'Produit', en: 'Product' },
    description: { fr: 'Iris transforme les retours utilisateurs en spécifications, priorise la roadmap et prépare les plans de recette avant livraison.', en: 'Iris turns user feedback into specifications, prioritizes the roadmap and prepares test plans before release.' },
    promise: { fr: 'Relie les besoins utilisateurs, la roadmap et la qualité des livraisons.', en: 'Connects user needs, roadmap and release quality.' }, availability: 'beta',
    skills: [{ fr: 'Analyse des retours utilisateurs', en: 'User feedback analysis' }, { fr: 'Rédaction de spécifications', en: 'Specification writing' }, { fr: 'Priorisation produit', en: 'Product prioritization' }, { fr: 'Plans de recette', en: 'Test planning' }],
    tools: ['Linear', 'Jira', 'Figma', 'Notion', 'Analytics'],
    missions: [{ fr: 'Préparer une spécification produit', en: 'Prepare a product specification' }, { fr: 'Prioriser un backlog', en: 'Prioritize a backlog' }, { fr: 'Construire un plan de recette', en: 'Build a test plan' }],
    starterMission: { mission: { fr: 'Préparer une spécification produit', en: 'Prepare a product specification' }, result: { fr: 'Besoin, critères et recette structurés', en: 'Need, criteria and test plan structured' } },
  },
  marcus: {
    slug: 'marcus', name: 'Marcus', avatar: '/images/marcus-avatar.png',
    manager: { name: 'Votre responsable juridique', role: { fr: 'Responsable juridique', en: 'Legal Manager' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'Assistant juridique', en: 'Legal Assistant' }, gender: 'male', department: { fr: 'Juridique', en: 'Legal' },
    description: { fr: 'Marcus inventorie les contrats, repère les échéances, prépare les revues de clauses et documente la conformité RGPD pour validation juridique.', en: 'Marcus inventories contracts, identifies deadlines, prepares clause reviews and documents GDPR compliance for legal approval.' },
    promise: { fr: 'Rend vos contrats, échéances et preuves de conformité pilotables.', en: 'Makes contracts, deadlines and compliance evidence manageable.' }, availability: 'on-request',
    skills: [{ fr: 'Inventaire contractuel', en: 'Contract inventory' }, { fr: 'Repérage de clauses', en: 'Clause identification' }, { fr: 'Suivi des échéances', en: 'Deadline tracking' }, { fr: 'Documentation RGPD', en: 'GDPR documentation' }],
    tools: ['Drive', 'Microsoft 365', 'Notion', 'Docusign', 'Registre RGPD'],
    missions: [{ fr: 'Cartographier les contrats actifs', en: 'Map active contracts' }, { fr: 'Préparer une revue de clauses', en: 'Prepare a clause review' }, { fr: 'Mettre à jour le registre RGPD', en: 'Update the GDPR register' }],
    starterMission: { mission: { fr: 'Préparer une revue de contrat', en: 'Prepare a contract review' }, result: { fr: 'Clauses, échéances et points à valider', en: 'Clauses, deadlines and review points ready' } },
  },
  amelia: {
    slug: 'amelia', name: 'Amelia', avatar: '/assistant-avatar.png',
    manager: { name: 'Votre responsable Customer Success', role: { fr: 'Responsable Customer Success', en: 'Head of Customer Success' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'Customer Success Manager', en: 'Customer Success Manager' }, gender: 'female', department: { fr: 'Relation client', en: 'Customer Relations' },
    description: { fr: 'Amelia suit l’adoption, détecte les comptes à risque, prépare les bilans clients et coordonne les plans d’action de fidélisation.', en: 'Amelia tracks adoption, detects at-risk accounts, prepares customer reviews and coordinates retention action plans.' },
    promise: { fr: 'Détecte les risques plus tôt et prépare chaque action de fidélisation.', en: 'Detects risks earlier and prepares every retention action.' }, availability: 'on-request',
    skills: [{ fr: 'Suivi de l’adoption', en: 'Adoption tracking' }, { fr: 'Détection des risques', en: 'Risk detection' }, { fr: 'Bilans clients', en: 'Customer reviews' }, { fr: 'Plans de fidélisation', en: 'Retention plans' }],
    tools: ['CRM', 'Helpdesk', 'Analytics', 'Email', 'Calendrier'],
    missions: [{ fr: 'Préparer une revue de compte', en: 'Prepare an account review' }, { fr: 'Identifier les comptes à risque', en: 'Identify at-risk accounts' }, { fr: 'Construire un plan d’adoption', en: 'Build an adoption plan' }],
  },
  maya: {
    slug: 'maya', name: 'Maya', avatar: '/nina-avatar.png',
    manager: { name: 'Votre responsable social media', role: { fr: 'Responsable social media', en: 'Head of Social Media' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'Social Media Manager', en: 'Social Media Manager' }, gender: 'female', department: { fr: 'Marketing', en: 'Marketing' },
    description: { fr: 'Maya adapte vos messages à chaque réseau, prépare le calendrier, programme les publications et qualifie les conversations qui nécessitent une réponse humaine.', en: 'Maya adapts messages to each network, prepares the calendar, schedules posts and flags conversations that require a human response.' },
    promise: { fr: 'Anime vos réseaux avec un calendrier cohérent et des réponses maîtrisées.', en: 'Runs your social channels with a consistent calendar and controlled replies.' }, availability: 'beta',
    skills: [{ fr: 'Stratégie social media', en: 'Social media strategy' }, { fr: 'Calendrier de publication', en: 'Publishing calendar' }, { fr: 'Adaptation multicanale', en: 'Cross-channel adaptation' }, { fr: 'Modération et veille', en: 'Moderation and monitoring' }],
    tools: ['LinkedIn', 'Instagram', 'Facebook', 'Canva', 'Buffer'],
    missions: [{ fr: 'Préparer un mois de publications', en: 'Prepare a month of posts' }, { fr: 'Adapter une campagne à chaque réseau', en: 'Adapt a campaign to each network' }, { fr: 'Trier les commentaires à traiter', en: 'Sort comments requiring attention' }],
  },
  noah: {
    slug: 'noah', name: 'Noah', avatar: '/thomas-avatar.png',
    manager: { name: 'Votre responsable data', role: { fr: 'Responsable data', en: 'Head of Data' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'Data Analyst', en: 'Data Analyst' }, gender: 'male', department: { fr: 'Données', en: 'Data' },
    description: { fr: 'Noah consolide les sources autorisées, contrôle la qualité des données, produit les tableaux de bord et explique les variations importantes.', en: 'Noah consolidates authorized sources, checks data quality, produces dashboards and explains significant changes.' },
    promise: { fr: 'Transforme vos données dispersées en indicateurs fiables et compréhensibles.', en: 'Turns scattered data into reliable, understandable metrics.' }, availability: 'beta',
    skills: [{ fr: 'Préparation de données', en: 'Data preparation' }, { fr: 'Contrôle qualité', en: 'Quality control' }, { fr: 'Tableaux de bord', en: 'Dashboards' }, { fr: 'Analyse des tendances', en: 'Trend analysis' }],
    tools: ['SQL', 'Excel', 'Google Sheets', 'Power BI', 'Looker Studio'],
    missions: [{ fr: 'Construire un tableau de bord', en: 'Build a dashboard' }, { fr: 'Expliquer une variation de KPI', en: 'Explain a KPI change' }, { fr: 'Contrôler la qualité d’un export', en: 'Check the quality of an export' }],
  },
  victor: {
    slug: 'victor', name: 'Victor', avatar: '/automation-avatar.png',
    manager: { name: 'Votre responsable infrastructure', role: { fr: 'Responsable infrastructure', en: 'Head of Infrastructure' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'Ingénieur DevOps', en: 'DevOps Engineer' }, gender: 'male', department: { fr: 'Développement', en: 'Engineering' },
    description: { fr: 'Victor surveille les environnements, prépare les déploiements, analyse les incidents et propose les changements d’infrastructure avant validation.', en: 'Victor monitors environments, prepares deployments, analyzes incidents and proposes infrastructure changes before approval.' },
    promise: { fr: 'Prépare des déploiements fiables et rend les incidents plus rapides à résoudre.', en: 'Prepares reliable deployments and makes incidents faster to resolve.' }, availability: 'on-request',
    skills: [{ fr: 'Pipelines CI/CD', en: 'CI/CD pipelines' }, { fr: 'Supervision', en: 'Monitoring' }, { fr: 'Analyse d’incidents', en: 'Incident analysis' }, { fr: 'Infrastructure as Code', en: 'Infrastructure as Code' }],
    tools: ['GitHub Actions', 'Docker', 'Kubernetes', 'Terraform', 'Grafana'],
    missions: [{ fr: 'Préparer un déploiement', en: 'Prepare a deployment' }, { fr: 'Analyser un incident de production', en: 'Analyze a production incident' }, { fr: 'Vérifier une configuration Terraform', en: 'Review a Terraform configuration' }],
  },
  sarah: {
    slug: 'sarah', name: 'Sarah', avatar: '/sofia-avatar.png',
    manager: { name: 'Votre responsable support technique', role: { fr: 'Responsable support technique', en: 'Head of Technical Support' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'Support technique', en: 'Technical Support Specialist' }, gender: 'female', department: { fr: 'Relation client', en: 'Customer Relations' },
    description: { fr: 'Sarah reproduit les incidents, rassemble les journaux utiles, prépare les diagnostics et transmet aux équipes techniques un dossier exploitable.', en: 'Sarah reproduces incidents, gathers useful logs, prepares diagnostics and hands engineering an actionable case.' },
    promise: { fr: 'Transforme chaque incident client en diagnostic clair et actionnable.', en: 'Turns every customer incident into a clear, actionable diagnosis.' }, availability: 'beta',
    skills: [{ fr: 'Qualification d’incidents', en: 'Incident qualification' }, { fr: 'Reproduction de bugs', en: 'Bug reproduction' }, { fr: 'Collecte de journaux', en: 'Log collection' }, { fr: 'Escalade technique', en: 'Technical escalation' }],
    tools: ['Zendesk', 'Jira', 'Sentry', 'Postman', 'Base de connaissances'],
    missions: [{ fr: 'Qualifier un incident client', en: 'Qualify a customer incident' }, { fr: 'Reproduire un bug signalé', en: 'Reproduce a reported bug' }, { fr: 'Préparer une escalade technique', en: 'Prepare a technical escalation' }],
  },
  gabriel: {
    slug: 'gabriel', name: 'Gabriel', avatar: '/marcus-avatar.png',
    manager: { name: 'Votre responsable achats', role: { fr: 'Responsable achats', en: 'Head of Procurement' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'Analyste achats', en: 'Procurement Analyst' }, gender: 'male', department: { fr: 'Opérations', en: 'Operations' },
    description: { fr: 'Gabriel recherche et qualifie les fournisseurs, compare les offres, prépare les appels d’offres et suit les contrats, dépenses et risques fournisseurs.', en: 'Gabriel researches and qualifies suppliers, compares offers, prepares tenders, and tracks supplier contracts, spending and risks.' },
    promise: { fr: 'Fiabilise vos choix fournisseurs, vos contrats et le pilotage de vos dépenses.', en: 'Strengthens supplier selection, contracts and spend management.' }, availability: 'on-request',
    skills: [{ fr: 'Recherche et qualification de fournisseurs', en: 'Supplier research and qualification' }, { fr: 'Comparaison des offres et conditions', en: 'Offer and terms comparison' }, { fr: 'Préparation d’appels d’offres', en: 'Tender preparation' }, { fr: 'Analyse des dépenses et risques fournisseurs', en: 'Supplier spend and risk analysis' }],
    tools: ['ERP', 'Email', 'Tableur', 'Portails fournisseurs', 'Gestion des contrats'],
    missions: [{ fr: 'Qualifier et comparer des fournisseurs', en: 'Qualify and compare suppliers' }, { fr: 'Préparer un appel d’offres', en: 'Prepare a tender' }, { fr: 'Suivre les contrats, renouvellements et risques', en: 'Track contracts, renewals and risks' }],
    starterMission: { mission: { fr: 'Comparer des offres fournisseurs', en: 'Compare supplier offers' }, result: { fr: 'Matrice des prix, conditions et risques à valider', en: 'Price, terms and risk matrix ready for review' } },
  },
  zoe: {
    slug: 'zoe', name: 'Zoé', avatar: '/elena-avatar.png',
    manager: { name: 'Votre responsable People Ops', role: { fr: 'Responsable People Ops', en: 'Head of People Ops' } }, company: 'Unitalk', dataOwner: 'Votre entreprise',
    role: { fr: 'People Ops et onboarding', en: 'People Ops and Onboarding' }, gender: 'female', department: { fr: 'Ressources humaines', en: 'Human Resources' },
    description: { fr: 'Zoé prépare les parcours d’intégration, coordonne les démarches internes, suit les échéances RH et consolide les retours des équipes.', en: 'Zoé prepares onboarding journeys, coordinates internal steps, tracks HR deadlines and consolidates team feedback.' },
    promise: { fr: 'Rend chaque arrivée plus fluide et chaque échéance RH plus visible.', en: 'Makes every arrival smoother and every HR deadline more visible.' }, availability: 'beta',
    skills: [{ fr: 'Parcours d’onboarding', en: 'Onboarding journeys' }, { fr: 'Coordination RH', en: 'HR coordination' }, { fr: 'Suivi des échéances', en: 'Deadline tracking' }, { fr: 'Enquêtes internes', en: 'Internal surveys' }],
    tools: ['SIRH', 'Notion', 'Slack', 'Calendrier', 'Formulaires'],
    missions: [{ fr: 'Préparer l’arrivée d’un salarié', en: 'Prepare a new employee’s arrival' }, { fr: 'Suivre les étapes d’onboarding', en: 'Track onboarding steps' }, { fr: 'Synthétiser une enquête interne', en: 'Summarize an internal survey' }],
  },
}

export const MARKETPLACE_COLLABORATOR_SLUGS: readonly string[] = [
  'emma', 'camille', 'lea', 'hugo', 'ines', 'arthur', 'nadia', 'chloe', 'iris', 'lucas', 'gabriel', 'marcus',
] as const

// All public identities remain addressable, including examples and variants
// that are not part of the reference identities in the Marketplace.
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
