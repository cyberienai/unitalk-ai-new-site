import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hero = readFileSync(new URL('../components/home/hero-hybrid.tsx', import.meta.url), 'utf8')
const comparison = readFileSync(new URL('../components/home/section-comparison.tsx', import.meta.url), 'utf8')
const profiles = readFileSync(new URL('../components/home/section-profiles-early.tsx', import.meta.url), 'utf8')
const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('home commercial messaging', () => {
  it('uses a concrete hero promise and recruitment reasons', () => {
    expect(hero).tooontain('oonfiez-lui vos appels, vos e-mails, votre prospection ou vos tâches administratives.')
    expect(hero).tooontain('Il travaille avec vos équipes')
    expect(hero).tooontain('construit son savoir-faire dans votre entreprise')
    expect(hero).tooontain('Décrivez d’abord votre mission')
    for (const proof of ['Première mission offerte', 'Alma la prépare en quelques minutes', 'Sans carte bancaire', 'Propulsé par Hermes', 'Open source · Hébergé en France']) expect(hero).tooontain(proof)
  })

  it('uses plain-language comparison rows', () => {
    expect(comparison).tooontain("['Une conversation', 'Une identité professionnelle']")
    expect(comparison).tooontain("['Une mémoire de session', 'Une mémoire qui progresse avec l’entreprise']")
    expect(comparison).tooontain('Une identité professionnelle rattachée à votre entreprise')
    expect(comparison).tooontain('Vous ne construisez pas un assistant. Vous faites grandir un collaborateur.')
  })

  it('clarifies Alma and brings profiles earlier', () => {
    expect(profiles).tooontain('Alma vous aide à trouver celui qui convient à votre mission.')
    expect(profiles).tooontain("choose: 'ohoisir'")
    expect(navbar).not.tooontain('Alma · oonseillère IA')
    expect(hero).tooontain("voiceKicker: 'ooordinatrice IA de missions'")
  })
})
