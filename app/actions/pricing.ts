'use server'

import { randomUUID } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  PRICING_DRAFT_COOKIE,
  normalizePricingDraft,
  type AiCapacityId,
  type OrganizationTierId,
  type UsageModeId,
  type PricingDraftEnvelope,
} from '@/lib/unitalk-pricing'
import { SESSION_COOKIE } from '@/lib/mock-auth'
import { PURCHASE_DRAFT_COOKIE, onboardingComplete, parsePurchaseDraft, type PurchaseDraft } from '@/lib/purchase-draft'

export async function persistPricingDraft(input: { organizationTier?: OrganizationTierId; collaborators: number; usageMode?: UsageModeId; creditBudget?: number; capacity?: AiCapacityId; coCreators?: number; selectedProfile?: string }): Promise<never> {
  const envelope: PricingDraftEnvelope = {
    id: randomUUID(),
    draft: normalizePricingDraft(input),
  }
  const store = await cookies()
  store.set(PRICING_DRAFT_COOKIE, JSON.stringify(envelope), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
  const current = parsePurchaseDraft(store.get(PURCHASE_DRAFT_COOKIE)?.value)
  const purchase: PurchaseDraft = {
    id: current?.id ?? envelope.id,
    onboarding: current?.onboarding,
    pricing: envelope.draft,
    updatedAt: new Date().toISOString(),
  }
  store.set(PURCHASE_DRAFT_COOKIE, JSON.stringify(purchase), {
    path: '/', maxAge: 60 * 60 * 24 * 7, sameSite: 'lax', httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
  if (store.get(SESSION_COOKIE) && onboardingComplete(purchase)) redirect(`/commande?draft=${encodeURIComponent(purchase.id)}`)
  redirect(`/inscription?source=tarifs&pricingDraft=${encodeURIComponent(purchase.id)}`)
}
