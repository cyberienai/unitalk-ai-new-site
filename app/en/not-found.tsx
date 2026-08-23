import Link from 'next/link'

export default function EnglishNotFound() {
  return <main className="flex min-h-screen items-center justify-center bg-[#F3EFE6] px-5 text-center text-[#1C1A17]"><div><p className="font-mono text-xs font-bold uppercase tracking-[.16em] text-[#B00C54]">404</p><h1 className="mt-4 text-4xl font-semibold tracking-[-.04em]">This page is not available in English.</h1><p className="mx-auto mt-4 max-w-xl text-[#625B50]">Return to the English home page or continue in French.</p><div className="mt-7 flex justify-center gap-4"><Link href="/en" className="rounded-full bg-[#D10E63] px-6 py-3 text-sm font-bold text-white">English home</Link><Link href="/" className="rounded-full border border-[#1C1A17] px-6 py-3 text-sm font-bold">Site en français</Link></div></div></main>
}
