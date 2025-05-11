// app/api/auth/current-user/route.ts
"use server";
import { NextResponse } from "next/server";
import { auth } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    console.log("Session Cookie: ", sessionCookie);

    if (!sessionCookie) {
      return NextResponse.json({ user: null });
    }

    const decodedClaims = await auth.verifySessionCookie(
      sessionCookie.value,
      true
    );

    const response = await auth.getUser(decodedClaims.uid);

    const { uid, email, displayName } = response;

    const user = {
      name: "displayName",
      email: "email",
      uid: "uid",
    };

    return NextResponse.json(
      { user, msg: "success" },
      
    );
  } catch (error) {
    console.error("Error in current-user API:", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
