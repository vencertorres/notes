import { format } from 'date-fns';
import { Link, useRoute } from 'wouter';
import { NoteProps } from '../lib/types';

export default function Note(props: NoteProps) {
	const href = `/notes/${props.id}`;
	const [isActive] = useRoute(href);

	return (
		<Link href={href}>
			<a className="group" aria-current={isActive}>
				<div className="border-b bg-white p-4 group-hover:bg-gray-50 group-aria-[current=true]:bg-sky-50">
					<p className="truncate">{props.title || 'Untitled'}</p>
					<time
						dateTime={format(props.createdAt, 'yyyy-mm-dd')}
						className="text-xs text-gray-500"
					>
						{format(props.createdAt, 'MMMM d, yyyy h:mm a')}
					</time>
				</div>
			</a>
		</Link>
	);
}
