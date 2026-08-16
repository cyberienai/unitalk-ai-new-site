import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AcademyOnboarding } from '@/components/academy/academy-onboarding'
import { decodeSession, SESSION_COOKIE } from '@/lib/mock-auth'

export const metadata:Metadata={title:'Personnaliser mon parcours avec Alma',description:'Alma personnalise votre première mission et vos formations Unitalk Academy.',robots:{index:false,follow:false}}

export default async function Page({searchParams}:{searchParams:Promise<{mission?:string;parcours?:string}>}){
  const params=await searchParams
  const session=decodeSession((await cookies()).get(SESSION_COOKIE)?.value)
  if(!session){const query=new URLSearchParams();if(params.mission)query.set('mission',params.mission);if(params.parcours)query.set('parcours',params.parcours);redirect(`/academy/inscription?redirect=${encodeURIComponent(`/academy/onboarding${query.size?`?${query}`:''}`)}`)}
  return <AcademyOnboarding firstName={session.firstName||session.name.split(' ')[0]||'Membre'} initialMission={params.mission} initialPath={params.parcours}/>
}
