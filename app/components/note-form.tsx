import { Note } from "@/utils/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from 'react-use';
import Spinner from "./spinner";


interface NoteFormProps {
  noteId?: string;
}

export default function NoteForm({ noteId } : NoteFormProps) {
  const router = useRouter();
  const isEditing = noteId ? true : false;

  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<Note>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [newTitle, setNewTitle] = useState<string>('');
  const [newText, setNewText] = useState<string>('');
  const [changesDetected, setChangesDetected] = useState(false);


  useEffect( () => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/get-note?id=${noteId}`, { method: 'GET' });
        const note = (await response.json()).data as Note;
        setNote(note);
        setNewTitle(note.title);
        setNewText(note.text || '');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error('Failed to fetch note')
      }
    }
    if (isEditing) {
      fetchNote();
    }
  }, [noteId, isEditing]);

  const createNote = useCallback(async () => {
    try {
      await fetch('/api/create-note', {
        method: 'POST',
        body: JSON.stringify({
          title: newTitle,
          text: newText,
        }),
      });
      router.push("/")
    } catch (error) {
      throw new Error('Failed to create note')
    }
  }, [newTitle, newText]);

  const editNote = useCallback(async () => {
    try {
      await fetch('/api/edit-note', {
        method: 'PUT',
        body: JSON.stringify({
          id: noteId,
          title: newTitle,
          text: newText,
        }),
      });
      router.push("/")
    } catch (error) {
      throw new Error('Failed to edit note')
    }
  }, [noteId, newTitle, newText]);

  const deleteNote = useCallback(async () => {
    try {
      await fetch('/api/delete-note', {
        method: 'DELETE',
        body: JSON.stringify({
          id: noteId,
        }),
      });
      router.push("/")
    } catch (error) {
      throw new Error('Failed to delete note')
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isEditing ? editNote() : createNote();
  }

  useDebounce(() => {
    if (isEditing) {
      if (newTitle !== note?.title || newText !== note.text) {
        setChangesDetected(true);
      } else {
        setChangesDetected(false);
      }
    }
    console.log(newTitle,newText)
  }, 500, [newTitle, newText, note]);
  

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [newText]);



  
  return (
    <div className="rounded-lg shadow-md p-10 bg-white">
      {
        loading
        ? <div className="flex justify-center py-40">
          <Spinner />
        </div>
        : <form onSubmit={handleSubmit}>
          <div className="divide-y divide-dashed">
            <div className="pb-4">
              <input
                id="title"
                className="font-bold w-full p-3 placeholder:text-grey-400 block rounded-md focus:outline-none focus:ring-gray-300 focus:ring-1"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>
            <div className="py-4">
              <textarea
                id="text"
                ref={textareaRef}
                className="w-full p-3 placeholder:text-grey-400 block rounded-md focus:outline-none focus:ring-gray-300 focus:ring-1"
                placeholder="Text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
            </div>
            <div className="pt-8 flex justify-between items-center">
              <div className="font-light text-gray-400">
                {
                  isEditing && <>
                    Last edit:
                    <span className="font-medium ml-1">
                      { note ? format(new Date(note.updatedAt), 'dd MMMM yyyy HH:mm') : '' }
                    </span>
                  </>
                }
              </div>
              {
                isEditing
                ? <div>
                  <button
                    className="bg-red-500 text-white hover:bg-red-400 focus:bg-red-400 active:bg-red-500 px-4 py-2 mr-3 rounded-md"
                    onClick={deleteNote}
                  >
                    Delete Note
                  </button>
                  <button
                    className={
                      changesDetected
                      ? 'bg-green-500 text-white hover:bg-green-400 focus:bg-green-400 active:bg-green-500 px-4 py-2 rounded-md'
                      : 'bg-green-200 text-white px-4 py-2 rounded-sm'
                    }
                    type="submit"
                    disabled={!changesDetected}
                  >
                    Save Changes
                  </button>
                </div>
                : <div>
                  <button
                    className='bg-green-500 text-white hover:bg-green-400 focus:bg-green-400 active:bg-green-500 px-4 py-2 rounded-md'
                    type="submit"
                  >
                    Create Note
                  </button>
                </div>
              }
            </div>
          </div>
        </form>
      }
      
    </div>
  )
}
