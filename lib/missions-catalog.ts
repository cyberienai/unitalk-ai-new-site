// Catalog of Missions: concrete outcomes you can hand to an AI Collaborator.
// A Mission = a result to achieve. It mobilizes a job Profile, is carried out by
// an AI Collaborator inside the Workspace, and ends with your validation.

import type { Bilingual } from '@/lib/collaborators-catalog'

export type MissionCategory = {
  key: string
  label: Bilingual
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
  produces: Bilingual[]
  skills: Bilingual[]
  tools: string[]
  profile: Bilingual
  collaboratorSlug: string
}

export const MISSION_CATEGORIES: MissionCategory[] = [
  { key: 'ventes', label: { fr: 'Ventes', en: 'Sales' } },
  { key: 'support', label: { fr: 'Support client', en: 'Customer support' } },
  { key: 'marketing', label: { fr: 'Marketing et contenu', en: 'Marketing and content' } },
  { key: 'reunions', label: { fr: 'Réunions et coordination', en: 'Meetings and coordination' } },
  { key: 'finance', label: { fr: 'Finance', en: 'Finance' } },
  { key: 'automatisation', label: { fr: 'Automatisation', en: 'Automation' } },
  { key: 'developpement', label: { fr: 'Développement', en: 'Development' } },
]

export const MISSIONS: Mission[] = [
  // ---------------- VENTES ----------------
  {
    slug: 'trouver-des-clients',
    category: 'ventes',
    title: { fr: 'Trouver de nouveaux clients', en: 'Find new clients' },
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
    slug: 'repondre-aux-clients',
    category: 'support',
    title: { fr: 'Répondre à mes clients', en: 'Answer my customers' },
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
    slug: 'organiser-la-faq',
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
    title: { fr: 'Créer mes contenus', en: 'Create my content' },
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
    slug: 'animer-mes-reseaux',
    category: 'marketing',
    title: { fr: 'Animer mes réseaux sociaux', en: 'Run my social media' },
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
    title: { fr: 'Améliorer mon référencement', en: 'Improve my SEO' },
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
    slug: 'preparer-mes-reunions',
    category: 'reunions',
    title: { fr: 'Préparer et suivre mes réunions', en: 'Prepare and follow up my meetings' },
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
    slug: 'preparer-mon-reporting',
    category: 'finance',
    title: { fr: 'Préparer mon reporting financier', en: 'Prepare my financial report' },
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
    title: { fr: 'Automatiser mes opérations', en: 'Automate my operations' },
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
    title: { fr: 'Développer une fonctionnalité', en: 'Build a feature' },
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
    slug: 'corriger-des-bugs',
    category: 'developpement',
    title: { fr: 'Corriger un lot de bugs', en: 'Fix a batch of bugs' },
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
]

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
