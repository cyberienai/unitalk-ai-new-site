import type { Lang } from '@/lib/language-context'

/**
 * Format a euro amount for display. Integers render without decimals;
 * fractional amounts keep two decimals (e.g. 40,83 €). Locale controls the
 * decimal separator and spacing.
 */
export function formatEuro(amount: number, lang: Lang): string {
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB'
  const hasCents = Math.round(amount * 100) % 100 !== 0
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(amount)
}
