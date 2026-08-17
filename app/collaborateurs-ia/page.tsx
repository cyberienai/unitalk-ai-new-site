import type { Metadata } from 'next'
import { CollaborateursContent } from '@/components/collaborateurs-ia/collaborateurs-content'

export const metadata: Metadata = {
  title: 'Collaborateur IA : une identité professionnelle pour votre entreprise',
  description:
    'Découvrez le Collaborateur IA : une identité professionnelle avec un profil métier par défaut, des accès gouvernés, une mémoire durable et une supervision humaine.',
  alternates: { canonical: 'https://unitalk.ai/collaborateurs-ia' },
  openGraph: {
    title: 'Collaborateur IA : une identité professionnelle | Unitalk',
    description:
      'Une identité professionnelle avec un profil métier par défaut, des accès gouvernés, une mémoire durable et une supervision humaine.',
    url: 'https://unitalk.ai/collaborateurs-ia',
  },
}

export default function CollaborateursIaPage() {
  return <CollaborateursContent />
}
