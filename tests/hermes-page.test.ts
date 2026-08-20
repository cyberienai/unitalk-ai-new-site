import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/hermes/page.tsx', import.meta.url), 'utf8')
const content = readFileSync(new URL('../components/hermes-content.tsx', import.meta.url), 'utf8')
const collaborators = readFileSync(new URL('../components/collaborateurs-ia/collaborateur-experience.tsx', import.meta.url), 'utf8')
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')

describe('Hermes infrastructure page', () => {
  it('has dedicated metadata and navigation', () => {
    expect(page).toContain("canonical: '/hermes'")
    expect(sitemap).toContain("'/hermes'")
    expect(collaborators).toContain('href="/hermes"')
  })

  it('explains the operated infrastructure', () => {
    for (const claim of ['Une instance Hermes et un serveur dédiés', 'Mises à jour maîtrisées', 'Sauvegardes et restauration', 'Disponibilité et SLA', 'Sécurité et surveillance']) expect(content).toContain(claim)
  })

  it('covers hosting choice and complementary services', () => {
    expect(content).toContain('Unitalk AI Cloud ou le fournisseur de votre choix.')
    expect(content).toContain('Plus de 3 000 applications')
    expect(content).toContain('Plusieurs agents peuvent contribuer à une même mission.')
    expect(content).toContain('Importez ou exportez les profils métier et les compétences compatibles.')
  })
})
