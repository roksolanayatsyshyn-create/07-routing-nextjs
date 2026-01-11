import axios from 'axios';
import type { Note, NoteFormValues } from '@/types/note.ts';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
const BASE_URL = 'https://notehub-public.goit.study/api/notes';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}` }
    : {},
});
export async function fetchNotes(
  search: string,
  page = 1,
  perPage = 12
): Promise<FetchNotesResponse> {
  const res = await axiosInstance.get<FetchNotesResponse>('/', {
    params: { search, page, perPage },
  });
  return res.data;
}

export async function createNote(newNote: NoteFormValues) {
  const res = await axiosInstance.post<Note>('/', newNote);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await axiosInstance.delete<Note>(`/${id}`);
  return res.data;
}
export async function fetchNotesById(id: string) {
  const res = await axiosInstance.get<Note>(`/${id}`);
  return res.data;
}
export async function fetchNotesByTag(
  tag: string,
  page = 1,
  perPage = 12
): Promise<FetchNotesResponse> {
  const params: {
    page: number;
    perPage: number;
    tag?: string;
  } = {
    page,
    perPage,
  };

  if (tag && tag.toLowerCase() !== 'all') {
    params.tag = tag;
  }

  const res = await axiosInstance.get<FetchNotesResponse>('/', { params });
  return res.data;
}

export async function getAllTags() {
  const firstPage = await fetchNotesByTag('all', 1, 12);

  const allNotes = [...firstPage.notes];

  const totalPages = firstPage.totalPages;

  if (totalPages > 1) {
    const requests = [];

    for (let page = 2; page <= totalPages; page++) {
      requests.push(fetchNotesByTag('all', page, 12));
    }

    const results = await Promise.all(requests);

    results.forEach((res) => {
      allNotes.push(...res.notes);
    });
  }

  return Array.from(new Set(allNotes.flatMap((note) => note.tag)));
}
