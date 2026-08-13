'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function DecouvrirError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Discover flow error', { digest: error.digest })
  }, [error.digest])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3EFE6] px-5 text-center text-[#1C1A17]">
      <div className="max-w-xl">
        <h1 className="font-sf text-[36px] font-bold tracking-[-0.04em] sm:text-[48px]">Nous n’avons pas pu ouvrir cette étape.</h1>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <button type="button" onClick={reset} className="min-h-12 rounded-xl bg-[#D10E63] px-6 text-sm font-bold text-white">Réessayer</button>
          <Link href="/missions" className="inline-flex min-h-12 items-center rounded-xl border border-[#DED6C8] px-6 text-sm font-bold">Retour aux missions</Link>
        </div>
      </div>
    </main>
  )
}
