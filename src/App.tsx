import { format } from "date-fns"
import { useLocation } from "wouter"
import MaterialSymbolsAddNotesRounded from "~icons/material-symbols/add-notes-rounded"
import NoteLink from "./components/NoteLink"
import NoteView from "./components/NoteView"
import { useLocalStorage } from "./hooks"
import { Note } from "./types"

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", [])
  const [location, setLocation] = useLocation()

  function createNote() {
    const note = {
      id: Math.random().toString(36).slice(2, 7),
      title: "",
      body: "",
      time: new Date().toJSON()
    }
    setNotes(notes.concat(note))
    setLocation(`/notes/${note.id}`)
  }

  return (
    <div className="sm:grid grid-cols-[20rem,_1fr] h-screen overflow-y-auto">
      <div className="sm:w-80 bg-white border-r overflow-y-auto">
        <div className="flex gap-4 p-4 border-b">
          <input
            type="search"
            placeholder="Search note"
            className="w-full px-4 py-2 mr-auto border rounded-full bg-gray-100 outline-none"
          />
          <button title="Create note" onClick={createNote} className="text-blue-500 hover:text-blue-700">
            <MaterialSymbolsAddNotesRounded className="w-6 h-6" />
          </button>
        </div>
        {notes.length ? (
          <ul>
            {notes.map(note => (
              <li key={note.id}>
                <NoteLink href={`/notes/${note.id}`}>
                  <div className="p-4 border-b bg-white group-hover:bg-gray-100 group-[.active]:bg-blue-50">
                    <p className="font-medium">{note.title}</p>
                    <p className="truncate">{note.body}</p>
                    <time dateTime={note.time} className="text-gray-500 text-xs">
                      {format(new Date(note.time), "MMMM d, yyyy h:mm a")}
                    </time>
                  </div>
                </NoteLink>
              </li>
            ))}
          </ul> 
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500">No items</p>
          </div>
        )}
      </div>
      <NoteView notes={notes} submit={setNotes} />
    </div>
  )
}

export default App
