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
    for (const claim of ['Hermes fonctionne.', 'Unitalk gère', 'Votre entreprise contrôle', 'Sauvegarde et reprise', 'Sécurité et isolation']) expect(content).toContain(claim)
  })

  it('covers hosting choice and complementary services', () => {
    expect(content).toContain('Unitalk AI Cloud ou un fournisseur compatible.')
    expect(content).toContain('Le serveur héberge. Hermes exécute. Unitalk organise.')
    expect(content).toContain('Profils métier et compétences compatibles')
    expect(content).toContain('Tout n’est pas interchangeable.')
  })

  it('shows an operational console without making universal SLA claims', () => {
    for (const claim of ['Dernière sauvegarde', 'Version Hermes', 'Région', 'État du service', 'Supervision']) expect(content).toContain(claim)
    expect(content).toContain('selon l’offre et l’hébergement choisis')
  })
})
