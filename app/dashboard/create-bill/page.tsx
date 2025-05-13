"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, FileText, BookAIcon, BookCheck, Check } from "lucide-react";
import Link from 'next/link';

export default function CreateBillPage() {
  return (
    <div className="p-8 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700">
          Invoice Management
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Manage customer invoices, track purchases, and generate new bills with
          ease.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {/* // todo: add new bill */}
        <Link href={"/dashboard/create-bill/new-bill"}>
          <Card className="shadow-lg rounded-2xl bg-white border border-gray-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-blue-700">
                Generate New Bill
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookCheck className="h-6 w-6 text-blue-600 mr-2" />
                <div className="text-2xl font-bold">32</div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                <span className="text-green-600">Completed</span>
              </p>
            </CardContent>
          </Card>
        </Link>

        {/*// todo: add pending invoices */}

        <Link href={"/dashboard/bill/pending-invoices"}>
          <Card className="shadow-lg rounded-2xl bg-white border border-gray-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-blue-700">
                Pending Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-blue-600 mr-2" />
                <div className="text-2xl font-bold">8</div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                <span className="text-red-600">Due</span>
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* // todo: add paid invoices */}

        <Link href={"/dashboard/bill/paid-invoices"}>
          <Card className="shadow-lg rounded-2xl bg-white border border-gray-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-blue-700">
                Total Paid Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Check className="h-6 w-6 text-blue-600 mr-2" />
                <div className="text-2xl font-bold">8</div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                <span className="text-green-600">Paid</span>
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
