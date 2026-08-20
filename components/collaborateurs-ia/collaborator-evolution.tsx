import Image from 'next/image'
import Link from 'next/link'
import type { Lang } from '@/lib/language-context'

export function CollaboratorEvolution({ lang }: { lang: Lang }) {
  const profiles = lang === 'fr' ? ['Assistante de direction', 'Office manager', 'Ressources humaines'] : ['Executive Assistant', 'Office Manager', 'Human Resources']
  const skills = lang === 'fr' ? ['Organisation', 'Comptes rendus', 'Recrutement', 'Reporting'] : ['Organization', 'Meeting notes', 'Recruiting', 'Reporting']
  const missions = lang === 'fr' ? ['Préparer une réunion', 'Organiser un recrutement', 'Produire un reporting'] : ['Prepare a meeting', 'Organize recruiting', 'Produce a report']

  return (
    <section className="bg-[#E8E0D2] py-20 sm:py-24">
      <div className="editorial-shell">
        <div className="overflow-hidden rounded-[24px] border border-[#D8D0C2] bg-[#EAE3D4]">
          <div className="border-b border-[#D8D0C2] px-6 py-8 sm:px-9 sm:py-10 lg:flex lg:items-end lg:justify-between lg:gap-10">
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">{lang === 'fr' ? 'Une identité durable' : 'One lasting identity'}</p>
              <h2 className="mt-4 max-w-4xl text-balance text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[.95] tracking-[-.055em]">{lang === 'fr' ? 'Un Collaborateur. Plusieurs métiers. Des compétences illimitées.' : 'One Collaborator. Multiple roles. Unlimited skills.'}</h2>
            </div>
            <p className="mt-5 max-w-xl text-[14px] font-medium leading-6 text-[#4E483F] lg:mt-0 lg:text-[15px] lg:leading-7">{lang === 'fr' ? 'Ajoutez-lui des profils métier, puis les compétences nécessaires à chaque mission. Son identité, sa mémoire et son expérience restent les mêmes.' : 'Add job profiles, then the skills needed for each mission. Their identity, memory and experience remain the same.'}</p>
          </div>
          <div className="grid lg:grid-cols-[.85fr_1.15fr]">
            <div className="flex items-center gap-4 border-b border-[#D8D0C2] p-6 sm:p-9 lg:border-b-0 lg:border-r">
              <Image src="/images/emma-avatar.png" alt="" width={72} height={72} className="size-16 rounded-full object-cover ring-1 ring-[#CFC5B5] sm:size-[72px]" />
              <div><h3 className="text-2xl font-semibold tracking-[-.04em]">Emma</h3><p className="mt-1 font-mono text-[10px] font-black uppercase tracking-[.14em] text-[#B00C54]">{lang === 'fr' ? 'Collaboratrice IA' : 'AI Collaborator'}</p></div>
            </div>
            <div className="grid sm:grid-cols-3">
              {[
                [lang === 'fr' ? 'Profils métier' : 'Job profiles', profiles],
                [lang === 'fr' ? 'Compétences' : 'Skills', skills],
                [lang === 'fr' ? 'Missions' : 'Missions', missions],
              ].map(([title, values], index) => <div key={title as string} className={`p-6 sm:p-7 ${index > 0 ? 'border-t border-[#D8D0C2] sm:border-l sm:border-t-0' : ''}`}><p className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#766D61]">{title as string}</p><ul className="mt-4 space-y-2.5">{(values as string[]).map((value) => <li key={value} className="flex gap-2 text-[12px] font-semibold leading-5 text-[#322E29]"><span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-[#D10E63]"/>{value}</li>)}</ul>{index === 0 && <Link href="/marketplace/profils-metier" className="mt-5 inline-flex text-[11px] font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">+ {lang === 'fr' ? 'Ajouter un profil métier' : 'Add a job profile'}</Link>}{index === 1 && <Link href="/marketplace/competences" className="mt-5 inline-flex text-[11px] font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">+ {lang === 'fr' ? 'Ajouter une compétence' : 'Add a skill'}</Link>}</div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
