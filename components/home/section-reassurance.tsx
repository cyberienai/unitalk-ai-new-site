const T = {
  fr: {
    items: [
      { label: 'Accompagnement', title: 'Vous n’êtes jamais seul', desc: 'Alma vous accompagne et transmet à un ingénieur IA si nécessaire.' },
      { label: 'Évolution', title: 'Profils métier et compétences sans limite', desc: 'Faites évoluer chaque Collaborateur IA selon vos missions.' },
      { label: 'Intégrations', title: 'Plus de 3 000 intégrations disponibles', desc: 'Connectez les outils que votre entreprise utilise déjà.' },
      { label: 'Modèles IA', title: 'Le modèle le plus pertinent pour chaque tâche', desc: 'Unitalk le sélectionne parmi les modèles autorisés pour le travail à accomplir.' },
    ],
  },
  en: {
    items: [
      { label: 'Support', title: 'You are never on your own', desc: 'Alma supports you and hands over to an AI engineer when needed.' },
      { label: 'Evolution', title: 'Job profiles and skills without limits', desc: 'Evolve each AI Collaborator as your missions change.' },
      { label: 'Integrations', title: 'More than 3,000 integrations available', desc: 'Connect the tools your company already uses.' },
      { label: 'AI models', title: 'The most relevant model for each task', desc: 'Unitalk selects it from the models authorized for the work at hand.' },
    ],
  },
} as const

export function SectionReassurance({ lang }: { lang: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section aria-label={lang === 'fr' ? 'Réassurance' : 'Reassurance'} className="w-full bg-[#EAE3D4]">
      <div className="editorial-shell py-14 sm:py-16">
        <ul className="grid border-l border-t border-[#BFB5A5] sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, index) => (
            <li key={item.title} className="relative min-h-[190px] border-b border-r border-[#BFB5A5] p-5 sm:p-6">
              <div className="flex items-center justify-between"><span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#B00C54]" aria-hidden="true">{item.label}</span><span className="font-mono text-[9px] text-[#857C6E]">0{index + 1}</span></div>
              <h2 className="mt-4 max-w-[15rem] font-sf text-[17px] font-semibold leading-[1.2] tracking-[-0.015em] text-[#1C1A17] lg:min-h-[2.5rem]">
                {item.title}
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
