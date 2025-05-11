import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  //! first util call
  console.log("isUserAuthenticated", isUserAuthenticated);
  
  if (isUserAuthenticated) {
    redirect("/dashboard");
  }

  return <div>{children}</div>;
};

export default AuthLayout;
