'use client'

import RootLayout from '../layout'
import Header from '../components/header'
import NoteForm from '../components/note-form'
import BackButton from '../components/back-button'


export default function AddNote() {
  
  return (
    <RootLayout>
      <main className="container mx-auto px-5 pb-40">
        <Header />
        <BackButton />
        <NoteForm />
      </main>
    </RootLayout>
  )
}
