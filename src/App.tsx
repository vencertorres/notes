import { format } from "date-fns"
import { SetStateAction, useEffect, useState } from "react"
import { Link, useRoute } from "wouter"

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const item = window.localStorage.getItem(key)

    return item
      ? JSON.parse(item)
      : initialValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

type Note = {
  id: string
  title: string
  body: string
  time: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", [])

  return (
    <div className="h-screen">
      <div className="h-full w-full md:w-80 bg-gray-50 border-r overflow-y-auto">
        {notes.length ? (
          <ul>
            {notes.map(note => (
              <li key={note.id}>
                <NoteLink href={`/notes/${note.id}`}>
                  <div className="p-4 border-b bg-white group-hover:bg-gray-100 group-[.active]:bg-blue-50">
                  <p className="font-medium">{note.title}</p>
                  <p className="truncate">{note.body}</p>
                    <time dateTime={note.time} className="text-gray-500 text-sm">
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
    </div>
  )
}

export default App

function NoteLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [isActive] = useRoute(href)

  return (
    <Link href={href}>
      <a className={"group" + (isActive ? " active" : "")}>{children}</a>
    </Link>
  )
}
