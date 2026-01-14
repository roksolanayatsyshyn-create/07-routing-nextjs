import { dehydrate, QueryClient } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';
import { fetchNotes } from "@/lib/api";

export const dynamic = 'force-dynamic';
interface PageProps {
  params: { slug?: string[] };
  searchParams?: { page?: string; search?: string };
}

export default async function FilteredNotesPage({
  params,
  searchParams,
}: PageProps) {
  
  const tag = params.slug?.[0] ?? 'all';
  const page = Number(searchParams?.page ?? 1);
  const search = searchParams?.search ?? '';

  const queryClient = new QueryClient();

  
  await queryClient.prefetchQuery({
    queryKey: ['notes', { tag, search, page }],
    queryFn: () =>
      fetchNotes(
        search,
        page,
        12,
        tag ),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient
        search={search}
        page={page}
        tag={tag}
      />
    </HydrationBoundary>
  );
}
