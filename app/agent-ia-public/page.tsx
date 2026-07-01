import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { DeployContent } from '@/components/deploy-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Agent IA public · Unitalk',
  description:
    'Rendez votre agent IA public : site web, WhatsApp, téléphone, email, SMS, Slack, Instagram… Il accueille vos clients sur chaque canal, activé en un clic, sans code.',
}

export default function AgentIaPublicPage() {
  return (
    <>
      <Navbar />
      <DeployContent />
      <SiteFooter />
    </>
  )
}
