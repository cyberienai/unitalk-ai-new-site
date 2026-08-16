import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('Collaborateurs IA mega menu', () => {
  it('leads with the collaborator category rather than marketplace plumbing', () => {
    expect(navbar).toContain("title: { fr: 'Les Collaborateurs IA'")
    expect(navbar).toContain('Découvrez des collaborateurs prêts à prendre en charge vos missions.')
    expect(navbar).not.toContain('La Marketplace des Collaborateurs IA')
  })

  it('keeps only the four customer-facing catalog paths', () => {
    for (const href of ['/missions', '/collaborateurs-ia/profils-metier', '/collaborateurs-ia/competences', '/collaborateurs-ia/applications']) expect(navbar).toContain(href)
    expect(navbar).not.toContain("title: { fr: 'Intégrations'")
    expect(navbar).not.toContain("title: { fr: 'Modèles IA'")
  })

  it('keeps a short create and develop column', () => {
    for (const href of ['/co-createur-ia', '/academy', '/partenaires']) expect(navbar).toContain(href)
    expect(navbar).not.toContain("title: { fr: 'Experts'")
  })

  it('explains the category editorially', () => {
    expect(navbar).toContain('Qu’est-ce qu’un Collaborateur IA ?')
    expect(navbar).toContain('Une identité professionnelle qui travaille pour votre entreprise.')
    expect(navbar).toContain('Comment fonctionne un Collaborateur IA →')
    expect(navbar).not.toContain('<UnitalkLogo size={compact ? 18 : 20}')
  })

  it('keeps Missions first and removes Partners from the top navigation', () => {
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
