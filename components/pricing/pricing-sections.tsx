'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'

const COPY = {
  fr: {
    eyebrow: 'Tarifs',
    titleOne: 'Votre Collaborateur IA : 49 €/mois.',
    titleTwo: 'Ses modèles : à votre choix.',
    lead: 'Vous payez son identité professionnelle, son environnement privé et une expérience qui s’enrichit. Après l’essai, vous choisissez les modèles qu’il mobilise et leur mode de règlement.',
    collaborationProof: 'Une identité professionnelle équipée pour collaborer : email, calendrier, téléphone et profil public.',
    freeProof: 'Alma, Unitalk Desktop et l’accès aux Stores de profils métier et de compétences sont inclus gratuitement.',
    collaborationEyebrow: 'Collaboratif par nature',
    collaborationTitleOne: 'Il rejoint votre organisation.',
    collaborationTitleTwo: 'Pas une fenêtre de chat.',
    collaborationIntro: 'Un Collaborateur IA travaille avec les humains et les autres Collaborateurs IA selon la place, le contexte et les autorisations que votre entreprise lui donne.',
    collaborationColumns: [
      ['Avec vos équipes', 'Il partage le contexte autorisé, prépare le travail, demande une décision et poursuit la mission après validation.'],
      ['Avec vos contacts', 'Son email, son calendrier, son téléphone et son profil public permettent à vos clients, partenaires et candidats de le reconnaître et de le contacter.'],
      ['Avec les autres Collaborateurs IA', 'Il peut transmettre un travail, solliciter une compétence ou participer à une mission commune selon vos règles.'],
    ],
    publicProfile: 'Son profil public présente son identité, sa nature IA, son rôle, ses responsabilités, ses compétences et les moyens de contact que votre entreprise autorise.',
    collaborationFinal: 'Collaboratif par nature. Gouverné par vos règles.',
    includedEyebrow: 'Inclus gratuitement',
    includedTitle: 'Tout ce qui l’aide à progresser.',
    includedIntro: 'Alma, Unitalk Desktop et les Stores Unitalk sont inclus avec votre compte.',
    included: [
      { name: 'Alma', title: 'Alma · Conseillère IA · Unitalk', body: 'Elle cadre vos missions, prépare votre Collaborateur IA et définit avec vous les décisions qui doivent rester humaines.', detail: 'Alma n’est pas facturée comme une identité supplémentaire.', status: 'Incluse', href: '/alma' },
      { name: 'Unitalk Desktop', title: 'Unitalk Desktop', body: 'Travaillez localement avec les fichiers et les données que vous choisissez de conserver sur votre ordinateur.', detail: '', status: 'Gratuite', href: '' },
      { name: 'Store de profils métier', title: 'De nouvelles responsabilités, sans nouvelle identité.', body: 'Explorez et ajoutez des profils métier créés par Unitalk et par la communauté des créateurs.', detail: 'Un profil métier définit une responsabilité durable que votre Collaborateur IA peut exercer.', status: 'Accès inclus', href: '/collaborateurs-ia/profils-metier' },
      { name: 'Store de compétences', title: 'De nouveaux savoir-faire, sans repartir de zéro.', body: 'Ajoutez les méthodes de travail nécessaires à chaque mission et conservez celles que votre entreprise valide.', detail: 'Une compétence est un savoir-faire applicable, améliorable et réutilisable.', status: 'Accès inclus', href: '/collaborateurs-ia/competences' },
    ],
    storesGrow: 'Les Stores s’enrichissent continuellement grâce à Unitalk et à la communauté des créateurs.',
    manifestoOne: 'Vous ne payez pas chaque nouveau rôle.',
    manifestoTwo: 'Vous faites progresser la même identité.',
    manifestoBody: 'L’accès aux Stores est inclus. Les profils métier et les compétences associés à votre Collaborateur IA ne sont pas limités.',
    creatorTerms: 'Les conditions éventuelles des contenus publiés par des créateurs sont indiquées avant leur installation.',
    finalTitle: 'Donnez une première mission à votre Collaborateur IA.',
    finalBody: 'Votre Collaborateur IA est gratuit pendant sept jours, avec ses modèles et les savoir-faire disponibles dans les Stores.',
    finalCta: 'Commencer mes 7 jours d’essai',
    finalNote: '1 million de tokens offerts · Sans carte bancaire · 0 € aujourd’hui',
  },
  en: {
    eyebrow: 'Pricing',
    titleOne: 'Your AI Collaborator: €49/month.',
    titleTwo: 'Its models: your choice.',
    lead: 'You pay for its professional identity, private environment and experience that grows. After the trial, you choose the models it uses and how to pay for them.',
    collaborationProof: 'A professional identity equipped to collaborate: email, calendar, phone and public profile.',
    freeProof: 'Alma, Unitalk Desktop and access to the job profile and skills Stores are included free.',
    collaborationEyebrow: 'Collaborative by nature',
    collaborationTitleOne: 'It joins your organization.',
    collaborationTitleTwo: 'Not a chat window.',
    collaborationIntro: 'An AI Collaborator works with people and other AI Collaborators according to the place, context and permissions your company gives it.',
    collaborationColumns: [
      ['With your teams', 'It shares authorized context, prepares the work, asks for a decision and continues the mission after approval.'],
      ['With your contacts', 'Its email, calendar, phone and public profile let clients, partners and candidates recognize and contact it.'],
      ['With other AI Collaborators', 'It can hand off work, request a skill or take part in a shared mission according to your rules.'],
    ],
    publicProfile: 'Its public profile presents its identity, AI nature, role, responsibilities, skills and the contact methods your company authorizes.',
    collaborationFinal: 'Collaborative by nature. Governed by your rules.',
    includedEyebrow: 'Included free',
    includedTitle: 'Everything that helps it progress.',
    includedIntro: 'Alma, Unitalk Desktop and the Unitalk Stores are included with your account.',
    included: [
      { name: 'Alma', title: 'Alma · AI Advisor · Unitalk', body: 'She frames your missions, prepares your AI Collaborator and defines with you which decisions must remain human.', detail: 'Alma is not billed as an additional identity.', status: 'Included', href: '/alma' },
      { name: 'Unitalk Desktop', title: 'Unitalk Desktop', body: 'Work locally with the files and data you choose to keep on your computer.', detail: '', status: 'Free', href: '' },
      { name: 'Job profile Store', title: 'New responsibilities, without a new identity.', body: 'Explore and add job profiles created by Unitalk and the creator community.', detail: 'A job profile defines a lasting responsibility your AI Collaborator can perform.', status: 'Access included', href: '/collaborateurs-ia/profils-metier' },
      { name: 'Skills Store', title: 'New know-how, without starting over.', body: 'Add the working methods each mission requires and retain those your company approves.', detail: 'A skill is applicable, improvable and reusable know-how.', status: 'Access included', href: '/collaborateurs-ia/competences' },
    ],
    storesGrow: 'The Stores continuously grow through Unitalk and the creator community.',
    manifestoOne: 'You do not pay for every new role.',
    manifestoTwo: 'You advance the same identity.',
    manifestoBody: 'Store access is included. Job profiles and skills associated with your AI Collaborator are unlimited.',
    creatorTerms: 'Any terms for content published by creators are shown before installation.',
    finalTitle: 'Give your AI Collaborator a first mission.',
    finalBody: 'Your AI Collaborator is free for seven days, with its models and the know-how available in the Stores.',
    finalCta: 'Start my 7-day trial',
    finalNote: '1 million free tokens · No credit card · €0 today',
  },
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <header className="mx-auto w-full max-w-[1120px] px-5 pb-2 pt-4 sm:px-8">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#B00C54]">{t.eyebrow}</p>
      <h1 className="mt-2 max-w-[960px] font-sf text-[40px] font-bold leading-[0.96] tracking-[-0.055em] text-[#151310] sm:text-[56px] lg:text-[62px]">
        <span className="block">{t.titleOne}</span>
        <span className="block text-[#6E665A]">{t.titleTwo}</span>
      </h1>
      <p className="mt-2 max-w-[1000px] text-[14px] leading-5 text-[#4E483F]">{t.lead}</p>
      <div className="mt-2 grid gap-1 border-t border-[#1C1A17]/15 pt-2 text-[13px] leading-4 text-[#4E483F] lg:grid-cols-2 lg:gap-8">
        <p className="font-semibold text-[#1C1A17]">{t.collaborationProof}</p>
        <p>{t.freeProof}</p>
      </div>
    </header>
  )
}

