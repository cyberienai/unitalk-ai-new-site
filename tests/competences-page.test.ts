import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { STORE_ITEMS } from '@/lib/store-catalog'

const page = readFileSync(new URL('../app/collaborateurs-ia/competences/page.tsx', import.meta.url), 'utf8')
const content = readFileSync(new URL('../components/collaborateurs-ia/competences-content.tsx', import.meta.url), 'utf8')
const detailRoute = new URL('../app/collaborateurs-ia/competences/[slug]/page.tsx', import.meta.url)

describe('competences catalog', () => {
  it('keeps all 31 published skills accessible through pagination', () => {
    const skills = STORE_ITEMS.filter(item => item.type === 'competence')
    expect(skills).toHaveLength(31)
    expect(Math.ceil(skills.length / 12)).toBe(3)
    expect(content).toContain('const PAGE_SIZE = 12')
    expect(content).toContain("searchParams.get('page')")
  })

  it('uses a dedicated skill scope without a type filter or sidebar', () => {
    expect(content).not.toContain('StoreContent')
    expect(content).not.toContain('Tout le catalogue')
    expect(content).not.toContain('Tous les compétences')
    expect(content).not.toContain('Parlez à Alma')
    expect(page).toContain('MarketplaceCategoryExplainer')
    expect(page).toContain('categoryId="competences"')
  })

  it('provides URL search, category, creator and sort controls', () => {
    expect(content).toContain("searchParams.get('q')")
    expect(content).toContain("searchParams.get('categorie')")
    expect(content).toContain("searchParams.get('createur')")
    expect(content).toContain("searchParams.get('tri')")
  })

  it('conditions application access claims and uses the requested creation route', () => {
    expect(content).toContain('application de téléphonie autorisée')
    expect(content).toContain('prépare sa mise à jour dans l’application autorisée')
    expect(content).toContain('Prépare et documente une relance selon le contexte et les droits accordés')
    expect(content).toContain('/inscription?source=competence-store&intention=nouvelle-competence')
  })

  it('adds a skill directly without publishing detail pages', () => {
    expect(content).toContain('Ajouter à un Collaborateur IA')
    expect(content).toContain('href={`/decouvrir?store=${item.slug}`}')
    expect(existsSync(detailRoute)).toBe(false)
  })
})
