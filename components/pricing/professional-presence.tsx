import type { Lang } from '@/lib/language-context'

const COPY = {
  fr: {
    eyebrow: 'UNE PRÉSENCE PROFESSIONNELLE',
    title: 'Une identité que vos équipes et vos clients peuvent joindre.',
    body: 'Chaque Collaborateur IA peut disposer de ses propres coordonnées et d’un profil professionnel vérifiable.',
    preview: 'Aperçu',
    role: 'Collaboratrice IA · Solvea',
    verified: 'Entreprise vérifiée',
    field: 'Marketing · Communication',
    availability: 'Disponibilités et rendez-vous',
    actions: ['Écrire', 'Appeler', 'Prendre rendez-vous'],
    control:
      'Vous choisissez ce qui est public, qui peut la contacter et quelles demandes peuvent entrer dans votre Workspace.',
    usage:
      'Les appels, messages et autres usages variables sont réglés avec des crédits Unitalk, vos propres fournisseurs ou une configuration hybride.',
  },
  en: {
    eyebrow: 'A PROFESSIONAL PRESENCE',
    title: 'An identity your teams and clients can reach.',
    body: 'Each Collaborateur IA can have its own contact details and a verifiable professional profile.',
    preview: 'Preview',
    role: 'AI Collaborator · Solvea',
    verified: 'Verified company',
    field: 'Marketing · Communication',
    availability: 'Availability and appointments',
    actions: ['Write', 'Call', 'Book a meeting'],
    control:
      'You choose what is public, who can contact it and which requests may enter your Workspace.',
    usage:
      'Calls, messages and other variable usage are settled with Unitalk credits, your own providers or a hybrid setup.',
  },
} as const

/** Compact premium block demonstrating a Collaborateur IA's public identity. */
export function ProfessionalPresence({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return (
    <section aria-labelledby="presence-title" className="rounded-3xl border border-[#EAE3D5] bg-[#FBF9F3] p-5 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_22px_44px_-34px_rgba(28,26,23,0.3)] sm:p-6">
      <span className="inline-flex items-center rounded-full border border-[#D10E63]/25 bg-[#D10E63]/[0.08] px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">
        {t.eyebrow}
      </span>
      <h3
        id="presence-title"
        className="mt-3 text-pretty font-sf text-[20px] font-bold tracking-[-0.01em] leading-snug text-[#1C1A17]"
      >
        {t.title}
      </h3>
      <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-[#6B6560]">{t.body}</p>

      {/* Realistic, non-interactive profile preview */}
      <figure className="mt-5 rounded-2xl border border-[#EAE3D5] bg-white p-4 sm:p-5">
        <figcaption className="mb-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D10E63] text-[13px] font-semibold text-[#FBF9F3]"
            >
              LÉA
            </span>
            <span className="flex flex-col">
              <span className="text-[15px] font-semibold text-[#1C1A17]">Léa</span>
              <span className="text-[12px] text-[#857C6E]">{t.role}</span>
            </span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#C8E6C9] bg-[#F1F8F1] px-2 py-0.5 text-[11px] font-medium text-[#2E7D32]">
            <span aria-hidden="true">✓</span> {t.verified}
          </span>
        </figcaption>

        <p className="text-[13px] font-medium text-[#1C1A17]">{t.field}</p>

        <dl className="mt-3 grid gap-1.5 text-[13px] text-[#4A453F]">
          <div className="flex items-center gap-2">
            <span className="tabular-nums text-[#857C6E]">unitalk.ai/@lea-solvea</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#857C6E]">lea@solvea.fr</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="tabular-nums text-[#857C6E]">+33 1 •• •• •• ••</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#857C6E]">{t.availability}</span>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-2" aria-hidden="true">
          {t.actions.map((a) => (
            <span
              key={a}
              className="rounded-full border border-[#E5DED0] bg-[#FBF9F3] px-3 py-1 text-[12px] font-medium text-[#6B6560]"
            >
              {a}
            </span>
          ))}
        </div>

        <span className="mt-3 inline-block text-[11px] uppercase tracking-[0.12em] text-[#B7AE9E]">
          {t.preview}
        </span>
      </figure>

      <p className="mt-4 text-[13px] leading-relaxed text-[#6B6560]">{t.control}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-[#6B6560]">{t.usage}</p>
    </section>
  )
}
