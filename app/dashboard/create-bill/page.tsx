"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateBillForm } from "@/components/create-bill-form"

export default function CreateBillPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Bill</h1>
        <p className="text-muted-foreground">Generate a new bill for your customer.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Bill Details</CardTitle>
            <CardDescription>Enter the details to generate a new bill.</CardDescription>
          </CardHeader>
          <CardContent>
            <CreateBillForm />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Gold Rate</CardTitle>
              <CardDescription>Current market rates for reference.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">24K Gold:</span>
                  <span>₹5,850 per gram</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">22K Gold:</span>
                  <span>₹5,350 per gram</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">18K Gold:</span>
                  <span>₹4,380 per gram</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Silver:</span>
                  <span>₹75 per gram</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Customers</CardTitle>
              <CardDescription>Quick access to frequent customers.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Rahul Sharma", "Priya Patel", "Amit Singh", "Neha Gupta", "Vikram Mehta"].map((customer, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-2 hover:bg-muted">
                    <span>{customer}</span>
                    <button className="text-sm text-amber-600 hover:underline">Select</button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
