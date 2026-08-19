import type { Metadata } from 'next'
import { MARKETPLACE_COLLABORATOR_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Collaborateurs IA pour les équipes et PME | Unitalk',
  description: 'Choisissez un Collaborateur IA pour une première mission concrète, puis faites évoluer ses profils métier, ses compétences et sa mémoire.',
  alternates: { canonical: '/marketplace/collaborateurs-ia', languages: { 'fr-FR': '/marketplace/collaborateurs-ia', 'en-US': '/en/marketplace/ai-collaborators', 'x-default': '/marketplace/collaborateurs-ia' } },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/marketplace/collaborateurs-ia`,
    title: 'Choisissez votre Collaborateur IA | Unitalk',
    description: 'Découvrez dix Collaborateurs IA, leurs missions de départ et des exemples de résultats à valider avant toute action.',
  },
}

export default function CollaboratorsMarketplacePage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Collaborateurs IA Unitalk',
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
