import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { AlmaFinalContent } from '@/components/alma/alma-final-content'

export const metadata: Metadata = {
  title: 'Alma, Collaboratrice IA et Conseillère en transformation IA',
  description: 'Alma travaille avec Patrick Chassany au développement de Unitalk. Elle transforme les besoins en missions et prépare les Collaborateurs IA des entreprises.',
  alternates: { canonical: '/collaborateurs-ia/alma' },
  openGraph: { title: 'Alma · Collaboratrice IA · Unitalk', description: 'Découvrez comment Alma prépare les missions, les savoir-faire et la collaboration humain–IA.', url: '/collaborateurs-ia/alma', type: 'profile' },
}

export default function AlmaPage() {
  return <><Navbar /><AlmaFinalContent /><SiteFooter /></>
}
