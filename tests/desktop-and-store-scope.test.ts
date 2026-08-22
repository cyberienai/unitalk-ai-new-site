import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')
const marketplace = readFileSync(new URL('../app/marketplace/page.tsx', import.meta.url), 'utf8')
const config = readFileSync(new URL('../next.config.mjs', import.meta.url), 'utf8')
const store = readFileSync(new URL('../components/store-content.tsx', import.meta.url), 'utf8')

describe('Desktop discovery and Store scopes', () => {
  it('keeps the Desktop page discoverable', () => {
    expect(sitemap).toContain("'/desktop'")
  })

  it('centralizes applications in Marketplace and keeps legacy scopes explicit', () => {
    expect(marketplace).toContain('UnitalkStoreHub')
    expect(config).toContain("source: '/collaborateurs-ia/applications'")
    expect(config).toContain("source: '/collaborateurs-ia/integrations'")
    expect(config).toContain("destination: '/marketplace/applications'")
    expect(store).toContain('if (initialType) return')
    expect(store).toContain('showType={!initialType}')
    expect(store).toContain("if (initialType) builtParams.delete('type')")
  })
})
