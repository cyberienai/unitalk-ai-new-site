'use client'

import Link from 'next/link'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { AlmaInline } from '@/components/alma-inline'
import { SKILL_CATEGORY_LABELS, STORE_ITEMS, searchStore, type Creator, type StoreItem } from '@/lib/store-catalog'

const PAGE_SIZE = 12
const CATEGORY_ORDER = ['all', 'ventes', 'relation-client', 'marketing', 'reunions', 'administration', 'finance', 'documents', 'operations'] as const

const METHOD_OVERRIDES: Record<string, { name: string; description: string; input: string; result: string }> = {
  'preparer-une-reunion': { name: 'Structurer un ordre du jour', description: 'Organise les sujets, le contexte et les décisions attendues selon le format de réunion validé.', input: 'Contexte et sujets', result: 'Ordre du jour structuré' },
  'repondre-aux-appels': { name: 'Qualifier une demande téléphonique', description: 'Qualifie la demande lorsqu’une application de téléphonie autorisée est disponible, puis prépare son orientation.', input: 'Demande reçue', result: 'Qualification et orientation' },
  'analyser-des-documents': { name: 'Analyser et comparer des documents', description: 'Extrait les informations utiles, compare les sources et signale les points qui nécessitent une vérification.', input: 'Documents autorisés', result: 'Synthèse sourcée' },
  'qualifier-un-prospect': { name: 'Qualifier un prospect', description: 'Évalue une fiche selon les critères validés et prépare sa mise à jour dans l’application autorisée.', input: 'Fiche prospect', result: 'Qualification expliquée' },
  'rechercher-des-entreprises': { name: 'Rechercher selon des critères définis', description: 'Identifie dans les sources autorisées les entreprises correspondant à une cible et documente leur provenance.', input: 'Cible et sources', result: 'Sélection sourcée' },
  'enrichir-une-fiche-prospect': { name: 'Enrichir une fiche prospect', description: 'Complète une fiche avec les informations autorisées, leur source et leur date de vérification.', input: 'Fiche incomplète', result: 'Fiche enrichie' },
  'verifier-une-information': { name: 'Vérifier une source', description: 'Recoupe une information, documente sa provenance et attribue un niveau de confiance.', input: 'Information à vérifier', result: 'Preuve et confiance' },
  'detecter-un-signal-commercial': { name: 'Détecter un signal commercial', description: 'Repère les événements récents correspondant aux signaux définis par l’équipe commerciale.', input: 'Sources et signaux', result: 'Signaux documentés' },
  'appliquer-un-scoring': { name: 'Appliquer une méthode de scoring', description: 'Évalue une fiche selon les critères et pondérations validés, puis explique le résultat.', input: 'Fiche prospect', result: 'Score expliqué' },
  'dedupliquer-une-selection': { name: 'Dédupliquer une sélection', description: 'Compare une sélection aux données de référence autorisées et signale les doublons probables.', input: 'Sélection et référentiel', result: 'Liste dédupliquée' },
  'documenter-une-recommandation': { name: 'Documenter une recommandation', description: 'Présente les raisons, les sources, les réserves et les validations associées à une recommandation.', input: 'Analyse et sources', result: 'Recommandation justifiée' },
  'exporter-des-donnees-structurees': { name: 'Structurer des données pour export', description: 'Prépare les champs validés au format attendu par l’application autorisée ou le fichier de destination.', input: 'Données validées', result: 'Export structuré' },
  'cadrer-une-mission': { name: 'Cadrer une mission', description: 'Transforme un besoin en résultat attendu, contexte, règles et validations explicites.', input: 'Besoin métier', result: 'Cadre de mission' },
  'interviewer-collaborateur-humain': { name: 'Recueillir une méthode de travail', description: 'Conduit un entretien consenti pour expliciter les étapes, décisions, exceptions et contrôles d’une méthode.', input: 'Entretien consenti', result: 'Méthode formalisée' },
  'cartographier-processus': { name: 'Cartographier un processus', description: 'Identifie les étapes, décisions, outils, exceptions et responsabilités d’un processus existant.', input: 'Processus observé', result: 'Carte du processus' },
  'diagnostiquer-maturite-ia': { name: 'Évaluer la maturité IA', description: 'Applique une grille validée aux usages, compétences, risques et opportunités observés.', input: 'Grille et constats', result: 'Évaluation argumentée' },
  'construire-feuille-route-ia': { name: 'Prioriser des initiatives IA', description: 'Classe les initiatives selon la valeur, la faisabilité, les risques et les dépendances définis.', input: 'Initiatives et critères', result: 'Priorités justifiées' },
  'definir-gouvernance-humain-ia': { name: 'Formaliser des règles humain–IA', description: 'Structure les rôles, droits, validations et règles d’escalade applicables aux missions.', input: 'Rôles et contraintes', result: 'Règles de gouvernance' },
  'accompagner-adoption': { name: 'Qualifier les freins à l’adoption', description: 'Recueille les retours des équipes, classe les blocages et prépare les actions adaptées.', input: 'Retours des équipes', result: 'Freins et actions' },
  'optimiser-couts-ia': { name: 'Analyser les coûts IA', description: 'Compare modèles, capacités et usages selon les règles financières définies sans modifier les droits.', input: 'Usages et coûts', result: 'Pistes d’optimisation' },
  'recommander-capacite-ia': { name: 'Dimensionner une capacité IA', description: 'Compare les besoins des missions aux capacités disponibles et documente la recommandation.', input: 'Missions et usages', result: 'Capacité recommandée' },
  'preparer-migration-agent': { name: 'Auditer la compatibilité d’un agent', description: 'Vérifie les dépendances, données, outils et risques avant de préparer une migration.', input: 'Agent et dépendances', result: 'Rapport de compatibilité' },
  'rediger-un-compte-rendu': { name: 'Extraire décisions et actions', description: 'Distingue les décisions, actions, responsables et échéances à partir d’échanges autorisés.', input: 'Échanges ou transcription', result: 'Décisions et actions' },
  'relancer-une-opportunite': { name: 'Préparer une relance commerciale', description: 'Prépare et documente une relance selon le contexte et les droits accordés, sans l’envoyer automatiquement.', input: 'Opportunité et contexte', result: 'Relance préparée' },
  'rediger-un-article': { name: 'Structurer un contenu éditorial', description: 'Transforme un sujet, une intention et des sources en plan puis en contenu prêt à relire.', input: 'Sujet et sources', result: 'Contenu structuré' },
  'preparer-un-reporting': { name: 'Synthétiser des indicateurs', description: 'Rassemble les indicateurs autorisés, vérifie leur période et fait ressortir les évolutions significatives.', input: 'Indicateurs validés', result: 'Synthèse des tendances' },
  'resoudre-un-ticket': { name: 'Appliquer une procédure de résolution', description: 'Qualifie un problème, recherche une procédure validée et prépare une réponse documentée.', input: 'Ticket et procédures', result: 'Résolution proposée' },
  'qualifier-une-demande': { name: 'Qualifier une demande', description: 'Clarifie le besoin, vérifie les informations disponibles et prépare son orientation selon les règles.', input: 'Demande reçue', result: 'Demande qualifiée' },
  'organiser-les-priorites': { name: 'Prioriser selon des règles définies', description: 'Classe des éléments selon l’urgence, l’impact, les dépendances et les arbitrages validés.', input: 'Éléments et critères', result: 'Priorités expliquées' },
  'preparer-un-rendez-vous': { name: 'Rassembler un contexte client', description: 'Réunit les informations autorisées, les enjeux et les points à vérifier avant un échange client.', input: 'Dossier client', result: 'Contexte préparé' },
  'planifier-un-calendrier-editorial': { name: 'Répartir un plan éditorial', description: 'Répartit les sujets, canaux et dates selon la stratégie et les contraintes validées.', input: 'Sujets et contraintes', result: 'Plan éditorial daté' },
}

