"use client";
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Sparkles, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { Register } from "@/lib/actions/auth.action";
// import { Auth } from 'firebase-admin/auth';

const RegisterFormSchema = z.object({
  name: z.string().min(2, { message: "Shop Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(3, { message: "Password is required" }),
  confirmPassword: z
    .string()
    .min(3, { message: "Confirm Password is required" }),
});

type FormSchemaType = z.infer<typeof RegisterFormSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "Vishal soni ",
      email: "vsoni0882@gmail.com",
      password: "password",
      confirmPassword: "password",
    },
  });

  const handleSubmit = async (data: FormSchemaType) => {
    console.log("form data is : ", data);

    if (data.password !== data.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return(
        <span>Passwords don't match</span>
      );
    }
    setIsLoading(true);
    try {
      const { name, email, password } = data;
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("userCredentials", userCredentials);

      const uid = userCredentials.user.uid;
      console.log("uid", uid);

      const result = await Register({
        // accessToken: userCredentials.user.accessToken,
        uid: uid,
        name: name,
        email: email,
        password: password,
      });

      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });

      router.push("/login");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="mb-6 md:mb-8 flex items-center gap-2">
        <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-amber-500" />
        <h1 className="text-2xl md:text-3xl font-bold">
          Shree Jewellers Billing
        </h1>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm md:text-base">
                Shop Name
              </Label>
              <Input
                id="name"
                placeholder="Your shop name"
                required
                {...form.register("name")}
                className="h-10 md:h-11"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm md:text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                {...form.register("email")}
                className="h-10 md:h-11"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm md:text-base">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  required
                  {...form.register("password")}
                  className="h-10 md:h-11 pr-10"
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm md:text-base">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  required
                  {...form.register("confirmPassword")}
                  className="h-10 md:h-11 pr-10"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 h-10 md:h-11 text-base"
              disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-amber-600 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
