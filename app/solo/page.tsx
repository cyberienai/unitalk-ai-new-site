import type { Metadata } from 'next'
import { HeroSection } from '@/components/hero-section'

export const metadata: Metadata = {
  title: 'Solo · Unitalk AI',
  description:
    'Indépendant, freelance, dirigeant solo : votre agent Unitalk devient votre premier collaborateur. Il répond, relance, organise et exécute pendant que vous vous concentrez sur votre métier.',
}

export default function SoloPage() {
  return <HeroSection />
}
