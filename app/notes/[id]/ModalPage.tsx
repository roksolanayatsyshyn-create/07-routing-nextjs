'use client';

import { NotePreview } from '@/components/NotePreview/NotePreview';
import { Modal } from '@/components/Modal/Modal';
import { Note } from '@/types/note';
import { useRouter, usePathname } from 'next/navigation';

interface NotePageWrapperProps {
  note: Note;
}

export function NotePageWrapper({ note }: NotePageWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();

  const showModal = pathname.startsWith('/notes');

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
