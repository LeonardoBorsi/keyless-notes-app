import { editNote } from '@/utils/database';
import { EditNoteVariables } from '@/utils/types';
import { NextResponse } from 'next/server';


export async function PUT(req: Request) {
  const { id, title, text } : EditNoteVariables = await req.json();

  try {
    await editNote({ id, title, text });
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
