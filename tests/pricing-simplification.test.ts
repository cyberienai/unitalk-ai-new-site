import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/tarifs/page.tsx', import.meta.url), 'utf8')
const sections = readFileSync(new URL('../components/pricing/pricing-sections.tsx', import.meta.url), 'utf8')
const faq = readFileSync(new URL('../components/pricing/pricing-faq-final.tsx', import.meta.url), 'utf8')
const pricing = readFileSync(new URL('../lib/unitalk-pricing.ts', import.meta.url), 'utf8')

describe('pricing simplification', () => {
  it('presents the organization license as a flat fee rather than per-seat pricing', () => {
    expect(sections).toContain('Aucun prix par siège.')
    expect(sections).toContain('Licence Workspace Unitalk')
    expect(sections).toContain('Assistants d’équipe illimités')
    expect(sections).toContain('Workspace Web et Desktop')
    expect(sections).toContain('Disponible dans Slack, Teams, WhatsApp, Telegram…')
    expect(sections).toContain('Fonctionne avec plus de 3 000 applications')
    expect(sections).toContain('Accès aux dernières versions des modèles multimodaux')
    expect(sections).toContain('Interface unique de gestion des collaborateurs humains et IA : droits, validations et missions')
    expect(sections).toContain("users: '1 utilisateur', price: 'Gratuit'")
    expect(sections).toContain("users: '2 à 10 utilisateurs', price: '49 €/mois'")
    expect(sections).toContain("users: '11 à 100 utilisateurs', price: '299 €/mois'")
  })

  it('makes the AI Collaborator package explicit', () => {
    expect(sections).toContain("collaboratorPrice: '49 €/mois'")
    for (const inclusion of ['Identité et mémoire', 'Email, calendrier et téléphone', 'Instance Hermes dédiée', 'Profils métier et compétences illimités']) expect(sections).toContain(inclusion)
  })

  it('offers prepaid credits, BYOK and hybrid usage', () => {
    expect(pricing).toContain('includedCredits: 2_500')
    expect(pricing).toContain('includedCredits: 20_000')
    expect(sections).not.toContain("name: 'BYOK'")
    expect(sections).not.toContain("name: 'Hybride'")
    expect(sections).toContain('Vous ne payez que les services réellement utilisés.')
    expect(sections).toContain('href="/credits"')
    expect(sections).toContain('const includedTokens = collaborators * unitalkPricing.aiCollaborator.includedTokens')
    expect(sections).toContain('const includedPhoneMinutes = collaborators * unitalkPricing.aiCollaborator.includedPhoneMinutes')
  })

  it('keeps the page focused and removes the configurator', () => {
    expect(page).toContain('<PricingHero />')
    expect(page).toContain('<PricingCollaboration />')
    expect(page).not.toContain('PricingConfigurator')
    expect(faq).toContain('L’essentiel, sans astérisque.')
    expect(faq).toContain('Que comprend la Licence Workspace Unitalk ?')
    expect(faq).toContain('Puis-je exporter ce que mon entreprise construit ?')
    expect(faq).toContain('Hermes est open source')
    expect(faq).toContain('recevoir et passer des appels téléphoniques')
    expect(sections).toContain('const subscriptionTotal = organizationPrice + collaborators * unitalkPricing.aiCollaborator.monthlyPrice')
    expect(sections).toContain('value={organizationTier}')
    expect(sections).toContain('aria-live="polite"')
    expect(sections).toContain('persistPricingDraft({ organizationTier, collaborators')
    expect(sections).toContain("summaryTitle: 'Votre total'")
    expect(sections).toContain("continueWithTeam: 'Commencer avec cette équipe'")
    expect(sections).toContain("createWorkspace: 'Créer mon Workspace'")
  })

  it('makes the free first mission limits explicit', () => {
    expect(sections).not.toContain('7 jours')
    expect(sections).toContain("reassurance: ['Première mission offerte', 'Sans carte bancaire', 'Sans engagement']")
    expect(sections).toContain("humanSupport: 'Accompagnement humain si nécessaire'")
    expect(sections).toContain("kicker: 'Tarifs simples · Un forfait par entreprise'")
    expect(sections).toContain('href="/marketplace/collaborateurs-ia"')
    expect(sections).toContain('href="/missions"')
    expect(faq).toContain('selon la première limite atteinte')
  })
})
