
import NotePageWrapper from "./NotePageWrapper";
import { fetchNotesById } from '@/lib/api';
import type { Note } from '@/types/note';

interface PageProps {
  params: { id: string };
}

export default async function NotePage({ params }: PageProps) {
  const note: Note = await fetchNotesById(params.id);

  return <NotePageWrapper note={note} />;
}
