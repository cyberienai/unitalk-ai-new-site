import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { LeaderDetailContent } from '@/components/leaders/leader-detail-content'
import { AI_ARCHITECTS, getAiArchitect } from '@/lib/ai-architects'

export function generateStaticParams(){return AI_ARCHITECTS.map(item=>({slug:item.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const leader=getAiArchitect((await params).slug);return leader?{title:`${leader.name} · Architecte IA`,description:leader.tagline.fr,alternates:{canonical:`/leaders/${leader.slug}`},openGraph:{type:'article',title:`${leader.name} · Architecte IA · Unitalk`,description:leader.tagline.fr,images:[{url:leader.image}]}}:{title:'Architecte IA'}}
export default async function LeaderPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!getAiArchitect(slug))notFound();return <LeaderDetailContent slug={slug}/>}
