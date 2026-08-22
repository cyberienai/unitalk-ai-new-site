import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { AiGatewayContent } from '@/components/ai-gateway-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'AI Gateway : routage, clés et gouvernance | Unitalk',
  description:
    'Gouvernez les fournisseurs d’IA avec une API commune, le routage, le repli, les clés virtuelles, les budgets, les limites et l’observabilité.',
  alternates: { canonical: '/ai-gateway' },
  openGraph: {
    title: 'AI Gateway : une politique pour tous vos accès IA | Unitalk',
    description: 'Appliquez vos règles de routage, de sécurité et de budget à chaque mission et chaque Collaborateur IA.',
    url: 'https://unitalk.ai/ai-gateway',
    type: 'website',
  },
}

export default function AiGatewayPage() {
  return (
    <>
      <Navbar />
      <AiGatewayContent />
      <SiteFooter />
    </>
  )
}
