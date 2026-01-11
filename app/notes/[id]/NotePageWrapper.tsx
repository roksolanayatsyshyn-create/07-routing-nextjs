
'use client';
import { NotePreview } from '@/components/NotePreview/NotePreview';
import { Modal } from '@/components/Modal/Modal';
import { useRouter, usePathname } from 'next/navigation';
import type { Note } from '@/types/note';

interface WrapperProps {
  note: Note;
}

export default function NotePageWrapper({ note }: WrapperProps) {
  const router = useRouter();
  const pathname = usePathname();

  const showModal = pathname === `/notes/${note.id}`;

  const handleClose = () => router.back();

  if (showModal) {
    return (
      <Modal onClose={handleClose}>
        <NotePreview note={note} />
      </Modal>
    );
  }

  return <NotePreview note={note} />;
}
