import type { Metadata, Viewport } from 'next'
import localFont from "next/font/local"
import './globals.css'
import Provider from '@/providers/Provider'

const poppins = localFont({
  src: [
    {
      path: '../assets/fonts/Poppins-Regular.woff2',
      weight: '400',
      style: "normal"
    },
    {
      path: '../assets/fonts/Poppins-Medium.woff2',
      weight: '500',
      style: "normal"
    },
    {
      path: '../assets/fonts/Poppins-Bold.woff2',
      weight: '700',
      style: "normal"
    }
  ],
  display: 'swap',
  variable: "--Poppins"
})

export const metadata: Metadata = {
  title: 'ARMS | Academic Resource Management System',
  description: 'ARMS is an educational platform designed to empower students with easy access to study materials for their respective subjects. Students can conveniently browse and download PDF documents uploaded by authorized faculties.',
  keywords: ["chiragchrg", "chirag", "chrgchirag", "ARMS", "Arms-v3", "Academic", "Resource", "Management", "System", "armss", "chiruchirag2001"],
  authors: [{ name: "ChiragChrg" }, { url: "https://chiragchrg.netlify.app/" }],
  creator: "ChiragChrg",
  metadataBase: new URL("https://armss.netlify.app/"),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'TSsuy8j81zZ0Ge0aestKiwZUPydASWd9aANj-ITDack',
  },
  manifest: "/manifest.json",
  icons: {
    icon: '/Icons/144.png',
    shortcut: '/favicon.svg',
    apple: '/Icons/192.png',
  },
  openGraph: {
    title: 'ARMS | Academic Resource Management System',
    description: 'ARMS is an educational platform designed to empower students with easy access to study materials for their respective subjects. Students can conveniently browse and download PDF documents uploaded by authorized faculties.',
    url: 'https://armss.netlify.app/',
    siteName: 'ARMS',
    images: [
      {
        url: '/Icons/192.png',
        width: 192,
        height: 192,
        alt: 'ARMS Logo',
      },
      {
        url: '/Icons/ARMSDevices.png',
        width: 1800,
        height: 760,
        alt: 'ARMS Mockup Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARMS | Academic Resource Management System',
    description: 'ARMS is an educational platform designed to empower students with easy access to study materials for their respective subjects. Students can conveniently browse and download PDF documents uploaded by authorized faculties.',
    creator: '@chrgchirag',
    images: ['/Icons/192.png', '/Icons/ARMSDevices.png'],
  },
}

export const viewport: Viewport = {
  themeColor: 'hsl(0 0% 100%)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider attribute="class" enableSystem storageKey='arms-theme'>
          {children}
        </Provider>
      </body>
    </html>
  )
}
