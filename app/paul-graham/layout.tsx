import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Votre savoir-faire devrait travailler sans vous',
  description:
    'Décrivez un résultat à Alma. Elle prépare la mission et le Collaborateur IA qui l’accomplira sous votre contrôle.',
  alternates: { canonical: 'https://unitalk.ai/paul-graham' },
  openGraph: {
    title: 'Votre savoir-faire devrait travailler sans vous | Unitalk',
    description:
      'Décrivez le travail à Alma. Elle cadre la mission, vous validez les décisions qui comptent.',
    url: 'https://unitalk.ai/paul-graham',
  },
}

export default function PaulGrahamLayout({ children }: { children: React.ReactNode }) {
  return children
}
