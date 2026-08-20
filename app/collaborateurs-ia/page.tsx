import type { Metadata } from 'next'
import { CollaborateursContent } from '@/components/collaborateurs-ia/collaborateurs-content'

export const metadata: Metadata = {
  title: 'Collaborateurs IA pour l’entreprise',
  description:
    'Déployez un Collaborateur IA avec une identité, une mémoire, des profils métier, plus de 3 000 applications, les meilleurs modèles d’IA et un serveur privé.',
  keywords: ['Collaborateur IA', 'agent IA entreprise', 'équipe humain IA', 'mémoire IA entreprise', 'automatisation entreprise'],
  alternates: { canonical: 'https://unitalk.ai/collaborateurs-ia' },
  openGraph: {
    title: 'Un Collaborateur IA rejoint votre équipe | Unitalk',
    description:
      'Une identité et une mémoire sous votre contrôle, des profils métier, plus de 3 000 applications et un serveur privé pour travailler avec vos équipes.',
    url: 'https://unitalk.ai/collaborateurs-ia',
    siteName: 'Unitalk',
    locale: 'fr_FR',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Collaborateurs IA Unitalk pour l’entreprise' }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Collaborateurs IA pour l’entreprise | Unitalk', description: 'Une identité, une mémoire et des responsabilités sous votre contrôle, pour travailler avec vos équipes.', images: ['/opengraph-image'] },
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
    mainEntity: { '@type': 'Service', name: 'Collaborateurs IA Unitalk', serviceType: 'Collaborateurs IA pour l’entreprise', provider: { '@type': 'Organization', name: 'Unitalk', url: 'https://unitalk.ai' } },
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><CollaborateursContent /></>
}
