import { insertNote } from '@/utils/database';
import { CreateNoteVariables } from '@/utils/types';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  const { title, text } : CreateNoteVariables = await req.json();

  try {
    await insertNote({ title, text });
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
