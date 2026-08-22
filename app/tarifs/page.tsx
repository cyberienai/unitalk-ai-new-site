import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { PricingCollaboration, PricingHero } from '@/components/pricing/pricing-sections'
import { PricingFinalCta } from '@/components/pricing/pricing-final-cta'
import { PricingFaqFinal } from '@/components/pricing/pricing-faq-final'

export const metadata: Metadata = {
  title: 'Tarifs Collaborateur IA et entreprise IA | Unitalk',
  description:
    'Une licence par entreprise, sans prix par siège : gratuite pour 1 utilisateur, 49 € jusqu’à 10 et 299 € jusqu’à 100. Collaborateurs IA à 49 €/mois.',
  alternates: { canonical: '/tarifs' },
  openGraph: {
    type: 'website',
    url: 'https://unitalk.ai/tarifs',
    title: 'Tarifs Collaborateur IA et entreprise IA | Unitalk',
    description: 'Une licence par entreprise, des Collaborateurs IA à 49 €/mois et des crédits prépayés ou vos propres clés API.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Tarifs Collaborateur IA | Unitalk', description: 'Pas de prix par siège. Une licence entreprise, 49 € par Collaborateur IA et une consommation maîtrisée.', images: ['/opengraph-image'] },
}

const pricingFaqItems=[['La licence est-elle facturée par utilisateur ?','Non. La licence est un forfait par entreprise : gratuite pour 1 utilisateur, 49 € par mois jusqu’à 10 utilisateurs et 299 € par mois jusqu’à 100 utilisateurs.'],['Que comprend un Collaborateur IA ?','Pour 49 € par mois : identité, mémoire, email, calendrier, téléphone, instance Hermes dédiée, 1 million de tokens et 60 minutes de téléphone.'],['Comment fonctionne la consommation ?','Utilisez des crédits prépayés à partir de 25 €, vos propres clés API avec BYOK, ou une combinaison hybride.']]
const faqJsonLd={ '@context':'https://schema.org','@type':'FAQPage',mainEntity:pricingFaqItems.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}})) }

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqJsonLd)}} />
      <main>
        <PricingHero />
        <PricingCollaboration />
        <PricingFaqFinal />
        <PricingFinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
