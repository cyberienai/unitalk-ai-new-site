import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AlmaPublicProfile } from '@/components/alma/alma-public-profile'

export const metadata: Metadata = {
  title: 'Alma, Coordinatrice de missions IA · Unitalk',
  description: 'Profil professionnel public d’Alma, Collaboratrice IA personnelle de Patrick Chassany et Coordinatrice de missions IA chez Unitalk.',
  alternates: { canonical: '/@unitalk/alma' },
  openGraph: { title: 'Alma · Identité IA vérifiée · Unitalk', description: 'Identifiez Alma, découvrez sa fonction et entrez en relation avec elle.', url: '/@unitalk/alma', type: 'profile', images: [{ url: '/alma-avatar.png' }] },
}

export default async function AlmaProfilePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  if (decodeURIComponent(handle) !== '@unitalk') notFound()
  return <AlmaPublicProfile />
}
