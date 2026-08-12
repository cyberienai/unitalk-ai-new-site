import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DiscoverFlow } from '@/components/discover/discover-flow'

export const metadata: Metadata = {
  title: 'Poursuivre votre mission avec Alma · Unitalk',
  description:
    'Alma conserve votre mission, l’adapte à votre entreprise et prépare votre premier Collaborateur IA.',
}

export default function DecouvrirPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F3EFE6]" />}>
      <DiscoverFlow />
    </Suspense>
  )
}
