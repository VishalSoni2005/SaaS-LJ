"use client";

import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Download,
  Bell,
  Sparkles,
  Menu,
  PenToolIcon as Tool,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.action";

const LandingPage = async () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-500" />
            <span className="text-xl font-bold">Lakhi Jewellers Billing</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:underline">
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:underline">
              Contact
            </Link>
            <Link
              href="/track"
              className="text-sm font-medium hover:underline">
              Track Order
            </Link>
            <Button
              variant="outline"
              asChild>
              <Link href="/login">Login</Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet
            open={isMenuOpen}
            onOpenChange={setIsMenuOpen}>
            <SheetTrigger
              asChild
              className="md:hidden">
              <Button
                variant="ghost"
                size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col gap-6 pt-10">
                <Link
                  href="#features"
                  className="text-lg font-medium hover:text-amber-500"
                  onClick={() => setIsMenuOpen(false)}>
                  Features
                </Link>
                <Link
                  href="#pricing"
                  className="text-lg font-medium hover:text-amber-500"
                  onClick={() => setIsMenuOpen(false)}>
                  Pricing
                </Link>
                <Link
                  href="#contact"
                  className="text-lg font-medium hover:text-amber-500"
                  onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
                <Link
                  href="/track"
                  className="text-lg font-medium hover:text-amber-500"
                  onClick={() => setIsMenuOpen(false)}>
                  Track Order
                </Link>
                <Button asChild>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted py-16 md:py-24 lg:py-32">
          <div className="container flex flex-col items-center text-center">
            <div className="mb-6 md:mb-8 inline-block rounded-full bg-amber-100 p-3">
              <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-amber-500" />
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="text-amber-500">Simplify</span> Your Jewellery
              Billing
            </h1>
            <p className="mb-6 md:mb-8 max-w-[42rem] text-lg md:text-xl text-muted-foreground px-4 md:px-0">
              Simplify Your Jewellery Billing with Ease & Elegance.
            </p>
            <div className="flex flex-col w-full px-4 sm:px-0 sm:w-auto sm:flex-row gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                asChild>
                <Link href="/login">
                  Start Billing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
                asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="container py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
          <div className="mx-auto mb-12 md:mb-16 flex max-w-[58rem] flex-col items-center text-center">
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              Premium Features for Your Jewellery Business
            </h2>
            <p className="mt-4 max-w-[95%] md:max-w-[85%] text-base md:text-lg text-muted-foreground">
              Streamline your billing process with our powerful features
              designed specifically for jewellery retailers.
            </p>
          </div>
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-center rounded-lg border bg-card p-6 md:p-8 text-center shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-full bg-amber-100 p-3">
                <Sparkles className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Auto Bill Generator</h3>
              <p className="text-muted-foreground">
                Generate professional bills automatically with customizable
                templates tailored for jewellery items.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center rounded-lg border bg-card p-6 md:p-8 text-center shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-full bg-amber-100 p-3">
                <Bell className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold">
                Due Reminders via WhatsApp
              </h3>
              <p className="text-muted-foreground">
                Automated payment reminders sent directly to your customers via
                WhatsApp to ensure timely payments.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center rounded-lg border bg-card p-6 md:p-8 text-center shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-full bg-amber-100 p-3">
                <Download className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold">PDF Invoice Downloads</h3>
              <p className="text-muted-foreground">
                Download and share professional PDF invoices with your customers
                with just a single click.
              </p>
            </div>
            {/* Feature 4 - New Repair Tracking Feature */}
            <div className="flex flex-col items-center rounded-lg border bg-card p-6 md:p-8 text-center shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-full bg-amber-100 p-3">
                <Tool className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Repair Tracking</h3>
              <p className="text-muted-foreground">
                Manage repair requests with real-time status updates and
                automated customer notifications.
              </p>
            </div>
            {/* Feature 5 - New Order Management Feature */}
            <div className="flex flex-col items-center rounded-lg border bg-card p-6 md:p-8 text-center shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-full bg-amber-100 p-3">
                <Truck className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Order Management</h3>
              <p className="text-muted-foreground">
                Track custom orders from design to delivery with a comprehensive
                timeline visible to both you and your customers.
              </p>
            </div>
          </div>
        </section>

        {/* Track Your Order Section - New */}
        <section className="bg-amber-50 px-4 sm:px-6 md:px-8 py-16 md:py-24">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Track Your Repair or Order
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Stay updated on the status of your jewellery repair or custom
                  order with our real-time tracking system.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center">
                      <span className="text-amber-700 text-xs">1</span>
                    </div>
                    <p>
                      Enter your unique tracking ID provided at the time of
                      order
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center">
                      <span className="text-amber-700 text-xs">2</span>
                    </div>
                    <p>
                      View real-time status updates of your repair or custom
                      order
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-amber-200 flex items-center justify-center">
                      <span className="text-amber-700 text-xs">3</span>
                    </div>
                    <p>
                      Receive notifications when your item is ready for pickup
                    </p>
                  </li>
                </ul>
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600"
                  asChild>
                  <Link href="/track">
                    Track Your Order <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/2">
                <Card className="shadow-lg border-amber-200">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 pb-4 border-b">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <Tool className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">Order #ORD-001</p>
                          <p className="text-sm text-muted-foreground">
                            Custom Gold Necklace
                          </p>
                        </div>
                        <Badge className="ml-auto bg-amber-100 text-amber-800 hover:bg-amber-100">
                          In Production
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Order Placed
                          </span>
                          <span className="font-medium">
                            June 1,{new Date().getFullYear()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Current Status
                          </span>
                          <span className="font-medium text-amber-600">
                            In Production
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Estimated Delivery
                          </span>
                          <span className="font-medium">
                            June 20, {new Date().getFullYear()}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                        <div
                          className="bg-amber-500 h-2.5 rounded-full"
                          style={{ width: "60%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white px-4 sm:px-6 md:px-8">
          <div className="container py-12 md:py-16 lg:py-24">
            <div className="flex flex-col items-center justify-between gap-6 md:gap-8 rounded-lg border border-amber-200 bg-white p-6 md:p-8 lg:p-12 shadow-lg md:flex-row">
              <div>
                <h3 className="text-xl font-bold md:text-2xl lg:text-3xl">
                  Ready to transform your billing process?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Join thousands of jewellers who have simplified their business
                  operations.
                </p>
              </div>
              <Button
                size="lg"
                className="w-full md:w-auto bg-amber-500 hover:bg-amber-600"
                asChild>
                <Link href="/signup">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="contact"
        className="border-t bg-muted/40">
        <div className="container py-8 md:py-12 px-4 sm:px-6 md:px-8">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span className="text-lg font-bold">Lakhi Jewellers</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Simplifying jewellery billing since 2025.
              </p>
            </div>

            <div>
              <h4 className="mb-3 text-base font-semibold tracking-wide">
                Company
              </h4>
              <h3 className="text-sm font-medium italic text-gray-700 hover:text-amber-500 hover:underline transition duration-200 ease-in-out">
                <Link href="/#">Lakhi Jewellers</Link>
              </h3>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">
                  Email: contact@Lakhijewellers.com
                </li>
                <li className="text-muted-foreground">Phone: +91 7667860191</li>
                <li className="text-muted-foreground">
                  Address: Bakarganj Patna - 800004
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Lakhi Jewellers Billing. All
            rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
