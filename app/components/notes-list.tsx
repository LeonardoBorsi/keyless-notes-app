import { Note } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "./spinner";

export default function NotesList() {
  
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect( () => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/get-notes', { method: 'GET' });
        const notes =  (await response.json()).data as Note[];
        setNotes(notes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error('Failed to fetch notes')
      }
    }
    fetchNotes();
  }, []);
  
  return (
    loading
    ? <div className="flex justify-center mt-40">
      <Spinner />
    </div>
    : <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
      {
        notes && notes.map(note => (
          <Link href={`/${note.id}`} key={note.id}>
            <div className="rounded-lg shadow-md p-6 bg-white hover:bg-gray-50">
              <div className="divide-y divide-dashed">
                <div className="pb-3">
                  <span className="font-bold">{note.title}</span>
                </div>
                <div className="pt-3">
                  <p className="truncate">{note.text}</p>
                </div>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  )
}
