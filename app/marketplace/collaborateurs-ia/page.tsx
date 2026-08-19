import type { Metadata } from 'next'
import { MARKETPLACE_COLLABORATOR_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Collaborateurs IA pour les équipes et PME | Unitalk',
  description: 'Découvrez dix identités IA de référence, une par département, puis ajoutez les profils métier dont votre entreprise a besoin.',
  alternates: { canonical: '/marketplace/collaborateurs-ia' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/marketplace/collaborateurs-ia`,
    title: 'Choisissez votre Collaborateur IA | Unitalk',
    description: 'Choisissez une identité de référence par département, puis faites-la évoluer avec des profils métier, des compétences et des applications.',
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <Navbar />
      <UnitalkStoreHub collaboratorsOnly />
      <SiteFooter />
    </>
  )
}
