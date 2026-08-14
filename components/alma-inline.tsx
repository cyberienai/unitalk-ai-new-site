import Image from 'next/image'

export function AlmaInline({ className }: { className?: string }) {
  return (
    <Image
      src="/alma-avatar.png"
      alt=""
      width={18}
      height={18}
      className={`inline-block size-[18px] rounded-full object-cover align-text-bottom ring-1 ring-[#D10E63]/20 ${className ?? ''}`}
    />
  )
}