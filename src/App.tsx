import { useState } from 'react';
import { useLocation } from 'wouter';
import LucideEdit from '~icons/lucide/edit';
import Note from './components/Note';
import NoteRoute from './components/NoteRoute';
import { useLocalStorage } from './hooks';
import { NoteProps } from './types';

function App() {
	const [notes, setNotes] = useLocalStorage<NoteProps[]>('notes', []);
	const [location, setLocation] = useLocation();
	const [query, setQuery] = useState(() => {
		return new URLSearchParams(window.location.search).get('q') ?? '';
	});

	function createNote() {
		const note = {
			id: Math.random().toString(36).slice(2, 7),
			title: '',
			body: '',
			time: new Date().toJSON()
		};
		setNotes(notes.concat(note));
		setLocation(`/notes/${note.id}`);
	}

	function search(event: React.ChangeEvent<HTMLInputElement>) {
		setLocation(event.target.value ? `/?q=${event.target.value}` : '/', { replace: true });
		setQuery(event.target.value);
	}

	let list = query
		? notes.filter((note) => {
				if (
					note.title.toLowerCase().includes(query.toLowerCase()) ||
					note.body.toLowerCase().includes(query.toLowerCase())
				) {
					return true;
				}
		  })
		: notes;

	return (
		<div className="grid h-screen grid-cols-1 overflow-y-auto bg-white sm:grid-cols-[minmax(250px,_20%)_1fr]">
			<div className="grid grid-rows-[auto_1fr] overflow-y-auto border-r border-slate-300">
				<div className="grid grid-cols-[1fr_auto] gap-3 border-b border-slate-300 p-3">
					<label htmlFor="search" className="sr-only">
						Search note
					</label>
					<input
						id="search"
						type="search"
						placeholder="Search note"
						className="min-w-0 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
						value={query}
						onChange={search}
					/>
					<button
						title="Create note"
						onClick={createNote}
						className="text-sky-500 hover:text-sky-600"
					>
						<LucideEdit aria-label="Create note" />
					</button>
				</div>
				{!!list.length ? (
					<div className="overflow-hidden">
						{list.map((note) => (
							<Note key={note.id} {...note} />
						))}
					</div>
				) : (
					<div className="grid place-items-center">
						<p className="text-gray-500">No items</p>
					</div>
				)}
			</div>
			<NoteRoute notes={notes} submit={setNotes} />
		</div>
	);
}

export default App;
