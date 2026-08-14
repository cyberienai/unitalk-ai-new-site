import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { AlmaFinalContent } from '@/components/alma/alma-final-content'

export const metadata: Metadata = {
  title: 'Alma, Coordinatrice de missions IA',
  description: 'Alma transforme les besoins en missions structurées et prépare les Collaborateurs IA qui les accomplissent sous contrôle humain.',
  alternates: { canonical: '/collaborateurs-ia/alma' },
  openGraph: { title: 'Alma · Coordinatrice de missions · Unitalk', description: 'Découvrez comment Alma cadre les missions et prépare les Collaborateurs IA qui les accomplissent.', url: '/collaborateurs-ia/alma', type: 'profile' },
}

export default function AlmaPage() {
  return <><Navbar /><AlmaFinalContent /><SiteFooter /></>
}
