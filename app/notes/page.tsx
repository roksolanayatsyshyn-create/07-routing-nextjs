import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

interface PageProps {
  searchParams: Promise<{
    tag?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function NotesPage({ searchParams }: PageProps) {
  const params = await searchParams;   

  const { tag = '', search = '', page = '1' } = params;
  const pageNumber = Number(page);
  const PER_PAGE = 12;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, search, pageNumber],
    queryFn: () => fetchNotes(search, pageNumber, PER_PAGE),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient searchParams={{ tag, search, page }} />
    </HydrationBoundary>
  );
}
