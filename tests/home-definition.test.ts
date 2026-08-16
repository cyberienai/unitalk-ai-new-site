import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/home/section-definition.tsx', import.meta.url), 'utf8')

describe('home first mission progression', () => {
  it('shows the real mission in chronological order', () => {
    const describe = source.indexOf("title: 'Décrivez'")
    const preparation = source.indexOf("title: 'Alma prépare'")
    const work = source.indexOf("title: 'Il travaille'")
    const result = source.indexOf("title: 'Vous validez'")
    expect(describe).toBeLessThan(preparation)
    expect(preparation).toBeLessThan(work)
    expect(work).toBeLessThan(result)
  })

  it('centers the offer on a free first mission and human approval', () => {
    expect(source).toContain('Confiez une mission réelle.')
    expect(source).toContain('Décrivez votre besoin. Vous gardez le contrôle jusqu’au résultat.')
    expect(source).toContain('Décrire ma mission')
    expect(source).not.toContain('Première mission offerte, sans carte bancaire')
    expect(source).toContain("new Event('open-home-alma')")
    expect(source).toContain("avatar: '/alma-avatar.png'")
    expect(source).toContain('Objectif, profil, outils et validations.')
    expect(source).toContain('Le résultat et la suite.')
  })

  it('uses a lightweight four-step progression', () => {
    expect(source).toContain('md:grid-cols-2 lg:grid-cols-4')
    expect(source).toContain('border-t border-[#CFC5B5]')
    expect(source).not.toContain('rounded-3xl border border-[#DED6C8]')
  })
})
