import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { PricingCollaboration, PricingFinalCta, PricingHero, PricingExplanations } from '@/components/pricing/pricing-sections'
import { PricingFaqFinal } from '@/components/pricing/pricing-faq-final'

export const metadata: Metadata = {
  title: 'Tarifs Unitalk : Organisation, Collaborateurs IA et capacité',
  description:
    'Composez votre Organisation Unitalk, choisissez vos Collaborateurs IA, leur capacité et vos licences. Essai de 7 jours sans carte bancaire.',
  alternates: { canonical: '/tarifs' },
  openGraph: {
    type: 'website',
    url: 'https://unitalk.ai/tarifs',
    title: 'Tarifs Unitalk : Organisation, Collaborateurs IA et capacité | Unitalk',
    description: 'Composez votre Organisation Unitalk, choisissez vos Collaborateurs IA, leur capacité et vos licences.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Tarifs Unitalk : Organisation, Collaborateurs IA et capacité', description: 'Composez votre Organisation Unitalk et obtenez votre total immédiatement.', images: ['/opengraph-image'] },
}

const pricingFaqItems=[['Pourquoi l’Organisation Unitalk est-elle facturée séparément ?','Elle réunit Alma, le Workspace, Desktop, les membres humains, la gouvernance, les crédits et l’accès aux Stores au niveau de l’entreprise.'],['Un Collaborateur IA peut-il exercer plusieurs métiers ?','Oui. Ses profils métier sont illimités. Une nouvelle Licence Collaborateur IA n’est nécessaire que pour une identité distincte ou des ressources dédiées.'],['La capacité IA est-elle facturée par Collaborateur IA ?','Oui. Chaque identité possède sa capacité. Le configurateur applique par défaut la même capacité à toutes les identités sélectionnées.'],['Que signifie BYOK ?','Vous utilisez vos propres clés de modèles. Unitalk ne facture pas cette capacité, mais votre fournisseur facture directement vos usages.'],['Que se passe-t-il à la fin des promotions ?','Le configurateur affiche les montants datés avant votre inscription. Toute bascule payante respecte les conditions et consentements réels du produit.']]
const faqJsonLd={ '@context':'https://schema.org','@type':'FAQPage',mainEntity:pricingFaqItems.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}})) }

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqJsonLd)}} />
      <main>
        <Suspense fallback={<div className="mx-auto h-[720px] max-w-[1120px] px-5 sm:px-8" />}>
          <PricingHero />
        </Suspense>
        <PricingCollaboration />
        <PricingExplanations />
        <PricingFaqFinal />
        <PricingFinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
