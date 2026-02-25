import React from 'react'

type Props = {
  children: React.ReactNode
  variant?: 'new' | 'category'
  className?: string
}

export default function Badge({ children, variant = 'category', className = '' }: Props) {
  const base =
    'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border'

  const styles =
    variant === 'new'
      ? 'bg-yellow-400 text-black border-yellow-300'
      : 'bg-blue-500/15 text-blue-200 border-blue-500/20'

  return <span className={`${base} ${styles} ${className}`}>{children}</span>
}
