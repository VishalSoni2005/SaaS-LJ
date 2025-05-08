"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { StatusTimeline } from "@/components/status-timeline"
import { ArrowLeft, Printer, Phone, Send } from "lucide-react"
import Link from "next/link"

// Sample data for repairs and orders
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

export default function RepairOrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { toast } = useToast()

  // Find the item based on ID
  const item = allItems.find((item) => item.id === id)

  const [status, setStatus] = useState(item?.status || "")
  const [note, setNote] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  // Determine if it's a repair or order
  const isRepair = id.startsWith("REP")

  // Handle status update
  const handleStatusUpdate = async () => {
    if (!note) {
      toast({
        title: "Note required",
        description: "Please add a note about this status update.",
        variant: "destructive",
      })
      return
    }

    setIsUpdating(true)

    try {
      // In a real app, this would be an API call to update the status
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Status updated",
        description: `Status has been updated to ${status}.`,
      })

      // Clear the note field
      setNote("")
    } catch (error) {
      toast({
        title: "Update failed",
        description: "An error occurred while updating the status.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle sending notification to customer
  const handleSendNotification = async () => {
    try {
      // In a real app, this would be an API call to send notification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Notification sent",
        description: `${item?.customer} has been notified about the status update.`,
      })
    } catch (error) {
      toast({
        title: "Failed to send notification",
        description: "An error occurred while sending the notification.",
        variant: "destructive",
      })
    }
  }

  // If item not found
  if (!item) {
    return (
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">Item Not Found</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p>The requested item with ID {id} could not be found.</p>
            <Button className="mt-4" asChild>
              <Link href="/dashboard/repairs-orders">Return to Repairs & Orders</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "received":
      case "order placed":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            {status}
          </Badge>
        )
      case "in progress":
      case "in production":
      case "design approved":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            {status}
          </Badge>
        )
      case "completed":
      case "ready for pickup":
      case "quality check":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            {status}
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              {item.id}: {item.item}
            </h1>
            <p className="text-muted-foreground">{isRepair ? "Repair Request" : "Custom Order"} Details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" /> Print Details
          </Button>
          <Button variant="outline" size="sm" onClick={handleSendNotification}>
            <Send className="h-4 w-4 mr-2" /> Notify Customer
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Customer</h3>
                  <p>{item.customer}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Contact</h3>
                  <div className="flex items-center">
                    <p>{item.phone}</p>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Item</h3>
                  <p>{item.item}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Estimated Price</h3>
                  <p>{item.estimatedPrice}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                    {isRepair ? "Date Received" : "Order Date"}
                  </h3>
                  <p>{isRepair ? item.dateReceived : (item as any).dateOrdered}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">
                    {isRepair ? "Estimated Completion" : "Estimated Delivery"}
                  </h3>
                  <p>{isRepair ? item.estimatedCompletion : (item as any).estimatedDelivery}</p>
                </div>
                <div className="sm:col-span-2">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Description</h3>
                  <p>{item.description}</p>
                </div>
                {isRepair && (
                  <div className="sm:col-span-2">
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Issue</h3>
                    <p>{(item as any).issue}</p>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Notes</h3>
                  <p>{item.notes}</p>
                </div>
                <div className="sm:col-span-2">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Current Status</h3>
                  <div className="mt-1">{getStatusBadge(item.status)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Timeline</CardTitle>
              <CardDescription>Track the progress of this {isRepair ? "repair" : "order"}</CardDescription>
            </CardHeader>
            <CardContent>
              <StatusTimeline statusHistory={item.statusHistory} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
              <CardDescription>Change the current status of this {isRepair ? "repair" : "order"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {isRepair ? (
                        <>
                          <SelectItem value="Received">Received</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Ready for Pickup">Ready for Pickup</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="Order Placed">Order Placed</SelectItem>
                          <SelectItem value="Design Approved">Design Approved</SelectItem>
                          <SelectItem value="In Production">In Production</SelectItem>
                          <SelectItem value="Quality Check">Quality Check</SelectItem>
                          <SelectItem value="Ready for Pickup">Ready for Pickup</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note">Note</Label>
                  <Textarea
                    id="note"
                    placeholder="Add a note about this status update"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-600"
                  onClick={handleStatusUpdate}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Status"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Tracking</CardTitle>
              <CardDescription>Share tracking information with the customer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-md text-sm">
                  <p className="font-medium">Tracking URL</p>
                  <p className="text-muted-foreground break-all mt-1">https://shreejewellers.com/track/{item.id}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Copy Link
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
