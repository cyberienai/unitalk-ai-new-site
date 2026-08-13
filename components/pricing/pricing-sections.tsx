'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'

const COPY = {
  fr: {
    eyebrow: 'Tarifs',
    titleOne: 'Une identité qui reste.',
    titleTwo: 'L’intelligence de votre choix.',
    lead: 'Votre Collaborateur IA possède son nom, sa mémoire et son environnement privé. Ses profils métier et ses compétences sont illimités. Vous choisissez les modèles qu’il mobilise.',
    includedEyebrow: 'Inclus gratuitement',
    includedTitle: 'Tout ce qui l’aide à progresser.',
    included: [
      { name: 'Alma', title: 'Votre Conseillère IA Unitalk.', body: 'Elle cadre vos missions, prépare votre Collaborateur IA et définit avec vous les décisions qui doivent rester humaines.', status: 'Incluse' },
      { name: 'Unitalk Desktop', title: 'Vos données privées, sur votre ordinateur.', body: 'Travaillez localement avec les fichiers que vous choisissez de ne pas envoyer dans le cloud.', status: 'Gratuite' },
      { name: 'Store de profils métier', title: 'De nouvelles responsabilités, sans nouvelle identité.', body: 'Ajoutez à votre Collaborateur IA les responsabilités durables dont votre entreprise a besoin. Le Store est enrichi continuellement par Unitalk et par la communauté des créateurs.', status: 'Accès inclus' },
      { name: 'Store de compétences', title: 'De nouveaux savoir-faire, sans repartir de zéro.', body: 'Ajoutez les méthodes de travail nécessaires à chaque mission et conservez celles que votre entreprise valide. Le Store est enrichi continuellement par Unitalk et par la communauté des créateurs.', status: 'Accès inclus' },
    ],
    manifestoOne: 'Vous ne payez pas chaque nouveau rôle.',
    manifestoTwo: 'Vous faites progresser la même identité.',
    manifestoBody: 'L’accès aux Stores est inclus. Les profils métier et les compétences associés à votre Collaborateur IA ne sont pas limités.',
    finalTitle: 'Donnez une première mission à votre Collaborateur IA.',
    finalBody: 'Sept jours pour travailler avec sa propre identité, ses modèles et les savoir-faire disponibles dans les Stores.',
    finalCta: 'Commencer mes 7 jours d’essai',
    finalNote: '1 million de tokens · Sans carte bancaire · 0 € aujourd’hui',
  },
  en: {
    eyebrow: 'Pricing',
    titleOne: 'An identity that remains.',
    titleTwo: 'The intelligence of your choice.',
    lead: 'Your AI Collaborator has its own name, memory and private environment. Its job profiles and skills are unlimited. You choose the models it uses.',
    includedEyebrow: 'Included free',
    includedTitle: 'Everything that helps it progress.',
    included: [
      { name: 'Alma', title: 'Your Unitalk AI Advisor.', body: 'She frames your missions, prepares your AI Collaborator and defines with you which decisions must remain human.', status: 'Included' },
      { name: 'Unitalk Desktop', title: 'Your private data, on your computer.', body: 'Work locally with the files you choose not to send to the cloud.', status: 'Free' },
      { name: 'Job profile Store', title: 'New responsibilities, without a new identity.', body: 'Add the lasting responsibilities your company needs to your AI Collaborator. The Store is continuously enriched by Unitalk and the creator community.', status: 'Access included' },
      { name: 'Skills Store', title: 'New know-how, without starting over.', body: 'Add the working methods each mission requires and retain those your company approves. The Store is continuously enriched by Unitalk and the creator community.', status: 'Access included' },
    ],
    manifestoOne: 'You do not pay for every new role.',
    manifestoTwo: 'You advance the same identity.',
    manifestoBody: 'Store access is included. Job profiles and skills associated with your AI Collaborator are unlimited.',
    finalTitle: 'Give your AI Collaborator a first mission.',
    finalBody: 'Seven days to work with its own identity, models and the know-how available in the Stores.',
    finalCta: 'Start my 7-day trial',
    finalNote: '1 million tokens · No credit card · €0 today',
  },
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <header className="mx-auto w-full max-w-[1120px] px-5 pb-3 pt-8 sm:px-8">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#B00C54]">{t.eyebrow}</p>
      <h1 className="mt-2 max-w-[960px] font-sf text-[40px] font-bold leading-[0.96] tracking-[-0.055em] text-[#151310] sm:text-[56px] lg:text-[62px]">
        <span className="block">{t.titleOne}</span>
        <span className="block text-[#6E665A]">{t.titleTwo}</span>
      </h1>
      <p className="mt-3 max-w-[900px] text-[15px] leading-6 text-[#4E483F] sm:text-[16px]">{t.lead}</p>
    </header>
  )
}

export function PricingExplanations() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <section aria-labelledby="included-title" className="bg-[#151310] text-[#FAF8F3]">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#F05C9D]">{t.includedEyebrow}</p>
        <h2 id="included-title" className="mt-3 max-w-3xl font-sf text-[38px] font-bold leading-[0.98] tracking-[-0.05em] sm:text-[58px]">{t.includedTitle}</h2>
        <div className="mt-12 border-t border-white/20">
          {t.included.map((item, index) => (
            <article key={item.name} className="grid gap-4 border-b border-white/20 py-7 sm:grid-cols-[52px_190px_minmax(0,1fr)_120px] sm:gap-6 sm:py-9">
              <p className="font-mono text-[11px] text-[#8F8980]">{String(index + 1).padStart(2, '0')}</p>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#F05C9D]">{item.name}</p>
              <div className="max-w-xl">
                <h3 className="font-sf text-[24px] font-bold leading-tight tracking-[-0.025em] sm:text-[30px]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-[#BDB7AC] sm:text-[16px]">{item.body}</p>
              </div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#FAF8F3] sm:text-right">{item.status}</p>
            </article>
          ))}
        </div>
        <div className="py-20 sm:py-28">
          <h2 className="max-w-5xl font-sf text-[38px] font-bold leading-[0.98] tracking-[-0.055em] sm:text-[62px]">
            <span className="block">{t.manifestoOne}</span>
            <span className="block text-[#F05C9D]">{t.manifestoTwo}</span>
          </h2>
          <p className="mt-7 max-w-2xl text-[17px] leading-8 text-[#BDB7AC]">{t.manifestoBody}</p>
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
