import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/tarifs/page.tsx', import.meta.url), 'utf8')
const sections = readFileSync(new URL('../components/pricing/pricing-sections.tsx', import.meta.url), 'utf8')
const faq = readFileSync(new URL('../components/pricing/pricing-faq-final.tsx', import.meta.url), 'utf8')

describe('pricing simplification', () => {
  it('presents the organization license as a flat fee rather than per-seat pricing', () => {
    expect(sections).toContain('jamais par siège.')
    expect(sections).toContain('Assistants IA privés ou partagés illimités')
    expect(sections).toContain('Intégrations sécurisées avec plus de 3 000 applications')
    expect(sections).toContain('Accès unifié aux modèles multimodaux autorisés')
    expect(sections).toContain("users: '1 utilisateur', price: '0 €'")
    expect(sections).toContain("users: 'Jusqu’à 10 utilisateurs', price: '49 €'")
    expect(sections).toContain("users: 'Jusqu’à 100 utilisateurs', price: '299 €'")
    expect(sections).toContain('par entreprise / mois')
  })

  it('makes the AI Collaborator package explicit', () => {
    expect(sections).toContain('49 € par mois, par Collaborateur IA.')
    for (const inclusion of ['Identité et mémoire', 'Email, calendrier et téléphone', 'Instance Hermes dédiée', '1 million de tokens inclus', '60 minutes de téléphone incluses']) expect(sections).toContain(inclusion)
  })

  it('offers prepaid credits, BYOK and hybrid usage', () => {
    expect(sections).toContain("name: 'Crédits Unitalk', price: 'Dès 25 €'")
    expect(sections).toContain("name: 'BYOK', price: '0 € chez Unitalk'")
    expect(sections).toContain("name: 'Hybride', price: 'À la carte'")
    expect(sections).toContain('Les crédits couvrent les modèles IA, les API externes et les minutes de téléphone supplémentaires.')
    expect(sections).toContain('href="/credits"')
  })

  it('keeps the page focused and removes the configurator', () => {
    expect(page).toContain('<PricingHero />')
    expect(page).toContain('<PricingCollaboration />')
    expect(page).not.toContain('PricingConfigurator')
    expect(faq).toContain('L’essentiel, sans astérisque.')
  })

  it('makes the free first mission limits explicit', () => {
    expect(sections).toContain('7 jours maximum')
    expect(sections).toContain('1 million de tokens')
    expect(sections).toContain("trialTitle: 'Un vrai Collaborateur IA. Une vraie mission. 0 €.'")
    expect(faq).toContain('selon la première limite atteinte')
  })
})
