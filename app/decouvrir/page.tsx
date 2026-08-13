import type { Metadata } from 'next'
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { DiscoverFlow } from '@/components/discover/discover-flow'
import { decodeSession, SESSION_COOKIE } from '@/lib/mock-auth'

export const metadata: Metadata = {
  title: 'Commencer avec Alma',
  description:
    'Commencez avec Alma, définissez une première mission et préparez le Collaborateur IA qui l’accomplira.',
  alternates: { canonical: '/decouvrir' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Commencer avec Alma | Unitalk',
    description: 'Définissez une première mission et préparez le Collaborateur IA qui l’accomplira.',
    url: '/decouvrir',
    type: 'website',
  },
}

export default async function DecouvrirPage() {
  const cookieStore = await cookies()
  const session = decodeSession(cookieStore.get(SESSION_COOKIE)?.value)
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F3EFE6]" />}>
      <DiscoverFlow initialSession={session} />
    </Suspense>
  )
}
