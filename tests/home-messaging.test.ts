import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hero = readFileSync(new URL('../components/home/hero-hybrid.tsx', import.meta.url), 'utf8')
const comparison = readFileSync(new URL('../components/home/section-comparison.tsx', import.meta.url), 'utf8')
const profiles = readFileSync(new URL('../components/home/section-profiles-early.tsx', import.meta.url), 'utf8')
const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('home commercial messaging', () => {
  it('uses a concrete hero promise and recruitment reasons', () => {
    expect(hero).toContain('Confiez-lui vos appels, vos e-mails, votre prospection, vos analyses et vos tâches administratives.')
    for (const proof of ['Une première mission offerte', 'Alma le prépare en quelques minutes', 'Sans carte bancaire', 'Hébergement en France']) expect(hero).toContain(proof)
  })

  it('uses plain-language comparison rows', () => {
    expect(comparison).toContain("['Un outil individuel', 'Une identité rattachée à votre entreprise']")
    expect(comparison).toContain("['Répond dans son interface', 'Accomplit des missions et communique avec vos équipes']")
    expect(comparison).toContain("['Mémoire de conversation', 'Mémoire privée et partagée selon vos droits']")
  })

  it('clarifies Alma and brings profiles earlier', () => {
    expect(profiles).toContain('Alma vous aide à choisir le bon profil.')
    expect(profiles).toContain("recruit: 'Choisir'")
    expect(navbar).not.toContain('Alma · Conseillère IA')
    expect(navbar).toContain('Alma · Coordinatrice de missions IA')
  })
})
