import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Celestius Recruitment",
  description: "Join Celestius - The Future of Innovation",
  openGraph: {
    title: "Celestius Recruitment",
    description: "Join Celestius - The Future of Innovation",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Celestius Recruitment",
    description: "Join Celestius - The Future of Innovation",
  },
  icons: {
    icon: [],
    apple: [],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-center" />
        <Analytics />
      </body>
    </html>
  )
}

