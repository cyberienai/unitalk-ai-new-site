import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/tarifs/page.tsx', import.meta.url), 'utf8')
const sections = readFileSync(new URL('../components/pricing/pricing-sections.tsx', import.meta.url), 'utf8')
const faq = readFileSync(new URL('../components/pricing/pricing-faq-final.tsx', import.meta.url), 'utf8')

describe('pricing simplification', () => {
  it('presents the organization license as a flat fee rather than per-seat pricing', () => {
    expect(sections).toContain('Aucun prix par siège.')
    expect(sections).toContain('Licence Workspace Unitalk')
    expect(sections).toContain('Assistants IA privés ou partagés illimités')
    expect(sections).toContain('3 000+ applications via Pipedream')
    expect(sections).toContain('Accès unifié aux modèles multimodaux autorisés')
    expect(sections).toContain("users: '1 utilisateur', price: 'Gratuit'")
    expect(sections).toContain("users: '2 à 10 utilisateurs', price: '49 €'")
    expect(sections).toContain("users: '11 à 100 utilisateurs', price: '299 €'")
    expect(sections).toContain('par entreprise / mois')
  })

  it('makes the AI Collaborator package explicit', () => {
    expect(sections).toContain('49 € par mois pour chaque identité')
    for (const inclusion of ['Identité et mémoire', 'Email, calendrier et téléphone', 'Instance Hermes dédiée', '1 million de tokens inclus', '60 minutes de téléphone incluses']) expect(sections).toContain(inclusion)
  })

  it('offers prepaid credits, BYOK and hybrid usage', () => {
    expect(sections).toContain('2 500 crédits IA / mois inclus')
    expect(sections).toContain('20 000 crédits IA / mois inclus')
    expect(sections).not.toContain("name: 'BYOK'")
    expect(sections).not.toContain("name: 'Hybride'")
    expect(sections).toContain('Les crédits financent les modèles IA, les API externes et les minutes de téléphone supplémentaires.')
    expect(sections).toContain('href="/credits"')
    expect(sections).toContain('const includedTokens = collaborators * unitalkPricing.aiCollaborator.includedTokens')
    expect(sections).toContain('const includedPhoneMinutes = collaborators * unitalkPricing.aiCollaborator.includedPhoneMinutes')
  })

  it('keeps the page focused and removes the configurator', () => {
    expect(page).toContain('<PricingHero />')
    expect(page).toContain('<PricingCollaboration />')
    expect(page).not.toContain('PricingConfigurator')
    expect(faq).toContain('L’essentiel, sans astérisque.')
    expect(faq).toContain('À qui peut être rattaché un Collaborateur IA ?')
    expect(faq).toContain('Is Hermes a black box?')
    expect(faq).toContain('exporter vos données, vos profils métier, vos compétences et vos configurations')
    expect(faq).toContain('Telegram, Discord, Slack, Google Chat, WhatsApp, WhatsApp Cloud API, Signal, SMS, Email')
    expect(faq).toContain('Terminal / CLI')
    expect(faq).toContain('recevoir et passer des appels téléphoniques')
    expect(sections).toContain('const subscriptionTotal = organizationPrice + collaborators * unitalkPricing.aiCollaborator.monthlyPrice')
    expect(sections).toContain('value={organizationTier}')
    expect(sections).toContain('aria-live="polite"')
    expect(sections).toContain('persistPricingDraft({ organizationTier, collaborators')
  })

  it('makes the free first mission limits explicit', () => {
    expect(sections).not.toContain('7 jours')
    expect(sections).toContain("reassurance: ['Première mission offerte', 'Sans carte bancaire', 'Sans engagement', 'Accompagnement humain si nécessaire']")
    expect(sections).toContain('<Kicker>{t.kicker}</Kicker>')
    expect(sections).toContain('href="/marketplace/collaborateurs-ia"')
    expect(sections).toContain('href="/missions"')
    expect(faq).toContain('selon la première limite atteinte')
  })
})
