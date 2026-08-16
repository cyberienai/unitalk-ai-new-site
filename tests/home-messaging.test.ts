import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hero = readFileSync(new URL('../components/home/hero-hybrid.tsx', import.meta.url), 'utf8')
const comparison = readFileSync(new URL('../components/home/section-comparison.tsx', import.meta.url), 'utf8')
const profiles = readFileSync(new URL('../components/home/section-profiles-early.tsx', import.meta.url), 'utf8')
const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('home commercial messaging', () => {
  it('uses a concrete hero promise and recruitment reasons', () => {
    expect(hero).toContain('Confiez-lui vos appels, emails, prospects, analyses ou tâches administratives.')
    for (const proof of ['7 jours pour tester une vraie mission', 'Sans carte bancaire', '1 million de tokens inclus']) expect(hero).toContain(proof)
  })

  it('uses plain-language comparison rows', () => {
    expect(comparison).toContain("['Exécute une tâche', 'Apprend votre façon de travailler']")
    expect(comparison).toContain("['Fonctionne dans son outil', 'Travaille avec vos applications']")
    expect(comparison).toContain("['Résultat ponctuel', 'Expérience conservée']")
  })

  it('clarifies Alma and brings profiles earlier', () => {
    expect(profiles).toContain('Alma cadre votre besoin et prépare le Collaborateur IA adapté à votre mission.')
    expect(profiles).toContain("recruit: 'Configurer'")
    expect(navbar).not.toContain('Alma · Conseillère IA')
    expect(navbar).toContain('Alma · Coordinatrice de missions IA')
  })
})
