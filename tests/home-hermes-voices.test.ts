import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/home/section-hermes-voices.tsx', import.meta.url), 'utf8')

describe('home Hermes social proof', () => {
  it('connects Hermes to the AI Collaborator promise in plain language', () => {
    expect(source).toContain('des créateurs indépendants explorent le moteur open source Hermes.')
    expect(source).not.toContain('socle agentique open source individuel')
  })

  it('keeps commercial affiliation wording out of the editorial proof block', () => {
    expect(source).not.toContain('Créateurs affiliés Unitalk')
    expect(source).toContain('10 tests, cours, démonstrations et entretiens publics.')
  })

  it('turns every portrait into a visible proof entry', () => {
    expect(source).toContain('HERMES_CREATORS.slice(0, 5)')
    expect(source).toContain('Voir son test →')
    expect(source).toContain('referrerPolicy="no-referrer"')
  })
})
