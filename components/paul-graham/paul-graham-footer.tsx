"use client"

import Link from "next/link"
import { useLanguage, type Lang } from "@/lib/language-context"

type GroupLabel = Record<Lang, string>

const TOP_MISSIONS: { label: GroupLabel; slug: string }[] = [
  { label: { fr: "Trouver des clients", en: "Find clients" }, slug: "trouver-de-nouveaux-clients" },
  { label: { fr: "Répondre aux clients", en: "Reply to clients" }, slug: "repondre-a-mes-clients" },
  { label: { fr: "Relancer les factures", en: "Chase invoices" }, slug: "relancer-les-factures-impayees" },
  { label: { fr: "Préparer un CODIR", en: "Prepare exec meeting" }, slug: "preparer-un-comite-de-direction" },
  { label: { fr: "Suivre les réclamations", en: "Track complaints" }, slug: "suivre-les-reclamations" },
  { label: { fr: "Créer mes contenus", en: "Create my content" }, slug: "creer-mes-contenus" },
  { label: { fr: "Préparer mon reporting", en: "Prepare my reporting" }, slug: "preparer-mon-reporting-financier" },
  { label: { fr: "Surveiller mes concurrents", en: "Monitor competitors" }, slug: "realiser-une-veille-concurrentielle" },
]

const BOTTOM_LINKS: { label: GroupLabel; href: string }[] = [
  { label: { fr: "Architectes de l'IA", en: "AI Architects" }, href: "/leaders" },
  { label: { fr: "Pourquoi Unitalk", en: "Why Unitalk" }, href: "/collaborateurs-ia/pourquoi-unitalk" },
  { label: { fr: "Tarifs", en: "Pricing" }, href: "/tarifs" },
  { label: { fr: "Documentation", en: "Documentation" }, href: "/documentation" },
  { label: { fr: "Mentions légales", en: "Legal" }, href: "/mentions-legales" },
]

export function PaulGrahamFooter() {
  const { lang } = useLanguage()

  return (
    <footer className="border-t border-[#DED6C8] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Mission links for SEO */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TOP_MISSIONS.map((m) => (
            <Link
              key={m.slug}
              href={`/missions/${m.slug}`}
              className="text-sm text-[#857C6E] transition-colors hover:text-[#1C1A17]"
            >
              {m.label[lang]}
            </Link>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#DED6C8] pt-6 sm:flex-row">
          <p className="text-xs text-[#A79E8E]">
            Unitalk · Paris, France ·{" "}
            <a href="mailto:hello@unitalk.ai" className="underline hover:text-[#4E483F]">hello@unitalk.ai</a>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {BOTTOM_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[#857C6E] transition-colors hover:text-[#1C1A17]"
              >
                {link.label[lang]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
