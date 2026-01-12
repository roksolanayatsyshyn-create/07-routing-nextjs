'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { NoteList } from '@/components/NoteList/NoteList';
import { SearchBox } from '@/components/SearchBox/SearchBox';
import { Pagination } from '@/components/Pagination/Pagination';
import { Modal } from '@/components/Modal/Modal';
import { NoteForm } from '@/components/NoteForm/NoteForm';
import { useRouter } from 'next/navigation';

import { fetchNotesByTag, fetchNotes } from '@/lib/api';

import css from './NotesPage.module.css';

const PER_PAGE = 12;

export default function NotesClient({
  searchParams,
}: {
  searchParams: {
    tag?: string;
    search?: string;
    page?: string;
  };
}) {
  const tag = searchParams.tag ?? 'all';
  const [search, setSearch] = useState(searchParams.search ?? '');
  const [page, setPage] = useState(Number(searchParams.page) || 1);
  const [debouncedSearch] = useDebounce(search, 500);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () =>
      tag === 'all'
        ? fetchNotes(debouncedSearch, page, PER_PAGE)
        : fetchNotesByTag(tag, page, PER_PAGE),
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    router.push(`/notes/filter/${tag}?search=${value}&page=1`);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    router.push(`/notes/filter/${tag}?search=${debouncedSearch}&page=${p}`);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal >
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
