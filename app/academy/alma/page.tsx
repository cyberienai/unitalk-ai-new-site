import type { Metadata } from 'next'
import { EditorialPage } from '@/components/academy/editorial-page'
export const metadata:Metadata={title:'Alma, Coordinatrice de parcours'}
export default function Page(){return <EditorialPage kicker="Alma · Unitalk Academy" title="La même Alma. Un profil pédagogique dédié." body="Alma construit votre parcours et coordonne vos missions d’apprentissage, dans un contexte séparé de vos données opérationnelles." items={[{title:'Comprendre',body:'Votre objectif professionnel et votre niveau initial.'},{title:'Guider',body:'Les missions, exercices, preuves et évaluations.'},{title:'Transférer avec consentement',body:'Vers un expert humain ou Unitalk AI, uniquement à votre demande.'}]} cta="Dites à Alma ce que vous voulez apprendre ou construire."/>}
