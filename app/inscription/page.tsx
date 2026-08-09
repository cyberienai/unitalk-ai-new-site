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
  const redirectTo = firstParam(params.redirect) ?? '/decouvrir'

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3EFE6] px-4 py-16">
      <AuthCard mode="sign-up" redirectTo={redirectTo} />
    </main>
  )
}
