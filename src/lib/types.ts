import { Dispatch, SetStateAction } from 'react';

export interface NoteProps {
	id: string;
	title: string;
	body: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface SideBarProps {
	notes: NoteProps[];
	setNotes: Dispatch<React.SetStateAction<NoteProps[]>>;
}

export interface EditorProps {
	note: NoteProps;
	update: Dispatch<SetStateAction<NoteProps[]>>;
}
