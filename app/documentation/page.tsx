import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { DocumentationIndexContent } from '@/components/documentation-content'
export const metadata:Metadata={title:'Documentation Unitalk : Workspace, mémoire et Collaborateurs IA',description:'Comprenez Hermes dans Unitalk, le Workspace privé et partagé, la mémoire gouvernée, Honcho, les communications, les licences et la migration OpenClaw.',alternates:{canonical:'/documentation'},openGraph:{type:'website',url:'https://unitalk.ai/documentation',title:'Documentation Unitalk : humains et Collaborateurs IA',description:'Architecture Hermes, Workspace, mémoire, communications, gouvernance et migration vers Unitalk.',images:[{url:'/opengraph-image',width:1200,height:630}]}}
export default function DocumentationPage(){return <><Navbar/><DocumentationIndexContent/><SiteFooter/></>}
