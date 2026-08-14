import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')
const footer = readFileSync(new URL('../components/site-footer.tsx', import.meta.url), 'utf8')
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')
const applications = readFileSync(new URL('../app/collaborateurs-ia/applications/page.tsx', import.meta.url), 'utf8')
const store = readFileSync(new URL('../components/store-content.tsx', import.meta.url), 'utf8')

describe('Desktop discovery and Store scopes', () => {
  it('links the Desktop page from primary discovery surfaces', () => {
    expect(navbar).toContain("href: '/desktop'")
    expect(footer).toContain("href: '/desktop'")
    expect(sitemap).toContain("'/desktop'")
  })

  it('keeps the Applications page application-only', () => {
    expect(applications).toContain('if (params.type !== undefined)')
    expect(applications).toContain('<StoreContent initialType="application" />')
    expect(store).toContain('if (initialType) return')
    expect(store).toContain('showType={!initialType}')
    expect(store).toContain("if (initialType) builtParams.delete('type')")
  })
})
