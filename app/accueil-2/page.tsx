import type { Metadata } from 'next'
import { HomeFinal } from '@/components/home-v2-final/home-final'

export const metadata: Metadata = {
  title: 'Unitalk — Il vous manque quelqu’un',
  description:
    'Votre Collaborateur IA rejoint votre organisation avec les savoir-faire métier et les outils nécessaires pour chaque mission. Hébergé en France, conforme au RGPD.',
}

export default function Page() {
  return <HomeFinal />
}
