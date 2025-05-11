"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-provider";
import { CreateBillForm } from "@/components/create-bill-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUserClient } from "@/lib/actions/auth.action";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await getCurrentUserClient();
      if (user) {
        setUser(user);
      }
    };
    getCurrentUser();
  }, []);
  // const user = { name: "Admin", email: "admin@shreejewellers.com" };
  const [recentBills, setRecentBills] = useState([
    {
      id: "INV-001",
      customer: "Rahul Sharma",
      amount: "₹45,000",
      status: "Paid",
      date: "2023-05-15",
    },
    {
      id: "INV-002",
      customer: "Priya Patel",
      amount: "₹78,500",
      status: "Pending",
      date: "2023-05-18",
    },
    {
      id: "INV-003",
      customer: "Amit Singh",
      amount: "₹32,750",
      status: "Paid",
      date: "2023-05-20",
    },
    {
      id: "INV-004",
      customer: "Neha Gupta",
      amount: "₹56,200",
      status: "Overdue",
      date: "2023-05-10",
    },
    {
      id: "INV-005",
      customer: "Vikram Mehta",
      amount: "₹94,300",
      status: "Paid",
      date: "2023-05-22",
    },
  ]);

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 sm:mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome, {user?.email || "User"}
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your jewellery business today.
          </p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-amber-500 hover:bg-amber-600 w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Create New Bill
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Create New Bill</SheetTitle>
              <SheetDescription>
                Fill in the details to generate a new bill for your customer.
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-120px)]">
              <CreateBillForm />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 sm:mb-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sales (This Month)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">₹3,45,670</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑ 12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">₹78,500</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500">2 invoices</span> pending
            </p>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑ 8</span> new this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bills */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Recent Bills</CardTitle>
            <CardDescription>
              View and manage your recent billing activity.
            </CardDescription>
          </div>
          <Link
            href="/dashboard/bill-history"
            className="mt-2 sm:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Customer
                  </TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">
                      {bill.id}
                      <div className="sm:hidden text-xs text-muted-foreground mt-1">
                        {bill.customer}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {bill.customer}
                    </TableCell>
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
                        }>
                        {bill.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hidden sm:inline-flex">
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm">
                          Print
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Important alerts and reminders.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="font-medium">Payment Overdue</h4>
                <p className="text-sm text-muted-foreground">
                  Invoice <span className="font-medium">INV-004</span> for Neha
                  Gupta is overdue by 5 days.
                </p>
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm">
                    Send Reminder
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="font-medium">Gold Rate Updated</h4>
                <p className="text-sm text-muted-foreground">
                  Today's gold rate has been updated to ₹5,850 per gram.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
