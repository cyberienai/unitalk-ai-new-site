import Image from 'next/image'
import { ArrowRight, ClipboardList, ShieldCheck, WandSparkles } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from './section-kicker'

const COPY = {
  fr: {
    kicker: 'Comment ça marche',
    title: 'De votre besoin au travail accompli.',
    steps: [
      ['Décrivez le résultat', 'Expliquez ce que vous voulez obtenir, sans avoir à rédiger un prompt technique.'],
      ['Alma prépare le Collaborateur', 'Elle cadre la mission, recommande le rôle adapté et identifie les outils et validations nécessaires.'],
      ['Vous suivez et validez', 'Le Collaborateur exécute la mission dans le Workspace. Votre équipe garde la main sur les décisions sensibles.'],
    ],
  },
  en: {
    kicker: 'How it works',
    title: 'From your need to completed work.',
    steps: [
      ['Describe the outcome', 'Explain what you want to achieve without writing a technical prompt.'],
      ['Alma prepares the Collaborator', 'She scopes the mission, recommends the right role and identifies the required tools and approvals.'],
      ['You monitor and approve', 'The Collaborator performs the mission in Workspace. Your team retains control of sensitive decisions.'],
    ],
  },
} as const

const ICONS = [ClipboardList, WandSparkles, ShieldCheck]

export function HomeProcess({ lang }: { lang: Lang }) {
  const copy = COPY[lang]
  return (
    <section aria-labelledby="home-process-title" className="border-y border-[#D8D0C2] bg-[#EAE3D4] py-14 sm:py-20">
      <div className="editorial-shell">
        <Kicker>{copy.kicker}</Kicker>
        <h2 id="home-process-title" className="mt-5 max-w-4xl text-balance text-[clamp(2.35rem,4vw,3.5rem)] font-bold leading-[.98] tracking-[-.05em]">{copy.title}</h2>
        <ol className="mt-10 grid overflow-hidden rounded-[24px] border border-[#CFC5B5] bg-[#FAF8F3] md:grid-cols-3">
          {copy.steps.map(([title, body], index) => {
            const Icon = ICONS[index]
            return (
              <li key={title} className="relative min-h-64 border-b border-[#D8D0C2] p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-8">
                <div className="flex items-center">
                  <span className="flex size-11 items-center justify-center rounded-full bg-[#1C1A17] text-white">{index === 1 ? <Image src="/alma-avatar.png" alt="Alma" width={44} height={44} className="size-11 rounded-full object-cover ring-2 ring-[#D10E63]/25" /> : <Icon aria-hidden className="size-5" />}</span>
                </div>
                <h3 className="mt-10 text-[22px] font-semibold leading-tight tracking-[-.035em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#4E483F]">{body}</p>
                {index < copy.steps.length - 1 && <ArrowRight aria-hidden className="absolute -right-3 top-8 z-10 hidden size-6 rounded-full bg-[#D10E63] p-1 text-white md:block" />}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
