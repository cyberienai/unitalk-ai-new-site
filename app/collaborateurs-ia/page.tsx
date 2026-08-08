import type { Metadata } from 'next'
import { CollaborateursContent } from '@/components/collaborateurs-ia/collaborateurs-content'

export const metadata: Metadata = {
  title: 'Collaborateurs IA pour entreprise — Unitalk',
  description:
    'Confiez des missions à des Collaborateurs IA qui travaillent avec vos équipes. Leurs compétences validées restent réutilisables et partageables dans votre entreprise.',
  alternates: { canonical: '/collaborateurs-ia' },
}

export default function CollaborateursIaPage() {
  return <CollaborateursContent />
}
