"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { UnitalkLogo } from "@/components/unitalk-logo"

/**
 * Page d'accueil selon Paul Graham.
 *
 * Règles :
 * - Une phrase par section. Maximum deux.
 * - Pas de jargon. Pas de "solution", "plateforme", "écosystème".
 * - Le CTA est la première chose qu'on voit.
 * - Tout ce qui n'est pas la proposition de valeur → supprimé.
 */

export default function PaulGrahamPage() {
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <Navbar />

      {/* Hero — une phrase, un bouton */}
      <section className="flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
        <UnitalkLogo size={48} />
        <h1 className="mt-8 max-w-2xl text-balance text-[42px] font-bold leading-[1.06] tracking-[-0.03em] sm:text-[56px]">
          Vos collaborateurs IA arrivent au travail lundi.
        </h1>
        <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-[#4E483F]">
          Décrivez le travail à Alma. Elle prépare le Collaborateur IA, vous validez les décisions
          qui comptent.
        </p>
        <Link
          href="/decouvrir?source=paul-graham"
          className="group mt-10 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#D10E63] px-10 text-[16px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(209,14,99,0.55)] transition-transform hover:-translate-y-0.5"
        >
          Parler à Alma
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <p className="mt-6 text-sm text-[#857C6E]">Gratuit. Sans carte bancaire.</p>
      </section>

      {/* Une seule section "Comment ça marche" */}
      <section className="border-t border-[#DED6C8] bg-[#FAF8F3] px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-[28px] font-bold tracking-[-0.03em]">
            Comment ça marche
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                text: "Vous décrivez le travail à Alma, avec vos mots.",
              },
              {
                step: "2",
                text: "Elle cadre la mission : résultat attendu, outils, droits.",
              },
              {
                step: "3",
                text: "Vous validez. Le Collaborateur IA exécute.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#D10E63] text-sm font-bold text-white">
                  {item.step}
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-[#4E483F]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce que vous ne faites plus */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[28px] font-bold tracking-[-0.03em]">
            Ce que vous arrêtez de faire
          </h2>
          <div className="mt-10 space-y-4 text-left">
            {[
              "Répondre aux mêmes questions par email tous les jours.",
              "Qualifier des prospects un par un dans votre CRM.",
              "Préparer les dossiers de réunion le dimanche soir.",
              "Relire des contrats à la recherche d'une clause.",
              "Chercher une information dans 14 documents différents.",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-[#DED6C8] bg-white p-4"
              >
                <span className="mt-0.5 shrink-0 text-[#22A06B]">✓</span>
                <span className="text-[15px] text-[#4E483F]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* La Place de Marché */}
      <section className="border-t border-[#DED6C8] bg-[#FAF8F3] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">
            La Place de Marché
          </p>
          <h2 className="mt-4 text-[28px] font-bold tracking-[-0.03em]">
            Des Collaborateurs IA formés à des métiers, pas à des prompts.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[16px] leading-relaxed text-[#4E483F]">
            Vous ne configurez pas un LLM. Vous choisissez un profil métier — Commercial,
            Relation client, Assistant juridique — qui connaît déjà son domaine et vos outils.
          </p>
          <Link
            href="/collaborateurs-ia/pourquoi-unitalk"
            className="mt-8 inline-flex items-center gap-2 text-[15px] font-bold text-[#D10E63] hover:underline"
          >
            Pourquoi Unitalk <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#181615] px-6 py-20 text-center text-[#FBF9F3]">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-[32px] font-bold leading-[1.06] tracking-[-0.03em] sm:text-[40px]">
            Décrivez votre travail à Alma.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[#CFC6B8]">
            Si elle peut le cadrer, un Collaborateur IA peut l'exécuter.
          </p>
          <Link
            href="/decouvrir?source=paul-graham-final"
            className="group mt-8 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#D10E63] px-10 text-[16px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(209,14,99,0.55)] transition-transform hover:-translate-y-0.5"
          >
            Essayer gratuitement
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}