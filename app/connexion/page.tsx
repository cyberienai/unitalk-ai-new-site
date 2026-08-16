import type { Metadata } from 'next'
import { AuthCard } from '@/components/auth/auth-card'

export const metadata: Metadata = {
  title: 'Connexion · Unitalk',
  description: 'Connectez-vous à Unitalk avec Google, Microsoft ou votre e-mail.',
  robots: { index: false, follow: false },
}

function firstParam(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v
}

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const redirectTo = firstParam(params.redirect) ?? '/workspace'

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3EFE6] px-4 py-16">
      <AuthCard mode="sign-in" redirectTo={redirectTo} />
    </main>
  )
}
