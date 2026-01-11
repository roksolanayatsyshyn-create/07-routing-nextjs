'use client'; // потрібно, бо використаємо хуки

import { useRouter, usePathname } from 'next/navigation';
import { fetchNotesById } from '@/lib/api';
import { NotePreview } from '@/components/NotePreview/NotePreview';
import { Modal } from '@/components/Modal/Modal';
import type { Note } from '@/types/note';
import { useEffect, useState } from 'react';

interface PageProps {
  params: { id: string };
}

export default function NotePageWrapper({ params }: PageProps) {
  const [note, setNote] = useState<Note | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const showModal = pathname.startsWith('/notes');

  useEffect(() => {
    fetchNotesById(params.id).then(setNote);
  }, [params.id]);

  const handleClose = () => {
    router.back(); // закриває модалку і повертає на попередню сторінку
  };

  if (!note) return <p>Loading...</p>;

  if (showModal) {
    return (
      <Modal onClose={handleClose}>
        <NotePreview note={note} />
      </Modal>
    );
  }

  // Прямий перехід на /notes/[id]
  return <NotePreview note={note} />;
}
