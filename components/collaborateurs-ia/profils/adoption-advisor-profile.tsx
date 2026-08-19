'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import type { StoreItem } from '@/lib/store-catalog'

const COPY = {
  fr: {
    back: 'Tous les profils métier',
    label: 'Profil métier · Adoption et transformation',
    promise: 'Fait passer l’IA de l’essai à l’usage quotidien.',
    lead: 'Elle prépare les équipes, accompagne les premiers usages et traite les blocages qui freinent l’adoption des Collaborateurs IA.',
    add: 'Ajouter ce profil à Alma',
    adapt: 'Adapter ce profil à mon entreprise',
    included: 'Ajout sans facturation supplémentaire',
    overview: [
      ['Objectif', 'Installer des usages durables'],
      ['Intervention', 'Préparation, lancement et suivi'],
      ['Pour qui', 'Managers et équipes métier'],
    ],
    whenLabel: 'Quand l’activer',
    whenTitle: 'Quand l’outil fonctionne, mais que les usages ne suivent pas.',
    whenBody: 'Ce profil est utile avant un déploiement, pendant les premières semaines d’utilisation ou dès que des incompréhensions et des résistances apparaissent.',
    situations: [
      'Une équipe reçoit son premier Collaborateur IA.',
      'Les usages restent ponctuels ou mal compris.',
      'Les retours terrain ne sont pas encore structurés.',
      'Des blocages ralentissent le passage à l’échelle.',
    ],
    methodLabel: 'Son rôle',
    methodTitle: 'Une adoption accompagnée, étape par étape.',
    method: [
      ['Préparer', 'Clarifier ce qui change, présenter les usages attendus et donner aux équipes des repères simples.'],
      ['Accompagner', 'Suivre les premiers usages, répondre aux questions et recueillir les retours au plus près du travail réel.'],
      ['Ajuster', 'Identifier les blocages, proposer les adaptations utiles et transmettre les décisions qui nécessitent une validation humaine.'],
    ],
    outcomeLabel: 'Résultat attendu',
    outcomeTitle: 'Des équipes qui savent quand, pourquoi et comment travailler avec leur Collaborateur IA.',
    outcomeBody: 'L’objectif n’est pas de multiplier les formations. Il est d’ancrer des pratiques utiles, comprises et compatibles avec les règles de votre entreprise.',
    control: 'Vos équipes gardent la décision',
    controlBody: 'La Conseillère recommande et accompagne. Les responsables humains valident les changements d’organisation, les accès et les règles d’usage.',
    finalTitle: 'Ajoutez cette expertise quand votre équipe en a besoin.',
    finalBody: 'Le profil peut être ajouté à Alma à tout moment, sans facturation supplémentaire.',
  },
  en: {
    back: 'All job profiles',
    label: 'Job profile · Adoption and transformation',
    promise: 'Turns AI trials into everyday use.',
    lead: 'She prepares teams, supports their first uses and addresses the blockers that slow down AI Collaborator adoption.',
    add: 'Add this profile to Alma',
    adapt: 'Adapt this profile to my organization',
    included: 'No additional charge',
    overview: [
      ['Goal', 'Build lasting usage'],
      ['Engagement', 'Preparation, launch and follow-up'],
      ['For whom', 'Managers and business teams'],
    ],
    whenLabel: 'When to activate it',
    whenTitle: 'When the tool works, but adoption does not follow.',
    whenBody: 'This profile is useful before a rollout, during the first weeks of use, or as soon as misunderstanding and resistance emerge.',
    situations: [
      'A team receives its first AI Collaborator.',
      'Usage remains occasional or misunderstood.',
      'Field feedback is not yet structured.',
      'Blockers are slowing down broader adoption.',
    ],
    methodLabel: 'Her role',
    methodTitle: 'Guided adoption, step by step.',
    method: [
      ['Prepare', 'Clarify what changes, present expected uses and give teams simple points of reference.'],
      ['Support', 'Follow initial usage, answer questions and gather feedback as close as possible to real work.'],
      ['Adjust', 'Identify blockers, recommend useful changes and escalate decisions that require human approval.'],
    ],
    outcomeLabel: 'Expected outcome',
    outcomeTitle: 'Teams that know when, why and how to work with their AI Collaborator.',
    outcomeBody: 'The goal is not to multiply training sessions. It is to establish useful, understood practices that comply with your organization’s rules.',
    control: 'Your teams retain control',
    controlBody: 'The Advisor recommends and supports. Human managers approve organizational changes, access and usage rules.',
    finalTitle: 'Add this expertise when your team needs it.',
    finalBody: 'The profile can be added to Alma at any time, at no additional cost.',
  },
} as const

