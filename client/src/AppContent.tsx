import { NotesList } from './components/NotesList'
import { NoteForm } from './components/NoteForm'

export function AppContent() {
  return (
    <div className='max-w-xl m-auto h-screen pt-40'>
        <h1 className='text-5xl font-bold text-center py-5'>
            My Notes
        </h1>
        <NoteForm />
        <NotesList />
    </div>
  )
}