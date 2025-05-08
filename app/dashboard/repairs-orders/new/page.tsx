"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, PenToolIcon as Tool, Hammer } from "lucide-react"

export default function NewRepairOrderPage() {
  const [entryType, setEntryType] = useState("repair")
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    itemName: "",
    description: "",
    issue: "",
    estimatedPrice: "",
    status: "received",
    dateReceived: new Date(),
    estimatedCompletion: new Date(new Date().setDate(new Date().getDate() + 7)),
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, [name]: date }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to create a repair/order
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: `${entryType === "repair" ? "Repair" : "Order"} created successfully`,
        description: `${entryType === "repair" ? "Repair" : "Order"} for ${formData.customerName} has been registered.`,
      })

      // Redirect to repairs & orders page
      router.push("/dashboard/repairs-orders")
    } catch (error) {
      toast({
        title: `Failed to create ${entryType === "repair" ? "repair" : "order"}`,
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">New Repair/Order Entry</h1>
        <p className="text-muted-foreground">Create a new repair request or custom order.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Entry Details</CardTitle>
          <CardDescription>Fill in the details to register a new repair or custom order.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="repair" className="w-full" onValueChange={setEntryType}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="repair" className="flex items-center">
                <Tool className="mr-2 h-4 w-4" /> Repair Request
              </TabsTrigger>
              <TabsTrigger value="order" className="flex items-center">
                <Hammer className="mr-2 h-4 w-4" /> Custom Order
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      placeholder="Enter customer name"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Enter phone number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input
                    id="itemName"
                    name="itemName"
                    placeholder={entryType === "repair" ? "Gold Ring" : "Custom Gold Necklace"}
                    value={formData.itemName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Item Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide details about the item"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                {entryType === "repair" && (
                  <div className="space-y-2">
                    <Label htmlFor="issue">Issue/Problem</Label>
                    <Textarea
                      id="issue"
                      name="issue"
                      placeholder="Describe the issue that needs repair"
                      value={formData.issue}
                      onChange={handleInputChange}
                      required={entryType === "repair"}
                      rows={3}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="estimatedPrice">Estimated Price (₹)</Label>
                    <Input
                      id="estimatedPrice"
                      name="estimatedPrice"
                      type="number"
                      placeholder="Enter estimated price"
                      value={formData.estimatedPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      defaultValue={formData.status}
                      onValueChange={(value) => handleSelectChange("status", value)}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {entryType === "repair" ? (
                          <>
                            <SelectItem value="received">Received</SelectItem>
                            <SelectItem value="in progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="order placed">Order Placed</SelectItem>
                            <SelectItem value="in production">In Production</SelectItem>
                            <SelectItem value="ready for pickup">Ready for Pickup</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{entryType === "repair" ? "Date Received" : "Order Date"}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dateReceived ? format(formData.dateReceived, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dateReceived}
                          onSelect={(date) => handleDateChange("dateReceived", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>{entryType === "repair" ? "Estimated Completion" : "Estimated Delivery"}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.estimatedCompletion ? (
                            format(formData.estimatedCompletion, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.estimatedCompletion}
                          onSelect={(date) => handleDateChange("estimatedCompletion", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard/repairs-orders")}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600" disabled={isLoading}>
                  {isLoading
                    ? `Creating ${entryType === "repair" ? "Repair" : "Order"}...`
                    : `Create ${entryType === "repair" ? "Repair" : "Order"}`}
                </Button>
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
