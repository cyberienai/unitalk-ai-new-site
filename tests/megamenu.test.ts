import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('Collaborateurs IA mega menu', () => {
  it('keeps the primary journey visible', () => {
    for (const href of ['/missions', '/collaborateurs-ia', '/workspace', '/tarifs']) expect(navbar).toContain(href)
    expect(navbar).toContain("label: { fr: 'Décrire ma mission'")
  })

  it('opens the AI Collaborators Marketplace category first', () => {
    expect(navbar).toContain("fr: 'Collaborateurs IA'")
    expect(navbar).toContain("fr: 'Les identités IA prêtes à rejoindre votre entreprise.'")
  })

  it('links directly to the Collaborator areas and Unitalk Desktop', () => {
    for (const href of ['/marketplace/collaborateurs-ia', '/marketplace/profils-metier', '/marketplace/competences', '/marketplace/applications', '/marketplace/modeles-ia', '/marketplace/serveurs-ia', '/desktop']) expect(navbar).toContain(`href: '${href}'`)
    for (const label of ['Collaborateurs IA', 'Profils métier', 'Compétences', 'Applications', 'Modèles IA', 'Serveurs IA', 'Unitalk Desktop']) expect(navbar).toContain(label)
    expect(navbar).toContain('La distribution locale pour exécuter et suivre les missions.')
  })

  it('keeps support actions out of the Collaborators menu', () => {
    expect(navbar).not.toContain('COLLAB_ACTIONS')
    expect(navbar).not.toContain("fr: 'Trouver un expert'")
  })

  it('keeps Missions and Academy visible and removes Marketplace from top navigation', () => {
    expect(navbar).toContain("<NavItem href={localizedHref('missions', lang)}")
    expect(navbar).not.toContain('<NavItem href="/marketplace"')
    expect(navbar).not.toContain('{t.marketplace}')
    expect(navbar).not.toContain('<NavItem href="/partenaires"')
  })

  it('uses accessible menu semantics and matching mobile discovery', () => {
    expect(navbar).toContain('aria-haspopup="true"')
    expect(navbar).toContain('aria-expanded={collabOpen}')
    expect(navbar).toContain('aria-controls="collab-menu"')
    expect(navbar).toContain('mobile-collab-sub')
  })
})
