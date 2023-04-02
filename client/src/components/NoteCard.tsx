import { trpc } from '../trpc'

interface PropsI {
    note: {
        _id: string;
        title: string;
        description: string;
        done: boolean;
    };
}

export function NoteCard({ note }: PropsI) {

  const deleteNote = trpc.note.delete.useMutation()
  const toggleDoneNote = trpc.note.toggleDone.useMutation()
  const utils = trpc.useContext()

  const handleDelete = () => {
    deleteNote.mutate(note._id, {
      onSuccess: (data) => {
        if (data) {
          utils.note.get.invalidate()
        }
      },
      onError: (error) => {
        console.error(error)
      }
    })
  }

  const handleDone = () => {
    toggleDoneNote.mutate(note._id, {
      onSuccess: (data) => {
        if (data) {
          utils.note.get.invalidate()
        }
      },
      onError: (error) => {
        console.error(error)
      }
    })
  }

  const buttonDoneStyle = 
    `${note.done ? 'bg-zinc-500' : 'bg-green-500'} px-3 py-2 rounded-md text-white ml-auto`

  return (
    <div className="bg-zinc-800 p-2 my-2 flex justify-between">

      <div>
        <h1 className="font-bold text-xl">
          {note.title}
        </h1>
        <p>{note.description}</p>
      </div>

      <div className="flex gap-x-2">
        <button 
            onClick={handleDelete}
            className="bg-red-500 px-3 py-2 rounded-md text-white ml-auto">
            Delete
          </button>

          <button 
            onClick={handleDone}
            className={buttonDoneStyle}>
            {note.done ? "Undone" : "Done"}
          </button>
      </div> 
      
    </div>
  )
}