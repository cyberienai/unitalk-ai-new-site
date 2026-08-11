// Workspace missions: the real, persisted result of the Missions → /decouvrir
// → Workspace journey. When Alma finishes preparing a first mission in
// /decouvrir, we create ONE of these and store it in the browser (localStorage)
// so it survives a refresh and lights up /workspace as a real application.
//
// This is intentionally client-only persistence (no backend): the chosen scope
// for this vertical slice. Every field is real — derived from the mission draft
// the user actually built and the catalog mission it maps to. Nothing is faked.

'use client'

import { useEffect, useState } from 'react'
import type { Bi, MissionDraft } from '@/lib/mission-draft'
import type { Mission } from '@/lib/missions-catalog'

export type { Bi }

export type WorkspaceMissionStatus = 'ready' | 'active'

export type WorkspaceMission = {
  /** Stable id, e.g. wm_abc123. */
  id: string
  createdAt: number
  missionSlug: string
  title: Bi
  objective: Bi
  result: Bi
  /** Job profile mobilized by the mission (e.g. "Développement commercial"). */
  profile: Bi
  /** Slug of the AI Collaborator carrying the mission (ROLE_DETAILS key). */
  collaboratorSlug: string
  /**
   * The first name the user chose for their Collaborator during onboarding
   * (e.g. "Lucas"). When present, the Workspace shows it instead of the
   * catalog role name — this is *their* Collaborator, not a generic persona.
   */
  collaboratorName?: string
  rythme: Bi
  /** Known rules / boundaries — what the Collaborator may do on its own. */
  cadre: Bi[]
  /** Actions that always require a human validation. */
  validations: Bi[]
  /** The concrete first step of the mission. */
  firstStep: Bi
  /** Applications the mission needs (catalog tool slugs). */
  tools: string[]
  /** The company domain entered in /decouvrir, if any. */
  domain: string
  status: WorkspaceMissionStatus
}

const STORAGE_KEY = 'unitalk_workspace_missions'
/** Same-tab change signal (the native `storage` event only fires cross-tab). */
export const WORKSPACE_MISSIONS_EVENT = 'unitalk:workspace-missions-changed'

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function readAll(): WorkspaceMission[] {
  if (!isBrowser()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as WorkspaceMission[]) : []
  } catch {
    return []
  }
}

function writeAll(missions: WorkspaceMission[]): void {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(missions))
    // Notify same-tab listeners (e.g. an already-open /workspace).
    window.dispatchEvent(new CustomEvent(WORKSPACE_MISSIONS_EVENT))
  } catch {
    // Storage may be unavailable (private mode, quota) — the flow still runs,
    // the mission just won't persist. We never throw from here.
  }
}

function newId(): string {
  const rand = Math.random().toString(36).slice(2, 8)
  return `wm_${Date.now().toString(36)}${rand}`
}

/** Newest first. */
export function listWorkspaceMissions(): WorkspaceMission[] {
  return readAll().sort((a, b) => b.createdAt - a.createdAt)
}

export function getWorkspaceMission(id: string): WorkspaceMission | null {
  return readAll().find((m) => m.id === id) ?? null
}

export function getLatestWorkspaceMission(): WorkspaceMission | null {
  return listWorkspaceMissions()[0] ?? null
}

export function hasWorkspaceMissions(): boolean {
  return readAll().length > 0
}

/**
 * Create and persist a Workspace mission from the real inputs of the journey:
 * the mission draft Alma built (may be null if the user skipped clarifications)
 * and the catalog mission it maps to. Draft values win; the catalog fills gaps.
 */
export function createWorkspaceMission(args: {
  draft: MissionDraft | null
  mission: Mission
  domain: string
}): WorkspaceMission {
  const { draft, mission, domain } = args

  const firstStep: Bi = mission.steps[0] ?? {
    fr: 'Préparer la première itération et la soumettre à validation.',
    en: 'Prepare the first iteration and submit it for approval.',
  }

  const record: WorkspaceMission = {
    id: newId(),
    createdAt: Date.now(),
    missionSlug: mission.slug,
    title: draft?.title ?? mission.title,
    objective: draft?.objective ?? mission.objective,
    result: draft?.result ?? mission.result,
    profile: mission.profile,
    collaboratorSlug: mission.collaboratorSlug,
    rythme: draft?.rythme ?? { fr: 'À la demande.', en: 'On demand.' },
    cadre: draft?.cadre?.length ? draft.cadre : [],
    validations: draft?.validations?.length ? draft.validations : [],
    firstStep,
    tools: mission.tools ?? [],
    domain,
    status: 'ready',
  }

  const all = readAll()
  all.push(record)
  writeAll(all)
  return record
}

