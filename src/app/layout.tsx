import type { Metadata } from 'next'
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
  description: 'Academic Resource Management System (ARMS) is a software which is developed for the Education system. Teachers can upload study materials and Students can download those files.',
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
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YRAUUyc8TP4QJ1s53KAdLxcON9xifQf33BnLeP-F_5Y',
  },
  manifest: "/manifest.json",
  icons: {
    icon: '/Icons/144.png',
    shortcut: '/favicon.svg',
    apple: '/Icons/192.png',
  },
  openGraph: {
    title: 'ARMS | Academic Resource Management System',
    description: 'Academic Resource Management System (ARMS) is a software which is developed for the Education system. Teachers can upload study materials and Students can download those files.',
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
    description: 'Academic Resource Management System (ARMS) is a software which is developed for the Education system. Teachers can upload study materials and Students can download those files.',
    creator: '@chrgchirag',
    images: ['/Icons/192.png', '/Icons/ARMSDevices.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider attribute="class" defaultTheme="dark" enableSystem storageKey='arms-theme'>
          {children}
        </Provider>
      </body>
    </html>
  )
}
