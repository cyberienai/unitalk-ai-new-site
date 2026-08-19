import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const categories = [
  ['competences', 'Compétences IA'],
  ['applications', 'Applications'],
  ['modeles-ia', 'Modèles IA'],
  ['serveurs-ia', 'Serveurs IA'],
] as const
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')
const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('Store category SEO routes', () => {
  for (const [slug, title] of categories) {
    it(`publishes the ${slug} Store category`, () => {
      const page = readFileSync(new URL(`../app/marketplace/${slug}/page.tsx`, import.meta.url), 'utf8')
      expect(page).toContain(`canonical: '/marketplace/${slug}'`)
      expect(page).toContain(title)
      expect(page).toContain("'@type': 'ItemList'")
      expect(page).toContain("'@type': 'BreadcrumbList'")
      expect(page).toMatch(new RegExp(`(?:initialCategoryId="${slug}"|categoryId="${slug}")`))
      expect(sitemap).toContain(`'/marketplace/${slug}'`)
      expect(navbar).toContain(`href: '/marketplace/${slug}'`)
    })
  }
})
