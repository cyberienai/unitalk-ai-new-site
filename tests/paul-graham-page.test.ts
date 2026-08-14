import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hero = readFileSync(new URL('../components/paul-graham/paul-graham-hero.tsx', import.meta.url), 'utf8')
const footer = readFileSync(new URL('../components/paul-graham/paul-graham-footer.tsx', import.meta.url), 'utf8')

describe('Paul Graham landing page', () => {
  it('starts from concrete work without passive-income promises', () => {
    expect(hero).toContain('Votre savoir-faire ne devrait pas s’arrêter quand vous fermez votre ordinateur.')
    expect(hero).toContain('Quel travail voulez-vous ne plus accomplir seul ?')
    expect(hero).not.toContain('rentier')
  })

  it('uses real voice dictation and persists the mission draft', () => {
    expect(hero).toContain('webkitSpeechRecognition')
    expect(hero).toContain('aria-pressed={listening}')
    expect(hero).toContain('localStorage.setItem(`unitalk_mission_${draftId}`')
    expect(hero).toContain('/decouvrir?${query}')
  })

  it('does not pretend to analyze or create the product before signup', () => {
    expect(hero).not.toContain('analyzeDomain')
    expect(hero).not.toContain('setTimeout')
    expect(hero).not.toContain('Création de votre collaborateur')
    expect(footer).toContain('/mentions-legales')
    expect(footer).not.toContain('href: "/legal"')
  })
})
