import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { AlmaStoreContent } from '@/components/alma/alma-store-content'
export default async function Page({params}:{params:Promise<{handle:string}>}){const {handle}=await params;if(decodeURIComponent(handle)!=='@alma')notFound();return <><Navbar/><AlmaStoreContent/><SiteFooter/></>}
