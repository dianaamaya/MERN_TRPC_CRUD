import React, { ChangeEvent, FormEvent, useState } from 'react'
import { trpc } from '../trpc'


const initialState = {
    title: "",
    description: "",
}

export function NoteForm() {

    const [note, setNote] = useState(initialState)

    const addNote = trpc.note.create.useMutation()
    const utils = trpc.useContext()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (note.title && note.description) {
            addNote.mutate(note, {
                onSuccess: () => {
                    utils.note.get.invalidate()
                    setNote(initialState)
                }
            })
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setNote({ ...note, [e.target.name]: e.target.value })

    const buttonAddStyle = `${note.title && note.description 
        ? 'bg-blue-500' : 'bg-zinc-500'} px-3 py-2 rounded-md text-white`    

  return (
    <form 
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-10 rounded-md">
        <input 
            type="text" 
            placeholder="Title"
            name="title"
            autoFocus 
            value={note.title}
            onChange={handleChange}
            className="bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3"
        />
        <textarea 
            name="description" 
            placeholder="Description"
            value={note.description}
            onChange={handleChange}
            className="bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3">
        </textarea>

        <button 
            type="submit"
            className={buttonAddStyle}>
                Add
        </button>


    </form>
  )
}