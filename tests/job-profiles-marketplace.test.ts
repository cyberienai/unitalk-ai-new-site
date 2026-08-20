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

  it('uses a department-led catalog with decision-ready profile cards', () => {
    expect(hub).toContain('const PROFILE_DEPARTMENTS = [')
    for (const department of ['Direction', 'Administration', 'Ventes', 'Marketing', 'Relation client', 'Finance', 'Ressources humaines', 'Opérations', 'Produit & Tech', 'Transformation']) expect(hub).toContain(department)
    expect(hub).toContain("heroTitle: { fr: 'Le bon profil pour le travail à accomplir.'")
    expect(hub).toContain("profileHeroProofs: ['Profils prêts à personnaliser', 'Plusieurs profils par Collaborateur', 'Validation humaine configurable']")
    expect(hub).toContain("const usesFeaturedHero = isCollaboratorsLanding || ['profils-metier', 'competences', 'applications', 'modeles-ia'].includes(activeCategory.id)")
    expect(hub).toContain('<ProfilesMarketplaceCatalog')
    expect(hub).toContain('sticky top-[164px]')
    expect(hub).toContain('id="profile-department"')
    expect(hub).toContain('<ProfileMarketplaceCard')
    expect(hub).toContain("starterMission: storeType === 'profil' ? item.exampleMissions?.[0]?.[lang]")
    expect(hub).toContain("href=\"/co-createur-ia\"")
  })
})
