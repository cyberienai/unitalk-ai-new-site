import type { Metadata } from 'next'
import { CollaborateursContent } from '@/components/collaborateurs-ia/collaborateurs-content'

export const metadata: Metadata = {
  title: 'Collaborateurs IA : confiez une mission, gardez les décisions',
  description:
    'Décrivez un travail réel. Alma prépare la mission, le profil métier, les accès et les validations de votre Collaborateur IA.',
  alternates: { canonical: 'https://unitalk.ai/collaborateurs-ia' },
  openGraph: {
    title: 'Collaborateurs IA : une mission d’abord | Unitalk',
    description:
      'Décrivez le travail à faire. Unitalk prépare le Collaborateur IA, ses accès et les validations humaines.',
    url: 'https://unitalk.ai/collaborateurs-ia',
  },
}

export default function CollaborateursIaPage() {
  return <CollaborateursContent />
}
