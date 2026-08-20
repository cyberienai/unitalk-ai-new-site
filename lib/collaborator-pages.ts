// Presentation layer for the incarnated Collaborateur IA landing pages
// (/collaborateurs/[slug]). This is the marketing "living profile" that
// generalizes the Emma campaign page across every job persona.
//
// It reuses the real product data — no parallel source of truth:
//  - identity, skills, tools, human pair  ← ROLE_DETAILS (collaborators-catalog)
//  - the missions a persona takes on       ← MISSIONS filtered by collaboratorSlug
// Only the persona-specific hero copy lives here.

import type { Bilingual, RoleDetail } from '@/lib/collaborators-catalog'
import { DETAILED_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { MISSIONS, type MissionStatus } from '@/lib/missions-catalog'

export type CollaboratorHeroCopy = {
  // Short, persona-specific one-liner shown under the title (the "claim").
  claim: Bilingual
  // 1–2 sentence hero paragraph.
  body: Bilingual
}

// Persona-specific hero copy. Keys must exist in ROLE_DETAILS.
// Everything else (role, avatar, skills, tools, missions, human pair) is
// derived from the shared catalogs so the page never drifts from the product.
const HERO_COPY: Record<string, CollaboratorHeroCopy> = {
  emma: {
    claim: {
      fr: 'Elle tient l’agenda, les priorités et les réunions de la direction.',
      en: 'She runs the leadership’s calendar, priorities and meetings.',
    },
    body: {
      fr: 'Emma prépare les décisions, filtre les demandes et garde chaque dossier prêt au bon moment. Elle apprend votre fonctionnement et gagne en autonomie mission après mission.',
      en: 'Emma prepares decisions, filters requests and keeps every file ready at the right time. She learns how you work and grows more autonomous with every mission.',
    },
  },
  hugo: {
    claim: {
      fr: 'Il trouve vos prospects, les qualifie et relance au bon moment.',
      en: 'He finds your prospects, qualifies them and follows up at the right time.',
    },
    body: {
      fr: 'Hugo prospecte, tient votre CRM à jour et prépare chaque rendez-vous commercial. Il démarre sur la prospection puis étend son savoir-faire au fil de vos missions.',
      en: 'Hugo prospects, keeps your CRM up to date and preps every sales meeting. He starts with prospecting, then extends his know-how across your missions.',
    },
  },
  camille: {
    claim: {
      fr: 'Elle surveille votre marché, recoupe les sources et fait émerger les signaux qui comptent.',
      en: 'She monitors your market, cross-checks sources and surfaces the signals that matter.',
    },
    body: {
      fr: 'Camille transforme une veille dispersée en faits sourcés, comparaisons claires et conséquences à examiner. Elle commence par vos concurrents puis enrichit ses analyses mission après mission.',
      en: 'Camille turns scattered intelligence into sourced facts, clear comparisons and implications to review. She starts with your competitors, then deepens her analysis mission after mission.',
    },
  },
  gabriel: {
    claim: {
      fr: 'Il compare les fournisseurs, leurs conditions et leurs risques avant votre décision.',
      en: 'He compares suppliers, their terms and risks before your decision.',
    },
    body: {
      fr: 'Gabriel rassemble les offres, normalise les critères et signale les écarts qui comptent. Il commence par une comparaison fournisseurs puis enrichit votre méthode achats mission après mission.',
      en: 'Gabriel gathers offers, normalizes criteria and flags the gaps that matter. He starts with a supplier comparison, then strengthens your procurement method mission after mission.',
    },
  },
  lea: {
    claim: {
      fr: 'Elle construit votre stratégie de contenu et la décline sur chaque canal.',
      en: 'She builds your content strategy and adapts it across every channel.',
    },
    body: {
      fr: 'Léa planifie le calendrier éditorial, rédige et mesure l’impact en continu. Elle enrichit sa mémoire de votre marque à chaque publication.',
      en: 'Léa plans the editorial calendar, writes and measures impact continuously. She enriches her memory of your brand with every publication.',
    },
  },
  ines: {
    claim: {
      fr: 'Elle répond à vos clients, traite les réclamations et garde le ton juste.',
      en: 'She answers your customers, handles complaints and keeps the right tone.',
    },
    body: {
      fr: 'Inès prend en charge les demandes entrantes, escalade ce qui doit l’être et documente chaque cas. Elle apprend vos réponses types et s’améliore en continu.',
      en: 'Inès handles inbound requests, escalates what needs escalating and documents every case. She learns your canned answers and keeps improving.',
    },
  },
  nadia: {
    claim: {
      fr: 'Elle consolide vos chiffres, suit les indicateurs et prépare les prévisions.',
      en: 'She consolidates your numbers, tracks metrics and prepares forecasts.',
    },
    body: {
      fr: 'Nadia transforme chaque donnée en information utile pour décider. Elle fiabilise le reporting et étend son périmètre au rythme de vos besoins.',
      en: 'Nadia turns every data point into useful insight for decisions. She hardens reporting and extends her scope at the pace of your needs.',
    },
  },
  arthur: {
    claim: {
      fr: 'Il écrit du code, relit les contributions et corrige les bugs.',
      en: 'He writes code, reviews contributions and fixes bugs.',
    },
    body: {
      fr: 'Arthur documente, teste et livre des fonctionnalités aux côtés de votre équipe technique. Il assimile votre base de code et gagne en portée à chaque mission.',
      en: 'Arthur documents, tests and ships features alongside your engineering team. He absorbs your codebase and gains reach with every mission.',
    },
  },
}

export type CollaboratorMissionCard = {
  slug: string
  title: Bilingual
  objective: Bilingual
  category: string
  status: MissionStatus
}

export type CollaboratorPage = {
  detail: RoleDetail
  copy: CollaboratorHeroCopy
  missions: CollaboratorMissionCard[]
}

// Slugs that have a full incarnated page (identity + hero copy).
export const COLLABORATOR_PAGE_SLUGS = DETAILED_SLUGS.filter((slug) => slug in ROLE_DETAILS)

// Real missions this persona takes on, pulled from the shared catalog.
export function missionsForCollaborator(slug: string, count = 4): CollaboratorMissionCard[] {
  const missions = MISSIONS.filter((m) => m.collaboratorSlug === slug)
  const featuredSlugs = slug === 'nadia'
    ? ['relancer-les-factures-impayees', 'suivre-la-tresorerie', 'preparer-mon-reporting-financier', 'analyser-les-ecarts-budgetaires', 'preparer-les-previsions-budgetaires']
    : slug === 'emma'
      ? ['preparer-et-suivre-mes-reunions', 'trier-la-boite-de-reception', 'organiser-les-rendez-vous', 'participer-a-vos-reunions', 'suivre-les-actions-decidees']
      : slug === 'camille'
        ? ['realiser-une-veille-concurrentielle', 'surveiller-un-marche', 'comparer-les-offres-concurrentes', 'preparer-un-benchmark']
      : slug === 'gabriel'
        ? ['comparer-les-offres-fournisseurs', 'suivre-les-renouvellements', 'suivre-les-engagements-fournisseurs']
      : []
  const ordered = slug === 'hugo'
    ? [...missions.filter((m) => m.slug !== 'trouver-de-nouveaux-clients'), ...missions.filter((m) => m.slug === 'trouver-de-nouveaux-clients')]
    : featuredSlugs.length > 0
      ? [...featuredSlugs.flatMap((featuredSlug) => missions.filter((mission) => mission.slug === featuredSlug)), ...missions.filter((mission) => !featuredSlugs.includes(mission.slug))]
      : missions
  return ordered
    .slice(0, count)
    .map((m) => ({ slug: m.slug, title: m.title, objective: m.objective, category: m.category, status: m.status }))
}

// Everything the landing page needs for one persona, or null if unknown.
export function getCollaboratorPage(slug: string): CollaboratorPage | null {
  const detail = ROLE_DETAILS[slug]
  if (!detail) return null
  const copy = HERO_COPY[slug] ?? {
    claim: detail.promise,
    body: detail.description,
  }
  return { detail, copy, missions: missionsForCollaborator(slug, ['nadia', 'emma', 'camille', 'gabriel'].includes(slug) ? 5 : 4) }
}
