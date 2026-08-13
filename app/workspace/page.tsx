import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { WorkspaceFinalContent } from '@/components/workspace/workspace-final-content'

export const metadata: Metadata = {
  title: 'Workspace : missions, validations et expérience humain–IA',
  description: 'Découvrez comment le Workspace Unitalk réunit missions, activité, validations humaines, décisions, résultats et expérience gouvernée.',
  alternates: { canonical: '/workspace' },
  openGraph: { title: 'Workspace Unitalk : les humains décident, les Collaborateurs IA agissent', description: 'Suivez une mission, validez les actions sensibles et gouvernez l’expérience conservée.', url: '/workspace', type: 'website', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
}

export default function WorkspacePage() {
  return <><Navbar /><WorkspaceFinalContent /><SiteFooter /></>
}
