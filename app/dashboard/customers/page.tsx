"use client";

import type React from "react";

import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Download, Edit, Search, Trash, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getCurrentUserClient } from "@/lib/actions/auth.action";

import { useDBStore } from "@/lib/store/useDBStore";
import { Skeleton } from "@/components/ui/skeleton";

export default function CustomersPage() {
  const [user, setUser] = useState<User | null>(null);

  const { customerCollection, fetchCustomerCollection, isFetchingCustomers } =
    useDBStore();

  // const [customers, setCustomers] = useState<Customer[] | null>(null);
  const customers = customerCollection;

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const { toast } = useToast();

  // Filter customers based on search term
  const filteredCustomers = customers?.filter(
    (customer) =>
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.contact_number.includes(searchTerm) ||
      customer?.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = () => {
    // In a real app, this would be an API call to add a customer
    toast({
      title: "Customer added",
      description: `${newCustomer.name} has been added to your customers.`,
    });

    // Reset form and close dialog
    setNewCustomer({
      name: "",
      phone: "",
      email: "",
      address: "",
    });
    setIsAddingCustomer(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchCustomers = async () => await fetchCustomerCollection();
    fetchCustomers();
  }, [fetchCustomerCollection]);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUserClient();
      setUser(currentUser);
      console.log("currentUser", currentUser);
    };
    fetchUser();
  }, []);

  return (
    <div className="p-6 relative">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Customers{" "}
          {user ? (
            "of " + user?.email.split("@")[0]
          ) : (
            <Skeleton className="h-4 w-44 bg-yellow-700 dark:bg-gray-600 rounded-md border border-gray-400 animate-pulse" />
          )}
        </h1>
        <p className="text-muted-foreground">Manage your customer database.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Customers</CardTitle>
              <CardDescription>
                A list of all your customers and their purchase history.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog
                open={isAddingCustomer}
                onOpenChange={setIsAddingCustomer}>
                <DialogTrigger asChild>
                  <Button className="bg-amber-500 hover:bg-amber-600">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Customer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                    <DialogDescription>
                      Enter the customer details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={newCustomer.name}
                        onChange={handleInputChange}
                        placeholder="Enter customer name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={newCustomer.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={newCustomer.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={newCustomer.address}
                        onChange={handleInputChange}
                        placeholder="Enter address"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingCustomer(false)}>
                      Cancel
                    </Button>
                    <Button
                      className="bg-amber-500 hover:bg-amber-600"
                      onClick={handleAddCustomer}>
                      Add Customer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
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
                placeholder="Search customers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className=" sm:overflow-x-auto overflow-x-scroll rounded-md border min-w-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Total Due</TableHead>
                  <TableHead>Last Purchase</TableHead>
                  <TableHead>Joined On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredCustomers ?? [].length > 0 ? (
                  (filteredCustomers ?? []).map((customer) => (
                    <TableRow key={customer.customer_id}>
                      <TableCell className="font-medium">
                        {customer.name}
                      </TableCell>
                      <TableCell>{customer.contact_number}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>{customer.total_spent}</TableCell>
                      <TableCell
                        className={`${
                          customer.total_due > 0
                            ? "text-red-500 "
                            : " text-green-700"
                        }`}>
                        {customer.total_due}
                      </TableCell>
                      <TableCell>{customer.last_purchase}</TableCell>
                      <TableCell>{customer.created_at.split("T")[0]}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center">
                      <Skeleton className="h-16 w-auto bg-gray-300 dark:bg-gray-600 animate-pulse rounded-md" />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {/* //! fotter */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredCustomers?.length} of {customers?.length}{" "}
              customers
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled>
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-muted">
                1
              </Button>
              <Button
                variant="outline"
                size="sm">
                2
              </Button>
              <Button
                variant="outline"
                size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
