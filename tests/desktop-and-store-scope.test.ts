import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const footer = readFileSync(new URL('../components/site-footer.tsx', import.meta.url), 'utf8')
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')
const applications = readFileSync(new URL('../app/collaborateurs-ia/applications/page.tsx', import.meta.url), 'utf8')
const applicationsCatalog = readFileSync(new URL('../app/collaborateurs-ia/applications/catalogue/page.tsx', import.meta.url), 'utf8')
const marketplace = readFileSync(new URL('../app/marketplace/page.tsx', import.meta.url), 'utf8')
const integrations = readFileSync(new URL('../app/collaborateurs-ia/integrations/page.tsx', import.meta.url), 'utf8')
const servers = readFileSync(new URL('../app/collaborateurs-ia/serveurs/page.tsx', import.meta.url), 'utf8')
const store = readFileSync(new URL('../components/store-content.tsx', import.meta.url), 'utf8')

describe('Desktop discovery and Store scopes', () => {
  it('links the Desktop page from primary discovery surfaces', () => {
    expect(footer).toContain("href: '/desktop'")
    expect(sitemap).toContain("'/desktop'")
  })

  it('centralizes applications in Marketplace and keeps legacy scopes explicit', () => {
    expect(marketplace).toContain('UnitalkStoreHub')
    expect(applications).toContain('MarketplaceCategoryExplainer')
    expect(applications).toContain('categoryId="applications"')
    expect(applicationsCatalog).toContain('<StoreContent initialType="application"/>')
    expect(integrations).toContain('<StoreContent initialType="integration"/>')
    expect(servers).toContain('<StoreContent initialType="server"/>')
    expect(store).toContain('if (initialType) return')
    expect(store).toContain('showType={!initialType}')
    expect(store).toContain("if (initialType) builtParams.delete('type')")
  })
})
