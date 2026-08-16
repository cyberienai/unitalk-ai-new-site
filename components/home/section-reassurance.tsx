import { AlmaFace } from '@/components/alma-face'

const T = {
  fr: {
    items: [
      { label: 'Accompagnement', title: 'Vous êtes accompagné à chaque étape', desc: 'Alma vous accompagne et fait intervenir un ingénieur IA si nécessaire.' },
      { label: 'Évolution', title: 'Des profils et compétences qui évoluent', desc: 'Adaptez chaque Collaborateur IA aux missions que vous lui confiez.' },
      { label: 'Intégrations', title: 'Plus de 3 000 intégrations au catalogue', desc: 'Connectez les outils que votre entreprise utilise déjà.' },
      { label: 'Modèles IA', title: 'Un modèle adapté à chaque tâche', desc: 'Unitalk le sélectionne parmi les modèles autorisés par votre entreprise.' },
    ],
  },
  en: {
    items: [
      { label: 'Support', title: 'Guidance at every step', desc: 'Alma supports you and brings in an AI engineer when needed.' },
      { label: 'Evolution', title: 'Profiles and skills that evolve', desc: 'Adapt each AI Collaborator to the missions you entrust.' },
      { label: 'Integrations', title: 'More than 3,000 catalog integrations', desc: 'Connect the tools your company already uses.' },
      { label: 'AI models', title: 'A model suited to each task', desc: 'Unitalk selects it from the models authorized by your company.' },
    ],
  },
} as const

export function SectionReassurance({ lang }: { lang: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section aria-label={lang === 'fr' ? 'Réassurance' : 'Reassurance'} className="w-full bg-[#EAE3D4]">
      <div className="editorial-shell py-10 sm:py-12">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, index) => (
            <li key={item.title} className="relative min-h-[160px] border-b border-[#CFC5B5] px-1 py-6 last:border-b-0 sm:px-6 sm:first:pl-0 sm:[&:nth-child(2)]:border-l sm:[&:nth-child(2)]:pl-6 sm:[&:nth-child(n+3)]:border-b-0 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:[&:nth-child(3)]:pl-6">
              <span className="inline-flex rounded-xl border border-[#D10E63]/20 bg-[#D10E63]/[0.08] px-3 py-1.5 text-[12px] font-bold text-[#B00C54]" aria-hidden="true">{item.label}</span>
              <h2 className="mt-4 max-w-[15rem] text-[17px] font-semibold leading-[1.2] tracking-[-0.015em] text-[#1C1A17] lg:min-h-[2.5rem]">
                {index === 0 && <AlmaFace em={1.35} />}{item.title}
              </h2>
              <p className="mt-3 max-w-[17rem] text-[13px] leading-[1.55] text-[#5A5348]">
                {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
