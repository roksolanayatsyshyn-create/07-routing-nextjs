import NotesClient from '@/app/notes/Notes.client';

type Props = {
  params: { tag: string };
  searchParams: { page?: string; search?: string };
};

export default function FilteredNotesPage({ params, searchParams }: Props) {
  return (
    <NotesClient
      searchParams={{
        ...searchParams,
        tag: params.tag,
      }}
    />
  );
}
