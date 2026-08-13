import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { WorkspaceFinalContent } from '@/components/workspace/workspace-final-content'

export const metadata: Metadata = {
  title: 'Workspace · Le travail humain–IA avance sous votre contrôle',
  description: 'Le Workspace Unitalk réunit équipes humaines, Collaborateurs IA, missions, décisions et résultats dans une seule interface gouvernée.',
  alternates: { canonical: '/workspace' },
  openGraph: { title: 'Workspace Unitalk · Le travail avance, vous gardez la main', description: 'Confiez une mission, suivez son travail, validez les décisions et conservez le résultat.', url: '/workspace', type: 'website' },
}

export default function WorkspacePage() {
  return <><Navbar /><WorkspaceFinalContent /><SiteFooter /></>
}
