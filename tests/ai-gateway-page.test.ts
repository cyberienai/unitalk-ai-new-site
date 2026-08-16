import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const gateway = readFileSync(new URL('../components/ai-gateway-content.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/ai-gateway/page.tsx', import.meta.url), 'utf8')

describe('Unitalk AI Gateway publication', () => {
  it('publishes the gateway instead of a coming-soon page', () => {
    expect(page).toContain('AiGatewayContent')
    expect(page).not.toContain('ComingSoonContent')
    expect(gateway).toContain('Un seul accès gouverné à vos modèles d’IA.')
  })

  it('documents gateway control and access modes', () => {
    expect(gateway).toContain('Routage intelligent')
    expect(gateway).toContain('Repli automatique')
    expect(gateway).toContain('Clés virtuelles')
    expect(gateway).toContain('Observabilité')
    for (const mode of ['Crédits Unitalk', 'BYOK', 'Hybride']) expect(gateway).toContain(mode)
  })
})
