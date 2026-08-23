import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { MARKETPLACE_COLLABORATOR_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'AI Collaborators for teams and SMBs',
  description: 'Choose an AI Collaborator for a concrete first mission, then evolve its job profiles, skills and memory.',
  alternates: {
    canonical: '/en/marketplace/ai-collaborators',
    languages: { fr: '/marketplace/collaborateurs-ia', en: '/en/marketplace/ai-collaborators', 'x-default': '/marketplace/collaborateurs-ia' },
  },
  openGraph: {
    type: 'website', locale: 'en_GB', alternateLocale: ['fr_FR'],
    url: `${SITE_URL}/en/marketplace/ai-collaborators`,
    title: 'Choose your AI Collaborator | Unitalk',
    description: 'Explore twelve AI Collaborators, their domain, possible first mission and the skills you can add to them.',
  },
}

export default function EnglishCollaboratorsMarketplacePage() {
  const itemList = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'Unitalk AI Collaborators',
    numberOfItems: MARKETPLACE_COLLABORATOR_SLUGS.length, inLanguage: 'en',
    itemListElement: MARKETPLACE_COLLABORATOR_SLUGS.map((slug, index) => {
      const detail = ROLE_DETAILS[slug]
      return { '@type': 'ListItem', position: index + 1, url: `${SITE_URL}/en/@${slug}`, name: `${detail.name}, ${detail.role.en}`, description: detail.promise.en }
    }),
  }
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', inLanguage: 'en',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Unitalk', item: `${SITE_URL}/en` },
      { '@type': 'ListItem', position: 2, name: 'Marketplace', item: `${SITE_URL}/en/marketplace/ai-collaborators` },
      { '@type': 'ListItem', position: 3, name: 'AI Collaborators', item: `${SITE_URL}/en/marketplace/ai-collaborators` },
    ],
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}/><Navbar/><UnitalkStoreHub collaboratorsOnly fixedLang="en"/><SiteFooter/></>
}
