import { format } from "date-fns"
import { SetStateAction, useEffect, useState } from "react"
import { Link, useLocation } from "wouter"
import MaterialSymbolsDeleteRounded from "~icons/material-symbols/delete-rounded"
import MaterialSymbolsMenuRounded from "~icons/material-symbols/menu-rounded"
import MaterialSymbolsSaveRounded from "~icons/material-symbols/save-rounded"
import { Note } from "../types"

function NoteView({ id, notes, submit }: { id: string | undefined; notes: Note[]; submit: React.Dispatch<SetStateAction<Note[]>> }) {
  const [note, setNote] = useState<Note>({ id: "", title: "", body: "", time: new Date().toJSON() })
  const [location, setLocation] = useLocation()

  useEffect(() => {
    let note = notes.find(n => n.id === id)
    if (note) {
      setNote(note)
    }
  }, [id])

  function handleChange(event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
    const name = event.target.name
    const value = event.target.value
    setNote({ ...note, [name]: value })
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    const name = event.currentTarget.name
    if (name === "save") {
      const update = { ...note, time: new Date().toJSON() }
      setNote(update)
      submit(notes.map(n => n.id === id ? update : n))
    } else {
      if (confirm("Delete note?")) {
        submit(notes.filter(n => n.id !== id))
        setLocation("/")
      }
    }
  }

  if (!note) return null
  return (
    <div className="fixed sm:static top-0 w-full h-full flex flex-col gap-4 p-4 bg-white">
      <Link href="/">
        <a className="self-start p-1 rounded-full text-gray-500 hover:text-gray-700">
          <MaterialSymbolsMenuRounded className="w-6 h-6" />
        </a>
      </Link>
      <form className="flex flex-col h-full">
        <div className="flex gap-2 p-4 border-b border-b-2">
          <div className="mr-auto">
            <input
              type="text"
              name="title"
              placeholder="Title" value={note.title}
              onChange={handleChange}
              className="block w-full h-14 text-4xl outline-none"
            />
            <time dateTime={note.time} className="text-gray-500 text-xs">
              {format(new Date(note.time), "MMMM d, yyyy h:mm a")}
            </time>
          </div>
          <button type="submit" name="save" title="Save" onClick={handleSubmit}>
            <MaterialSymbolsSaveRounded className="w-6 h-6 text-blue-500 hover:text-blue-700" />
          </button>
          <button type="submit" name="delete" title="Delete" onClick={handleSubmit}>
            <MaterialSymbolsDeleteRounded className="w-6 h-6 text-blue-500 hover:text-red-700" />
          </button>
        </div>
        <textarea
          name="body"
          value={note.body}
          onChange={handleChange}
          className="h-full p-4 resize-none outline-none"
        ></textarea>
      </form>
    </div>
  )
}

export default NoteView