export function AdoptionAdvisorProfile({ item }: { item: StoreItem }) {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main className="bg-[#F3EFE6] font-sf text-[#1C1A17]">
      <section className="px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl">
          <Link href="/marketplace#profils-metier" className="inline-flex border-b border-[#857C6E] pb-1 text-xs font-bold text-[#625B50] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17]">
            <span aria-hidden="true" className="mr-3">←</span>{t.back}
          </Link>

          <div className="mt-10 grid gap-10 border-b border-[#CFC5B5] pb-14 lg:grid-cols-[1.35fr_.65fr] lg:gap-16 lg:pb-20">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#B00C54]">{t.label}</p>
              <h1 className="mt-5 max-w-4xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[.84] tracking-[-.075em]">{item.name[lang]}</h1>
              <p className="mt-7 max-w-2xl text-[clamp(1.45rem,3vw,2.35rem)] font-semibold leading-[1.08] tracking-[-.045em] text-[#2D2924]">{t.promise}</p>
              <p className="mt-6 max-w-2xl text-[16px] leading-8 text-[#625B50]">{t.lead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href={`/decouvrir?store=${item.slug}`} className="inline-flex min-h-12 items-center justify-center bg-[#D10E63] px-6 text-sm font-bold text-white transition-colors hover:bg-[#B00B52]">{t.add}<span aria-hidden="true" className="ml-5">→</span></Link>
                <Link href={`/decouvrir?source=profile-detail&intention=nouveau-profil-metier&store=${item.slug}`} className="inline-flex min-h-12 items-center justify-center border border-[#BFB5A5] px-6 text-sm font-bold transition-colors hover:border-[#1C1A17]">{t.adapt}</Link>
              </div>
              <p className="mt-4 text-xs font-semibold text-[#766D61]">{t.included}</p>
            </div>

            <dl className="self-end border-t border-[#CFC5B5]">
              {t.overview.map(([label, value]) => <div key={label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-[#CFC5B5] py-4"><dt className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#857C6E]">{label}</dt><dd className="text-sm font-semibold leading-5">{value}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-y border-[#CFC5B5] bg-[#EAE3D4] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#B00C54]">{t.whenLabel}</p><h2 className="mt-5 text-[clamp(2.2rem,4.5vw,4.4rem)] font-semibold leading-[.92] tracking-[-.06em]">{t.whenTitle}</h2><p className="mt-6 max-w-xl text-[15px] leading-7 text-[#625B50]">{t.whenBody}</p></div>
          <ul className="border-t border-[#BFB5A5] lg:self-end">{t.situations.map((situation) => <li key={situation} className="border-b border-[#BFB5A5] py-5 text-base font-semibold leading-6">{situation}</li>)}</ul>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#B00C54]">{t.methodLabel}</p>
          <h2 className="mt-5 max-w-3xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.92] tracking-[-.06em]">{t.methodTitle}</h2>
          <div className="mt-12 grid border-l border-t border-[#CFC5B5] md:grid-cols-3">
            {t.method.map(([title, body]) => <article key={title} className="flex min-h-64 flex-col border-b border-r border-[#CFC5B5] bg-[#FAF8F3] p-6 sm:p-8"><span className="h-1 w-10 bg-[#D10E63]" /><h3 className="mt-12 text-2xl font-semibold tracking-[-.04em]">{title}</h3><p className="mt-4 text-sm leading-7 text-[#625B50]">{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#1C1A17] px-5 py-20 text-[#F3EFE6] sm:px-8 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-20">
          <div><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#F08AB6]">{t.outcomeLabel}</p><h2 className="mt-5 text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.92] tracking-[-.06em]">{t.outcomeTitle}</h2><p className="mt-6 max-w-2xl text-[15px] leading-7 text-[#C8BFB1]">{t.outcomeBody}</p></div>
          <aside className="self-end border-t border-white/20 pt-6"><p className="text-lg font-semibold">{t.control}</p><p className="mt-3 text-sm leading-7 text-[#C8BFB1]">{t.controlBody}</p></aside>
        </div>
      </section>

      <section className="bg-[#D10E63] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div><h2 className="max-w-3xl text-[clamp(2.2rem,4.5vw,4.2rem)] font-semibold leading-[.92] tracking-[-.055em]">{t.finalTitle}</h2><p className="mt-5 text-sm text-white/80">{t.finalBody}</p></div>
          <Link href={`/decouvrir?store=${item.slug}`} className="inline-flex min-h-12 w-fit shrink-0 items-center bg-[#1C1A17] px-6 text-sm font-bold text-white">{t.add}<span aria-hidden="true" className="ml-5">→</span></Link>
        </div>
      </section>
    </main>
  )
}
