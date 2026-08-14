import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { AiGatewayContent } from '@/components/ai-gateway-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Unitalk AI Gateway : accès multimodèle gouverné',
  description:
    'Accédez à plusieurs fournisseurs d’IA via une interface commune, avec routage, clés, budgets, quotas et règles par organisation. Basé sur LiteLLM.',
  alternates: { canonical: '/ai-gateway' },
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
