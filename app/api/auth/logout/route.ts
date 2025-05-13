"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  (await cookies()).set("session", "", { expires: new Date(0), path: "/" });
  console.log("Logged out");
  

  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
