import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { DocumentationIndexContent } from '@/components/documentation-content'
export const metadata:Metadata={title:'Documentation des licences et ressources Unitalk',description:'Comprenez Alma Organisation, Workspace & Desktop, la Licence Collaborateur IA, la Capacité IA et la Licence Co-créateur.',alternates:{canonical:'/documentation'}}
export default function DocumentationPage(){return <><Navbar/><DocumentationIndexContent/><SiteFooter/></>}
