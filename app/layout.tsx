import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
// import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lakhi Jewellers Management",
  description: "Jewellery billing SaaS for modern jewellery businesses",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider> */}
          {children}
          <Toaster />
        {/* </AuthProvider> */}
      </body>
    </html>
  )
}
