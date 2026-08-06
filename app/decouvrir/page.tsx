import type { Metadata } from 'next'
import { DiscoverFlow } from '@/components/discover/discover-flow'

export const metadata: Metadata = {
  title: 'Commencer avec Unitalk · Découvrir',
  description:
    'Partez de votre entreprise, d’une mission ou d’un savoir-faire. Alma construit le contexte de votre Organisation et prépare un Collaborateur IA pour une première mission concrète.',
}

export default function DecouvrirPage() {
  return <DiscoverFlow />
}
