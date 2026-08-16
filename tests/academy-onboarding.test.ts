import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const onboarding=readFileSync(new URL('../components/academy/academy-onboarding.tsx',import.meta.url),'utf8')
const auth=readFileSync(new URL('../components/academy/academy-auth-shell.tsx',import.meta.url),'utf8')
const userMenu=readFileSync(new URL('../components/auth/user-menu.tsx',import.meta.url),'utf8')

describe('Academy Alma onboarding',()=>{
  it('uses the same Alma identity and personalizes a learning goal',()=>{
    expect(auth).toContain('/alma-avatar.png')
    expect(onboarding).toContain('Alma · Onboarding Academy')
    expect(onboarding).toContain('Que voulez-vous savoir livrer ?')
    expect(onboarding).toContain('Même Alma. Contexte pédagogique dédié.')
  })
  it('asks for consent before handing context to Unitalk',()=>{
    expect(onboarding).toContain('unitalk_academy_handoff')
    expect(onboarding).toContain('J’autorise le transfert de cet objectif')
    expect(onboarding).toContain("disabled={!consent}")
  })
  it('adds Training to both authenticated Unitalk menus',()=>{
    expect(userMenu).toContain("training: 'Formations'")
    expect(userMenu.match(/href="\/academy\/espace"/g)?.length).toBeGreaterThanOrEqual(2)
  })
})
