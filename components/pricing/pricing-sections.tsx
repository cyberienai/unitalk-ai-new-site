'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'
import { pricingConfig } from '@/lib/pricing-config'
import { formatEuro } from './format'

const ROLES = {
  fr: ['Commercial', 'Marketing', 'RH', 'Finance', 'Support client', 'Opérations'],
  en: ['Sales', 'Marketing', 'HR', 'Finance', 'Customer support', 'Operations'],
}

export function PricingHero() {
  const { lang } = useLanguage()
  const router = useRouter()
  const reduce = useReducedMotion()
  const [roleIndex, setRoleIndex] = useState(0)
  const fr = lang === 'fr'

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setRoleIndex((index) => (index + 1) % ROLES[lang].length), 1800)
    return () => window.clearInterval(id)
  }, [lang, reduce])

  return (
    <header className="mx-auto max-w-[1120px] px-5 pb-14 pt-12 sm:px-8 sm:pt-16">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{fr ? 'Tarifs' : 'Pricing'}</p>
          <h1 className="mt-4 font-sf text-[48px] font-bold leading-[0.96] tracking-[-0.055em] sm:text-[72px]">{fr ? 'Votre Collaborateur IA.' : 'Your AI Collaborator.'}</h1>
          <div aria-live="polite" className="mt-5 h-9 overflow-hidden font-sf text-[24px] font-bold text-[#D10E63] sm:text-[28px]">{reduce ? ROLES[lang][0] : ROLES[lang][roleIndex]}</div>
          <p className="mt-1 text-sm italic text-[#6E665A]">{ROLES[lang].slice(1).join(' · ')}</p>
        </div>
        <div>
          <p className="font-sf text-[34px] font-bold leading-tight tracking-[-0.035em] sm:text-[44px]">{fr ? 'Gratuit pendant 7 jours.' : 'Free for 7 days.'}</p>
          <p className="mt-3 font-sf text-[28px] font-bold text-[#B00C54]">{fr ? '1 million de tokens offerts.' : '1 million free tokens.'}</p>
          <p className="mt-1 text-lg font-semibold">{fr ? 'Aucune carte bancaire.' : 'No credit card.'}</p>
          <button onClick={() => router.push('/decouvrir')} className="mt-7 bg-[#D10E63] px-7 py-3.5 text-sm font-bold text-white">{fr ? 'Commencer gratuitement' : 'Start free'} →</button>
        </div>
      </div>
      <div className="mt-12 grid border-y border-[#1C1A17]/15 py-7 sm:grid-cols-2">
        <p className="font-sf text-[38px] font-bold tracking-[-0.04em] sm:text-[52px]">0 € <span className="text-[20px] text-[#6E665A]">{fr ? 'par humain' : 'per human'}</span></p>
        <p className="mt-4 font-sf text-[38px] font-bold tracking-[-0.04em] sm:mt-0 sm:text-right sm:text-[52px]">{formatEuro(pricingConfig.baseMonthlyPrice, lang)} <span className="text-[20px] text-[#6E665A]">{fr ? 'par Collaborateur IA' : 'per AI Collaborator'}</span></p>
        <p className="mt-4 max-w-3xl text-[16px] leading-7 text-[#4E483F] sm:col-span-2">{fr ? 'Invitez toute votre équipe. Les discussions, le chat et la collaboration entre humains sont gratuits. Vous payez la capacité IA. Jamais la collaboration humaine.' : 'Invite your entire team. Human discussions, chat and collaboration are free. You pay for AI capacity, never human collaboration.'}</p>
      </div>
    </header>
  )
}

export function PricingCollaboration() {
  const { lang } = useLanguage()
  const fr = lang === 'fr'
  return (
    <>
      <section className="px-5 py-16 sm:px-8 sm:py-24"><div className="mx-auto max-w-[1120px]"><h2 className="max-w-4xl font-sf text-[40px] font-bold leading-[1.02] tracking-[-0.045em] sm:text-[58px]">{fr ? 'Une identité. Tous les métiers dont elle a besoin.' : 'One identity. Every role it needs.'}</h2><p className="mt-6 max-w-3xl text-[17px] leading-8 text-[#4E483F]">{fr ? 'Un même Collaborateur IA peut travailler comme commercial, recruteur, analyste ou responsable support. Vous ne payez pas une nouvelle licence à chaque responsabilité : ses profils métier sont illimités.' : 'The same AI Collaborator can work in sales, recruiting, analysis or support. You do not pay a new license for each responsibility: job profiles are unlimited.'}</p><p className="mt-7 font-sf text-2xl font-bold text-[#B00C54]">{fr ? 'La même identité. Une nouvelle responsabilité.' : 'The same identity. A new responsibility.'}</p></div></section>
      <section className="bg-[#151310] px-5 py-16 text-[#FAF8F3] sm:px-8 sm:py-24"><div className="mx-auto max-w-[1120px]"><h2 className="font-sf text-[42px] font-bold leading-tight sm:text-[60px]">{fr ? 'Toute votre équipe humaine est gratuite.' : 'Your entire human team is free.'}</h2><p className="mt-6 max-w-3xl text-[17px] leading-8 text-[#BDB7AC]">{fr ? 'Vos collaborateurs humains rejoignent le Workspace, discutent dans le chat et travaillent avec les Collaborateurs IA sans licence supplémentaire.' : 'Your human teammates join the Workspace, chat and work with AI Collaborators without an additional license.'}</p><div className="mt-10 grid border-y border-white/15 sm:grid-cols-3">{(fr ? ['Utilisateurs humains illimités','Discussions et collaboration gratuites','Desktop et validations humaines'] : ['Unlimited human users','Free discussions and collaboration','Desktop and human approvals']).map((item) => <p key={item} className="border-b border-white/15 py-5 font-semibold sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">{item}</p>)}</div><p className="mt-8 font-sf text-2xl font-bold text-[#F2A4C5]">{fr ? 'Vous payez la capacité IA. Jamais la collaboration humaine.' : 'You pay for AI capacity. Never human collaboration.'}</p></div></section>
    </>
  )
}

