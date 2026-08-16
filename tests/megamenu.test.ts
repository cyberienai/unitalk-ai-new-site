import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('Marketplace IA mega menu', () => {
  it('starts from the work to entrust', () => {
    expect(navbar).toContain('Quel travail voulez-vous confier ?')
    expect(navbar).toContain('Décrivez votre mission…')
    expect(navbar).toContain('Continuer avec Alma')
    expect(navbar).toContain('Relancer mes factures impayées')
  })

  it('organizes equipment into four clear paths', () => {
    for (const href of ['/collaborateurs-ia/profils-metier', '/collaborateurs-ia/competences', '/collaborateurs-ia/applications', '/modeles-ia']) expect(navbar).toContain(href)
    expect(navbar).toContain("menuCatalog: 'Équiper votre Collaborateur'")
  })

  it('organizes connection and deployment', () => {
    for (const href of ['/collaborateurs-ia/integrations', '/collaborateurs-ia/serveurs', '/experts', '/academy']) expect(navbar).toContain(href)
    expect(navbar).toContain("menuBuild: 'Connecter et déployer'")
  })

  it('uses a doctrine footer and explicit selection label', () => {
    expect(navbar).toContain('Ouverte · Open source · Souveraine')
    expect(navbar).toContain('Sélection Unitalk')
    expect(navbar).toContain('Explorer toute la Marketplace')
    expect(navbar).not.toContain('<a href="/tarifs" onClick={() => setCollabOpen(false)}')
  })

  it('keeps Missions visible and Partners out of the top navigation', () => {
    expect(navbar).toContain('<NavItem href="/missions"')
    expect(navbar).not.toContain('<NavItem href="/partenaires"')
  })

  it('uses accessible menu semantics and matching mobile discovery', () => {
    expect(navbar).toContain('role="menu"')
    expect(navbar).toContain('aria-expanded={collabOpen}')
    expect(navbar).toContain('aria-controls="collab-menu"')
    expect(navbar).toContain('mobile-collab-sub')
  })
})
