import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const content = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')

describe('Inès canonical public profile', () => {
  it('uses one concrete customer support mission in the hero and final CTA', () => {
    expect(content).toContain('Inès prépare les réponses à vos demandes clients.')
    expect(content).toContain('Traiter mes demandes clients')
    expect(content).toContain('Traiter mes demandes avec Inès')
    expect(content).not.toContain('Quelle mission souhaitez-vous confier à Inès ?')
  })
})
