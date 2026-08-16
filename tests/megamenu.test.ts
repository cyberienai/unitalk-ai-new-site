import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('Marketplace IA mega menu', () => {
  it('provides a clear community marketplace thesis', () => {
    expect(navbar).toContain('La Marketplace des Collaborateurs IA')
    expect(navbar).toContain('Ouverte à la communauté')
    expect(navbar).toContain("menuPrinciples: ['Autonomes', 'Open source', 'Souverains']")
    expect(navbar).toContain('propulsés par Hermes open source')
    expect(navbar).toContain('créations souveraines et interopérables')
    expect(navbar).toContain('MARKETPLACE_CATALOGS.map')
  })

  it('uses the radical model-catalog visual language', () => {
    expect(navbar).toContain("grid lg:grid-cols-[.82fr_1.18fr]")
    expect(navbar).toContain('text-[clamp(2.25rem,3.4vw,3.6rem)]')
    expect(navbar).toContain('grid grid-cols-5 gap-px bg-white/10')
  })

  it('exposes all nine marketplace areas and participation paths', () => {
    for (const href of ['/missions','/collaborateurs-ia/alma','/collaborateurs-ia/profils-metier','/collaborateurs-ia/competences','/collaborateurs-ia/integrations','/collaborateurs-ia/applications','/collaborateurs-ia/serveurs','/modeles-ia','/academy','/experts','/co-createur-ia']) expect(navbar).toContain(href)
    expect(navbar.indexOf("fr: 'Missions'")).toBeLessThan(navbar.indexOf("fr: 'Alma'"))
    expect(navbar.indexOf("fr: 'Alma'")).toBeLessThan(navbar.indexOf("fr: 'Profils métier'"))
    expect(navbar.indexOf("fr: 'Services'")).toBeLessThan(navbar.indexOf("fr: 'Serveurs'"))
  })

  it('keeps Missions as the first top-level navigation entry', () => {
    expect(navbar).toContain('<NavItem href="/missions"')
  })

  it('links the partner ecosystem from the top navigation', () => {
    expect(navbar).toContain('<NavItem href="/partenaires"')
  })

  it('uses accessible menu semantics and matching mobile discovery', () => {
    expect(navbar).toContain('role="menu"')
    expect(navbar).toContain('aria-expanded={collabOpen}')
    expect(navbar).toContain('aria-controls="collab-menu"')
    expect(navbar).toContain('mobile-collab-sub')
  })
})
