import type { Metadata } from 'next'
import { CollaborateursContent } from '@/components/collaborateurs-ia/collaborateurs-content'

export const metadata: Metadata = {
  title: 'Collaborateur IA pour entreprise : identité, outils et modèles',
  description:
    'Créez un Collaborateur IA avec une identité professionnelle, un serveur privé, les meilleurs modèles d’IA et plus de 3 000 applications. Essayez-le gratuitement pendant sept jours.',
  alternates: { canonical: 'https://unitalk.ai/collaborateurs-ia' },
  openGraph: {
    title: 'Collaborateur IA pour entreprise : identité, outils et modèles | Unitalk',
    description:
      'Créez un Collaborateur IA avec une identité professionnelle, un serveur privé, les meilleurs modèles d’IA et plus de 3 000 applications.',
    url: 'https://unitalk.ai/collaborateurs-ia',
  },
}

export default function CollaborateursIaPage() {
  return <CollaborateursContent />
}
