import type { Metadata } from 'next'
import { CreateAgent } from '@/components/create-agent'

export const metadata: Metadata = {
  title: 'Créer votre Collaborateur IA · Unitalk',
  description:
    'Créez votre Collaborateur IA en un appel avec Alma, ou inscrivez-vous par email ou via Google, Slack et Teams. Essai de 7 jours, sans carte bancaire.',
}

export default function SignupPage() {
  return <CreateAgent />
}
