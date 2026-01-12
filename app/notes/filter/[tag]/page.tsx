import NotesClient from '@/app/notes/Notes.client';

type Props = {
  params: Promise<{ tag: string }>; 
  searchParams: { page?: string; search?: string };
};

export default async function FilteredNotesPage({ params, searchParams }: Props) {
  const { tag } = await params;
  return (
    <NotesClient
      searchParams={{
        ...searchParams,
        tag,
      }}
    />
  );
}
