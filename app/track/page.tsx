"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Sparkles, Search } from "lucide-react"
import Link from "next/link"

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!trackingId) {
      toast({
        title: "Tracking ID required",
        description: "Please enter a valid tracking ID.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Check if the ID starts with REP or ORD
    if (trackingId.startsWith("REP-") || trackingId.startsWith("ORD-")) {
      // In a real app, we would validate this against the database
      router.push(`/track/${trackingId}`)
    } else {
      toast({
        title: "Invalid tracking ID",
        description: "Please enter a valid tracking ID starting with REP- or ORD-.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-500" />
            <span className="text-xl font-bold">Shree Jewellers</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Button variant="outline" asChild>
              <Link href="/login">Customer Portal</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-b from-background to-muted">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Track Your Repair or Order</CardTitle>
            <CardDescription>Enter your tracking ID to check the status of your item</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trackingId">Tracking ID</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="trackingId"
                    placeholder="e.g. REP-001 or ORD-001"
                    className="pl-9"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Your tracking ID can be found on your receipt or in the SMS/email sent to you.
                </p>
              </div>
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600" disabled={isLoading}>
                {isLoading ? "Searching..." : "Track Now"}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t">
              <h3 className="font-medium mb-2">Example Tracking IDs for Demo:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <span className="font-medium">REP-001</span> - Repair in progress
                </li>
                <li>
                  <span className="font-medium">REP-002</span> - Repair completed
                </li>
                <li>
                  <span className="font-medium">ORD-001</span> - Custom order in production
                </li>
                <li>
                  <span className="font-medium">ORD-002</span> - Custom order ready for pickup
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-semibold">Shree Jewellers</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Shree Jewellers. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
