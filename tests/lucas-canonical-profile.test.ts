import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const content = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')

describe('Lucas canonical public profile', () => {
  it('uses one concrete operations mission in the hero and final CTA', () => {
    expect(content).toContain('Lucas met à jour le suivi de votre prochain projet transverse.')
    expect(content).toContain('Suivre mon projet transverse')
    expect(content).toContain('Suivre mon projet avec Lucas')
  })
})
