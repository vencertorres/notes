import { Dispatch, SetStateAction } from 'react';

export interface NoteProps {
	id: string;
	title: string;
	body: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface EditorProps {
	note: NoteProps;
	update: Dispatch<SetStateAction<NoteProps[]>>;
}
