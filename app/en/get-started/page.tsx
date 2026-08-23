import type { Metadata } from 'next'
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { DiscoverFlow } from '@/components/discover/discover-flow'
import { decodeSession, SESSION_COOKIE } from '@/lib/mock-auth'
import { PURCHASE_DRAFT_COOKIE, parsePurchaseDraft } from '@/lib/purchase-draft'

export const metadata: Metadata = { title: 'Get started with Alma', description: 'Define a first mission and prepare the AI Collaborator that will carry it out.', alternates: { canonical: '/en/get-started' }, robots: { index: false, follow: true } }

export default async function EnglishGetStartedPage() {
  const cookieStore = await cookies()
  const session = decodeSession(cookieStore.get(SESSION_COOKIE)?.value)
  const purchaseDraft = parsePurchaseDraft(cookieStore.get(PURCHASE_DRAFT_COOKIE)?.value)
  return <Suspense fallback={<div className="min-h-screen bg-[#F3EFE6]"/>}><DiscoverFlow initialSession={session} initialPurchaseDraft={purchaseDraft}/></Suspense>
}
