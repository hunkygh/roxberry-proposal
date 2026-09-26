import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Proposal - Roxberry Juice",
  description: "A custom partnership proposal from Global Payments",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-stone-50 text-stone-800 font-sans">
        {children}
      </body>
    </html>
  )
}
