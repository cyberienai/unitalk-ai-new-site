'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  encodeSession,
  nameFromEmail,
  type AuthProvider,
  type MockSession,
} from '@/lib/mock-auth'

const PROVIDER_DEMO_EMAIL: Record<Exclude<AuthProvider, 'email'>, string> = {
  google: 'membre@gmail.com',
  microsoft: 'membre@outlook.com',
}

const PROVIDER_DEMO_IDENTITY: Record<Exclude<AuthProvider, 'email'>, { firstName: string; lastName: string }> = {
  google: { firstName: 'Patrick', lastName: 'Martin' },
  microsoft: { firstName: 'Patrick', lastName: 'Martin' },
}

function safeRedirect(target: string | undefined | null): string {
  // Only allow internal absolute paths to avoid open redirects.
  if (target && target.startsWith('/') && !target.startsWith('//')) return target
  return '/workspace'
}

/**
 * Establish the simulated session and redirect.
 * Google/Microsoft resolve instantly; email arrives after the code step.
 */
export async function establishSession(formData: FormData): Promise<void> {
  const provider = (formData.get('provider') as AuthProvider) ?? 'email'
  const rawEmail = (formData.get('email') as string | null)?.trim().toLowerCase() ?? ''
  const target = safeRedirect(formData.get('redirect') as string | null)

  const email =
    provider === 'email'
      ? rawEmail || 'membre@entreprise.com'
      : PROVIDER_DEMO_EMAIL[provider as 'google' | 'microsoft']

  const session = {
    email,
    name: nameFromEmail(email),
    provider,
  }

  const store = await cookies()
  store.set(SESSION_COOKIE, encodeSession(session), {
    path: '/',
    maxAge: SESSION_MAX_AGE,
    sameSite: 'lax',
    // Not httpOnly: the navbar reads this client-side in the simulation.
  })

  redirect(target)
}

/**
 * Establish the simulated session WITHOUT redirecting.
 *
 * Used by the /decouvrir onboarding: the account is created on the first
 * screen (a real session cookie is set) and the flow then continues in-memory
 * through the remaining steps. At the end, the Workspace opens directly —
 * the user is never asked to sign in a second time.
 */
export async function startSession(provider: AuthProvider, email?: string): Promise<MockSession> {
  const rawEmail = email?.trim().toLowerCase() ?? ''
  const resolvedEmail =
    provider === 'email'
      ? rawEmail || 'membre@entreprise.com'
      : PROVIDER_DEMO_EMAIL[provider as 'google' | 'microsoft']

  const identity = provider === 'email' ? undefined : PROVIDER_DEMO_IDENTITY[provider as 'google' | 'microsoft']
  const session: MockSession = {
    email: resolvedEmail,
    name: identity ? `${identity.firstName} ${identity.lastName}` : '',
    firstName: identity?.firstName,
    lastName: identity?.lastName,
    provider,
  }

  const store = await cookies()
  store.set(SESSION_COOKIE, encodeSession(session), {
    path: '/',
    maxAge: SESSION_MAX_AGE,
    sameSite: 'lax',
    // Not httpOnly: the navbar reads this client-side in the simulation.
  })
  return session
}

/** Clear the simulated session and return home. */
export async function signOut(): Promise<void> {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
  redirect('/')
}
