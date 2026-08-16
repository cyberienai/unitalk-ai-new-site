import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hero = readFileSync(new URL('../components/home/hero-hybrid.tsx', import.meta.url), 'utf8')
const comparison = readFileSync(new URL('../components/home/section-comparison.tsx', import.meta.url), 'utf8')
const profiles = readFileSync(new URL('../components/home/section-profiles-early.tsx', import.meta.url), 'utf8')
const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('home commercial messaging', () => {
  it('uses a concrete hero promise and recruitment reasons', () => {
    expect(hero).toContain('Confiez-lui vos appels, vos e-mails, votre prospection, vos analyses et vos tâches administratives.')
    for (const proof of ['Essai gratuit sur une première mission', 'Préparée en quelques minutes', 'Sans carte bancaire', 'Hébergé en France']) expect(hero).toContain(proof)
  })

  it('uses plain-language comparison rows', () => {
    expect(comparison).toContain("['Un outil individuel et isolé', 'Une identité rattachée à une personne, une équipe ou l’organisation']")
    expect(comparison).toContain("['Répond dans son interface', 'Prend en charge des missions et communique par e-mail, téléphone et calendrier']")
    expect(comparison).toContain("['Conserve le fil d’une conversation', 'Partage avec l’entreprise une mémoire gouvernée selon les droits']")
  })

  it('clarifies Alma and brings profiles earlier', () => {
    expect(profiles).toContain('Alma cadre votre besoin et prépare le Collaborateur IA adapté à votre mission.')
    expect(profiles).toContain("recruit: 'Choisir'")
    expect(navbar).not.toContain('Alma · Conseillère IA')
    expect(navbar).toContain('Alma · Coordinatrice de missions IA')
  })
})
