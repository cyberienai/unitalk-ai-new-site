'use client'

import { useState } from 'react'

type Status = 'unchecked' | 'ready' | 'blocked' | 'missing'

const CASES = [
  { company: 'Acme', invoice: 'F-2048', dispute: 'Aucun', result: 'Prête pour validation', detail: 'Aucun litige détecté dans les données de démonstration.', status: 'ready' as const },
  { company: 'Nova', invoice: 'F-2049', dispute: 'Ouvert', result: 'Relance bloquée', detail: 'Un litige ouvert interdit la préparation d’une relance.', status: 'blocked' as const },
  { company: 'Orion', invoice: 'F-2050', dispute: 'Inconnu', result: 'Informations manquantes', detail: 'Le statut du litige doit être confirmé par une personne autorisée.', status: 'missing' as const },
]

export function CollectionCockpitDemo() {
  const [checked, setChecked] = useState(false)
  return (
    <section aria-labelledby="cockpit-title" className="rounded-xl border border-[#DED6C8] bg-white p-5 sm:p-6">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#B00C54]">Cockpit de recouvrement</p>
      <h3 id="cockpit-title" className="mt-2 font-sf text-2xl font-bold">Démonstration · Données fictives</h3>
      <div className="mt-6 hidden overflow-hidden rounded-xl border border-[#DED6C8] sm:block">
        <table className="w-full text-left text-sm"><thead className="bg-[#F3EFE6] text-[11px] uppercase tracking-wide text-[#6E665A]"><tr><th className="p-3">Dossier</th><th className="p-3">Facture</th><th className="p-3">Litige</th><th className="p-3">Action</th></tr></thead><tbody>{CASES.map(item => <tr key={item.invoice} className="border-t border-[#DED6C8]"><td className="p-3 font-semibold">{item.company}</td><td className="p-3">{item.invoice}</td><td className="p-3">{item.dispute}</td><td className="p-3">{checked ? item.result : 'À vérifier'}</td></tr>)}</tbody></table>
      </div>
      <div className="mt-6 grid gap-3 sm:hidden">{CASES.map(item => <div key={item.invoice} className="rounded-xl border border-[#DED6C8] p-4"><p className="font-semibold">{item.company} · {item.invoice}</p><p className="mt-1 text-sm text-[#6E665A]">Litige : {item.dispute}</p><p className="mt-3 text-sm font-semibold">{checked ? item.result : 'À vérifier'}</p></div>)}</div>
      <div aria-live="polite" className="mt-5 min-h-[150px]">
        {checked ? <div className="grid gap-3">{CASES.map(item => <Result key={item.company} status={item.status} title={`${item.company} · ${item.result}`}>{item.detail}</Result>)}</div> : <p className="text-sm text-[#6E665A]">Aucune vérification n’a encore été exécutée.</p>}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {!checked ? <button type="button" onClick={() => setChecked(true)} className="min-h-11 rounded-xl bg-[#D10E63] px-5 text-sm font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">Vérifier les dossiers</button> : <><p className="rounded-full bg-[#F7E6D0] px-3 py-1.5 text-sm font-semibold text-[#7A4D14]">2 décisions requises</p><button type="button" onClick={() => setChecked(false)} className="min-h-11 rounded-xl border border-[#DED6C8] px-4 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">Réinitialiser la démonstration</button></>}
      </div>
      <p className="mt-4 text-xs text-[#6E665A]">Le responsable financier valide avant toute relance.</p>
    </section>
  )
}

function Result({ status, title, children }: { status: Exclude<Status, 'unchecked'>; title: string; children: React.ReactNode }) {
  const label = status === 'ready' ? 'À valider' : status === 'blocked' ? 'Bloqué' : 'Information requise'
  return <div className="rounded-xl border border-[#DED6C8] bg-[#FAF8F3] p-4"><p className="font-semibold">{title}</p><p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#6E665A]">{label}</p><p className="mt-2 text-sm leading-6 text-[#4E483F]">{children}</p></div>
}
