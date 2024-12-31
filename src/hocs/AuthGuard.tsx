'use client'

// Third-party Imports
import { useSession } from 'next-auth/react'

// Type Imports
import type { Locale } from '@configs/i18n'
import type { ChildrenType } from '@core/types'

// Component Imports
import AuthRedirect from '@/components/AuthRedirect'

export default function AuthGuard({ children, locale }: ChildrenType & { locale: Locale }) {
  const session = useSession()

  return <>{session ? children : <AuthRedirect lang={locale} />}</>
}
