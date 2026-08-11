import type { Lang } from '@/lib/language-context'

const COPY = {
  fr: {
    title: 'Le modèle adapté à chaque mission.',
    body:
      'Votre Collaborateur IA peut utiliser les modèles autorisés pour le texte, l’image, la voix, la vidéo et le code, sans changer d’identité ni perdre son contexte.',
    modalities: ['Texte', 'Image', 'Voix', 'Vidéo', 'Code'],
  },
  en: {
    title: 'The right model for every mission.',
    body:
      'Your AI Collaborator can use approved models for text, image, voice, video and code without changing identity or losing context.',
    modalities: ['Text', 'Image', 'Voice', 'Video', 'Code'],
  },
} as const

/** Compact block explaining included multimodel access without brand lists. */
export function MultimodalAccess({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return (
    <section aria-labelledby="multimodal-title" className="rounded-3xl border border-[#EAE3D5] bg-[#FBF9F3] p-5 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_22px_44px_-34px_rgba(28,26,23,0.3)] sm:p-6">
      <h3
        id="multimodal-title"
        className="text-pretty font-sf text-[20px] font-bold tracking-[-0.01em] leading-snug text-[#1C1A17]"
      >
        {t.title}
      </h3>
      <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-[#6B6560]">{t.body}</p>

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
    </section>
  )
}
