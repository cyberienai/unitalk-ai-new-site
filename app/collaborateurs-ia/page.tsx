import type { Metadata } from 'next'
import { CollaborateursContent } from '@/components/collaborateurs-ia/collaborateurs-content'

export const metadata: Metadata = {
  title: 'Collaborateur IA pour entreprise : déléguez une première mission',
  description:
    'Déléguez une première mission à un Collaborateur IA qui travaille avec vos outils, conserve le contexte validé et respecte vos règles de contrôle.',
  alternates: { canonical: 'https://unitalk.ai/collaborateurs-ia' },
  openGraph: {
    title: 'Collaborateur IA pour entreprise : déléguez une première mission | Unitalk',
    description:
      'Un Collaborateur IA qui travaille avec vos outils, conserve le contexte validé et respecte vos règles de contrôle.',
    url: 'https://unitalk.ai/collaborateurs-ia',
  },
}

export default function CollaborateursIaPage() {
  return <CollaborateursContent />
}