export function PricingExplanations() {
  const { lang } = useLanguage()
  const fr = lang === 'fr'
  return (
    <>
      <section className="px-5 py-16 sm:px-8 sm:py-24"><div className="mx-auto max-w-[1120px]"><p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">{fr ? 'Modèles et consommation' : 'Models and usage'}</p><h2 className="mt-4 max-w-4xl font-sf text-[42px] font-bold leading-[1.02] sm:text-[60px]">{fr ? '5 millions de tokens inclus. Le reste, à l’usage.' : '5 million tokens included. The rest, pay as you go.'}</h2><p className="mt-6 max-w-3xl text-[17px] leading-8 text-[#4E483F]">{fr ? 'Votre Collaborateur IA utilise le modèle adapté à chaque tâche selon la qualité attendue, le coût, la confidentialité et les droits définis par votre entreprise.' : 'Your AI Collaborator uses the model suited to each task according to expected quality, cost, privacy and company permissions.'}</p><div className="mt-10 grid border-y border-[#1C1A17]/15 sm:grid-cols-3"><Usage title="Crédits Unitalk">{fr ? 'Un budget prépayé et maîtrisé, partagé entre vos Collaborateurs IA.' : 'A controlled prepaid budget shared by your AI Collaborators.'}</Usage><Usage title={fr ? 'Vos propres clés' : 'Your own keys'}>{fr ? 'La consommation est facturée directement par vos fournisseurs.' : 'Usage is billed directly by your providers.'}</Usage><Usage title="Hybride">{fr ? 'Combinez clés et crédits selon les modèles et les missions.' : 'Combine keys and credits by model and mission.'}</Usage></div><p className="mt-6 text-sm text-[#6E665A]">{fr ? 'La téléphonie et les autres ressources variables sont facturées selon leur utilisation.' : 'Telephony and other variable resources are billed according to usage.'}</p><p className="mt-7 font-sf text-2xl font-bold">{fr ? 'Changez de modèle. Pas de Collaborateur.' : 'Change the model. Not the Collaborator.'}</p></div></section>

      <section className="bg-[#EAE4D9] px-5 py-16 sm:px-8 sm:py-20"><div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-2"><Trust title={fr ? 'Toujours à jour.' : 'Always up to date.'} body={fr ? 'Mises à jour fonctionnelles, correctifs de sécurité, nouveaux modèles compatibles et maintenance continue de l’environnement, sans intervention technique nécessaire.' : 'Feature updates, security fixes, newly compatible models and continuous environment maintenance, with no technical intervention required.'} /><Trust title={`SLA ${pricingConfig.slaAvailability} %.`} body={fr ? 'L’environnement Unitalk est surveillé et maintenu en continu. Le périmètre, le calcul, les maintenances planifiées, les crédits de service et les dépendances sont précisés dans le contrat.' : 'The Unitalk environment is continuously monitored and maintained. Scope, calculation, planned maintenance, service credits and dependencies are specified in the contract.'} /></div></section>

      <section className="px-5 py-16 sm:px-8 sm:py-24"><div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[280px_1fr]"><Image src="/alma-avatar.png" alt="Alma" width={280} height={280} className="w-full max-w-[280px]" /><div><h2 className="font-sf text-[42px] font-bold sm:text-[56px]">{fr ? 'Alma vous accompagne.' : 'Alma supports you.'}</h2><p className="mt-5 max-w-3xl text-[17px] leading-8 text-[#4E483F]">{fr ? 'Alma comprend votre entreprise, structure la mission et prépare les profils métier, compétences, applications, droits, validations et le contexte utile. Puis elle aide votre Collaborateur IA à progresser, mission après mission.' : 'Alma understands your company, structures the mission and prepares job profiles, skills, applications, rights, approvals and useful context. Then she helps your AI Collaborator progress mission by mission.'}</p><p className="mt-6 font-semibold">{fr ? 'Alma est incluse dans la licence.' : 'Alma is included in the license.'}</p><Link href="/collaborateurs-ia/alma" className="mt-5 inline-flex text-sm font-bold text-[#B00C54]">{fr ? 'Découvrir Alma' : 'Discover Alma'} →</Link></div></div></section>

      <section className="bg-[#151310] px-5 py-16 text-[#FAF8F3] sm:px-8 sm:py-24"><div className="mx-auto max-w-[1120px]"><h2 className="max-w-4xl font-sf text-[42px] font-bold sm:text-[58px]">{fr ? 'Un Ingénieur IA, quand vous en avez besoin.' : 'An AI Engineer, when you need one.'}</h2><p className="mt-6 max-w-3xl text-[17px] leading-8 text-[#BDB7AC]">{fr ? 'Mobilisez une expertise humaine pour une intégration, une mission complexe, une automatisation, un diagnostic ou l’optimisation des modèles et des coûts.' : 'Bring in human expertise for integration, complex missions, automation, diagnosis or model and cost optimization.'}</p><Link href="/experts" className="mt-7 inline-flex bg-[#FAF8F3] px-6 py-3 text-sm font-bold text-[#151310]">{fr ? 'Parler à un Ingénieur IA' : 'Talk to an AI Engineer'} →</Link></div></section>

      <section className="px-5 py-16 sm:px-8 sm:py-24"><div className="mx-auto max-w-[1120px]"><h2 className="font-sf text-[42px] font-bold">{fr ? 'Vous souhaitez aller plus loin ?' : 'Want to go further?'}</h2><div className="mt-10 grid border-y border-[#1C1A17]/15 lg:grid-cols-3"><Offer title="Pack AI Native" href="/accompagnement">{fr ? 'Organisez le travail humain–IA, déployez les premiers Collaborateurs IA et accompagnez vos équipes.' : 'Organize human–AI work, deploy the first AI Collaborators and support your teams.'}</Offer><Offer title="Partner" href="/partenaires">{fr ? 'Pour les agences, cabinets et intégrateurs qui accompagnent plusieurs entreprises.' : 'For agencies, consultancies and integrators supporting several companies.'}</Offer><Offer title="Platform" href="/platform">{fr ? 'Créez une expérience sous votre marque avec l’infrastructure Unitalk.' : 'Build a branded experience with Unitalk infrastructure.'}</Offer></div><p className="mt-5 text-sm text-[#6E665A]">{fr ? 'Partner et Platform disposent de leurs propres offres ; ce ne sont pas des plans supplémentaires.' : 'Partner and Platform have their own offers; they are not additional plans.'}</p></div></section>
    </>
  )
}

export function PricingFinalCta() {
  const { lang } = useLanguage()
  const router = useRouter()
  const fr = lang === 'fr'
  return <section className="bg-[#D10E63] px-5 py-16 text-white sm:px-8 sm:py-20"><div className="mx-auto max-w-[1120px] text-center"><h2 className="font-sf text-[42px] font-bold leading-tight sm:text-[60px]">{fr ? 'Votre équipe est gratuite. Votre Collaborateur IA commence maintenant.' : 'Your team is free. Your AI Collaborator starts now.'}</h2><div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 font-sf text-2xl font-bold"><span>{formatEuro(pricingConfig.baseMonthlyPrice, lang)}/{fr ? 'mois' : 'month'}</span><span>5 {fr ? 'millions de tokens inclus' : 'million tokens included'}</span><span>7 {fr ? 'jours gratuits' : 'free days'}</span></div><p className="mt-4 font-semibold">{fr ? 'Aucune carte bancaire.' : 'No credit card.'}</p><button onClick={() => router.push('/decouvrir')} className="mt-7 bg-[#151310] px-7 py-3.5 text-sm font-bold">{fr ? 'Ajouter mon Collaborateur IA' : 'Add my AI Collaborator'} →</button><p className="mt-4 text-xs text-white/75">{fr ? `Profils métier illimités · Alma incluse · SLA ${pricingConfig.slaAvailability} % · Desktop gratuit` : `Unlimited job profiles · Alma included · ${pricingConfig.slaAvailability}% SLA · Free Desktop app`}</p></div></section>
}

function Usage({ title, children }: { title: string; children: React.ReactNode }) { return <div className="border-b border-[#1C1A17]/15 py-6 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"><h3 className="font-sf text-2xl font-bold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#4E483F]">{children}</p></div> }
function Trust({ title, body }: { title: string; body: string }) { return <div><h3 className="font-sf text-[34px] font-bold">{title}</h3><p className="mt-4 leading-8 text-[#4E483F]">{body}</p></div> }
function Offer({ title, href, children }: { title: string; href: string; children: React.ReactNode }) { return <Link href={href} className="group border-b border-[#1C1A17]/15 py-7 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0"><h3 className="font-sf text-2xl font-bold group-hover:text-[#B00C54]">{title}</h3><p className="mt-3 text-sm leading-7 text-[#4E483F]">{children}</p><span className="mt-4 inline-flex text-sm font-bold text-[#B00C54]">Découvrir →</span></Link> }
