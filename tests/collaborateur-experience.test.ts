import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/collaborateurs-ia/collaborateur-experience.tsx', import.meta.url), 'utf8')

describe('CollaborateurExperience', () => {
  it('starts with a directly actionable mission composer', () => {
    expect(source).toContain('Décrivez le travail à faire.')
    expect(source).toContain('<AlmaMissionComposer')
    expect(source).toContain('Préparer cette mission')
    expect(source).toContain('/decouvrir?draft=')
    expect(source).toContain('source=collaborateurs-ia')
  })

  it('uses canonical collaborator and mission catalogs', () => {
    expect(source).toContain("const EXAMPLE_SLUGS = ['hugo', 'emma', 'ines']")
    expect(source).toContain('ROLE_DETAILS[slug]')
    expect(source).toContain('MISSIONS.find')
    expect(source).toContain('collaboratorHref(detail.slug)')
    expect(source).toContain('STATUS_LABELS[mission.status][lang]')
  })

  it('explains the mission before infrastructure', () => {
    for (const claim of ['Résultat attendu', 'Profil responsable', 'Accès autorisés', 'Décisions humaines']) expect(source).toContain(claim)
    expect(source).toContain('/collaborateurs-ia/comparatif')
  })

  it('proves work through a clearly fictional interactive mission', () => {
    for (const claim of ['Démonstration fictive · Aucune action réelle', 'Qualifier les prospects entrants', 'Décision humaine requise']) expect(source).toContain(claim)
    expect(source).toContain("useState<'approved' | 'changed' | 'declined' | null>")
    expect(source).toContain('role="status"')
  })

  it('connects continuity to profiles and skills', () => {
    expect(source).toContain('Le résultat est livré. L’expérience reste gouvernée.')
    expect(source).toContain('/collaborateurs-ia/profils-metier')
    expect(source).toContain('/collaborateurs-ia/competences')
  })

  it('keeps architecture claims linked to documentation', () => {
    for (const href of ['/documentation/licence-collaborateur-ia', '/architecture', '/ai-gateway']) expect(source).toContain(href)
    expect(source).toContain('Hermes sous licence MIT')
  })

  it('provides an accessible FAQ and final mission-first CTA', () => {
    expect(source).toContain('<details')
    expect(source).toContain('<summary')
    expect(source).toContain('Décrire ma mission')
    expect(source).not.toContain('IntersectionObserver')
  })
})
