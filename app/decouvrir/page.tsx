import type { Metadata } from 'next'
import { DiscoverFlow } from '@/components/discover/discover-flow'

export const metadata: Metadata = {
  title: 'Commencer avec Unitalk · Découvrir',
  description:
    'Créez votre compte, confirmez le contexte de votre entreprise, définissez votre première mission et créez votre premier Collaborateur IA pour commencer à travailler dans le Workspace.',
}

export default function DecouvrirPage() {
  return <DiscoverFlow />
}
