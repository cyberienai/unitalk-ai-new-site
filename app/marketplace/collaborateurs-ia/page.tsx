import type { Metadata } from 'next'
import { MARKETPLACE_COLLABORATOR_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Collaborateurs IA pour PME et équipes | Unitalk',
  description: 'Découvrez 12 Collaborateurs IA par métier, choisissez une première mission et ajoutez les profils métier et compétences adaptés à votre entreprise.',
  keywords: ['Collaborateur IA', 'collaborateurs IA entreprise', 'assistant IA PME', 'agent IA métier', 'équipe IA', 'assistant IA professionnel'],
  robots: { index: true, follow: true },
  alternates: { canonical: '/marketplace/collaborateurs-ia', languages: { 'fr-FR': '/marketplace/collaborateurs-ia', 'en-US': '/en/marketplace/ai-collaborators', 'x-default': '/marketplace/collaborateurs-ia' } },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_US'],
    url: `${SITE_URL}/marketplace/collaborateurs-ia`,
    title: '12 Collaborateurs IA pour votre entreprise | Unitalk',
    description: 'Comparez leurs domaines, leurs premières missions et les profils métier adaptés à votre entreprise.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Les Collaborateurs IA Unitalk par domaine métier' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '12 Collaborateurs IA pour votre entreprise | Unitalk',
    description: 'Choisissez un Collaborateur IA par domaine et confiez-lui une première mission concrète.',
    images: ['/opengraph-image'],
  },
}

export default function CollaboratorsMarketplacePage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Collaborateurs IA Unitalk',
    description: 'Douze Collaborateurs IA spécialisés par domaine métier pour les équipes et les PME.',
    inLanguage: 'fr-FR',
    numberOfItems: MARKETPLACE_COLLABORATOR_SLUGS.length,
    itemListElement: MARKETPLACE_COLLABORATOR_SLUGS.map((slug, index) => {
      const detail = ROLE_DETAILS[slug]
      return {
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/@${slug}`,
        name: `${detail.name}, ${detail.role.fr}`,
        description: detail.promise.fr,
      }
    }),
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Unitalk', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Marketplace', item: `${SITE_URL}/marketplace` },
      { '@type': 'ListItem', position: 3, name: 'Collaborateurs IA', item: `${SITE_URL}/marketplace/collaborateurs-ia` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Navbar />
      <UnitalkStoreHub collaboratorsOnly />
      <SiteFooter />
    </>
  )
}
