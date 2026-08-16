import Image from 'next/image'
import { AuthCard } from '@/components/auth/auth-card'

export function AcademyAuthShell({ mode, redirectTo }: { mode:'sign-in'|'sign-up'; redirectTo:string }) {
  return <main className="fixed inset-0 z-[70] grid min-h-screen overflow-y-auto bg-[#F3EFE6] text-[#1C1A17] lg:grid-cols-[1.05fr_.95fr]">
    <section className="relative hidden overflow-hidden bg-[#181615] p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div aria-hidden className="absolute inset-0 opacity-[.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:72px_72px]"/>
      <div className="relative"><p className="font-mono text-[10px] font-black uppercase tracking-[.22em] text-[#F2A4C5]">Alma · Guide Academy</p><h2 className="mt-6 max-w-2xl font-sf text-[clamp(3.2rem,5vw,5.8rem)] font-semibold leading-[.88] tracking-[-.07em]">Un seul compte.<br/>Deux espaces.<br/><span className="text-[#F2A4C5]">Un même travail.</span></h2></div>
      <div className="relative grid grid-cols-[120px_1fr] items-end gap-7"><div className="relative aspect-[3/4] overflow-hidden border border-white/15"><Image src="/alma-avatar.png" alt="Alma, guide Unitalk Academy" fill className="object-cover" priority/></div><div><p className="text-xl font-semibold leading-8">« Je prépare votre mission dans l’Academy, puis vous la retrouvez dans Unitalk. »</p><p className="mt-4 text-sm text-[#AFA397]">Missions · Formations · Collaborateurs IA</p></div></div>
    </section>
    <section className="flex items-center justify-center px-5 py-14 sm:px-8"><AuthCard mode={mode} redirectTo={redirectTo} context="academy"/></section>
  </main>
}
