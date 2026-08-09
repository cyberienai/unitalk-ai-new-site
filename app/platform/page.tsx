import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { PlatformContent } from '@/components/platform-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Platform · Construisez votre produit · Unitalk',
  description:
    'Intégrez des Collaborateurs IA dotés d’une identité, d’une mémoire et de capacités d’action à votre propre produit, sous votre marque. API Unitalk, AI Gateway multimodèle, infrastructure dédiée. Tarif sur mesure.',
}

export default function PlatformPage() {
  return (
    <>
      <Navbar />
      <PlatformContent />
      <SiteFooter />
    </>
  )
}
