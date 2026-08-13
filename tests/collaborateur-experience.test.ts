import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/collaborateurs-ia/collaborateur-experience.tsx', import.meta.url), 'utf8')

describe('CollaborateurExperience', () => {
  it('uses accessible tabs for the five work formats', () => {
    expect(source).toContain('role="tablist"')
    expect(source).toContain('role="tab"')
    expect(source).toContain('aria-selected={active === key}')
    expect(source).toContain('role="tabpanel"')
    expect(source).toContain("['text', 'image', 'audio', 'video', 'code']")
  })

  it('does not publish obsolete pricing and application claims', () => {
    expect(source).not.toContain('1 million de tokens')
    expect(source).not.toContain('98 €/mois')
    expect(source).not.toContain('3 000 applications')
    expect(source).not.toContain('Créer mon Collaborateur IA')
    expect(source).not.toContain('Donnez-lui un prénom')
  })

  it('distinguishes Code from Terminal and starts with a mission', () => {
    expect(source).toContain('Code désigne un format de production et un savoir-faire')
    expect(source).toContain('Le Terminal est un moyen d’exécution')
    expect(source).toContain('Tout commence par une mission.')
    expect(source).toContain('href="/missions"')
  })
})
