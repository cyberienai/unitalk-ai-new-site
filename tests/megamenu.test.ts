import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('Marketplace IA mega menu', () => {
  it('provides a clear community marketplace thesis', () => {
    expect(navbar).toContain('La Marketplace des Collaborateurs IA')
    expect(navbar).toContain('Ouverte à la communauté')
    expect(navbar).toContain('Des missions, des profils, des compétences et des applications')
  })

  it('exposes the Marketplace catalogs in a true mega menu', () => {
    expect(navbar).toContain('MARKETPLACE_CATALOGS')
    expect(navbar).toContain('w-[980px]')
    expect(navbar).toContain('<UnitalkLogo size={32}')
    for (const href of ['/missions', '/collaborateurs-ia/profils-metier', '/collaborateurs-ia/competences', '/collaborateurs-ia/applications', '/collaborateurs-ia/integrations', '/modeles-ia']) expect(navbar).toContain(href)
  })

  it('provides creation and ecosystem paths', () => {
    expect(navbar).toContain('MARKETPLACE_BUILD')
    expect(navbar).toContain("menuBuild: 'Créer & développer'")
    for (const href of ['/co-createur-ia', '/academy', '/experts', '/partenaires']) expect(navbar).toContain(href)
  })

  it('promotes the Marketplace page', () => {
    expect(navbar).toContain("menuMarketplace: 'Explorer la Marketplace'")
    expect(navbar).toContain("href: '/marketplace'")
  })

  it('explains AI Collaborators from a dedicated Understand area', () => {
    expect(navbar).toContain('Qu’est-ce qu’un Collaborateur IA ?')
    expect(navbar).toContain('Identité durable, missions, compétences et contrôle humain.')
    expect(navbar).toContain("href: '/collaborateurs-ia'")
    expect(navbar).toContain('COLLABORATOR_EXPLAINER.title[lang]')
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
