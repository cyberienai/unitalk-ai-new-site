'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  encodeSession,
  nameFromEmail,
  type AuthProvider,
} from '@/lib/mock-auth'

const PROVIDER_DEMO_EMAIL: Record<Exclude<AuthProvider, 'email'>, string> = {
  google: 'membre@gmail.com',
  microsoft: 'membre@outlook.com',
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

/** Clear the simulated session and return home. */
export async function signOut(): Promise<void> {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
  redirect('/')
}
