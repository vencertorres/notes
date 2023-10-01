import { Dispatch, useState } from 'react';
import { useLocation } from 'wouter';
import LucideEdit from '~icons/lucide/edit';
import { NoteProps } from '../lib/types';
import Note from './Note';

export default function Sidebar({
	notes,
	setNotes
}: {
	notes: NoteProps[];
	setNotes: Dispatch<React.SetStateAction<NoteProps[]>>;
}) {
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
		<aside className="grid h-full grid-rows-[auto_1fr] overflow-y-auto bg-white sm:border-r">
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
					<LucideEdit aria-hidden="true" />
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
	);
}
