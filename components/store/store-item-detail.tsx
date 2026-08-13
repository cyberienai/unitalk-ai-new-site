'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import {
  CREATOR_LABELS,
  facetLabels,
  getStoreItemBySlug,
  storeItemHref,
  TYPE_LABELS,
  TYPE_LABELS_PLURAL,
  TYPE_SLUGS,
  type StoreItem,
} from '@/lib/store-catalog'

function creatorLine(item: StoreItem, lang: 'fr' | 'en'): string {
  if (item.type === 'application' && item.editor) return item.editor
  return CREATOR_LABELS[item.creator][lang]
}

// A labelled block of bullet points; only renders when the source list exists.
function BulletBlock({ title, items }: { title: string; items?: { fr: string; en: string }[] }) {
  const { lang } = useLanguage()
  if (!items || items.length === 0) return null
  return (
    <section className="border-t border-[var(--store-line)] pt-6">
      <h2 className="font-sf text-sm font-bold uppercase tracking-[0.08em] text-[var(--store-muted)]">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[var(--store-text)]">
            <Check className="mt-1 h-4 w-4 shrink-0 text-[#D10E63]" />
            <span>{it[lang]}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

// Chips linking to related Store items (resolved by slug).
function RelatedChips({ title, slugs }: { title: string; slugs?: string[] }) {
  const { lang } = useLanguage()
  if (!slugs || slugs.length === 0) return null
  const items = slugs.map(getStoreItemBySlug).filter(Boolean) as StoreItem[]
  if (items.length === 0) return null
  return (
    <section className="border-t border-[var(--store-line)] pt-6">
      <h2 className="font-sf text-sm font-bold uppercase tracking-[0.08em] text-[var(--store-muted)]">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((it) => (
          <Link
            key={it.slug}
            href={storeItemHref(it)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--store-line)] bg-[var(--store-surface)] px-3 py-1.5 text-[13px] font-medium text-[var(--store-text)] transition-colors hover:border-[#D10E63]/50 hover:text-[#AD0C53]"
          >
            {it.name[lang]}
            <ArrowRight className="h-3.5 w-3.5 text-[#D10E63]" />
          </Link>
        ))}
      </div>
    </section>
  )
}

export function StoreItemDetail({ typeSlug, slug }: { typeSlug: string; slug: string }) {
  const { lang } = useLanguage()
  const item = getStoreItemBySlug(slug)

  if (!item) return null

  const t = {
    back:
      lang === 'fr'
        ? `Retour aux ${TYPE_LABELS_PLURAL[item.type].fr.toLowerCase()}`
        : `Back to ${TYPE_LABELS_PLURAL[item.type].en.toLowerCase()}`,
    add: item.type === 'profil' ? (lang === 'fr' ? 'Ajouter ce profil métier' : 'Add this job profile') : (lang === 'fr' ? 'Ajouter à un Collaborateur' : 'Add to a Collaborator'),
    compose: lang === 'fr' ? 'Préparer avec Alma' : 'Prepare with Alma',
    createdBy: lang === 'fr' ? 'Créé par' : 'Created by',
    editor: lang === 'fr' ? 'Éditeur' : 'Editor',
    roleInOrg: lang === 'fr' ? 'Rôle dans l’Organisation' : 'Role in the Organization',
    knowHow: lang === 'fr' ? 'Savoir-faire inclus' : 'Included know-how',
    exampleMissions: lang === 'fr' ? 'Missions possibles' : 'Example missions',
    enables: lang === 'fr' ? 'Ce qu’elle permet' : 'What it enables',
    produces: lang === 'fr' ? 'Ce qu’elle produit' : 'What it produces',
    contexts: lang === 'fr' ? 'Contextes d’usage' : 'Usage contexts',
    uses: lang === 'fr' ? 'Ce que le Collaborateur peut y faire' : 'What the Collaborator can do',
    actions: lang === 'fr' ? 'Actions disponibles' : 'Available actions',
    dataAccessed: lang === 'fr' ? 'Données concernées' : 'Data accessed',
    permissions: lang === 'fr' ? 'Autorisations requises' : 'Required permissions',
    relatedSkills: lang === 'fr' ? 'Compétences liées' : 'Related skills',
    possibleApps: lang === 'fr' ? 'Applications possibles' : 'Possible applications',
    relatedProfiles: lang === 'fr' ? 'Profils associés' : 'Related profiles',
    neededApps: lang === 'fr' ? 'Applications nécessaires' : 'Needed applications',
    compatibleProfiles: lang === 'fr' ? 'Profils compatibles' : 'Compatible profiles',
    compatibleSkills: lang === 'fr' ? 'Compétences compatibles' : 'Compatible skills',
  }

  const typeLabel = TYPE_LABELS[item.type][lang]

  return (
    <main className="min-h-screen bg-[var(--store-page)]">
      <div className="mx-auto max-w-[820px] px-6 pb-36 pt-28 sm:pt-[124px] lg:pt-[136px]">
        <Link
          href={`/collaborateurs-ia/${TYPE_SLUGS[item.type]}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--store-muted)] transition-colors hover:text-[#AD0C53]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </Link>

        {/* Header */}
        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[var(--store-muted)]">
            <span className="rounded-full bg-[#F2E4EC] px-2.5 py-1 font-semibold text-[#AD0C53]">{typeLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{facetLabels(item.type)[item.facet]?.[lang] ?? item.facet}</span>
          </div>
          <h1 className="mt-3 text-balance font-sf text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--store-text)]">
            {item.name[lang]}
          </h1>
          <p className="mt-3 max-w-[640px] text-pretty text-[17px] leading-relaxed text-[var(--store-muted)]">
            {item.description[lang]}
          </p>
          <p className="mt-3 text-[13px] text-[var(--store-muted)]">
            {item.type === 'application' && item.editor ? t.editor : t.createdBy}{' '}
            <span className="font-semibold text-[var(--store-text)]">{creatorLine(item, lang)}</span>
          </p>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/decouvrir?store=${item.slug}`}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#D10E63] px-5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B60C56]"
            >
              {t.add}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/decouvrir?compose=${item.slug}`}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--store-line)] bg-[var(--store-surface)] px-5 text-sm font-semibold text-[var(--store-text)] transition-colors hover:border-[#D10E63]/50 hover:text-[#AD0C53]"
            >
              <Sparkles className="h-4 w-4 text-[#D10E63]" />
              {t.compose}
            </Link>
          </div>
        </header>

        {/* Body */}
        <div className="mt-10 space-y-6">
          {item.roleInOrg && (
            <section className="border-t border-[var(--store-line)] pt-6">
              <h2 className="font-sf text-sm font-bold uppercase tracking-[0.08em] text-[var(--store-muted)]">
                {t.roleInOrg}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--store-text)]">{item.roleInOrg[lang]}</p>
            </section>
          )}
          {item.connection && (
            <section className="border-t border-[var(--store-line)] pt-6">
              <h2 className="font-sf text-sm font-bold uppercase tracking-[0.08em] text-[var(--store-muted)]">
                {lang === 'fr' ? 'Connexion' : 'Connection'}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--store-text)]">{item.connection[lang]}</p>
            </section>
          )}

          <BulletBlock title={t.knowHow} items={item.knowHow} />
          <BulletBlock title={t.enables} items={item.enables} />
          <BulletBlock title={t.produces} items={item.produces} />
          <BulletBlock title={t.uses} items={item.uses} />
          <BulletBlock title={t.actions} items={item.actions} />
          <BulletBlock title={t.dataAccessed} items={item.dataAccessed} />
          <BulletBlock title={t.permissions} items={item.permissions} />
          <BulletBlock title={t.contexts} items={item.contexts} />
          <BulletBlock title={t.exampleMissions} items={item.exampleMissions} />

          <RelatedChips title={t.relatedSkills} slugs={item.relatedSkills} />
          <RelatedChips title={t.possibleApps} slugs={item.possibleApps} />
          <RelatedChips title={t.relatedProfiles} slugs={item.relatedProfiles} />
          <RelatedChips title={t.neededApps} slugs={item.neededApps} />
          <RelatedChips title={t.compatibleProfiles} slugs={item.compatibleProfiles} />
          <RelatedChips title={t.compatibleSkills} slugs={item.compatibleSkills} />
          {item.type === 'profil' && (
            <section className="border-t border-[var(--store-line)] pt-6">
              <h2 className="font-sf text-sm font-bold uppercase tracking-[0.08em] text-[var(--store-muted)]">{lang === 'fr' ? 'Adaptations' : 'Adaptations'}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--store-text)]">{lang === 'fr' ? 'Alma vérifie les compétences, les applications, le secteur, le pays et les validations nécessaires avant l’ajout.' : 'Alma checks the skills, applications, industry, country and required approvals before adding it.'}</p>
            </section>
          )}
        </div>
      </div>
      {item.type === 'profil' && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--store-line)] bg-[#FAF8F3]/95 px-5 py-3 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[820px] items-center justify-between gap-4">
            <p className="hidden text-xs text-[var(--store-muted)] sm:block">{lang === 'fr' ? 'Alma vérifie son adaptation à votre entreprise avant son ajout.' : 'Alma checks its fit for your company before adding it.'}</p>
            <Link href={`/decouvrir?store=${item.slug}`} className="ml-auto inline-flex h-11 items-center gap-2 rounded-xl bg-[#D10E63] px-5 text-sm font-bold text-white">{t.add}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      )}
    </main>
  )
}
