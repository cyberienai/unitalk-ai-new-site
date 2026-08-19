import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/marketplace/profils-metier/page.tsx', import.meta.url), 'utf8')
const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')

describe('Profils métier marketplace SEO', () => {
  it('publishes an indexable canonical Store category', () => {
    expect(page).toContain("canonical: '/marketplace/profils-metier'")
    expect(page).toContain('Profils métier IA pour Collaborateurs IA')
    expect(page).toContain('<UnitalkStoreHub initialCategoryId="profils-metier" />')
    expect(sitemap).toContain("'/marketplace/profils-metier'")
  })

  it('publishes catalog and breadcrumb structured data', () => {
    expect(page).toContain("'@type': 'ItemList'")
    expect(page).toContain("'@type': 'BreadcrumbList'")
    expect(page).toContain('STORE_ITEMS.filter')
    expect(hub).toContain('initialCategoryId?: string')
  })
})
