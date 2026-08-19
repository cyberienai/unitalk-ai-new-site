import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const route = new URL('../app/collaborateurs-ia/profils-metier/[slug]/page.tsx', import.meta.url)
const profile = new URL('../components/collaborateurs-ia/profils/adoption-advisor-profile.tsx', import.meta.url)
const catalogPage = readFileSync(new URL('../components/collaborateurs-ia/profils/profiles-catalog-content.tsx', import.meta.url), 'utf8')
const catalog = readFileSync(new URL('../lib/store-catalog.ts', import.meta.url), 'utf8')

describe('AI adoption advisor profile', () => {
  it('uses the catalog action instead of a dedicated detail page', () => {
    expect(existsSync(route)).toBe(false)
    expect(existsSync(profile)).toBe(false)
    expect(catalogPage).toContain('Ajouter à un Collaborateur IA')
    expect(catalogPage).toContain('href={`/decouvrir?store=${profile.slug}`}')
  })

  it('keeps the catalog description concrete', () => {
    expect(catalog).toContain('traite les blocages qui freinent l’adoption des Collaborateurs IA')
  })
})
