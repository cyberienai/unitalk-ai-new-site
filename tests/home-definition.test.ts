import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/home/home-final-sections.tsx', import.meta.url), 'utf8')
const home = readFileSync(new URL('../components/home-new.tsx', import.meta.url), 'utf8')

describe('home visitor orientation', () => {
  it('offers four explicit intent doors', () => {
    for (const href of ['/missions', '/collaborateurs-ia', '/workspace', '/marketplace']) expect(source).toContain(href)
    expect(source).toContain("aria-label={lang === 'fr' ? 'Choisir un parcours'")
  })

  it('keeps one focused final conversion action', () => {
    expect(source).toContain('Un Collaborateur IA sur lequel votre entreprise peut compter.')
    expect(source).toContain('Décrire mon besoin')
    expect(source).toContain("new Event('open-home-alma')")
  })

  it('uses the agreed compact homepage order', () => {
    const render = home.slice(home.indexOf('return ('))
    const doors = render.indexOf('<HomeIntentDoors')
    const anatomy = render.indexOf('<HomeCollaboratorAnatomy')
    const workspace = render.indexOf('<SectionWorkspace')
    const evolution = render.indexOf('<HomeEvolution')
    const hermes = render.indexOf('<SectionHermesVoices')
    const finalCta = render.indexOf('<HomeFinalCta')
    expect(doors).toBeLessThan(workspace)
    expect(workspace).toBeLessThan(anatomy)
    expect(anatomy).toBeLessThan(evolution)
    expect(evolution).toBeLessThan(hermes)
    expect(hermes).toBeLessThan(finalCta)
  })
})
