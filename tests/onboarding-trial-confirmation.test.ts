import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/discover/screen-collaborateur.tsx', import.meta.url), 'utf8')

describe('onboarding trial confirmation', () => {
  it('adds a compact confirmation after choosing a first name', () => {
    expect(source).toContain('setConfirming(true)')
    expect(source).toContain('est prêt pour sa première mission.')
    expect(source).toContain('Continuer vers les tarifs')
  })

  it('makes the free mission and activation conditions explicit', () => {
    for (const wording of ['Première mission offerte', 'Sans carte bancaire', 'Rien ne devient payant sans votre accord', 'Aucune application n’est connectée automatiquement']) expect(source).toContain(wording)
    expect(source).not.toContain('7 jours d’essai')
  })

  it('allows the user to go back before opening the Workspace', () => {
    expect(source).toContain("back: 'Modifier le prénom'")
    expect(source).toContain('onBack={() => setConfirming(false)}')
  })
})
