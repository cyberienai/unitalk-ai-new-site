import type { Metadata } from 'next'
import { CollaborateursContent } from '@/components/collaborateurs-ia/collaborateurs-content'

export const metadata: Metadata = {
  title: 'Collaborateurs IA : Hermes au cœur, Unitalk pour travailler ensemble',
  description:
    'Hermes donne à chaque Collaborateur IA la capacité d’agir. Unitalk ajoute une identité, un Workspace humain + IA, une mémoire partagée et un travail gouverné.',
  alternates: { canonical: 'https://unitalk.ai/collaborateurs-ia' },
  openGraph: {
    title: 'Plus qu’un agent. Une place dans votre équipe. | Unitalk',
    description:
      'Au cœur, un agent Hermes. Autour, Unitalk construit l’identité, la mémoire, les communications et le Workspace qui permettent de travailler avec votre équipe.',
    url: 'https://unitalk.ai/collaborateurs-ia',
  },
}

export default function CollaborateursIaPage() {
  return <CollaborateursContent />
}
