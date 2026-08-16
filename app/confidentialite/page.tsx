import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { LegalContent, type LegalDoc } from '@/components/legal-content'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Politique de confidentialité d’Unitalk : données collectées, finalités, hébergement en France et droits des utilisateurs.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/confidentialite' },
}

const DOC: { fr: LegalDoc; en: LegalDoc } = {
  fr: {
    title: 'Politique de confidentialité',
    updated: 'Août 2026',
    intro:
      'Unitalk accorde une grande importance à la protection de vos données. Cette politique décrit, de façon provisoire, les données traitées et vos droits. Elle devra être validée par un conseil juridique et alignée sur le RGPD.',
    sections: [
      {
        heading: 'Responsable du traitement',
        body: [
          'Le responsable du traitement est Unitalk AI (coordonnées complètes à compléter). Pour toute question relative à vos données : hello@unitalk.ai.',
        ],
      },
      {
        heading: 'Données collectées',
        body: [
          'Données d’identification et de contact (nom, email, téléphone) que vous nous transmettez.',
          'Données d’usage du service et données techniques (journaux de connexion, type d’appareil) nécessaires au fonctionnement et à la sécurité.',
          'Contenus que vous confiez à vos Collaborateurs IA dans le cadre de vos missions.',
        ],
      },
      {
        heading: 'Finalités',
        body: [
          'Fournir et améliorer le service, assurer la sécurité, répondre à vos demandes et respecter nos obligations légales.',
          'Vos contenus de mission ne sont pas utilisés pour entraîner des modèles tiers sans votre accord explicite.',
        ],
      },
      {
        heading: 'Hébergement et sous-traitants',
        body: [
          'Les données sont hébergées en France. La liste des sous-traitants et prestataires techniques est à compléter.',
        ],
      },
      {
        heading: 'Durée de conservation',
        body: [
          'Les données sont conservées le temps nécessaire aux finalités décrites, puis supprimées ou anonymisées. Les durées précises sont à compléter.',
        ],
      },
      {
        heading: 'Vos droits',
        body: [
          'Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de portabilité de vos données.',
          'Pour exercer ces droits, écrivez à hello@unitalk.ai. Vous pouvez également saisir la CNIL.',
        ],
      },
    ],
  },
  en: {
    title: 'Privacy policy',
    updated: 'August 2026',
    intro:
      'Unitalk takes the protection of your data seriously. This policy provisionally describes the data processed and your rights. It must be reviewed by legal counsel and aligned with the GDPR.',
    sections: [
      {
        heading: 'Data controller',
        body: [
          'The data controller is Unitalk AI (full details to be completed). For any question about your data: hello@unitalk.ai.',
        ],
      },
      {
        heading: 'Data collected',
        body: [
          'Identification and contact data (name, email, phone) that you provide to us.',
          'Service usage data and technical data (connection logs, device type) required for operation and security.',
          'Content you entrust to your AI Collaborators as part of your missions.',
        ],
      },
      {
        heading: 'Purposes',
        body: [
          'Providing and improving the service, ensuring security, responding to your requests and meeting our legal obligations.',
          'Your mission content is not used to train third-party models without your explicit consent.',
        ],
      },
      {
        heading: 'Hosting and processors',
        body: [
          'Data is hosted in France. The list of processors and technical providers is to be completed.',
        ],
      },
      {
        heading: 'Retention',
        body: [
          'Data is kept for as long as necessary for the purposes described, then deleted or anonymized. Precise durations are to be completed.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You have the right to access, rectify, erase, object to and port your data.',
          'To exercise these rights, write to hello@unitalk.ai. You may also contact the relevant data protection authority.',
        ],
      },
    ],
  },
}

export default function ConfidentialitePage() {
  return (
    <>
      <Navbar />
      <LegalContent doc={DOC} />
      <SiteFooter />
    </>
  )
}
