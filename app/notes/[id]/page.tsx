import { fetchNotesById } from '@/lib/api';
import NotePreview from '@/components/NotePreview/NotePreview';
import { Modal } from '@/components/Modal/Modal';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: PageProps) {
  const { id } = await params; 
  const note = await fetchNotesById(id);

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}
