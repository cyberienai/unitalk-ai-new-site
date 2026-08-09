/**
 * Mock authentication (Clerk-style) — NO real backend.
 *
 * A single cookie holds the simulated session so it can be read both
 * server-side (middleware, server actions) and client-side (navbar UI).
 * It is intentionally NOT httpOnly because this is a front-end simulation;
 * swap this module for real Clerk when wiring the actual provider.
 */

export const SESSION_COOKIE = 'unitalk_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export type AuthProvider = 'google' | 'microsoft' | 'email'

export type MockSession = {
  email: string
  name: string
  provider: AuthProvider
}

/**
 * Encode a session into a cookie value.
 * Stored as plain JSON — the cookie layer (Next.js server / the browser)
 * handles URL-encoding, so we must NOT encode here or it double-encodes.
 */
export function encodeSession(session: MockSession): string {
  return JSON.stringify(session)
}

/**
 * Decode a cookie value back into a session (or null if invalid).
 * Tolerant of both raw JSON (server `cookies().get()` auto-decodes) and
 * URL-encoded JSON (client `document.cookie` is not decoded).
 */
export function decodeSession(raw: string | undefined | null): MockSession | null {
  if (!raw) return null
  const candidates = [raw]
  try {
    candidates.push(decodeURIComponent(raw))
  } catch {
    // raw wasn't URL-encoded — ignore
  }
  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate) as Partial<MockSession>
      if (parsed && typeof parsed.email === 'string' && typeof parsed.name === 'string') {
        return {
          email: parsed.email,
          name: parsed.name,
          provider: (parsed.provider as AuthProvider) ?? 'email',
        }
      }
    } catch {
      // try next candidate
    }
  }
  return null
}

/** Derive a display name from an email local-part (e.g. jane.doe → Jane Doe). */
export function nameFromEmail(email: string): string {
  const local = email.split('@')[0] ?? ''
  const cleaned = local.replace(/[._-]+/g, ' ').trim()
  if (!cleaned) return 'Membre'
  return cleaned
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** Two-letter initials for the avatar bubble. */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'U'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/** Read the simulated session from the browser (client components only). */
export function readClientSession(): MockSession | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${SESSION_COOKIE}=`))
  if (!match) return null
  return decodeSession(match.split('=').slice(1).join('='))
}
