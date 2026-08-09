'use client'

import { useId, useState } from 'react'
import { useLanguage } from '@/lib/language-context'

type QA = { q: string; a: string }

const FAQ: Record<'fr' | 'en', { heading: string; items: QA[] }> = {
  fr: {
    heading: 'Questions fréquentes',
    items: [
      {
        q: 'Que comprend le forfait à 49 € ?',
        a: 'Le forfait comprend l’environnement persistant d’un Collaborateur IA : son identité, sa mémoire, ses profils métier illimités, son profil public, son email, son agenda, son numéro professionnel, son Workspace, ses missions, ses compétences, ses applications autorisées et l’accompagnement d’Alma. La consommation des modèles, des appels et des ressources variables est réglée séparément.',
      },
      {
        q: 'Pourquoi ajouter un autre Collaborateur IA si les profils métier sont illimités ?',
        a: 'Chaque Collaborateur IA peut exercer plusieurs métiers grâce à ses profils métier illimités. Vous en ajoutez un nouveau uniquement lorsqu’une identité distincte ou des ressources dédiées sont nécessaires.',
      },
      {
        q: 'Mon Collaborateur IA peut-il avoir ses propres coordonnées ?',
        a: 'Oui. Il peut disposer d’un profil public, d’une adresse email, d’un agenda et d’un numéro de téléphone professionnels. Vous choisissez les informations visibles, les personnes autorisées à le contacter et les demandes qui peuvent entrer dans votre Workspace.',
      },
      {
        q: 'Peut-il répondre aux visiteurs de mon site ?',
        a: 'Oui. Les demandes reçues depuis son profil public, votre site, son email ou son téléphone peuvent être transformées en missions et suivre les règles de validation définies par votre entreprise.',
      },
      {
        q: 'Comment fonctionne la remise par quantité ?',
        a: 'Le prix unitaire diminue selon le nombre de Collaborateurs IA. Le configurateur applique automatiquement le bon palier.',
      },
      {
        q: 'Comment fonctionne la facturation annuelle ?',
        a: 'La facturation annuelle offre deux mois de forfait. Les crédits, les appels et les autres ressources variables restent facturés séparément et ne bénéficient pas de cette remise.',
      },
      {
        q: 'Quels modèles mon Collaborateur IA peut-il utiliser ?',
        a: 'Unitalk donne accès à plusieurs familles de modèles pour le texte, l’image, la voix, la vidéo et le code. Le modèle utilisé peut varier selon la tâche, les droits, le coût, la confidentialité et la disponibilité.',
      },
      {
        q: 'Puis-je utiliser mes propres clés API ?',
        a: 'Oui. Vous pouvez connecter vos fournisseurs après la création de votre Workspace. Les appels concernés sont alors facturés directement par vos fournisseurs.',
      },
      {
        q: 'Puis-je combiner mes clés et des crédits Unitalk ?',
        a: 'Oui. Le mode hybride permet d’utiliser vos clés pour certains modèles et des crédits Unitalk pour la voix, la téléphonie, les modèles ponctuels ou la continuité de service.',
      },
    ],
  },
  en: {
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'What does the €49 plan include?',
        a: 'The plan includes a Collaborateur IA’s persistent environment: its identity, memory, unlimited job profiles, public profile, email, calendar, professional number, Workspace, missions, skills, allowed applications and Alma’s guidance. Model usage, calls and variable resources are settled separately.',
      },
      {
        q: 'Why add another Collaborateur IA if job profiles are unlimited?',
        a: 'Each Collaborateur IA can hold several roles through its unlimited job profiles. You add a new one only when a distinct identity or dedicated resources are required.',
      },
      {
        q: 'Can my Collaborateur IA have its own contact details?',
        a: 'Yes. It can have a public profile, an email address, a calendar and a professional phone number. You choose what is visible, who may contact it and which requests may enter your Workspace.',
      },
      {
        q: 'Can it answer visitors on my website?',
        a: 'Yes. Requests received from its public profile, your website, its email or its phone can be turned into missions and follow the validation rules your company defines.',
      },
      {
        q: 'How does the volume discount work?',
        a: 'The unit price decreases with the number of Collaborateurs IA. The configurator applies the correct tier automatically.',
      },
      {
        q: 'How does annual billing work?',
        a: 'Annual billing offers two months of the plan. Credits, calls and other variable resources remain billed separately and do not benefit from this discount.',
      },
      {
        q: 'Which models can my Collaborateur IA use?',
        a: 'Unitalk provides access to several model families for text, image, voice, video and code. The model used can vary depending on the task, rights, cost, confidentiality and availability.',
      },
      {
        q: 'Can I use my own API keys?',
        a: 'Yes. You can connect your providers after your Workspace is created. Those calls are then billed directly by your providers.',
      },
      {
        q: 'Can I combine my keys with Unitalk credits?',
        a: 'Yes. Hybrid mode lets you use your keys for some models and Unitalk credits for voice, telephony, occasional models or service continuity.',
      },
    ],
  },
}

function AccordionItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const btnId = useId()
  return (
    <div className="border-b border-[#EFEAE0]">
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-12 w-full items-center justify-between gap-4 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#7A1E3A]/40"
        >
          <span className="text-[15px] font-medium text-[#1C1A17]">{q}</span>
          <span
            aria-hidden="true"
            className={`shrink-0 text-[#A8452F] transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          >
            +
          </span>
        </button>
      </h3>
      {open && (
        <div id={panelId} role="region" aria-labelledby={btnId} className="pb-4 pr-8">
          <p className="text-[14px] leading-relaxed text-[#6B6560]">{a}</p>
        </div>
      )}
    </div>
  )
}

export function PricingFaq() {
  const { lang } = useLanguage()
  const t = FAQ[lang]
  return (
    <section aria-labelledby="faq-heading" className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <h2 id="faq-heading" className="text-center font-serif text-[26px] text-[#1C1A17] sm:text-[30px]">
        {t.heading}
      </h2>
      <div className="mt-8 border-t border-[#EFEAE0]">
        {t.items.map((item) => (
          <AccordionItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  )
}

const COMPARE: Record<'fr' | 'en', { toggle: string; cols: [string, string, string]; rows: { label: string; values: [string, string, string] }[] }> = {
  fr: {
    toggle: 'Comparer les modes de consommation',
    cols: ['Crédits Unitalk', 'Mes clés API', 'Hybride'],
    rows: [
      { label: 'Mise en route', values: ['Immédiate', 'Après connexion des clés', 'Immédiate'] },
      { label: 'Modèles disponibles', values: ['Multimodèle géré', 'Vos fournisseurs', 'Les deux'] },
      { label: 'Facturation', values: ['Budget Unitalk prépayé', 'Vos fournisseurs', 'Budget + vos fournisseurs'] },
      { label: 'Budget maîtrisé', values: ['Oui', 'Selon vos comptes', 'Oui'] },
      { label: 'Voix et téléphonie', values: ['Crédits Unitalk', 'Selon disponibilité', 'Crédits Unitalk'] },
      { label: 'Usage hybride', values: ['—', '—', 'Oui'] },
    ],
  },
  en: {
    toggle: 'Compare consumption modes',
    cols: ['Unitalk credits', 'My API keys', 'Hybrid'],
    rows: [
      { label: 'Setup', values: ['Immediate', 'After connecting keys', 'Immediate'] },
      { label: 'Available models', values: ['Managed multimodel', 'Your providers', 'Both'] },
      { label: 'Billing', values: ['Prepaid Unitalk budget', 'Your providers', 'Budget + your providers'] },
      { label: 'Controlled budget', values: ['Yes', 'Per your accounts', 'Yes'] },
      { label: 'Voice and telephony', values: ['Unitalk credits', 'Where available', 'Unitalk credits'] },
      { label: 'Hybrid usage', values: ['—', '—', 'Yes'] },
    ],
  },
}

export function ModesComparison() {
  const { lang } = useLanguage()
  const t = COMPARE[lang]
  const [open, setOpen] = useState(false)
  const panelId = useId()
  return (
    <section className="mx-auto w-full max-w-3xl px-5 sm:px-8">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-12 w-full items-center justify-between gap-4 rounded-xl border border-[#E5DED0] bg-white px-5 text-left text-[14px] font-medium text-[#1C1A17] outline-none transition-colors hover:border-[#7A1E3A]/40 focus-visible:ring-2 focus-visible:ring-[#7A1E3A]/40"
      >
        {t.toggle}
        <span aria-hidden="true" className={`text-[#A8452F] transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div id={panelId} className="mt-3 overflow-x-auto rounded-xl border border-[#E5DED0] bg-white">
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#EFEAE0]">
                <th scope="col" className="p-3 font-medium text-[#857C6E]" />
                {t.cols.map((c) => (
                  <th key={c} scope="col" className="p-3 font-semibold text-[#1C1A17]">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((row) => (
                <tr key={row.label} className="border-b border-[#F2EDE3] last:border-0">
                  <th scope="row" className="p-3 font-medium text-[#4A453F]">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i} className="p-3 text-[#6B6560]">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
