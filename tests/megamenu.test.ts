import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('Marketplace IA mega menu', () => {
  it('provides a clear community marketplace thesis', () => {
    expect(navbar).toContain('La Marketplace des Collaborateurs IA')
    expect(navbar).toContain('Ouverte à la communauté')
    expect(navbar).toContain('Des missions, des profils, des compétences et des applications')
  })

  it('keeps the mega menu focused on one Marketplace entry', () => {
    expect(navbar).not.toContain('MARKETPLACE_CATALOGS')
    expect(navbar).toContain('w-[620px]')
    expect(navbar).toContain('<UnitalkLogo size={36}')
  })

  it('promotes the Marketplace page', () => {
    expect(navbar).toContain("menuMarketplace: 'Explorer la Marketplace'")
    expect(navbar).toContain("href: '/marketplace'")
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