export function CompetencesContent() {
  const { lang } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const deferredQuery = useDeferredValue(query)
  const category = CATEGORY_ORDER.includes((searchParams.get('categorie') ?? 'all') as typeof CATEGORY_ORDER[number]) ? searchParams.get('categorie') ?? 'all' : 'all'
  const creator = searchParams.get('createur') === 'community' ? 'community' : searchParams.get('createur') === 'unitalk' ? 'unitalk' : 'all'
  const sort = searchParams.get('tri') === 'recentes' ? 'recentes' : 'selection'
  const requestedPage = Math.max(1, Number.parseInt(searchParams.get('page') ?? '1', 10) || 1)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if ((searchParams.get('q') ?? '') === query) return
      updateParams({ q: query || null, page: null })
    }, 250)
    return () => window.clearTimeout(timer)
  }, [query])

  const skills = useMemo(() => {
    const relevance = new Map(searchStore(deferredQuery, lang).map(({ item, score }) => [item.slug, score]))
    return STORE_ITEMS.filter((item) => item.type === 'competence')
      .filter((item) => !deferredQuery.trim() || matchesDisplayedContent(item, deferredQuery, lang))
      .filter((item) => category === 'all' || item.facet === category)
      .filter((item) => creator === 'all' || item.creator === creator)
      .sort((a, b) => sort === 'recentes' ? b.dateAdded.localeCompare(a.dateAdded) : deferredQuery.trim() ? (relevance.get(b.slug) ?? 0) - (relevance.get(a.slug) ?? 0) || a.order - b.order : a.order - b.order)
  }, [category, creator, deferredQuery, lang, sort])

  const pageCount = Math.max(1, Math.ceil(skills.length / PAGE_SIZE))
  const page = Math.min(requestedPage, pageCount)
  const visible = skills.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function updateParams(changes: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(changes)) value ? next.set(key, value) : next.delete(key)
    router.replace(`${pathname}${next.size ? `?${next}` : ''}`, { scroll: false })
  }

  return <main className="bg-[#F3EFE6] font-sf text-[#1C1A17]">
    <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-20"><div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" /><div className="editorial-shell relative grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20"><div><Kicker>Compétences</Kicker><h1 className="hero-heading mt-5">Ajoutez un savoir-faire.<br />Réutilisez-le d’une mission à l’autre.</h1><p className="mt-6 max-w-xl text-[17px] leading-8 text-[#4E483F]">Une compétence transforme une méthode en étapes, règles et validations que votre Collaborateur IA peut appliquer lorsque sa mission et ses droits le permettent.</p><p className="mt-4 max-w-xl text-[16px] leading-7 text-[#4E483F]">Les corrections validées peuvent faire évoluer cette compétence sans changer l’identité du Collaborateur IA.</p><div className="mt-8 flex flex-wrap items-center gap-5"><a href="#catalogue-competences" className="inline-flex min-h-12 items-center rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white">Explorer les compétences →</a><Link href="/inscription?source=competence-store&intention=nouvelle-competence" className="text-sm font-bold text-[#B00C54] underline-offset-4 hover:underline">Créer avec Alma</Link></div></div><SkillProof /></div></section>

    <section id="catalogue-competences" className="border-y border-[#DED6C8] bg-[#FAF8F3] px-5 py-16 sm:px-8"><div className="editorial-shell"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#B00C54]">Catalogue</p><h2 className="mt-5 max-w-2xl text-[34px] font-semibold leading-[1.06] tracking-[-.04em] sm:text-[44px]">Des savoir-faire testés,<br />prêts à adapter.</h2><div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center"><label className="relative min-w-0 flex-1"><span className="sr-only">Rechercher un savoir-faire</span><Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6E665A]" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un savoir-faire…" className="h-12 w-full rounded-full border border-[#D8D0C2] bg-white pl-11 pr-4 text-sm outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15" /></label><select aria-label="Créateur" value={creator} onChange={(event) => updateParams({ createur: event.target.value === 'all' ? null : event.target.value, page: null })} className="h-12 rounded-full border border-[#D8D0C2] bg-white px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#D10E63]"><option value="all">Tous les créateurs</option><option value="unitalk">Unitalk</option><option value="community">Communauté</option></select><select aria-label="Trier les compétences" value={sort} onChange={(event) => updateParams({ tri: event.target.value === 'selection' ? null : event.target.value, page: null })} className="h-12 rounded-full border border-[#D8D0C2] bg-white px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#D10E63]"><option value="selection">Sélection</option><option value="recentes">Plus récentes</option></select></div><div className="scrollbar-hide mt-5 flex gap-2 overflow-x-auto pb-1">{CATEGORY_ORDER.map((key) => <button key={key} type="button" aria-pressed={category === key} onClick={() => updateParams({ categorie: key === 'all' ? null : key, page: null })} className={`h-9 shrink-0 rounded-full border px-3.5 text-xs font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] ${category === key ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-white text-[#4E483F]'}`}>{key === 'all' ? 'Sélection' : shortCategory(key)}</button>)}</div><div className="mt-7 flex items-end justify-between gap-4"><p className="text-sm font-semibold text-[#6E665A]">{skills.length} compétence{skills.length > 1 ? 's' : ''}</p><p className="text-xs text-[#857C6E]">Page {page} sur {pageCount}</p></div>{visible.length ? <div className="mt-4 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map((item) => <SkillCard key={item.slug} item={item} lang={lang} />)}</div> : <div className="mt-4 rounded-[18px] border border-[#DED6C8] bg-[#F3EFE6] px-6 py-14 text-center"><h3 className="text-xl font-semibold">Aucune compétence trouvée.</h3><p className="mt-2 text-sm text-[#6E665A]">Modifiez la recherche ou choisissez une autre catégorie.</p></div>}<Pagination page={page} pageCount={pageCount} onPage={(nextPage) => updateParams({ page: nextPage === 1 ? null : String(nextPage) })} /></div></section>

    <section className="px-5 py-16 sm:px-8"><div className="editorial-shell rounded-[18px] border border-[#DED6C8] bg-[#EAE3D4] p-7 sm:p-10"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#B00C54]">Transmettre un savoir-faire</p><div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><h2 className="max-w-2xl text-[34px] font-semibold leading-[1.06] tracking-[-.04em] sm:text-[44px]">Cette méthode n’existe pas encore dans le catalogue ?</h2><p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#4E483F]"><AlmaInline /> Alma vous aide à cadrer le besoin. Un Co-créateur IA peut ensuite interviewer les personnes concernées, formaliser la méthode, la tester et la versionner.</p><p className="mt-5 text-sm font-semibold"><AlmaInline /> Alma · Coordinatrice de missions IA</p></div><div className="flex flex-col items-start gap-4 lg:items-end"><Link href="/inscription?source=competence-store&intention=nouvelle-competence" className="inline-flex min-h-12 items-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white">Créer une compétence avec Alma →</Link><Link href="/co-createur-ia" className="text-sm font-bold text-[#4E483F] underline decoration-[#D10E63]/30 underline-offset-4">Devenir Co-créateur IA</Link></div></div></div></section>
  </main>
}

