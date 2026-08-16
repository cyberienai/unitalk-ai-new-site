import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { AiGatewayContent } from '@/components/ai-gateway-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'AI Gateway : modèles IA, routage et gouvernance',
  description:
    'Accédez à plusieurs fournisseurs d’IA via une interface commune, avec routage, repli, clés virtuelles, budgets, limites, observabilité et règles par organisation.',
  alternates: { canonical: '/ai-gateway' },
  openGraph: {
    title: 'AI Gateway : plusieurs modèles, une seule politique | Unitalk',
    description: 'GPT, Claude, Gemini, Mistral et autres familles de modèles derrière un accès gouverné par votre organisation.',
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
