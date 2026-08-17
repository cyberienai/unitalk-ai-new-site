import type { Metadata } from 'next'
import { HomeNew } from '@/components/home-new'

export const metadata: Metadata = {
  title: 'Collaborateurs IA pour entreprise : accomplissez vos missions',
  description: 'Décrivez le travail à accomplir. Alma personnalise votre Collaborateur IA selon vos besoins pour agir avec vos équipes sous contrôle humain.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://unitalk.ai',
    title: 'Votre propre Collaborateur IA, prêt à accomplir vos missions',
    description: 'Décrivez le travail à accomplir. Alma personnalise votre Collaborateur IA selon vos besoins.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Unitalk, votre Collaborateur IA pour entreprise' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Votre propre Collaborateur IA, prêt à accomplir vos missions',
    description: 'Décrivez le travail à accomplir. Alma personnalise votre Collaborateur IA selon vos besoins.',
    images: ['/twitter-image'],
  },
}

export default function Page() {
  return <HomeNew />
}
