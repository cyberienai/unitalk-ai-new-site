'use server'

import { randomUUID } from 'node:crypto'
import { cookies } from 'next/headers'
import { PURCHASE_DRAFT_COOKIE, parsePurchaseDraft, type PurchaseDraft } from '@/lib/purchase-draft'
import type { CompanyFact, MissionInfo } from '@/components/discover/types'
import { decodeSession, SESSION_COOKIE } from '@/lib/mock-auth'

export async function persistOnboardingDraft(input: {
  company: CompanyFact[]
  mission: MissionInfo
  profile: { fr: string; en: string }
  collaboratorName: string
  collaboratorTemplateSlug?: string
}): Promise<PurchaseDraft> {
  const store = await cookies()
  if (!decodeSession(store.get(SESSION_COOKIE)?.value)) throw new Error('Authentication required')
  const current = parsePurchaseDraft(store.get(PURCHASE_DRAFT_COOKIE)?.value)
  const draft: PurchaseDraft = {
    id: current?.id ?? randomUUID(),
    pricing: current?.pricing,
    onboarding: { ...input, confirmedAt: new Date().toISOString() },
    updatedAt: new Date().toISOString(),
  }
  store.set(PURCHASE_DRAFT_COOKIE, JSON.stringify(draft), {
    path: '/', maxAge: 60 * 60 * 24 * 7, sameSite: 'lax', httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
  return draft
}