export function PricingCollaboration() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <section aria-labelledby="collaboration-title" className="bg-[#151310] text-[#FAF8F3]">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#F05C9D]">{t.collaborationEyebrow}</p>
        <h2 id="collaboration-title" className="mt-4 max-w-4xl font-sf text-[38px] font-bold leading-[0.98] tracking-[-0.05em] sm:text-[58px]">
          <span className="block">{t.collaborationTitleOne}</span>
          <span className="block text-[#BDB7AC]">{t.collaborationTitleTwo}</span>
        </h2>
        <p className="mt-7 max-w-3xl text-[17px] leading-8 text-[#BDB7AC]">{t.collaborationIntro}</p>
        <div className="mt-12 grid border-y border-white/20 md:grid-cols-3">
          {t.collaborationColumns.map(([title, body]) => (
            <article key={title} className="border-b border-white/20 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <h3 className="font-sf text-[24px] font-bold tracking-[-0.025em]">{title}</h3>
              <p className="mt-4 text-[15px] leading-7 text-[#BDB7AC]">{body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-[15px] leading-7 text-[#BDB7AC]">{t.publicProfile}</p>
        <p className="mt-10 font-sf text-[26px] font-bold tracking-[-0.025em] text-white sm:text-[32px]">{t.collaborationFinal}</p>
      </div>
    </section>
  )
}

export function PricingExplanations() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <section aria-labelledby="included-title" className="bg-[#F3EFE6] text-[#1C1A17]">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#B00C54]">{t.includedEyebrow}</p>
        <h2 id="included-title" className="mt-3 max-w-3xl font-sf text-[38px] font-bold leading-[0.98] tracking-[-0.05em] sm:text-[58px]">{t.includedTitle}</h2>
        <p className="mt-5 text-[17px] leading-7 text-[#4E483F]">{t.includedIntro}</p>
        <div className="mt-10 border-t border-[#1C1A17]/15">
          {t.included.map((item, index) => (
            <article key={item.name} className="grid gap-4 border-b border-[#1C1A17]/15 py-7 sm:grid-cols-[52px_190px_minmax(0,1fr)_120px] sm:gap-6 sm:py-9">
              <p className="font-mono text-[11px] text-[#6E665A]">{String(index + 1).padStart(2, '0')}</p>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#B00C54]">{item.name}</p>
              <div className="max-w-xl">
                <h3 className="font-sf text-[24px] font-bold leading-tight tracking-[-0.025em] sm:text-[30px]">
                  {item.href ? <a href={item.href} className="underline decoration-[#D10E63]/25 underline-offset-4 hover:decoration-[#D10E63]">{item.title}</a> : item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#4E483F] sm:text-[16px]">{item.body}</p>
                {item.detail && <p className="mt-2 text-[14px] font-semibold leading-6 text-[#1C1A17]">{item.detail}</p>}
              </div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1C1A17] sm:text-right">{item.status}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-[15px] leading-7 text-[#4E483F]">{t.storesGrow}</p>
        <div className="py-16 sm:py-24">
          <h2 className="max-w-5xl font-sf text-[38px] font-bold leading-[0.98] tracking-[-0.055em] sm:text-[62px]">
            <span className="block">{t.manifestoOne}</span>
            <span className="block text-[#B00C54]">{t.manifestoTwo}</span>
          </h2>
          <p className="mt-7 max-w-2xl text-[17px] leading-8 text-[#4E483F]">{t.manifestoBody}</p>
          <p className="mt-3 max-w-2xl text-[14px] leading-6 text-[#6E665A]">{t.creatorTerms}</p>
        </div>
      </div>
    </section>
  )
}

export function PricingFinalCta() {
  const { lang } = useLanguage()
  const router = useRouter()
  const t = COPY[lang]
  return (
    <section className="bg-[#D10E63] text-white">
      <div className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h2 className="max-w-3xl font-sf text-[38px] font-bold leading-[0.98] tracking-[-0.05em] sm:text-[58px]">{t.finalTitle}</h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-7 text-white/80">{t.finalBody}</p>
        </div>
        <div className="lg:min-w-[310px]">
          <button type="button" onClick={() => router.push('/decouvrir')} className="flex h-13 w-full items-center justify-center bg-[#151310] px-6 text-sm font-bold text-white transition-colors hover:bg-[#2A2621] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{t.finalCta} →</button>
          <p className="mt-3 text-[12px] text-white/75">{t.finalNote}</p>
        </div>
      </div>
    </section>
  )
}
