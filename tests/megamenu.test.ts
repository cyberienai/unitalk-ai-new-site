import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('Collaborateurs IA mega menu', () => {
  it('keeps the primary journey visible', () => {
    for (const href of ['/missions', '/collaborateurs-ia', '/workspace', '/academy', '/tarifs']) expect(navbar).toContain(href)
    expect(navbar).toContain("label: { fr: 'Décrire mon besoin'")
  })

  it('opens the AI Collaborators Marketplace category first', () => {
    expect(navbar).toContain("fr: 'Collaborateurs IA'")
    expect(navbar).toContain("fr: 'Les identités IA prêtes à rejoindre votre entreprise.'")
  })

  it('links directly to the six Collaborator areas', () => {
    for (const href of ['/marketplace/collaborateurs-ia', '/marketplace/profils-metier', '/marketplace/competences', '/marketplace/applications', '/marketplace/modeles-ia', '/marketplace/serveurs-ia']) expect(navbar).toContain(`href: '${href}'`)
    for (const label of ['Collaborateurs IA', 'Profils métier', 'Compétences', 'Applications', 'Modèles IA', 'Serveurs IA']) expect(navbar).toContain(label)
  })

  it('keeps support actions out of the Collaborators menu', () => {
    expect(navbar).not.toContain('COLLAB_ACTIONS')
    expect(navbar).not.toContain("fr: 'Trouver un expert'")
  })

  it('keeps Missions and Academy visible and removes Marketplace from top navigation', () => {
    expect(navbar).toContain('<NavItem href="/missions"')
    expect(navbar).toContain('<NavItem href="/academy"')
    expect(navbar).not.toContain('<NavItem href="/marketplace"')
    expect(navbar).not.toContain('{t.marketplace}')
    expect(navbar).not.toContain('<NavItem href="/partenaires"')
  })

  it('uses accessible menu semantics and matching mobile discovery', () => {
    expect(navbar).toContain('role="menu"')
    expect(navbar).toContain('aria-expanded={collabOpen}')
    expect(navbar).toContain('aria-controls="collab-menu"')
    expect(navbar).toContain('mobile-collab-sub')
  })
})
