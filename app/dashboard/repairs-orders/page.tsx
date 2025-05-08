"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, CheckCircle2, AlertCircle, PenToolIcon as Tool, Truck, Hammer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data for repairs and orders
const repairsData = [
  {
    id: "REP-001",
    customer: "Rahul Sharma",
    item: "Gold Ring",
    issue: "Stone replacement",
    status: "In Progress",
    dateReceived: "2023-06-10",
    estimatedCompletion: "2023-06-15",
  },
  {
    id: "REP-002",
    customer: "Priya Patel",
    item: "Silver Necklace",
    issue: "Clasp repair",
    status: "Completed",
    dateReceived: "2023-06-08",
    estimatedCompletion: "2023-06-12",
  },
  {
    id: "REP-003",
    customer: "Amit Singh",
    item: "Gold Bracelet",
    issue: "Link repair",
    status: "Received",
    dateReceived: "2023-06-12",
    estimatedCompletion: "2023-06-17",
  },
  {
    id: "REP-004",
    customer: "Neha Gupta",
    item: "Diamond Earrings",
    issue: "Cleaning and polishing",
    status: "Delivered",
    dateReceived: "2023-06-05",
    estimatedCompletion: "2023-06-07",
  },
  {
    id: "REP-005",
    customer: "Vikram Mehta",
    item: "Platinum Ring",
    issue: "Resizing",
    status: "In Progress",
    dateReceived: "2023-06-11",
    estimatedCompletion: "2023-06-14",
  },
]

const ordersData = [
  {
    id: "ORD-001",
    customer: "Sanjay Kumar",
    item: "Custom Gold Necklace",
    status: "In Production",
    dateOrdered: "2023-06-01",
    estimatedDelivery: "2023-06-20",
  },
  {
    id: "ORD-002",
    customer: "Anita Desai",
    item: "Diamond Engagement Ring",
    status: "Ready for Pickup",
    dateOrdered: "2023-05-25",
    estimatedDelivery: "2023-06-15",
  },
  {
    id: "ORD-003",
    customer: "Rajesh Khanna",
    item: "Silver Dining Set",
    status: "Order Placed",
    dateOrdered: "2023-06-08",
    estimatedDelivery: "2023-07-08",
  },
  {
    id: "ORD-004",
    customer: "Meera Patel",
    item: "Gold Bangles (Set of 6)",
    status: "Delivered",
    dateOrdered: "2023-05-15",
    estimatedDelivery: "2023-06-05",
  },
  {
    id: "ORD-005",
    customer: "Deepak Sharma",
    item: "Custom Wedding Rings",
    status: "In Production",
    dateOrdered: "2023-06-05",
    estimatedDelivery: "2023-06-25",
  },
]

export default function RepairsOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("repairs")

  // Filter repairs based on search term and status filter
  const filteredRepairs = repairsData.filter((repair) => {
    const matchesSearch =
      repair.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.item.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || repair.status.toLowerCase().includes(statusFilter.toLowerCase())

    return matchesSearch && matchesStatus
  })

  // Filter orders based on search term and status filter
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.item.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase().includes(statusFilter.toLowerCase())

    return matchesSearch && matchesStatus
  })

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
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            {status}
          </Badge>
        )
      case "completed":
      case "ready for pickup":
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
      <div className="mb-6 sm:mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Repairs & Orders</h1>
          <p className="text-muted-foreground">Manage repair requests and custom orders.</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 w-full md:w-auto" asChild>
          <Link href="/dashboard/repairs-orders/new">
            <Plus className="mr-2 h-4 w-4" /> New Entry
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 sm:mb-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Repairs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Tool className="h-5 w-5 text-amber-500 mr-2" />
              <div className="text-xl sm:text-2xl font-bold">{repairsData.length}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">
                {repairsData.filter((r) => r.status === "In Progress").length} in progress
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-amber-500 mr-2" />
              <div className="text-xl sm:text-2xl font-bold">{ordersData.length}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-amber-500">
                {ordersData.filter((o) => o.status === "In Production").length} in production
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-xl sm:text-2xl font-bold">3</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">Ready for pickup</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <div className="text-xl sm:text-2xl font-bold">1</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-500">Requires attention</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Manage Repairs & Orders</CardTitle>
              <CardDescription>View and update the status of repairs and custom orders.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by ID, customer, or item..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Filter:</span>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="order placed">Order Placed</SelectItem>
                  <SelectItem value="in production">In Production</SelectItem>
                  <SelectItem value="ready for pickup">Ready for Pickup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="repairs" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="repairs" className="flex items-center">
                <Tool className="mr-2 h-4 w-4" /> Repairs
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center">
                <Hammer className="mr-2 h-4 w-4" /> Custom Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="repairs">
              <div className="rounded-md border overflow-hidden">
                <ScrollArea className="w-full overflow-auto">
                  <div className="min-w-[800px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead>Issue</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Received</TableHead>
                          <TableHead>Est. Completion</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRepairs.length > 0 ? (
                          filteredRepairs.map((repair) => (
                            <TableRow key={repair.id}>
                              <TableCell className="font-medium">{repair.id}</TableCell>
                              <TableCell>{repair.customer}</TableCell>
                              <TableCell>{repair.item}</TableCell>
                              <TableCell>{repair.issue}</TableCell>
                              <TableCell>{getStatusBadge(repair.status)}</TableCell>
                              <TableCell>{repair.dateReceived}</TableCell>
                              <TableCell>{repair.estimatedCompletion}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={`/dashboard/repairs-orders/${repair.id}`}>View Details</Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center">
                              No repairs found matching your search criteria.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="rounded-md border overflow-hidden">
                <ScrollArea className="w-full overflow-auto">
                  <div className="min-w-[800px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Order Date</TableHead>
                          <TableHead>Est. Delivery</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.length > 0 ? (
                          filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{order.customer}</TableCell>
                              <TableCell>{order.item}</TableCell>
                              <TableCell>{getStatusBadge(order.status)}</TableCell>
                              <TableCell>{order.dateOrdered}</TableCell>
                              <TableCell>{order.estimatedDelivery}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={`/dashboard/repairs-orders/${order.id}`}>View Details</Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              No orders found matching your search criteria.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground order-2 sm:order-1">
              Showing {activeTab === "repairs" ? filteredRepairs.length : filteredOrders.length} of{" "}
              {activeTab === "repairs" ? repairsData.length : ordersData.length}{" "}
              {activeTab === "repairs" ? "repairs" : "orders"}
            </div>
            <div className="flex items-center gap-2 order-1 sm:order-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-muted">
                1
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
