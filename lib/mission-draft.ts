// Mission draft: the structured mission that Alma builds live on the public
// Missions page, before anything is adapted to the company in /decouvrir.
//
// On this page Alma may only specify: title, objective, expected result,
// rhythm, deadlines, known rules, desired human validations and attachments.
// It must NOT determine the company domain, context, job profile, skills,
// applications or the AI Collaborator — those belong to /decouvrir.

import type { Lang } from '@/lib/language-context'
import type { Mission } from '@/lib/missions-catalog'

export type Bi = { fr: string; en: string }

export type MissionDraft = {
  id: string
  slug: string
  /** The user's initial free-text request. */
  request: Bi
  /** A useful, continuous transcript of what was said. */
  transcript: Bi
  title: Bi
  objective: Bi
  result: Bi
  /** Frequency / deadline of the mission. */
  rythme: Bi
  /** Known rules and boundaries (the "cadre compris"). */
  cadre: Bi[]
  /** Actions a human must confirm. */
  validations: Bi[]
  /** Still-missing points Alma may clarify (shown as hints, never as facts). */
  toClarify: Bi[]
  lang: Lang
}

/** A single clarifying question Alma can ask, with what it adds once answered. */
export type Clarification = {
  key: string
  question: Bi
  quickReplies: Bi[]
  /** The answer shown once picked (spoken/typed). Fallback for the free-text answer. */
  answer: Bi
  /** Where the confirmed information lands in the draft (fallback value). */
  add: { section: 'cadre' | 'validations'; value: Bi }
  /** Optional per-quick-reply spoken answers, aligned to `quickReplies`. */
  replyAnswers?: Bi[]
  /** Optional per-quick-reply values added to the draft, aligned to `quickReplies`. */
  replyValues?: Bi[]
  /** Optional hint (in `toClarify`) this question resolves. */
  resolves?: string
}

const CANONICAL_SLUG = 'relancer-les-factures-impayees'

// --- helpers ----------------------------------------------------------------

function modalityRythme(modality: string): Bi {
  switch (modality) {
    case 'automatisation':
      return { fr: 'À chaque déclenchement.', en: 'On each trigger.' }
    case 'email':
      return { fr: 'À chaque échéance.', en: 'On each due date.' }
    case 'donnees':
      return { fr: 'À la demande ou selon un rythme défini.', en: 'On demand or on a defined cadence.' }
    default:
      return { fr: 'À la demande.', en: 'On demand.' }
  }
}

function modalityCadre(modality: string): Bi {
  switch (modality) {
    case 'email':
      return { fr: 'Traitement par email', en: 'Handled over email' }
    case 'documents':
      return { fr: 'Production de documents', en: 'Document production' }
    case 'automatisation':
      return { fr: 'Exécution automatisée supervisée', en: 'Supervised automated run' }
    case 'donnees':
      return { fr: 'Traitement de données', en: 'Data processing' }
    case 'code':
      return { fr: 'Production technique', en: 'Technical output' }
    default:
      return { fr: 'Cadre adapté à votre demande', en: 'Scope tailored to your request' }
  }
}

let counter = 0
function newId(): string {
  counter += 1
  const rand = Math.random().toString(36).slice(2, 6)
  return `mis_${Date.now().toString(36)}${counter}${rand}`
}

// --- draft construction -----------------------------------------------------

/**
 * Build a mission draft from a real catalog Mission. The canonical invoice
 * mission uses the exact editorial copy from the brief; every other mission is
 * derived from its real fields (objective, result, modality, regulated…).
 */
export function buildDraft(mission: Mission, lang: Lang, request?: Bi): MissionDraft {
  const modality = mission.modalities[0] ?? 'documents'
  const isCanonical = mission.slug === CANONICAL_SLUG

  const base: Omit<MissionDraft, 'id'> = isCanonical
    ? {
        slug: mission.slug,
        request: request ?? { fr: 'Relance chaque semaine les factures impayées.', en: 'Chase unpaid invoices every week.' },
        transcript: {
          fr: 'Je voudrais relancer automatiquement chaque semaine les clients dont les factures sont arrivées à échéance…',
          en: 'I’d like to automatically chase, every week, the customers whose invoices are past due…',
        },
        title: { fr: 'Relancer les factures impayées', en: 'Follow up on unpaid invoices' },
        objective: {
          fr: 'Obtenir le règlement des factures arrivées à échéance.',
          en: 'Get overdue invoices paid.',
        },
        result: {
          fr: 'Relances effectuées, réponses classées et situations bloquées transmises à l’équipe.',
          en: 'Follow-ups sent, replies sorted and blocked situations escalated to the team.',
        },
        rythme: { fr: 'Chaque semaine.', en: 'Every week.' },
        cadre: [
          { fr: 'Factures arrivées à échéance', en: 'Invoices past their due date' },
          { fr: 'Transmission des situations bloquées', en: 'Blocked situations are escalated' },
          { fr: 'Ton professionnel et courtois', en: 'Professional, courteous tone' },
        ],
        validations: [],
        toClarify: [
          { fr: 'Délai avant la première relance', en: 'Delay before the first reminder' },
          { fr: 'Nombre de relances', en: 'Number of reminders' },
          { fr: 'Validation avant contentieux', en: 'Approval before escalation' },
        ],
        lang,
      }
    : {
        slug: mission.slug,
        request: request ?? { fr: mission.title.fr, en: mission.title.en },
        transcript: request ?? { fr: mission.title.fr, en: mission.title.en },
        title: mission.title,
        objective: mission.objective,
        result: mission.result,
        rythme: modalityRythme(modality),
        cadre: [modalityCadre(modality), { fr: 'Ton professionnel adapté à votre entreprise', en: 'Professional tone tailored to your company' }],
        validations: [],
        toClarify: [{ fr: 'Validation humaine souhaitée', en: 'Desired human validation' }],
        lang,
      }

  return { id: newId(), ...base }
}

