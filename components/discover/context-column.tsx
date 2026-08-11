// Alma's avatar, shared across onboarding screens. Kept in this module so the
// screens import a single, consistent portrait.
export function AlmaHead({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/alma-avatar.png"
      alt="Alma"
      className={`${className} rounded-full object-cover ring-1 ring-[#E4DDCE]`}
    />
  )
}
