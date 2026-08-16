import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hero = readFileSync(new URL('../components/home/hero-hybrid.tsx', import.meta.url), 'utf8')
const comparison = readFileSync(new URL('../components/home/section-comparison.tsx', import.meta.url), 'utf8')
const profiles = readFileSync(new URL('../components/home/section-profiles-early.tsx', import.meta.url), 'utf8')
const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('home commercial messaging', () => {
  it('uses a concrete hero promise and recruitment reasons', () => {
    expect(hero).toContain('Confiez-lui vos appels, vos e-mails, votre prospection ou vos tâches administratives.')
    expect(hero).toContain('Il travaille avec votre équipe et réutilise les méthodes que vous validez.')
    expect(hero).toContain("voiceTitle: 'Décrivez votre besoin.'")
    expect(hero).toContain("voiceBody: 'Alma prépare votre Collaborateur IA personnalisé.'")
    expect(hero).toContain('Continuer avec cette mission')
    expect(hero).not.toContain('voiceSubmitEmpty')
    for (const proof of ['Première mission offerte', 'Mission cadrée en quelques minutes', 'Sans carte bancaire']) expect(hero).toContain(proof)
  })

  it('uses plain-language comparison rows', () => {
    expect(comparison).toContain("['Une conversation ponctuelle', 'Une identité professionnelle durable']")
    expect(comparison).toContain("['Une mémoire de session', 'Des méthodes validées réutilisables']")
    expect(comparison).toContain('Des missions suivies dans votre Workspace')
    expect(comparison).toContain('Vous ne construisez pas un assistant. Vous faites progresser votre Collaborateur IA.')
  })

  it('clarifies Alma and brings profiles earlier', () => {
    expect(profiles).toContain('Alma vous aide à trouver celui qui convient à votre mission.')
    expect(profiles).toContain("choose: 'Configurer'")
    expect(navbar).not.toContain('Alma · Conseillère IA')
    expect(hero).toContain("voiceKicker: 'Coordinatrice de missions IA'")
  })
})
