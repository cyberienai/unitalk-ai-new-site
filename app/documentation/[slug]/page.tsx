import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { DocumentationDetailContent } from '@/components/documentation-content'
import { DOCUMENTATION, DOCUMENTATION_SLUGS, type DocumentationSlug } from '@/lib/unitalk-documentation'
export function generateStaticParams(){return DOCUMENTATION_SLUGS.map(slug=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const slug=(await params).slug as DocumentationSlug;const page=DOCUMENTATION[slug];return page?{title:page.title,description:page.summary,alternates:{canonical:`/documentation/${slug}`}}:{title:'Documentation'}}
export default async function DocumentationDetailPage({params}:{params:Promise<{slug:string}>}){const slug=(await params).slug as DocumentationSlug;const page=DOCUMENTATION[slug];if(!page)notFound();return <><Navbar/><DocumentationDetailContent page={page}/><SiteFooter/></>}
