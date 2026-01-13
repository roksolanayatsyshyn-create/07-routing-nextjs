import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './filter/[...slug]/Notes.client';
import { fetchNotes } from '@/lib/api';
import { redirect } from 'next/navigation';

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
  if (!tag) {
    redirect('/notes/filter/all');
  }
  const pageNumber = Number(page);
  const PER_PAGE = 12;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, search, pageNumber],
    queryFn: () => fetchNotes(search, pageNumber, PER_PAGE),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
