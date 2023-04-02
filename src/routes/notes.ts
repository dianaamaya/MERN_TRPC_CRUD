import { publicProcedure, router } from '../trpc'
import { z } from 'zod'
import Note from '../models/note'

const getNotes = publicProcedure.query(async() => {
    const notes = await Note.find()
    return notes
})

const createNote = publicProcedure
    .input(z.object({
        title: z.string(),
        description: z.string()
    }))
    .mutation(async({input}) => {
        const newNote = new Note({
            title: input.title,
            description: input.description,
        })
        const savedNote = await newNote.save()
        return savedNote
    })

const deleteNote = publicProcedure
    .input(z.string())
    .mutation(async ({input}) => {
        const noteFound = await Note.findByIdAndDelete(input)
        if (!noteFound) throw new Error("Note Not Found")
        return true
    })

const toggleNote = publicProcedure
    .input(z.string())
    .mutation( async ({input}) => {
        try {
            const noteFound = await Note.findById(input)
            if (!noteFound) throw new Error("Note Not Found")
            noteFound.done = !noteFound.done
            await noteFound.save()
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    })

export const notesRouter = router({
    create: createNote,
    get: getNotes,
    delete: deleteNote,
    toggleDone: toggleNote
})