import { format } from 'date-fns';
import { Link, useRoute } from 'wouter';
import { NoteProps } from '../types';

export default function Note(props: NoteProps) {
	const href = `/notes/${props.id}`;
	const [isActive] = useRoute(href);

	return (
		<Link href={href}>
			<a className="group" aria-current={isActive}>
				<div className="border-b bg-white p-4 group-hover:bg-gray-50 group-aria-[current=true]:bg-sky-50">
					<p>{props.title}</p>
					<p className="truncate text-gray-500">{props.body}</p>
					<time dateTime={props.time} className="text-xs text-gray-500">
						{format(new Date(props.time), 'MMMM d, yyyy h:mm a')}
					</time>
				</div>
			</a>
		</Link>
	);
}
