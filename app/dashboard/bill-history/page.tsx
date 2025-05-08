"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, Filter, Printer, Search } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function BillHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const bills = [
    { id: "INV-001", customer: "Rahul Sharma", amount: "₹45,000", status: "Paid", date: "2023-05-15" },
    { id: "INV-002", customer: "Priya Patel", amount: "₹78,500", status: "Pending", date: "2023-05-18" },
    { id: "INV-003", customer: "Amit Singh", amount: "₹32,750", status: "Paid", date: "2023-05-20" },
    { id: "INV-004", customer: "Neha Gupta", amount: "₹56,200", status: "Overdue", date: "2023-05-10" },
    { id: "INV-005", customer: "Vikram Mehta", amount: "₹94,300", status: "Paid", date: "2023-05-22" },
    { id: "INV-006", customer: "Sanjay Kumar", amount: "₹28,900", status: "Paid", date: "2023-05-25" },
    { id: "INV-007", customer: "Anita Desai", amount: "₹63,750", status: "Pending", date: "2023-05-28" },
    { id: "INV-008", customer: "Rajesh Khanna", amount: "₹41,200", status: "Paid", date: "2023-06-01" },
    { id: "INV-009", customer: "Meera Patel", amount: "₹85,300", status: "Overdue", date: "2023-05-05" },
    { id: "INV-010", customer: "Deepak Sharma", amount: "₹37,600", status: "Paid", date: "2023-06-03" },
  ]

  // Filter bills based on search term and status filter
  const filteredBills = bills.filter((bill) => {
    const matchesSearch =
      bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.customer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || bill.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Bill History</h1>
        <p className="text-muted-foreground">View and manage all your billing records.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Bills</CardTitle>
              <CardDescription>A complete list of all your billing records.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by invoice or customer..."
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
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <ScrollArea className="w-full overflow-auto">
              <div className="min-w-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice No</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBills.length > 0 ? (
                      filteredBills.map((bill) => (
                        <TableRow key={bill.id}>
                          <TableCell className="font-medium">{bill.id}</TableCell>
                          <TableCell>{bill.customer}</TableCell>
                          <TableCell>{bill.date}</TableCell>
                          <TableCell>{bill.amount}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                bill.status === "Paid"
                                  ? "default"
                                  : bill.status === "Pending"
                                    ? "outline"
                                    : "destructive"
                              }
                              className={
                                bill.status === "Paid"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : bill.status === "Pending"
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                    : ""
                              }
                            >
                              {bill.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="sm">
                                <Printer className="mr-2 h-4 w-4" />
                                <span className="hidden sm:inline">Print</span>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                <span className="hidden sm:inline">PDF</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No bills found matching your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground order-2 sm:order-1">
              Showing {filteredBills.length} of {bills.length} bills
            </div>
            <div className="flex items-center gap-2 order-1 sm:order-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-muted">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
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
