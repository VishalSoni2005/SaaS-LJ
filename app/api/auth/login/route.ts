import { auth } from "@/firebase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const expiresIn = 60 * 60 * 24 * 7; // 7 days
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });

    const response = NextResponse.json({ message: "Session created" });
    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: expiresIn,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Error setting cookie:", error);
    return NextResponse.json(
      { error: "Failed to set cookie" },
      { status: 500 }
    );
  }
}
