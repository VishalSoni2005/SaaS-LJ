"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusTimeline } from "@/components/status-timeline"
import { ArrowLeft, Sparkles, Phone, MapPin } from "lucide-react"
import Link from "next/link"

// Sample data for repairs and orders (same as in the admin view)
const repairsData = [
  {
    id: "REP-001",
    customer: "Rahul Sharma",
    phone: "+91 98765 43210",
    item: "Gold Ring",
    issue: "Stone replacement",
    description: "18K gold ring with a loose diamond that needs to be reset.",
    status: "In Progress",
    dateReceived: "2023-06-10",
    estimatedCompletion: "2023-06-15",
    estimatedPrice: "₹3,500",
    notes: "Customer requested expedited service. Diamond sourced and ready for setting.",
    statusHistory: [
      { status: "Received", date: "2023-06-10", note: "Item received and inspected" },
      { status: "In Progress", date: "2023-06-12", note: "Diamond sourced and ready for setting" },
    ],
  },
  {
    id: "REP-002",
    customer: "Priya Patel",
    phone: "+91 87654 32109",
    item: "Silver Necklace",
    issue: "Clasp repair",
    description: "Sterling silver necklace with broken clasp mechanism.",
    status: "Completed",
    dateReceived: "2023-06-08",
    estimatedCompletion: "2023-06-12",
    estimatedPrice: "₹1,200",
    notes: "Replaced with a stronger lobster clasp as requested.",
    statusHistory: [
      { status: "Received", date: "2023-06-08", note: "Item received and inspected" },
      { status: "In Progress", date: "2023-06-09", note: "Removing old clasp" },
      { status: "Completed", date: "2023-06-11", note: "New clasp installed and tested" },
    ],
  },
]

const ordersData = [
  {
    id: "ORD-001",
    customer: "Sanjay Kumar",
    phone: "+91 76543 21098",
    item: "Custom Gold Necklace",
    description: "22K gold necklace with custom pendant design featuring customer's initials.",
    status: "In Production",
    dateOrdered: "2023-06-01",
    estimatedDelivery: "2023-06-20",
    estimatedPrice: "₹45,000",
    notes: "Design approved. Gold sourced and production started.",
    statusHistory: [
      { status: "Order Placed", date: "2023-06-01", note: "Order details confirmed with customer" },
      { status: "Design Approved", date: "2023-06-05", note: "Customer approved final design" },
      { status: "In Production", date: "2023-06-08", note: "Materials sourced and production started" },
    ],
  },
  {
    id: "ORD-002",
    customer: "Anita Desai",
    phone: "+91 65432 10987",
    item: "Diamond Engagement Ring",
    description: "Platinum ring with 1 carat center diamond and pave setting.",
    status: "Ready for Pickup",
    dateOrdered: "2023-05-25",
    estimatedDelivery: "2023-06-15",
    estimatedPrice: "₹1,25,000",
    notes: "Ring completed ahead of schedule. Customer notified for pickup.",
    statusHistory: [
      { status: "Order Placed", date: "2023-05-25", note: "Order details confirmed with customer" },
      { status: "Design Approved", date: "2023-05-28", note: "Customer approved final design" },
      { status: "In Production", date: "2023-06-01", note: "Materials sourced and production started" },
      { status: "Quality Check", date: "2023-06-10", note: "Final inspection completed" },
      { status: "Ready for Pickup", date: "2023-06-12", note: "Customer notified for pickup" },
    ],
  },
]

// Combined data for easier lookup
const allItems = [...repairsData, ...ordersData]

export default function TrackDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()

  // Find the item based on ID
  const item = allItems.find((item) => item.id === id)

  // Determine if it's a repair or order
  const isRepair = id.startsWith("REP")

  // If item not found
  if (!item) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-amber-500" />
              <span className="text-xl font-bold">Shree Jewellers</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-b from-background to-muted">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Item Not Found</CardTitle>
              <CardDescription>The tracking ID you entered could not be found.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="mb-4">Please check the tracking ID and try again.</p>
              <Button asChild>
                <Link href="/track">Return to Tracking</Link>
              </Button>
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

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "received":
      case "order placed":
        return "text-blue-600"
      case "in progress":
      case "in production":
      case "design approved":
        return "text-amber-600"
      case "completed":
      case "ready for pickup":
      case "quality check":
        return "text-green-600"
      case "delivered":
        return "text-purple-600"
      default:
        return "text-gray-600"
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
          <Button variant="ghost" asChild>
            <Link href="/track">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Tracking
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gradient-to-b from-background to-muted">
        <div className="container max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {item.id}: {item.item}
                  </CardTitle>
                  <CardDescription>{isRepair ? "Repair Request" : "Custom Order"} Status</CardDescription>
                </div>
                <div className={`text-lg font-semibold ${getStatusColor(item.status)}`}>{item.status}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Item</h3>
                  <p className="font-medium">{item.item}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    {isRepair ? "Date Received" : "Order Date"}
                  </h3>
                  <p className="font-medium">{isRepair ? item.dateReceived : (item as any).dateOrdered}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    {isRepair ? "Estimated Completion" : "Estimated Delivery"}
                  </h3>
                  <p className="font-medium">{isRepair ? item.estimatedCompletion : (item as any).estimatedDelivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Status Timeline</CardTitle>
                  <CardDescription>Track the progress of your {isRepair ? "repair" : "order"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <StatusTimeline statusHistory={item.statusHistory} />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Store Information</CardTitle>
                  <CardDescription>Contact us for any queries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Shree Jewellers</p>
                        <p className="text-sm text-muted-foreground">123 Jewellery Lane, Mumbai</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium">+91 98765 43210</p>
                        <p className="text-sm text-muted-foreground">Mon-Sat, 10am-8pm</p>
                      </div>
                    </div>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 mt-2">Contact Store</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
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