// Recommended job profile → a real Collaborator slug from the roster, so the
// persisted mission resolves an avatar and a role in the Workspace.
const PROFILE_TO_SLUG: Record<string, string> = {
  Finance: 'nadia',
  Commercial: 'hugo',
  Marketing: 'lea',
  Support: 'ines',
  'Support client': 'ines',
  Développement: 'arthur',
  Direction: 'emma',
}

/**
 * Persist the mission built during the /decouvrir onboarding. Unlike
 * `createWorkspaceMission` (driven by a catalog mission), this maps the simple,
 * self-authored onboarding shape — a short MissionInfo, a recommended profile
 * and the chosen first name — into a real, stored WorkspaceMission. The chosen
 * name is kept so the Workspace opens as *this* Collaborator's workspace.
 *
 * Single-language input is duplicated into both `fr`/`en` slots on purpose: the
 * user authored one string, and the Workspace renders whichever language is
 * active without inventing a translation.
 */
export function createOnboardingWorkspaceMission(args: {
  title: string
  result: string
  rule: string
  validation: string
  profile: Bi
  collaboratorName: string
  domain: string
  lang: 'fr' | 'en'
}): WorkspaceMission {
  const { title, result, rule, validation, profile, collaboratorName, domain, lang } = args

  const bi = (s: string): Bi => ({ fr: s, en: s })
  const slug = PROFILE_TO_SLUG[profile.fr] ?? PROFILE_TO_SLUG[profile.en] ?? 'nadia'

  const record: WorkspaceMission = {
    id: newId(),
    createdAt: Date.now(),
    missionSlug: 'onboarding',
    title: bi(title),
    objective: bi(result),
    result: bi(result),
    profile,
    collaboratorSlug: slug,
    collaboratorName: collaboratorName.trim() || undefined,
    rythme: lang === 'fr' ? { fr: 'À la demande.', en: 'On demand.' } : { fr: 'À la demande.', en: 'On demand.' },
    cadre: rule.trim() ? [bi(rule.trim())] : [],
    validations: validation.trim() ? [bi(validation.trim())] : [],
    firstStep:
      lang === 'fr'
        ? {
            fr: 'Préparer la première itération et vous la soumettre pour validation.',
            en: 'Prepare the first iteration and submit it to you for approval.',
          }
        : {
            fr: 'Préparer la première itération et vous la soumettre pour validation.',
            en: 'Prepare the first iteration and submit it to you for approval.',
          },
    // App connections are deliberately deferred to the Workspace, so no tools yet.
    tools: [],
    domain,
    status: 'ready',
  }

  const all = readAll()
  all.push(record)
  writeAll(all)
  return record
}

/** Flip a mission from "ready" to "active" (first action launched). */
export function activateWorkspaceMission(id: string): WorkspaceMission | null {
  const all = readAll()
  const next = all.map((m) => (m.id === id ? { ...m, status: 'active' as const } : m))
  writeAll(next)
  return next.find((m) => m.id === id) ?? null
}

/** Remove one mission (used by the Workspace "retirer" control). */
export function removeWorkspaceMission(id: string): void {
  writeAll(readAll().filter((m) => m.id !== id))
}

/**
 * Subscribe to any change to the stored missions (same tab via custom event,
 * cross tab via the native storage event). Returns an unsubscribe function.
 */
export function subscribeWorkspaceMissions(cb: () => void): () => void {
  if (!isBrowser()) return () => {}
  const onCustom = () => cb()
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb()
  }
  window.addEventListener(WORKSPACE_MISSIONS_EVENT, onCustom)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(WORKSPACE_MISSIONS_EVENT, onCustom)
    window.removeEventListener('storage', onStorage)
  }
}

/**
 * React hook: the live list of Workspace missions. `loaded` distinguishes the
 * server/first-paint state (always empty, avoids hydration mismatch) from a
 * real, read-from-storage empty list.
 */
export function useWorkspaceMissions(): { missions: WorkspaceMission[]; loaded: boolean } {
  const [missions, setMissions] = useState<WorkspaceMission[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const sync = () => setMissions(listWorkspaceMissions())
    sync()
    setLoaded(true)
    return subscribeWorkspaceMissions(sync)
  }, [])

  return { missions, loaded }
}
