'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

const COPY = {
  fr: {
    kicker: 'Sécurité et contrôle', title: 'Vos données, vos accès, vos règles.',
    lead: 'En production depuis plus d’un an, Unitalk encadre l’hébergement, le traitement des données, les accès et la supervision humaine.',
    sections: [
      ['Hébergement', ['Les données Unitalk sont hébergées en France et chiffrées en transit et au repos.']],
      ['Utilisation des données', ['Les contenus de mission ne sont pas utilisés pour entraîner des modèles sans votre accord explicite.']],
      ['Accès aux applications', ['Chaque Collaborateur IA est limité aux applications et permissions autorisées par votre organisation.', 'Les accès peuvent être restreints ou révoqués.']],
      ['Validation humaine', ['Les actions identifiées comme sensibles sont suspendues jusqu’à la décision d’une personne autorisée.', 'Le périmètre des validations dépend de la mission et des règles définies par votre organisation.']],
      ['Traçabilité', ['Le Workspace est conçu pour présenter les étapes, actions et décisions liées à une mission.']],
      ['DPA', ['Notre accord de traitement des données précise les responsabilités, les mesures de protection et les conditions applicables aux sous-traitants.', 'Pour recevoir le DPA ou poser une question de sécurité, écrivez à hello@unitalk.ai.']],
    ],
    cta: 'Consulter la politique de confidentialité',
  },
  en: {
    kicker: 'Security and control', title: 'Your data, your access, your rules.',
    lead: 'In production for over a year, Unitalk governs hosting, data processing, access and human oversight.',
    sections: [
      ['Hosting', ['Unitalk data is hosted in France and encrypted in transit and at rest.']],
      ['Data use', ['Mission content is not used to train models without your explicit consent.']],
      ['Application access', ['Each AI Collaborator is limited to applications and permissions authorized by your organization.', 'Access can be restricted or revoked.']],
      ['Human approval', ['Actions identified as sensitive are paused until an authorized person decides.', 'Approval scope depends on the mission and your organization’s rules.']],
      ['Traceability', ['Workspace is designed to display the steps, actions and decisions related to a mission.']],
      ['DPA', ['Our Data Processing Agreement defines responsibilities, safeguards and the conditions applicable to processors.', 'To receive the DPA or ask a security question, email hello@unitalk.ai.']],
    ],
    cta: 'Read the privacy policy',
  },
} as const

export function SecurityContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return <main className="bg-[#F3EFE6] px-5 pb-24 pt-28 sm:px-6 sm:pt-32"><article className="mx-auto w-full max-w-4xl"><Kicker>{t.kicker}</Kicker><h1 className="mt-5 text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[.92] tracking-[-.065em]">{t.title}</h1><p className="mt-7 max-w-3xl text-[17px] leading-8 text-[#4E483F]">{t.lead}</p><div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-[#D8D0C2] bg-[#D8D0C2] md:grid-cols-2">{t.sections.map(([title, paragraphs]) => <section key={title} className="bg-[#FAF8F3] p-6 sm:p-8"><h2 className="text-xl font-semibold">{title}</h2><div className="mt-4 space-y-3">{paragraphs.map(paragraph => <p key={paragraph} className="text-sm leading-6 text-[#5C554A]">{paragraph}</p>)}</div></section>)}</div><Link href={lang === 'fr' ? '/confidentialite' : '/confidentialite'} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{t.cta}<ArrowRight className="size-4"/></Link></article></main>
}
