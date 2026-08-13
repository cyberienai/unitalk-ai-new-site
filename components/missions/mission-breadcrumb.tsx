import Link from 'next/link'

export type MissionBreadcrumbItem = { label: string; href?: string }

export function MissionBreadcrumb({ items }: { items: MissionBreadcrumbItem[] }) {
  return <nav aria-label="Fil d’Ariane"><ol className="flex flex-wrap items-center gap-2 text-sm text-[#6E665A]">{items.map((item,index)=><li key={`${item.label}-${index}`} className="flex items-center gap-2">{index>0&&<span aria-hidden>/</span>}{item.href?<Link href={item.href} className="underline decoration-transparent underline-offset-4 hover:text-[#D10E63] hover:decoration-[#D10E63]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]">{item.label}</Link>:<span aria-current="page" className="text-[#1C1A17]">{item.label}</span>}</li>)}</ol></nav>
}
