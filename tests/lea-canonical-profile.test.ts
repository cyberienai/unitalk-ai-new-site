import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const content = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')

describe('Léa canonical public profile', () => {
  it('uses one concrete editorial starting mission in the hero and final CTA', () => {
    expect(content).toContain('Léa prépare votre prochain calendrier éditorial.')
    expect(content).toContain('Construire mon calendrier éditorial')
    expect(content).toContain('Construire mon calendrier avec Léa')
    expect(content).not.toContain('Quelle mission souhaitez-vous confier à Léa ?')
  })
})
