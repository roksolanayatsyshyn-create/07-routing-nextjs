
import NotePageWrapper from "./NotePageWrapper";
import { fetchNotesById } from '@/lib/api';


export default async function NotePage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const note = await fetchNotesById(resolvedParams.id);
  return <NotePageWrapper note={note} />;
}

