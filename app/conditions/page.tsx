import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { LegalContent, type LegalDoc } from '@/components/legal-content'

export const metadata: Metadata = {
  title: 'Conditions générales d’utilisation',
  description:
    'Conditions générales d’utilisation d’Unitalk : objet du service, accès, obligations, responsabilité et résiliation.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/conditions' },
}

const DOC: { fr: LegalDoc; en: LegalDoc } = {
  fr: {
    title: 'Conditions générales',
    updated: 'Août 2026',
    intro:
      'Les présentes conditions générales encadrent l’utilisation du service Unitalk. Ce texte est provisoire et devra être finalisé avec un conseil juridique avant toute valeur contractuelle.',
    sections: [
      {
        heading: 'Objet',
        body: [
          'Unitalk met à disposition une plateforme permettant de créer et piloter des Collaborateurs IA pour accomplir des missions au sein de votre entreprise.',
        ],
      },
      {
        heading: 'Accès au service',
        body: [
          'L’accès nécessite la création d’un compte. Vous êtes responsable de l’exactitude des informations fournies et de la confidentialité de vos identifiants.',
          'Un essai gratuit peut être proposé, sans carte bancaire, dans les conditions indiquées sur la page Tarifs.',
        ],
      },
      {
        heading: 'Obligations de l’utilisateur',
        body: [
          'Vous vous engagez à utiliser le service conformément à la loi et à ne pas détourner son usage (contenus illicites, atteinte aux droits de tiers, tentatives d’intrusion).',
          'Vous restez responsable des décisions prises à partir des résultats produits par vos Collaborateurs IA.',
        ],
      },
      {
        heading: 'Tarifs et paiement',
        body: [
          'Les conditions tarifaires sont décrites sur la page Tarifs. Les modalités de facturation et de renouvellement sont à compléter.',
        ],
      },
      {
        heading: 'Responsabilité',
        body: [
          'Le service est fourni « en l’état ». Unitalk met en œuvre les moyens raisonnables pour en assurer la disponibilité et la sécurité, sans garantie d’absence totale d’interruption.',
        ],
      },
      {
        heading: 'Résiliation',
        body: [
          'Vous pouvez cesser d’utiliser le service à tout moment. Les conditions de résiliation et de suppression des données sont à compléter.',
        ],
      },
    ],
  },
  en: {
    title: 'Terms of use',
    updated: 'August 2026',
    intro:
      'These terms govern the use of the Unitalk service. This text is provisional and must be finalized with legal counsel before it carries any contractual value.',
    sections: [
      {
        heading: 'Purpose',
        body: [
          'Unitalk provides a platform to create and operate AI Collaborators that carry out missions within your company.',
        ],
      },
      {
        heading: 'Access to the service',
        body: [
          'Access requires creating an account. You are responsible for the accuracy of the information provided and for keeping your credentials confidential.',
          'A free trial may be offered, without a credit card, under the conditions stated on the Pricing page.',
        ],
      },
      {
        heading: 'User obligations',
        body: [
          'You agree to use the service in accordance with the law and not to misuse it (illegal content, infringement of third-party rights, intrusion attempts).',
          'You remain responsible for decisions made based on the output produced by your AI Collaborators.',
        ],
      },
      {
        heading: 'Pricing and payment',
        body: [
          'Pricing conditions are described on the Pricing page. Billing and renewal terms are to be completed.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'The service is provided “as is”. Unitalk uses reasonable means to ensure its availability and security, without guaranteeing the complete absence of interruptions.',
        ],
      },
      {
        heading: 'Termination',
        body: [
          'You may stop using the service at any time. Termination and data deletion conditions are to be completed.',
        ],
      },
    ],
  },
}

export default function ConditionsPage() {
  return (
    <>
      <Navbar />
      <LegalContent doc={DOC} />
      <SiteFooter />
    </>
  )
}
