import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { DeployContent } from '@/components/deploy-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Déploiement · Unitalk',
  description:
    'Déployez votre agent IA là où sont vos clients : site web, WhatsApp, téléphone, email, SMS, Slack, Instagram… Chaque canal activé en un clic, sans code.',
}

export default function DeployPage() {
  return (
    <>
      <Navbar />
      <DeployContent />
      <SiteFooter />
    </>
  )
}
