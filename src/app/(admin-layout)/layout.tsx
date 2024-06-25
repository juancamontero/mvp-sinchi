import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Footer, TopBar } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Proyectos | SINCHI',
  description: 'Proyectos SINCHI',
  openGraph: {
    title: 'Proyectos | SINCHI',
    description: 'Proyectos SINCHI',
    url: 'https://proyectos.sinchi.org.co/',
    siteName: 'Proyectos | SINCHI',
    locale: 'es-ES',
    type: 'website',
    images: [
      {
        url: '/og-sinchi.webp',
        width: 800,
        height: 535,
        alt: 'Proyectos | SINCHI',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-bg-100 flex flex-col h-screen`}>
        <TopBar />
        {children}
      </body>
    </html>
  )
}
