import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const hero = readFileSync(new URL('../components/home/hero-hybrid.tsx', import.meta.url), 'utf8')
const sections = readFileSync(new URL('../components/home/home-final-sections.tsx', import.meta.url), 'utf8')
const home = readFileSync(new URL('../components/home-new.tsx', import.meta.url), 'utf8')
const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('home commercial messaging', () => {
  it('uses a concrete organizational promise and an Alma personalization flow', () => {
    expect(hero).toContain('Votre propre Collaborateur IA')
    expect(hero).toContain('Prêt à accomplir vos missions.')
    expect(hero).toContain('Alma le personnalise selon vos besoins, vos outils et les règles de votre entreprise.')
    expect(hero).toContain("voiceTitle: 'Quel travail voulez-vous lui confier ?'")
    expect(hero).toContain('Personnaliser mon Collaborateur IA')
    expect(hero).not.toContain('voiceSubmitEmpty')
    for (const proof of ['Première mission offerte', 'Sans carte bancaire', 'Sans engagement']) expect(hero).toContain(proof)
  })

  it('explains identity, organization and evolution without a separate comparison', () => {
    for (const copy of ['Identité', 'Communication', 'Agent Hermes et serveur privé', 'Responsable, rattachement et droits']) expect(sections).toContain(copy)
    for (const copy of ["['Profil métier', 'Finance']", "['Compétence', 'Relancer une facture']", "['Application', 'Outil de facturation']", 'Nouvelles missions possibles']) expect(sections).toContain(copy)
    expect(home).not.toContain('SectionComparison')
    expect(home).not.toContain('SectionProfilesEarly')
  })

  it('clarifies Alma and provides four visitor paths', () => {
    for (const path of ['J’ai un travail à confier', 'Je veux comprendre le produit', 'Je veux voir comment il travaille', 'Je veux voir comment il évolue']) expect(sections).toContain(path)
    expect(navbar).not.toContain('Alma · Conseillère IA')
    expect(hero).toContain("voiceKicker: 'Coordinatrice de missions IA Unitalk'")
  })
})
