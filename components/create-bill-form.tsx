"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus, Calculator } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Dynamic billing item interface
interface DynamicBillingItem {
  id: string
  name: string
  quantity: number
  weight: number
  makingCharges: number
  goldRate: number
}

// Precalculated billing item interface
interface PrecalculatedBillingItem {
  id: string
  name: string
  quantity: number
  weight: number
  itemPrice: number
  goldRate?: number
}

// Customer information interface
interface CustomerInfo {
  name: string
  phone: string
  email: string
  address: string
}

export function CreateBillForm() {
  const [activeTab, setActiveTab] = useState("dynamic")
  const [isLoading, setIsLoading] = useState(false)
  const [dynamicItems, setDynamicItems] = useState<DynamicBillingItem[]>([
    {
      id: `dynamic-${Date.now()}`,
      name: "",
      quantity: 1,
      weight: 0,
      makingCharges: 0,
      goldRate: 5850, // Default gold rate
    },
  ])
  const [precalculatedItems, setPrecalculatedItems] = useState<PrecalculatedBillingItem[]>([
    {
      id: `precalc-${Date.now()}`,
      name: "",
      quantity: 1,
      weight: 0,
      itemPrice: 0,
      goldRate: 5850, // Optional gold rate
    },
  ])
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("")
  const { toast } = useToast()

  // Handle customer info change
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }

  // Handle dynamic item change
  const handleDynamicItemChange = (id: string, field: keyof DynamicBillingItem, value: string | number) => {
    setDynamicItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value }
        }
        return item
      }),
    )
  }

  // Handle precalculated item change
  const handlePrecalculatedItemChange = (id: string, field: keyof PrecalculatedBillingItem, value: string | number) => {
    setPrecalculatedItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value }
        }
        return item
      }),
    )
  }

  // Add dynamic item
  const addDynamicItem = () => {
    const newItem: DynamicBillingItem = {
      id: `dynamic-${Date.now()}`,
      name: "",
      quantity: 1,
      weight: 0,
      makingCharges: 0,
      goldRate: dynamicItems[dynamicItems.length - 1]?.goldRate || 5850, // Use the last item's gold rate or default
    }
    setDynamicItems([...dynamicItems, newItem])
  }

  // Add precalculated item
  const addPrecalculatedItem = () => {
    const newItem: PrecalculatedBillingItem = {
      id: `precalc-${Date.now()}`,
      name: "",
      quantity: 1,
      weight: 0,
      itemPrice: 0,
      goldRate: precalculatedItems[precalculatedItems.length - 1]?.goldRate || 5850, // Use the last item's gold rate or default
    }
    setPrecalculatedItems([...precalculatedItems, newItem])
  }

  // Remove dynamic item
  const removeDynamicItem = (id: string) => {
    if (dynamicItems.length > 1) {
      setDynamicItems(dynamicItems.filter((item) => item.id !== id))
    } else {
      toast({
        title: "Cannot remove item",
        description: "You must have at least one item in the bill.",
        variant: "destructive",
      })
    }
  }

  // Remove precalculated item
  const removePrecalculatedItem = (id: string) => {
    if (precalculatedItems.length > 1) {
      setPrecalculatedItems(precalculatedItems.filter((item) => item.id !== id))
    } else {
      toast({
        title: "Cannot remove item",
        description: "You must have at least one item in the bill.",
        variant: "destructive",
      })
    }
  }

  // Calculate dynamic item total
  const calculateDynamicItemTotal = (item: DynamicBillingItem): number => {
    return item.quantity * (item.weight * item.goldRate + item.makingCharges)
  }

  // Calculate precalculated item total
  const calculatePrecalculatedItemTotal = (item: PrecalculatedBillingItem): number => {
    return item.quantity * item.itemPrice
  }

  // Calculate dynamic subtotal
  const dynamicSubtotal = dynamicItems.reduce((sum, item) => sum + calculateDynamicItemTotal(item), 0)

  // Calculate precalculated subtotal
  const precalculatedSubtotal = precalculatedItems.reduce((sum, item) => sum + calculatePrecalculatedItemTotal(item), 0)

  // Calculate GST (3% for example)
  const dynamicGST = dynamicSubtotal * 0.03
  const precalculatedGST = precalculatedSubtotal * 0.03

  // Calculate grand totals
  const dynamicGrandTotal = dynamicSubtotal + dynamicGST
  const precalculatedGrandTotal = precalculatedSubtotal + precalculatedGST

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to create a bill
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Bill created successfully",
        description: `Bill for ${customerInfo.name} has been generated.`,
      })

      // Reset form or redirect
      if (activeTab === "dynamic") {
        setDynamicItems([
          {
            id: `dynamic-${Date.now()}`,
            name: "",
            quantity: 1,
            weight: 0,
            makingCharges: 0,
            goldRate: 5850,
          },
        ])
      } else {
        setPrecalculatedItems([
          {
            id: `precalc-${Date.now()}`,
            name: "",
            quantity: 1,
            weight: 0,
            itemPrice: 0,
            goldRate: 5850,
          },
        ])
      }

      setCustomerInfo({
        name: "",
        phone: "",
        email: "",
        address: "",
      })
      setPaymentMethod("")
    } catch (error) {
      toast({
        title: "Failed to create bill",
        description: "An error occurred while creating the bill. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Customer Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Customer Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter customer name"
              value={customerInfo.name}
              onChange={handleCustomerInfoChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              value={customerInfo.phone}
              onChange={handleCustomerInfoChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={customerInfo.email}
              onChange={handleCustomerInfoChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address (Optional)</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter address"
              value={customerInfo.address}
              onChange={handleCustomerInfoChange}
            />
          </div>
        </div>
      </div>

      {/* Billing Mode Tabs */}
      <Tabs defaultValue="dynamic" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="dynamic" className="flex items-center">
            <Calculator className="mr-2 h-4 w-4" /> Dynamic Billing
          </TabsTrigger>
          <TabsTrigger value="precalculated" className="flex items-center">
            <Calculator className="mr-2 h-4 w-4" /> Precalculated Billing
          </TabsTrigger>
        </TabsList>

        {/* Dynamic Billing Content */}
        <TabsContent value="dynamic" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Item Details</h3>
              <Button type="button" onClick={addDynamicItem} variant="outline" size="sm" className="flex items-center">
                <Plus className="mr-1 h-4 w-4" /> Add Item
              </Button>
            </div>

            {dynamicItems.map((item, index) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 items-end">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`item-name-${item.id}`}>Item Name</Label>
                      <Input
                        id={`item-name-${item.id}`}
                        placeholder="Gold Ring"
                        value={item.name}
                        onChange={(e) => handleDynamicItemChange(item.id, "name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-quantity-${item.id}`}>Quantity</Label>
                      <Input
                        id={`item-quantity-${item.id}`}
                        type="number"
                        min="1"
                        step="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleDynamicItemChange(item.id, "quantity", Number.parseInt(e.target.value) || 1)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-weight-${item.id}`}>Weight (g)</Label>
                      <Input
                        id={`item-weight-${item.id}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.weight}
                        onChange={(e) =>
                          handleDynamicItemChange(item.id, "weight", Number.parseFloat(e.target.value) || 0)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-making-${item.id}`}>Making (₹)</Label>
                      <Input
                        id={`item-making-${item.id}`}
                        type="number"
                        min="0"
                        step="1"
                        value={item.makingCharges}
                        onChange={(e) =>
                          handleDynamicItemChange(item.id, "makingCharges", Number.parseFloat(e.target.value) || 0)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-rate-${item.id}`}>Gold Rate (₹/g)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id={`item-rate-${item.id}`}
                          type="number"
                          min="0"
                          step="1"
                          value={item.goldRate}
                          onChange={(e) =>
                            handleDynamicItemChange(item.id, "goldRate", Number.parseFloat(e.target.value) || 0)
                          }
                          required
                        />
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeDynamicItem(item.id)}
                            className="flex-shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-right">
                    <div className="text-sm text-muted-foreground">
                      Item Total: {formatCurrency(calculateDynamicItemTotal(item))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Totals Section */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(dynamicSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (3%):</span>
                  <span>{formatCurrency(dynamicGST)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Grand Total:</span>
                  <span>{formatCurrency(dynamicGrandTotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Precalculated Billing Content */}
        <TabsContent value="precalculated" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Item Details</h3>
              <Button
                type="button"
                onClick={addPrecalculatedItem}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <Plus className="mr-1 h-4 w-4" /> Add Item
              </Button>
            </div>

            {precalculatedItems.map((item, index) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 items-end">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`item-name-${item.id}`}>Item Name</Label>
                      <Input
                        id={`item-name-${item.id}`}
                        placeholder="Gold Ring"
                        value={item.name}
                        onChange={(e) => handlePrecalculatedItemChange(item.id, "name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-quantity-${item.id}`}>Quantity</Label>
                      <Input
                        id={`item-quantity-${item.id}`}
                        type="number"
                        min="1"
                        step="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handlePrecalculatedItemChange(item.id, "quantity", Number.parseInt(e.target.value) || 1)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-weight-${item.id}`}>Weight (g)</Label>
                      <Input
                        id={`item-weight-${item.id}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.weight}
                        onChange={(e) =>
                          handlePrecalculatedItemChange(item.id, "weight", Number.parseFloat(e.target.value) || 0)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-price-${item.id}`}>Item Price (₹)</Label>
                      <Input
                        id={`item-price-${item.id}`}
                        type="number"
                        min="0"
                        step="1"
                        value={item.itemPrice}
                        onChange={(e) =>
                          handlePrecalculatedItemChange(item.id, "itemPrice", Number.parseFloat(e.target.value) || 0)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-rate-${item.id}`}>Gold Rate (₹/g) (Optional)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id={`item-rate-${item.id}`}
                          type="number"
                          min="0"
                          step="1"
                          value={item.goldRate || ""}
                          onChange={(e) =>
                            handlePrecalculatedItemChange(
                              item.id,
                              "goldRate",
                              e.target.value ? Number.parseFloat(e.target.value) : undefined,
                            )
                          }
                        />
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removePrecalculatedItem(item.id)}
                            className="flex-shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-right">
                    <div className="text-sm text-muted-foreground">
                      Item Total: {formatCurrency(calculatePrecalculatedItemTotal(item))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Totals Section */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(precalculatedSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (3%):</span>
                  <span>{formatCurrency(precalculatedGST)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Grand Total:</span>
                  <span>{formatCurrency(precalculatedGrandTotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Method */}
      <div className="space-y-2">
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
          <SelectTrigger id="paymentMethod">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="card">Card</SelectItem>
            <SelectItem value="upi">UPI</SelectItem>
            <SelectItem value="bank">Bank Transfer</SelectItem>
            <SelectItem value="cheque">Cheque</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 h-11 text-base" disabled={isLoading}>
          {isLoading ? "Generating Bill..." : "Generate Bill"}
        </Button>
      </div>
    </form>
  )
}
