import type { MetadataRoute } from 'next'
import { MISSIONS } from '@/lib/missions-catalog'
import { STORE_ITEMS, storeItemHref } from '@/lib/store-catalog'

const SITE_URL = 'https://unitalk.ai'

// Primary public/marketing routes worth indexing.
const STATIC_ROUTES = [
  '',
  '/missions',
  '/collaborateurs-ia',
  '/collaborateurs-ia/profils-metier',
  '/collaborateurs-ia/competences',
  '/collaborateurs-ia/applications',
  '/workspace',
  '/tarifs',
  '/solutions',
  '/use-cases',
  '/manifeste',
  '/partenaires',
  '/expertises',
  '/expertises/publier',
  '/decouvrir',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : path === '/missions' || path === '/collaborateurs-ia' ? 0.9 : 0.7,
  }))

  const missionEntries: MetadataRoute.Sitemap = MISSIONS.map((m) => ({
    url: `${SITE_URL}/missions/${m.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Profils métier, compétences and applications detail pages under the hub.
  const catalogEntries: MetadataRoute.Sitemap = STORE_ITEMS.map((item) => ({
    url: `${SITE_URL}${storeItemHref(item)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticEntries, ...missionEntries, ...catalogEntries]
}
