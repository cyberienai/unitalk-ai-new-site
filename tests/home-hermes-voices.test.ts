import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/home/section-hermes-voices.tsx', import.meta.url), 'utf8')

describe('home Hermes social proof', () => {
  it('connects Hermes to the AI Collaborator promise in plain language', () => {
    expect(source).toContain('Des créateurs indépendants présentent le moteur open source utilisé par les Collaborateurs IA.')
    expect(source).not.toContain('socle agentique open source individuel')
  })

  it('keeps commercial affiliation wording out of the editorial proof block', () => {
    expect(source).not.toContain('Créateurs affiliés Unitalk')
    expect(source).not.toContain('Leurs auteurs ne recommandent pas nécessairement Unitalk')
  })

  it('turns every portrait into a visible proof entry', () => {
    expect(source).toContain('HERMES_CREATORS.slice(0, 10)')
    expect(source).toContain('Voir son test →')
    expect(source).toContain('referrerPolicy="no-referrer"')
  })
})
