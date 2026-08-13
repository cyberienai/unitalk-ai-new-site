export type AiCapacityId = 'byok' | 'quarterTime' | 'halfTime' | 'fullTime'

export const unitalkPricing = {
  version: '2026-08-13',
  trial: { days: 7, tokens: 1_000_000 },
  organization: { monthlyPrice: 50, freeUntil: '2026-12-21' },
  aiCollaborator: { monthlyPrice: 49, min: 1, max: 20 },
  aiCocreator: { monthlyPrice: 50, min: 0, max: 20 },
  aiCapacity: {
    byok: { label: 'BYOK', tokens: 0, monthlyPrice: 0 },
    quarterTime: { label: 'Quart-temps', tokens: 5_000_000, monthlyPrice: 25, freeUntil: '2026-12-31' },
    halfTime: { label: 'Mi-temps', tokens: 10_000_000, monthlyPrice: 50 },
    fullTime: { label: 'Temps plein', tokens: 20_000_000, monthlyPrice: 100 },
  },
} as const

export type PricingDraft = { source: 'pricing'; collaborators: number; capacity: AiCapacityId; coCreators: number; priceVersion: string }

function utcDay(date: Date): number { return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) }
function after(date: Date, iso: string): boolean { return utcDay(date) > Date.parse(`${iso}T00:00:00Z`) }

export function organizationPriceAt(date: Date): number { return after(date, unitalkPricing.organization.freeUntil) ? 50 : 0 }
export function capacityPriceAt(id: AiCapacityId, date: Date): number { const cap=unitalkPricing.aiCapacity[id]; return 'freeUntil' in cap && !after(date, cap.freeUntil) ? 0 : cap.monthlyPrice }
export function configurationTotalAt(collaborators:number, capacity:AiCapacityId, coCreators:number, date:Date):number { return organizationPriceAt(date)+collaborators*49+collaborators*capacityPriceAt(capacity,date)+coCreators*50 }
export function configurationTotal(collaborators:number, capacity:AiCapacityId, _alma=false, cocreator=false, promotional=true):number { return configurationTotalAt(collaborators,capacity,cocreator?1:0,promotional?new Date('2026-12-01T00:00:00Z'):new Date('2027-01-01T00:00:00Z')) }
export function capacityMonthlyPrice(id:AiCapacityId,promotional=true):number{return capacityPriceAt(id,promotional?new Date('2026-12-01T00:00:00Z'):new Date('2027-01-01T00:00:00Z'))}
export function isPromotionalFree(freeUntil:string|undefined,now=new Date()):boolean{return Boolean(freeUntil&&!after(now,freeUntil))}
