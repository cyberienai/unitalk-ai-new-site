import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { ManifesteContent } from '@/components/manifeste-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Le monde recrute des Collaborateurs IA · Unitalk',
  description:
    'Qui sera votre premier Collaborateur IA ? Une identité, une expertise sans limite. D’un Collaborateur IA à une Force de travail IA. Vos Collaborateurs vous appartiennent.',
}

export default function ManifestePage() {
  return (
    <>
      <Navbar />
      <ManifesteContent />
      <SiteFooter />
    </>
  )
}
