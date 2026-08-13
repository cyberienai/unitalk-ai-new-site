import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/home/section-definition.tsx', import.meta.url), 'utf8')

describe('home four-step progression', () => {
  it('shows mission, preparation, work and experience in order', () => {
    const mission = source.indexOf("label: 'La mission'")
    const preparation = source.indexOf("label: 'La préparation'")
    const work = source.indexOf("label: 'Le travail'")
    const experience = source.indexOf("label: 'L’expérience'")
    expect(mission).toBeLessThan(preparation)
    expect(preparation).toBeLessThan(work)
    expect(work).toBeLessThan(experience)
  })

  it('makes Alma preparation and human approval explicit', () => {
    expect(source).toContain('Alma prépare le Collaborateur IA.')
    expect(source).toContain('profil métier, les compétences, les applications et les validations')
    expect(source).toContain('soumet les étapes sensibles à votre validation')
  })

  it('uses four columns on desktop and two on tablet', () => {
    expect(source).toContain('md:grid-cols-2 lg:grid-cols-4')
    expect(source).toContain('[12.5, 37.5, 62.5, 87.5]')
  })
})
