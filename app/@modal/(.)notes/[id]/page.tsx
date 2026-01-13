import { fetchNotesById } from '@/lib/api';
import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';
import { Modal } from '@/components/Modal/Modal';

type Props = {
  params: Promise<{ id: string }>;
};
export default async function NoteModalPage({ params }: Props) {
  const { id } = await params;
  const note = await fetchNotesById(id);

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}
