import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AlmaPublicProfile } from '@/components/alma/alma-public-profile'

export const metadata: Metadata = {
  title: 'Alma, responsable IA de la relation client · Unitalk',
  description: 'Profil professionnel public d’Alma : identité vérifiée, rattachement à Unitalk, responsabilités, canaux autorisés et règles d’escalade.',
  alternates: { canonical: '/@unitalk/alma' },
  openGraph: { title: 'Alma · Identité IA vérifiée · Unitalk', description: 'Identifiez Alma, vérifiez son rôle, ses responsabilités et ses règles avant d’échanger avec elle.', url: '/@unitalk/alma', type: 'profile', images: [{ url: '/alma-avatar.png' }] },
}

export default async function AlmaProfilePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  if (decodeURIComponent(handle) !== '@unitalk') notFound()
  return <AlmaPublicProfile />
}
