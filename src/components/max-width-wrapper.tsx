import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export default function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'h-full mx-auto w-full px-3 md:px-4',
        className
      )}>
      {children}
    </div>
  )
}