import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { HermesContent } from '@/components/hermes-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Hermes opéré pour vos Collaborateurs IA | Unitalk',
  description: 'Unitalk déploie, sécurise et maintient l’environnement Hermes de vos Collaborateurs IA, selon l’hébergement et le niveau de service choisis.',
  alternates: { canonical: '/hermes' },
  openGraph: { type: 'website', url: 'https://unitalk.ai/hermes', title: 'Hermes fonctionne. Votre équipe travaille. | Unitalk', description: 'Déployez Hermes avec une exploitation suivie et gardez le contrôle des données, accès, modèles et actions.' },
}

export default function HermesPage() {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Exploitation Hermes par Unitalk',
    description: 'Service de déploiement, sécurisation, maintenance et supervision de l’environnement Hermes des Collaborateurs IA, selon l’offre et l’hébergement choisis.',
    url: 'https://unitalk.ai/hermes',
    provider: { '@type': 'Organization', name: 'Unitalk', url: 'https://unitalk.ai' },
    serviceType: 'Déploiement et exploitation d’infrastructure agentique Hermes',
    areaServed: 'FR',
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}/><Navbar/><HermesContent/><SiteFooter/></>
}
