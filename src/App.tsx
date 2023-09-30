import { useState } from 'react';
import { Route, useLocation } from 'wouter';
import LucideEdit from '~icons/lucide/edit';
import Editor from './components/Editor';
import Note from './components/Note';
import { useLocalStorage } from './hooks';
import { NoteProps } from './types';

function App() {
	const [notes, setNotes] = useLocalStorage<NoteProps[]>('notes', []);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setLocation] = useLocation();
	const [query, setQuery] = useState(() => {
		return new URLSearchParams(window.location.search).get('q') ?? '';
	});

	function createNote() {
		const note = {
			id: crypto.randomUUID(),
			title: '',
			body: '',
			createdAt: new Date(),
			updatedAt: new Date()
		};
		setNotes(notes.concat(note));
		setLocation(`/notes/${note.id}`);
	}

	function search(event: React.ChangeEvent<HTMLInputElement>) {
		setLocation(event.target.value ? `/?q=${event.target.value}` : '/', { replace: true });
		setQuery(event.target.value);
	}

	const list = query
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
			<aside className="grid grid-rows-[auto_1fr] overflow-y-auto border-r border-slate-300">
				<div className="grid grid-cols-[1fr_auto] gap-3 px-4 py-6">
					<label htmlFor="search" className="sr-only">
						Search note
					</label>
					<input
						id="search"
						type="search"
						placeholder="Search note"
						className="min-w-0 rounded-full border border-slate-300 bg-white px-3 py-1 text-sm placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
						value={query}
						onChange={search}
					/>
					<button onClick={createNote} className="text-sky-500 hover:text-sky-600">
						<span className="sr-only">Create note</span>
						<LucideEdit aria-label="Create note" />
					</button>
				</div>
				{list.length ? (
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
			</aside>

			<Route path="/notes/:id">
				{(params) => {
					const note = notes.find((note) => note.id === params.id);

					if (!note) {
						return (
							<div className="grid place-items-center text-xl text-gray-500">
								¯\_(ツ)_/¯
							</div>
						);
					}
					return <Editor note={note} update={setNotes} />;
				}}
			</Route>
		</div>
	);
}

export default App;
