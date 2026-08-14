import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const gateway = readFileSync(new URL('../components/ai-gateway-content.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/ai-gateway/page.tsx', import.meta.url), 'utf8')
const pricing = readFileSync(new URL('../components/pricing/pricing-sections.tsx', import.meta.url), 'utf8')

describe('Unitalk AI Gateway publication', () => {
  it('publishes the gateway instead of a coming-soon page', () => {
    expect(page).toContain('AiGatewayContent')
    expect(page).not.toContain('ComingSoonContent')
    expect(gateway).toContain('Un seul accès gouverné à vos modèles d’IA.')
  })

  it('documents LiteLLM attribution and access modes', () => {
    expect(gateway).toContain('Basé sur LiteLLM')
    expect(gateway).toContain('licence MIT')
    for (const mode of ['Crédits Unitalk', 'BYOK', 'Hybride']) expect(gateway).toContain(mode)
  })

  it('discloses Hermes and Gateway foundations on pricing', () => {
    expect(pricing).toContain('Système d’exploitation agentique')
    expect(pricing).toContain('Hermes Agent est un projet open source de Nous Research distribué sous licence MIT')
    expect(pricing).toContain('Unitalk AI Gateway')
  })
})
