'use server'

import { randomUUID } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  PRICING_DRAFT_COOKIE,
  normalizePricingDraft,
  type AiCapacityId,
  type PricingDraftEnvelope,
} from '@/lib/unitalk-pricing'

export async function persistPricingDraft(input: { collaborators: number; capacity: AiCapacityId; coCreators: number }): Promise<never> {
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
  redirect(`/inscription?source=tarifs&pricingDraft=${encodeURIComponent(envelope.id)}`)
}
