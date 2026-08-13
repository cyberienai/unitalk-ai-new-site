import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hero = readFileSync(new URL('../components/home/hero-home.tsx', import.meta.url), 'utf8')
const comparison = readFileSync(new URL('../components/home/section-comparison.tsx', import.meta.url), 'utf8')
const profiles = readFileSync(new URL('../components/home/section-profiles-early.tsx', import.meta.url), 'utf8')
const theatre = readFileSync(new URL('../components/home/hero-theatre.tsx', import.meta.url), 'utf8')

describe('home commercial messaging', () => {
  it('uses a concrete hero promise and recruitment reasons', () => {
    expect(hero).toContain('Confiez-lui vos appels, emails, prospects, analyses ou tâches administratives.')
    for (const reason of ['24/7', 'Opérationnel rapidement', 'Plusieurs compétences', 'Coût prévisible', 'Mémoire de l’entreprise', 'Humain dans la boucle']) expect(hero).toContain(reason)
  })

  it('uses plain-language comparison rows', () => {
    expect(comparison).toContain("['Exécute une tâche', 'Apprend votre façon de travailler']")
    expect(comparison).toContain("['Fonctionne dans son outil', 'Travaille avec vos applications']")
    expect(comparison).toContain("['Résultat ponctuel', 'Expérience conservée']")
  })

  it('clarifies Alma and brings profiles earlier', () => {
    expect(profiles).toContain('Alma vous aide à définir la mission et configure le bon Collaborateur IA.')
    expect(profiles).toContain('Le Collaborateur IA exécute.')
    expect(theatre).not.toContain('Alma · Conseillère IA · Unitalk')
    expect(theatre).toContain('Alma · Coordinatrice de missions · Unitalk')
  })
})
