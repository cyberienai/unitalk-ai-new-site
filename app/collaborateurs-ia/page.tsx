import type { Metadata } from 'next'
import { CollaborateursContent } from '@/components/collaborateurs-ia/collaborateurs-content'

export const metadata: Metadata = {
  title: 'Collaborateur IA pour entreprise : missions, formats et droits',
  description:
    'Confiez des missions à un Collaborateur IA durable qui comprend, produit, code et agit avec les modèles, applications et droits autorisés par votre entreprise.',
  alternates: { canonical: 'https://unitalk.ai/collaborateurs-ia' },
  openGraph: {
    title: 'Collaborateur IA pour entreprise : missions, formats et droits | Unitalk',
    description:
      'Un Collaborateur IA durable qui comprend, produit, code et agit avec les droits autorisés par votre entreprise.',
    url: 'https://unitalk.ai/collaborateurs-ia',
  },
}

export default function CollaborateursIaPage() {
  return <CollaborateursContent />
}
