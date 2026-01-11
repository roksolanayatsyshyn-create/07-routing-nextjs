'use client';

import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  const router = useRouter();

  const closeModal = () => {
    router.back(); 
  };

  return (
    
      <div className={css.container}>
      <div className={css.item}>
        <button onClick={closeModal} className={css.backBtn}>
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
