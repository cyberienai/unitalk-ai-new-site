import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { CommandeContent } from '@/components/commande-content'
import { SiteFooter } from '@/components/site-footer'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PURCHASE_DRAFT_COOKIE, onboardingComplete, parsePurchaseDraft } from '@/lib/purchase-draft'
import { SESSION_COOKIE } from '@/lib/mock-auth'

export const metadata: Metadata = {
  title: 'Bon de commande · Unitalk',
  description:
    'Composez votre équipe de Collaborateurs IA : ajoutez des profils, choisissez votre licence entreprise et votre mode de consommation (abonnement, crédits prépayés ou BYOK). Le prix s’ajuste automatiquement.',
  robots: { index: false, follow: false },
}

export default async function CommandePage() {
  const store = await cookies()
  const draft = parsePurchaseDraft(store.get(PURCHASE_DRAFT_COOKIE)?.value)
  if (!store.get(SESSION_COOKIE)) redirect('/inscription?redirect=/commande')
  if (!draft?.pricing) redirect('/tarifs#configurateur')
  if (!onboardingComplete(draft)) redirect(`/decouvrir?draft=${encodeURIComponent(draft.id)}`)
  return (
    <>
      <Navbar />
      <CommandeContent draft={draft} />
      <SiteFooter />
    </>
  )
}
