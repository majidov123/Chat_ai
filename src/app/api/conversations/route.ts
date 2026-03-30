import { NextResponse } from "next/server";
import { conversationsDb } from "@/lib/data";

export async function GET() {
  return NextResponse.json(conversationsDb);
}