function SkillProof() {
  return <article className="rounded-[18px] border border-[#DED6C8] bg-[#FAF8F3] p-6 shadow-[0_20px_60px_-48px_rgba(28,26,23,.45)] sm:p-8"><p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#B00C54]">Compétence</p><h2 className="mt-3 text-2xl font-semibold">Appliquer une méthode de scoring</h2><dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-[#DED6C8] bg-[#DED6C8] sm:grid-cols-2"><ProofField label="Entrées" value={'Critères\nPondérations\nFiche prospect'} /><ProofField label="Méthode" value={'Vérifier les critères\nCalculer le score\nExpliquer le résultat\nSignaler les informations manquantes'} /><ProofField label="Résultat" value={'Score expliqué\nNiveau de confiance'} /><ProofField label="Validation" value={'Seuils et décision finale\npar l’équipe commerciale'} /></dl><p className="mt-5 text-xs text-[#6E665A]"><strong className="text-[#1C1A17]">Créé par</strong> Unitalk</p></article>
}

function ProofField({ label, value }: { label: string; value: string }) { return <div className="bg-[#FAF8F3] p-4"><dt className="font-mono text-[9px] font-bold uppercase tracking-[.16em] text-[#857C6E]">{label}</dt><dd className="mt-3 whitespace-pre-line text-sm font-semibold leading-6">{value}</dd></div> }

