import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { LegalContent, type LegalDoc } from '@/components/legal-content'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales d’Unitalk : éditeur du site, hébergement, propriété intellectuelle et contact.',
}

const DOC: { fr: LegalDoc; en: LegalDoc } = {
  fr: {
    title: 'Mentions légales',
    updated: 'Août 2026',
    intro:
      'Les présentes mentions légales encadrent l’accès et l’utilisation du site Unitalk. Les informations ci-dessous sont provisoires et devront être complétées avec les données officielles de la société.',
    sections: [
      {
        heading: 'Éditeur du site',
        body: [
          'Le site est édité par Unitalk AI, société à compléter (forme juridique, capital social, numéro RCS et SIREN à renseigner).',
          'Siège social : adresse à compléter. Numéro de TVA intracommunautaire : à compléter.',
          'Directeur de la publication : à compléter.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          'Email : hello@unitalk.ai',
          'Téléphone : 01 89 71 33 94',
        ],
      },
      {
        heading: 'Hébergement',
        body: [
          'Les données du service sont hébergées en France. Le nom, la raison sociale et l’adresse de l’hébergeur sont à compléter.',
        ],
      },
      {
        heading: 'Propriété intellectuelle',
        body: [
          'L’ensemble des contenus présents sur le site (textes, visuels, logos, marques, interfaces) est protégé par le droit de la propriété intellectuelle et demeure la propriété d’Unitalk, sauf mention contraire.',
          'Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable est interdite.',
        ],
      },
      {
        heading: 'Responsabilité',
        body: [
          'Unitalk s’efforce d’assurer l’exactitude des informations diffusées mais ne peut garantir l’absence d’erreurs. L’utilisation du site se fait sous la seule responsabilité de l’utilisateur.',
        ],
      },
    ],
  },
  en: {
    title: 'Legal notice',
    updated: 'August 2026',
    intro:
      'This legal notice governs access to and use of the Unitalk website. The information below is provisional and must be completed with the company’s official details.',
    sections: [
      {
        heading: 'Site publisher',
        body: [
          'The site is published by Unitalk AI, company details to be completed (legal form, share capital, company registration numbers).',
          'Registered office: address to be completed. VAT number: to be completed.',
          'Publication director: to be completed.',
        ],
      },
      {
        heading: 'Contact',
        body: ['Email: hello@unitalk.ai', 'Phone: +33 1 89 71 33 94'],
      },
      {
        heading: 'Hosting',
        body: [
          'Service data is hosted in France. The host’s name, company name and address are to be completed.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'All content on the site (text, visuals, logos, trademarks, interfaces) is protected by intellectual property law and remains the property of Unitalk unless otherwise stated.',
          'Any reproduction or representation, in whole or in part, without prior authorization is prohibited.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'Unitalk strives to ensure the accuracy of the information published but cannot guarantee it is free of errors. Use of the site is at the user’s sole responsibility.',
        ],
      },
    ],
  },
}

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <LegalContent doc={DOC} />
      <SiteFooter />
    </>
  )
}
