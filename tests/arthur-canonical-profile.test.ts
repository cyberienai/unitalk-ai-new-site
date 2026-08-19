import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const content = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')

describe('Arthur canonical public profile', () => {
  it('uses one concrete engineering mission in the hero and final CTA', () => {
    expect(content).toContain('Arthur prépare le correctif de votre prochain bug prioritaire.')
    expect(content).toContain('Corriger mon bug prioritaire')
    expect(content).toContain('Préparer le correctif avec Arthur')
    expect(content).not.toContain('Quelle mission souhaitez-vous confier à Arthur ?')
  })
})
