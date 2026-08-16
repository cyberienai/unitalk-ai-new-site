import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hero = readFileSync(new URL('../components/home/hero-hybrid.tsx', import.meta.url), 'utf8')
const comparison = readFileSync(new URL('../components/home/section-comparison.tsx', import.meta.url), 'utf8')
const profiles = readFileSync(new URL('../components/home/section-profiles-early.tsx', import.meta.url), 'utf8')
const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('home commercial messaging', () => {
  it('uses a concrete hero promise and recruitment reasons', () => {
    expect(hero).toContain('Confiez-lui vos appels, vos e-mails, votre prospection ou vos tâches administratives.')
    expect(hero).toContain('Il travaille avec vos équipes')
    for (const proof of ['Votre première mission offerte', 'Alma la prépare en quelques minutes', 'Sans carte bancaire', 'Hébergement en France']) expect(hero).toContain(proof)
  })

  it('uses plain-language comparison rows', () => {
    expect(comparison).toContain('Une identité qui agit dans vos outils')
    expect(comparison).toContain('Une mémoire durable, privée et partagée')
    expect(comparison).toContain('Applique vos règles métier et vous soumet les étapes sensibles')
  })

  it('clarifies Alma and brings profiles earlier', () => {
    expect(profiles).toContain('Alma vous aide à trouver celui qui convient à votre mission.')
    expect(profiles).toContain("choose: 'Choisir'")
    expect(navbar).not.toContain('Alma · Conseillère IA')
    expect(hero).toContain("voiceKicker: 'Coordinatrice IA de missions'")
  })
})
