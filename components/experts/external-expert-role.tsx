'use client'

import Link from 'next/link'
import { ShieldCheck, Clock, Eye, Ban, UserPlus, ArrowRight } from 'lucide-react'
import type { Lang } from '@/lib/language-context'

/**
 * Static mockup of the "Expert externe" Workspace role.
 *
 * Presents how a human expert is granted TEMPORARY, SCOPED access to an
 * organization: a distinct role badge, an explicit perimeter, an expiry date,
 * and the owner controls (invite / limit / remove). No backend — this is a
 * presentation of the governance model, consistent with the rest of the demo
 * Workspace.
 */
export function ExternalExpertRole({ lang }: { lang: Lang }) {
  const t = COPY[lang]

  return (
    <section className="border-y border-[#E4DDCE] px-5 py-20 sm:px-8 sm:py-28">
      <div className="editorial-shell max-w-3xl">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#AD0C53]">{t.kicker}</p>
        <h2 className="mt-4 font-sf text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#5C5449]">{t.body}</p>

        {/* Role card */}
        <div className="mt-9 overflow-hidden rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3]">
          {/* Header: identity + role badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE8DA] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1C1A17] font-sf text-sm font-bold text-[#FBF9F3]">
                ML
              </span>
              <div className="min-w-0">
                <p className="font-sf text-[15px] font-bold text-[#1C1A17]">{t.person}</p>
                <p className="text-[13px] text-[#8A8175]">{t.personRole}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D10E63]/25 bg-[#FCEAF2] px-3 py-1 text-xs font-bold text-[#AD0C53]">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t.roleBadge}
            </span>
          </div>

          {/* Scope + expiry */}
          <div className="grid gap-px bg-[#EFE8DA] sm:grid-cols-2">
            <div className="bg-[#FBF9F3] px-5 py-4 sm:px-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">{t.scopeWord}</p>
              <p className="mt-1.5 text-sm leading-snug text-[#3B362F]">{t.scopeValue}</p>
            </div>
            <div className="bg-[#FBF9F3] px-5 py-4 sm:px-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">{t.expiryWord}</p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold leading-snug text-[#3B362F]">
                <Clock className="h-4 w-4 text-[#AD0C53]" />
                {t.expiryValue}
              </p>
            </div>
          </div>

          {/* What the role can / cannot do */}
          <div className="grid gap-6 px-5 py-5 sm:grid-cols-2 sm:px-6">
            <div>
              <p className="text-[13px] font-bold text-[#1C1A17]">{t.canWord}</p>
              <ul className="mt-2 space-y-1.5">
                {t.canItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-[#5C5449]">
                    <Eye className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2E7D5B]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#1C1A17]">{t.cannotWord}</p>
              <ul className="mt-2 space-y-1.5">
                {t.cannotItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-[#5C5449]">
                    <Ban className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B0483C]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Owner controls (static) */}
          <div className="flex flex-wrap items-center gap-2 border-t border-[#EFE8DA] px-5 py-4 sm:px-6">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#1C1A17] px-3.5 py-2 text-[13px] font-bold text-[#FBF9F3]">
              <UserPlus className="h-3.5 w-3.5" />
              {t.invite}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8D0C2] px-3.5 py-2 text-[13px] font-semibold text-[#3B362F]">
              {t.limit}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8D0C2] px-3.5 py-2 text-[13px] font-semibold text-[#B0483C]">
              {t.remove}
            </span>
          </div>
        </div>

        <Link
          href="/experts"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#AD0C53] underline-offset-4 transition-colors hover:underline"
        >
          {t.cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}

const COPY = {
  fr: {
    kicker: 'Rôle · Expert externe',
    title: 'Invitez un expert, avec des droits limités.',
    body: 'Un expert peut rejoindre votre Workspace le temps d’une mise en place. Vous lui accordez un accès précis, pour une durée définie, que vous pouvez restreindre ou retirer à tout moment.',
    person: 'Marc Lefèvre',
    personRole: 'Expert intégration · CRM',
    roleBadge: 'Expert externe',
    scopeWord: 'Périmètre accordé',
    scopeValue: 'Configuration du Collaborateur commercial et connexion du CRM, sur l’espace « Prospection ».',
    expiryWord: 'Accès valable jusqu’au',
    expiryValue: '30 jours — 15 mars',
    canWord: 'Il peut',
    canItems: ['voir l’espace « Prospection »', 'configurer les profils et compétences', 'préparer les connexions d’applications'],
    cannotWord: 'Il ne peut pas',
    cannotItems: ['accéder aux autres espaces', 'lancer une mission sans votre accord', 'exporter vos données'],
    invite: 'Inviter un expert',
    limit: 'Restreindre le périmètre',
    remove: 'Retirer l’accès',
    cta: 'Comment fonctionne l’accompagnement',
  },
  en: {
    kicker: 'Role · External expert',
    title: 'Invite an expert, with limited rights.',
    body: 'An expert can join your Workspace for the duration of a setup. You grant precise access, for a defined period, that you can restrict or revoke at any time.',
    person: 'Marc Lefèvre',
    personRole: 'Integration expert · CRM',
    roleBadge: 'External expert',
    scopeWord: 'Granted perimeter',
    scopeValue: 'Setup of the sales Collaborator and CRM connection, on the “Prospecting” space.',
    expiryWord: 'Access valid until',
    expiryValue: '30 days — March 15',
    canWord: 'It can',
    canItems: ['view the “Prospecting” space', 'configure profiles and skills', 'prepare application connections'],
    cannotWord: 'It cannot',
    cannotItems: ['access other spaces', 'launch a mission without your approval', 'export your data'],
    invite: 'Invite an expert',
    limit: 'Restrict the perimeter',
    remove: 'Revoke access',
    cta: 'How the accompaniment works',
  },
} as const
