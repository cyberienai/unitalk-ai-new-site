// Experts — data model and the accompaniment brief Alma builds live on /experts.
//
// The public Experts page presents human expertise as the extension of complex
// AI Collaborator deployments. Nothing here invents availability, prices,
// ratings, certifications, locations or mission counts (brief §9, §10). The
// accompaniment brief only ever contains the seven fields listed in §6.

import type { Bi } from '@/lib/mission-draft'
import type { Lang } from '@/lib/language-context'

export type { Bi }

/** The four intervention domains (brief §7). Each seeds Alma with a context. */
export type ExpertDomainKey = 'concevoir' | 'deployer' | 'superviser' | 'former'

/** The accompaniment levels a client can choose (brief §8, step 2). */
export type AccompanimentLevel = 'cadrage' | 'deploiement' | 'suivi' | 'formation'

export type ExpertDomain = {
  key: ExpertDomainKey
  title: Bi
  desc: Bi
  cta: Bi
  /** The phrase loaded into Alma when the domain is picked. */
  seed: Bi
  /** The accompaniment level this domain maps to. */
  level: AccompanimentLevel
}

export const EXPERT_DOMAINS: ExpertDomain[] = [
  {
    key: 'concevoir',
    title: { fr: 'Concevoir', en: 'Design' },
    desc: {
      fr: 'Définir les rôles, les missions, les responsabilités et les validations.',
      en: 'Define the roles, missions, responsibilities and validations.',
    },
    cta: { fr: 'Concevoir avec un expert', en: 'Design with an expert' },
    seed: {
      fr: 'Nous voulons concevoir les rôles et les missions de nos Collaborateurs IA, avec les responsabilités et les validations.',
      en: 'We want to design the roles and missions of our AI Collaborators, with responsibilities and validations.',
    },
    level: 'cadrage',
  },
  {
    key: 'deployer',
    title: { fr: 'Déployer', en: 'Deploy' },
    desc: {
      fr: 'Préparer les Collaborateurs IA, connecter les applications et organiser leur arrivée dans l’entreprise.',
      en: 'Prepare the AI Collaborators, connect the applications and organize their arrival in the company.',
    },
    cta: { fr: 'Déployer avec un expert', en: 'Deploy with an expert' },
    seed: {
      fr: 'Nous devons préparer nos Collaborateurs IA, connecter nos applications métier et organiser leur arrivée dans l’entreprise.',
      en: 'We need to prepare our AI Collaborators, connect our business applications and organize their arrival in the company.',
    },
    level: 'deploiement',
  },
  {
    key: 'superviser',
    title: { fr: 'Superviser', en: 'Supervise' },
    desc: {
      fr: 'Suivre leur travail, maîtriser les risques et améliorer les résultats.',
      en: 'Track their work, manage risks and improve results.',
    },
    cta: { fr: 'Superviser avec un expert', en: 'Supervise with an expert' },
    seed: {
      fr: 'Nous voulons suivre le travail de nos Collaborateurs IA, maîtriser les risques et améliorer les résultats dans la durée.',
      en: 'We want to track our AI Collaborators’ work, manage risks and improve results over time.',
    },
    level: 'suivi',
  },
  {
    key: 'former',
    title: { fr: 'Former', en: 'Train' },
    desc: {
      fr: 'Aider les équipes à travailler efficacement avec leurs Collaborateurs IA.',
      en: 'Help teams work effectively with their AI Collaborators.',
    },
    cta: { fr: 'Former les équipes avec un expert', en: 'Train teams with an expert' },
    seed: {
      fr: 'Nous voulons aider nos équipes à travailler efficacement avec leurs Collaborateurs IA.',
      en: 'We want to help our teams work effectively with their AI Collaborators.',
    },
    level: 'formation',
  },
]

export const LEVEL_LABELS: Record<AccompanimentLevel, Bi> = {
  cadrage: { fr: 'Cadrage', en: 'Framing' },
  deploiement: { fr: 'Déploiement', en: 'Deployment' },
  suivi: { fr: 'Suivi continu', en: 'Continuous follow-up' },
  formation: { fr: 'Formation', en: 'Training' },
}

/** The client journey (brief §8). */
export const JOURNEY_STEPS: { title: Bi; body: Bi }[] = [
  {
    title: { fr: 'Vous décrivez votre projet', en: 'You describe your project' },
    body: { fr: 'Alma structure le besoin.', en: 'Alma structures the need.' },
  },
  {
    title: { fr: 'Vous choisissez le niveau d’accompagnement', en: 'You choose the level of support' },
    body: {
      fr: 'Cadrage, déploiement, suivi continu ou formation.',
      en: 'Framing, deployment, continuous follow-up or training.',
    },
  },
  {
    title: { fr: 'Unitalk identifie l’expertise adaptée', en: 'Unitalk identifies the right expertise' },
    body: {
      fr: 'Le besoin est transmis uniquement avec votre accord.',
      en: 'The need is shared only with your consent.',
    },
  },
  {
    title: { fr: 'L’expert intervient dans le contexte du projet', en: 'The expert works within the project context' },
    body: {
      fr: 'Il accède uniquement aux informations et espaces autorisés.',
      en: 'They access only the authorized information and spaces.',
    },
  },
  {
    title: { fr: 'Le travail reste dans votre Workspace', en: 'The work stays in your Workspace' },
    body: {
      fr: 'Les décisions, documents, validations et résultats appartiennent à l’entreprise.',
      en: 'Decisions, documents, validations and results belong to the company.',
    },
  },
]

