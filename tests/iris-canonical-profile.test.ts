import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const content = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')

describe('Iris canonical public profile', () => {
  it('uses one concrete product mission in the hero and final CTA', () => {
    expect(content).toContain('Iris prépare la spécification de votre prochaine évolution produit.')
    expect(content).toContain('Préparer ma spécification produit')
    expect(content).toContain('Préparer ma spécification avec Iris')
    expect(content).not.toContain('Quelle mission souhaitez-vous confier à Iris ?')
  })
})
