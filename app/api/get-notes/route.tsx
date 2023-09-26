
import { getAllNotes } from "@/utils/database";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const notes = await getAllNotes();
    return NextResponse.json({ success: true, data: notes }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}