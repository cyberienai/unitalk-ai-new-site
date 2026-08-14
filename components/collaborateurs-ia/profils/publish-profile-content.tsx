'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, CircleCheck, FileCheck2, Lock, Send, Users } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

type Visibility = 'private' | 'organization' | 'public'

const COPY = {
  fr: {
    kicker: 'Publication d’un profil métier',
    title: 'Faites vérifier et publier votre profil métier.',
    lead: 'Soumettez une responsabilité déjà formalisée. Unitalk vérifie son périmètre, ses compétences, ses missions, ses droits et ses conditions d’utilisation avant toute publication.',
    start: 'Préparer ma soumission',
    learn: 'Je dois encore construire mon profil',
    proofs: ['Aucune publication publique automatique', 'Visibilité choisie par le créateur', 'Version vérifiée avant diffusion'],
    audienceKicker: 'Cette page est pour vous si…',
    audienceTitle: 'Votre profil existe déjà, au moins sous forme de première version.',
    audience: ['La responsabilité et ses limites sont décrites', 'Des missions représentatives ont été identifiées', 'Les compétences et validations sont connues', 'Vous pouvez justifier l’origine du savoir-faire'],
    notReady: 'Votre profil n’est pas encore structuré ?',
    notReadyBody: 'La formation Co-créateur IA vous apprend à interviewer, formaliser, tester et versionner un profil métier avant publication.',
    visibilityKicker: 'Visibilité',
    visibilityTitle: 'Où souhaitez-vous rendre ce profil disponible ?',
    visibilityLead: 'Ce choix exprime votre intention. La visibilité finale dépendra de la vérification et de votre validation explicite.',
    visibility: {
      private: ['Privé', 'Disponible uniquement pour vous et vos tests.', 'Vous seul'],
      organization: ['Organisation', 'Disponible aux membres autorisés de votre organisation.', 'Votre équipe'],
      public: ['Proposer au catalogue public', 'Candidat à la vérification éditoriale et technique Unitalk.', 'Catalogue Unitalk'],
    },
    requiredKicker: 'Dossier de publication',
    requiredTitle: 'Préparez les éléments qui rendent le profil vérifiable.',
    required: ['Nom et responsabilité principale', 'Résultats attendus et limites', 'Missions représentatives', 'Compétences et méthodes associées', 'Applications, données et accès requis', 'Validations et décisions humaines', 'Auteur, licence et conditions d’utilisation', 'Version et preuves de test'],
    processKicker: 'Après la soumission',
    processTitle: 'Un processus de vérification, pas un bouton de mise en ligne.',
    process: [
      ['Analyse de complétude', 'Vérification des informations indispensables.'],
      ['Revue du périmètre', 'Responsabilité, limites, accès et risques.'],
      ['Tests représentatifs', 'Vérification sur des missions et cas contrôlés.'],
      ['Corrections', 'Demandes de précision ou d’ajustement si nécessaire.'],
      ['Validation de visibilité', 'Confirmation privée, organisationnelle ou publique.'],
      ['Publication et versionnage', 'Diffusion de la version validée et suivi des évolutions.'],
    ],
    ownershipTitle: 'Vous gardez la maîtrise de votre création.',
    ownership: ['Aucune publication publique sans validation explicite', 'La visibilité demandée peut être révisée avant publication', 'Les modifications importantes doivent être versionnées', 'Les droits de tiers doivent être déclarés'],
    finalKicker: 'Commencer',
    finalTitle: 'Votre profil est-il prêt à être vérifié ?',
    finalBody: 'Préparez votre dossier puis transmettez votre intention à Alma. Elle vous aide à vérifier les éléments manquants avant la soumission.',
    submit: 'Préparer la soumission avec Alma',
    talk: 'Parler à Alma avant de soumettre',
    cocreator: 'Devenir Co-créateur IA',
  },
  en: {
    kicker: 'Job profile publication',
    title: 'Get your job profile verified and published.',
    lead: 'Submit an already structured responsibility. Unitalk reviews its scope, skills, missions, permissions and usage terms before any publication.',
    start: 'Prepare my submission',
    learn: 'I still need to build my profile',
    proofs: ['No automatic public publication', 'Visibility chosen by the creator', 'Version verified before distribution'],
    audienceKicker: 'This page is for you if…',
    audienceTitle: 'Your profile already exists, at least as a first version.',
    audience: ['The responsibility and its limits are described', 'Representative missions have been identified', 'Skills and approvals are known', 'You can document the source of the know-how'],
    notReady: 'Is your profile not structured yet?',
    notReadyBody: 'The AI Co-creator training teaches you to interview, formalize, test and version a job profile before publication.',
    visibilityKicker: 'Visibility',
    visibilityTitle: 'Where should this profile be available?',
    visibilityLead: 'This choice states your intent. Final visibility depends on verification and your explicit approval.',
    visibility: {
      private: ['Private', 'Available only to you and your tests.', 'Only you'],
      organization: ['Organization', 'Available to authorized members of your organization.', 'Your team'],
      public: ['Propose to public catalog', 'Candidate for Unitalk editorial and technical verification.', 'Unitalk catalog'],
    },
    requiredKicker: 'Publication file',
    requiredTitle: 'Prepare the elements that make the profile verifiable.',
    required: ['Name and main responsibility', 'Expected outcomes and limits', 'Representative missions', 'Related skills and methods', 'Required applications, data and access', 'Human approvals and decisions', 'Author, license and usage terms', 'Version and test evidence'],
    processKicker: 'After submission',
    processTitle: 'A verification process, not a publish button.',
    process: [['Completeness review', 'Check required information.'], ['Scope review', 'Responsibility, limits, access and risks.'], ['Representative tests', 'Verification on controlled missions and cases.'], ['Corrections', 'Clarifications or adjustments when needed.'], ['Visibility approval', 'Private, organization or public confirmation.'], ['Publication and versioning', 'Release the approved version and track changes.']],
    ownershipTitle: 'You stay in control of your creation.',
    ownership: ['No public publication without explicit approval', 'Requested visibility can be revised before publication', 'Material changes must be versioned', 'Third-party rights must be declared'],
    finalKicker: 'Get started',
    finalTitle: 'Is your profile ready for verification?',
    finalBody: 'Prepare your file, then send your intent to Alma. She helps check missing elements before submission.',
    submit: 'Prepare submission with Alma',
    talk: 'Talk to Alma before submitting',
    cocreator: 'Become an AI Co-creator',
  },
} as const

