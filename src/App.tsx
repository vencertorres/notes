import { format } from "date-fns"
import { Route } from "wouter"
import NoteLink from "./components/NoteLink"
import NoteView from "./components/NoteView"
import { useLocalStorage } from "./hooks"
import { Note } from "./types"

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", [])

  return (
    <div className="sm:grid grid-cols-[20rem,_1fr] h-screen overflow-y-auto">
      <div className="sm:w-80 bg-gray-50 border-r overflow-y-auto">
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
      <Route path="/notes/:id">
        {params => <NoteView id={params.id} notes={notes} submit={setNotes} />}
      </Route>
    </div>
  )
}

export default App


