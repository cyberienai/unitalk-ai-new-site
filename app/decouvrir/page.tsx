import type { Metadata } from 'next'
import { DiscoverFlow } from '@/components/discover/discover-flow'
import { resolveInitialState } from '@/components/discover/types'

export const metadata: Metadata = {
  title: 'Commencer avec Unitalk · Découvrir',
  description:
    'Partez de votre entreprise, d’une mission ou d’un savoir-faire. Alma construit le contexte de votre Organisation et prépare un Collaborateur IA pour une première mission concrète.',
}

export default async function DecouvrirPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const initial = resolveInitialState(params)
  return <DiscoverFlow initial={initial} />
}