export function PublishProfileContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [visibility, setVisibility] = useState<Visibility>('organization')
  const visibilityLabel = t.visibility[visibility][0]
  const almaHref = `/decouvrir?source=publish-profile&intention=publier-profil-metier&visibilite=${visibility}`

  return <main className="bg-[#F3EFE6] font-sf text-[#1C1A17]">
    <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-20"><div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]"/><div className="editorial-shell relative grid gap-12 lg:grid-cols-[1fr_.85fr] lg:items-center lg:gap-20"><div><Kicker>{t.kicker}</Kicker><h1 className="hero-heading mt-5 max-w-3xl">{t.title}</h1><p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#4E483F]">{t.lead}</p><div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="#visibility" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white sm:w-auto">{t.start}<ArrowRight className="ml-2 size-4"/></a><Link href="/co-createur-ia" className="text-sm font-bold text-[#B00C54] underline-offset-4 hover:underline">{t.learn}</Link></div><ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-[#625B50]">{t.proofs.map(proof=><li key={proof} className="flex items-center gap-2"><Check className="size-4 text-[#D10E63]"/>{proof}</li>)}</ul></div><aside className="rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-6 shadow-[0_24px_55px_-40px_rgba(28,26,23,.4)] sm:p-8"><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#B00C54]">{t.audienceKicker}</p><h2 className="mt-4 text-2xl font-bold leading-tight">{t.audienceTitle}</h2><ul className="mt-6 space-y-4">{t.audience.map(item=><li key={item} className="flex gap-3 text-sm font-semibold leading-6"><CircleCheck className="mt-0.5 size-4 shrink-0 text-[#D10E63]"/>{item}</li>)}</ul><div className="mt-7 border-t border-[#D8D0C2] pt-5"><h3 className="text-sm font-bold">{t.notReady}</h3><p className="mt-2 text-xs leading-6 text-[#625B50]">{t.notReadyBody}</p><Link href="/co-createur-ia" className="mt-4 inline-flex text-sm font-bold text-[#B00C54]">{t.cocreator}<ArrowRight className="ml-2 size-4"/></Link></div></aside></div></section>

    <section id="visibility" className="border-y border-[#D8D0C2] bg-[#FAF8F3] px-5 py-16 sm:px-8 sm:py-20"><div className="editorial-shell"><Kicker>{t.visibilityKicker}</Kicker><h2 className="mt-5 max-w-3xl text-[34px] font-semibold leading-[1.08] tracking-[-.04em] sm:text-[44px]">{t.visibilityTitle}</h2><p className="mt-4 max-w-3xl text-[16px] leading-7 text-[#4E483F]">{t.visibilityLead}</p><div role="radiogroup" aria-label={t.visibilityTitle} className="mt-9 grid gap-4 md:grid-cols-3">{(['private','organization','public'] as Visibility[]).map((key,index)=>{const [title,body,audience]=t.visibility[key];const Icon=[Lock,Users,FileCheck2][index];const active=visibility===key;return <label key={key} className={`cursor-pointer rounded-3xl border p-6 transition-colors ${active?'border-[#D10E63] bg-[#FBEAF1]/50':'border-[#D8D0C2] bg-white hover:border-[#D10E63]/40'}`}><input type="radio" name="visibility" value={key} checked={active} onChange={()=>setVisibility(key)} className="sr-only"/><Icon className="size-5 text-[#D10E63]"/><h3 className="mt-6 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#625B50]">{body}</p><p className="mt-5 font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#857C6E]">{audience}</p></label>})}</div><p aria-live="polite" className="mt-5 text-sm font-semibold text-[#B00C54]">{lang==='fr'?'Visibilité demandée :':'Requested visibility:'} {visibilityLabel}</p></div></section>

    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="editorial-shell grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20"><div><Kicker>{t.requiredKicker}</Kicker><h2 className="mt-5 text-[34px] font-semibold leading-[1.08] tracking-[-.04em] sm:text-[44px]">{t.requiredTitle}</h2></div><ul className="grid gap-3 sm:grid-cols-2">{t.required.map(item=><li key={item} className="flex min-h-20 items-start gap-3 rounded-2xl border border-[#D8D0C2] bg-[#FAF8F3] p-5 text-sm font-semibold leading-6"><Check className="mt-0.5 size-4 shrink-0 text-[#D10E63]"/>{item}</li>)}</ul></div></section>

    <section className="bg-[#181615] px-5 py-16 text-[#FAF8F3] sm:px-8 sm:py-20"><div className="editorial-shell"><Kicker dark>{t.processKicker}</Kicker><h2 className="mt-5 max-w-3xl text-[34px] font-semibold leading-[1.08] tracking-[-.04em] sm:text-[44px]">{t.processTitle}</h2><ol className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">{t.process.map(([title,body],index)=><li key={title} className="bg-[#211E1B] p-6"><p className="font-mono text-[10px] font-black text-[#F2A4C5]">0{index+1}</p><h3 className="mt-6 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#CFC6B8]">{body}</p></li>)}</ol><div className="mt-10 rounded-3xl border border-[#D10E63]/30 bg-[#D10E63]/10 p-6 sm:p-8"><h3 className="text-2xl font-bold">{t.ownershipTitle}</h3><ul className="mt-5 grid gap-3 sm:grid-cols-2">{t.ownership.map(item=><li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#E7E0D5]"><Check className="mt-0.5 size-4 shrink-0 text-[#F2A4C5]"/>{item}</li>)}</ul></div></div></section>

    <section className="px-5 py-16 sm:px-8 sm:py-20"><div className="editorial-shell rounded-3xl border border-[#D8D0C2] bg-[#EAE3D4] p-7 sm:p-10"><Kicker>{t.finalKicker}</Kicker><div className="mt-5 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><h2 className="max-w-3xl text-[34px] font-semibold leading-[1.08] tracking-[-.04em] sm:text-[44px]">{t.finalTitle}</h2><p className="mt-5 max-w-3xl text-[16px] leading-7 text-[#4E483F]">{t.finalBody}</p></div><div className="flex min-w-[280px] flex-col gap-3"><Link href={almaHref} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white"><Send className="mr-2 size-4"/>{t.submit}</Link><Link href={`/decouvrir?source=publish-profile-help&intention=publier-profil-metier`} className="text-center text-sm font-bold text-[#B00C54] underline-offset-4 hover:underline">{t.talk}</Link><Link href="/co-createur-ia" className="text-center text-xs font-semibold text-[#625B50] hover:text-[#1C1A17]">{t.cocreator}</Link></div></div></div></section>
  </main>
}
