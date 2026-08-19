import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const route = readFileSync(new URL('../app/collaborateurs-ia/profils-metier/[slug]/page.tsx', import.meta.url), 'utf8')
const profile = readFileSync(new URL('../components/collaborateurs-ia/profils/adoption-advisor-profile.tsx', import.meta.url), 'utf8')
const catalog = readFileSync(new URL('../lib/store-catalog.ts', import.meta.url), 'utf8')

describe('AI adoption advisor profile', () => {
  it('uses a dedicated profile page without changing other profile details', () => {
    expect(route).toContain("slug === 'conseillere-adoption-ia'")
    expect(route).toContain('<AdoptionAdvisorProfile item={item} />')
    expect(route).toContain('<StoreItemDetail typeSlug={TYPE_SLUG} slug={slug} />')
  })

  it('explains when to use the profile and the expected outcome', () => {
    expect(profile).toContain('Quand l’outil fonctionne, mais que les usages ne suivent pas.')
    expect(profile).toContain('Une adoption accompagnée, étape par étape.')
    expect(profile).toContain('Ajout sans facturation supplémentaire')
  })

  it('keeps the catalog description concrete', () => {
    expect(catalog).toContain('traite les blocages qui freinent l’adoption des Collaborateurs IA')
  })
})
