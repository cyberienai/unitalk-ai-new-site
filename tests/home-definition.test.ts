import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/home/home-final-sections.tsx', import.meta.url), 'utf8')
const home = readFileSync(new URL('../components/home-new.tsx', import.meta.url), 'utf8')

describe('home visitor orientation', () => {
  it('offers four explicit intent doors', () => {
    for (const href of ['/missions', '/collaborateurs-ia', '/workspace', '/marketplace']) expect(source).toContain(href)
    expect(source).toContain('aria-labelledby="home-paths-title"')
    expect(source).toContain('className="sr-only"')
  })

  it('keeps one focused final conversion action', () => {
    expect(source).toContain('Quelle première mission allez-vous confier à votre\\u00a0Collaborateur\\u00a0IA ?')
    expect(source).toContain('Commencer gratuitement')
    expect(source).toContain('href="#alma-hero"')
  })

  it('uses the agreed compact homepage order', () => {
    const render = home.slice(home.indexOf('return ('))
    const doors = render.indexOf('<HomeIntentDoors')
    const anatomy = render.indexOf('<HomeCollaboratorAnatomy')
    const workspace = render.indexOf('<SectionWorkspace')
    const evolution = render.indexOf('<HomeEvolution')
    const finalCta = render.indexOf('<HomeFinalCta')
    expect(evolution).toBeLessThan(workspace)
    expect(workspace).toBeLessThan(anatomy)
    expect(anatomy).toBeLessThan(finalCta)
    expect(finalCta).toBeLessThan(doors)
  })
})
