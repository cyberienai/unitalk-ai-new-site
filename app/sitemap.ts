import type { MetadataRoute } from 'next'
import { MISSIONS } from '@/lib/missions-catalog'
import { STORE_ITEMS, storeItemHref } from '@/lib/store-catalog'
import { COLLABORATOR_PAGE_SLUGS } from '@/lib/collaborator-pages'
import { BLOG_ARTICLES } from '@/lib/blog-articles'
import { DOCUMENTATION_SLUGS } from '@/lib/unitalk-documentation'
import { MISSIONS as ACADEMY_MISSIONS, NETWORKS as ACADEMY_NETWORKS, PATHS as ACADEMY_PATHS, SKILLS as ACADEMY_SKILLS } from '@/lib/academy-catalog'
import { AI_ARCHITECTS } from '@/lib/ai-architects'

const SITE_URL = 'https://unitalk.ai'

// Primary public/marketing routes worth indexing.
const STATIC_ROUTES = [
  '',
  '/missions',
  '/collaborateurs-ia',
  '/collaborateurs-ia/profils-metier',
  '/collaborateurs-ia/profils-metier/publier',
  '/collaborateurs-ia/competences',
  '/collaborateurs-ia/applications',
  '/collaborateurs-ia/applications/catalogue',
  '/collaborateurs-ia/pourquoi-unitalk',
  '/experts',
  '/leaders',
  '/ai-gateway',
  '/desktop',
  '/documentation',
  '/tarifs',
  '/solutions',
  '/use-cases',
  '/manifeste',
  '/partenaires',
  '/expertises',
  '/expertises/publier',
  '/decouvrir',
  '/academy',
  '/academy/missions',
  '/academy/competences',
  '/academy/parcours',
  '/academy/networks',
  '/academy/experts',
  '/academy/modele',
  '/academy/alma',
  '/academy/espace',
  '/academy/financement',
  '/academy/qualite',
  '/academy/parcours-gratuits',
  '/academy/parcours-gratuits/premiere-mission-ia',
  '/academy/formations/co-createur-ia',
  '/academy/entreprendre-avec-ia',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority:
      path === ''
        ? 1
        : path === '/missions' || path === '/collaborateurs-ia' || path === '/experts'
          ? 0.9
          : 0.7,
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

  // Incarnated Collaborateur IA landing pages (/collaborateurs/[slug]).
  const collaboratorEntries: MetadataRoute.Sitemap = COLLABORATOR_PAGE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/collaborateurs/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogEntries: MetadataRoute.Sitemap = BLOG_ARTICLES.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const documentationEntries: MetadataRoute.Sitemap = DOCUMENTATION_SLUGS.map((slug) => ({ url: `${SITE_URL}/documentation/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 }))
  const academyEntries: MetadataRoute.Sitemap = [
    ...ACADEMY_MISSIONS.map(({slug})=>`/academy/missions/${slug}`),
    ...ACADEMY_SKILLS.map(({slug})=>`/academy/competences/${slug}`),
    ...ACADEMY_PATHS.map(({slug})=>`/academy/parcours/${slug}`),
    ...ACADEMY_NETWORKS.map(({id})=>`/academy/networks/${id}`),
  ].map((path)=>({url:`${SITE_URL}${path}`,lastModified:now,changeFrequency:'monthly',priority:0.7}))
  const architectEntries: MetadataRoute.Sitemap = AI_ARCHITECTS.map(({slug})=>({url:`${SITE_URL}/leaders/${slug}`,lastModified:now,changeFrequency:'monthly',priority:0.6}))
  return [...staticEntries, ...missionEntries, ...catalogEntries, ...collaboratorEntries, ...blogEntries, ...documentationEntries, ...academyEntries, ...architectEntries]
}
