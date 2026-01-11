import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
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

  // Можна передати searchParams для prefetch
  const tag = searchParams.tag ?? '';
  const search = searchParams.search ?? '';
  const page = Number(searchParams.page) || 1;

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, search, page],
    queryFn: () => fetchNotes(search, page, PER_PAGE),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient searchParams={searchParams} />
    </HydrationBoundary>
  );
}
