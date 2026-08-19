import type { Metadata } from 'next'
import { CollaborateursContent } from '@/components/collaborateurs-ia/collaborateurs-content'

export const metadata: Metadata = {
  title: 'Collaborateurs IA : découvrez l’équipe et confiez une mission',
  description:
    'Découvrez Emma, Hugo, Léa, Inès, Nadia et Arthur, leurs métiers et leurs missions. Décrivez votre besoin et Alma prépare le bon Collaborateur IA.',
  alternates: { canonical: 'https://unitalk.ai/collaborateurs-ia' },
  openGraph: {
    title: 'Découvrez les Collaborateurs IA | Unitalk',
    description:
      'Une équipe de Collaborateurs IA avec un métier, des compétences et un périmètre gouverné. Découvrez leurs profils ou décrivez votre première mission.',
    url: 'https://unitalk.ai/collaborateurs-ia',
  },
}

export default function CollaborateursIaPage() {
  return <CollaborateursContent />
}
