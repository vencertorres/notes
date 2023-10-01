import { FormEvent } from 'react';
import TextArea from 'react-textarea-autosize';
import { Link, useLocation } from 'wouter';
import LucideChevronLeft from '~icons/lucide/chevron-left';
import LucideSave from '~icons/lucide/save';
import LucideTrash from '~icons/lucide/trash';
import { EditorProps } from '../lib/types';

export default function Editor({ note, update }: EditorProps) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setLocation] = useLocation();

	function saveNote(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		update((notes) =>
			notes.map((n) =>
				n.id === note.id
					? {
							...note,
							title: formData.get('title') as string,
							body: formData.get('body') as string,
							updatedAt: new Date()
					  }
					: n
			)
		);
	}

	function deleteNote() {
		if (confirm('Delete note')) {
			update((notes) => notes.filter((n) => n.id !== note.id));
			setLocation('/');
		}
	}

	return (
		<>
			<div className="flex items-center gap-4 p-6">
				<Link href="/" replace={true}>
					<a className="inline-flex items-center text-gray-500 hover:text-gray-700 sm:hidden">
						<LucideChevronLeft className="-ml-2 text-2xl" aria-hidden="true" />
						Notes
					</a>
				</Link>
				<button form="editor" className="ml-auto">
					<span className="sr-only">Save note</span>
					<LucideSave className="text-gray-500 hover:text-sky-500" aria-hidden="true" />
				</button>
				<button onClick={deleteNote}>
					<span className="sr-only">Delete note</span>
					<LucideTrash className="text-gray-500 hover:text-red-700" aria-hidden="true" />
				</button>
			</div>
			<form id="editor" className="grid h-full grid-rows-[auto_1fr]" onSubmit={saveNote}>
				<div>
					<TextArea
						name="title"
						placeholder="Title"
						defaultValue={note.title}
						className="w-full resize-none p-6 text-4xl font-semibold shadow outline-none"
						spellCheck="false"
					/>
				</div>
				<div className="flex flex-col">
					<TextArea
						name="body"
						defaultValue={note.body}
						className="flex-1 resize-none p-6 outline-none"
						spellCheck="false"
					/>
				</div>
			</form>
		</>
	);
}
