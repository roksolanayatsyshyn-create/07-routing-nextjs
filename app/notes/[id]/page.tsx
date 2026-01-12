import  NoteDetailsClient  from "./NoteDetails.client";
import { fetchNotesById } from "@/lib/api";
import type { Note } from "@/types/note";

export default async function NotePage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  
  const resolvedParams: { id: string } = await params;

  const note: Note = await fetchNotesById(resolvedParams.id);

  return <NoteDetailsClient noteId={note.id} />;
}

