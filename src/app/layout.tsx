// 'use client'
import { ReduxProvider } from '@/redux/providers'
import './globals.scss'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Metrocal',
  description:
    'Sistema ERP para la gestión de la producción de certificados de calibración',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={montserrat.className}>{children}</body>
      </html>
    </ReduxProvider>
  )
}
