import type { MetadataRoute } from 'next'

const SITE_URL = 'https://unitalk.ai'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Private / app areas that shouldn't be indexed.
        disallow: ['/team/', '/signup', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