/** The clarifying questions Alma asks for a given draft (real, mission-aware). */
export function getClarifications(mission: Mission, lang: Lang): Clarification[] {
  if (mission.slug === CANONICAL_SLUG) {
    return [
      {
        key: 'delai',
        question: {
          fr: 'À partir de combien de jours après l’échéance souhaitez-vous lancer la première relance ?',
          en: 'How many days after the due date should the first reminder go out?',
        },
        quickReplies: [
          { fr: '3 jours', en: '3 days' },
          { fr: '7 jours', en: '7 days' },
          { fr: 'Autre délai', en: 'Another delay' },
        ],
        answer: { fr: 'Sept jours.', en: 'Seven days.' },
        add: {
          section: 'cadre',
          value: { fr: 'Première relance sept jours après l’échéance', en: 'First reminder seven days after the due date' },
        },
        replyAnswers: [
          { fr: 'Trois jours.', en: 'Three days.' },
          { fr: 'Sept jours.', en: 'Seven days.' },
          { fr: 'Un autre délai.', en: 'Another delay.' },
        ],
        replyValues: [
          { fr: 'Première relance trois jours après l’échéance', en: 'First reminder three days after the due date' },
          { fr: 'Première relance sept jours après l’échéance', en: 'First reminder seven days after the due date' },
          { fr: 'Délai de première relance à préciser', en: 'First-reminder delay to be specified' },
        ],
        resolves: 'Délai avant la première relance',
      },
      {
        key: 'contentieux',
        question: {
          fr: 'Souhaitez-vous valider la dernière relance avant son envoi ?',
          en: 'Would you like to approve the final reminder before it is sent?',
        },
        quickReplies: [
          { fr: 'Oui', en: 'Yes' },
          { fr: 'Non', en: 'No' },
        ],
        answer: { fr: 'Oui, avant toute transmission au contentieux.', en: 'Yes, before any escalation to collections.' },
        add: {
          section: 'validations',
          value: { fr: 'Accord humain avant transmission au contentieux', en: 'Human approval before escalation to collections' },
        },
        resolves: 'Validation avant contentieux',
      },
    ]
  }

  // Generic: keep the mechanic alive without inventing domain specifics.
  const validationValue: Bi = mission.regulated
    ? { fr: 'Validation professionnelle avant toute décision engageante', en: 'Professional validation before any binding decision' }
    : { fr: 'Accord humain avant chaque envoi important', en: 'Human approval before each important send' }

  return [
    {
      key: 'validation',
      question: {
        fr: 'Souhaitez-vous valider les envois importants avant leur transmission ?',
        en: 'Would you like to approve important sends before they go out?',
      },
      quickReplies: [
        { fr: 'Oui', en: 'Yes' },
        { fr: 'Non', en: 'No' },
      ],
      answer: { fr: 'Oui, je préfère valider avant l’envoi.', en: 'Yes, I’d rather approve before sending.' },
      add: { section: 'validations', value: validationValue },
      resolves: 'Validation humaine souhaitée',
    },
  ]
}

// --- persistence + handoff --------------------------------------------------

const KEY_PREFIX = 'unitalk_mission_draft_'
const LAST_KEY = 'unitalk_mission_draft_last'

/** Save the draft to sessionStorage so /decouvrir can read it by id. */
export function saveDraft(draft: MissionDraft): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(KEY_PREFIX + draft.id, JSON.stringify(draft))
    sessionStorage.setItem(LAST_KEY, draft.id)
  } catch {
    // Storage may be unavailable (private mode, quota); handoff still works via URL.
  }
}

export function loadDraft(id: string): MissionDraft | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(KEY_PREFIX + id)
    return raw ? (JSON.parse(raw) as MissionDraft) : null
  } catch {
    return null
  }
}

/**
 * Navigation contract with /decouvrir. We honor the brief's `entry` + `draft`
 * params and also keep `mission=<slug>` so the existing /decouvrir preselection
 * keeps working without modifying that route.
 */
export function buildDecouvirHref(draft: MissionDraft): string {
  const params = new URLSearchParams({ entry: 'mission', mission: draft.slug, draft: draft.id })
  return `/decouvrir?${params.toString()}`
}
