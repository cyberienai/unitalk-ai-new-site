import type { Bilingual } from '@/lib/collaborators-catalog'

/**
 * Access profile for a *type* of application (not a specific product).
 * The Accès step uses these to show, per tool type, what data the Collaborateur
 * IA would read and what actions it would be allowed to take — honestly framed
 * as a category, before a real product is connected in the Workspace.
 */
export type ToolTypeAccess = {
  name: Bilingual
  dataAccessed: Bilingual[]
  actions: Bilingual[]
  connection: Bilingual
}

const bi = (fr: string, en: string): Bilingual => ({ fr, en })

const REVOCABLE = bi(
  'Connexion sécurisée, en lecture d’abord. Révocable à tout moment depuis votre Workspace.',
  'Secure connection, read-first. Revocable at any time from your Workspace.',
)

export const TOOL_TYPE_ACCESS: Record<string, ToolTypeAccess> = {
  Email: {
    name: bi('Messagerie', 'Email'),
    dataAccessed: [bi('Fils de discussion concernés', 'Relevant threads'), bi('Contacts et signatures', 'Contacts and signatures')],
    actions: [bi('Préparer des messages en brouillon', 'Draft messages'), bi('Classer et suivre les réponses', 'Sort and track replies')],
    connection: REVOCABLE,
  },
  Agenda: {
    name: bi('Agenda', 'Calendar'),
    dataAccessed: [bi('Disponibilités et événements', 'Availability and events')],
    actions: [bi('Proposer des créneaux', 'Suggest slots'), bi('Préparer des invitations', 'Draft invitations')],
    connection: REVOCABLE,
  },
  CRM: {
    name: bi('CRM', 'CRM'),
    dataAccessed: [bi('Fiches clients et opportunités', 'Customer and deal records'), bi('Historique des échanges', 'Interaction history')],
    actions: [bi('Mettre à jour les fiches', 'Update records'), bi('Préparer les prochaines actions', 'Prepare next actions')],
    connection: REVOCABLE,
  },
  Tableur: {
    name: bi('Tableur', 'Spreadsheet'),
    dataAccessed: [bi('Feuilles et plages concernées', 'Relevant sheets and ranges')],
    actions: [bi('Lire et calculer', 'Read and compute'), bi('Préparer des tableaux de suivi', 'Prepare tracking tables')],
    connection: REVOCABLE,
  },
  ERP: {
    name: bi('Facturation / ERP', 'Billing / ERP'),
    dataAccessed: [bi('Factures et échéances', 'Invoices and due dates'), bi('Statuts de paiement', 'Payment statuses')],
    actions: [bi('Identifier les factures échues', 'Identify overdue invoices'), bi('Préparer un suivi de relance', 'Prepare a follow-up tracker')],
    connection: REVOCABLE,
  },
  BI: {
    name: bi('Analyse (BI)', 'Analytics (BI)'),
    dataAccessed: [bi('Indicateurs et rapports', 'Metrics and reports')],
    actions: [bi('Consolider les chiffres', 'Consolidate figures'), bi('Préparer une synthèse', 'Prepare a summary')],
    connection: REVOCABLE,
  },
  Analytics: {
    name: bi('Analytics', 'Analytics'),
    dataAccessed: [bi('Audience et performances', 'Audience and performance')],
    actions: [bi('Lire les tendances', 'Read trends'), bi('Préparer un rapport', 'Prepare a report')],
    connection: REVOCABLE,
  },
  Helpdesk: {
    name: bi('Support / Helpdesk', 'Helpdesk'),
    dataAccessed: [bi('Tickets et historiques', 'Tickets and histories')],
    actions: [bi('Trier et qualifier', 'Triage and qualify'), bi('Préparer des réponses', 'Draft replies')],
    connection: REVOCABLE,
  },
  Chat: {
    name: bi('Messagerie instantanée', 'Chat'),
    dataAccessed: [bi('Conversations concernées', 'Relevant conversations')],
    actions: [bi('Préparer des réponses', 'Draft replies'), bi('Résumer les échanges', 'Summarize exchanges')],
    connection: REVOCABLE,
  },
  'Base de connaissances': {
    name: bi('Base de connaissances', 'Knowledge base'),
    dataAccessed: [bi('Articles et procédures', 'Articles and procedures')],
    actions: [bi('Rechercher et citer', 'Search and cite'), bi('Proposer des mises à jour', 'Suggest updates')],
    connection: REVOCABLE,
  },
  'Base documentaire': {
    name: bi('Base documentaire', 'Document library'),
    dataAccessed: [bi('Documents autorisés', 'Authorized documents')],
    actions: [bi('Rechercher et extraire', 'Search and extract'), bi('Préparer des synthèses', 'Prepare summaries')],
    connection: REVOCABLE,
  },
  GED: {
    name: bi('Gestion documentaire (GED)', 'Document management'),
    dataAccessed: [bi('Dossiers et pièces', 'Folders and files')],
    actions: [bi('Classer et retrouver', 'File and retrieve'), bi('Préparer des dossiers', 'Assemble folders')],
    connection: REVOCABLE,
  },
  CMS: {
    name: bi('CMS', 'CMS'),
    dataAccessed: [bi('Pages et contenus', 'Pages and content')],
    actions: [bi('Préparer des brouillons', 'Prepare drafts'), bi('Proposer des publications', 'Suggest publications')],
    connection: REVOCABLE,
  },
  'Réseaux sociaux': {
    name: bi('Réseaux sociaux', 'Social media'),
    dataAccessed: [bi('Publications et statistiques', 'Posts and stats')],
    actions: [bi('Préparer des publications', 'Draft posts'), bi('Programmer sous validation', 'Schedule with approval')],
    connection: REVOCABLE,
  },
  LinkedIn: {
    name: bi('LinkedIn', 'LinkedIn'),
    dataAccessed: [bi('Profils et signaux publics', 'Public profiles and signals')],
    actions: [bi('Identifier des prospects', 'Identify prospects'), bi('Préparer des messages', 'Draft messages')],
    connection: REVOCABLE,
  },
  Canva: {
    name: bi('Création visuelle', 'Visual design'),
    dataAccessed: [bi('Modèles et marques', 'Templates and brand assets')],
    actions: [bi('Préparer des visuels', 'Prepare visuals')],
    connection: REVOCABLE,
  },
  Design: {
    name: bi('Design', 'Design'),
    dataAccessed: [bi('Fichiers et composants', 'Files and components')],
    actions: [bi('Préparer des maquettes', 'Prepare mockups')],
    connection: REVOCABLE,
  },
  Notion: {
    name: bi('Espace de notes', 'Notes workspace'),
    dataAccessed: [bi('Pages et bases autorisées', 'Authorized pages and databases')],
    actions: [bi('Rédiger et organiser', 'Write and organize')],
    connection: REVOCABLE,
  },
  Documentation: {
    name: bi('Documentation', 'Documentation'),
    dataAccessed: [bi('Pages et guides', 'Pages and guides')],
    actions: [bi('Rédiger et mettre à jour', 'Write and update')],
    connection: REVOCABLE,
  },
  'Traitement de texte': {
    name: bi('Traitement de texte', 'Word processing'),
    dataAccessed: [bi('Documents autorisés', 'Authorized documents')],
    actions: [bi('Rédiger et mettre en forme', 'Write and format')],
    connection: REVOCABLE,
  },
  PDF: {
    name: bi('Documents PDF', 'PDF documents'),
    dataAccessed: [bi('Fichiers fournis', 'Provided files')],
    actions: [bi('Lire et extraire', 'Read and extract'), bi('Comparer et résumer', 'Compare and summarize')],
    connection: REVOCABLE,
  },
  ATS: {
    name: bi('Recrutement (ATS)', 'Recruiting (ATS)'),
    dataAccessed: [bi('Candidatures et étapes', 'Applications and stages')],
    actions: [bi('Trier les candidatures', 'Screen applications'), bi('Préparer les échanges', 'Prepare communications')],
    connection: REVOCABLE,
  },
  Visioconférence: {
    name: bi('Visioconférence', 'Video meetings'),
    dataAccessed: [bi('Réunions et comptes rendus', 'Meetings and notes')],
    actions: [bi('Préparer l’ordre du jour', 'Prepare agendas'), bi('Rédiger un compte rendu', 'Draft minutes')],
    connection: REVOCABLE,
  },
  API: {
    name: bi('Connexion applicative (API)', 'Application API'),
    dataAccessed: [bi('Données autorisées par l’API', 'Data allowed by the API')],
    actions: [bi('Lire et déclencher sous validation', 'Read and trigger with approval')],
    connection: REVOCABLE,
  },
  'Dépôt de code': {
    name: bi('Dépôt de code', 'Code repository'),
    dataAccessed: [bi('Branches et fichiers autorisés', 'Authorized branches and files')],
    actions: [bi('Préparer des changements', 'Prepare changes'), bi('Proposer une revue', 'Suggest a review')],
    connection: REVOCABLE,
  },
  'Gestion de produit': {
    name: bi('Gestion de produit', 'Product management'),
    dataAccessed: [bi('Tickets et feuilles de route', 'Tickets and roadmaps')],
    actions: [bi('Organiser et suivre', 'Organize and track')],
    connection: REVOCABLE,
  },
  Supervision: {
    name: bi('Supervision', 'Monitoring'),
    dataAccessed: [bi('Alertes et journaux', 'Alerts and logs')],
    actions: [bi('Surveiller et signaler', 'Watch and flag')],
    connection: REVOCABLE,
  },
  Automatisation: {
    name: bi('Automatisation', 'Automation'),
    dataAccessed: [bi('Scénarios autorisés', 'Authorized scenarios')],
    actions: [bi('Déclencher sous validation', 'Trigger with approval')],
    connection: REVOCABLE,
  },
  Veille: {
    name: bi('Veille', 'Monitoring / watch'),
    dataAccessed: [bi('Sources suivies', 'Followed sources')],
    actions: [bi('Collecter et résumer', 'Collect and summarize')],
    connection: REVOCABLE,
  },
  'Sources publiques': {
    name: bi('Sources publiques', 'Public sources'),
    dataAccessed: [bi('Informations publiquement disponibles', 'Publicly available information')],
    actions: [bi('Rechercher et recouper', 'Search and cross-check')],
    connection: bi(
      'Aucune donnée privée. Uniquement des informations publiques.',
      'No private data. Public information only.',
    ),
  },
}
