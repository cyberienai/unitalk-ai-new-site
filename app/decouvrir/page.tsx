import type { Metadata } from 'next'
import { DiscoverContent } from '@/components/discover-content'

export const metadata: Metadata = {
  title: 'Découvrir mon organisation · Unitalk',
  description:
    'Découvrez l’organisation de Collaborateurs IA adaptée à votre entreprise. Un aperçu de démonstration, à confirmer ensemble.',
}

export default function DecouvrirPage() {
  return <DiscoverContent />
}
