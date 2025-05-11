// app/api/auth/current-user/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
      return NextResponse.json({ user: null });
    }

    const decodedClaims = await auth.verifySessionCookie(
      sessionCookie.value,
      true
    );
    const user = await auth.getUser(decodedClaims.uid);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error in current-user API:", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
