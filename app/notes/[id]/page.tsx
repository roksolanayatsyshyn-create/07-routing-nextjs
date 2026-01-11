import { fetchNotesById } from '@/lib/api';
import NotePreview from '@/components/NotePreview/NotePreview';
import { Modal } from '@/components/Modal/Modal';

interface PageProps {
  params: { id: string };
}

export default async function NotePage({ params }: PageProps) {
  const note = await fetchNotesById(params.id);

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}

