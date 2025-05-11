import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { redirect } from 'next/navigation'
import { getCurrentUser, isAuthenticated } from '@/lib/actions/auth.action'
import { isPublicRoute } from '@/lib/isPublicRoute'
import { request } from 'http'
// import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lakhi Jewellers Management",
  description: "Jewellery billing SaaS for modern jewellery businesses",
}

export  default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  

  //todo: what i need to do here i need to 
  //todo: check once if the user is authenticated or not
  // if yes the redirect to dashboard else leave

  //! i will use this as a server component

  
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
