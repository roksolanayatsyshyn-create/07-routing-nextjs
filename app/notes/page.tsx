import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

interface PageProps {
  searchParams: {
    tag?: string;
    search?: string;
    page?: string;
  };
}

export default async function NotesPage({ searchParams }: PageProps) {
  const PER_PAGE = 12;
  const queryClient = new QueryClient();

  const { tag = '', search = '', page = '1' } = searchParams;
  const pageNumber = Number(page);

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, search, pageNumber],
    queryFn: () => fetchNotes(search, pageNumber, PER_PAGE),
  });

  const clientSearchParams = { tag, search, page };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient searchParams={clientSearchParams} />
    </HydrationBoundary>
  );
}
