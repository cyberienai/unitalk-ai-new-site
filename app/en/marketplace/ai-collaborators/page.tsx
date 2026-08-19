import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { UnitalkStoreHub } from '@/components/unitalk-store-hub'
import { LanguageProvider } from '@/lib/language-context'
import { MARKETPLACE_COLLABORATOR_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'AI Collaborators for teams and SMBs | Unitalk',
  description: 'Choose an AI Collaborator for a concrete first mission, then evolve its job profiles, skills and memory.',
  alternates: {
    canonical: '/en/marketplace/ai-collaborators',
    languages: { 'fr-FR': '/marketplace/collaborateurs-ia', 'en-US': '/en/marketplace/ai-collaborators', 'x-default': '/marketplace/collaborateurs-ia' },
  },
  openGraph: {
    type: 'website', locale: 'en_US', alternateLocale: ['fr_FR'],
    url: `${SITE_URL}/en/marketplace/ai-collaborators`,
    title: 'Choose your AI Collaborator | Unitalk',
    description: 'Explore ten AI Collaborators, their starter missions and examples of results to approve before any action.',
  },
}

export default function EnglishCollaboratorsMarketplacePage() {
  const itemList = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'Unitalk AI Collaborators',
    numberOfItems: MARKETPLACE_COLLABORATOR_SLUGS.length, inLanguage: 'en-US',
    itemListElement: MARKETPLACE_COLLABORATOR_SLUGS.map((slug, index) => {
      const detail = ROLE_DETAILS[slug]
      return { '@type': 'ListItem', position: index + 1, url: `${SITE_URL}/@${slug}`, name: `${detail.name}, ${detail.role.en}`, description: detail.promise.en }
    }),
  }
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', inLanguage: 'en-US',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Unitalk', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Marketplace', item: `${SITE_URL}/marketplace` },
      { '@type': 'ListItem', position: 3, name: 'AI Collaborators', item: `${SITE_URL}/en/marketplace/ai-collaborators` },
    ],
  }
  return <LanguageProvider initialLang="en" loadStoredLanguage={false}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}/><Navbar/><UnitalkStoreHub collaboratorsOnly fixedLang="en"/><SiteFooter/></LanguageProvider>
}
