import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { PricingCollaboration, PricingHero } from '@/components/pricing/pricing-sections'
import { PricingFinalCta } from '@/components/pricing/pricing-final-cta'
import { PricingFaqFinal } from '@/components/pricing/pricing-faq-final'

export const metadata: Metadata = {
  title: 'Tarifs Collaborateur IA et entreprise IA | Unitalk',
  description:
    'Offrez une première mission à un Collaborateur IA, sans carte bancaire et sans engagement. Puis choisissez une licence entreprise sans prix par siège.',
  alternates: { canonical: '/tarifs' },
  openGraph: {
    type: 'website',
    url: 'https://unitalk.ai/tarifs',
    title: 'Tarifs Collaborateur IA et entreprise IA | Unitalk',
    description: 'Première mission offerte, puis licence entreprise sans prix par siège et Collaborateurs IA à 49 €/mois.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Tarifs Collaborateur IA | Unitalk', description: 'Pas de prix par siège. Une licence entreprise, 49 € par Collaborateur IA et une consommation maîtrisée.', images: ['/opengraph-image'] },
}

const pricingFaqItems=[['La première mission est-elle vraiment gratuite ?','Oui. Elle prend fin après la mission, 7 jours ou 1 million de tokens, selon la première limite atteinte. Aucune carte bancaire n’est requise.'],['Quelle différence entre un Assistant IA et un Collaborateur IA ?','Un Assistant aide dans une conversation. Un Collaborateur IA possède une identité, une mémoire, des compétences et un environnement propres pour prendre en charge des missions.'],['À qui peut être rattaché un Collaborateur IA ?','À une personne, une équipe, un département ou toute l’entreprise.'],['La licence est-elle facturée par utilisateur ?','Non. La licence est un forfait par entreprise : gratuite pour 1 utilisateur, 49 € par mois jusqu’à 10 utilisateurs et 299 € par mois jusqu’à 100 utilisateurs.'],['Que permet la licence entreprise sans Collaborateur IA ?','Chaque membre accède au Workspace avec des Assistants IA privés ou partagés illimités, les modèles autorisés et plus de 3 000 intégrations.'],['Que comprend un Collaborateur IA ?','Pour 49 € par mois : identité, mémoire, email, calendrier, téléphone, instance Hermes dédiée, 1 million de tokens et 60 minutes de téléphone.'],['Un Collaborateur IA peut-il gérer des appels téléphoniques ?','Oui. Il peut recevoir et passer des appels selon les règles définies par votre entreprise. Chaque Collaborateur inclut 60 minutes de téléphone.'],['Où travaillent les humains et les Collaborateurs IA ?','Dans Unitalk Workspace sur le Web, dans l’application Desktop et dans le Terminal / CLI. Hermes prend également en charge Telegram, Discord, Slack, Google Chat, WhatsApp, WhatsApp Cloud API, Signal, SMS, Email, Home Assistant, Mattermost, Matrix, DingTalk, Feishu / Lark, WeCom, Weixin, iMessage, QQ, Yuanbao, Microsoft Teams, LINE, ntfy, Raft, IRC, Buzz et SimpleX.'],['Quels modèles sont accessibles ?','Les modèles autorisés pour le texte, l’analyse multimodale, la génération d’images et de vidéos, l’audio, la transcription et le code.'],['Hermes est-il une boîte noire ?','Non. Hermes est un moteur agentique open source et chaque Collaborateur IA dispose de son instance dédiée.'],['Suis-je dépendant de Unitalk ?','Non. Les données, profils métier, compétences et configurations sont exportables.'],['Comment fonctionne la consommation ?','Utilisez des crédits prépayés à partir de 25 €, vos propres clés API avec BYOK, ou une combinaison hybride.']]
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
