import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Votre savoir-faire devrait travailler sans vous | Unitalk' },
  description:
    'Transformez votre savoir-faire en mission pour un Collaborateur IA. Vos méthodes, vos validations et un résultat concret, sous votre contrôle.',
  alternates: { canonical: '/paul-graham' },
  openGraph: {
    title: 'Votre savoir-faire devrait travailler sans vous | Unitalk',
    description:
      'Donnez à votre entreprise une capacité de travail IA fondée sur vos méthodes et vos règles.',
    url: '/paul-graham',
    type: 'website',
    images: [{ url: '/paul-graham/opengraph-image', width: 1200, height: 630, alt: 'Votre savoir-faire devrait travailler sans vous - Unitalk' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Votre savoir-faire devrait travailler sans vous | Unitalk',
    description: 'Un Collaborateur IA accomplit une mission avec vos méthodes, vos outils et vos règles.',
    images: ['/paul-graham/opengraph-image'],
  },
}

export default function PaulGrahamLayout({ children }: { children: React.ReactNode }) {
  return children
}
