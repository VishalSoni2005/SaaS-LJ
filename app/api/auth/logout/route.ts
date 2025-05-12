"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  (await cookies()).set("token", "", { expires: new Date(0), path: "/" });

  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
