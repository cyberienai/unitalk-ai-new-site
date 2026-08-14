import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Votre savoir-faire devient une capacité de travail IA',
  description:
    'Décrivez un travail réel à Alma. Elle prépare la mission, le Collaborateur IA et les validations humaines nécessaires.',
  alternates: { canonical: 'https://unitalk.ai/paul-graham' },
  openGraph: {
    title: 'Votre savoir-faire devient une capacité de travail IA | Unitalk',
    description:
      'Décrivez le travail à Alma. Elle cadre la mission, vous validez les décisions qui comptent.',
    url: 'https://unitalk.ai/paul-graham',
  },
}

export default function PaulGrahamLayout({ children }: { children: React.ReactNode }) {
  return children
}
