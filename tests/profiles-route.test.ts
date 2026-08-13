import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const config = readFileSync(new URL('../next.config.mjs', import.meta.url), 'utf8')

describe('profiles route aliases', () => {
  it('redirects the misspelled profils-metiere route to the canonical route', () => {
    expect(config).toContain("source: '/collaborateurs-ia/profils-metiere'")
    expect(config).toContain("destination: '/collaborateurs-ia/profils-metier'")
  })
})
