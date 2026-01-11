'use client';
import { useRouter } from 'next/navigation';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  note: Note;
}

export function NotePreview({ note }: NotePreviewProps) {
  const router = useRouter();

  return (
    <div className={css.container}>
      <div className={css.item}>
        <button onClick={() => router.back()} className={css.backBtn}>
          Close
        </button>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
