
import { getAllNotes, getNote } from "@/utils/database";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    const noteId = new URL(req.url).searchParams.get("id");
    if (!noteId) {
      return NextResponse.json({ error: 'noteId cannot be null' }, { status: 500 })
    }
    const note = await getNote(noteId);
    return NextResponse.json({ success: true, data: note }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}