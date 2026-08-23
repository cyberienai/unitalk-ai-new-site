import type { MetadataRoute } from 'next'

const SITE_URL = 'https://unitalk.ai'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Private / app areas that shouldn't be indexed.
        disallow: ['/team/', '/decouvrir', '/connexion', '/inscription', '/commande', '/en/get-started', '/en/sign-in', '/en/sign-up', '/academy/espace', '/academy/onboarding', '/academy/inscription', '/academy/connexion', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
