import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('Collaborateurs IA mega menu', () => {
  it('keeps the primary journey visible', () => {
    for (const href of ['/missions', '/collaborateurs-ia', '/workspace', '/marketplace', '/tarifs']) expect(navbar).toContain(href)
    expect(navbar).toContain("label: { fr: 'Décrire mon besoin'")
  })

  it('organizes product understanding into four paths', () => {
    for (const href of ['/collaborateurs-ia/alma', '/collaborateurs-ia/profils-metier', '/collaborateurs-ia/comparatif']) expect(navbar).toContain(href)
    expect(navbar).toContain("menuDiscover: 'Comprendre'")
  })

  it('organizes Collaborator equipment without duplicating Workspace navigation', () => {
    for (const href of ['/collaborateurs-ia/competences', '/collaborateurs-ia/applications', '/collaborateurs-ia/serveurs', '/modeles-ia']) expect(navbar).toContain(href)
    expect(navbar).toContain("menuDeploy: 'Équiper'")
  })

  it('uses a concise footer and explicit selection label', () => {
    expect(navbar).not.toContain('Ouverte · Open source · Souveraine')
    expect(navbar).toContain('Hermes open source')
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
