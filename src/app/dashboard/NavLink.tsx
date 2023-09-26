'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  segment?: string
}

export default function NavLink({ href, children, segment }: NavLinkProps) {
  let currentSegment = useSelectedLayoutSegment()

  let isActive = currentSegment === segment

  return (
    <Link href={href} className={isActive ? 'active' : ''}>
      {children}
    </Link>
  )
}
