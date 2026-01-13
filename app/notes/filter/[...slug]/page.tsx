import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';

export const dynamic = 'force-dynamic';

export default function FilteredNotesPage() {
  return <NotesClient />;
}
