import { deleteNote } from '@/utils/database';
import { NextResponse } from 'next/server';


export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    await deleteNote(id);
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}