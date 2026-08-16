import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hero = readFileSync(new URL('../components/home/hero-hybrid.tsx', import.meta.url), 'utf8')
const comparison = readFileSync(new URL('../components/home/section-comparison.tsx', import.meta.url), 'utf8')
const profiles = readFileSync(new URL('../components/home/section-profiles-early.tsx', import.meta.url), 'utf8')
const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('home commercial messaging', () => {
  it('uses a concrete hero promise and recruitment reasons', () => {
    expect(hero).toContain('Confiez-lui vos appels, vos e-mails, votre prospection, vos analyses et vos tâches administratives.')
    for (const proof of ['7 jours pour tester une vraie mission', 'Sans carte bancaire', '1 million de tokens inclus', 'Hébergé en France']) expect(hero).toContain(proof)
  })

  it('uses plain-language comparison rows', () => {
    expect(comparison).toContain("['Répond à une demande', 'Prend en charge une mission']")
    expect(comparison).toContain("['Reste dans son interface', 'Agit dans vos applications autorisées']")
    expect(comparison).toContain("['Suit vos instructions', 'Apprend vos méthodes validées']")
  })

  it('clarifies Alma and brings profiles earlier', () => {
    expect(profiles).toContain('Alma cadre votre besoin et prépare le Collaborateur IA adapté à votre mission.')
    expect(profiles).toContain("recruit: 'Choisir'")
    expect(navbar).not.toContain('Alma · Conseillère IA')
    expect(navbar).toContain('Alma · Coordinatrice de missions IA')
  })
})
