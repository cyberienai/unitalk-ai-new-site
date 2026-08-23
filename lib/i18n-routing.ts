import type { Lang } from '@/lib/language-context'

export const LOCALIZED_ROUTES = {
  home: { fr: '/', en: '/en' },
  missions: { fr: '/missions', en: '/en/missions' },
  collaborators: { fr: '/collaborateurs-ia', en: '/en/ai-collaborators' },
  collaboratorsMarketplace: { fr: '/marketplace/collaborateurs-ia', en: '/en/marketplace/ai-collaborators' },
  marketplace: { fr: '/marketplace', en: '/en/marketplace' },
  workspace: { fr: '/workspace', en: '/en/workspace' },
  pricing: { fr: '/tarifs', en: '/en/pricing' },
  security: { fr: '/securite', en: '/en/security' },
  discover: { fr: '/decouvrir', en: '/en/get-started' },
  signIn: { fr: '/connexion', en: '/en/sign-in' },
  signUp: { fr: '/inscription', en: '/en/sign-up' },
  jobProfiles: { fr: '/marketplace/profils-metier', en: '/en/marketplace/job-profiles' },
  skills: { fr: '/marketplace/competences', en: '/en/marketplace/skills' },
  applications: { fr: '/marketplace/applications', en: '/en/marketplace/applications' },
  models: { fr: '/marketplace/modeles-ia', en: '/en/marketplace/ai-models' },
  servers: { fr: '/marketplace/serveurs-ia', en: '/en/marketplace/ai-servers' },
} as const

export type LocalizedRouteKey = keyof typeof LOCALIZED_ROUTES

export function localizedHref(key: LocalizedRouteKey, lang: Lang): string {
  return LOCALIZED_ROUTES[key][lang]
}

export function missionHref(slug: string, lang: Lang): string {
  return `${localizedHref('missions', lang)}/${slug}`
}

export function collaboratorProfileHref(slug: string, lang: Lang): string {
  return lang === 'en' ? `/en/@${slug}` : `/@${slug}`
}

export function localizePublicHref(href: string, lang: Lang): string {
  if (lang === 'fr' || !href.startsWith('/')) return href
  const match = href.match(/^([^?#]*)(.*)$/u)
  const path = match?.[1] ?? href
  const suffix = match?.[2] ?? ''
  const staticMatch = Object.values(LOCALIZED_ROUTES).find(route => route.fr === path)
  if (staticMatch) return `${staticMatch.en}${suffix}`
  if (path === '/collaborateurs-ia/profils-metier') return `/en/marketplace/job-profiles${suffix}`
  if (path.startsWith('/missions/')) return `/en${path}${suffix}`
  if (/^\/@[^/]+$/u.test(path)) return `/en${path}${suffix}`
  return href
}

export function switchLocaleHref(pathname: string, target: Lang): string {
  for (const route of Object.values(LOCALIZED_ROUTES)) {
    if (pathname === route.fr || pathname === route.en) return route[target]
  }
  if (pathname.startsWith('/en/missions/')) return target === 'en' ? pathname : pathname.slice(3)
  if (pathname.startsWith('/missions/')) return target === 'en' ? `/en${pathname}` : pathname
  if (/^\/en\/@[^/]+$/u.test(pathname)) return target === 'en' ? pathname : pathname.slice(3)
  if (/^\/@[^/]+$/u.test(pathname)) return target === 'en' ? `/en${pathname}` : pathname
  if (target === 'fr' && pathname === '/en/marketplace/job-profiles') return '/marketplace/profils-metier'
  if (target === 'fr' && pathname === '/en/marketplace/skills') return '/marketplace/competences'
  if (target === 'fr' && pathname === '/en/marketplace/ai-models') return '/marketplace/modeles-ia'
  if (target === 'fr' && pathname === '/en/marketplace/ai-servers') return '/marketplace/serveurs-ia'
  return target === 'en' ? '/en' : '/'
}

export function localizedAlternates(key: LocalizedRouteKey) {
  const route = LOCALIZED_ROUTES[key]
  return { canonical: route.fr, languages: { fr: route.fr, en: route.en, 'x-default': route.fr } }
}
