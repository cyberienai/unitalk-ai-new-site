import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { EmmaContent } from '@/components/emma-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Rencontrez Emma · Votre premier Collaborateur IA · Unitalk',
  description:
    'Emma est votre premier Collaborateur IA : une identité, une mémoire, des compétences et des outils. Recrutez Emma et construisez votre Force de travail IA.',
}

export default function EmmaPage() {
  return (
    <>
      <Navbar />
      <EmmaContent />
      <SiteFooter />
    </>
  )
}