/** Expert types — categories, never named consultants (brief §9). */
export const EXPERT_TYPES: Bi[] = [
  { fr: 'Architecte d’entreprise augmentée', en: 'Augmented-organization architect' },
  { fr: 'Consultant en processus', en: 'Process consultant' },
  { fr: 'Intégrateur d’applications', en: 'Application integrator' },
  { fr: 'Spécialiste gouvernance et sécurité', en: 'Governance and security specialist' },
  { fr: 'Formateur', en: 'Trainer' },
  { fr: 'Développeur de profils métier et compétences', en: 'Job-profile and skill developer' },
  { fr: 'Opérateur de supervision', en: 'Supervision operator' },
  { fr: 'Partenaire infrastructure', en: 'Infrastructure partner' },
]

/** Expertise domains offered in the "become an expert" form (brief §11). */
export const BECOME_EXPERT_DOMAINS: Bi[] = [
  { fr: 'Conception d’entreprise', en: 'Organization design' },
  { fr: 'Intégration d’applications', en: 'Application integration' },
  { fr: 'Gouvernance et sécurité', en: 'Governance and security' },
  { fr: 'Formation des équipes', en: 'Team training' },
  { fr: 'Développement de profils et compétences', en: 'Profile and skill development' },
  { fr: 'Supervision continue', en: 'Continuous supervision' },
  { fr: 'Infrastructure', en: 'Infrastructure' },
]

/* -------------------------------------------------------------------------- */
/* Accompaniment brief                                                         */
/* -------------------------------------------------------------------------- */

export type Accompaniment = {
  /** What the client wants to achieve. */
  objective: Bi
  /** The scope of the intervention. */
  perimeter: Bi
  /** Number of AI Collaborators involved (free text, honest when unknown). */
  collaborators: Bi
  /** Applications or systems named by the client. */
  applications: Bi[]
  /** Constraints (governance, security, migration…). */
  constraints: Bi[]
  /** The expected level of support. */
  level: Bi
  /** Deadline / horizon. */
  deadline: Bi
  /** Points still to confirm — shown honestly, never as facts. */
  toConfirm: Bi[]
}

// Known application / system keywords we can honestly echo back if named.
const APP_KEYWORDS: { match: RegExp; label: Bi }[] = [
  { match: /\bcrm\b/i, label: { fr: 'CRM', en: 'CRM' } },
  { match: /\berp\b/i, label: { fr: 'ERP', en: 'ERP' } },
  { match: /agenda|calendar|calendrier/i, label: { fr: 'Agenda', en: 'Calendar' } },
  { match: /email|e-mail|messagerie|mail\b/i, label: { fr: 'Messagerie', en: 'Email' } },
  { match: /google workspace|gmail|google/i, label: { fr: 'Google Workspace', en: 'Google Workspace' } },
  { match: /microsoft|outlook|teams|office 365|o365/i, label: { fr: 'Microsoft 365', en: 'Microsoft 365' } },
  { match: /slack/i, label: { fr: 'Slack', en: 'Slack' } },
  { match: /notion/i, label: { fr: 'Notion', en: 'Notion' } },
  { match: /facture|invoic|compta|billing/i, label: { fr: 'Facturation', en: 'Billing' } },
  { match: /base de donn|database|sql|data\b|données/i, label: { fr: 'Base de données', en: 'Database' } },
  { match: /api|webhook/i, label: { fr: 'API interne', en: 'Internal API' } },
]

const CONSTRAINT_KEYWORDS: { match: RegExp; label: Bi }[] = [
  { match: /gouvernance|governance/i, label: { fr: 'Règles de gouvernance', en: 'Governance rules' } },
  { match: /s[ée]curit|security|rgpd|gdpr|conform/i, label: { fr: 'Sécurité et conformité', en: 'Security and compliance' } },
  { match: /migration|migrer|reprise de donn/i, label: { fr: 'Migration de données', en: 'Data migration' } },
  { match: /validation|valider|approbation/i, label: { fr: 'Validations humaines', en: 'Human validations' } },
  { match: /sur[- ]mesure|custom|développement spéc|specific dev/i, label: { fr: 'Développement sur mesure', en: 'Custom development' } },
]

