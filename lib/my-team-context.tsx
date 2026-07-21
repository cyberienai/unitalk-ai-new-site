'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type MyTeamMember = {
  slug: string
  name: string
  role: string
  avatar: string
}

type MyTeamContextValue = {
  members: MyTeamMember[]
  count: number
  has: (slug: string) => boolean
  add: (member: MyTeamMember) => void
  remove: (slug: string) => void
  toggle: (member: MyTeamMember) => void
  clear: () => void
}

const MyTeamContext = createContext<MyTeamContextValue | null>(null)

export function MyTeamProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<MyTeamMember[]>([])

  const has = useCallback((slug: string) => members.some((m) => m.slug === slug), [members])

  const add = useCallback((member: MyTeamMember) => {
    setMembers((prev) => (prev.some((m) => m.slug === member.slug) ? prev : [...prev, member]))
  }, [])

  const remove = useCallback((slug: string) => {
    setMembers((prev) => prev.filter((m) => m.slug !== slug))
  }, [])

  const toggle = useCallback((member: MyTeamMember) => {
    setMembers((prev) =>
      prev.some((m) => m.slug === member.slug)
        ? prev.filter((m) => m.slug !== member.slug)
        : [...prev, member],
    )
  }, [])

  const clear = useCallback(() => setMembers([]), [])

  const value = useMemo(
    () => ({ members, count: members.length, has, add, remove, toggle, clear }),
    [members, has, add, remove, toggle, clear],
  )

  return <MyTeamContext.Provider value={value}>{children}</MyTeamContext.Provider>
}

export function useMyTeam() {
  const ctx = useContext(MyTeamContext)
  if (!ctx) throw new Error('useMyTeam must be used within MyTeamProvider')
  return ctx
}