function SkillCard({ item, lang }: { item: StoreItem; lang: 'fr' | 'en' }) {
  const content = METHOD_OVERRIDES[item.slug] ?? { name: item.name[lang], description: item.description[lang], input: item.contexts?.[0]?.[lang] ?? 'Contexte défini', result: item.produces?.[0]?.[lang] ?? 'Résultat documenté' }
  return <article className="flex min-h-[260px] flex-col rounded-[18px] border border-[#DED6C8] bg-[#F3EFE6] p-6"><p className="font-mono text-[9px] font-bold uppercase tracking-[.16em] text-[#B00C54]">{shortCategory(item.facet)}</p><h3 className="mt-4 text-xl font-semibold leading-7 tracking-[-.02em]">{content.name}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-[#4E483F]">{content.description}</p><div className="mt-auto pt-6"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#857C6E]">Entrée → Résultat</p><p className="mt-2 text-xs font-semibold leading-5">{content.input} → {content.result}</p><p className="mt-5 border-t border-[#DED6C8] pt-4 text-xs text-[#6E665A]">{item.creator === 'unitalk' ? 'Unitalk' : 'Communauté'}{item.version ? ` · v${item.version}` : ''}</p><Link href={`/decouvrir?store=${item.slug}`} className="mt-4 flex min-h-11 w-full items-center justify-center rounded-full bg-[#1C1A17] px-4 text-center text-xs font-bold text-white transition-colors hover:bg-[#B00C54]">{lang === 'fr' ? 'Ajouter à un Collaborateur IA' : 'Add to an AI Collaborator'}<ArrowRight className="ml-2 size-4" /></Link></div></article>
}

function Pagination({ page, pageCount, onPage }: { page: number; pageCount: number; onPage: (page: number) => void }) {
  if (pageCount <= 1) return null
  return <nav aria-label="Pagination des compétences" className="mt-10 flex flex-wrap items-center justify-center gap-2"><button type="button" disabled={page === 1} onClick={() => onPage(page - 1)} className="inline-flex h-10 items-center gap-1 rounded-full border border-[#D8D0C2] px-4 text-xs font-semibold disabled:opacity-35"><ArrowLeft className="size-3.5" /> Précédent</button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button key={number} type="button" aria-current={page === number ? 'page' : undefined} aria-label={`Page ${number}`} onClick={() => onPage(number)} className={`size-10 rounded-full border text-xs font-bold ${page === number ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-white'}`}>{number}</button>)}<button type="button" disabled={page === pageCount} onClick={() => onPage(page + 1)} className="inline-flex h-10 items-center gap-1 rounded-full border border-[#D8D0C2] px-4 text-xs font-semibold disabled:opacity-35">Suivant <ArrowRight className="size-3.5" /></button></nav>
}

function shortCategory(key: string) { return ({ ventes: 'Ventes', 'relation-client': 'Relation client', marketing: 'Marketing', reunions: 'Réunions', administration: 'Administration', finance: 'Finance', documents: 'Documents', operations: 'Opérations' } as Record<string, string>)[key] ?? SKILL_CATEGORY_LABELS[key]?.fr ?? key }

function matchesDisplayedContent(item: StoreItem, query: string, lang: 'fr' | 'en') {
  const content = METHOD_OVERRIDES[item.slug]
  const value = [content?.name ?? item.name[lang], content?.description ?? item.description[lang], content?.input, content?.result, ...item.keywords].filter(Boolean).join(' ').toLocaleLowerCase(lang)
  const tokens = query.toLocaleLowerCase(lang).trim().split(/\s+/).filter((token) => token.length > 2)
  return tokens.length === 0 || tokens.every((token) => value.includes(token))
}