const NUMBER_WORDS: [RegExp, number][] = [
  [/\b(un|une|one)\b/i, 1],
  [/\b(deux|two)\b/i, 2],
  [/\b(trois|three)\b/i, 3],
  [/\b(quatre|four)\b/i, 4],
  [/\b(cinq|five)\b/i, 5],
  [/\b(six)\b/i, 6],
]

function extractCount(text: string): Bi | null {
  const collabWord = '(collaborateur|collaboratrice|agent|collaborators?)'
  // Numeric first ("3 Collaborateurs").
  const numMatch = text.match(new RegExp(`(\\d+)\\s*${collabWord}`, 'i'))
  let n: number | null = numMatch ? parseInt(numMatch[1], 10) : null
  if (n == null) {
    for (const [re, v] of NUMBER_WORDS) {
      if (new RegExp(`${re.source}\\s*${collabWord}`, 'i').test(text)) {
        n = v
        break
      }
    }
  }
  if (n == null || n < 1) return null
  const plural = n > 1
  return {
    fr: `${n} Collaborateur${plural ? 's' : ''} IA concerné${plural ? 's' : ''}`,
    en: `${n} AI Collaborator${plural ? 's' : ''} involved`,
  }
}

function extractDeadline(text: string): Bi | null {
  if (/urgent|au plus vite|asap|imm[ée]diat/i.test(text)) return { fr: 'Dès que possible', en: 'As soon as possible' }
  if (/semaine|week/i.test(text)) return { fr: 'Sous quelques semaines', en: 'Within a few weeks' }
  if (/trimestre|quarter/i.test(text)) return { fr: 'Sur le trimestre', en: 'Over the quarter' }
  if (/mois|month/i.test(text)) return { fr: 'Sur les prochaines semaines', en: 'Over the coming weeks' }
  return null
}

/**
 * Build an accompaniment brief from a free-text project description. Everything
 * is derived from what the client actually said; unknowns are surfaced honestly
 * in `toConfirm` rather than invented. `level` can be pre-set from a domain card.
 */
export function buildAccompaniment(
  spoken: string,
  lang: Lang,
  presetLevel?: AccompanimentLevel,
): Accompaniment {
  const text = spoken.trim()
  const has = text.length > 0

  const applications = APP_KEYWORDS.filter((k) => k.match.test(text)).map((k) => k.label)
  const constraints = CONSTRAINT_KEYWORDS.filter((k) => k.match.test(text)).map((k) => k.label)
  const count = extractCount(text)
  const deadline = extractDeadline(text)

  // Level: explicit preset (from a domain) wins; otherwise infer from wording.
  let level: AccompanimentLevel = presetLevel ?? 'cadrage'
  if (!presetLevel) {
    if (/former|formation|train/i.test(text)) level = 'formation'
    else if (/supervis|suivi|surveill|monitor/i.test(text)) level = 'suivi'
    else if (/d[ée]ploy|connect|int[ée]gr|deploy|integrat/i.test(text)) level = 'deploiement'
    else level = 'cadrage'
  }

  const objective: Bi = has
    ? { fr: capitalize(text), en: capitalize(text) }
    : {
        fr: 'Faire accompagner le déploiement de vos Collaborateurs IA.',
        en: 'Get support deploying your AI Collaborators.',
      }

  const perimeter: Bi = {
    cadrage: { fr: 'Cadrage des rôles, des missions et des validations.', en: 'Framing of roles, missions and validations.' },
    deploiement: { fr: 'Préparation des Collaborateurs IA et connexion des applications.', en: 'Preparation of the AI Collaborators and application connections.' },
    suivi: { fr: 'Suivi du travail, maîtrise des risques et amélioration continue.', en: 'Work tracking, risk control and continuous improvement.' },
    formation: { fr: 'Montée en compétence des équipes sur leurs Collaborateurs IA.', en: 'Upskilling teams on their AI Collaborators.' },
  }[level]

  const toConfirm: Bi[] = []
  if (!count) toConfirm.push({ fr: 'Nombre de Collaborateurs IA concernés', en: 'Number of AI Collaborators involved' })
  if (applications.length === 0) toConfirm.push({ fr: 'Applications et systèmes à connecter', en: 'Applications and systems to connect' })
  if (!deadline) toConfirm.push({ fr: 'Échéance souhaitée', en: 'Desired timeline' })
  toConfirm.push({ fr: 'Interlocuteurs côté entreprise', en: 'Points of contact on the company side' })

  return {
    objective,
    perimeter,
    collaborators: count ?? { fr: 'À préciser ensemble', en: 'To define together' },
    applications,
    constraints,
    level: LEVEL_LABELS[level],
    deadline: deadline ?? { fr: 'À définir', en: 'To be defined' },
    toConfirm,
  }
}

function capitalize(s: string): string {
  const clean = s.replace(/\s+/g, ' ').trim()
  if (!clean) return clean
  const withStop = /[.!?…]$/.test(clean) ? clean : clean + '.'
  return withStop.charAt(0).toUpperCase() + withStop.slice(1)
}
