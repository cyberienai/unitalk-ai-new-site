import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const gateway = readFileSync(new URL('../components/ai-gateway-content.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/ai-gateway/page.tsx', import.meta.url), 'utf8')

describe('Unitalk AI Gateway publication', () => {
  it('publishes the gateway instead of a coming-soon page', () => {
    expect(page).toContain('AiGatewayContent')
    expect(page).not.toContain('ComingSoonContent')
    expect(gateway).toContain('Un accès gouverné à tous les modèles autorisés.')
  })

  it('documents gateway control and access modes', () => {
    expect(gateway).toContain('Routage intelligent')
    expect(gateway).toContain('Repli automatique')
    expect(gateway).toContain('Clés virtuelles')
    expect(gateway).toContain('Observabilité')
    expect(gateway).toContain('Budgets et limites')
  })

  it('links to the model catalog and capacity without duplicating them', () => {
    expect(gateway).toContain('href="/marketplace/modeles-ia"')
    expect(gateway).toContain('href="/capacite-ia"')
    expect(gateway).not.toContain('const MODELS')
    expect(gateway).not.toContain('Crédits Unitalk')
    expect(gateway).not.toContain('BYOK')
  })

  it('explains centralized policy and technical responsibility', () => {
    expect(gateway).toContain('Une politique commune à toute l’entreprise.')
    expect(gateway).toContain('Gérez les fournisseurs autorisés, les clés, les routes, les budgets et les limites')
    expect(gateway).toContain('Une passerelle, pas un verrou.')
  })
})
