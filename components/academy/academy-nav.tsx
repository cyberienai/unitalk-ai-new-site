import Link from 'next/link'

const links=[['Missions','/academy/missions'],['Compétences','/academy/competences'],['Parcours','/academy/parcours'],['Networks','/academy/networks'],['Experts','/academy/experts'],['Alma','/academy/alma']]
export function AcademyNav(){return <nav aria-label="Navigation Academy" className="border-b border-[#d7cebe] bg-[#e9e1d2]"><div className="academy-shell flex items-center gap-5 overflow-x-auto py-3 text-sm font-bold"><Link href="/academy" className="shrink-0 text-[#b00b52]">Unitalk Academy</Link>{links.map(([label,href])=><Link key={href} href={href} className="shrink-0 text-[#625b50] hover:text-[#b00b52]">{label}</Link>)}</div></nav>}
