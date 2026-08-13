'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { unitalkPricing, type AiCapacityId, type PricingDraft } from '@/lib/unitalk-pricing'

const CAPACITIES: AiCapacityId[] = ['byok','quarterTime','halfTime','fullTime']
export async function persistPricingDraft(input:{collaborators:number;capacity:AiCapacityId;coCreators:number}):Promise<void>{
  const draft:PricingDraft={source:'pricing',collaborators:Math.min(unitalkPricing.aiCollaborator.max,Math.max(1,Math.floor(input.collaborators))),capacity:CAPACITIES.includes(input.capacity)?input.capacity:'quarterTime',coCreators:Math.min(unitalkPricing.aiCocreator.max,Math.max(0,Math.floor(input.coCreators))),priceVersion:unitalkPricing.version}
  const store=await cookies();store.set('unitalk_pricing_draft',JSON.stringify(draft),{path:'/',maxAge:60*60*24,sameSite:'lax',httpOnly:true});redirect('/decouvrir?source=tarifs')
}
