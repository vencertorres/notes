import { format } from 'date-fns';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { Link, useLocation, useRoute } from 'wouter';
import LucideList from '~icons/lucide/list';
import LucideSave from '~icons/lucide/save';
import LucideTrash2 from '~icons/lucide/trash-2';
import { NoteProps } from '../types';

function NoteRoute({
	notes,
	submit
}: {
	notes: NoteProps[];
	submit: React.Dispatch<SetStateAction<NoteProps[]>>;
}) {
	const [match, params] = useRoute('/notes/:id');
	const nodeRef = useRef(null);
	const [note, setNote] = useState<NoteProps>({
		id: '',
		title: '',
		body: '',
		time: new Date().toJSON()
	});
	const [location, setLocation] = useLocation();

	useEffect(() => {
		let note = notes.find((n) => n.id === params?.id);
		if (note) {
			setNote(note);
		}
	}, [params?.id]);

	function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const name = event.target.name;
		const value = event.target.value;
		setNote({ ...note, [name]: value });
	}

	function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		const name = event.currentTarget.name;
		if (name === 'save') {
			const update = { ...note, time: new Date().toJSON() };
			setNote(update);
			submit(notes.map((n) => (n.id === note.id ? update : n)));
		} else {
			if (confirm('Delete note?')) {
				submit(notes.filter((n) => n.id !== note.id));
				setLocation('/');
			}
		}
	}

	const className =
		'fixed sm:static top-0 left-0 bottom-0 right-0 ' +
		'flex flex-col gap-4 p-4 bg-white ' +
		'transition-transform sm:transition-none sm:translate-x-0 duration-300 ';

	const classNames: Record<TransitionStatus, string> = {
		entering: 'translate-x-0',
		entered: 'translate-x-0',
		exiting: 'translate-x-full',
		exited: 'translate-x-full',
		unmounted: 'translate-x-full'
	};

	return (
		<Transition
			nodeRef={nodeRef}
			timeout={{ appear: 300, enter: 300, exit: 50 }}
			in={match}
			unmountOnExit
		>
			{(state: TransitionStatus) => (
				<div ref={nodeRef} className={className + classNames[state]}>
					<Link href="/">
						<a className="self-start rounded-full p-1 text-gray-500 hover:text-gray-700">
							<LucideList className="h-6 w-6" />
						</a>
					</Link>
					<form className="flex h-full flex-col">
						<div className="flex gap-2 border-b-2 p-4">
							<div className="mr-auto">
								<input
									type="text"
									name="title"
									placeholder="Title"
									value={note.title}
									onChange={handleChange}
									className="block h-14 w-full text-4xl outline-none"
								/>
								<time dateTime={note.time} className="text-xs text-gray-500">
									{format(new Date(note.time), 'MMMM d, yyyy h:mm a')}
								</time>
							</div>
							<button type="submit" name="save" title="Save" onClick={handleSubmit}>
								<LucideSave className="h-6 w-6 text-blue-500 hover:text-blue-700" />
							</button>
							<button
								type="submit"
								name="delete"
								title="Delete"
								onClick={handleSubmit}
							>
								<LucideTrash2 className="h-6 w-6 text-blue-500 hover:text-red-700" />
							</button>
						</div>
						<textarea
							name="body"
							value={note.body}
							onChange={handleChange}
							className="h-full resize-none p-4 outline-none"
						></textarea>
					</form>
				</div>
			)}
		</Transition>
	);
}

export default NoteRoute;
