import type { MetadataRoute } from 'next'
import { MISSIONS } from '@/lib/missions-catalog'

const SITE_URL = 'https://unitalk.ai'

// Primary public/marketing routes worth indexing.
const STATIC_ROUTES = [
  '',
  '/missions',
  '/collaborateurs-ia',
  '/collaborateurs-ia/comment-ca-fonctionne',
  '/collaborateurs-ia/comparatif',
  '/collaborateurs-ia/pourquoi-unitalk',
  '/collaborateurs-ia/roles',
  '/workspace',
  '/tarifs',
  '/solutions',
  '/use-cases',
  '/manifeste',
  '/partenaires',
  '/decouvrir',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : path === '/missions' ? 0.9 : 0.7,
  }))

  const missionEntries: MetadataRoute.Sitemap = MISSIONS.map((m) => ({
    url: `${SITE_URL}/missions/${m.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticEntries, ...missionEntries]
}
