'use client'

import RootLayout from './layout'
import Header from './components/header'
import NotesList from './components/notes-list';
import AddNoteButton from './components/add-note-button';


export default function Home() {

  return (
    <RootLayout>
      <main className="container mx-auto px-5 pb-40">
        <Header />
        <NotesList />
        <AddNoteButton />
      </main>
    </RootLayout>
  )
}
