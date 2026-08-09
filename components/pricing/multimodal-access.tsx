import type { Lang } from '@/lib/language-context'

const COPY = {
  fr: {
    eyebrow: 'INTELLIGENCE MULTIMODALE',
    title: 'Le meilleur modèle autorisé pour chaque tâche.',
    body1:
      'Votre Collaborateur IA peut utiliser les modèles les plus adaptés au texte, à l’image, à la voix, à la vidéo et au code.',
    body2:
      'Unitalk peut changer de modèle selon la mission sans changer de Collaborateur IA, perdre sa mémoire ou interrompre son travail.',
    modalities: ['Texte', 'Image', 'Voix', 'Vidéo', 'Code'],
    footer:
      'L’accès multimodèle est inclus dans le forfait. La consommation est réglée avec des crédits Unitalk, vos propres clés API ou les deux.',
  },
  en: {
    eyebrow: 'MULTIMODAL INTELLIGENCE',
    title: 'The best allowed model for each task.',
    body1:
      'Your Collaborateur IA can use the models best suited to text, image, voice, video and code.',
    body2:
      'Unitalk can switch models depending on the mission without changing Collaborateur IA, losing its memory or interrupting its work.',
    modalities: ['Text', 'Image', 'Voice', 'Video', 'Code'],
    footer:
      'Multimodel access is included in the plan. Usage is settled with Unitalk credits, your own API keys, or both.',
  },
} as const

/** Compact block explaining included multimodel access without brand lists. */
export function MultimodalAccess({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return (
    <section aria-labelledby="multimodal-title" className="rounded-3xl border border-[#EAE3D5] bg-[#FBF9F3] p-5 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_22px_44px_-34px_rgba(28,26,23,0.3)] sm:p-6">
      <span className="inline-flex items-center rounded-full border border-[#D10E63]/25 bg-[#D10E63]/[0.08] px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">
        {t.eyebrow}
      </span>
      <h3
        id="multimodal-title"
        className="mt-3 text-pretty font-sf text-[20px] font-bold tracking-[-0.01em] leading-snug text-[#1C1A17]"
      >
        {t.title}
      </h3>
      <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-[#6B6560]">{t.body1}</p>
      <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-[#6B6560]">{t.body2}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {t.modalities.map((m) => (
          <li
            key={m}
            className="rounded-full border border-[#E5DED0] bg-white px-3 py-1 text-[12px] font-medium text-[#4A453F]"
          >
            {m}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[13px] leading-relaxed text-[#6B6560]">{t.footer}</p>
    </section>
  )
}
