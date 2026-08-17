import type { Metadata } from 'next'
import { HomeNew } from '@/components/home-new'

export const metadata: Metadata = {
  title: 'Votre propre Collaborateur IA pour accomplir vos missions',
  description: 'Alma personnalise votre Collaborateur IA selon vos besoins, vos outils et les règles de votre entreprise.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://unitalk.ai',
    title: 'Votre propre Collaborateur IA, prêt à accomplir vos missions',
    description: 'Alma le personnalise selon vos besoins, vos outils et les règles de votre entreprise.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Unitalk, votre Collaborateur IA pour entreprise' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Votre propre Collaborateur IA, prêt à accomplir vos missions',
    description: 'Alma le personnalise selon vos besoins, vos outils et les règles de votre entreprise.',
    images: ['/twitter-image'],
  },
}

export default function Page() {
  return <HomeNew />
}
