import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/actions/auth.action'
// import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lakhi Jewellers Management",
  description: "Jewellery billing SaaS for modern jewellery businesses",
}

export  default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const isUserAuthenticated = await isAuthenticated();
  
  if(!isUserAuthenticated) {
    redirect('/login')
  }


  
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
