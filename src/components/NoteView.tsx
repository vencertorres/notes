import { format } from "date-fns"
import { SetStateAction, useEffect, useRef, useState } from "react"
import { Transition, TransitionStatus } from "react-transition-group"
import { Link, useLocation, useRoute } from "wouter"
import MaterialSymbolsDeleteRounded from "~icons/material-symbols/delete-rounded"
import MaterialSymbolsMenuRounded from "~icons/material-symbols/menu-rounded"
import MaterialSymbolsSaveRounded from "~icons/material-symbols/save-rounded"
import { Note } from "../types"

function NoteView({ notes, submit }: { notes: Note[]; submit: React.Dispatch<SetStateAction<Note[]>> }) {
  const [match, params] = useRoute("/notes/:id")
  const nodeRef = useRef(null)
  const [note, setNote] = useState<Note>({ id: "", title: "", body: "", time: new Date().toJSON() })
  const [location, setLocation] = useLocation()

  useEffect(() => {
    let note = notes.find(n => n.id === params?.id)
    if (note) {
      setNote(note)
    }
  }, [params?.id])

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
      submit(notes.map(n => n.id === note.id ? update : n))
    } else {
      if (confirm("Delete note?")) {
        submit(notes.filter(n => n.id !== note.id))
        setLocation("/")
      }
    }
  }

  const className =
    "fixed sm:static top-0 left-0 bottom-0 right-0 "
    + "flex flex-col gap-4 p-4 bg-white "
    + "transition-transform sm:transition-none sm:translate-x-0 duration-300 "

  const classNames: Record<TransitionStatus, string> = {
    entering: "translate-x-0",
    entered: "translate-x-0",
    exiting: "translate-x-full",
    exited: "translate-x-full",
    unmounted: "translate-x-full"
  }

  return (
    <Transition nodeRef={nodeRef} timeout={{ appear: 300, enter: 300, exit: 50 }} in={match} unmountOnExit>
      {(state: TransitionStatus) => (
        <div ref={nodeRef} className={className + classNames[state]}>
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
      )}
    </Transition>
  )
}

export default NoteView
