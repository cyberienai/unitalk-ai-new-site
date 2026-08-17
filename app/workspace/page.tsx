import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { WorkspaceFinalContent } from '@/components/workspace/workspace-final-content'
import { decodeSession, SESSION_COOKIE } from '@/lib/mock-auth'
import { onboardingComplete, parsePurchaseDraft, PURCHASE_DRAFT_COOKIE } from '@/lib/purchase-draft'

export const metadata: Metadata = {
  title: 'Workspace : missions, validations et expérience humain–IA',
  description: 'Découvrez comment le Workspace Unitalk réunit missions, activité, validations humaines, décisions, résultats et expérience gouvernée.',
  alternates: { canonical: '/workspace' },
  openGraph: { title: 'Workspace Unitalk : les humains décident, les Collaborateurs IA agissent', description: 'Suivez une mission, validez les actions sensibles et gouvernez l’expérience conservée.', url: '/workspace', type: 'website', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
}

export default async function WorkspacePage() {
  const store = await cookies()
  const session = decodeSession(store.get(SESSION_COOKIE)?.value)
  const draft = parsePurchaseDraft(store.get(PURCHASE_DRAFT_COOKIE)?.value)
  const onboarding = session && onboardingComplete(draft) ? draft!.onboarding : undefined
  const companyName = onboarding?.company.find(fact => fact.key === 'name')?.value.trim()
  const workspace = onboarding ? {
    companyName: companyName || (session?.name ?? ''),
    missionTitle: onboarding.mission.title,
    collaboratorName: onboarding.collaboratorName,
    profile: onboarding.profile,
    collaboratorTemplateSlug: onboarding.collaboratorTemplateSlug,
  } : undefined
  return <><Navbar /><WorkspaceFinalContent onboarding={workspace} /><SiteFooter /></>
}
