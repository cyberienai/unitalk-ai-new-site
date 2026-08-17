import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../app/not-found.tsx', import.meta.url), 'utf8')

describe('premium 404 page', () => {
  it('offers clear recovery paths', () => {
    for (const href of ['href="/"', 'href="/missions"', 'href="/collaborateurs-ia"', 'href="/workspace"', 'href="/marketplace"']) expect(source).toContain(href)
    expect(source).toContain('Cette page')
    expect(source).toContain('n’existe pas.')
  })
})
