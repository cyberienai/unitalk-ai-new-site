const T = {
  fr: {
    items: [
      { title: 'Vous n’êtes jamais seul', desc: 'Alma vous accompagne et transmet à un ingénieur IA si nécessaire.' },
      { title: 'Profils métier et compétences sans limite', desc: 'Faites évoluer chaque Collaborateur IA selon vos missions.' },
      { title: 'Plus de 3 000 intégrations disponibles', desc: 'Connectez les outils que votre entreprise utilise déjà.' },
      { title: 'Le modèle adapté à chaque tâche', desc: 'Unitalk sélectionne le modèle autorisé le plus pertinent pour le travail à accomplir.' },
    ],
  },
  en: {
    items: [
      { title: 'You are never on your own', desc: 'Alma supports you and hands over to an AI engineer when needed.' },
      { title: 'Job profiles and skills without limits', desc: 'Evolve each AI Collaborator as your missions change.' },
      { title: 'More than 3,000 integrations available', desc: 'Connect the tools your company already uses.' },
      { title: 'The right model for each task', desc: 'Unitalk selects the most relevant authorized model for the work at hand.' },
    ],
  },
} as const

export function SectionReassurance({ lang }: { lang: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section aria-label={lang === 'fr' ? 'Réassurance' : 'Reassurance'} className="w-full border-y border-[#DED6C8] bg-[#EAE3D4]">
      <div className="editorial-shell py-9 sm:py-11">
        <ul className="grid gap-y-8 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-0">
          {t.items.map((item, index) => (
            <li key={item.title} className="relative border-t border-[#BFB5A5] pt-4 lg:min-h-[152px] lg:border-l lg:border-t-0 lg:px-6 lg:pt-0 first:lg:border-l-0 first:lg:pl-0 last:lg:pr-0">
              <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-[#B00C54]" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
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
