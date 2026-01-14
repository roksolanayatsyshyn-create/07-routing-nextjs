import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

export const dynamic = 'force-dynamic';

export default async function NotePage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const resolvedParams: { id: string } = await params;

  const note: Note = await fetchNoteById(resolvedParams.id);

  return <NoteDetailsClient noteId={note.id} />;
}
