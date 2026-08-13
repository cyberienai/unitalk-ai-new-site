import type { Metadata } from 'next'
import { AuthCard } from '@/components/auth/auth-card'

export const metadata: Metadata = {
  title: 'Inscription · Unitalk',
  description: 'Créez votre compte Unitalk avec Google, Microsoft ou votre e-mail. Essai de 7 jours, sans carte bancaire.',
}

function firstParam(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v
}

export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const source = firstParam(params.source)
  const pricingDraft = firstParam(params.pricingDraft)
  const pricingRedirect = source === 'tarifs' && pricingDraft
    ? `/decouvrir?source=tarifs&pricingDraft=${encodeURIComponent(pricingDraft)}`
    : undefined
  const intent = firstParam(params.intent)
  const almaRedirect = source === 'alma-profile' && intent === 'nouvelle-mission'
    ? '/decouvrir?source=alma-profile&intention=nouvelle-mission'
    : undefined
  const redirectTo = firstParam(params.redirect) ?? pricingRedirect ?? almaRedirect ?? '/decouvrir'

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3EFE6] px-4 py-16">
      <AuthCard mode="sign-up" redirectTo={redirectTo} />
    </main>
  )
}
