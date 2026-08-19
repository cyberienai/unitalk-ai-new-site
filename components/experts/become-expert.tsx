'use client'

import { forwardRef, useState } from 'react'
import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { BECOME_EXPERT_DOMAINS } from '@/lib/experts'

/**
 * "Become an expert Unitalk" (brief §11). A short section for professionals plus
 * an honest form asking only the requested fields — no certification promise
 * while the partner program isn't live.
 */
export const BecomeExpert = forwardRef<HTMLElement, { lang: Lang }>(function BecomeExpert({ lang }, ref) {
  const fr = lang === 'fr'

  const [form, setForm] = useState({
    name: '',
    company: '',
    domain: '',
    experience: '',
    zone: '',
    languages: '',
    link: '',
    message: '',
  })
  const [touched, setTouched] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const requiredOk = form.name.trim() && form.company.trim() && form.domain.trim() && form.experience.trim()

  function submit() {
    if (!requiredOk) {
      setTouched(true)
      return
    }
    // No partner backend yet — this records interest client-side, honestly.
    setSent(true)
  }

  const t = {
    eyebrow: fr ? 'Pour les professionnels' : 'For professionals',
    title: fr ? 'Orchestrez les Collaborateurs IA de vos clients.' : 'Orchestrate your clients’ AI Collaborators.',
    lead: fr
      ? 'Concevez leurs missions, développez leurs profils métier, intégrez leurs applications et accompagnez leurs équipes.'
      : 'Design their missions, develop their job profiles, integrate their applications and support their teams.',
    secondary: fr ? 'Découvrir le programme partenaires' : 'Discover the partner program',
    economy: fr
      ? 'Unitalk fournit le socle. Les experts conçoivent, déploient et améliorent le fonctionnement de l’entreprise.'
      : 'Unitalk provides the foundation. Experts design, deploy and improve the organization of work.',
    // form
    formTitle: fr ? 'Devenir expert Unitalk' : 'Become a Unitalk expert',
    formNote: fr
      ? 'Le programme partenaires n’est pas encore ouvert. Présentez-vous : nous revenons vers les profils adaptés.'
      : 'The partner program isn’t open yet. Introduce yourself: we get back to the right profiles.',
    name: fr ? 'Identité' : 'Full name',
    namePh: fr ? 'Prénom et nom' : 'First and last name',
    company: fr ? 'Entreprise' : 'Company',
    companyPh: fr ? 'Votre société ou statut' : 'Your company or status',
    domain: fr ? 'Domaine d’expertise' : 'Area of expertise',
    domainPh: fr ? 'Choisir un domaine' : 'Choose a domain',
    experience: fr ? 'Expérience' : 'Experience',
    experiencePh: fr ? 'Ex. : 8 ans en intégration d’outils métier' : 'E.g. 8 years integrating business tools',
    zone: fr ? 'Zone d’intervention' : 'Coverage area',
    zonePh: fr ? 'Ex. : France, à distance' : 'E.g. France, remote',
    languages: fr ? 'Langues' : 'Languages',
    languagesPh: fr ? 'Ex. : Français, anglais' : 'E.g. French, English',
    link: fr ? 'Lien professionnel' : 'Professional link',
    linkPh: fr ? 'Site, LinkedIn…' : 'Website, LinkedIn…',
    message: fr ? 'Message' : 'Message',
    messagePh: fr ? 'Ce que vous aimeriez apporter aux clients Unitalk…' : 'What you’d like to bring to Unitalk clients…',
    optional: fr ? 'facultatif' : 'optional',
    submit: fr ? 'Devenir expert Unitalk' : 'Become a Unitalk expert',
    required: fr ? 'Merci de compléter les champs requis.' : 'Please complete the required fields.',
    successTitle: fr ? 'Merci, c’est bien reçu.' : 'Thank you, well received.',
    successBody: fr
      ? 'Nous revenons vers vous dès que le programme partenaires ouvre aux profils comme le vôtre.'
      : 'We’ll get back to you when the partner program opens to profiles like yours.',
    privacy: fr ? 'Vos informations ne sont utilisées que pour cette prise de contact.' : 'Your information is used only for this contact.',
  }

  const labelCls = 'text-xs font-bold uppercase tracking-wide text-[var(--store-muted)]'
  const fieldCls =
    'mt-1.5 w-full rounded-2xl border border-[var(--store-line)] bg-[var(--store-page)] px-4 py-3 text-sm text-[var(--store-text)] outline-none transition-colors placeholder:text-[var(--store-muted)] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/25'

  return (
    <section
      ref={ref}
      id="devenir-expert"
      className="scroll-mt-24 border-t border-[#E7DFD0] bg-[#FBF7F2]"
      aria-labelledby="become-expert-title"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:px-8">
        {/* Left — pitch */}
        <div className="lg:pt-4">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">{t.eyebrow}</p>
          <h2
            id="become-expert-title"
            className="mt-3 text-balance font-sf text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--store-text)] sm:text-[34px]"
          >
            {t.title}
          </h2>
          <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-[var(--store-muted)]">{t.lead}</p>

          <div className="mt-7 rounded-2xl border-l-2 border-[#D10E63] bg-[#FBF9F3] px-5 py-4">
            <p className="text-pretty text-[14px] font-medium leading-relaxed text-[var(--store-text)]">{t.economy}</p>
          </div>

          <a
            href="/manifeste"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D10E63] underline-offset-4 transition-colors hover:text-[#B00B52] hover:underline"
          >
            {t.secondary}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Right — form */}
        <div>
          {sent ? (
            <div className="rounded-3xl border border-[var(--store-line)] bg-[var(--store-surface)] p-6 text-center sm:p-8">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F6EE]">
                <Check className="h-6 w-6 text-[#22A06B]" />
              </span>
              <h3 className="mt-4 font-sf text-lg font-bold text-[var(--store-text)]">{t.successTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--store-muted)]">{t.successBody}</p>
            </div>
          ) : (
            <div className="rounded-3xl border border-[var(--store-line)] bg-[var(--store-surface)] p-6 sm:p-8">
              <h3 className="font-sf text-lg font-bold tracking-[-0.01em] text-[var(--store-text)]">{t.formTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--store-muted)]">{t.formNote}</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={labelCls}>{t.name}</span>
                  <input type="text" autoComplete="name" value={form.name} onChange={set('name')} placeholder={t.namePh} className={fieldCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>{t.company}</span>
                  <input type="text" autoComplete="organization" value={form.company} onChange={set('company')} placeholder={t.companyPh} className={fieldCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>{t.domain}</span>
                  <select value={form.domain} onChange={set('domain')} className={fieldCls}>
                    <option value="">{t.domainPh}</option>
                    {BECOME_EXPERT_DOMAINS.map((d) => (
                      <option key={d.fr} value={d.fr}>
                        {d[lang]}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className={labelCls}>{t.experience}</span>
                  <input type="text" value={form.experience} onChange={set('experience')} placeholder={t.experiencePh} className={fieldCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>
                    {t.zone} <span className="font-normal normal-case tracking-normal">({t.optional})</span>
                  </span>
                  <input type="text" value={form.zone} onChange={set('zone')} placeholder={t.zonePh} className={fieldCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>
                    {t.languages} <span className="font-normal normal-case tracking-normal">({t.optional})</span>
                  </span>
                  <input type="text" value={form.languages} onChange={set('languages')} placeholder={t.languagesPh} className={fieldCls} />
                </label>
                <label className="block sm:col-span-2">
                  <span className={labelCls}>
                    {t.link} <span className="font-normal normal-case tracking-normal">({t.optional})</span>
                  </span>
                  <input type="url" inputMode="url" value={form.link} onChange={set('link')} placeholder={t.linkPh} className={fieldCls} />
                </label>
                <label className="block sm:col-span-2">
                  <span className={labelCls}>
                    {t.message} <span className="font-normal normal-case tracking-normal">({t.optional})</span>
                  </span>
                  <textarea rows={3} value={form.message} onChange={set('message')} placeholder={t.messagePh} className={`${fieldCls} resize-none`} />
                </label>
              </div>

              {touched && !requiredOk && <p className="mt-3 text-xs font-medium text-[#C0392B]">{t.required}</p>}

              <button
                type="button"
                onClick={submit}
                className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--store-surface)]"
              >
                {t.submit}
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-[var(--store-muted)]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#22A06B]" />
                {t.privacy}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
})
