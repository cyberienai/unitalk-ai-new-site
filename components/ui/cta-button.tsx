import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary'
type Size = 'md' | 'sm'
type Tone = 'light' | 'dark'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2'

const sizes: Record<Size, string> = {
  md: 'min-h-12 px-7 text-sm font-bold',
  sm: 'min-h-10 px-4 text-sm font-bold',
}

const variants: Record<Variant, string> = {
  primary: 'bg-[#D10E63] text-[#FBF9F3]',
  secondary: 'border font-semibold',
}

const secondaryTone: Record<Tone, string> = {
  light: 'border-[#DDD5CA] bg-[#FBF9F3] text-[#4E483F] hover:border-[#1C1A17] hover:text-[#1C1A17]',
  dark: 'border-white/20 bg-white/[0.04] text-[#F3EFE6] hover:border-white/50 hover:text-white',
}

const ringOffsetTone: Record<Tone, string> = {
  light: 'focus-visible:ring-offset-[#FBF9F3]',
  dark: 'focus-visible:ring-offset-[#1C1A17]',
}

type CtaButtonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  tone?: Tone
  className?: string
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, 'href' | 'className'>)
  | ({ href?: undefined } & Omit<ComponentProps<'button'>, 'className'>)
)

export function CtaButton({
  children,
  variant = 'primary',
  size = 'md',
  tone = 'light',
  className,
  href,
  ...rest
}: CtaButtonProps) {
  const classes = cn(
    base,
    sizes[size],
    variant === 'primary' ? variants.primary : cn(variants.secondary, secondaryTone[tone]),
    ringOffsetTone[tone],
    className,
  )

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as Omit<ComponentProps<typeof Link>, 'href' | 'className'>)}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as ComponentProps<'button'>)}>
      {children}
    </button>
  )
}
