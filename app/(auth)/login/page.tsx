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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { Login } from "@/lib/actions/auth.action";

const LoginFormSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(3, { message: "Password is required" }),
});

type LoginForm = z.infer<typeof LoginFormSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "vsoni0882@gmail.com",
      password: "password",
    },
  });

  //! todo: handleSubmin
  const handleSubmit = async (data: LoginForm) => {
    console.log("form data is : ", data);

    setIsLoading(true);

    try {
      const { email, password } = data;
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("userCredentials", userCredentials);

      const idToken = await userCredentials.user.getIdToken();
      console.log("idToken", idToken);

      if (!idToken) {
        toast({
          title: "Login failed",
          description: "An error occurred during login. Please try again.",
          variant: "destructive",
        });
        return;
      }

      await Login({ email: email, idToken: idToken });

      console.log("Login success");

      toast({
        title: "Login successful",
        description: "Welcome back to Shree Jewellers Billing",
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in user:", error);
      toast({
        title: "Login failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      {/* header */}
      <div className="mb-6 md:mb-8 flex items-center gap-2">
        <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-amber-500" />
        <h1 className="text-2xl md:text-3xl font-bold">
          Lakhi Jewellers Management
        </h1>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl md:text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm md:text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@Lakhijewellers.com"
                required
                {...form.register("email")}
                className="h-10 md:h-11"
              />
              {form.formState.errors.email && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm md:text-base">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs md:text-sm text-amber-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  {...form.register("password")}
                  className="h-10 md:h-11 pr-10"
                />
                {form.formState.errors.password && (
                  <p className="text-xs text-red-500">
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
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 h-10 md:h-11 text-base"
              disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-amber-600 hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
