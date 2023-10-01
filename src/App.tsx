import { AnimatePresence, motion } from 'framer-motion';
import { useRoute } from 'wouter';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import { useLocalStorage } from './lib/hooks';
import { NoteProps } from './lib/types';
import LucideStickyNote from '~icons/lucide/sticky-note';

export default function App() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_match, params] = useRoute('/notes/:id');
	const [notes, setNotes] = useLocalStorage<NoteProps[]>('notes', []);

	const note = notes.find((n) => n.id === params?.id);

	return (
		<div className="h-screen overflow-y-auto sm:grid sm:grid-cols-[minmax(250px,_20%)_1fr]">
			<Sidebar notes={notes} setNotes={setNotes} />

			<AnimatePresence>
				{note ? (
					<motion.div
						initial={{ x: '100vw' }}
						animate={{ x: '0vw' }}
						exit={{ x: '100vw' }}
						transition={{ type: 'just', duration: 0.15 }}
						className="grid h-full grid-rows-[auto_1fr] overflow-hidden bg-white max-sm:absolute max-sm:top-0"
					>
						<Editor note={note} update={setNotes} />
					</motion.div>
				) : (
					<div className="grid place-items-center">
						<LucideStickyNote className="text-8xl text-gray-100" />
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}
