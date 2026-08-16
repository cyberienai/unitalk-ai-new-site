import type { Metadata } from 'next'
import { AcademyAuthShell } from '@/components/academy/academy-auth-shell'

export const metadata:Metadata={title:'Connexion Academy',description:'Retrouvez vos missions et formations Unitalk Academy.',robots:{index:false,follow:false}}

export default async function Page({searchParams}:{searchParams:Promise<{redirect?:string}>}){
  const {redirect}=await searchParams
  return <AcademyAuthShell mode="sign-in" redirectTo={redirect??'/academy/espace'}/>
}
