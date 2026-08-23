import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8')

describe('homepage conversion flow', () => {
  it('explains the product flow and control model', () => {
    const home = read('../components/home-new.tsx')
    const process = read('../components/home/home-process.tsx')
    const guardrails = read('../components/home/home-guardrails.tsx')
    expect(home.indexOf('<HomeProcess')).toBeLessThan(home.indexOf('<SectionWorkspace'))
    expect(home.indexOf('<HomeGuardrails')).toBeLessThan(home.indexOf('<HomeFaq'))
    expect(process).toContain('De votre besoin au travail accompli.')
    expect(guardrails).toContain('Autonome sous votre supervision.')
  })

  it('labels fictional data and avoids putting mission text in the URL', () => {
    const workspace = read('../components/home/section-workspace.tsx')
    const hero = read('../components/home/hero-hybrid.tsx')
    expect(workspace).toContain('Données fictives')
    expect(hero).not.toContain("params.set('q'")
    expect(hero).toContain("params.set('draft', draftId)")
  })

  it('keeps the homepage FAQ focused', () => {
    const faq = read('../components/home/home-faq.tsx')
    expect(faq).toContain('Les réponses avant de commencer.')
    expect(faq.match(/^\s+\['/gm)).toHaveLength(14)
    expect(faq).not.toContain('Voir les 18 autres questions')
  })
})
