import type { Metadata } from 'next'
import { CollaborateursContent } from '@/components/collaborateurs-ia/collaborateurs-content'

export const metadata: Metadata = {
  title: 'AI Collaborators for organizations',
  description: 'Deploy an AI Collaborator with a lasting identity, authorized memory, 3,000+ applications through Pipedream and its own private virtual server.',
  alternates: { canonical: '/en/ai-collaborators', languages: { fr: '/collaborateurs-ia', en: '/en/ai-collaborators', 'x-default': '/collaborateurs-ia' } },
  openGraph: { type: 'website', locale: 'en_GB', alternateLocale: ['fr_FR'], url: '/en/ai-collaborators', title: 'An AI Collaborator joins your team | Unitalk', description: 'A lasting AI identity with 3,000+ applications through Pipedream and its own private virtual server, governed by your organization.', images: ['/opengraph-image'] },
}

export default function EnglishAiCollaboratorsPage() { return <CollaborateursContent/> }
