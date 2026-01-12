'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

type ModalProps = {
  children: React.ReactNode;}

export function Modal({ children }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [router]);

  if (!modalRoot) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) router.back();
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
