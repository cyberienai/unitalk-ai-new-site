import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('Marketplace IA mega menu', () => {
  it('provides a clear community marketplace thesis', () => {
    expect(navbar).toContain('La Marketplace des Collaborateurs IA')
    expect(navbar).toContain('Ouverte à la communauté')
    expect(navbar).toContain('MARKETPLACE_CATALOGS.map')
  })

  it('exposes all seven marketplace areas and participation paths', () => {
    for (const href of ['/collaborateurs-ia/profils-metier','/collaborateurs-ia/competences','/collaborateurs-ia/applications/catalogue','/modeles-ia','/academy','/experts','/missions','/co-createur-ia']) expect(navbar).toContain(href)
  })

  it('uses accessible menu semantics and matching mobile discovery', () => {
    expect(navbar).toContain('role="menu"')
    expect(navbar).toContain('aria-expanded={collabOpen}')
    expect(navbar).toContain('aria-controls="collab-menu"')
    expect(navbar).toContain('mobile-collab-sub')
  })
})
