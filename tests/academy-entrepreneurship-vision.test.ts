import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/academy/entreprendre-avec-ia/page.tsx', import.meta.url), 'utf8')

describe('Academy entrepreneurship vision', () => {
  it('explains the shift from hours to leveraged capacity', () => {
    expect(page).toContain('Une personne peut désormais piloter la capacité d’une équipe.')
    expect(page).toContain('Le revenu peut se découpler du temps. La responsabilité, non.')
    expect(page).toContain('Temps humain')
    expect(page).toContain('Capacités IA')
  })

  it('balances opportunity with human responsibility and commoditization risk', () => {
    expect(page).toContain('Risque de banalisation')
    expect(page).toContain('Ce qui reste profondément humain')
    expect(page).toContain('Les revenus ne sont jamais garantis.')
  })

  it('offers sector entry points and a concrete first mission', () => {
    for (const sector of ['Création de contenu', 'Développement logiciel', 'E-commerce', 'Conseil']) expect(page).toContain(sector)
    expect(page).toContain('/academy/missions?q=')
    expect(page).toContain('/parcours/entreprendre-avec-ia')
  })
})
