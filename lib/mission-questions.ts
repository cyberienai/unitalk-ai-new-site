import type { Bilingual } from '@/lib/collaborators-catalog'

// A single question asked during the "Compléter uniquement le nécessaire" step.
// Kept intentionally short (3-5 per Mission) — everything else is enriched after launch.
export type MissionQuestion = {
  id: string
  label: Bilingual
  placeholder: Bilingual
  type: 'text' | 'textarea' | 'choice'
  optional?: boolean
  options?: Bilingual[]
}

const VALIDATION_OPTIONS: Bilingual[] = [
  { fr: 'Oui, je valide chaque action', en: 'Yes, I approve each action' },
  { fr: 'Oui, je valide par lot', en: 'Yes, I approve in batches' },
  { fr: 'Non, laissez faire (dans le périmètre défini)', en: 'No, proceed (within the defined scope)' },
]

// Questions per Mission category. Resolved with a sensible default fallback.
const QUESTIONS_BY_CATEGORY: Record<string, MissionQuestion[]> = {
  ventes: [
    { id: 'offer', type: 'textarea', label: { fr: 'Quelle offre voulez-vous mettre en avant ?', en: 'Which offer do you want to promote?' }, placeholder: { fr: 'Ex. Notre logiciel de gestion pour PME industrielles…', en: 'e.g. Our management software for industrial SMBs…' } },
    { id: 'target', type: 'text', label: { fr: 'Qui est votre client idéal ?', en: 'Who is your ideal customer?' }, placeholder: { fr: 'Ex. Directions achats, entreprises de 50 à 500 salariés', en: 'e.g. Procurement teams, companies of 50–500 employees' } },
    { id: 'zone', type: 'text', label: { fr: 'Quelle zone géographique ?', en: 'Which geographic area?' }, placeholder: { fr: 'Ex. France et Benelux', en: 'e.g. France and Benelux' } },
    { id: 'exclusions', type: 'text', optional: true, label: { fr: 'Des entreprises ou secteurs à exclure ?', en: 'Any companies or sectors to exclude?' }, placeholder: { fr: 'Ex. Concurrents directs, clients existants', en: 'e.g. Direct competitors, existing customers' } },
    { id: 'validation', type: 'choice', options: VALIDATION_OPTIONS, label: { fr: 'Validation avant chaque prise de contact ?', en: 'Approval before each outreach?' }, placeholder: { fr: '', en: '' } },
  ],
  support: [
    { id: 'channels', type: 'text', label: { fr: 'Sur quels canaux répondez-vous ?', en: 'Which channels do you reply on?' }, placeholder: { fr: 'Ex. Email, chat du site, réseaux sociaux', en: 'e.g. Email, website chat, social media' } },
    { id: 'docs', type: 'text', optional: true, label: { fr: 'Où se trouve la documentation à utiliser ?', en: 'Where is the documentation to use?' }, placeholder: { fr: 'Ex. Centre d’aide, FAQ interne (lien ou fichier)', en: 'e.g. Help center, internal FAQ (link or file)' } },
    { id: 'tone', type: 'text', label: { fr: 'Quel ton de réponse souhaitez-vous ?', en: 'What reply tone do you want?' }, placeholder: { fr: 'Ex. Chaleureux, direct, tutoiement', en: 'e.g. Warm, direct, first-name basis' } },
    { id: 'validation', type: 'choice', options: VALIDATION_OPTIONS, label: { fr: 'Relecture avant envoi des réponses ?', en: 'Review before sending replies?' }, placeholder: { fr: '', en: '' } },
  ],
  marketing: [
    { id: 'topic', type: 'textarea', label: { fr: 'Quel sujet ou thème traiter ?', en: 'What topic or theme should it cover?' }, placeholder: { fr: 'Ex. Lancement de notre nouvelle offre printemps', en: 'e.g. Launch of our new spring offer' } },
    { id: 'platforms', type: 'text', label: { fr: 'Quelles plateformes visez-vous ?', en: 'Which platforms are you targeting?' }, placeholder: { fr: 'Ex. LinkedIn, Instagram, newsletter', en: 'e.g. LinkedIn, Instagram, newsletter' } },
    { id: 'style', type: 'text', label: { fr: 'Quel ton ou style éditorial ?', en: 'What editorial tone or style?' }, placeholder: { fr: 'Ex. Inspirant, expert, un brin décalé', en: 'e.g. Inspiring, expert, slightly playful' } },
    { id: 'validation', type: 'choice', options: VALIDATION_OPTIONS, label: { fr: 'Validation avant publication ?', en: 'Approval before publishing?' }, placeholder: { fr: '', en: '' } },
  ],
  reunions: [
    { id: 'type', type: 'text', label: { fr: 'Quel type de réunion ?', en: 'What kind of meeting?' }, placeholder: { fr: 'Ex. Comité hebdo, point client, entretien', en: 'e.g. Weekly sync, client review, interview' } },
    { id: 'participants', type: 'text', optional: true, label: { fr: 'Qui participe ?', en: 'Who takes part?' }, placeholder: { fr: 'Ex. Équipe produit, direction, client', en: 'e.g. Product team, leadership, client' } },
    { id: 'output', type: 'text', label: { fr: 'Que voulez-vous en sortie ?', en: 'What output do you want?' }, placeholder: { fr: 'Ex. Compte rendu, décisions, actions et relances', en: 'e.g. Minutes, decisions, action items and follow-ups' } },
    { id: 'validation', type: 'choice', options: VALIDATION_OPTIONS, label: { fr: 'Validation avant envoi du compte rendu ?', en: 'Approval before sending the minutes?' }, placeholder: { fr: '', en: '' } },
  ],
  analyse: [
    { id: 'data', type: 'textarea', label: { fr: 'Quelles données ou documents analyser ?', en: 'Which data or documents to analyze?' }, placeholder: { fr: 'Ex. Export comptable, rapports mensuels (lien ou fichier)', en: 'e.g. Accounting export, monthly reports (link or file)' } },
    { id: 'goal', type: 'text', label: { fr: 'Quelle question ou quel objectif ?', en: 'What question or objective?' }, placeholder: { fr: 'Ex. Comprendre l’évolution de la marge par produit', en: 'e.g. Understand margin evolution per product' } },
    { id: 'format', type: 'text', label: { fr: 'Quel format de sortie attendu ?', en: 'What output format do you expect?' }, placeholder: { fr: 'Ex. Note de synthèse + tableau', en: 'e.g. Summary note + table' } },
    { id: 'validation', type: 'choice', options: VALIDATION_OPTIONS, label: { fr: 'Validation avant diffusion ?', en: 'Approval before sharing?' }, placeholder: { fr: '', en: '' } },
  ],
  finance: [
    { id: 'data', type: 'textarea', label: { fr: 'Quelles données financières analyser ?', en: 'Which financial data to analyze?' }, placeholder: { fr: 'Ex. Grand livre, exports du mois (lien ou fichier)', en: 'e.g. General ledger, monthly exports (link or file)' } },
    { id: 'goal', type: 'text', label: { fr: 'Quel est l’objectif du reporting ?', en: 'What is the goal of the report?' }, placeholder: { fr: 'Ex. Suivi budgétaire mensuel pour la direction', en: 'e.g. Monthly budget tracking for leadership' } },
    { id: 'format', type: 'text', label: { fr: 'Quel format de sortie attendu ?', en: 'What output format do you expect?' }, placeholder: { fr: 'Ex. Tableau de bord + commentaire', en: 'e.g. Dashboard + commentary' } },
    { id: 'validation', type: 'choice', options: VALIDATION_OPTIONS, label: { fr: 'Validation avant diffusion ?', en: 'Approval before sharing?' }, placeholder: { fr: '', en: '' } },
  ],
  automatisation: [
    { id: 'process', type: 'textarea', label: { fr: 'Quel processus voulez-vous automatiser ?', en: 'Which process do you want to automate?' }, placeholder: { fr: 'Ex. Relance des factures impayées', en: 'e.g. Chasing unpaid invoices' } },
    { id: 'tools', type: 'text', optional: true, label: { fr: 'Quels outils sont impliqués ?', en: 'Which tools are involved?' }, placeholder: { fr: 'Ex. Notre CRM, notre boîte email', en: 'e.g. Our CRM, our mailbox' } },
    { id: 'frequency', type: 'text', label: { fr: 'À quelle fréquence ?', en: 'How often?' }, placeholder: { fr: 'Ex. Chaque lundi matin', en: 'e.g. Every Monday morning' } },
    { id: 'validation', type: 'choice', options: VALIDATION_OPTIONS, label: { fr: 'Validation avant chaque exécution ?', en: 'Approval before each run?' }, placeholder: { fr: '', en: '' } },
  ],
  developpement: [
    { id: 'project', type: 'text', label: { fr: 'Quel dépôt ou projet ?', en: 'Which repository or project?' }, placeholder: { fr: 'Ex. github.com/mon-org/mon-app', en: 'e.g. github.com/my-org/my-app' } },
    { id: 'scope', type: 'textarea', label: { fr: 'Quelles tâches à traiter ?', en: 'Which tasks to handle?' }, placeholder: { fr: 'Ex. Corriger le lot de bugs #123 à #130', en: 'e.g. Fix bug batch #123 to #130' } },
    { id: 'constraints', type: 'text', optional: true, label: { fr: 'Des contraintes techniques ?', en: 'Any technical constraints?' }, placeholder: { fr: 'Ex. Ne pas toucher au module paiement', en: 'e.g. Do not touch the payment module' } },
    { id: 'validation', type: 'choice', options: VALIDATION_OPTIONS, label: { fr: 'Validation avant merge ?', en: 'Approval before merge?' }, placeholder: { fr: '', en: '' } },
  ],
}

export function missionQuestions(category: string): MissionQuestion[] {
  return QUESTIONS_BY_CATEGORY[category] ?? QUESTIONS_BY_CATEGORY.ventes
}
