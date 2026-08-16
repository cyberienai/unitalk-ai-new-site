import type { Metadata } from 'next'
import { AcademyAuthShell } from '@/components/academy/academy-auth-shell'

export const metadata:Metadata={title:'Inscription Academy',description:'Créez votre compte Unitalk et personnalisez votre parcours Academy avec Alma.',robots:{index:false,follow:false}}

export default async function Page({searchParams}:{searchParams:Promise<{redirect?:string;mission?:string;parcours?:string}>}){
  const params=await searchParams
  const query=new URLSearchParams()
  if(params.mission) query.set('mission',params.mission)
  if(params.parcours) query.set('parcours',params.parcours)
  const fallback=`/academy/onboarding${query.size?`?${query}`:''}`
  return <AcademyAuthShell mode="sign-up" redirectTo={params.redirect??fallback}/>
}
