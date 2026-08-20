import type { Metadata } from 'next'
import { CollaborateursContent } from '@/components/collaborateurs-ia/collaborateurs-content'

export const metadata: Metadata = {
  title: 'Collaborateurs IA pour l’entreprise',
  description:
    'Déployez un Collaborateur IA avec une identité, une mémoire, des profils métier, plus de 3 000 applications, les meilleurs modèles d’IA et un serveur privé.',
  alternates: { canonical: 'https://unitalk.ai/collaborateurs-ia' },
  openGraph: {
    title: 'Un Collaborateur IA rejoint votre équipe | Unitalk',
    description:
      'Une identité et une mémoire sous votre contrôle, des profils métier, plus de 3 000 applications et un serveur privé pour travailler avec vos équipes.',
    url: 'https://unitalk.ai/collaborateurs-ia',
  },
}

export default function CollaborateursIaPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Collaborateurs IA pour l’entreprise',
    description: 'Des Collaborateurs IA avec une identité, une mémoire, des responsabilités et des ressources contrôlées par l’entreprise.',
    url: 'https://unitalk.ai/collaborateurs-ia',
    isPartOf: { '@type': 'WebSite', name: 'Unitalk', url: 'https://unitalk.ai' },
    about: { '@type': 'SoftwareApplication', name: 'Unitalk AI', applicationCategory: 'BusinessApplication' },
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><CollaborateursContent /></>
}
