import type { ReactNode } from 'react'
import { MyTeamProvider } from '@/lib/my-team-context'
import { MyTeamBasket } from '@/components/my-team-basket'

export default function TeamLayout({ children }: { children: ReactNode }) {
  return (
    <MyTeamProvider>
      {children}
      <MyTeamBasket />
    </MyTeamProvider>
  )
}
