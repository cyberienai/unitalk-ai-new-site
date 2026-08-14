import type { Metadata } from 'next'
import { EditorialPage } from '@/components/academy/editorial-page'
export const metadata:Metadata={title:'Formation Co-créateur IA'}
const programme=['Interviewer un expert métier','Formaliser responsabilités et limites','Construire des compétences testables','Concevoir des missions et validations','Vibecoder une application métier','Tester sur des cas contrôlés','Versionner et préparer la publication'].map((title)=>({title,body:'Une étape pratique, accompagnée et appliquée à une création réelle.'}))
export default function Page(){return <EditorialPage kicker="Formation Co-créateur IA" title="Transformez le savoir-faire humain en capacités de travail IA." body="Une formation pratique pour interviewer les experts, formaliser leurs méthodes et construire des actifs IA gouvernés." items={programme} cta="Étudiez le programme et les prises en charge mobilisables." ctaHref="/financement?formation=co-createur-ia"/>}
