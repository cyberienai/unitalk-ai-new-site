'use client'

import { useWorkspaceMissions } from '@/lib/workspace-missions'
import { WorkspaceApp } from './workspace-app'
import { WorkspaceContent } from '@/components/workspace-content'

// Decides, on the client, what /workspace shows:
// - a real application view once at least one mission has been created,
// - otherwise the marketing page (first-time visitors, no mission yet).
// `loaded` avoids a hydration flash before localStorage is read.
export function WorkspaceSwitch() {
  const { missions, loaded } = useWorkspaceMissions()

  if (!loaded) {
    return <div className="min-h-screen bg-[#F3EFE6]" aria-hidden />
  }

  if (missions.length > 0) {
    return <WorkspaceApp missions={missions} />
  }

  return <WorkspaceContent />
}
