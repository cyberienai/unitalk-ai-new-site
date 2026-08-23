import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { WorkspaceFinalContent } from '@/components/workspace/workspace-final-content'

export const metadata: Metadata = {
  title: 'Workspace: missions, approvals and human-AI work',
  description: 'See how the Unitalk Workspace brings together missions, activity, human approvals, decisions and governed experience.',
  alternates: { canonical: '/en/workspace', languages: { fr: '/workspace', en: '/en/workspace', 'x-default': '/workspace' } },
  openGraph: { type: 'website', locale: 'en_GB', alternateLocale: ['fr_FR'], url: '/en/workspace', title: 'Unitalk Workspace: humans decide, AI Collaborators act', description: 'Follow work, approve sensitive actions and retain a clear record of decisions.', images: ['/opengraph-image'] },
}

export default function EnglishWorkspacePage() { return <><Navbar/><WorkspaceFinalContent/><SiteFooter/></> }
