import { notFound } from 'next/navigation'
import { AlmaFinalContent } from '@/components/alma/alma-final-content'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
export default async function Page({params}:{params:Promise<{handle:string}>}){const {handle}=await params;if(decodeURIComponent(handle)!=='@alma')notFound();return <><Navbar/><AlmaFinalContent/><SiteFooter/></>}
