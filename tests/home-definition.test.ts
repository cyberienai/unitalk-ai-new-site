import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/home/section-definition.tsx', import.meta.url), 'utf8')

describe('home seven-day trial progression', () => {
  it('shows the real mission trial in chronological order', () => {
    const describe = source.indexOf("title: 'Décrivez la mission'")
    const preparation = source.indexOf("title: 'Alma prépare la mission'")
    const work = source.indexOf("title: 'Le Collaborateur IA travaille'")
    const result = source.indexOf("title: 'Vous validez le résultat'")
    expect(describe).toBeLessThan(preparation)
    expect(preparation).toBeLessThan(work)
    expect(work).toBeLessThan(result)
  })

  it('makes Alma preparation and human approval explicit', () => {
    expect(source).toContain('En 7 jours, testez une mission réelle.')
    expect(source).toContain("avatar: '/alma-avatar.png'")
    expect(source).toContain('Alma, Coordinatrice IA de missions')
    expect(source).toContain('profil métier, les compétences, les applications et les validations')
    expect(source).toContain('soumet les étapes sensibles à votre validation')
  })

  it('uses four columns on desktop and two on tablet', () => {
    expect(source).toContain('md:grid-cols-2 lg:grid-cols-4')
    expect(source).toContain('Essai gratuit de 7 jours pour tester une première mission sans carte bancaire')
  })
})
